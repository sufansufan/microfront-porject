export default {
  data() {
    return {
      selectList: [
        {
          value: 'date1,date2',
          searchType: 'rangeDate',
          name: '项目年份'
        },
        {
          value: 'status',
          searchType: 'select',
          name: '工程状态',
          selectData: []
        },
        {
          value: 'name',
          searchType: 'input',
          name: '建设单位'
        }
      ],
      btnList: [
      ]
    }
  },
  methods: {
  }
}
