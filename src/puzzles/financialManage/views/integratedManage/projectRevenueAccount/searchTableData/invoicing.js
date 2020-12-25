// 开票明细
import { fileDetails } from '@core/utils/renderTable.js'
export default {
  data() {
    return {
      selectList: [
        {
          value: 'billingDate',
          searchType: 'pickerDate',
          name: '开票日期'
        },
        {
          value: 'source',
          searchType: 'select',
          name: '来源',
          selectData: []
        },
        {
          value: 'invoiceType',
          searchType: 'select',
          name: '发票类型',
          selectData: []
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
                this.audit('revokeAudit')
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
          render: (h, row) => {
            return h(
              'span',
              row.sourceName
            )
          },
          fixed: 'left'
        },
        {
          label: '开票日期',
          prop: 'billingDate',
          showTooltip: true,
          sortable: 'custom',
          fixed: 'left',
          width: 100
        },
        {
          label: '发票类型',
          prop: 'invoiceType',
          showTooltip: true,
          render: (h, row) => {
            return h(
              'span',
              row.invoiceTypeName
            )
          }
        },
        {
          label: '发票编号',
          prop: 'invoiceNumber',
          showTooltip: true,
          sortable: 'custom',
          width: 100
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
          prop: 'invoicingTaxRate',
          showTooltip: true,
          sortable: 'custom',
          align: 'right',
          render: (h, row) => {
            return h(
              'span',
              row.invoicingTaxRate + '%'
            )
          },
          width: 100
        },
        {
          label: '发票无税金额',
          prop: 'noTaxAmount',
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
          label: '发票收款金额',
          prop: 'amountReceived',
          showTooltip: true,
          sortable: 'custom',
          width: 130,
          align: 'right'
        },
        {
          label: '发票收款余额',
          prop: 'balanceReceived',
          showTooltip: true,
          sortable: 'custom',
          width: 130,
          align: 'right'
        },
        {
          label: '备注',
          prop: 'remark',
          showTooltip: true
        },
        {
          label: '附件',
          prop: 'name',
          showTooltip: true,
          render: (h, row) => {
            return h('el-popover', {
              attrs: {
                placement: 'bottom',
                trigger: 'click',
                width: '300'
              }
            }, fileDetails(h, row, 'invoicing', row.haveAttachment ? '查看' : ''))
          }
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
          fixed: 'right',
          render: (h, row) => {
            return h('span', {
              style: {
                'color': row.state === '02' ? '#fa5151' : '#03af1b'
              }
            }, row.stateName)
          }
        }
      ],
      tableOptions: {
        maxHeight: 'calc( 100% - 350px)',
        defaultSort: {
          prop: 'createDate',
          order: 'descending'
        }
      },
      tableData: [],
      total: 0,
      count: null,
      loading: false
    }
  },
  methods: {
    orgJump(type) {
      const { onlyOneData, multipleSelection } = this.$refs.commTable
      switch (type) {
        case 'add':
          console.log(this.btnAttr)
          if ('taxCalculationMethod' in this.btnAttr) {
            if (this.btnAttr.taxCalculationMethod === '') {
              this.$message.warning('当前项目未配置计税方式，不能进行开票操作！')
              return
            } else {
              this.$emit('changeComName', 'InvoicingAdd', 'add', '')
            }
          } else {
            this.$message.warning('当前项目未配置计税方式，不能进行开票操作！')
            return
          }
          break
        case 'edit':
          if (!onlyOneData()) return
          this.$emit('changeComName', 'InvoicingAdd', 'edit', multipleSelection[0].id)
          break

        default:
          break
      }
    }
  }
}
