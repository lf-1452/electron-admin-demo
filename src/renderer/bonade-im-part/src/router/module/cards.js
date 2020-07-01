import Layout from '@/layout';

const cards = {
  path: '/',
  component: Layout,
  children: [{
    path: 'cards',
    component: () => import('@/view/cardView/index'),
    name: 'cards',
    meta: {
      title: '3种卡片布局',
      icon: 'dashboard'
    }
  }]
};

export default cards;
