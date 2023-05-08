import {
  computed, defineComponent, h, onMounted,
} from 'vue';

import props from './props/props';
import useSizeProps from '../utils/use-size-props';
import ConfigContext from '../utils/config-context';
import { checkLinkAndLoad } from '../utils/check-url-and-load';

import '../style/css';

const { classPrefix } = ConfigContext;

const CDN_ICONFONT_URL = 'https://tdesign.gtimg.com/icon/0.1.4/fonts/index.css';

export const IconFont = defineComponent({
  name: 'IconFont',
  props,
  setup(props, { attrs }) {
    const propsSize = computed(() => props.size);

    const { className: sizeClassName, style: sizeStyle } = useSizeProps(propsSize);

    const name = computed(() => props.name || '');

    const isBuiltinIcon = computed(() => props.url && /^t-icon-(\w|-)+$/.test(props.name)); // 判断是否是渲染内置图标

    const finalUrl = computed(() => {
      let url = [];
      url = props.url instanceof Array ? props.url.concat() : [props.url];
      if (props.loadDefaultIcons) url.push(CDN_ICONFONT_URL);
      return url;
    });

    const classNames = computed(() => [
      {
        [name.value]: props.url,
        [`${classPrefix}-icon`]: !props.url || isBuiltinIcon.value,
        [`${classPrefix}-icon-${name.value}`]: !props.url,
      },
      sizeClassName.value,
    ]);

    const finalStyle = computed(() => ({ ...sizeStyle.value, ...(attrs.style as Styles) }));

    onMounted(() => {
      Array.from(new Set(finalUrl.value as string[])).forEach((url: string) => {
        checkLinkAndLoad(url, `${classPrefix}-iconfont-stylesheet--unique-class`);
      });
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
