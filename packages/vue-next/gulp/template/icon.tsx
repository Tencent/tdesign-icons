import { computed, PropType, defineComponent } from 'vue';
import renderFn from '../utils/render-fn';
import {
  IconProps, SVGJson,
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
      type: Function as PropType<IconProps['onClick']>,
    },
    fillColor: {
      type: [Array, String] as PropType<IconProps['fillColor']>,
    },
    strokeColor: {
      type: [Array, String] as PropType<IconProps['strokeColor']>,
    },
    strokeWidth: {
      type: Number as PropType<IconProps['strokeWidth']>,
    }
  },
  setup(props, { attrs }) {
    const propsSize = computed(() => props.size);

    const strokeColor1 = computed(() => {
      if (!props.strokeColor) return 'currentColor';
      return Array.isArray(props.strokeColor) ? props.strokeColor[0] : props.strokeColor
    })
    const strokeColor2 = computed(() => {
      if (!props.strokeColor) return 'currentColor';
      return Array.isArray(props.strokeColor) ? props.strokeColor[1] ?? props.strokeColor[0] : props.strokeColor
    })

    const fillColor1 = computed(() => {
      if (!props.fillColor) return 'transparent';
      return Array.isArray(props.fillColor) ? props.fillColor[0] : props.fillColor
    })
    const fillColor2 = computed(() => {
      if (!props.fillColor) return 'transparent';
      return Array.isArray(props.fillColor) ? props.fillColor[1] ?? props.fillColor[0] : props.fillColor
    })

    // 填充类型图标
    const filledColor = computed(() => {
      if (!props.fillColor) return 'currentColor';
      return Array.isArray(props.fillColor) ? props.fillColor[0] : props.fillColor;
    })


    const { className, style } = useSizeProps(propsSize);

    const finalCls = computed(() => ['t-icon', 't-icon-$KEY', className.value]);
    const finalStyle = computed(() => ({ ...style.value, ...(attrs.style as Styles) }));
    const finalProps = computed(() => ({
      class: finalCls.value,
      style: finalStyle.value,
      onClick: (e: MouseEvent) => props.onClick?.({ e }),
      strokeColor1: strokeColor1.value,
      strokeColor2: strokeColor2.value,
      fillColor1: fillColor1.value,
      fillColor2: fillColor2.value,
      strokeWidth: props.strokeWidth || 2,
      filledColor: filledColor.value
    }));
    return () => renderFn(element, finalProps.value);
  },

});
