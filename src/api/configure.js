import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/conf/command/list',
    method: 'get',
    params: query
  })
}

export function fetchDetail(id) {
  return request({
    url: '/app/detail',
    method: 'get',
    params: { id }
  })
}

export function deleteHost(id) {
  return request({
    url: '/app/delete',
    method: 'post',
    params: { id }
  })
}

export function createHost(data) {
  return request({
    url: '/app/create',
    method: 'post',
    data
  })
}

export function updateHost(data) {
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
