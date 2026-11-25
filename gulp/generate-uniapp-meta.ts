import { dest, src } from 'gulp';
import concat from 'gulp-concat';

import { createTransformStream } from './transform';
import { upperCamelCase } from './util';

/**
 * uni-app / uni-app x 共用的入口、图标清单、全局图标配置类型生成，以及通用组件模板的输出。
 *
 * 与 generate-entry / generate-manifest / generate-type-map 的区别：
 * 组件位于 uni_modules 的 easycom 目录下（components/<name>/<name><extName>），产物是 .uts 入口。
 */

/**
 * 把手写的组件模板原样输出成 easycom 组件。
 *
 * 用于 t-icon 这类不随单个图标变化的通用组件：模板放在各包的 gulp/template 下，
 * 与图标组件一起生成到 components/<name>/ 下，才会被 easycom 扫描到。
 */
export const generateUniAppComponent = ({ from, to }: { from: string; to: string }) => function generateUniAppComponent() {
  return src(from).pipe(dest(to));
};

/**
 * 生成 icons 入口文件。
 *
 * 组件位于 `components/<name>/<name><extName>`（uni_modules easycom 结构），
 * 因此这里用目录名拼路径，不依赖文件后缀。
 */
export const generateUniAppEntry = ({
  from,
  to,
  extName,
}: {
  from: string;
  to: string;
  /** `.vue` / `.uvue`，用于拼 `./components/<name>/<name><extName>` */
  extName: string;
}) => function generateUniAppEntry() {
  const itemTemplate = createTransformStream(
    // 目录名带 -icon 后缀（easycom 标签名即目录名），导出名随之变成 CloseIcon
    (_, { stem: dir }) => `export { default as ${upperCamelCase(dir)} } from './components/${dir}/${dir}${extName}';\n`,
  );

  return src(from)
    .pipe(itemTemplate)
    .pipe(concat('index.uts'))
    .pipe(dest(to));
};

/**
 * 生成图标清单，与 web 端 manifest 结构保持一致，方便上层组件库做图标列表/检索
 */
export const generateUniAppManifest = ({ from, to }: { from: string[]; to: string }) => function generateUniAppManifest() {
  const itemTemplate = createTransformStream((_, { stem: name }) => `    { stem: "${name}", icon: "${upperCamelCase(name)}Icon"  },`);
  return src(from)
    .pipe(itemTemplate)
    .pipe(concat('NOT-VALID'))
    .pipe(createTransformStream((content) => `export const manifest = [\n${content}\n];\n`))
    .pipe(concat('manifest.ts'))
    .pipe(dest(to));
};

/**
 * 生成全局图标配置类型（用于 TDesign 组件库的图标替换能力）
 */
export const generateUniAppTypeMap = ({ from, to }: { from: string[]; to: string }) => function generateUniAppTypeMap() {
  const itemTemplate = createTransformStream((_, { stem: name }) => `${upperCamelCase(name)}Icon?: any\n`);

  return src(from)
    .pipe(itemTemplate)
    .pipe(concat('NOT-VALID'))
    .pipe(createTransformStream((content) => `export type GlobalIconConfig = {\n${content}};\n`))
    .pipe(concat('global-config.ts'))
    .pipe(dest(to));
};
