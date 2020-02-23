import Mock from 'mockjs'

const List = []
const count = 100

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    cmdname: '@first',
    description: '@cparagraph',
    'cmdtype|1': ['system', 'test'],
    'supporttype|1': ['ssh,ansible,salt', 'ansible,ssh', 'salt,ssh'],
    'version|1': ['1.1.2', '2.1.1'],
    'cmdpath|1': '@url(http).git'
  }))
}

export default [
  {
    url: '/conf/command/list',
    type: 'get',
    response: config => {
      const { cmdname, cmdtype, supporttype, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (cmdname && item.cmdname !== cmdname) return false
        if (cmdtype && item.cmdtype !== cmdtype) return false
        if (supporttype && item.supporttype !== supporttype) return false
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
    url: '/conf/detail',
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
  }
]

