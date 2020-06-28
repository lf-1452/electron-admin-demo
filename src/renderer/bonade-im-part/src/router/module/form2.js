import Layout from '@/layout'

const form2 = {
    path: '/',
    component: Layout,
    children: [{
        path: 'form2',
        component: () => import('@/view/form/form2'),
        name: 'formView',
        meta: {
            title: 'formView',
            icon: 'form2'
        }
    }]
}

export default form2
