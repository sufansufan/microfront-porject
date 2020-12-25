export default {
  data() {
    return {
      selectList: [
        {
          value: 'name',
          searchType: 'input',
          name: '发票编号'
        },
        {
          value: 'phone',
          searchType: 'select',
          name: '发票类型',
          selectData: []
        },
        {
          value: 'newTime',
          searchType: 'pickerDate',
          name: '开票期日'
        },
        {
          value: 'phone',
          searchType: 'select',
          name: '发票归类',
          selectData: []
        },
        {
          value: 'phone',
          searchType: 'select',
          name: '付款情况',
          selectData: []
        },
        {
          value: 'status',
          searchType: 'input',
          name: '合同编号(子)'
        },
        {
          value: 'status',
          searchType: 'input',
          name: '合同名称'
        },
        {
          value: 'phone',
          searchType: 'select',
          name: '工程状态',
          selectData: []
        },
        {
          value: 'status',
          searchType: 'input',
          name: '工程名称'
        },
        {
          value: 'status',
          searchType: 'input',
          name: '合同编号'
        },
        {
          value: 'phone',
          searchType: 'select',
          name: '状态',
          selectData: []
        }
      ],
      btnList: [
        {
          children: [
            { name: '导出', power: 'processconfig:add', on: () => { this.handleInfor('export') }, icon: 'icon-daochu-copy' }
          ]
        }
      ],
      columns: [
        {
          label: '序号',
          index: true
        },
        {
          label: '收款情况',
          prop: 'name',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            return h(
              'span',
              {
                style: this.filterColor(row.state)
              },
              this.filterStatus(row.state)
            )
          }
        },
        {
          label: '发票编号',
          width: '100',
          prop: 'phone',
          sortable: 'custom',
          render: (h, row) => {
            return h('span', {
            }, row.phone)
          }
        },
        {
          label: '收票日期',
          prop: 'state',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            return h('span', {
            }, row.state)
          }
        },
        {
          label: '开票日期',
          prop: 'state',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            return h('span', {
            }, row.state)
          }
        },
        {
          label: '发票类型',
          sortable: 'custom',
          width: '100',
          prop: 'name'
        },
        {
          label: '发票归类',
          sortable: 'custom',
          width: '100',
          prop: 'name'
        },
        {
          label: '发票金额',
          width: '100',
          prop: 'operateDate',
          sortable: 'custom',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.operateDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '发票税率',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '发票税金',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '发票无税金额',
          prop: 'last_login_date',
          width: '130',
          sortable: 'custom',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '发票付款金额',
          prop: 'last_login_date',
          width: '130',
          sortable: 'custom',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '发票付款余额',
          prop: 'last_login_date',
          width: '130',
          sortable: 'custom',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '合同编号(内)',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '130',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '合同名称',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '合同编号',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '归属单位',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '工程状态',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '开票单位',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '备注',
          prop: 'last_login_date',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '录入人',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '录入时间',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '130',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '状态',
          prop: 'last_login_date',
          sortable: 'custom',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        }
      ],
      tableData: [
        {
          id: '1',
          phone: '16611111111',
          nickname: null,
          functionType: null,
          useType: false,
          createDate: 1602560641000,
          createUserId: null,
          createUserName: '超级管理员',
          state: '2'
        },
        {
          id: '2',
          phone: '16611111111',
          nickname: null,
          functionType: null,
          useType: false,
          createDate: 1602560641000,
          createUserId: null,
          createUserName: '超级管理员',
          state: '1'
        },
        {
          id: '2',
          phone: '16611111111',
          nickname: null,
          functionType: null,
          useType: false,
          createDate: 1602560641000,
          createUserId: null,
          createUserName: '超级管理员',
          state: '3'
        }
      ]
    }
  },
  methods: {
    handleInfor(type) {
      const { onlyOneData } = this.$refs.commTable

      if (type === 'add') {
        this.$router.push({
          name: 'bankAdd',
          query: { type: 'add' }
        })
      } else
      if (type === 'edit') {
        if (!onlyOneData()) return

        const { id } = this.$refs.commTable.multipleSelection[0]
        this.$router.push({
          name: 'bankAdd',
          query: { type: 'edit', id: id }
        })
      } else
      if (type === 'delete') {
        if (!onlyOneData()) return

        const { id } = this.$refs.commTable.multipleSelection[0]
        this.$confirm(
          '确定要删除该操作用户吗？',
          '提示',
          {
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          .then(_ => {
            // this.setDeletUseInfor(id)
            console.log('删除条id' + id)
          }).catch(_ => {})
      } else
      if (type === 'reset') {
        if (!onlyOneData()) return

        const { id } = this.$refs.commTable.multipleSelection[0]
        this.$confirm(
          '确定要恢复该操作用户吗？',
          '提示',
          {
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          .then(_ => {
            // this.setDeletUseInfor(id)
            console.log('删除条id' + id)
          }).catch(_ => {})
      } else
      if (type === 'settle') {
        if (!onlyOneData()) return

        const { id } = this.$refs.commTable.multipleSelection[0]
        this.$router.push({
          name: 'bankTransfer',
          query: { type: 'edit', id: id }
        })
      }
    },
    filterStatus(status) {
      if (status === '1') {
        return '已收款'
      } else if (status === '2') {
        return '未收款'
      } else if (status === '3') {
        return '已完成'
      }
    },
    filterColor(status) {
      if (status === '1') {
        return { 'color': '#03af1b' } // 已收款
      } else if (status === '2') {
        return { 'color': '#fa5151' } // 未收款
      } else if (status === '3') {
        return { 'color': '#999999' } // 已完成
      }
    }
  }
}
