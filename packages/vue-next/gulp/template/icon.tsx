import { computed, PropType, defineComponent } from 'vue';
import renderFn from '../utils/render-fn';
import {
  TdIconSVGProps, SVGJson,
} from '../utils/types';
import useSizeProps from '../utils/use-size-props';

import '../style/css';

const element: SVGJson = $ELEMENT;

export default defineComponent({
  name: '$ICON_NAMEIcon',
  props: {
    size: {
      type: String,
    },
    onClick: {
      type: Function as PropType<TdIconSVGProps['onClick']>,
    },
  },
  setup(props, { attrs }) {
    const { className, style } = useSizeProps(props.size);

    const finalCls = computed(() => ['t-icon', 't-icon-$KEY', className, attrs.class]);
    const finalStyle = computed(() => ({ ...style, ...(attrs.style as Styles) }));
    const finalProps = computed(() => ({
      class: finalCls.value,
      style: finalStyle.value,
      onClick: (e:MouseEvent) => props.onClick?.({ e }),
    }));
    return () => renderFn(element, finalProps.value);
  },

});
