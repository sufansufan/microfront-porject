export default {
  data() {
    return {
      selectList: [
        {
          value: 'date1,date2',
          searchType: 'rangeDate',
          name: '项目年份'
        },
        {
          value: 'status',
          searchType: 'select',
          name: '工程状态',
          selectData: []
        },
        {
          value: 'isOpen',
          searchType: 'select',
          name: '是否结清',
          selectData: []
        },
        {
          value: 'name',
          searchType: 'input',
          name: '建设单位'
        },
        {
          value: 'status',
          searchType: 'input',
          name: '合同编号'
        },
        {
          value: 'status',
          searchType: 'select',
          name: '工程名称',
          selectData: []
        },
        {
          value: 'jianzaoshi',
          searchType: 'select',
          name: '建造师',
          selectData: []
        }
      ],
      btnList: [
        {
          children: [{
            name: '导出',
            power: 'contractInput:revoke',
            on: () => {
              this.handleInfor('revoke')
            },
            icon: 'icon-daoru-copy'
          }]
        }
      ],
      columns: [
        {
          label: '序号',
          index: true
        },
        {
          label: '合同编号',
          sortable: 'custom',
          width: '100',
          prop: 'name'
        },
        {
          label: '工程名称',
          prop: 'phone',
          showTooltip: true
        },
        {
          label: '归属单位',
          prop: 'state',
          render: (h, row) => {
            return h('span', {
            }, row.state === '0' ? '启用' : '停用')
          }
        },
        {
          label: '建设单位',
          prop: 'name'
        },
        {
          label: '工程状态',
          prop: 'operateDate',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.operateDate, 'y-m-d h:i:s'))
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
          label: '应收款额',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '已收款额',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '未收款额',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '质保金',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '质保期（月）',
          prop: 'last_login_date',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '质保到期日',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '120',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '保质/保函/押金',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '140',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '是否结清',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            return h('span', {
            }, row.state2 === '0' ? '是' : '否')
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
          state2: '2'
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
          state2: '2'
        }
      ]
    }
  },
  methods: {
    handleInfor(type) {
      const { onlyOneData } = this.$refs.commTable
      if (type === 'add') {
        this.$router.push({ name: 'BankAdd', query: { type: 'add' }})
      } else if (type === 'edit') {
        if (!onlyOneData()) return
        const { id } = this.$refs.commTable.multipleSelection[0]
        this.$router.push({ name: 'BankAdd', query: { type: 'edit', id: id }})
      } else {
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
      }
    }
  }
}
