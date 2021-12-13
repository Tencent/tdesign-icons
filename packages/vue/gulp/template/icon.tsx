import Vue, { PropType } from 'vue';
import IconBase from '../icon';
import { TdIconSVGProps, IconProps, SVGJson } from '../utils/types';
import useSizeProps from '../utils/use-size-props';

const element: SVGJson = $ELEMENT;

const $ICON_NAME = Vue.extend<IconProps>({
  name: '$ICON_NAMEIcon',
  functional: true,
  props: {
    // small/medium/large/xl/18px/2em
    size: {
      type: String,
    },
    onClick: {
      type: Function as PropType<TdIconSVGProps['onClick']>,
    },
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
