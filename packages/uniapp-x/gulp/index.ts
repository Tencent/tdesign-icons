import { parallel, series } from 'gulp';

import { generateIcons } from '../../../gulp/generate-icons';
import { clearDir } from '../../../gulp/clean-dir';
import { svgElementJsonToTemplate } from '../../../gulp/svg-to-template';
import {
  generateUniAppEntry,
  generateUniAppManifest,
  generateUniAppTypeMap,
} from '../../uniapp/gulp/meta';

import { uniAppXGetIconFileContent } from './template-generator';

const PLUGIN_DIR = 'packages/uniapp-x/uni_modules/tdesign-icons-uniapp-x';

/**
 * uni-app x：组件后缀为 .uvue，脚本为 uts
 *
 * 生成物直接落在 uni_modules 插件目录下，该目录同时是 npm 包根，
 * 组件结构遵循 easycom 规范：components/<name>/<name>.uvue -> 模板里写 <name />
 */
export function uniAppXTask(source: string[]) {
  return series(
    clearDir([`${PLUGIN_DIR}/components`]),

    parallel(
      generateIcons({
        from: [...source],
        to: `${PLUGIN_DIR}/components`,
        iconGenerator: uniAppXGetIconFileContent,
        extName: '.uvue',
        dirname: true,
        // 组件名 / 目录名带 -icon 后缀：components/close-icon/close-icon.uvue -> <close-icon />
        // 注意：class 名仍用原始 stem（t-icon-close），由模板决定
        filenameSuffix: '-icon',
        options: {
          replaceColor: true,
          propsString: true,
        },
        transformElement: (elementJson, name) => svgElementJsonToTemplate(elementJson, name),
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
      from: `${PLUGIN_DIR}/components/*/*.uvue`,
      to: `${PLUGIN_DIR}`,
      extName: '.uvue',
    }),
  );
}
