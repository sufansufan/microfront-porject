import { homeAppMenuList } from '@core/api/authResourcegc'
import { getUserPower, getUserDataPower } from '@core/api/personnel'
import { setSessionStorage } from '@core/utils/auth'
export default {
  state: {
    pages: [],
    applicationList: [],
    powerList: []
  },
  mutations: {
    SET_PAGES: (state, pages) => {
      state.pages = pages
    },
    SET_APPLICATIONLIST: (state, data) => {
      state.applicationList = data
    },
    SET_POWERLIST: (state, data) => {
      state.powerList = data
    }
  },
  actions: {
    generateRoutes({ commit, state }) {
      return new Promise((resolve, reject) => {
        // if (state.applicationList.length) return
        homeAppMenuList().then(({ data }) => {
          commit('SET_APPLICATIONLIST', data)
          resolve(data)
        })
      })
    },
    generatePower({ commit, state }) {
      return new Promise((resolve, reject) => {
        // if (state.powerList.length) return
        getUserPower().then(({ data }) => {
          commit('SET_POWERLIST', data)
          setSessionStorage('button', data)
        })
        getUserDataPower().then(({ data }) => {
          // commit('SET_POWERLIST', data)
          setSessionStorage('dataButton', data)
        })
      })
    }
  }
}
