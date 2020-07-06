
import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
// import store from './store'
// import 'babel-polyfill'

// import Cookies from 'js-cookie';

// import Element from 'element-ui';
// import * as directives from '@/directives/index.ts';

// Vue.use(Element, {});

// Register global directives
// Object.keys(directives).forEach(key => {
//   Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
// })

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
