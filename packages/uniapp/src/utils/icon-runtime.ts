/**
 * TDesign 图标运行时（uni-app / JS 引擎版）
 *
 * 图标产物是「带占位符的 svg 字符串」，本模块负责：
 * 1. 把 {f1||'currentColor'} / {s1||'currentColor'} / {sw} 替换为真实的颜色与描边宽度
 * 2. 编码成 Data URI，交给 <image> 渲染
 *
 * 传统 uni-app 不支持内联 svg 标签（小程序端），H5/App 也可以统一走 <image>，
 * 因此 H5 / App / 小程序共用同一条渲染路径，无需按平台分支。
 */

export interface IconSizeStyle {
  width?: string;
  height?: string;
}

const DEFAULT_STROKE_WIDTH = 2;

/** small/medium/large 的尺寸类名，样式见 style/index.css */
const SIZE_CLASS_NAMES: Record<string, string> = {
  small: 't-size-s',
  medium: 't-size-m',
  large: 't-size-l',
};

function toColorArray(color: string | string[] | null): string[] {
  if (color == null) {
    return [];
  }
  if (typeof color === 'string') {
    return [color];
  }
  return color;
}

function pickColor(colors: string[], index: number, fallback: string): string {
  if (index >= colors.length) {
    // 未显式传色时，第 2 个颜色位回落到第 1 个，与 web 端行为保持一致
    const first = colors.length > 0 ? colors[0] : '';
    return first !== '' ? first : fallback;
  }
  const color = colors[index];
  return color !== '' ? color : fallback;
}

function buildColorPattern(kind: string): RegExp {
  return new RegExp(`\\{${kind}(\\d+)\\|\\|'([^']*)'\\}`, 'g');
}

/**
 * 用真实颜色替换模板里的占位符。
 * - 未传颜色时回落到模板里声明的默认值（通常是 currentColor）
 * - 传单个颜色时，多色图标的每个颜色位都用同一个值
 */
export function resolveSvg(
  template: string,
  strokeColor: string | string[] | null,
  fillColor: string | string[] | null,
  strokeWidth: number,
  uid = '',
): string {
  if (!template) {
    return '';
  }

  const fills = toColorArray(fillColor);
  const strokes = toColorArray(strokeColor);

  let svg = template.replace(buildColorPattern('f'), (_match, index, fallback) => pickColor(fills, Number(index) - 1, fallback));
  svg = svg.replace(buildColorPattern('s'), (_match, index, fallback) => pickColor(strokes, Number(index) - 1, fallback));

  const width = strokeWidth > 0 ? strokeWidth : DEFAULT_STROKE_WIDTH;
  svg = svg.replace(/\{sw\}/g, String(width));

  // 给 <mask> 的 id 拼上实例后缀，避免同页面多个图标之间 id 冲突
  return uid ? svg.replace(/-overlap/g, `-${uid}-overlap`) : svg;
}

/**
 * 生成 <image> 可用的 Data URI。
 *
 * 必须转义 `<` `>` `#` 以及引号 `"` `'`：
 * - `<` `>` `#` 会破坏 URL 结构（`#` 是颜色值前缀，不转义会被当成锚点）
 * - uni-app H5 的 <image> 内部是用 `background-image: url("...")` 渲染的，
 *   未转义的 `"` 会提前闭合 CSS 字符串，导致背景图为空、图标不显示
 *
 * 相比整段 encodeURIComponent，体积更小且保持可读。
 */
export function toSvgDataUri(svg: string): string {
  if (!svg) {
    return '';
  }
  const encoded = svg.replace(/<|>|#|"|'|\(|\)/g, (char) => encodeURIComponent(char));
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

/** 尺寸既支持 small/medium/large 预置值，也支持 '20px'、'1.5em' */
export function resolveSizeStyle(size: string): IconSizeStyle {
  if (!size || size === 'default' || SIZE_CLASS_NAMES[size]) {
    return {};
  }
  return { width: size, height: size };
}

export { SIZE_CLASS_NAMES, DEFAULT_STROKE_WIDTH };
