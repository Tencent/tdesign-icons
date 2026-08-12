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

// 同一图标（同 id 同内容）渲染多个实例时，若 mask 前缀完全一致会与内容相同的
// overlap mask 重复，导致多个 DOM 元素 id 重复、SVG url(#) 引用重叠。
// 这里以“内容哈希”为分组 key，为同组内的每个实例追加一个自增序号，保证：
// 1) 同图标多实例 -> 序号不同 -> mask id 唯一，互不重叠；
// 2) 计数器为模块级状态，测试每次加载新模块即重置，同一测试中相同数量的
//    图标实例会产生相同的序号序列，快照仍保持跨会话稳定。
const overlapInstanceCounters = new Map<string, number>();
function nextOverlapInstanceId(hash: string): string {
  const seq = overlapInstanceCounters.get(hash) ?? 0;
  overlapInstanceCounters.set(hash, seq + 1);
  return `${hash}-${seq}`;
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
    // 使用确定性的 id（图标名）+ 图标内容指纹 + 实例序号作为 overlap mask 前缀。
    // - 内容指纹基于图标本身生成，跨会话稳定，测试快照不会因运行时全局自增计数
    //   或组件 _uid 在不同会话间变化而不断更新；
    // - 同时指纹与图标内容绑定，不同内容（即使 id 相同）会得到不同的前缀；
    // - 同组（同 id 同内容）的多个实例追加自增序号，保证每个实例的 mask id 唯一、
    //   互不重叠，避免 SVG url(#) 引用指向错误的 mask。
    const overlapMaskPrefix = `t-icon-${id}-instance-${nextOverlapInstanceId(contentHash(icon))}`;

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
