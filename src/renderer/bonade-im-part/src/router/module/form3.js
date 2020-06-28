import Layout from '@/layout'

const form3 = {
    path: '/',
    component: Layout,
    children: [{
        path: 'form3',
        component: () => import('@/view/form/form3'),
        name: 'formEdit',
        meta: {
            title: 'formEdit',
            icon: 'form3'
        }
    }]
}

export default form3
