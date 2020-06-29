/** When your routing table is too long, you can split it into small modules **/
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/list',
  name: '系统管理',
  meta: {
    title: '系统管理',
    icon: 'list',
    permission: '系统管理'
  },
  children: [
    {
      path: 'people',
      component: () => import('@/views/system/SysPeoPle'),
      name: '人员管理',
      meta: { title: '人员管理', permission: '人员管理' }
    },
    {
      path: 'menu',
      component: () => import('@/views/system/SysMenu'),
      name: '菜单管理',
      meta: { title: '菜单管理', permission: '菜单管理' }
    },
    {
      path: 'user',
      component: () => import('@/views/system/SysUser'),
      name: '角色管理',
      meta: { title: '角色管理', permission: '角色管理' }
    }

  ]
}
export default systemRouter
