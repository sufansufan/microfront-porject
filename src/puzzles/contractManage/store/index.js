export default {
  state: {
    tabComponentState: '',
    commonCommpany: ''
  },
  getters: {
    tabComponentState: state => state.tabComponentState,
    commonCommpany: state => state.commonCommpany
  },
  mutations: {
    SET_TABCOMPONENTSTATE(state, data = '') {
      state.tabComponentState = data
    },
    SET_COMMON_COMMPANY(state, data) {
      state.commonCommpany = data
    }
  },
  actions: {
  }
}
