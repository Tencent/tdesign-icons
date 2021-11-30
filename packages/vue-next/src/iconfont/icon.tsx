import { computed, defineComponent, h } from 'vue';

import props from './props/props';
import useSizeProps from '../utils/use-size-props';
import ConfigContext from '../utils/config-context';
import { checkLinkAndLoad } from '../utils/check-url-and-load';

import '../style/css';

const { classPrefix } = ConfigContext;

const CDN_ICONFONT_URL = 'https://tdesign.gtimg.com/icon/0.0.3/fonts/index.css';

export const IconFont = defineComponent({
  name: 'IconFont',
  props: { ...props },

  setup(props, { attrs }) {
    const {
      name = '', size = 'middle', tag = 'i', url: propUrl, loadDefaultIcons = true, onClick,
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
      checkLinkAndLoad(url, `${classPrefix}-svg-js-stylesheet--unique-class`);
    });

    const finalProps = {
      class: classNames.value,
      style: finalStyle.value,
      name,
      size,
      url: propUrl,
      loadDefaultIcons,
      onClick: (e:MouseEvent) => onClick?.({ e }),
    };

    return () => h(tag, { ...finalProps });
  },
});

export default IconFont;
