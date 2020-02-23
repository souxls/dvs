import request from '@/utils/request'

export function fetchLog(query) {
  return request({
    url: '/system/log',
    method: 'get',
    parmas: query
  })
}

export function fetchSmtp() {
  return request({
    url: '/system/smtp',
    method: 'get'
  })
}

export function fetchGit() {
  return request({
    url: '/system/git',
    method: 'get'
  })
}

export function fetchJenkins() {
  return request({
    url: '/system/jenkins',
    method: 'get'
  })
}
