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
  generateUniModulesManifest,
} from './meta';

const PKG_DIR = 'packages/uniapp';

/** uni_modules 插件 ID：作者ID-插件英文名称 */
const UNI_MODULES_ID = 'tdesign-icons-uniapp';

/** easycom 识别的平台（uni-app 维度） */
const PLATFORMS = {
  'uni-app': {
    vue: { vue2: '√', vue3: '√' },
    web: { chrome: '√', safari: '√' },
    app: { vue: '√', nvue: 'x' },
    mp: {
      weixin: '√',
      alipay: '√',
      baidu: '√',
      toutiao: '√',
      kuaishou: '√',
      jd: '√',
      qq: '√',
      lark: '√',
    },
  },
};

/**
 * 传统 uni-app：组件后缀为 .vue（.uvue 仅 uni-app x 支持）
 *
 * 输出结构遵循 uni_modules 的 easycom 规范：
 *   src/components/<name>/<name>.vue  ->  模板里写 <name />
 */
export function uniAppTask(source: string[]) {
  return series(
    clearDir([`${PKG_DIR}/src/components`]),

    parallel(
      generateIcons({
        from: [...source],
        to: `${PKG_DIR}/src/components`,
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
        to: `${PKG_DIR}/src`,
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
        name: 'tdesign-icons-uniapp',
        displayName: 'TDesign Icons for uni-app',
        description: 'TDesign 图标库（uni-app / .vue），支持可变描边宽度与多色',
        keywords: ['tdesign', 'icons', 'uni-app', 'svg', 'icon'],
        engines: { HBuilderX: '^3.1.0', 'uni-app': '^4.1.0' },
        platforms: PLATFORMS,
      }),
    ),

    generateUniAppEntry({
      from: `${PKG_DIR}/src/components/*/*.vue`,
      to: `${PKG_DIR}/src`,
      extName: '.vue',
    }),
  );
}
