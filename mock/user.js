import Mock from 'mockjs'

const List = []
const Role = []
const count = 100

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    username: '@cname',
    account: '@first',
    'department|1': ['系统部', '开发部', '网站部'],
    'job|1': ['运维', '开发'],
    'phonenumber|10000000000-19999999999': 1,
    createdate: '@date',
    'status|1': ['启用', '禁用'],
    'rolename|1': ['系统管理员', '开发']
  }))
}
for (let i = 0; i < count; i++) {
  Role.push(Mock.mock({
    id: '@increment',
    'rolename|1': ['系统管理员', '开发'],
    'cname|1': ['admin', 'develop'],
    description: '@csentence',
    'status|1': ['启用', '禁用'],
    createdate: '@datetime'
  }))
}

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  {
    url: '/user/list',
    type: 'get',
    response: config => {
      const { username, account, department, job, rolename, status, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (username && item.username !== username) return false
        if (account && item.account !== account) return false
        if (department && item.department !== department) return false
        if (job && item.job !== job) return false
        if (rolename && item.rolename !== rolename) return false
        if (status && item.status !== status) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 200,
        data: {
          //  total: mockList.length,
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/user/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/user/delete',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/user/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/user/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const user of List) {
        if (user.id === +id) {
          return {
            code: 200,
            data: user
          }
        }
      }
    }
  },
  {
    url: '/role/list',
    type: 'get',
    response: config => {
      const { rolename, page = 1, limit = 20, sort } = config.query

      let mockList = Role.filter(item => {
        if (rolename && item.rolename !== rolename) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 200,
        data: {
          //  total: mockList.length,
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/role/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const role of Role) {
        if (role.id === +id) {
          return {
            code: 200,
            data: role
          }
        }
      }
    }
  },
  {
    url: '/role/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/role/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/role/delete',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
