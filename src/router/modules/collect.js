/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const collectRouter = {
  path: '/stat',
  component: Layout,
  redirect: '/stat/list',
  name: '业绩汇总',
  meta: {
    title: '业绩汇总',
    icon: 'example',
    permission: '业绩汇总'
  },
  children: [
    {
      path: 'all',
      component: () => 
      import('@/views/Statistics/StaAll'),
      name: '业绩汇总',
      meta: { title: '业绩汇总', permission: '业绩汇总' }
    },
    {
      path: 'pers',
      component: () => import('@/views/Statistics/StaPers'),
      name: '个人业绩',
      meta: { title: '个人业绩', permission: '个人业绩' }
    },
    {
      path: 'group',
      component: () => import('@/views/Statistics/StaGroup'),
      name: '集体业绩',
      meta: { title: '集体业绩', permission: '集体业绩' }
    }

  ]
}
export default collectRouter
