/*
 * @Descripttion:
 * @version:
 * @Author: YanQi
 * @Date: 2020-07-01 09:58:08
 * @LastEditors: YanQi
 * @LastEditTime: 2020-07-06 11:03:27
 */

import Vue from 'vue';
import App from '@/App.vue';
import router from './router';
// import store from './store';
import 'babel-polyfill';

// import Cookies from 'js-cookie';

import Element from 'element-ui';
// import * as directives from '@/directives/index.ts';

Vue.use(Element, {});

// Register global directives
// Object.keys(directives).forEach(key => {
//   Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
// })

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app');
