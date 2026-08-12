import Vue, { VNode, PropType } from 'vue';
import classNames from 'classnames';
import renderFn from './utils/render-fn';

import { IconBaseData, SVGJson } from './utils/types';

// 这些属性在 SVG 中本就是驼峰写法，转成 kebab 会失效
const camelCaseSvgAttrs = ['viewBox', 'maskUnits', 'maskContentUnits'];

function hump2Underline(s: string) {
  if (camelCaseSvgAttrs.includes(s)) return s;
  return s.replace(/([A-Z])/g, '-$1').toLowerCase();
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
  props: {
    icon: {
      type: Object as PropType<SVGJson>,
    },
    id: {
      type: String,
      default: '',
    },
  },
  render(h): VNode {
    // 转为非函数式组件后，每个图标实例拥有稳定的 _uid，用它生成
    // 稳定的 overlap mask 前缀，避免测试快照因全局自增计数不断变化
    const context = {
      props: this.$props,
      data: (this.$vnode?.data || {}) as IconBaseData,
    };
    const { icon, id, ...userProps } = context.props;
    const overlapMaskPrefix = `t-icon-${id}-instance-${(this as any)._uid}`;

    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      staticClass, style, icon: _, id: __, onClick, ...otherProps
    } = context.data.props;
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

    return renderFn(h, icon, {
      class: undefined,
      staticClass: finalCls,
      props: { ...userProps, ...otherProps, overlapMaskPrefix },
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
