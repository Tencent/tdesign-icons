import Vue, { VNode } from 'vue';
import classNames from 'classnames';

import props from './props/props';
import useSizeProps from '../utils/use-size-props';
import ConfigContext from '../utils/config-context';
import { TdIconfontProps } from '../utils/types';
import { checkLinkAndLoad } from '../utils/check-url-and-load';

import '../style/index.css';

const { classPrefix } = ConfigContext;

const CDN_ICONFONT_URL = 'https://tdesign.gtimg.com/icon/0.0.3/fonts/index.css';

export const IconFont = Vue.extend({
  name: 'IconFont',
  functional: true,
  props: { ...props },

  render(createElement, context): VNode {
    const { data, props } = context;

    const {
      class: customClassName,
      staticClass: customStaticClassName,
      style: customStyle,
      staticStyle: customStaticStyle,
      attrs: customAttrs,
      props: _,
      ...otherBinds
    } = data;

    const {
      name = '', size = 'middle', tag = 'i', url, loadDefaultIcons = true, onClick,
    }: Partial<TdIconfontProps> = {
      ...customAttrs,
      ...props,
    };

    const { className: sizeClassName, style: sizeStyle } = useSizeProps(size);

    let finalUrl: Array<string> = [];

    if (url) {
      finalUrl = url instanceof Array ? url.concat() : [url];
    }
    if (loadDefaultIcons) {
      finalUrl.push(CDN_ICONFONT_URL);
    }

    Array.from(new Set(finalUrl)).forEach((url: string) => {
      checkLinkAndLoad(url, `${classPrefix}-iconfont-stylesheet--unique-class`);
    });

    const className = classNames(
      `${classPrefix}-icon`,
      url ? name : `${classPrefix}-icon-${name}`,
      sizeClassName,
      customClassName,
      customStaticClassName,
    );

    const finalProps = {
      name,
      size,
      tag,
      url,
      loadDefaultIcons,
    };

    const finalStyle: Styles = { ...sizeStyle, ...(customStyle as Styles), ...(customStaticStyle as Styles) };

    const {
      domProps, on, nativeOn, directives, scopedSlots, slot, key, ref, refInFor,
    } = otherBinds;

    const click = (onClick || on?.click) as Function;

    const finalData = {
      class: undefined,
      staticClass: className,
      style: finalStyle,
      props: finalProps,
      attrs: customAttrs,
      domProps,
      on: { ...on, click: (e: MouseEvent) => click?.({ e }), ...nativeOn },
      nativeOn,
      directives,
      scopedSlots,
      slot,
      key,
      ref,
      refInFor,
    };

    return createElement(tag, finalData);
  },
});

export default IconFont;
