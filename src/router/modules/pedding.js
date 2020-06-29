/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const peddingRouter = {
  path: '/pedding',
  component: Layout,
  redirect: '/pedding/list',
  name: '待办管理',
  meta: {
    title: '待办管理',
    icon: 'example',
    permission: '待办管理'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/pedding/peddingList'),
      name: '待办列表',
      meta: { title: '待办列表', permission: '待办列表' }
    }

    // {
    //   path: 'see',
    //   component: () => import('@/views/count/count-see'),
    //   name: '中心学员会员统计',
    //   meta: { title: '中心学员会员统计' }
    // }
  ]
}
export default peddingRouter
