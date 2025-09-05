import {
  computed, defineComponent, h, onMounted,
} from 'vue';

import ConfigContext from '../utils/config-context';
import useSizeProps from '../utils/use-size-props';
import { checkScriptAndLoad } from '../utils/check-url-and-load';

import props from './props/props';

import '../style/css';

const { classPrefix } = ConfigContext;

const CDN_ICONFONT_URL = 'https://tdesign.gtimg.com/icon/0.4.0/fonts/index.js';

export default defineComponent({
  name: 'Icon',
  props,
  setup(props, { attrs }) {
    const propsSize = computed(() => props.size);
    const name = computed(() => props.name || '');

    const { className: sizeClassName, style: sizeStyle } = useSizeProps(propsSize);

    const finalUrl = computed(() => {
      let url = [];
      url = props.url instanceof Array ? props.url.concat() : [props.url];
      if (props.loadDefaultIcons) url.push(CDN_ICONFONT_URL);
      return url;
    });

    const classNames = computed(() => [
      `${classPrefix}-icon`,
      `${classPrefix}-icon-${name.value}`,
      sizeClassName.value,

    ]);

    const finalStyle = computed(() => ({ ...sizeStyle.value, ...(attrs.style as Styles) }));

    onMounted(() => {
      Array.from(new Set(finalUrl.value as string[])).forEach((url: string) => {
        checkScriptAndLoad(url, `${classPrefix}-svg-js-stylesheet--unique-class`);
      });
    });

    const finalProps = computed(() => ({
      class: classNames.value,
      style: finalStyle.value,
      onClick: (e: MouseEvent) => props.onClick?.({ e }),
    }));

    return () => h('svg', finalProps.value, h('use', { href: props.url ? `#${name.value}` : `#t-icon-${name.value}` }));
  },

});
