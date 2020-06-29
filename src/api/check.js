import request from '@/utils/request'

export function getAllAudit(data) {
  return request({
    url: '/getAllAudit',
    method: 'get',
    params: data
  })
}

export function getTableName(data) {
  return request({
    url: '/getTableName',
    method: 'get',
    params: data
  })
}

export function getIsCheck(data) {
  return request({
    url: '/getIsCheck',
    method: 'get',
    params: data
  })
}
