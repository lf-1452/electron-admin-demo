import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router);

const router = new Router({
  routes,
  mode: 'history'
});
// 路由全局守卫
router.beforeEach((to, from, next) => {
  next();
});
router.afterEach(to => {
});

export default router
