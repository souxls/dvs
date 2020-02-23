import request from '@/utils/request'

export function appList(query) {
  return request({
    url: '/app/list',
    method: 'get',
    params: query
  })
}

export function appDetail(id) {
  return request({
    url: '/app/detail',
    method: 'get',
    params: { id }
  })
}

export function deleteApp(id) {
  return request({
    url: '/app/delete',
    method: 'post',
    params: { id }
  })
}

export function createApp(data) {
  return request({
    url: '/app/create',
    method: 'post',
    data
  })
}

export function updateApp(data) {
  return request({
    url: '/app/update',
    method: 'post',
    data
  })
}

export function getRepo(id) {
  return request({
    url: '/app/repo',
    method: 'get',
    params: { id }
  })
}
export function groupList(query) {
  return request({
    url: '/app/group/list',
    method: 'get',
    params: query
  })
}

export function groupDetail(id) {
  return request({
    url: '/app/group/detail',
    method: 'get',
    params: { id }
  })
}

export function deleteGroup(id) {
  return request({
    url: '/app/group/delete',
    method: 'post',
    params: { id }
  })
}

export function createGroup(data) {
  return request({
    url: '/app/group/create',
    method: 'post',
    data
  })
}

export function updateGroup(data) {
  return request({
    url: '/app/group/update',
    method: 'post',
    data
  })
}
