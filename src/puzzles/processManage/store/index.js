export default {
  state: {
    nodeId: {},
    applicationListReg: [''],
    configBaseInfo: {},
    processData: {},
    linkData: []
  },
  getters: {
    nodeId: state => state.nodeId,
    configBaseInfo: state => state.configBaseInfo,
    processData: state => state.processData,
    linkData: state => state.linkData
  },
  mutations: {
    setApplicationListReg(state, list) {
      state.applicationListReg = list
    },
    SET_NODEID(state, data) {
      state.nodeId = data
    },
    SET_CONFIGBASEINFO(state, data) {
      state.configBaseInfo = data
    },
    SET_PROCESSDATA(state, data) {
      state.processData = data
    },
    SET_LINKDATA(state, data) {
      state.linkData.push(data)
    }
  },
  actions: {}
}
