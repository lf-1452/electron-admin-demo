import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/index.vue'
Vue.use(Router);

import testIndex from './moudules/test'
import testIndex2 from './moudules/test-2'


/*
  meta: {
    roles: ['admin', 'editor']   将控制页面角色（允许设置多个角色）
    title: 'title'               显示在子菜单和面包屑中的名称
    icon: 'svg-name'             侧栏中显示的图标
    hidden: true                 如果为true，则此路由不会显示在侧边栏中（默认为false）
    alwaysShow: true             如果为true，将始终显示根菜单（默认值为false）; 如果为false，则在子路径少于或等于一个时隐藏根菜单

    breadcrumb: false            如果false，项目将隐藏在breadcrumb中（默认为true）
    noCache: true                如果为true，则不会缓存该页（默认值为false）
    affix: true                  如果为true，则标签将在tags视图中粘贴
    activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
  }
*/


export const routes = [
    { path: '/', redirect: '/index' },
    {
        path: '/index', component: Layout, name: 'mainView',
        meta: {
            title: '首页',
            icon: '',
            hidden: true
        }
    },
    // modules start
    testIndex,
    testIndex2
    // modules end
]

export default new Router({ routes: routes });