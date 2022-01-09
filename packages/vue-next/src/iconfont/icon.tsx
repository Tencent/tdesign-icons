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
    const { className: sizeClassName, style: sizeStyle } = useSizeProps(props.size);
    const propUrl = computed(() => props.url);
    const name = computed(() => props.name || '');

    const finalUrl = computed(() => {
      let url = [];
      url = propUrl.value instanceof Array ? propUrl.value.concat() : [propUrl.value];
      if (props.loadDefaultIcons) url.push(CDN_ICONFONT_URL);
      return url;
    });

    const classNames = computed(() => [
      `${classPrefix}-icon`,
      {
        [name.value]: propUrl.value,
        [`${classPrefix}-icon-${name.value}`]: !propUrl.value,
      },
      sizeClassName,
      attrs.class,
    ]);

    const finalStyle = computed(() => ({ ...sizeStyle, ...(attrs.style as Styles) }));

    Array.from(new Set(finalUrl.value as string[])).forEach((url: string) => {
      checkLinkAndLoad(url, `${classPrefix}-iconfont-stylesheet--unique-class`);
    });

    const finalProps = computed(() => ({
      class: classNames.value,
      style: finalStyle.value,
      onClick: (e:MouseEvent) => props.onClick?.({ e }),
    }));

    return () => h(props.tag || 'i', finalProps.value);
  },
});

export default IconFont;
