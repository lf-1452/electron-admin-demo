import Layout from '@/layout';

const form1 = {
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
};

export default form1;
