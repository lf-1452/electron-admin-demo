import Layout from '@/layout';

const templateView = {
  path: '/',
  component: Layout,
  children: [{
    path: 'templateView',
    component: () => import('@/components/templateForm/templateView'),
    name: 'templateView',
    meta: {
      title: 'view',
      icon: ''
    }
  }]
};

export default templateView;
