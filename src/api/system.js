import request from '@/utils/request'
//**********人员管理***********//
export function getTreePeople(data) {
  return request({
    url: '/system/user/treepeople',
    method: 'get',
    params: data
  })
}

export function getOffice() {
  return request({
    url: '/system/user/office',
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/system/user/adduser',
    method: 'post',
    data
  })
}

export function editUser(data) {
  return request({
    url: '/system/user/edituser',
    method: 'post',
    data
  })
}

export function delByUserId(data) {
  return request({
    url: '/system/user/delByUserId',
    method: 'get',
    params: data
  })
}

export function searchInfo(data) {
  return request({
    url: '/system/user/searchinfo',
    method: 'post',
    data
  })
}

export function getUserByPage(data) {
  return request({
    url: '/system/user/getUserByPage',
    method: 'get',
    params: data
  })
}

export function count(data) {
  return request({
    url: '/system/user/count',
    method: 'get',
    params: data
  })
}

//**********菜单管理***********//
export function addMenu(data) {
  return request({
    url: '/system/menu/addMenu',
    method: 'post',
    data
  })
}

export function upMenu(data) {
  return request({
    url: '/system/menu/upMenu',
    method: 'post',
    data
  })
}

export function getAllParent(data) {
  return request({
    url: '/system/menu/getAllParent',
    method: 'get',
    params: data
  })
}

export function menuHide(data) {
  return request({
    url: '/system/menu/menuhide',
    method: 'get',
    params: data
  })
}

export function menuDel(data) {
  return request({
    url: '/system/menu/menudel',
    method: 'get',
    params: data
  })
}

export function getAllMenus() {
  return request({
    url: '/system/menu/getAllMenus',
    method: 'get',
  })
}
//**********角色管理***********//
export function addPart(data) {
  return request({
    url: '/system/part/addPart',
    method: 'post',
    data
  })
}

export function getTrandferUser(data) {
  return request({
    url: '/system/part/getTrandferUser',
    method: 'get',
    params: data
  })
}

export function editPartUser(data) {
  return request({
    url: '/system/part/editPartUser',
    method: 'post',
    params:data
  })
}

export function editPart(data) {
  return request({
    url: '/system/part/editPart',
    method: 'post',
    data
  })
}

export function getPartMenuById(data) {
  return request({
    url: '/system/part/getPartMenuById',
    method: 'get',
    params: data
  })
}

export function delPart(data) {
  return request({
    url: '/system/part/delPart',
    method: 'get',
    params: data
  })
}

export function getAllRole() {
  return request({
    url: '/system/part/getAllRole',
    method: 'get'
  })
}







