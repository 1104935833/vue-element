import request from '@/utils/request'

export function changeInfo(data) {
  return request({
    url: '/base/changeInfo',
    method: 'post',
    data
  })
}

export function editPwd(data) {
  return request({
    url: '/center/editPwd',
    method: 'post',
    data
  })
}

export function getYzm(data) {
  return request({
    url: '/center/getYzm',
    method: 'get',
    params: data
  })
}
//
export function serchPerformance(data) {
  return request({
    url: '/serchPerformance',
    method: 'post',
    data
  })
}

export function getPerformanceByUserId(data) {
  return request({
    url: '/getPerformanceByUserId',
    method: 'get',
    params: data
  })
}