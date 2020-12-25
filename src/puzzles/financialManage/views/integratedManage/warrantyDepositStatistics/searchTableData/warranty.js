export default {
  data() {
    return {
      selectList: [
        {
          value: 'phone',
          searchType: 'select',
          name: '工程名称',
          selectData: []
        },
        {
          value: 'name',
          searchType: 'input',
          name: '合同编号'
        },
        {
          value: 'status',
          searchType: 'input',
          name: '建设单位'
        },
        {
          value: 'phone',
          searchType: 'select',
          name: '工程状态',
          selectData: []
        },
        {
          value: 'phone',
          searchType: 'select',
          name: '状态',
          selectData: []
        },
        {
          value: 'newTime',
          searchType: 'pickerDate',
          name: '质保到期日'
        },
        {
          value: 'phone',
          searchType: 'select',
          name: '质保方式',
          selectData: []
        },
        {
          value: 'date1,date2',
          searchType: 'rangeInput',
          name: '交甲方质保金'
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
          index: true,
          sortable: 'custom'

        },
        {
          label: '状态',
          prop: 'name',
          render: (h, row) => {
            return h(
              'span',
              {
                style: this.filterColor(row.state)
                // style: { 'color': 'red' }
              },
              this.filterStatus(row.state)
            )
          },
          sortable: 'custom'
        },
        {
          label: '合同编号',
          prop: 'phone',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            return h('span', {
            }, row.phone)
          }
        },
        {
          label: '工程名称',
          prop: 'state',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            return h('span', {
            }, row.state)
          }
        },
        { label: '归属单位', prop: 'name' },
        {
          label: '工程状态',
          prop: 'operateDate',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.operateDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '建设单位',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '合同金额',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '结算金额',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '质保方式',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '质保金到期日',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '130',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '交甲方质保金',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '130',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '甲方回质保金',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '130',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '收项目质保金',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '130',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '退项目质保金',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '130',
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
        this.$router.push({ name: 'bankAdd', query: { type: 'add' }})
      } else
      if (type === 'edit') {
        if (!onlyOneData()) return

        const { id } = this.$refs.commTable.multipleSelection[0]
        this.$router.push({ name: 'bankAdd', query: { type: 'edit', id: id }})
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
        this.$router.push({ name: 'bankTransfer', query: { type: 'edit', id: id }})
      }
    },
    filterStatus(status) {
      if (status === '1') {
        return '未缴纳'
      } else if (status === '2') {
        return '已缴纳'
      } else if (status === '3') {
        return '未返还'
      }
    },
    filterColor(status) {
      if (status === '1') {
        return { 'color': '#03af1b' } // 已缴纳：
      } else if (status === '2') {
        return { 'color': '#fa5151' } // 未返回：
      } else if (status === '3') {
        return { 'color': '#999999' } // 未缴纳：
      }
    }
  }
}
