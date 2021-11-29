import { VNode, h } from 'vue';
import { SVGJson } from './types';

function renderFn(node: SVGJson, props:Record<string, any>): VNode {
  return h(
    node.tag,
    {
      ...node.attrs,
      ...props,
    },
    (node.children || []).map((child: SVGJson) => renderFn(child, {})),
  );
}

export default renderFn;
