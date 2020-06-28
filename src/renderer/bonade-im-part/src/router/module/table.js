import Layout from '@/layout'

const table = {
  path: '/',
  component: Layout,
  children: [{
    path: 'tablePart',
    component: () => import('@/view/tablePart/index'),
    name: 'tablePart',
    meta: {
      title: 'tablePart',
      icon: 'dashboard'
    }
  }]
}

export default table
