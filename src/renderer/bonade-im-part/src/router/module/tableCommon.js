import Layout from '@/layout'

const tableCommon = {
    path: '/',
    component: Layout,
    children: [{
        path: 'tableCommon',
        component: () => import('@/view/tableCommon/index'),
        name: 'tableCommon',
        meta: {
            title: 'tableCommon',
            icon: 'tableCommon'
        }
    }]
}

export default tableCommon
