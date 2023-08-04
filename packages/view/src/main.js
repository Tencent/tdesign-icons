import Vue from 'vue';

import IconView from './IconView.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(IconView),
}).$mount('#app');
