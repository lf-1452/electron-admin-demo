import Layout from '@/layout';

const home = {
  'path': '/',
  'component': Layout,
  'children': [{
    'path': 'home',
    'component': () => import('@/views/home/index'),
    'name': 'home',
    'meta': {
      'title': '首页',
      'icon': 'home'
    }
  }]

};

export default home;