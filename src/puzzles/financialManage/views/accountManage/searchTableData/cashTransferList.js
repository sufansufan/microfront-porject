export default {
  data() {
    return {
      selectList: [
        {
          value: 'name',
          searchType: 'input',
          name: '账户行名称'
        }
      ],
      btnList: [
      ],
      columns: [
        {
          type: 'selection',
          single: true
        },
        {
          label: '序号',
          index: true
        },
        {
          label: '账户行名称',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '归属单位',
          prop: 'organizationName',
          showTooltip: true
        },
        {
          label: '当前余额',
          prop: 'currentBalance',
          align: 'right',
          showTooltip: true
        }
      ],
      tableData: []
    }
  },
  methods: {
  }
}
