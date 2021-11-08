import { VNode, CreateElement, VNodeData } from 'vue';
import { SVGJson } from './types';

function renderFn(createElement: CreateElement, node: SVGJson, rootData: VNodeData): VNode {
  const iconAttrs = { ...node.attrs, ...rootData.attrs };
  const { attrs, ...restProps } = rootData;
  return createElement(
    node.tag,
    {
      attrs: iconAttrs,
      ...restProps,
    },
    (node.children || []).map((child: SVGJson) => renderFn(createElement, child, {})),
  );
}

export default renderFn;
