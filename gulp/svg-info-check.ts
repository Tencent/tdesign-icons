import { parse } from 'svg-parser';
import camelCase from 'camelcase';
import { specifiedIcons } from './util/const';
import { createTransformStream } from './transform';
import { optimizeOpacityOverlaps } from './opacity-overlap';
import { detectOpacityOverlaps } from './detect-opacity-overlap';

export interface Attrs {
  style?: { [key: string]: any } | string;

  [key: string]: string | object;
}

export interface IconNode {
  tagName: string;
  properties: Attrs;
  children: IconNode[];

  [key: string]: any;
}

export interface IconElement {
  tag: string;
  attrs: Attrs;
  children?: IconElement[];
}

export interface SvgToElementOptions {
  replaceColor?: boolean;
  propsString?: boolean;
  preventOpacityOverlap?: boolean;
}

function normalizeWidthAndHeight(node: IconElement) {
  const { attrs } = node;
  attrs.width = '1em';
  attrs.height = '1em';
}

function normalizeChildren(node: IconElement) {
  if (node.children?.length === 0) {
    // eslint-disable-next-line no-param-reassign
    delete node.children;
  }
}

function normalizeStyle(node: IconElement) {
  const { attrs } = node;
  const styleMap: { [key: string]: any } = {};

  if (typeof attrs.style === 'string') {
    const styles = attrs.style.split(';');
    styles.forEach((chunk) => {
      const [key, value] = chunk.split(':');
      styleMap[key] = value;
    });
    attrs.style = styleMap;
  }
}

function normalizeClassName(node: IconElement) {
  const { attrs } = node;

  if (attrs.class) {
    // React use className instead of class
    attrs.className = attrs.class;
    delete attrs.class;
  }
}

/**
 * for single colored icons, we assume that #000 is placeholder for 'currentColor'
 */
function normalizeColor(node: IconElement, options: SvgToElementOptions, nodeId?:string, isSpecified?:boolean) {
  if (!options.replaceColor) {
    return;
  }

  const { attrs } = node;

  if (options.propsString) {
    if (attrs.fill && attrs.fill !== 'none') {
      // specified 图标以描边方式处理填充，统一走 strokeColor1 通道；
      // 必须用 else if 收口，避免后续分支再次覆盖已写入的 strokeColor1。
      if (isSpecified) {
        attrs.fill = 'props.strokeColor1';
      } else if (attrs.id === 'fill1') {
        attrs.fill = 'props.fillColor1';
      } else if (attrs.id === 'fill2') {
        attrs.fill = 'props.fillColor2';
      } else if (!attrs.id) {
        if (nodeId === 'fill1') attrs.fill = 'props.fillColor1';
        else if (nodeId === 'fill2') attrs.fill = 'props.fillColor2';
        else {
          // 填充图标，特殊处理，默认为 currentColor，支持通过 style color 直接注入
          attrs.fill = 'props.filledColor';
        }
      }
    }

    if (attrs.stroke && attrs.stroke !== 'none') {
      attrs.strokeWidth = 'props.strokeWidth';
      if (attrs.id === 'stroke1') attrs.stroke = 'props.strokeColor1';
      else if (attrs.id === 'stroke2') attrs.stroke = 'props.strokeColor2';
      else if (!attrs.id) {
        if (nodeId === 'stroke1') attrs.stroke = 'props.strokeColor1';
        else if (nodeId === 'stroke2') attrs.stroke = 'props.strokeColor2';
      }
    }
  } else {
    if (attrs.fill && attrs.fill !== 'none') {
      attrs.fill = attrs.fill === '#000' ? 'currentColor' : 'transparent';
    }

    if (attrs.stroke && attrs.stroke !== 'none') {
      attrs.stroke = 'currentColor';
    }
  }
}

function normalizeAttrs(node: IconElement, options: SvgToElementOptions, nodeId?:string, isSpecified?:boolean) {
  const { attrs } = node;

  Object.keys(attrs).forEach((key) => {
    if (key.indexOf('-') !== -1) {
      attrs[camelCase(key)] = attrs[key];
      delete attrs[key];
    }
  });

  normalizeStyle(node);
  normalizeClassName(node);
  normalizeColor(node, options, nodeId, isSpecified);
}

/**
 * map svg-parser ast to React element, so it would be convenient to render
 */
function astToElement(wrappedRoot: IconNode[], options: SvgToElementOptions, nodeId?:string, isSpecified?:boolean): IconElement[] {
  return wrappedRoot
    .map((node) => ({
      tag: node.tagName,
      attrs: node.properties,
      children: astToElement(node.children, options, ['fill1', 'fill2', 'stroke1', 'stroke2'].includes(node.properties.id as string) ? node.properties.id as string : '', isSpecified),
    }))
    .map((node: IconElement) => {
      normalizeChildren(node);
      normalizeAttrs(node, options, nodeId, isSpecified);
      return node;
    });
}

export function svgToElement(
  options: SvgToElementOptions = {
    replaceColor: false,
    propsString: false,
  },
) {
  return createTransformStream((svgString, file) => {
    const ast = parse(svgString);
    const isSpecified = specifiedIcons.includes(ast.children?.[0].children?.[0].properties.id);
    const svgElement = astToElement((ast.children as any) as IconNode[], options, null, isSpecified)[0];
    normalizeWidthAndHeight(svgElement);
    const shouldOptimizeOpacityOverlap = options.preventOpacityOverlap !== false
      && Boolean(options.replaceColor && options.propsString);
    if (shouldOptimizeOpacityOverlap) {
      const iconName = file.basename.replace(/\.[^.]+$/, '');
      optimizeOpacityOverlaps(svgElement, {
        overlaps: options.preventOpacityOverlap === true
          ? undefined
          : detectOpacityOverlaps(iconName),
        viewBox: svgElement.attrs.viewBox as string | undefined,
      });
    }

    return JSON.stringify(svgElement);
  });
}
