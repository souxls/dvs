import request from '@/utils/request'

export function taskList(query) {
  return request({
    url: '/task/list',
    method: 'get',
    params: query
  })
}

export function taskDetail(id) {
  return request({
    url: '/task/detail',
    method: 'get',
    params: { id }
  })
}

export function deleteTask(id) {
  return request({
    url: '/task/delete',
    method: 'post',
    params: { id }
  })
}

export function createTask(data) {
  return request({
    url: '/task/create',
    method: 'post',
    data
  })
}

export function updateTask(data) {
  return request({
    url: '/task/update',
    method: 'post',
    data
  })
}

export function getRepo(id) {
  return request({
    url: '/task/repo',
    method: 'get',
    params: { id }
  })
}

export function taskTemplateList(query) {
  return request({
    url: '/task/template/list',
    method: 'get',
    params: query
  })
}

