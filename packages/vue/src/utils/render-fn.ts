import { VNode, CreateElement, VNodeData } from 'vue';

function renderFn(createElement: CreateElement, node: SVGJson, rootData: VNodeData): VNode {
  const iconAttrs = Object.assign({}, node.attrs, rootData.attrs);
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
