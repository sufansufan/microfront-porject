export default {
  state: {
    projectInfo: {},
    approachProjectInfo: {},
    buildPersonInfo: {}
  },
  getters: {
    projectInfo: state => state.projectInfo,
    approachProjectInfo: state => state.approachProjectInfo,
    buildPersonInfo: state => state.buildPersonInfo
  },
  mutations: {
    SET_PROJECTINFO(state, data) {
      state.projectInfo = data
    },
    SET_APPROACHPROJECTINFO(state, data) {
      state.approachProjectInfo = data
    },
    SET_BUILDPERSONINFO(state, data) {
      state.buildPersonInfo = data
    }
  },
  actions: {
  }
}
