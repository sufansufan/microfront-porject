import { setLocalStorage } from '@core/utils/auth.js'
export default {
  state: {
    breadCrumb: [],
    breadAppStatus: false
  },
  mutations: {
    SET_BREADCRUMB(state, list) {
      state.breadCrumb = list
    },
    SET_BREADAPPSTATUS(state, status) {
      state.breadAppStatus = status
    }
  },
  getters: {
    breadCrumb: state => state.breadCrumb
  },
  actions: {
    async getBreadCrumb({ commit, state }, { data, type }) {
      var list = JSON.parse(JSON.stringify(state.breadCrumb))
      if (!data.child.length && list.length > 1 && !Object.prototype.hasOwnProperty.call(data, 'application')) {
        if (list.length > 2) {
          list.splice(1, list.length - 1)
        } else {
          list.splice(-1, 1)
        }
      } else if (data.child.length) {
        list = []
      }
      list.push(data)
      if (type === 'bread') {
        list.splice(-1, 1)
      }
      setLocalStorage('breadCrumb', JSON.stringify(list))
      commit('SET_BREADCRUMB', list)
    }
  }
}
