import { setLocalStorage } from '@core/utils/auth.js'
export default {
  state: {
    breadCrumb: []
  },
  mutations: {
    SET_BREADCRUMB(state, list) {
      state.breadCrumb = list
    }
  },
  getters: {
    breadCrumb: state => state.breadCrumb
  },
  actions: {
    getBreadCrumb({ commit, state }, data) {
      var list = JSON.parse(JSON.stringify(state.breadCrumb))
      if (!data.children && list.length > 1) {
        list.splice(-1, 1)
      } else if (data.children) {
        list = []
      }
      list.push(data)
      setLocalStorage('breadCrumb', JSON.stringify(list))
      commit('SET_BREADCRUMB', list)
    }
  }
}
