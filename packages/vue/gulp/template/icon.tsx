import Vue, { PropType } from 'vue';
import IconBase from '../icon';
import { TdIconSVGProps, IconProps } from '../utils/types';
import useSizeProps from '../utils/useSizeProps';

import '../style/index.css';

const element: SVGJson = $ELEMENT;

const $ICON_NAME = Vue.extend<IconProps>({
  name: '$ICON_NAME',
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
  render(createElement, { props, data }) {
    const { size, ...otherProps } = props;
    const { className, style } = useSizeProps(size);
    const fullProps = Object.assign({}, otherProps || {}, {
      id: '$KEY',
      icon: element,
      staticClass: className,
      style,
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  },
});

export default $ICON_NAME;
