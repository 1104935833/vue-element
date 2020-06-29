import request from '@/utils/request'

export function getGradeListByTeacher(data) {
  return request({
    url: '/grade/getGradeListByTeacher',
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

export function editGrade(data) {
  return request({
    url: '/grade/editGrade',
    method: 'put',
    params:data
  })
}

export function getGradeList(data) {
  return request({
    url: '/grade/getGradeList',
    method: 'get',
    params: data
  })
}
