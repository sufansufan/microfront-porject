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
        component: () =>
          import(/* webpackChunkName: "views/page" */ '../views/page/MoreNotify')
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
          import(/* webpackChunkName: "views/home" */ '../views/home/urgentMore')
      },
      {
        path: 'patchrecord',
        component: () =>
          import(/* webpackChunkName: "views/home" */ '../views/home/PatchRecord')
      }
    ]
  }
]
