import { defineCustomElement } from 'vue';

import IconView from './icon-view.vue';
import tdesignStyle from './styles/tdesign.min.css?raw';
import siteStyle from './styles/vars.css?raw';
import iconView from './styles/icon-view.css?raw';

export const TdIconView = defineCustomElement({ ...IconView, styles: [tdesignStyle, siteStyle, iconView] });

customElements.define('td-icons-view', TdIconView);
