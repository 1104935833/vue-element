import request from '@/utils/request'

// 登录方法
export function login(params) {
  return request({
    method: 'post',
    url: '/login',
    data: params,
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取菜单
export function initMenu() {
  return request({
    url: '/config/sysmenu',
    method: 'get'
  })
}

// 获取图形验证码
export function getCode() {
  return request({
    url: '/config/code',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
