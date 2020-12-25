import breadcrumb from './modules/breadcrumb'
import topNav from './modules/topNav'

import { getList } from '@core/api/emergencyWork'
export default {
  breadcrumb, topNav,
  state: {
    systemPost: {
      taskData: []
    }
  },
  getters: {
    systemPost: state => state.systemPost
  },
  mutations: {
    SET_TASK(state, { type, data }) {
      state.systemPost[type] = data
    }
  },
  actions: {
    taskList({ commit }, type) {
      getList({ type: 0, userId: '1' }).then(({ data }) => {
        commit('SET_TASK', { type, data })
      })
    }
  }
}
