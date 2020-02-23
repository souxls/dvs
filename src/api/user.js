import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function fetchList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    params: data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    params: data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    params: data
  })
}

export function roleList(query) {
  return request({
    url: '/role/list',
    method: 'get',
    params: query
  })
}
export function userDetail(id) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: { id }
  })
}

export function roleDetail(id) {
  return request({
    url: '/role/detail',
    method: 'get',
    params: { id }
  })
}

export function updateRole(data) {
  return request({
    url: '/role/update',
    method: 'post',
    params: data
  })
}

export function createRole(data) {
  return request({
    url: '/role/create',
    method: 'post',
    params: data
  })
}

export function deleteRole(data) {
  return request({
    url: '/role/delete',
    method: 'post',
    params: data
  })
}

