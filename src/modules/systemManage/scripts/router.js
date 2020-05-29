import { queryParent } from '@core/utils'

export default function(menusRouter, puzzleName) {
  const router = []
  const routerTree = menusRouter
  var children = []
  // 动态路由
  const checkRouter = (menusRouter) => {
    if (Array.isArray(menusRouter)) {
      for (const item of menusRouter) {
        const pathArray = queryParent(routerTree, item.page, 'page')
        let path = ''
        pathArray.forEach(item => {
          path += item
        })
        const routerInfo = {
          name: item.id,
          path: '/' + puzzleName + path,
          component: () =>
            import(
              /* webpackChunkName: "views/[request]" */
              `@puzzles/${puzzleName}/views${path}`
            ),
          meta: {
            puzzleName: puzzleName,
            name: item.name,
            resource: item.resource ? item.resource : []
          }
        }

        if (item.child) {
          children.push(routerInfo)
          var last = router.length - 1
          router[last] = {
            ...router[last],
            children
          }
        } else {
          children = []
          router.push(routerInfo)
        }
        if (item.children && item.children.length) {
          checkRouter(item.children)
        }
      }
    }
  }
  checkRouter(menusRouter)
  return router
}
