import store from './store'
import { getUser, getMenus } from './api'
import _import from './scripts/_import'
import { handleMenus } from './scripts/utils'
import router from './router'

/* eslint-disable */
async function assembleFrame(info) {
  const frame = await _import('frames', info.name, info.host, info.version)
  // 路由注册
  router.addRoutes(frame.routerStatic)
  // Store 注册
  for (const name in frame.store) { store.registerModule(name, frame.store[name]) }
  // 嵌套路由 / 默认两级路由
  return frame.routerStatic.filter(item => item.path === '/')
}
async function assemblePuzzles(menus, childRouter) {
  const pages = childRouter[0].children
  // 尝试获取模块 / 异步获取
  for (const puzzle of menus) {
    _import('puzzles', puzzle.id, puzzle.host, puzzle.version)
      .then(p => {
      // 需要生成路由的菜单
        const menusRouter = []
        handleMenus(puzzle.children, menusRouter)
        // 路由
        childRouter[0].children = p.router(menusRouter, puzzle.id).concat(p.routerStatic)
        pages.push(...childRouter[0].children)
        router.addRoutes(childRouter)
        router.addRoutes([{ path: '*', redirect: '/404' }])
        // Store
        for (const name in p.store) { store.registerModule(name, p.store[name]) }
      })
      .catch(err => {})
  }
  // 储存路由表
  store.commit('SET_PAGES', pages)
}
export async function initFrame() {
  document.title = PUZZLE_CONFIG.appName
  const [user] = await Promise.all([getUser()])
  await assembleFrame(user.frame)
}

export  async function initPuzzles() {
  document.title = PUZZLE_CONFIG.appName
  // 获取数据
  const [user, menus] = await Promise.all([getUser(), getMenus()])
  // 组装基座并获取基座嵌套路由
  const childRouter = await assembleFrame(user.frame)
  // 路由与子模块匹配拦截
  const puzzlesMenus = []
  await store.dispatch('generateRoutes').then(list => {
    list.forEach(item => {
      menus.forEach(m => {
        if (m.name === item.name) {
          puzzlesMenus.push(m)
        }
      })
    })
  })
  console.log(puzzlesMenus, 33333)
  // 组装模块
  await assemblePuzzles(puzzlesMenus, childRouter )
}
