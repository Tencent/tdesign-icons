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

// 基于图标结构生成确定性指纹（DJBP2a 简易哈希）。
// 指纹只依赖图标本身的内容，与运行时全局自增计数、组件 _uid 等会话状态无关，
// 因此既可保证测试快照跨会话稳定，又能让不同内容的图标生成不同的 mask 前缀，
// 避免多个相同 id 的图标实例复用同一 overlap mask 造成的引用冲突。
function contentHash(value: unknown): string {
  const str = JSON.stringify(value || {});
  // eslint-disable-next-line no-bitwise
  let hash = 5381;
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = ((hash * 33) ^ str.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
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
    // 先统一属性命名，确保基于同一结构的对象生成一致的指纹
    // （icon 可能被多个相同实例共享，原地转换后需在统一形式下计算 hash）
    jsonToUnderline(icon);
    // 使用确定性的 id（图标名）+ 图标内容指纹作为 overlap mask 前缀。
    // - 内容指纹基于图标本身生成，跨会话稳定，测试快照不会因运行时全局自增计数
    //   或组件 _uid 在不同会话间变化而不断更新；
    // - 同时指纹与图标内容绑定，不同内容（即使 id 相同）会得到不同的前缀，
    //   避免多个相同 id 的图标实例复用同一 mask 造成 SVG url(#) 引用冲突。
    const overlapMaskPrefix = `t-icon-${id}-instance-${contentHash(icon)}`;

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

    const click = (onClick || on?.click) as Function;

    return renderFn(createElement, icon, {
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
