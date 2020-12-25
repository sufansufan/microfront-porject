export default {
  namespaced: true,
  state: {
    power: true // 暂时不需要直接true
  },
  getters: {

  },
  mutations: {
    UPDATE_POWER(state, payload) {
      state.power = payload
    }
  },
  actions: {
    //   async login({
    //     commit
    //   }, userInfo) {
    //     console.log("提交")
    //     const power = await mockFecth(userInfo)
    //     // userInfo 请求完成的状态保存sessionStroage
    //     commit("UPDATE_POWER", power)
    //   }
    // }
  }

}
// function mockFecth(userInfo) {
//   const {
//     username,
//     password
//   } = userInfo;
//   console.log(username, password, 'userinof')
//   return new Promise((res) => {
//     setTimeout(() => {
//       res(true)
//     }, 1000)
//   })
// }