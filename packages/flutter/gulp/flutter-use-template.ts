import { upperCamelCase } from '../../../gulp/util';
import type { IconElement } from '../../../gulp/svg-info-check';

/**
 * Flutter 图标生成模板。
 *
 * 复用根目录 gulp 的 `svgToElement` 管线（`replaceColor + propsString`）来处理
 * SVG 颜色通道与半透明重叠，本文件只负责把处理后的 element 渲染回带占位符的
 * SVG 字符串，并生成对应的 Dart 数据文件。
 *
 * gulp 管线输出的颜色占位符是 `props.fillColor1` 之类（对齐 React/Vue 的 props 约定），
 * 这里映射为 Flutter 运行时（`lib/src/icon_base.dart`）约定的 `__FILL1__` 等占位符。
 */

/** gulp `propsString` 模式占位符 → Flutter 运行时占位符。 */
const PLACEHOLDER_MAP: Record<string, string> = {
  'props.fillColor1': '__FILL1__',
  'props.fillColor2': '__FILL2__',
  'props.strokeColor1': '__STROKE1__',
  'props.strokeColor2': '__STROKE2__',
  // 单色填充图标（无 id），对齐 vue-next 的 filledColor（fillColor1 ?? currentColor）
  'props.filledColor': '__COLOR__',
  'props.strokeWidth': '__STROKE_WIDTH__',
};

/**
 * 需要渲染为 kebab-case 的 SVG 属性。
 * `svgToElement` 会把源 SVG 属性统一 camelCase（如 `stroke-width` → `strokeWidth`），
 * 渲染回字符串时必须还原为 kebab-case；而 `viewBox` / `maskUnits` / `maskContentUnits`
 * 等在 SVG 中本就是驼峰，必须保持原样（不能像 `gulp/util/render.ts` 那样对所有
 * 属性统一 decamelize）。
 */
const KEBAB_ATTRS = new Set([
  'clipPath',
  'clipRule',
  'fillOpacity',
  'fillRule',
  'floodColor',
  'floodOpacity',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'gradientTransform',
  'gradientUnits',
  'lightingColor',
  'markerEnd',
  'markerMid',
  'markerStart',
  'maskType',
  'paintOrder',
  'pointerEvents',
  'spreadMethod',
  'stopColor',
  'stopOpacity',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeMiterlimit',
  'strokeOpacity',
  'strokeWidth',
  'textAnchor',
  'textDecoration',
  'transformOrigin',
  'vectorEffect',
]);

/** 将驼峰属性名转为 kebab-case。 */
function toKebabCase(attr: string): string {
  return attr.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/** 将节点属性中的 gulp 占位符替换为 Flutter 占位符。 */
function mapPlaceholders(attrs: Record<string, unknown>): void {
  Object.keys(attrs).forEach((key) => {
    const value = attrs[key];
    if (typeof value === 'string' && PLACEHOLDER_MAP[value]) {
      attrs[key] = PLACEHOLDER_MAP[value];
      return;
    }

    // 半透明重叠 mask：gulp 用 `props.overlapMaskId_<pathId>` /
    // `props.overlapMaskUrl_<pathId>` 占位，需转为合法的 url(#id) 引用。
    // Flutter 每个图标通过 `SvgPicture.string` 独立渲染，mask id 在单图标内
    // 唯一即可，无需像 React/Vue 那样加实例前缀（那是对多图标共用 SVG sprite
    // 的兼容处理）。
    if (key === 'id' && typeof value === 'string' && value.startsWith('props.overlapMaskId_')) {
      attrs[key] = `overlap-mask-${value.slice('props.overlapMaskId_'.length)}`;
      return;
    }
    if (key === 'mask' && typeof value === 'string' && value.startsWith('props.overlapMaskUrl_')) {
      attrs[key] = `url(#overlap-mask-${value.slice('props.overlapMaskUrl_'.length)})`;
    }
  });
}

function walk(node: IconElement): void {
  if (node.attrs) {
    mapPlaceholders(node.attrs);
  }
  node.children?.forEach(walk);
}

/** 渲染单个节点为 SVG 字符串（保留 viewBox/maskUnits 等驼峰属性）。 */
function renderNode(node: IconElement): string {
  const { attrs } = node;
  let attrString = '';
  if (attrs) {
    const attrArray = Object.keys(attrs).reduce((classes: string[], currentKey) => {
      const val = attrs[currentKey];
      if (val === undefined || val === null) {
        return classes;
      }
      const attrName = currentKey === 'className'
        ? 'class'
        : (KEBAB_ATTRS.has(currentKey) ? toKebabCase(currentKey) : currentKey);
      classes.push(`${attrName}="${String(val)}"`);
      return classes;
    }, []);
    if (attrArray.length) {
      attrString = ` ${attrArray.join(' ')}`;
    }
  }

  const childrenString = node.children?.map((child) => renderNode(child)).join('') ?? '';
  return `<${node.tag}${attrString}>${childrenString}</${node.tag}>`;
}

/**
 * 生成单个图标的 Dart 数据文件（仅含该图标的 SVG 数据常量）。
 *
 * @param props.name 图标名（kebab-case，如 `ai-1`）
 * @param props.element gulp `svgToElement` 处理后的 element JSON 字符串
 */
export function flutterGetIconData({
  name,
  element,
}: {
  name: string;
  element: string;
}): string {
  const node = JSON.parse(element) as IconElement;
  walk(node);

  // 渲染回 SVG 字符串（含 __FILL1__/__STROKE1__ 等占位符）
  const svg = renderNode(node);

  const constName = `svg${upperCamelCase(name)}`;
  // 使用 raw 多行字符串字面量，`$`/`\` 均无需转义；
  // 通过注释保留原始图标名，便于 `generate.dart` 聚合时读取。
  return `// GENERATED CODE - DO NOT MODIFY BY HAND\n// name: ${name}\nconst String ${constName} = r'''${svg}'''\n;\n`;
}
