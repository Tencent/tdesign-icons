import Vue, { VNode, PropType } from 'vue';
import classNames from 'classnames';
import renderFn from './utils/render-fn';

import { IconBaseData, SVGJson } from './utils/types';

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
        // eslint-disable-next-line no-param-reassign
        obj[newKey] = obj[key];
        // eslint-disable-next-line no-param-reassign
        delete obj[key];
      }
      jsonToUnderline(obj[newKey]);
    });
  }
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

    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      staticClass, style, icon: _, id: __, onClick, ...otherProps
    } = (context.data as IconBaseData).props;
    const {
      class: customClassName,
      staticClass: customStaticClassName,
      style: customStyle,
      staticStyle: customStaticStyle,
      attrs,
      ...otherBinds
    } = context.data;

    const {
      domProps, on, nativeOn, directives, scopedSlots, slot, key, ref, refInFor,
    } = otherBinds;

    const finalCls = classNames('t-icon', `t-icon-${id}`, staticClass, customClassName, customStaticClassName);

    // fill none 是为了避免存在旧版本图标的 fill:currentColor 造成的样式污染
    const finalStyle = {
      fill: 'none', ...style, ...(customStyle as Styles), ...(customStaticStyle as Styles),
    };

    jsonToUnderline(icon);

    const click = (onClick || on?.click) as Function;

    return renderFn(createElement, icon, {
      class: undefined,
      staticClass: finalCls,
      props: { ...userProps, ...otherProps },
      attrs,
      style: finalStyle,
      on: { ...on, click: (e: MouseEvent) => click?.({ e }), ...nativeOn },
      directives,
      scopedSlots,
      slot,
      key,
      ref,
      refInFor,
      domProps,
    });
  },
});
