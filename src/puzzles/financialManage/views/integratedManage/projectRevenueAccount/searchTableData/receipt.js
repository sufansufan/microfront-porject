// 收票明细
export default {
  data() {
    return {
      selectList: [
        {
          value: 'invoicingUnit',
          searchType: 'select',
          name: '开票单位',
          selectData: []
        },
        {
          value: 'billingDate',
          searchType: 'pickerDate',
          name: '开票日期'
        },
        {
          value: 'state',
          searchType: 'select',
          name: '状态',
          selectData: []
        },
        {
          value: 'invoiceNumber',
          searchType: 'input',
          name: '发票编号'
        },
        {
          value: 'invoiceType',
          searchType: 'select',
          name: '发票类型',
          selectData: []

        },
        {
          value: 'invoiceClassification',
          searchType: 'select',
          name: '发票归类',
          selectData: [],
          selectOption: { value: 'id', label: 'name' }
        },
        {
          value: 'invoiceAmount',
          searchType: 'select',
          name: '发票金额',
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
          label: '收票日期',
          prop: 'receiptDate',
          showTooltip: true,
          sortable: 'custom',
          fixed: 'left',
          width: 100
        },
        {
          label: '开票日期',
          prop: 'billingDate',
          showTooltip: true,
          sortable: 'custom',
          width: 100
        },

        {
          label: '发票编号',
          prop: 'invoiceNumber',
          showTooltip: true,
          sortable: 'custom',
          width: 100
        },
        {
          label: '发票类型',
          prop: 'invoiceType',
          showTooltip: true
        },
        {
          label: '发票归类',
          prop: 'invoiceClassification',
          showTooltip: true
        },
        {
          label: '发票金额',
          prop: 'invoiceAmount',
          showTooltip: true,
          sortable: 'custom',
          align: 'right',
          width: 100
        },
        {
          label: '发票税率',
          prop: 'invoiceTaxRate',
          showTooltip: true,
          sortable: 'custom',
          align: 'right',
          width: 100
        },
        {
          label: '发票无税金额',
          prop: 'noTaxAmountOnInvoice',
          showTooltip: true,
          sortable: 'custom',
          width: 130,
          align: 'right'
        },
        {
          label: '发票税金',
          prop: 'invoiceTax',
          showTooltip: true,
          align: 'right',
          sortable: 'custom',
          width: 100
        },
        {
          label: '发票付款金额',
          prop: 'invoicingPaymentMoney',
          showTooltip: true,
          sortable: 'custom',
          width: 130,
          align: 'right'
        },
        {
          label: '发票付款余额',
          prop: 'invoicingPaymentBalance',
          showTooltip: true,
          sortable: 'custom',
          width: 130,
          align: 'right'
        },
        {
          label: '是否认证',
          prop: 'certified',
          showTooltip: true,
          render: (h, row) => {
            return h(
              'span',
              row.certified === '01' ? '是' : '否'
            )
          }
        },
        {
          label: '是否进项转出',
          prop: 'inputTransfer',
          showTooltip: true,
          width: 100,
          render: (h, row) => {
            return h(
              'span',
              row.inputTransfer === '01' ? '是' : '否'
            )
          }
        },
        {
          label: '发票代码',
          prop: 'invoiceCode',
          showTooltip: true
        },
        {
          label: '销方纳税人识别号',
          prop: 'sellerTaxpayerNumber',
          showTooltip: true,
          width: 120
        },
        {
          label: '开票单位',
          prop: 'invoicingUnit',
          showTooltip: true
        },
        {
          label: '是否有合同',
          prop: 'haveContract',
          showTooltip: true,
          sortable: 'custom',
          width: 120,
          render: (h, row) => {
            return h(
              'span',
              row.haveContract === '01' ? '是' : '否'
            )
          }
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
          if ('taxCalculationMethod' in this.btnAttr) {
            if (this.btnAttr.taxCalculationMethod === '') {
              this.$message.warning('项目计税方式未配置,不允许录入开票明细')
              return
            } else {
              this.$emit('changeComName', 'InvoicingAdd', 'add', '')
            }
          } else {
            this.$message.warning('项目计税方式未配置,不允许录入开票明细')
            return
          }
          this.$emit('changeComName', 'ReceiptAdd', 'add')
          break
        case 'edit':
          if (!onlyOneData()) return
          this.$emit('changeComName', 'ReceiptAdd', 'edit', multipleSelection[0].id)
          break
        default:
          break
      }
    }
  }
}
