import { parallel, series } from 'gulp';

import { generateIcons } from '../../../gulp/generate-icons';
import { clearDir } from '../../../gulp/clean-dir';
import { svgElementJsonToTemplate } from '../../../gulp/svg-to-template';
import {
  generateUniAppEntry,
  generateUniAppManifest,
  generateUniAppTypeMap,
  generateUniModulesManifest,
} from '../../uniapp/gulp/meta';

import { uniAppXGetIconFileContent } from './template-generator';

const PKG_DIR = 'packages/uniapp-x';

/** uni_modules 插件 ID：作者ID-插件英文名称 */
const UNI_MODULES_ID = 'tdesign-icons-uniapp-x';

/** easycom 识别的平台（uni-app x 维度） */
const PLATFORMS = {
  'uni-app-x': {
    web: { chrome: '√', safari: '√' },
    app: { android: '√', ios: '√', harmony: '√' },
    mp: { weixin: '√', alipay: '√', toutiao: '√' },
  },
};

/**
 * uni-app x：组件后缀为 .uvue，脚本为 uts，通过 <image> + SVG Data URI 渲染
 *
 * 输出结构遵循 uni_modules 的 easycom 规范：
 *   src/components/<name>/<name>.uvue  ->  模板里写 <name />
 */
export function uniAppXTask(source: string[]) {
  return series(
    clearDir([`${PKG_DIR}/src/components`]),

    parallel(
      generateIcons({
        from: [...source],
        to: `${PKG_DIR}/src/components`,
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
        to: `${PKG_DIR}/src`,
      }),
      generateUniAppTypeMap({
        from: source,
        to: `${PKG_DIR}/src`,
      }),
      generateUniModulesManifest({
        to: `${PKG_DIR}/src`,
        id: UNI_MODULES_ID,
        name: 'tdesign-icons-uniapp-x',
        displayName: 'TDesign Icons for uni-app x',
        description: 'TDesign 图标库（uni-app x / uvue），支持可变描边宽度与多色',
        keywords: ['tdesign', 'icons', 'uni-app-x', 'uvue', 'svg'],
        engines: { HBuilderX: '^4.81.0', 'uni-app-x': '^4.81.0' },
        platforms: PLATFORMS,
      }),
    ),

    generateUniAppEntry({
      from: `${PKG_DIR}/src/components/*/*.uvue`,
      to: `${PKG_DIR}/src`,
      extName: '.uvue',
    }),
  );
}
