import { createTransformStream } from './transform';
import type { IconElement } from './svg-info-check';

/**
 * TDesign 图标的多色/可变粗细占位符：
 * - 颜色: {f1|f2} 对应 fillColor，{s1|s2} 对应 strokeColor
 * - 粗细: {sw} 对应 strokeWidth
 *
 * 占位符必须由支持运行时求值的渲染层解析（例如 uni-app 的 SVG Data URI）。
 * uni-app x 的 uvue 不支持内联 svg 标签，但 `<image>` 支持 svg 格式的 Data URI，
 * 因此这两个包共用同一份「占位符 SVG 字符串」产物，运行时仅做字符串替换。
 */
export interface PlaceholderOptions {
  /** icon 名称，写入根节点的 data-icon，便于运行时定位与调试 */
  name?: string;
}

/** SVG 中本就是驼峰写法的属性，转成 kebab-case 会失效 */
const CAMEL_CASE_SVG_ATTRS = new Set([
  'viewBox',
  'maskUnits',
  'maskContentUnits',
  'preserveAspectRatio',
  'gradientUnits',
  'gradientTransform',
  'patternUnits',
  'patternTransform',
  'clipPathUnits',
]);

/** 这些属性值保持原样输出，不做解码/改写 */
function toKebabCase(key: string): string {
  if (CAMEL_CASE_SVG_ATTRS.has(key)) return key;
  return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/** 把 svgToElement 产生的 props.* 引用转换成模板占位符 */
function toPlaceholderValue(value: unknown): unknown {
  if (typeof value !== 'string') return value;

  // mask 在产物里是静态的（与小程序的 image 渲染方式一致），直接把引用替换成真实 id
  const overlapMask = /^props\.(overlapMaskId|overlapMaskUrl)_(.+)$/.exec(value);
  if (overlapMask) {
    const maskId = `${overlapMask[2]}-overlap`;
    return overlapMask[1] === 'overlapMaskUrl' ? `url(#${maskId})` : maskId;
  }

  if (!value.startsWith('props.')) return value;

  switch (value.slice('props.'.length)) {
    case 'strokeWidth':
      return '{sw}';
    case 'fillColor1':
    case 'filledColor':
      return "{f1||'currentColor'}";
    case 'fillColor2':
      return "{f2||'currentColor'}";
    case 'strokeColor1':
      return "{s1||'currentColor'}";
    case 'strokeColor2':
      return "{s2||'currentColor'}";
    default:
      return value;
  }
}

function serializeAttrs(attrs: Record<string, any>): string {
  return Object.keys(attrs)
    .reduce<string[]>((result, key) => {
      const value = toPlaceholderValue(attrs[key]);
      if (value === undefined || value === null || value === '') return result;
      return [...result, `${toKebabCase(key)}="${String(value)}"`];
    }, [])
    .join(' ');
}

function serializeNode(node: IconElement, options: PlaceholderOptions, isRoot: boolean): string {
  const attrs: Record<string, any> = { ...(node.attrs || {}) };

  if (isRoot) {
    // svgToElement 会把 viewBox 当成普通属性保存，这里保证根节点一定带 viewBox 与命名空间，
    // 否则 Data URI 在 image 组件内无法确定缩放比例
    const viewBox = attrs.viewBox || attrs['view-box'] || attrs.viewbox;
    delete attrs['view-box'];
    delete attrs.viewbox;
    if (viewBox) attrs.viewBox = viewBox;
    if (!attrs.xmlns) attrs.xmlns = 'http://www.w3.org/2000/svg';
    if (options.name) attrs['data-icon'] = options.name;
  }

  const attrString = serializeAttrs(attrs);
  const openTag = `<${node.tag}${attrString ? ` ${attrString}` : ''}`;

  if (!node.children || node.children.length === 0) {
    return `${openTag}/>`;
  }

  const children = node.children.map((child) => serializeNode(child, options, false)).join('');
  return `${openTag}>${children}</${node.tag}>`;
}

/**
 * 把 svgToElement 的元素树序列化成带占位符的 svg 字符串
 */
export function elementToPlaceholderSvg(element: IconElement, options: PlaceholderOptions = {}): string {
  return serializeNode(element, options, true);
}

/**
 * 把 svgToElement 的元素树 JSON 转换成占位符 svg 字符串，供 generateIcons 的 transformElement 使用
 */
export function svgElementJsonToTemplate(elementJson: string, name: string): string {
  return elementToPlaceholderSvg(JSON.parse(elementJson) as IconElement, { name });
}

export function svgToPlaceholderTemplate(options: PlaceholderOptions = {}) {
  return createTransformStream((svgElementString, { stem }) => {
    const element = JSON.parse(svgElementString) as IconElement;
    return elementToPlaceholderSvg(element, { ...options, name: options.name || stem });
  });
}
