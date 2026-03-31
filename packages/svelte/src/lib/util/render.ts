import type { IconElement } from '../types.js';

// Map of React/JSX attribute names to their HTML/SVG equivalents
const ATTR_MAP: Record<string, string> = {
  className: 'class',
  htmlFor: 'for',
  xlinkHref: 'xlink:href',
};

/**
 * Convert camelCase attribute names to kebab-case for SVG attributes.
 * e.g. strokeWidth -> stroke-width, strokeLinecap -> stroke-linecap, fillOpacity -> fill-opacity
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function attrsToString(attrs: Record<string, any>, childProps: Record<string, any>): string {
  if (!attrs) return '';

  return Object.entries(attrs)
    .map(([key, value]) => {
      // Use explicit map first, then fall back to camelCase -> kebab-case conversion
      const attrName = ATTR_MAP[key] || camelToKebab(key);

      // Handle dynamic props injection (props.xxx pattern from svg-info-check)
      if (typeof value === 'string' && value.startsWith('props.')) {
        const propName = value.split('.')[1];
        value = childProps[propName];
      }

      if (value === true) return attrName;
      if (value === false || value == null) return '';
      return `${attrName}="${escapeHtml(String(value))}"`;
    })
    .filter(Boolean)
    .join(' ');
}

export function renderIconToSvgString(
  node: IconElement,
  childProps: Record<string, any>,
  index: number,
): string {
  const attrsStr = attrsToString(node.attrs, childProps);
  const children = (node.children || [])
    .map((child, i) => renderIconToSvgString(child, childProps, i))
    .join('');

  if (children) {
    return `<${node.tag} ${attrsStr}>${children}</${node.tag}>`;
  }

  // Self-closing tags for SVG elements without children
  return `<${node.tag} ${attrsStr}/>`;
}
