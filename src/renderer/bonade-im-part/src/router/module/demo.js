import Layout from '@/layout'

const demo = {
  path: '/',
  component: Layout,
  children: [{
    path: 'demo',
    component: () => import('@/view/demo/index'),
    name: 'demo',
    meta: {
      title: 'demo',
      icon: 'demo'
    }
  }]
}

export default demo
