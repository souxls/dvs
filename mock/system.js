import Mock from 'mockjs'

const List = []
const count = 100

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    time: '@datetime',
    user: '@first',
    nickname: '@cname',
    'logtype|1': ['应用发布', '软件安装', '资源申请', '系统注册'],
    log: '@cparagraph',
    ip: /192\.168\.\d{1,2}\.\d{2}/
  }))
}

const smtp = {
  subject: 'devops',
  smtp_server: '1.1.1.1',
  account: 'admin',
  password: '123456'
}

const git = {
  source: 'http://gitlab.xxx.com',
  account: 'admin',
  password: '123456'
}

const jenkins = {
  source: 'http://jenkins.xxx.com',
  account: 'test',
  password: 'test'
}

export default [
  {
    url: '/system/log',
    type: 'get',
    response: config => {
      const { user, nickname, ip, logtype, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (user && item.user !== user) return false
        if (nickname && item.nickname !== nickname) return false
        if (ip && item.ip !== ip) return false
        if (logtype && item.logtype !== logtype) return false
        return true
      })

      if (sort === '-time') {
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
    url: '/system/smtp',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: smtp
      }
    }
  },

  {
    url: '/system/git',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: git
      }
    }
  },

  {
    url: '/system/jenkins',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: jenkins
      }
    }
  }
]
