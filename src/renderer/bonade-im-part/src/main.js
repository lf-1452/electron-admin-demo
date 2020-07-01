import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'babel-polyfill';
import './common/styles/index.scss'; // global css

import Cookies from 'js-cookie';

import Element from 'element-ui';
import './common/styles/element-variables.scss';

import * as filters from './filters'; // global filters
import mixins from './components/mixins/index';

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock');
  mockXHR();
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
});
Vue.mixin(mixins);


// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
  
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
