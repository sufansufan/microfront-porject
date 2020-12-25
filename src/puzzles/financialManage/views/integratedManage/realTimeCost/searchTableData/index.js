export default {
  data() {
    return {
      selectList: [
        {
          value: 'name',
          searchType: 'select',
          name: '项目年份',
          selectData: []
        },
        {
          value: 'type',
          searchType: 'input',
          name: '工程状态'
        },
        {
          value: 'state',
          searchType: 'select',
          name: '建造师',
          selectData: []
        },
        {
          value: 'state',
          searchType: 'select',
          name: '建设单位',
          selectData: []
        },
        {
          value: 'state',
          searchType: 'select',
          name: '合同编号',
          selectData: []
        },
        {
          value: 'state',
          searchType: 'select',
          name: '工程名称',
          selectData: []
        }
      ],
      btnList: [
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
          label: '序号',
          index: true,
          fixed: 'left'
        },
        {
          label: '合同编号',
          prop: 'name',
          showTooltip: true,
          fixed: 'left',
          sortable: 'custom',
          width: 100
        },
        {
          label: '工程名称',
          prop: 'name',
          showTooltip: true,
          align: 'left',
          fixed: 'left',
          sortable: 'custom',
          width: 100,
          render: (h, row) => {
            return h(
              'span',
              {
                class: {
                  'table-click-color': true
                },
                on: {
                  click: () => {
                    this.clickName(row)
                  }
                }
              },
              row.name
            )
          }
        },
        {
          label: '项目归属',
          prop: 'name',
          showTooltip: true,
          fixed: 'left',
          sortable: 'custom',
          width: 100

        },
        {
          label: '建设单位',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          align: 'left',
          width: 100
        },
        {
          label: '工程建造师',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 120
        },
        {
          label: '合同金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 100
        },
        {
          label: '结算金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 100
        },
        {
          label: '当前成本总计',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 140
        },
        {
          label: '材料费',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 100
        },
        {
          label: '设备费',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 100
        },
        {
          label: '人工费',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 100
        },
        {
          label: '机械使用费',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 120
        },
        {
          label: '分包直接费',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 120
        },
        {
          label: '现场管理费（管理人员工资）',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 220
        },
        {
          label: '现场管理费(其它)',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 150
        },
        {
          label: '企业管理费',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 120
        },
        {
          label: '配合费用',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 100
        },
        {
          label: '营销费用',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 100
        },
        {
          label: '保险费用',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 100
        },
        {
          label: '税金及附加',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 120
        },
        {
          label: '其它费用',
          prop: 'name',
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
      count: 1
    }
  },
  methods: {
    orgJump() {

    },
    clickName(row) {
      this.$router.push({ name: 'realDetailsView' })
    }
  }
}
