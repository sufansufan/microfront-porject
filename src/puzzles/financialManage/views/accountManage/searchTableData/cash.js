import { deleteCash, stopCash, recoverCash } from '@core/api/financialManage/capitalaccountmanager'
export default {
  data() {
    return {
      tableData: [],
      selectList: [
        {
          value: 'name',
          searchType: 'input',
          name: '账户名称'
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
        { type: 'selection', single: true },
        { label: '序号', index: true },
        {
          label: '账户名称',
          prop: 'name',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.$router.push({ name: 'cashDetail', query: { id: row.id }})
                }
              }
            }, row.name)
          }
        },
        {
          label: '归属单位',
          prop: 'organizationName',
          sortable: 'custom'
        },
        {
          label: '开户日期',
          sortable: 'custom',
          prop: 'createDate',
          render: (h, row) => {
            return h('span', {
            }, row.createDatestr)
          }
        },
        {
          label: '当前余额',
          sortable: 'custom',
          prop: 'currentBalance'
          // render: (h, row) => {
          //   // return h('span', {}, parseTime(row.operateDate, 'y-m-d h:i:s'))
          // }
        },
        {
          label: '支出合计',
          prop: 'expendTotal',
          sortable: 'custom'
          // render: (h, row) => {
          //   // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          // }
        },
        {
          label: '收入合计',
          sortable: 'custom',
          prop: 'incomeTotal'
          // render: (h, row) => {
          //   // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          // }
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '负责人',
          prop: 'chargePersonName'
        },
        {
          label: '最后一次操作时间',
          prop: 'lastOperateDate',
          sortable: 'custom',
          render: (h, row) => {
            return h('span', {}, row.lastDate)
          }
        },
        {
          label: '状态',
          sortable: 'custom',
          prop: 'state',
          render: (h, row) => {
            return h('span', {
            }, row.stateName)
          }
        }
      ]
    }
  },
  methods: {
    handleInfor(type) {
      const { onlyOneData } = this.$refs.commTable

      if (type === 'add') {
        this.$router.push({
          name: 'cashAdd',
          query: { type: 'add' }
        })
      } else
      if (type === 'edit') {
        if (!onlyOneData()) return

        const { id } = this.$refs.commTable.multipleSelection[0]
        this.$router.push({
          name: 'cashAdd',
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
            deleteCash(id).then(({ data }) => {
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
          stopCash(id).then(({ data }) => {
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
          recoverCash(id).then(({ data }) => {
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
