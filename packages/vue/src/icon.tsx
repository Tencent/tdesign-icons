import Vue, { VNode, CreateElement, PropType, VNodeData } from 'vue';
import classNames from 'classnames';

import { IconBaseData } from './utils/types';

function hump2Underline(s: string) {
  return s
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace('view-box', 'viewBox');
}

function jsonToUnderline(obj: SVGJson) {
  if (obj instanceof Array) {
    (obj as SVGJson[]).forEach((v) => {
      jsonToUnderline(v);
    });
  } else if (obj instanceof Object) {
    Object.keys(obj).forEach((key) => {
      const newKey = hump2Underline(key);
      if (newKey !== key) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
      jsonToUnderline(obj[newKey]);
    });
  }
}

function renderFn(createElement: CreateElement, node: SVGJson, id: string, rootData: VNodeData): VNode {
  const iconAttrs = Object.assign({}, node.attrs, rootData.attrs);
  const { attrs, ...restProps } = rootData;
  return createElement(
    node.tag,
    {
      key: id,
      attrs: iconAttrs,
      ...restProps,
    },
    (node.children || []).map((child: SVGJson, index: number) =>
      renderFn(createElement, child, `${id}-${node.tag}-${index}`, {}),
    ),
  );
}

export default Vue.extend({
  functional: true,
  props: {
    icon: {
      type: Object as PropType<SVGJson>,
    },
    id: {
      type: String,
      default: '',
    },
  },
  render(createElement, context): VNode {
    const { icon, id, ...userProps } = context.props;
    const { staticClass, style, icon: _, id: __, onClick, ...otherProps } = (context.data as IconBaseData).props;
    const cls = classNames('t-icon', `t-icon-${id}`, staticClass);
    jsonToUnderline(icon);
    return renderFn(createElement, icon, id, {
      class: undefined,
      staticClass: cls,
      props: { ...userProps, ...otherProps },
      attrs: (context.data as IconBaseData).attrs,
      style,
      on: onClick
        ? {
            click: onClick,
          }
        : {},
    });
  },
});
