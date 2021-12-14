import { computed, defineComponent, h } from 'vue';

import ConfigContext from '../utils/config-context';
import useSizeProps from '../utils/use-size-props';
import { checkScriptAndLoad } from '../utils/check-url-and-load';

import props from './props/props';

import '../style/css';

const { classPrefix } = ConfigContext;

const CDN_ICONFONT_URL = 'https://tdesign.gtimg.com/icon/0.0.3/fonts/index.js';

export default defineComponent({
  name: 'Icon',
  props: { ...props },
  setup(props, { attrs }) {
    const {
      name = '', size, url: propUrl, loadDefaultIcons = true, onClick,
    } = props;
    const { className: sizeClassName, style: sizeStyle } = useSizeProps(size);

    const finalUrl = computed(() => {
      let url = [];
      url = propUrl instanceof Array ? propUrl.concat() : [propUrl];
      if (loadDefaultIcons) url.push(CDN_ICONFONT_URL);
      return url;
    });

    const classNames = computed(() => [
      `${classPrefix}-icon`,
      `${classPrefix}-icon-${name}`,
      sizeClassName,
      attrs.class,
    ]);

    const finalStyle = computed(() => ({ ...sizeStyle, ...(attrs.style as Styles) }));

    Array.from(new Set(finalUrl.value as string[])).forEach((url: string) => {
      checkScriptAndLoad(url, `${classPrefix}-svg-js-stylesheet--unique-class`);
    });

    const finalProps = {
      class: classNames.value,
      style: finalStyle.value,
      onClick: (e:MouseEvent) => onClick?.({ e }),
    };

    return () => h('svg', { ...finalProps }, h('use', { href: propUrl ? `#${name}` : `#t-icon-${name}` }));
  },

});
