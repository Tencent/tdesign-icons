import { CreateElement, VNodeData, VNode } from 'vue';
import { SVGJson } from './types';

const renderChildNode = (createElement: CreateElement, node: SVGJson, childProps: any): VNode => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const processedAttrs: Record<string, any> = {};
  if (node.attrs) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(node.attrs)) {
      if (typeof value === 'string' && value.startsWith('props.')) {
        const propName = value.split('.')[1];
        processedAttrs[key] = childProps[propName];
      } else {
        processedAttrs[key] = value;
      }
    }
  }

  return createElement(
    node.tag,
    {
      attrs: {
        ...node.attrs,
        ...processedAttrs,
      },
    },
    (node.children || []).map((child: SVGJson) => renderChildNode(createElement, child, childProps)),
  );
};

const renderFn = (createElement: CreateElement, node: SVGJson, rootData: VNodeData): VNode => {
  const iconAttrs = { ...node.attrs, ...rootData.attrs };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { attrs, ...restProps } = rootData;
  const { strokeWidth = 2, strokeColor = 'currentColor', fillColor = 'transparent' } = rootData.props || {};
  let filledColor;
  if (!rootData.props.fillColor) filledColor = 'currentColor';
  else filledColor = Array.isArray(fillColor) ? fillColor[0] : fillColor;
  const childProps = {
    strokeWidth,
    strokeColor1: Array.isArray(strokeColor) ? strokeColor[0] : strokeColor,
    strokeColor2: Array.isArray(strokeColor) ? strokeColor[1] ?? strokeColor[0] : strokeColor,
    fillColor1: Array.isArray(fillColor) ? fillColor[0] : fillColor,
    fillColor2: Array.isArray(fillColor) ? fillColor[1] ?? strokeColor[0] : fillColor,
    filledColor,
  };
  return createElement(
    node.tag,
    {
      attrs: iconAttrs,
      ...restProps,
    },
    (node.children || []).map((child: SVGJson) => renderChildNode(createElement, child, childProps)),
  );
};

export default renderFn;
