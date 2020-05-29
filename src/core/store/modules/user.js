import { getToken } from '@core/api/token'
import { setToken, removeToken } from '@core/utils/auth.js'
export default {
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        getToken(userInfo).then(({ data }) => {
          commit('SET_TOKEN', data)
          setToken(data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    signOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
