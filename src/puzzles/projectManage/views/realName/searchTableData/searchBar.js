export default {
  data() {
    return {
      selectList: [{
        value: 'name',
        searchType: 'input',
        name: '姓名'
      },
      {
        value: 'workType',
        searchType: 'select',
        name: '工种',
        selectData: []
      },
      {
        value: 'state',
        searchType: 'select',
        name: '状态',
        selectData: []
      }
      ]
    }
  }

}
