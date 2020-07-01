import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
/* Layout */
import Layout from '@/layout';
// import dynamic_list from './dynamic_list'
import dashboard from './module/dashboard';
import form from './module/form';
import cards from './module/cards';
import table from './module/table';
import demo from './module/demo';
import templateTableView from './module/templateTableView';
import demoView from './module/demoView';
import tableCommon from './module/tableCommon';
import form1 from './module/form1';
import form3 from './module/form3';
import form2 from './module/form2';
import templateView from './module/templateView';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/view/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/view/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/view/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/view/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/view/error-page/401'),
    hidden: true
  },
  {
    path: '/templateFormAdd',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/components/templateForm/formNew'),
      name: 'FdTemplateFormAdd',
      meta: {
        title: '新增',
        icon: ''
      }
    }]
  },
  {
    path: '/templateFormAddPopup',
    hidden: true,
    component: () => import('@/components/templateForm/formNew')
  },

  {
    path: '/templateFormTableAddPopup',
    hidden: true,
    component: () => import('@/components/templateForm/customList')
  },
  {
    path: '/templateFormEdit',
    component: Layout,
    hidden: true,
    children: [{
      path: 'templateFormEdit',
      component: () => import('@/components/templateForm/formEdit'),
      name: 'FdTemplateFormEdit',
      meta: {
        title: '编辑',
        icon: ''
      }
    }]
  },
  {
    path: '/templateFormEditPopup',
    hidden: true,
    component: () => import('@/components/templateForm/formEdit')
  },
  {
    path: '/templateFormView',
    component: Layout,
    hidden: true,
    children: [{
      path: 'templateFormView',
      component: () => import('@/components/templateForm/formView'),
      name: 'FdTemplateFormView',
      meta: {
        title: '查看',
        icon: ''
      }
    }]
  },
  {
    path: '/templateFormViewPopup',
    hidden: true,
    component: () => import('@/components/templateForm/formView')
  },

  // ...dynamic_list
  dashboard,
  form,
  cards,
  table,
  demo,
  templateTableView,
  demoView,
  tableCommon,
  form1,
  form3,
  form2,
  templateView
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

// router.afterEach(to => {
// });

export default router;
