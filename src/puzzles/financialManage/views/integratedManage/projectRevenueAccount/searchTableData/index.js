export default {
  data() {
    return {
      selectList: [
        {
          value: 'signDate',
          searchType: 'pickerDate',
          name: '项目年份'
        },
        {
          value: 'projectState',
          searchType: 'select',
          name: '工程状态',
          selectData: []
        },
        {
          value: 'type',
          searchType: 'select',
          name: '工程类型',
          selectData: []
        },
        {
          value: 'settleState',
          searchType: 'select',
          name: '是否结清',
          selectData: []
        },
        {
          value: 'constructionUnit',
          searchType: 'input',
          name: '建设单位'
        },
        {
          value: 'name',
          searchType: 'select',
          name: '工程名称',
          selectData: []
        },
        {
          value: 'costAccountingId',
          searchType: 'select',
          name: '成本会计',
          selectData: [],
          selectOption: { value: 'id', label: 'name' }
        },
        {
          value: 'allReceived',
          searchType: 'select',
          name: '是否全部收款',
          selectData: []
        },
        {
          value: 'allbilling',
          searchType: 'select',
          name: '是否全部开票',
          selectData: []
        },
        {
          value: 'allPayment',
          searchType: 'select',
          name: '是否全部付款',
          selectData: []
        },
        {
          value: 'allReceipt',
          searchType: 'select',
          name: '是否全部收票',
          selectData: []
        }
      ],
      btnList: [
        {
          children: [{
            name: '分配成本会计',
            power: 'contractInput:settle',
            on: () => {
              this.distribution()
            },
            icon: 'icon-fabu-copy'
          }]
        },
        {
          children: [{
            name: '导出',
            power: 'contractInput:revoke',
            on: () => {
              this.revocationContract()
            },
            icon: 'icon-daoru-copy'
          }]
        }
      ]
    }
  },
  methods: {
    // 分配成本会计
    distribution() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.$refs.dialog.show = true
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields()
      })
    }
  }
}
