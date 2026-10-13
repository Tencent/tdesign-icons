import { series } from 'gulp';

import { generateIcons } from '../../../gulp/generate-icons';
import { aggregateFlutterIcons } from './flutter-aggregate';
import { flutterGetIconData } from './flutter-use-template';

/**
 * Flutter 图标生成任务（接入根目录 gulp 统一流程）。
 *
 * 分为两步，全部由 TS/JS 完成，不再依赖 Dart 环境：
 * 1. 复用根目录 gulp 的 `svgToElement` 管线（`replaceColor + propsString`）
 *    处理每个 SVG（颜色通道占位符 + 半透明重叠修复），
 *    通过 `flutter-use-template.ts` 生成 per-icon 的 SVG 数据 Dart 文件；
 * 2. 用 `flutter-aggregate.ts` 聚合这些数据文件，生成：
 *    - `lib/src/svg_data.g.dart`（多色/可变粗细 SVG 数据 map）
 *    - `lib/src/icons.g.dart`（具名图标组件，如 AiIcon / AddCircleIcon）
 *    - `lib/src/assets.g.dart`（iconfont 常量）
 *    - `fonts/t.ttf`（iconfont 字体文件）
 */

// gulp 管线生成的 per-icon SVG 数据目录
const svgDataTo = 'packages/flutter/tool/generated/svg';

// 品牌/logo 图标：保留原始品牌色，不参与多色/可变（对齐 view 端约束），
// 故用 `replaceColor: false` 使其 SVG 数据保留字面颜色（如 #000/#fff）。
const logoSource: string[] = ['svg/logo-*.svg'];
// 非 logo 图标：正常做颜色通道替换与半透明重叠修复。
const normalSource: string[] = ['svg/*.svg', '!svg/logo-*.svg'];

/**
 * 生成每个图标的 SVG 数据 Dart 文件（复用 gulp `svgToElement` 管线）。
 * 使用 `.dart` 扩展名，每个文件声明一个 `const String svg<Name>`。
 *
 * 分两趟生成：logo 图标保留原始品牌色（replaceColor: false），
 * 其余图标做多色占位符替换（replaceColor: true + propsString: true）。
 */
function generateFlutterSvgData() {
  return series(
    generateIcons({
      from: normalSource,
      to: svgDataTo,
      iconGenerator: flutterGetIconData,
      extName: '.dart',
      options: {
        replaceColor: true,
        propsString: true,
        // 复用 gulp 管线内置的半透明重叠修复：默认仅对栅格化检测出重叠的
        // 图标（detectOpacityOverlaps）注入 <mask>，与 React/Vue 端行为一致。
      },
    }),
    // 品牌图标不参与多色，单独一趟生成（保留原始品牌色）。
    generateIcons({
      from: logoSource,
      to: svgDataTo,
      iconGenerator: flutterGetIconData,
      extName: '.dart',
      options: {
        replaceColor: false,
        propsString: false,
      },
    }),
  );
}

export function flutterTask() {
  return series(
    generateFlutterSvgData(),
    async (): Promise<void> => {
      // eslint-disable-next-line no-console
      console.log('[flutter] 聚合生成 Flutter 图标代码...');
      aggregateFlutterIcons();
    },
  );
}
