// 开票明细
export default {
  data() {
    return {
      selectList: [],
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
                this.orgJump('delete')
              },
              icon: 'icon-fabu-copy'
            }
          ]
        },
        {
          children: [
            {
              name: '审阅',
              power: 'contractInput:revoke',
              on: () => {
                this.orgJump()
              },
              icon: 'icon-daoru-copy'
            },
            {
              name: '撤销审阅',
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
          label: '收付款类型',
          prop: 'name',
          showTooltip: true,
          align: 'left',
          sortable: 'custom'
        },
        {
          label: '收付款方式',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '支票号',
          prop: 'name',
          showTooltip: true

        },
        {
          label: '支票银行名称',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '收付款账户类型',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '收付款账户',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          align: 'right'
        },
        {
          label: '收付款日期',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '备注',
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
          sortable: 'custom'
        },
        {
          label: '状态',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
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
      switch (type) {
        case 'add':
          this.$emit('changeComName', 'ReceivePaymentAdd')
          break
        case 'edit':

          break
        default:
          break
      }
    }
  }
}
