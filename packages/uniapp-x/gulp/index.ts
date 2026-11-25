import { parallel, series } from 'gulp';

import { generateIcons } from '../../../gulp/generate-icons';
import { clearDir } from '../../../gulp/clean-dir';
import { svgElementJsonToTemplate } from '../../../gulp/svg-to-template';
import {
  generateUniAppComponent,
  generateUniAppEntry,
  generateUniAppManifest,
  generateUniAppTypeMap,
} from '../../../gulp/generate-uniapp-meta';

import { uniAppXGetIconFileContent } from './template-generator';

const PLUGIN_DIR = 'packages/uniapp-x/src/uni_modules/tdesign-icons-uniapp-x';

/**
 * uni-app x：组件后缀为 .uvue，脚本为 <script setup lang="ts">（见 template/icon.uvue 的说明）
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

      // 通用字体图标组件 t-icon：源码是手写模板，不随单个图标变化；
      // 和图标组件一起生成到 components/ 下，才会被 easycom 扫描到
      generateUniAppComponent({
        from: 'packages/uniapp-x/gulp/template/t-icon.uvue',
        to: `${PLUGIN_DIR}/components/t-icon`,
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
