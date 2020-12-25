export default {
  data() {
    return {
      selectList: [
        {
          value: 'bankNumber',
          searchType: 'input',
          name: '银行账号'
        },
        {
          value: 'bankName',
          searchType: 'select',
          name: '银行(开户行名称)',
          selectData: []
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
          label: '银行(开户行名称)',
          prop: 'bankName',
          showTooltip: true
        },
        {
          label: '银行账号',
          prop: 'bankNumber',
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
          showTooltip: true
        },
        {
          label: '开户行地址',
          prop: 'bankAddress',
          showTooltip: true
        }
      ],
      tableData: [
        {
          id: '1',
          phone: '16611111111',
          nickname: null,
          functionType: null,
          useType: false,
          createDate: 1602560641000,
          createUserId: null,
          createUserName: '超级管理员',
          state2: '2'
        },
        {
          id: '2',
          phone: '16611111111',
          nickname: null,
          functionType: null,
          useType: false,
          createDate: 1602560641000,
          createUserId: null,
          createUserName: '超级管理员',
          state2: '2'
        }
      ]
    }
  },
  methods: {
  }
}
