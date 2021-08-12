import Vue, { VNode, CreateElement, PropType, VNodeData } from 'vue';
import classNames from 'classnames';

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

function renderFn(createElement: CreateElement, node: SVGJson, id: string, rootProps: VNodeData): VNode {
  const iconAttrs = Object.assign({}, node.attrs, rootProps.attrs);
  const { attrs, ...restProps } = rootProps;
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
    const { staticClass, class: clz, ...restProps } = context.data;
    const cls = classNames('t-icon', `t-icon-${id}`, staticClass, clz);
    jsonToUnderline(icon);
    return renderFn(createElement, icon, id, {
      ...restProps,
      class: undefined,
      staticClass: cls,
      props: userProps,
    });
  },
});
