import Layout from '@/layout'

const form = {
  path: '/',
  component: Layout,
  children: [{
    path: 'formView',
    component: () => import('@/view/formView/index'),
    name: 'formView',
    meta: {
      title: 'formView',
      icon: 'dashboard'
    }
  }]
}

export default form
