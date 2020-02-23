import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/task',
    component: Layout,
    redirect: '/task/index',
    meta: { title: '任务管理', 'icon': 'task' },
    children: [
      {
        path: 'tasklist',
        name: 'Task',
        component: () => import('@/views/task/index'),
        redirect: '/task/tasklist/list',
        meta: { title: '任务列表' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/task/task/list'),
            meta: { title: '任务列表', icon: 'task', breadcrumb: false }
          },
          {
            path: 'info/:id(\\d+)',
            component: () => import('@/views/task/task/edit'),
            meta: { title: '任务详情', noCache: true, activeMenu: '/app/group/list' },
            hidden: true
          }
        ]
      },
      {
        path: 'tempalte',
        name: 'Template',
        component: () => import('@/views/task/template/list'),
        meta: { title: '任务模版', icon: 'template' }
      }
    ]
  },

  {
    path: '/app',
    component: Layout,
    redirect: '/app/index',
    meta: { title: '应用管理', icon: 'application' },
    children: [
      {
        path: 'index',
        name: 'Appindex',
        component: () => import('@/views/application/index'),
        meta: { title: '应用概览', icon: 'overview' }
      },
      {
        path: 'app',
        name: 'Appdetail',
        component: () => import('@/views/application/app/list'),
        meta: { title: '应用列表', icon: 'application' }
      },
      {
        path: 'group',
        name: 'Appgroup',
        component: () => import('@/views/application/group/index'),
        meta: { title: '应用分组' },
        redirect: '/app/group/list',
        children: [
          {
            path: 'list',
            component: () => import('@/views/application/group/list'),
            meta: { title: '应用分组', icon: 'setting', breadcrumb: false }
          },
          {
            path: 'edit/:id(\\d+)',
            component: () => import('@/views/application/group/edit'),
            meta: { title: '应用组管理', noCache: true, activeMenu: '/app/group/list' },
            hidden: true
          }
        ]
      }
    ]
  },

  {
    path: '/cmdb',
    component: Layout,
    redirect: '/cmdb/index',
    meta: { title: '资产管理', icon: 'cabinet' },
    children: [
      {
        path: 'index',
        name: 'Cmdb',
        component: () => import('@/views/cmdb/index'),
        meta: { title: '概览', icon: 'overview' }
      },
      {
        path: 'host',
        name: 'Host',
        component: () => import('@/views/cmdb/host/index'),
        redirect: '/cmdb/host/list',
        meta: { title: '主机列表' },
        children: [
          {
            path: 'list',
            name: 'HostList',
            component: () => import('@/views/cmdb/host/list'),
            meta: { title: '主机列表', icon: 'server', breadcrumb: false }
          },
          {
            path: 'edit/:id(\\d+)',
            component: () => import('@/views/cmdb/host/edit'),
            meta: { title: '主机管理', noCache: true, activeMenu: '/cmdb/host/list' },
            hidden: true
          }
        ]
      },
      {
        path: 'group',
        name: 'HostGroup',
        component: () => import('@/views/cmdb/group/index'),
        redirect: '/cmdb/group/list',
        meta: { title: '主机分组' },
        children: [
          {
            path: 'list',
            name: 'HostGroupList',
            component: () => import('@/views/cmdb/group/list'),
            meta: { title: '主机分组', icon: 'group', breadcrumb: false }
          },
          {
            path: 'edit/:id(\\d+)',
            component: () => import('@/views/cmdb/group/edit'),
            meta: { title: '主机组管理', noCache: true, activeMenu: '/cmdb/group/list' },
            hidden: true
          }
        ]
      },
      {
        path: 'resource',
        name: 'Resource',
        component: () => import('@/views/cmdb/resource/index'),
        redirect: '/cmdb/resource/list',
        meta: { title: '资源池' },
        children: [
          {
            path: 'list',
            name: 'ResourceList',
            component: () => import('@/views/cmdb/resource/list'),
            meta: { title: '资源池', icon: 'resource', breadcrumb: false }
          },
          {
            path: 'edit/:id(\\d+)',
            component: () => import('@/views/cmdb/resource/edit'),
            meta: { title: '资源管理', noCache: true, activeMenu: '/cmdb/group/list' },
            hidden: true
          }
        ]
      },
      {
        path: 'area',
        name: 'Area',
        component: () => import('@/views/cmdb/area/index'),
        redirect: '/cmdb/area/list',
        meta: { title: '区域管理' },
        children: [
          {
            path: 'list',
            name: 'AreaList',
            component: () => import('@/views/cmdb/area/list'),
            meta: { title: '区域管理', icon: 'area', breadcrumb: false }
          },
          {
            path: 'edit/:id(\\d+)',
            component: () => import('@/views/cmdb/area/edit'),
            meta: { title: '主机更新', noCache: true, activeMenu: '/cmdb/area/list' },
            hidden: true
          }
        ]
      }
    ]
  },

  {
    path: '/conf',
    component: Layout,
    redirect: '/conf/command',
    meta: { title: '配置中心', icon: 'setting' },
    children: [
      {
        path: 'command',
        name: 'Command',
        component: () => import('@/views/configure/command'),
        meta: { title: '操作管理', icon: 'command' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/permissions',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'permissions',
        name: 'Permissions',
        component: () => import('@/views/user/permissions/index'),
        meta: { title: '权限管理' },
        redirect: '/user/permissions/list',
        children: [
          {
            path: 'list',
            name: 'UserList',
            component: () => import('@/views/user/permissions/list'),
            meta: { title: '权限管理', icon: 'permissions', breadcrumb: false }
          },
          {
            path: 'edit/:id(\\d+)',
            component: () => import('@/views/user/permissions/edit'),
            meta: { title: '分配角色', noCache: true, activeMenu: '/user/permission/list' },
            hidden: true
          }
        ]
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/user/role/index'),
        meta: { title: '角色管理' },
        children: [
          {
            path: 'index',
            component: () => import('@/views/user/role/list'),
            meta: { title: '角色管理', icon: 'role', breadcrumb: false }
          },
          {
            path: 'edit/:id(\\d+)',
            component: () => import('@/views/user/role/edit'),
            meta: { title: '角色权限管理', noCache: true, activeMenu: '/user/role/list' },
            hidden: true
          }
        ]
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    meta: { title: '系统管理', icon: 'systemManage' },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/system/index'),
        meta: { title: '系统配置', icon: 'systemManage' }
      },
      {
        path: 'system/log',
        name: 'Log',
        component: () => import('@/views/system/log'),
        meta: { title: '系统日志', icon: 'log' }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Profile',
        component: () => import('@/views/profile/index'),
        meta: { title: '个人设置', icon: 'user' }
      }
    ]
  },

  {
    path: '/wiki',
    component: Layout,
    meta: { title: '站内wiki', icon: 'guide' }
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
