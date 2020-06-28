import Layout from '@/layout'

const demoView = {
    path: '/',
    component: Layout,
    children: [{
        path: 'demoView',
        component: () => import('@/view/demoView/index'),
        name: 'demoView',
        meta: {
            title: 'demoView',
            icon: 'demoView'
        }
    }]
}

export default demoView
