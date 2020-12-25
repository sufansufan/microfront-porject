import { deleteBankaccount, stopBkaccount, recoverBkaccount } from '@core/api/financialManage/capitalaccountmanager'
export default {
  data() {
    return {
      selectList: [
        {
          value: 'bankName',
          searchType: 'input',
          name: '银行(开户行名称)'
        },
        {
          value: 'bankNumber',
          searchType: 'input',
          name: '银行账号'
        },
        {
          value: 'chargePersonName',
          searchType: 'input',
          name: '负责人'
        }
      ],
      btnList: [
        {
          children: [
            { name: '新增', power: 'processconfig:add', on: () => { this.handleInfor('add') }, icon: 'icon-xinzeng1-copy' },
            { name: '修改', power: 'processconfig:edit', on: () => { this.handleInfor('edit') }, icon: 'icon-xiugai-copy' },
            { name: '删除', power: 'processconfig:delete', on: () => { this.handleInfor('delete') }, icon: 'icon-icon7-copy' }
          ]
        },
        {
          children: [
            { name: '停用', power: 'processconfig:add', on: () => { this.handleInfor('stop') }, icon: 'icon-tingyong-copy' },
            { name: '恢复', power: 'processconfig:add', on: () => { this.handleInfor('reset') }, icon: 'icon-huifu' },
            { name: '转账', power: 'processconfig:add', on: () => { this.handleInfor('settle') }, icon: 'icon-zhuanzhang' }
          ]
        }
      ],
      columns: [
        {
          type: 'selection',
          single: true,
          fixed: true
        },
        {
          label: '序号',
          index: true,
          fixed: true
        },
        {
          label: '银行(开户行名称)',
          showTooltip: true,
          prop: 'bankName',
          fixed: true,
          width: '130'
        },
        {
          label: '银行编号',
          prop: 'bankNumber',
          sortable: 'custom',
          showTooltip: true,
          width: '100',
          fixed: true,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.$router.push({ name: 'bankDetail', query: { id: row.id }})
                }
              }
            }, row.bankNumber)
          }
        },
        {
          label: '账户类型',
          prop: 'accountType',
          showTooltip: true,
          render: (h, row) => {
            return h('span', {
            }, row.accountName)
          }
        },
        {
          label: '归属单位',
          prop: 'organizationName',
          showTooltip: true,
          sortable: 'custom',
          width: '100'
        },
        {
          label: '开户行地址',
          prop: 'bankAddress',
          showTooltip: true,
          width: '100'
        },
        {
          label: '开户日期',
          prop: 'openAccountDate',
          sortable: 'custom',
          width: '120',
          render: (h, row) => {
            return h('span', {}, row.openDate)
          }
        },
        {
          label: '当前余额',
          prop: 'currentBalance',
          sortable: 'custom',
          width: '100'
          // render: (h, row) => {
          //   // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          // }
        },
        {
          label: '可用余额',
          prop: 'availableBalance',
          sortable: 'custom',
          width: '100'
          // render: (h, row) => {
          //   // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          // }
        },
        {
          label: '账上余额',
          prop: 'accounBalance',
          sortable: 'custom',
          width: '100'
          // render: (h, row) => {
          //   // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          // }
        },
        {
          label: '支出合计',
          prop: 'expendTotal',
          sortable: 'custom',
          width: '100'
          // render: (h, row) => {
          //   // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          // }
        },
        {
          label: '收入合计',
          prop: 'incomeTotal',
          sortable: 'custom',
          width: '100'
          // render: (h, row) => {
          //   // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          // }
        },
        {
          label: '支出延期',
          prop: 'expendDelay',
          sortable: 'custom',
          width: '100'
          // render: (h, row) => {
          //   // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          // }
        },
        {
          label: '收款未到',
          prop: 'collectionNotReceived',
          sortable: 'custom',
          width: '100'
          // render: (h, row) => {
          //   // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          // }
        },
        {
          label: '备注',
          showTooltip: true,
          prop: 'remark'
        },
        {
          label: '负责人',
          showTooltip: true,
          prop: 'chargePersonName'
        },
        {
          label: '最后一次操作时间',
          prop: 'lastOperateDate',
          sortable: 'custom',
          width: '150',
          fixed: 'right',
          render: (h, row) => {
            return h('span', {}, row.lastDate, 'y-m-d h:i:s')
          }
        },
        {
          label: '状态',
          prop: 'state',
          fixed: 'right',
          sortable: 'custom',
          render: (h, row) => {
            return h('span', {}, row.stateName)
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
            deleteBankaccount(id).then(({ data }) => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.fetchData()
            })
          }).catch(_ => {})
      } else
      if (type === 'stop') {
        if (!onlyOneData()) return

        const { id, state } = this.$refs.commTable.multipleSelection[0]
        if (state === '01') {
          stopBkaccount(id).then(({ data }) => {
            this.$message.success('停用成功')
            this.fetchData()
          })
        } else
        if (state === '02') {
          this.$message.warning('用户只能停用状态为“正常”的记录')
        }
      } else
      if (type === 'reset') {
        if (!onlyOneData()) return

        const { id, state } = this.$refs.commTable.multipleSelection[0]
        if (state === '02') {
          recoverBkaccount(id).then(({ data }) => {
            this.$message.success('恢复成功')
            this.fetchData()
          })
        } else
        if (state === '01') {
          this.$message.warning('用户只能恢复状态为“停用”的记录')
        }
      } else
      if (type === 'settle') {
        if (!onlyOneData()) return

        const { id, state } = this.$refs.commTable.multipleSelection[0]
        if (state === '02') {
          this.$message.warning('只能选择状态为“正常”的账户进行转账')
        } else
        if (state === '01') {
          this.$router.push({ name: 'bankTransfer', query: { type: 'edit', id: id }})
        }
      }
    }
  }
}
