#!/usr/bin/env node
/**
 * 生成示例工程「全部图标」标签页用到的图标名清单，并维护 uni_modules 软链接。
 *
 * 图标名从固定版本的 CDN 字体 CSS（.t-icon-<name>:before）解析，
 * 与 packages/uniapp/src/utils/icon-unicode.js 的码点表同源，保证清单里的名字都有对应字形；
 * 图标内容由 CDN 字体 + 码点表渲染。解析方式参考 tdesign-miniprogram 的 update-icons.mjs。
 *
 * 用法：corepack pnpm run generate [-- --version 0.4.6]
 * 可用 ICONS_VERSION / ICONS_CSS_URL 覆盖版本与数据源；拉取失败时回退到本地缓存。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** 与 src/style/iconfont.css 的 @font-face、utils/icon-unicode.js 的码点表保持一致 */
const DEFAULT_VERSION = '0.4.6';
const versionFlagIndex = process.argv.indexOf('--version');
const VERSION = (versionFlagIndex > -1 && process.argv[versionFlagIndex + 1])
  || process.env.ICONS_VERSION
  || DEFAULT_VERSION;
const CSS_URL = process.env.ICONS_CSS_URL
  || `https://tdesign.gtimg.com/icon/${VERSION}/fonts/index.css`;

const EXAMPLE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(EXAMPLE_DIR, 'src');
const CACHE_FILE = path.join(EXAMPLE_DIR, '.cache', `icons-${VERSION}.css`);
const UNI_MODULES_DIR = path.join(SRC_DIR, 'uni_modules', 'tdesign-icons-uniapp');
/** 相对 src/uni_modules/ -> packages/uniapp/src */
const UNI_MODULES_TARGET = path.join('..', '..', '..', 'src');

/** 解析 .t-icon-<name>:before { content: "\eXXX"; }，按 CSS 顺序去重 */
function parseIconNames(css) {
  const seen = new Set();
  const names = [];
  const rule = /\.t-icon-([\w-]+):before\s*\{\s*content:\s*"[^"]+";/g;
  for (const match of css.matchAll(rule)) {
    const name = match[1];
    if (seen.has(name)) continue;
    seen.add(name);
    names.push(name);
  }
  if (names.length === 0) {
    throw new Error(`CSS 中未解析到 .t-icon-*:before 规则：${CSS_URL}`);
  }
  return names;
}

async function loadCss() {
  try {
    const res = await fetch(CSS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const css = await res.text();
    parseIconNames(css); // 校验通过才写缓存，避免把错误页面缓存下来
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
    fs.writeFileSync(CACHE_FILE, css);
    console.log(`[css] ${CSS_URL}`);
    return css;
  } catch (err) {
    if (fs.existsSync(CACHE_FILE)) {
      console.warn(`[css] 拉取失败（${err.message}），改用本地缓存`);
      return fs.readFileSync(CACHE_FILE, 'utf8');
    }
    throw new Error(`无法获取 CSS 且没有本地缓存：${err.message}`);
  }
}

/** easycom 依赖 uni_modules/<id>/components/<name>/<name>.vue，保持整包软链接 */
function ensureUniModulesLink() {
  const stat = fs.lstatSync(UNI_MODULES_DIR, { throwIfNoEntry: false });
  if (stat) {
    if (stat.isSymbolicLink()) {
      if (fs.readlinkSync(UNI_MODULES_DIR) === UNI_MODULES_TARGET) return;
      fs.unlinkSync(UNI_MODULES_DIR);
    } else {
      fs.rmSync(UNI_MODULES_DIR, { recursive: true, force: true });
    }
  }
  fs.mkdirSync(path.dirname(UNI_MODULES_DIR), { recursive: true });
  fs.symlinkSync(UNI_MODULES_TARGET, UNI_MODULES_DIR);
}

function writeIconNames(names) {
  const content = '/* 由 pnpm run generate 生成，请勿手动修改 */\n'
    + `export const ICON_NAMES = [\n${names.map((name) => `  ${JSON.stringify(name)},\n`).join('')}];\n`;
  fs.writeFileSync(path.join(SRC_DIR, 'utils', 'icon-names.js'), content);
}

if (VERSION !== DEFAULT_VERSION) {
  console.warn(`[icons] 版本 ${VERSION} 与包内静态码点表 / 字体（${DEFAULT_VERSION}）不同，请同步更新 packages/uniapp/src/utils/icon-unicode.js 与 src/style/iconfont.css`);
}

const css = await loadCss();
const names = parseIconNames(css);

ensureUniModulesLink();
writeIconNames(names);

console.log(`[icons] ${names.length} 个图标名 -> src/utils/icon-names.js`);
