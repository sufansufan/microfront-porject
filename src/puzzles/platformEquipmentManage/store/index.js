
export default {
  state: {
    equipmentItem: {},
    purchaseList: [],
    purchaseMoney: {},
    orderTitlename: '',
    directoryTitlename: ''
  },
  getters: {
    equipmentItem: state => state.equipmentItem,
    purchaseList: state => state.purchaseList,
    purchaseMoney: state => state.purchaseMoney,
    orderTitlename: state => state.orderTitlename,
    directoryTitlename: state => state.directoryTitlename
  },
  mutations: {
    SET_EQUIPMENTITEM(state, data) {
      state.equipmentItem = data
    },
    SET_PURCHASElIST(state, data) {
      state.purchaseList = data
    },
    SET_PURCHASEMONEY(state, data) {
      state.purchaseMoney = data
    },
    SET_ORDERTITLENAME(state, data) {
      state.orderTitlename = data
    },
    SET_DIRECTORYTITLENAME(state, data) {
      state.directoryTitlename = data
    }
  },
  actions: {

  }
}
