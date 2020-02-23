import Mock from 'mockjs'

const List = []
const count = 100

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    hostname: '@first',
    'lanip': /192\.168\.\d{1,2}\.\d{2}/,
    'version|1': ['5.1', '5.7', '1.11'],
    'port|8000-9000': 8080,
    'status|1': ['未运行', '运行'],
    'note': '@ctitle'
  }))
}

export default [
  {
    url: '/cmdb/resource/list',
    type: 'get',
    response: config => {
      const { hostname, lanip, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (hostname && item.hostname !== hostname) return false
        if (lanip && item.lanip !== lanip) return false
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
    url: '/cmdb/resource/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const cmdb of List) {
        if (cmdb.id === +id) {
          return {
            code: 200,
            data: cmdb
          }
        }
      }
    }
  },

  {
    url: '/cmdb/resource/delete',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/cmdb//resource/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/cmdb/resource/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]

