import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { execFileSync } from 'node:child_process';
import { checkbox, select } from '@inquirer/prompts';

const root = process.cwd();
const packagesDir = path.join(root, 'packages');
const versionTypes = ['major', 'minor', 'patch'];

function getCurrentBranch() {
  try {
    return execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

async function getReleasablePackages() {
  const entries = await fs.readdir(packagesDir, { withFileTypes: true });
  const packages = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const packageDir = path.join(packagesDir, entry.name);
    const changelogDir = path.join(packageDir, '.changelog');
    const packageFile = path.join(packageDir, 'package.json');

    try {
      const [changelogEntries, packageJson] = await Promise.all([
        fs.readdir(changelogDir),
        fs.readFile(packageFile, 'utf8'),
      ]);
      if (changelogEntries.length === 0) continue;
      const manifest = JSON.parse(packageJson);
      if (manifest.name && manifest.version) {
        packages.push({ dir: packageDir, changelogDir, ...manifest });
      }
    } catch {
      // A package without a changelog directory or package.json is not releasable.
    }
  }

  return packages.sort((a, b) => a.name.localeCompare(b.name));
}

async function choosePackages(packages) {
  return checkbox({
    message: '选择要发布的包',
    instructions: '↑/↓ 移动，空格切换，a 全选，i 反选，Enter 确认',
    choices: packages.map((pkg) => ({ name: `${pkg.name} (${pkg.version})`, value: pkg })),
  });
}

async function chooseVersion() {
  return select({
    message: '选择版本类型',
    choices: versionTypes.map((type) => ({ name: type, value: type })),
  });
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
  const packageFile = path.join(pkg.dir, 'package.json');
  const manifest = JSON.parse(await fs.readFile(packageFile, 'utf8'));
  manifest.version = version;
  await fs.writeFile(packageFile, `${JSON.stringify(manifest, null, 2)}\n`);
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
  const packages = await getReleasablePackages();
  if (packages.length === 0) throw new Error('packages 下没有包含 .changelog 内容的包。');
  const selected = await choosePackages(packages);
  if (selected.length === 0) return;
  const type = await chooseVersion();
  if (!type) return;
  const updates = selected.map((pkg) => ({ pkg, version: nextVersion(pkg.version, type) }));
  const branch = `release/${new Date().toISOString().slice(0, 10)}-${type}`;
  execFileSync('git', ['switch', '-c', branch], { stdio: 'inherit' });
  for (const { pkg } of updates) {
    const update = await updatePackageVersion(pkg, type);
    process.stdout.write(`${update.name}: ${update.from} -> ${update.to}\n`);
  }
  process.stdout.write(`\n已创建分支：${branch}\n`);
}

main().catch((error) => {
  process.stderr.write(`release 失败：${error.message}\n`);
  process.exitCode = 1;
});
