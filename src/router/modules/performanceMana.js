/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const performanceManaRouter = {
  path: '/Grade',
  component: Layout,
  redirect: '/Grade/list',
  name: '业绩模块',
  meta: {
    title: '业绩模块',
    icon: 'peoples',
    permission: '业绩模块'
  },
  children: [{
    path: 'setting',
    component: () =>
      import('@/views/Grade/GradeSetting'),
    name: '业绩配置',
    meta: { title: '业绩配置', permission: '业绩配置' }
  },
  {
    path: 'collect',
    component: () =>
        import('@/views/Grade/GradeCollect'),
    name: '业绩汇总',
    meta: { title: '业绩汇总', permission: '业绩汇总' }
  }

  ]
  
  
}
export default performanceManaRouter
