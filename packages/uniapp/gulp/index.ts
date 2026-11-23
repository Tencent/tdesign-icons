import { parallel, series } from 'gulp';

import { generateIcons } from '../../../gulp/generate-icons';
import { clearDir } from '../../../gulp/clean-dir';
import { svgElementJsonToTemplate } from '../../../gulp/svg-to-template';

import { uniAppGetIconFileContent } from './template-generator';
import { generateIconMap } from './icon-map';
import {
  generateUniAppEntry,
  generateUniAppManifest,
  generateUniAppTypeMap,
} from './meta';

const PLUGIN_DIR = 'packages/uniapp/uni_modules/tdesign-icons-uniapp';

/**
 * 传统 uni-app：组件后缀为 .vue（.uvue 仅 uni-app x 支持）
 *
 * 生成物直接落在 uni_modules 插件目录下，该目录同时是 npm 包根，
 * 组件结构遵循 easycom 规范：components/<name>/<name>.vue -> 模板里写 <name />
 */
export function uniAppTask(source: string[]) {
  return series(
    clearDir([`${PLUGIN_DIR}/components`]),

    parallel(
      generateIcons({
        from: [...source],
        to: `${PLUGIN_DIR}/components`,
        iconGenerator: uniAppGetIconFileContent,
        extName: '.vue',
        dirname: true,
        // 组件名 / 目录名带 -icon 后缀：components/close-icon/close-icon.vue -> <close-icon />
        // 注意：class 名仍用原始 stem（t-icon-close），由模板决定
        filenameSuffix: '-icon',
        options: {
          replaceColor: true,
          propsString: true,
        },
        transformElement: (elementJson, name) => svgElementJsonToTemplate(elementJson, name),
      }),

      // t-icon 按 name 动态渲染所需的全量图标表，与各图标组件同源
      generateIconMap({
        from: [...source],
        to: `${PLUGIN_DIR}`,
      }),

      generateUniAppManifest({
        from: source,
        to: `${PLUGIN_DIR}`,
      }),
      generateUniAppTypeMap({
        from: source,
        to: `${PLUGIN_DIR}`,
      }),
    ),

    generateUniAppEntry({
      from: `${PLUGIN_DIR}/components/*/*.vue`,
      to: `${PLUGIN_DIR}`,
      extName: '.vue',
    }),
  );
}
