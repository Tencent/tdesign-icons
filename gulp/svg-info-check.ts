import { parse } from 'svg-parser';
import camelCase from 'camelcase';

import { createTransformStream } from './transform';

export interface Attrs {
  style: { [key: string]: any } | string;

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
function normalizeColor(node: IconElement, options: SvgToElementOptions) {
  if (!options.replaceColor) {
    return;
  }

  const { attrs } = node;

  if (attrs.fill && attrs.fill !== 'none') {
    attrs.fill = 'currentColor';
  }

  if (attrs.stroke && attrs.stroke !== 'none') {
    attrs.stroke = 'currentColor';
  }
}

function normalizeAttrs(node: IconElement, options: SvgToElementOptions) {
  const { attrs } = node;

  Object.keys(attrs).forEach((key) => {
    if (key.indexOf('-') !== -1) {
      attrs[camelCase(key)] = attrs[key];
      delete attrs[key];
    }
  });

  normalizeStyle(node);
  normalizeClassName(node);
  normalizeColor(node, options);
}

/**
 * map svg-parser ast to React element, so it would be convenient to render
 */
function astToElement(wrappedRoot: IconNode[], options: SvgToElementOptions): IconElement[] {
  return wrappedRoot
    .map((node) => ({
      tag: node.tagName,
      attrs: node.properties,
      children: astToElement(node.children, options),
    }))
    .map((node: IconElement) => {
      normalizeChildren(node);
      normalizeAttrs(node, options);
      return node;
    });
}

export function svgToElement(
  options: SvgToElementOptions = {
    replaceColor: false,
  },
) {
  return createTransformStream((svgString) => {
    const ast = parse(svgString);
    // TODO: more accurate type annotation here
    const svgElement = astToElement((ast.children as any) as IconNode[], options)[0];

    normalizeWidthAndHeight(svgElement);

    return JSON.stringify(svgElement);
  });
}
