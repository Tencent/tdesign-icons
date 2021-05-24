import Vue from 'vue';
import IconBase from '../icon';

const element = $ELEMENT;

const $ICON_NAME = Vue.extend({
  name: '$ICON_NAME',
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
