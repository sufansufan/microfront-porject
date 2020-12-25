export default {
  state: {
    customerBaseInfo: {
      companyName: '',
      contactPerson: '',
      contactPersontelephone: ''
    }
  },
  getters: {
    customerBaseInfo: state => state.customerBaseInfo
  },
  mutations: {
    SET_CUSTOMERBASEINFO(state, data) {
      console.log(data)
      state.customerBaseInfo = data
    }
  },
  actions: {
  }
}
