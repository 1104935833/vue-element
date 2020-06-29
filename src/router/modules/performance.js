/** When your routing table is too long, you can split it into small modules **/
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const performanceRouter = {
  path: '/achievementInput',
  component: Layout,
  redirect: '/achievementInput/list',
  name: '业绩登记',
  meta: {
    title: '业绩登记',
    icon: 'list',
    permission: '业绩登记'
  },
  children: [
    {
      path: 'honer',
      component: () => import('@/views/achievementInput/Perhonor'),
      name: '荣誉录入界面',
      meta: { title: '荣誉录入界面', permission: '荣誉录入界面' }
    },
    {
      path: 'Perscientific',
      component: () => import('@/views/achievementInput/Perscientific'),
      name: '科研业绩录入',
      meta: { title: '科研业绩录入', permission: '科研业绩录入' }
    },
    {
      path: 'activity-record',
      component: () => import('@/views/achievementInput/Perteacher'),
      name: '教学业绩录入',
      meta: { title: '教学业绩录入', permission: '教学业绩录入' }
    }

  ]

}
export default performanceRouter
