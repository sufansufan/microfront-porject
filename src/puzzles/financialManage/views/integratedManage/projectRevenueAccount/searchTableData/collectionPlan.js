// 收款计划
export default {
  data() {
    return {
      selectList: [
        {
          value: 'name',
          searchType: 'pickerDate',
          name: '计划收款日期'
        },
        {
          value: 'type',
          searchType: 'select',
          name: '计划收款事项',
          selectData: []
        }

      ],
      btnList: [],
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
          label: '计划收款日期',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '实际收款日期',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '计划收款事项',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '计划收款比例',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '实际收款比例',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '计划收款金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          align: 'right'
        },
        {
          label: '实际收款金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          align: 'right'
        },
        {
          label: '备注',
          prop: 'name',
          showTooltip: true
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
    orgJump() {

    }
  }
}
