import request from '@/utils/request'

export function resourceList(query) {
  return request({
    url: '/cmdb/resource/list',
    method: 'get',
    params: query
  })
}

export function resourceDetail(id) {
  return request({
    url: '/cmdb/resource/detail',
    method: 'get',
    params: { id }
  })
}

export function deleteResource(id) {
  return request({
    url: '/cmdb/resource/delete',
    method: 'post',
    params: { id }
  })
}

export function createResource(data) {
  return request({
    url: '/cmdb//host/create',
    method: 'post',
    data
  })
}

export function updateResource(data) {
  return request({
    url: '/cmdb//host/update',
    method: 'post',
    data
  })
}
