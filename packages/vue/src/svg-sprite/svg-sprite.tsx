import Vue, { VNode } from 'vue';
import classNames from 'classnames';
import props from './props/props';

import ConfigContext from '../utils/config-context';
import useSizeProps from '../utils/use-size-props';
import { checkScriptAndLoad } from '../utils/check-url-and-load';
import { TdIconSVGProps } from '../utils/types';

import '../style/index.css';

const { classPrefix } = ConfigContext;

const CDN_ICONFONT_URL = 'https://tdesign.gtimg.com/icon/0.0.3/fonts/index.js';

export default Vue.extend({
  name: 'Icon',
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      props: _,
      ...otherBinds
    } = data;

    const {
      name = '', size = 'middle', url, loadDefaultIcons = true, onClick,
    }: Partial<TdIconSVGProps> = {
      ...customAttrs,
      ...props,
    };

    let finalUrl: Array<string> = [];

    if (url) {
      finalUrl = url instanceof Array ? url.concat() : [url];
    }
    if (loadDefaultIcons) {
      finalUrl.push(CDN_ICONFONT_URL);
    }
    Array.from(new Set(finalUrl)).forEach((url: string) => {
      checkScriptAndLoad(url, `${classPrefix}-svg-js-stylesheet--unique-class`);
    });

    const { className: sizeClassName, style: sizeStyle } = useSizeProps(size);

    const className = classNames(
      `${classPrefix}-icon`,
      `${classPrefix}-icon-${name}`,
      sizeClassName,
      customClassName,
      customStaticClassName,
    );

    const finalStyle: Styles = { ...sizeStyle, ...(customStyle as Styles), ...(customStaticStyle as Styles) };

    const finalProps = {
      name,
      size,
      url,
      loadDefaultIcons,
    };

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
      directives,
      scopedSlots,
      slot,
      key,
      ref,
      refInFor,
    };

    return createElement('svg', finalData, [
      createElement('use', {
        attrs: {
          href: url ? `#${name}` : `#t-icon-${name}`,
        },
      }),
    ]);
  },
});
