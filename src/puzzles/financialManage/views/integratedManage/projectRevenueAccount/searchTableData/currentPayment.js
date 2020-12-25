// 往来款明细
export default {
  data() {
    return {
      selectList: [
        {
          value: 'dateOfOccurrence',
          searchType: 'pickerDate',
          name: '发生日期'
        },
        {
          value: 'paymentType',
          searchType: 'select',
          name: '款项类型',
          selectData: []
        },
        {
          value: 'estimatedDate',
          searchType: 'pickerDate',
          name: '预计还款日期'
        },
        {
          value: 'currentPaymentObject',
          searchType: 'input',
          name: '往来款对象'
        }

      ],
      btnList: [
        {
          children: [
            {
              name: '新增',
              power: 'contractInput:add',
              on: () => {
                this.orgJump('add')
              },
              icon: 'icon-fabu-copy'
            },
            {
              name: '修改',
              power: 'contractInput:edit',
              on: () => {
                this.orgJump('edit')
              },
              icon: 'icon-fabu-copy'
            },
            {
              name: '删除',
              power: 'contractInput:delete',
              on: () => {
                this.deleteData()
              },
              icon: 'icon-fabu-copy'
            }
          ]
        },
        {
          children: [
            {
              name: '还款',
              power: 'contractInput:revoke',
              on: () => {
                this.repayment()
              },
              icon: 'icon-daoru-copy'
            },
            {
              name: '导出',
              power: 'contractInput:revoke',
              on: () => {
                this.orgJump()
              },
              icon: 'icon-daoru-copy'
            }
          ]
        }
      ],
      columns: [
        {
          type: 'selection',
          single: true,
          fixed: 'left'
        },
        {
          label: '序号',
          index: true,
          fixed: 'left'
        },
        {
          label: '来源',
          prop: 'source',
          showTooltip: true,
          fixed: 'left'
        },
        {
          label: '发生日期',
          prop: 'dateOfOccurrence',
          showTooltip: true,
          sortable: 'custom',
          fixed: 'left',
          width: 100
        },
        {
          label: '款项类型',
          prop: 'paymentType',
          showTooltip: true,
          sortable: 'custom',
          fixed: 'left',
          width: 100
        },
        {
          label: '往来款对象',
          prop: 'currentPaymentObject',
          showTooltip: true,
          width: 100
        },
        {
          label: '金额',
          prop: 'amount',
          showTooltip: true,
          sortable: 'custom',
          align: 'right'
        },
        {
          label: '已归还金额',
          prop: 'returnedMoney',
          showTooltip: true,
          sortable: 'custom',
          align: 'right',
          width: 120
        },
        {
          label: '未归还金额',
          prop: 'noReturnMoney',
          showTooltip: true,
          sortable: 'custom',
          width: 120,
          align: 'right'
        },
        {
          label: '支付方式',
          prop: 'paymentMethod',
          showTooltip: true,
          sortable: 'custom',
          width: 100
        },
        {
          label: '支票号',
          prop: 'chequeNumber',
          showTooltip: true
        },
        {
          label: '支票银行名称',
          prop: 'chequeBankName',
          showTooltip: true,
          width: 100,
          align: 'right'
        },
        {
          label: '计息方式',
          prop: 'interestBearingMethod',
          showTooltip: true
        },
        {
          label: '利息总额',
          prop: 'interestTotal',
          showTooltip: true,
          sortable: 'custom',
          width: 100,
          align: 'right'
        },
        {
          label: '预计归还日期',
          prop: 'estimatedDate',
          showTooltip: true,
          sortable: 'custom',
          width: 130
        },
        {
          label: '备注',
          prop: 'remark',
          showTooltip: true
        },
        {
          label: '附件',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '录入人',
          prop: 'createUserName',
          showTooltip: true
        },
        {
          label: '录入时间',
          prop: 'createDate',
          showTooltip: true,
          sortable: 'custom',
          width: 100
        }
      ],
      tableOptions: {
        maxHeight: 'calc( 100% - 350px)'
      },
      tableData: [{ name: '增值税专用发票' }],
      total: 0,
      count: null
    }
  },
  methods: {
    orgJump(type) {
      const { onlyOneData, multipleSelection } = this.$refs.commTable
      switch (type) {
        case 'add':
          this.$emit('changeComName', 'CurrentPaymentAdd', 'add', '')
          break
        case 'edit':
          if (!onlyOneData()) return
          this.$emit('changeComName', 'CurrentPaymentAdd', 'edit', multipleSelection[0].id)
          break
        default:
          break
      }
    }
  }
}
