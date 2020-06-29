/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const checkRouter = {
  path: '/audit',
  component: Layout,
  redirect: '/audit/list',
  name: '业绩审核',
  meta: {
    title: '业绩审核',
    icon: 'example',
    permission: '业绩审核'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/audit/AuditResearch'),
      name: '教研室/院级审核',
      meta: { title: '教研室/院级审核', permission: '教研室/院级审核' }
    }
  ]
}
export default checkRouter
