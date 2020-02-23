import Mock from 'mockjs'

const List = []
const Group = []
const count = 100

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    hostname: '@first',
    description: '@cparagraph',
    wanip: '@ip',
    lanip: /192\.168\.\d{1,2}\.\d{2}/,
    idracip: /192\.168\.\d{1,2}\.\d{2}/,
    'disk|1': ['600G', '1000G'],
    'memory|1': ['32G', '64G'],
    'systemtype|1': ['centos6.5', 'centos7.6', 'centos7.0'],
    'hosttype|1': ['physical', 'virtualhost'],
    'status|1': ['正常', '故障', '已下架'],
    'productname|1': ['PowerEdge R620', 'PowerEdge R430'],
    'sn': '@string(upper, 7)',
    'raid|1': ['Raid5', 'Raid1', 'Raid10', '-'],
    'idc|1': ['无锡', '亦庄'],
    'cabinet|1': ['H7', 'L5', 'c6'],
    'owner': '@title',
    'expired': '@date'
  }))
}

for (let i = 0; i < count; i++) {
  Group.push(Mock.mock({
    id: '@increment',
    groupname: '@ctitle',
    cname: '@first',
    description: '@cparagraph',
    createdate: '@date',
    'status|1': ['启用', '禁用']
  }))
}

export default [
  {
    url: '/cmdb/host/list',
    type: 'get',
    response: config => {
      const { hostname, wanip, lanip, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (hostname && item.hostname !== hostname) return false
        if (wanip && item.wanip !== wanip) return false
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
    url: '/cmdb/host/detail',
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
    url: '/cmdb/host/delete',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },

  {
    url: '/cmdb//host/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        message: '创建成功'
      }
    }
  },

  {
    url: '/cmdb/host/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        message: '更新成功'
      }
    }
  },

  {
    url: '/cmdb/group/list',
    type: 'get',
    response: config => {
      const { groupname, cname, page = 1, limit = 20, sort } = config.query

      let mockList = Group.filter(item => {
        if (groupname && item.groupname !== groupname) return false
        if (cname && item.cname !== cname) return false
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
    url: '/cmdb/group/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const group of Group) {
        if (group.id === +id) {
          return {
            code: 200,
            data: group
          }
        }
      }
    }
  },

  {
    url: '/cmdb/group/delete',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },

  {
    url: '/cmdb/group/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        message: '创建成功',
        data: {
          id: 111111,
          createdate: '2019-01-08'
        }
      }
    }
  },

  {
    url: '/cmdb/group/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        message: '更新成功'
      }
    }
  }
]

