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

// import Element from 'element-ui';

// Vue.use(Element, {});

Vue.config.productionTip = false;

new Vue({
    router,
    // store,
    render: (h) => h(App)
}).$mount('#app');
