import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
import router from './router'
import { getToken } from '@core/utils/auth'
// import store from './store'
// import _import from './scripts/_import'
// import { handleMenus } from './scripts/utils'

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      try {
        next()
      } catch (error) {
        console.log(error)
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
