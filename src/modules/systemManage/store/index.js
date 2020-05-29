import { getTree } from '@core/api/post'
export default {
  state: {
    applicationId: '',
    systemPost: {
      positionOfBranchCompany: [],
      projectPost: [],
      companyPost: []
    },
    selectTab: ''
  },
  getters: {
    systemPost: state => state.systemPost,
    systemApplicationId: state => state.applicationId,
    selectTab: state => state.selectTab
  },
  mutations: {
    SET_APPLICATIONID(state, data) {
      state.applicationId = data
    },
    SET_POSTTREE(state, { type, data }) {
      state.systemPost[type] = data
    },
    SELECT_TAB(state, data) {
      state.selectTab = data
    }
  },
  actions: {
    postTree({ commit }, type) {
      getTree({ jobAttribution: type }).then(({ data }) => {
        commit('SET_POSTTREE', { type, data })
      })
    }
  }
}
