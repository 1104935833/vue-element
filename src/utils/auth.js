import Cookies from 'js-cookie'
import { asyncRoutes } from '@/router'

export function setRule(role) {
  return Cookies.set('Rule', role)
}

export function getRule() {
  return Cookies.get('Rule')
}

export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getUser() {
  return JSON.parse(localStorage.getItem('user'))
}

export function setDept(dept) {
  localStorage.setItem('dept', JSON.stringify(dept))
}

export function getDept() {
  return JSON.parse(localStorage.getItem('dept'))
}

export function setPermissions(permissions) {
  localStorage.setItem('permissions', JSON.stringify(permissions))
}

export function getPermissions() {
  return JSON.parse(localStorage.getItem('permissions'))
}

// 目前只精细到两层路由
export function setRouter(javaRouter) {
  let routes = deepClone(asyncRoutes)
  for (const i in routes) {
    if (!isInJavaRouter(routes[i].meta.permission, javaRouter)) {
      delete routes[i]
    } else if (routes[i].children) {
      for (const y in routes[i].children) {
        if (!isInJavaRouter(routes[i].children[y].meta.permission, javaRouter)) {
          delete routes[i].children[y]
        }
      }
      
      routes[i].children = routes[i].children.filter(function(s) {
        return !(typeof s === 'undefined')
      })
    }
  }
  routes = routes.filter(function(s) {
    return !(typeof s === 'undefined')
  })
  localStorage.setItem('router', JSON.stringify(routes))
}

function isInJavaRouter(node, javaRouter) {
  for (const i in javaRouter) {
    if (javaRouter[i].name === node) {
      return true
    }
  }
  return false
}

// 定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
  // 定义一个变量
  let result
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      for (const i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (const i in target) {
        result[i] = deepClone(target[i])
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target
  }
  return result
}

export function getRouter() {
  return JSON.parse(localStorage.getItem('router'))
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function getToken() {
  return localStorage.getItem('token')
}
