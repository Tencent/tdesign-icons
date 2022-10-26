import { PropType } from 'vue';
import { TdIconSVGProps } from '../../utils/types';

export default {
  /** 图标名称 */
  name: {
    type: String,
    default: '',
  },
  /** 图标尺寸，支持 'small', 'medium', 'large'，'35px', '3em' 等 */
  size: {
    type: String as PropType<SizeEnum | string>,
    default: undefined,
  },
  /** 图标地址，地址内容参考[组件内部默认加载图标](https://tdesign.gtimg.com/tea-icon/web/index.css)。也可以在 index.html 中引入图标地址 */
  url: {
    type: [String, Array] as PropType<TdIconSVGProps['url']>,
    default: undefined,
  },
  /** 是否加载组件库内置图标 */
  loadDefaultIcons: {
    type: Boolean,
    default: true,
  },
  /** 点击时触发 */
  onClick: Function as PropType<TdIconSVGProps['onClick']>,
};
