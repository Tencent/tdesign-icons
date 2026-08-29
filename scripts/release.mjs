import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { execFileSync } from 'node:child_process';
import {
  intro, outro, isCancel, cancel, select, multiselect,
} from '@clack/prompts';

const root = process.cwd();
const packagesDir = path.join(root, 'packages');
const versionTypes = ['patch', 'minor', 'major'];

function getCurrentBranch() {
  try {
    return execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

async function getReleasablePackages() {
  const entries = await fs.readdir(packagesDir, { withFileTypes: true });
  const packages = await Promise.all(entries.map(async (entry) => {
    if (!entry.isDirectory()) return null;

    const packageDir = path.join(packagesDir, entry.name);
    const changelogDir = path.join(packageDir, '.changelog');
    const packageFile = path.join(packageDir, 'package.json');
    const pubspecFile = path.join(packageDir, 'pubspec.yaml');

    try {
      const changelogEntries = await fs.readdir(changelogDir);
      if (changelogEntries.length === 0) return null;

      try {
        const manifest = JSON.parse(await fs.readFile(packageFile, 'utf8'));
        if (manifest.name && manifest.version) {
          return {
            dir: packageDir,
            changelogDir,
            manifestFile: packageFile,
            ...manifest,
          };
        }
      } catch {
        // Try pubspec.yaml below.
      }

      const pubspec = await fs.readFile(pubspecFile, 'utf8');
      const name = pubspec.match(/^name:\s*([^\s#]+)\s*(?:#.*)?$/m)?.[1];
      const version = pubspec.match(/^version:\s*([^\s+#]+)(?:\+[^\s#]+)?\s*(?:#.*)?$/m)?.[1];
      if (name && version) {
        return {
          dir: packageDir,
          changelogDir,
          manifestFile: pubspecFile,
          name,
          version,
        };
      }
    } catch {
      // A package without changelog entries or a supported manifest is not releasable.
    }
    return null;
  }));

  return packages.filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));
}

async function choosePackages(packages) {
  const result = await multiselect({
    message: '选择要发布的包',
    options: packages.map((pkg) => ({ value: pkg, label: `${pkg.name} (${pkg.version})` })),
    required: false,
  });
  if (isCancel(result)) {
    cancel('操作已取消');
    return [];
  }
  return result;
}

async function chooseVersion() {
  const result = await select({
    message: '选择版本类型',
    options: versionTypes.map((type) => ({ value: type, label: type })),
  });
  if (isCancel(result)) {
    cancel('操作已取消');
    return '';
  }
  return result;
}

function nextVersion(version, type) {
  const parts = version.split('.').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) throw new Error(`无法解析版本号：${version}`);
  if (type === 'major') return `${parts[0] + 1}.0.0`;
  if (type === 'minor') return `${parts[0]}.${parts[1] + 1}.0`;
  return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
}

async function updatePackageVersion(pkg, type) {
  const version = nextVersion(pkg.version, type);
  if (path.basename(pkg.manifestFile) === 'pubspec.yaml') {
    const pubspec = await fs.readFile(pkg.manifestFile, 'utf8');
    const updated = pubspec.replace(
      /^(version:\s*)[^\s+#]+(?:\+[^\s#]+)?(\s*(?:#.*)?)$/m,
      `$1${version}$2`,
    );
    if (updated === pubspec) throw new Error(`无法更新版本号：${pkg.manifestFile}`);
    await fs.writeFile(pkg.manifestFile, updated);

    if (pkg.name === 'tdesign_flutter_icons') {
      const readmeFile = path.join(path.dirname(pkg.manifestFile), 'README.md');
      const readme = await fs.readFile(readmeFile, 'utf8');
      const updatedReadme = readme.replace(
        new RegExp(`(^[ \\t]*${pkg.name}:[ \\t]*\\^)${pkg.version}([ \\t]*$)`, 'gm'),
        `$1${version}$2`,
      );
      if (updatedReadme === readme) throw new Error(`无法更新版本号：${readmeFile}`);
      await fs.writeFile(readmeFile, updatedReadme);
    }
  } else {
    const manifest = JSON.parse(await fs.readFile(pkg.manifestFile, 'utf8'));
    manifest.version = version;
    await fs.writeFile(pkg.manifestFile, `${JSON.stringify(manifest, null, 2)}\n`);
  }
  return { name: pkg.name, from: pkg.version, to: version };
}

async function main() {
  if (process.argv.includes('--help')) {
    process.stdout.write('pnpm release\n先同步 develop，再交互选择有 .changelog 的包和版本类型，创建 release/ 开头的发布分支并更新版本号。\n');
    return;
  }
  if (getCurrentBranch().startsWith('release/')) {
    throw new Error(`当前已经在发布分支“${getCurrentBranch()}”，请切回基础分支后再执行。`);
  }
  execFileSync('git', ['switch', 'develop'], { stdio: 'inherit' });
  execFileSync('git', ['pull', '--ff-only', 'origin', 'develop'], { stdio: 'inherit' });
  intro('Release 发布流程');
  const packages = await getReleasablePackages();
  if (packages.length === 0) throw new Error('packages 下没有包含 .changelog 内容的包。');
  const selected = await choosePackages(packages);
  if (selected.length === 0) return;
  const type = await chooseVersion();
  if (!type) return;
  const branch = `release/${new Date().toISOString().slice(0, 10)}-${type}`;
  execFileSync('git', ['switch', '-c', branch], { stdio: 'inherit' });
  const updates = await Promise.all(selected.map((pkg) => updatePackageVersion(pkg, type)));
  updates.forEach((update) => {
    process.stdout.write(`${update.name}: ${update.from} -> ${update.to}\n`);
  });
  outro(`已创建分支：${branch}`);
}

main().catch((error) => {
  process.stderr.write(`release 失败：${error.message}\n`);
  process.exitCode = 1;
});
