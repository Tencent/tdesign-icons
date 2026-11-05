import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const UNIAPP_DIR = path.join(root, 'packages/uniapp/src');
const UNIAPP_X_DIR = path.join(root, 'packages/uniapp-x/src');

/** 两个包各自的组件后缀 */
const UNIAPP_EXT = '.vue';
const UNIAPP_X_EXT = '.uvue';

/** uni_modules 下 easycom 依赖的目录结构：components/<name>/<name>.vue */
const UNI_MODULES_IDS = ['tdesign-icons-uniapp', 'tdesign-icons-uniapp-x'];

const GENERATED_FILES = ['index.uts', 'manifest.ts', 'global-config.ts'];

/**
 * 读取组件目录名（即 easycom 标签名），并校验：
 * - 两级结构 components/<name>-icon/<name>-icon<ext>
 * - 目录名带 -icon 后缀（组件名 close-icon，class 名仍是 t-icon-close）
 */
function collectIcons(dir, ext) {
  const componentsDir = path.join(dir, 'components');
  const names = new Set();
  const problems = [];

  fs.readdirSync(componentsDir).forEach((entry) => {
    const entryPath = path.join(componentsDir, entry);
    if (!fs.statSync(entryPath).isDirectory()) {
      problems.push(`components 下存在非目录项：${entry}（easycom 只识别两级目录结构）`);
      return;
    }
    if (!entry.endsWith('-icon')) {
      problems.push(`组件目录未带 -icon 后缀：${entry}`);
    }
    const file = path.join(entryPath, `${entry}${ext}`);
    if (!fs.existsSync(file)) {
      problems.push(`缺少组件文件：components/${entry}/${entry}${ext}`);
      return;
    }
    names.add(entry);
  });

  return { names, problems };
}

function main() {
  if (!fs.existsSync(path.join(UNIAPP_DIR, 'index.uts'))) {
    throw new Error(`缺少生成产物：${UNIAPP_DIR}/index.uts，请先执行 pnpm run generate`);
  }

  const vue = collectIcons(UNIAPP_DIR, UNIAPP_EXT);
  const uvue = collectIcons(UNIAPP_X_DIR, UNIAPP_X_EXT);
  const problems = [...vue.problems, ...uvue.problems];

  vue.names.forEach((name) => {
    if (!uvue.names.has(name)) problems.push(`uniapp-x 缺少图标 ${name}`);
  });
  uvue.names.forEach((name) => {
    if (!vue.names.has(name)) problems.push(`uniapp 缺少图标 ${name}`);
  });

  // 入口/清单只应存在后缀差异，去掉后缀后必须完全一致（顺序由文件系统决定，比较时排序）
  const normalize = (content) => content
    .split(UNIAPP_X_EXT).join(UNIAPP_EXT)
    .split('\n')
    .sort()
    .join('\n');
  GENERATED_FILES.forEach((file) => {
    const left = normalize(fs.readFileSync(path.join(UNIAPP_DIR, file), 'utf8'));
    const right = normalize(fs.readFileSync(path.join(UNIAPP_X_DIR, file), 'utf8'));
    if (left !== right) problems.push(`${file} 与 uniapp 不一致`);
  });

  // uni_modules 元信息必须存在，且 id 与目录约定一致
  UNI_MODULES_IDS.forEach((id, index) => {
    const dir = index === 0 ? UNIAPP_DIR : UNIAPP_X_DIR;
    const file = path.join(dir, 'package.json');
    if (!fs.existsSync(file)) {
      problems.push(`${path.relative(root, file)} 不存在（uni_modules 插件必需）`);
      return;
    }
    const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (pkg.id !== id) problems.push(`${id}/package.json 的 id 为 ${pkg.id}，应为 ${id}`);
    if (!pkg.uni_modules) problems.push(`${id}/package.json 缺少 uni_modules 字段`);
  });

  if (problems.length) {
    process.stderr.write(`❌ uni-app / uni-app x 产物不一致\n${problems.map((item) => `  - ${item}`).join('\n')}\n`);
    process.exitCode = 1;
    return;
  }

  process.stdout.write(`✅ uni-app (.vue) / uni-app x (.uvue) 图标一致：${vue.names.size} 个\n`);
}

main();
