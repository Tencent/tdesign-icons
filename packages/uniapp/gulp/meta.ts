import { dest, src } from 'gulp';
import concat from 'gulp-concat';
import { Readable } from 'stream';
import Vinyl from 'vinyl';

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

/**
 * 生成 uni_modules 插件的 package.json。
 *
 * uni_modules 要求插件目录下必须有 package.json，字段格式为 `作者ID-插件英文名称`；
 * components 目录会自动被 easycom 扫描，因此使用方无需 import，直接写 `<close />`。
 */
export const generateUniModulesManifest = ({
  id,
  name,
  displayName,
  description,
  keywords,
  engines,
  platforms,
  to,
}: {
  id: string;
  name: string;
  displayName: string;
  description: string;
  keywords: string[];
  engines: Record<string, string>;
  platforms: Record<string, unknown>;
  to: string;
}) => function generateUniModulesManifest() {
  const content = {
    id,
    displayName,
    version: '0.1.0',
    description,
    keywords,
    repository: 'https://github.com/Tencent/tdesign-icons',
    engines,
    dcloudext: {
      type: 'component-vue',
      category: ['前端组件', '通用组件'],
      sale: {
        regular: { price: '0.00' },
        sourcecode: { price: '0.00' },
      },
      declaration: {
        ads: '无',
        data: '插件不采集任何数据',
        permissions: '无',
      },
    },
    uni_modules: {
      dependencies: [],
      platforms: { client: platforms },
      // 图标是纯静态组件，未使用的组件不应被打进产物
      treeShaking: { app: true, web: true },
    },
    // 同时保留 npm 包名，方便从 npm 安装后复制到 uni_modules
    name,
  };

  return Readable.from([new Vinyl({
    path: 'package.json',
    contents: Buffer.from(`${JSON.stringify(content, null, 2)}\n`),
  })]).pipe(dest(to));
};
