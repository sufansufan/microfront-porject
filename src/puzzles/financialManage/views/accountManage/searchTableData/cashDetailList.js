import {
  getCashDetai,
  deleteCashDetai,
  exportCashDetai
} from '@core/api/financialManage/capitalaccountmanager'
import { exportExcel } from '@core/utils'
export default {
  data() {
    return {
      optimisticLock: '',
      selectList: [
        {
          value: 'source',
          searchType: 'select',
          name: '来源',
          selectData: []
        },
        {
          value: 'financeClassIdArr',
          searchType: 'cascader',
          name: '财务类别',
          selectOption: {
            expandTrigger: 'hover',
            value: 'id',
            label: 'name',
            children: 'childrens'
          },
          selectData: []
        },
        {
          value: 'type',
          searchType: 'select',
          name: '明细类型',
          selectData: []
        },
        {
          value: 'dates',
          searchType: 'pickerDate',
          name: '发生日期'
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
            { name: '导出', power: 'processconfig:add', on: () => { this.handleInfor('export') }, icon: 'icon-daochu-copy' }
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
          label: '来源',
          prop: 'source',
          width: '130',
          render: (h, row) => {
            return h('span', {}, row.sourceName)
          }
        },
        {
          label: '财务类别',
          prop: 'financeClassName',
          width: '100',
          fixed: true
        },
        {
          label: '发生日期',
          prop: 'happenDate',
          sortable: 'custom',
          render: (h, row) => {
            return h('span', {}, row.happenDateStr)
          }
        },
        {
          label: '明细类型',
          prop: 'type',
          render: (h, row) => {
            return h('span', {}, row.typeName)
          }
        },
        {
          label: '单据号',
          prop: 'billNumber'
        },
        {
          label: '摘要',
          prop: 'summary'
        },
        {
          label: '收入金额',
          prop: 'imcomeMoney',
          sortable: 'custom'
          // render: (h, row) => {
          // return h('span', {}, row.typeName)
          // }
        },
        {
          label: '支出金额',
          prop: 'expendMoney',
          sortable: 'custom'
          // render: (h, row) => {
          // return h('span', {}, row.typeName)
          // }
        },
        {
          label: '余额',
          prop: 'balance',
          sortable: 'custom'
          // render: (h, row) => {
          // return h('span', {}, row.typeName)
          // }
        },
        {
          label: '备注',
          prop: 'remark',
          showTooltip: true
        },
        {
          label: '录入人',
          prop: 'createUserName',
          showTooltip: true
        },
        {
          label: '录入时间',
          prop: 'createDate',
          sortable: 'custom',
          width: '140',
          render: (h, row) => {
            return h('span', {}, row.createDateStr)
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleInfor(type) {
      const { onlyOneData } = this.$refs.commTable
      if (type === 'add') {
        this.dialogTitle = { title: '新增现金账户明细', type: 'add' }
        this.$refs.dialog.show = true
        if (this.$refs.ruleForm) this.$refs.ruleForm.resetFields()
      } else if (type === 'edit') {
        if (!onlyOneData()) return
        const { id } = this.$refs.commTable.multipleSelection[0]
        this.cashDetai(id)
        this.dialogTitle = { title: '修改银行账户明细', type: 'edit', id: id }
        this.$refs.dialog.show = true
        if (this.$refs.ruleForm) this.$refs.ruleForm.resetFields()
      } else if (type === 'delete') {
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
            deleteCashDetai(id).then(({ data }) => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.fetchData()
            })
          }).catch(_ => {})
      } else if (type === 'export') {
        const id = this.$route.query.id
        const { search, detailData } = this
        const datearr = search.dates || []
        const params = {
          happenDate: {
            after: datearr[0] || '',
            before: datearr[1] || ''
          },
          financeClassId: search.financeClassIdArr[search.financeClassIdArr.length - 1] || '',
          ...search
        }
        delete search.dates
        delete params.financeClassIdArr
        exportCashDetai(id, params).then((data) => {
          if (data) {
            exportExcel(data, `${detailData.name}_明细表.xls`)
          } else {
            this.$message.warning('当前导出内容')
          }
          this.$message({
            type: 'success',
            message: '导出成功'
          })
        })
      }
    },
    cashDetai(id) {
      getCashDetai(id).then(({ data }) => {
        this.ruleForm.type = data.type
        this.ruleForm.classIdArr = data.parentPath.split(',')
        this.ruleForm.happenDate = data.happenDate
        this.ruleForm.money = data.money
        this.ruleForm.summary = data.summary
        this.ruleForm.remark = data.remark
        this.optimisticLock = data.optimisticLock
      })
    }
  }
}
