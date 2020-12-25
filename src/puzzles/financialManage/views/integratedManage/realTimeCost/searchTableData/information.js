export default {
  data() {
    return {
      selectList: [
        {
          value: 'name',
          searchType: 'select',
          name: '工程合同金额',
          selectData: []
        },
        {
          value: 'type',
          searchType: 'input',
          name: '工程结算金额'
        },
        {
          value: 'state',
          searchType: 'select',
          name: '当前成本总计',
          selectData: []
        }
      ],
      btnList: [],
      columns: [
        {
          label: '各项成本概览',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '合同总额',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '结算总额',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '付款总额',
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
          label: '未付总额',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '收票总额',
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
          label: '收票未付总额',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '未收票已付款总额',
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

    clickName(row) {
      this.$router.push({ name: 'realDetailsView' })
    }
  }
}
