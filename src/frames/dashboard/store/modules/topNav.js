import { setSessionStorage } from '@core/utils/auth'
export default {
  state: {
    headerImg: null,
    navInfo: {}
  },
  mutations: {
    SET_HEADERIMG(state, type) {
      state.headerImg = type
    },
    SET_NAVINFO(state, data) {
      state.navInfo = data
    }
  },
  getters: {
    navInfo: state => state.navInfo
  },
  actions: {
    setNavInfo({ commit }, data) {
      setSessionStorage('navInfo', JSON.stringify(data))
      commit('SET_NAVINFO', data)
    }
  }
}
