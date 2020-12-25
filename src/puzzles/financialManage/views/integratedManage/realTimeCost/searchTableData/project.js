// 补充协议
export default {
  data() {
    return {

      selectList: [
        {
          value: 'name',
          searchType: 'pickerDate',
          name: '保险人'
        },
        {
          value: 'type',
          searchType: 'select',
          name: '合同编号',
          selectData: []
        },

        {
          value: 'state',
          searchType: 'select',
          name: '合同金额',
          selectData: []
        }

      ],
      btnList: [],
      columns: [
        {
          label: '序号',
          index: true
        },
        {
          label: '合同编号',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '合同状态',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '合同名称',
          prop: 'name',
          showTooltip: true,
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
          label: '保险人',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          align: 'right'
        },
        {
          label: '保险有效期',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '签订日期',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '合同金额（保费）',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '保险金（万元）',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '付款金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '未付金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '收票金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '收票未付金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '未收票已付款金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 160
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
    clickName(row) {
      this.$emit('changeComName', 'SupplementaryDetails')
    }
  }
}
