import Vue, { VNode } from 'vue';
import classNames from 'classnames';

function hump2Underline(s: string) {
  return s
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace('view-box', 'viewBox');
}

function jsonToUnderline(obj: any) {
  if (obj instanceof Array) {
    obj.forEach((v) => {
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

function renderFn(createElement: any, node: any, id: string, rootProps: any) {
  const iconAttrs = Object.assign({}, node.attrs, rootProps.attrs);
  const { attrs, ...restProps } = rootProps;
  return createElement(
    node.tag,
    {
      key: id,
      attrs: iconAttrs,
      ...restProps,
    },
    (node.children || []).map((child: any, index: number) =>
      renderFn(createElement, child, `${id}-${node.tag}-${index}`, {}),
    ),
  );
}

export default Vue.extend({
  functional: true,
  props: {
    icon: {
      type: Object,
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
