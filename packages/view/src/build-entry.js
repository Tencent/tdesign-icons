import { defineCustomElement } from 'vue';

import tdesignStyleRaw from 'tdesign-vue-next/dist/tdesign.min.css?raw';
import IconView from './icon-view.vue';
import siteStyle from './styles/vars.css?raw';
import iconView from './styles/icon-view.css?raw';

// shadow DOM 内 :root 无法命中，需补充 :host 使 CSS 变量默认值在组件内生效
const tdesignStyle = tdesignStyleRaw.replaceAll(':root{', ':root,:host{');

export const TdIconView = defineCustomElement({
  ...IconView,
  props: {
    frameworkContent: {
      type: Boolean,
      default: false,
    },
  },
  styles: [tdesignStyle, siteStyle, iconView],
});

customElements.define('td-icons-view', TdIconView);
