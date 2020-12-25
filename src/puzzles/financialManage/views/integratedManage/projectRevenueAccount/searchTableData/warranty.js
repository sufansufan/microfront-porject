// 质保押金
export default {
  data() {
    return {
      selectList: [
        {
          value: 'operationDate',
          searchType: 'pickerDate',
          name: '操作日期'
        },
        {
          value: 'operationType',
          searchType: 'select',
          name: '操作类型',
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
                this.audit()
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
          single: true
        },
        {
          label: '序号',
          index: true
        },
        {
          label: '操作日期',
          prop: 'operationDate',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '操作类型',
          prop: 'operationType',
          showTooltip: true
        },
        {
          label: '金额',
          prop: 'amount',
          showTooltip: true,
          sortable: 'custom',
          align: 'right'
        },
        {
          label: '负责人',
          prop: 'chargePersonName',
          showTooltip: true
        },
        {
          label: '支付方式',
          prop: 'operatingMethod',
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
          width: 130
        },
        {
          label: '操作账户类型',
          prop: 'operatingAccountType',
          showTooltip: true,
          sortable: 'custom',
          width: 120
        },
        {
          label: '操作账户',
          prop: 'paymentAccountName',
          showTooltip: true,
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
          prop: 'chargePersonName',
          showTooltip: true
        },
        {
          label: '录入时间',
          prop: 'createDate',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '状态',
          prop: 'state',
          showTooltip: true,
          sortable: 'custom'
        }
      ],
      tableOptions: {
        maxHeight: 'calc( 100% - 350px)'
      },
      tableData: [],
      total: 0,
      count: null
    }
  },
  methods: {
    orgJump(type) {
      const { onlyOneData, multipleSelection } = this.$refs.commTable
      switch (type) {
        case 'add':
          this.$emit('changeComName', 'WarrantyAdd', 'add', '')
          break
        case 'edit':
          if (!onlyOneData()) return
          this.$emit('changeComName', 'WarrantyAdd', 'edit', multipleSelection[0].id)
          break
        default:
          break
      }
    }
  }
}
