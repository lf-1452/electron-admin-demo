/*
 * @Descripttion:
 * @version:
 * @Author: YanQi
 * @Date: 2020-07-01 09:58:08
 * @LastEditors: killi
 * @LastEditTime: 2020-07-09 09:42:23
 */

import Vue from 'vue';
import App from '@/App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

import element from 'element-ui';
element.install(Vue)

Vue.config.productionTip = false;

const V = new Vue({
    router,
    store,
    render: (h:any) => h(App)
}).$mount('#app');