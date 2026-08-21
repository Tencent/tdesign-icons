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

const source: string[] = ['svg/*.svg'];

/**
 * 生成每个图标的 SVG 数据 Dart 文件（复用 gulp `svgToElement` 管线）。
 * 使用 `.dart` 扩展名，每个文件声明一个 `const String svg<Name>`。
 */
function generateFlutterSvgData() {
  return generateIcons({
    from: source,
    to: svgDataTo,
    iconGenerator: flutterGetIconData,
    extName: '.dart',
    options: {
      replaceColor: true,
      propsString: true,
      // 复用 gulp 管线内置的半透明重叠修复：默认仅对栅格化检测出重叠的
      // 图标（detectOpacityOverlaps）注入 <mask>，与 React/Vue 端行为一致。
    },
  });
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
