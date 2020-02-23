import Mock from 'mockjs'

const List = []
const Group = []
const count = 100

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    appname: '@first',
    nickname: '@ctitle',
    description: '@cparagraph',
    'domain|1': '@domain',
    'repo|1': '@url(http).git',
    'apptype|1': ['jdk1.7', 'jdk1.6', 'php5.3'],
    createdate: '@date',
    'status|1': ['正常', '已下线', '新建'],
    'owner': '@cname'
  }))
}

for (let i = 0; i < count; i++) {
  Group.push(Mock.mock({
    id: '@increment',
    groupname: '@ctitle',
    cname: '@first',
    description: '@cparagraph',
    createdate: '@datetime',
    'status|1': ['启用', '禁用'],
    'owner': '@cname'
  }))
}

export default [
  {
    url: '/app/list',
    type: 'get',
    response: config => {
      const { appname, nickname, apptype, owner, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (appname && item.appname !== appname) return false
        if (apptype && item.apptype !== apptype) return false
        if (owner && item.owner !== owner) return false
        if (nickname && item.nickname !== nickname) return false
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
    url: '/app/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const app of List) {
        if (app.id === +id) {
          return {
            code: 200,
            data: app
          }
        }
      }
    }
  },

  {
    url: '/app/repo',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const app of List) {
        if (app.id === +id) {
          return {
            code: 200,
            data: app.repo
          }
        }
      }
    }
  },

  {
    url: '/app/delete',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/app/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/app/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/app/group/list',
    type: 'get',
    response: config => {
      const { groupname, owner, page = 1, limit = 20, sort } = config.query

      let mockList = Group.filter(item => {
        if (groupname && item.groupname !== groupname) return false
        if (owner && item.owner !== owner) return false
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
    url: '/app/group/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const appgroup of Group) {
        if (appgroup.id === +id) {
          return {
            code: 200,
            data: appgroup
          }
        }
      }
    }
  },
  {
    url: '/app/group/delete',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/app/group/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/app/group/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]

