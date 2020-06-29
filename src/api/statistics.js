import request from '@/utils/request'

export function getPer(data) {
  return request({
    url: '/searchPer',
    method: 'post',
    data
  })
}

export function getCountAudit() {
  return request({
    url: '/center/getCountAudit',
    method: 'get'
  })
}

export function getPerType(data) {
  return request({
    url: '/getperType',
    method: 'get',
    params: data
  })
}


