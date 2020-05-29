
// import store from '../index.js'
// import router from '../../router'

const state = {

}

const mutations = {

}

const actions = {
  async generateRoutes({ commit, state }, { user, menus }) {
    return new Promise((resolve, reject) => {
      // const { user, menus } = data
      console.log(user, menus)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
