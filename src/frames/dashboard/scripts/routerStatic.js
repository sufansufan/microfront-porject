export default [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "views/login" */ '../views/login/')
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "views/login" */ '../views/404')
  },
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "views/layout" */ '../views/layout/'),
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: 'home',
        component: () =>
          import(/* webpackChunkName: "views/home" */ '../views/home/')
      },
      {
        path: 'MoreNotify',
        component: () => import(/* webpackChunkName: "views/page" */ '../views/page/MoreNotify'),
        meta: {
          name: '系统消息'
        }
      },
      {
        path: 'GoNotify',
        component: () =>
          import(/* webpackChunkName: "views/page" */ '../views/page/GoNotify')
      },
      {
        path: 'finishnotify',
        component: () =>
          import(/* webpackChunkName: "views/page" */ '../views/page/components/FinishNotify')
      },
      {
        path: 'urgentMore',
        component: () =>
          import(/* webpackChunkName: "views/home" */ '../views/home/urgentMore'),
        meta: {
          name: '更多紧急任务'
        }
      },
      {
        path: 'patchrecord',
        component: () =>
          import(/* webpackChunkName: "views/home" */ '../views/home/PatchRecord')
      },
      {
        path: 'systemDetails',
        component: () =>
          import(/* webpackChunkName: "views/home" */ '../views/home/systemDetails'),
        meta: {
          name: '查看详情'
        }
      },
      {
        path: 'inviteFeedback',
        component: () =>
          import(/* webpackChunkName: "views/home" */ '../views/home/inviteFeedback')
      },
      {
        path: 'updateInfo',
        component: () =>
          import(/* webpackChunkName: "views/home" */ '../views/home/updateInfo'),
        meta: {
          name: '查看详情'
        }
      },
      {
        path: 'stopInfo',
        component: () =>
          import(/* webpackChunkName: "views/home" */ '../views/home/stopInfo'),
        meta: {
          name: '查看详情'
        }
      },
      {
        path: 'teamManagement',
        component: () =>
          import(/* webpackChunkName: "views/home" */ '../views/home/teamManagement'),
        meta: {
          name: '查看详情'
        }
      },
      {
        path: 'publicSystemMessage',
        component: () => import(/* webpackChunkName: "views/home" */ '../views/home/publicSystemMessage'),
        meta: {
          name: '系统消息'
        }
      }
    ]
  }
]
