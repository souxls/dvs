import Mock from 'mockjs'

const List = []
const Template = []
const count = 100

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    taskname: '@first',
    description: '@cparagraph',
    'tasktype|1': ['发布', '更新', '安装程序', '申请资源'],
    createdate: '@datetime',
    'status|1': ['正在运行', '已完成', '运行失败', '已取消'],
    'owner': '@cname'
  }))
}

for (let i = 0; i < count; i++) {
  Template.push(Mock.mock({
    id: '@increment',
    name: '@first',
    description: '@cparagraph',
    createdate: '@datetime'
  }))
}

export default [
  {
    url: '/task/list',
    type: 'get',
    response: config => {
      const { taskname, tasktype, owner, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (taskname && item.taskname !== taskname) return false
        if (tasktype && item.tasktype !== tasktype) return false
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
    url: '/task/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const task of List) {
        if (task.id === +id) {
          return {
            code: 200,
            data: task
          }
        }
      }
    }
  },

  {
    url: '/task/repo',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const task of List) {
        if (task.id === +id) {
          return {
            code: 200,
            data: task.repo
          }
        }
      }
    }
  },

  {
    url: '/task/delete',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/task/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/task/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]

