import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const testIndex2: RouteConfig = {
    path: '/test2',
    component: () => import('@/views/home/index.vue'),
    name: 'testIndex2',
    meta: {
        title: '测试主菜单2',
        icon: ''
    }
}


export default testIndex2