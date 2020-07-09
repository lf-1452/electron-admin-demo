import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const testIndex: RouteConfig = {
    path: '/test',
    component: Layout,
    name: 'testIndex',
    meta: {
        title: '测试主菜单',
        icon: ''
    },
    children: [
        {
            path: 'test1', name: 'test1', component: Layout,
            meta: {
                title: '测试子菜单-2',
                icon: ''
            },
            children:[
                {
                    path: 'test1-2', name: 'test1=3', component: () => import('@/views/home/index.vue'),
                    meta: {
                        title: '测试子菜单-2',
                        icon: ''
                    }
                },
            ]
        },
        {
            path: 'test2', name: 'test2', component: () => import('@/views/home/index.vue'),
            meta: {
                title: '测试子菜单-2',
                icon: ''
            }
        },
        {
            path: 'test3', name: 'test3', component: () => import('@/views/home/index.vue'),
            meta: {
                title: '测试子菜单-3',
                icon: ''
            }
        }
    ]
}


export default testIndex
