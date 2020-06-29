import request from '@/utils/request'

export function getPerformance() {
  return request({
    url: '/center/getPerformance',
    method: 'get'
  })
}

export function getCountAudit() {
  return request({
    url: '/center/getCountAudit',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/base/userInfo',
    method: 'get'
  })
}

export function getPerforEchart1() {
  return request({
    url: '/center/PerforEchart1',
    method: 'get'
  })
}


