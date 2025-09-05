import Vue, { PropType } from 'vue';
import IconBase from '../icon';
import { IconProps, SVGJson } from '../utils/types';
import useSizeProps from '../utils/use-size-props';

const element: SVGJson = $ELEMENT;

const $ICON_NAME = Vue.extend<IconProps>({
  name: '$ICON_NAMEIcon',
  functional: true,
  props: {
    size: {
      type: String,
    },
    onClick: {
      type: Function as PropType<IconProps['onClick']>,
    },
    fillColor: {
      type: [String, Array] as PropType<IconProps['fillColor']>,
    },
    strokeColor: {
      type: [String, Array] as PropType<IconProps['fillColor']>,
    },
    strokeWidth: {
      type: Number,
      default: 2
    }
  },
  render(createElement, context) {
    const { props, data } = context;
    const { size, ...otherProps } = props;

    const { className, style } = useSizeProps(size);
    const fullProps = {
      ...otherProps || {},
      id: '$KEY',
      icon: element,
      staticClass: className,
      style,
    };
    data.props = fullProps;
    return createElement(IconBase, data);
  },
});

export default $ICON_NAME;
