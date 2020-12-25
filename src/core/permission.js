import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
import router from './router'
import { getToken } from '@core/utils/auth'
import store from './store'

const whiteList = ['/login']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (to.path === from.path) {
        next()
      } else {
        try {
          handlerBreadcrumb(to)
          next()
        } catch (error) {
          console.log(error)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)

      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

function handlerBreadcrumb(to) {
  new Promise((resolve, reject) => {
    const breadcrumb = store.state.breadcrumb
    const breadAppStatus = store.state.breadAppStatus
    if (breadcrumb) {
      const breadCrumb = breadcrumb.breadCrumb
      const { query: { type }} = to
      var breadInclude = true
      const judgeIncludeName = (nameType) => {
        breadInclude = breadCrumb.every(item => item.name !== nameType)
      }
      if (type) {
        const [add, edit, details] = (to.meta.name || '').split(',')
        if (type === 'add') {
          judgeIncludeName(add)
        } else if (type === 'edit') {
          judgeIncludeName(edit)
        } else {
          judgeIncludeName(details)
        }
      } else {
        judgeIncludeName(to.meta.name)
      }
      // breadInclude && breadCrumb.length === 2 ||  || breadAppStatus && breadCrumb.length > 2
      if (!breadAppStatus || breadInclude && breadCrumb.length === 2) {
        const { query: { type }, meta: { child, name }} = to
        if (child && breadCrumb.length > 1) deleteLastBread(breadCrumb)
        if (type) {
          const [add, edit, details] = (to.meta.name || '').split(',')
          if (type === 'add') {
            setItemBread(add, to)
          } else if (type === 'edit') {
            setItemBread(edit, to)
          } else {
            setItemBread(details, to)
          }
        } else {
          setItemBread(name, to)
        }
      }
      if (!breadInclude && breadCrumb.length > 1) {
        deleteLastBread(breadCrumb)
      }
    }
  })
}

function deleteLastBread(breadCrumb) {
  const list = JSON.parse(JSON.stringify(breadCrumb))
  list.splice(-1, 1)
  store.commit('SET_BREADCRUMB', list)
}

function setItemBread(nameType, to) {
  const { path, query } = to
  store.dispatch('getBreadCrumb', { data: { name: nameType, routeUrl: path, child: [], application: true, query }})
}
