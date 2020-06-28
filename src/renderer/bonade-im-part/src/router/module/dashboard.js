import Layout from '@/layout'

const dashboard = {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
        {
            path: 'dashboard',
            component: () => import('@/view/dashboard/index'),
            name: 'Dashboard',
            meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
        }
    ]
}

export default dashboard
