export default {
  state: {
    materialInfoId: '',
    materialSearch: {},
    tinymce: ''
  },
  getters: {
    materialInfoId: state => state.materialInfoId,
    materialSearch: state => state.materialSearch,
    tinymce: state => state.tinymce
  },
  mutations: {
    SET_MATERIALINFOID(state, data) {
      state.materialInfoId = data
    },
    SET_MATERIALSEARCH(state, data) {
      state.materialSearch = data
    },
    SET_TINYMCE(state, data) {
      state.tinymce = data
    }
  },
  actions: {

  }
}
