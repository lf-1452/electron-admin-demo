import Layout from '@/layout'

const templateTableView = {
    path: '/',
    component: Layout,
    children: [{
        path: 'templateTableView',
        component: () => import('@/components/templateForm/customList'),
        name: 'templateTableView',
        meta: {
            title: '列表',
            icon: ''
        }
    }]
}

export default templateTableView
