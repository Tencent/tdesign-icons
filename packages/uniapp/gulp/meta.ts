import { dest, src } from 'gulp';
import concat from 'gulp-concat';

import { createTransformStream } from '../../../gulp/transform';
import { upperCamelCase } from '../../../gulp/util';

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
