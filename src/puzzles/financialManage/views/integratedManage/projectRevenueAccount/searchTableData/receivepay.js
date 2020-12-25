// 收款明细
export default {
  data() {
    return {
      selectList: [
        {
          value: 'paymentDate',
          searchType: 'pickerDate',
          name: '收款日期'
        },
        {
          value: 'source',
          searchType: 'select',
          name: '来源',
          selectData: []
        },
        {
          value: 'collectionType',
          searchType: 'select',
          name: '收款类型',
          selectData: []
        },
        {
          value: 'collectionCategory',
          searchType: 'select',
          name: '收款类别',
          selectData: []
        },
        {
          value: 'state',
          searchType: 'select',
          name: '状态',
          selectData: []
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
              name: '审核',
              power: 'contractInput:revoke',
              on: () => {
                this.audit('audit')
              },
              icon: 'icon-daoru-copy'
            },
            {
              name: '撤销审核',
              power: 'contractInput:revoke',
              on: () => {
                this.audit('cancelAudit')
              },
              icon: 'icon-daoru-copy'
            }

          ]
        },
        {
          children: [
            {
              name: '关联发票',
              power: 'contractInput:revoke',
              on: () => {
                this.orgJump('related')
              },
              icon: 'icon-daoru-copy'
            }
          ]
        },
        {
          children: [
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
          label: '收款日期',
          prop: 'paymentDate',
          showTooltip: true,
          sortable: 'custom',
          fixed: 'left',
          width: 100
        },
        {
          label: '收款类型',
          prop: 'collectionType',
          showTooltip: true
        },
        {
          label: '收款类别',
          prop: 'collectionCategory',
          showTooltip: true,
          align: 'right'
        },
        {
          label: '收款金额',
          prop: 'amountReceived',
          showTooltip: true,
          sortable: 'custom',
          align: 'right',
          width: 100
        },
        {
          label: '收款未开票金额',
          prop: 'receivedNotBidAmount',
          showTooltip: true,
          sortable: 'custom',
          align: 'right',
          width: 140
        },
        {
          label: '收款方式',
          prop: 'paymentMethod'
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
          width: 100
        },
        {
          label: '收款账户类型',
          prop: 'receivingAccountType',
          showTooltip: true,
          sortable: 'custom',
          width: 130
        },
        {
          label: '收款账户',
          prop: 'receivingAccountId',
          showTooltip: true
        },
        {
          label: '对应发票',
          prop: 'name',
          showTooltip: true,
          align: 'left'
        },
        {
          label: '收款计划',
          prop: 'collectionPlan',
          showTooltip: true
        },
        {
          label: '收款人',
          prop: 'payee',
          showTooltip: true
        },
        {
          label: '摘要',
          prop: 'summary',
          showTooltip: true
        },
        {
          label: '备注',
          prop: 'remark',
          showTooltip: true
        },
        {
          label: '录入人',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '录入时间',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 100
        },
        {
          label: '状态',
          prop: 'state',
          showTooltip: true,
          sortable: 'custom',
          fixed: 'right'
        }
      ],
      tableOptions: {
        maxHeight: 'calc( 100% - 350px)'
      },
      tableData: [{ name: '增值税专用发票' }],
      total: 0,
      count: 1
    }
  },
  methods: {
    orgJump(type) {
      const { onlyOneData, multipleSelection } = this.$refs.commTable
      switch (type) {
        case 'add':
          this.$emit('changeComName', 'ReceivePayAdd', 'add', '')
          break
        case 'edit':
          if (!onlyOneData()) return
          this.$emit('changeComName', 'ReceivePayAdd', 'edit', multipleSelection[0].id)
          break
        case 'related':
          if (!onlyOneData()) return
          this.$emit('changeComName', 'ReceivePayAdd', 'related', multipleSelection[0].id)
          break
        default:
          break
      }
    }
  }
}
