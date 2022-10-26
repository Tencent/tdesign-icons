import { PropType } from 'vue';
import { TdIconfontProps } from '../../utils/types';

export default {
  /** 图标名称 */
  name: {
    type: String,
    default: '',
    required: true,
  },
  /** 图标尺寸，支持 'small', 'medium', 'large'，'35px', '3em' 等 */
  size: {
    type: String as PropType<SizeEnum | string>,
    default: undefined,
  },
  /** 图标 DOM 元素，可选值：i/span/div/... */
  tag: {
    type: String,
    default: 'i',
  },
  /** 图标地址，地址内容参考[组件内部默认加载图标](https://tdesign.gtimg.com/tea-icon/web/index.css)。也可以在 index.html 中引入图标地址 */
  url: {
    type: [String, Array] as PropType<TdIconfontProps['url']>,
    default: undefined,
  },
  /** 是否加载组件库内置图标 */
  loadDefaultIcons: {
    type: Boolean,
    default: true,
  },
  /** 点击时触发 */
  onClick: Function as PropType<TdIconfontProps['onClick']>,
};
