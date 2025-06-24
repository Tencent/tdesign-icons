import { VNode, h } from 'vue';
import { SVGJson } from './types';

function camel2Kebab(camelString:string) {
  const covertArr = ['fillOpacity', 'fillRule', 'clipRule'];
  if (covertArr.includes(camelString)) { return camelString.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase(); }
  return camelString;
}

function renderFn(node: SVGJson, props:Record<string, any>): VNode {
  const kebabAttrs = Object.keys(node.attrs).reduce((result: Record<string, any>, key) => ({
    ...result,
    [camel2Kebab(key)]: node.attrs[key],
  }), {} as Record<string, any>);
  return h(
    node.tag,
    {
      ...kebabAttrs,
      ...props,
    },
    (node.children || []).map((child: SVGJson) => renderFn(child, {})),
  );
}

export default renderFn;
