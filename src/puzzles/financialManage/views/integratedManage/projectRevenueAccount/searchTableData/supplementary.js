// 补充协议
export default {
  data() {
    return {
      selectList: [
        {
          value: 'name',
          searchType: 'pickerDate',
          name: '签订日期'
        },
        {
          value: 'type',
          searchType: 'select',
          name: '协议状态',
          selectData: []
        },
        {
          value: 'state',
          searchType: 'select',
          name: '协议名称',
          selectData: []
        }

      ],
      btnList: [
      ],
      columns: [

        {
          label: '序号',
          index: true
        },
        {
          label: '协议编号',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '协议状态',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '协议名称',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '协议金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          align: 'right'
        },
        {
          label: '建筑面积（㎡）',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '签订日期',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '归档日期',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '发起组织',
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
      count: null
    }
  },
  methods: {
    orgJump() {

    }
  }
}
