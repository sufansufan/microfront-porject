export default {
  state: {
    cooperMenuName: '',
    cooperMenuUrl: '',
    cooperSearchBar: {}
  },
  getters: {
    cooperMenuName: state => state.cooperMenuName
  },
  mutations: {
    SET_COOPERMENUNAME(state, data) {
      state.cooperMenuName = data
    },
    SET_COOPERMENUURL(state, data) {
      state.cooperMenuUrl = data
    },
    SET_COOPERSEARCHBAR(state, data) {
      state.cooperSearchBar = data
    }
  },
  actions: {

  }
}
