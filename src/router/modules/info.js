/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const infoRouter = {
  path: '/info',
  component: Layout,
  redirect: '/info/list',
  name: '个人信息',
  meta: {
    title: '个人信息',
    icon: 'example',
    permission: '个人信息'
  },
  children: [
    {
      path: 'basic',
      component: () => import('@/views/personalinf/EmpBasic'),
      name: '基本信息',
      meta: { title: '基本信息', permission: '基本信息' }
    }, {
      path: 'adv',
      component: () => import('@/views/personalinf/EmpAdv'),
      name: '业绩信息',
      meta: { title: '业绩信息', permission: '业绩信息' }
    }
  ]
}
export default infoRouter
