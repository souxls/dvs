import request from '@/utils/request'

export function hostList(query) {
  return request({
    url: '/cmdb/host/list',
    method: 'get',
    params: query
  })
}

export function hostDetail(id) {
  return request({
    url: '/cmdb/host/detail',
    method: 'get',
    params: { id }
  })
}

export function deleteHost(id) {
  return request({
    url: '/cmdb/host/delete',
    method: 'post',
    params: { id }
  })
}

export function createHost(data) {
  return request({
    url: '/cmdb/host/create',
    method: 'post',
    data
  })
}

export function updateHost(data) {
  return request({
    url: '/cmdb/host/update',
    method: 'post',
    data
  })
}

export function groupList(query) {
  return request({
    url: '/cmdb/group/list',
    method: 'get',
    params: query
  })
}

export function groupDetail(id) {
  return request({
    url: '/cmdb/group/detail',
    method: 'get',
    params: { id }
  })
}

export function updateGroup(data) {
  return request({
    url: '/cmdb/group/update',
    method: 'post',
    data
  })
}

export function deleteGroup(data) {
  return request({
    url: '/cmdb/group/delete',
    method: 'post',
    data
  })
}

export function createGroup(data) {
  return request({
    url: '/cmdb/group/create',
    method: 'post',
    data
  })
}
