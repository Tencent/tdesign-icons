import Vue, { PropType } from 'vue';
import IconBase from '../icon';
import { TdIconSVGProps } from '../utils/types';

const element: SVGJson = $ELEMENT;

const $ICON_NAME = Vue.extend({
  name: '$ICON_NAME',
  props: {
    // small/medium/large/xl/18px/2em
    size: {
      type: String,
    },
    onClick: {
      type: Function as PropType<TdIconSVGProps['onClick']>,
    },
  },
  functional: true,
  render(createElement, { data }) {
    const fullProps = Object.assign({}, data.props || {}, {
      id: '$KEY',
      icon: element,
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  },
});

export default $ICON_NAME;
