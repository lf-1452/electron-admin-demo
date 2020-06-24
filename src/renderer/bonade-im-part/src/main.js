import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview';
import store from './store'
import 'iview/dist/styles/iview.css';
import 'babel-polyfill';

// 插件
Vue.use(iView);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
