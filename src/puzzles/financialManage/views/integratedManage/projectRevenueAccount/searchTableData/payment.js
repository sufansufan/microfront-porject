// 开票明细
export default {
  data() {
    return {
      selectList: [
        {
          value: 'paymentDate',
          searchType: 'pickerDate',
          name: '付款日期'
        },
        {
          value: 'source',
          searchType: 'select',
          name: '来源',
          selectData: []
        },
        {
          value: 'paymentType',
          searchType: 'select',
          name: '付款类型',
          selectData: []
        },
        {
          value: 'paymentClass',
          searchType: 'select',
          name: '付款类别',
          selectData: []
        },
        {
          value: 'state',
          searchType: 'select',
          name: '状态',
          selectData: []
        },
        {
          value: 'warranty',
          searchType: 'select',
          name: '是否保证金',
          selectData: []
        },
        {
          value: 'orgName',
          searchType: 'select',
          name: '收款单位',
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
                this.audit()
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
                this.orgJump()
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
          label: '付款日期',
          prop: 'paymentDate',
          showTooltip: true,
          sortable: 'custom',
          fixed: 'left',
          width: 100
        },
        {
          label: '付款类型',
          prop: 'paymentType',
          showTooltip: true
        },
        {
          label: '付款类别',
          prop: 'paymentClass',
          showTooltip: true
        },
        {
          label: '付款金额',
          prop: 'paymentMoney',
          showTooltip: true,
          sortable: 'custom',
          align: 'right',
          width: 100
        },
        {
          label: '未收票已付款金额',
          prop: 'paymentNoReceipt',
          showTooltip: true,
          sortable: 'custom',
          align: 'right',
          width: 150
        },
        {
          label: '对应发票',
          prop: 'receiptDetailSimpleDtos',
          showTooltip: true,
          align: 'left'
        },
        {
          label: '是否保证金',
          prop: 'warranty',
          showTooltip: true,
          width: 100
        },
        {
          label: '付款方式',
          prop: 'paymentMethod',
          showTooltip: true
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
          label: '付款账户类型',
          prop: 'paymentAccountType',
          showTooltip: true,
          sortable: 'custom',
          width: 130
        },
        {
          label: '付款账户',
          prop: 'paymentAccountId',
          showTooltip: true
        },
        {
          label: '收款单位',
          prop: 'orgId',
          showTooltip: true
        },
        {
          label: '收款人',
          prop: 'paypee',
          showTooltip: true
        },
        {
          label: '是否有合同',
          prop: 'haveContract',
          showTooltip: true,
          width: 100
        },
        {
          label: '合同编号',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '合同名称',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '合同金额',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '结算金额',
          prop: 'name',
          showTooltip: true
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
      count: null
    }
  },
  methods: {
    orgJump(type) {
      const { onlyOneData, multipleSelection } = this.$refs.commTable
      switch (type) {
        case 'add':
          this.$emit('changeComName', 'PaymentAdd', 'add', '')
          break
        case 'edit':
          if (!onlyOneData()) return
          this.$emit('changeComName', 'PaymentAdd', 'edit', multipleSelection[0].id)
          break
        default:
          break
      }
    }
  }
}
