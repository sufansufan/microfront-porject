
import {
  bankDetailed,
  bankdetailDeleta,
  bankdetailSettlement,
  bankdetailCancelSettlement,
  transformExpenditure,
  exportBankdetail
} from '@core/api/financialManage/capitalaccountmanager'
import { exportExcel } from '@core/utils'
export default {
  data() {
    return {
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
          value: 'settlementType',
          searchType: 'select',
          name: '结算状态',
          selectData: []
        },
        {
          value: 'payType',
          searchType: 'select',
          name: '支付方式',
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
            { name: '结算', power: 'processconfig:add', on: () => { this.handleInfor('settle') }, icon: 'icon-jiesuan' },
            { name: '撤销结算', power: 'processconfig:add', on: () => { this.handleInfor('reset') }, icon: 'icon-chexiao' },
            { name: '延期转支出', power: 'processconfig:add', on: () => { this.handleInfor('change') }, icon: 'icon-yanqizhuanzhichu' }
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
          fixed: true,
          width: '130',
          render: (h, row) => {
            return h('span', {}, row.sourceName)
          }

        },
        {
          label: '财务类别',
          prop: 'financeClassName',
          fixed: true
        },
        {
          label: '发生日期',
          prop: 'happenDate',
          sortable: 'custom',
          width: '120',
          fixed: true,
          render: (h, row) => {
            return h('span', {}, row.happenDateStr)
          }

        },
        {
          label: '明细类型',
          width: '100',
          prop: 'type',
          render: (h, row) => {
            return h('span', {}, row.typeName)
          }
        },
        {
          label: '单据号',
          prop: 'billNumber',
          showTooltip: true
        },
        {
          label: '摘要',
          prop: 'summary'
        },
        {
          label: '收入金额',
          prop: 'imcomeMoney',
          sortable: 'custom',
          width: '100'
          // render: (h, row) => {
          //   // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          // }
        },
        {
          label: '支出金额',
          prop: 'expendMoney',
          sortable: 'custom',
          width: '100'
          // render: (h, row) => {
          //   // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          // }
        },
        {
          label: '支付方式',
          prop: 'payType',
          render: (h, row) => {
            return h('span', {}, row.PayTypeName)
          }
        },
        {
          label: '支票号',
          prop: 'checkNumber'
        },
        {
          label: '支票银行名',
          prop: 'checkBankName',
          width: '100'
        },
        {
          label: '备注',
          prop: 'remark',
          showTooltip: true
        },
        {
          label: '录入人',
          prop: 'createUserName'
        },
        {
          label: '录入时间',
          sortable: 'custom',
          prop: 'createDate',
          width: '160',
          fixed: 'right',
          render: (h, row) => {
            return h('span', {}, row.createDateStr)
          }
        },
        {
          label: '结算标识',
          prop: 'settlementType',
          sortable: 'custom',
          width: '100',
          fixed: 'right',
          render: (h, row) => {
            return h('span', {}, row.settlementName)
          }
        }
      ],
      optimisticLock: Number,
      dialogTitle: {},
      tableData: []
    }
  },
  methods: {
    handleInfor(type) {
      const { onlyOneData } = this.$refs.commTable
      if (type === 'add') {
        this.dialogTitle = { title: '修改银行账户明细', type: 'add' }
        this.$refs.dialog.show = true
        if (this.$refs.ruleForm) this.$refs.ruleForm.resetFields()
      } else
      if (type === 'edit') {
        if (!onlyOneData()) return
        const { id } = this.$refs.commTable.multipleSelection[0]
        this.dialogTitle = { title: '修改银行账户明细', type: 'edit', id: id }
        this.$refs.dialog.show = true
        this.getBankDetailed(id)
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
            console.log('删除条id' + id)
            bankdetailDeleta(id).then(({ data }) => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.fetchData()
            })
          }).catch(_ => {})
      } else if (type === 'settle') {
        if (!onlyOneData()) return

        const { id, settlementType, type } = this.$refs.commTable.multipleSelection[0]
        this.$confirm(
          '确认结算选中的明细记录？',
          '提示',
          {
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          .then(_ => {
            if (settlementType === '01' && type !== '02') {
              bankdetailSettlement(id).then(({ data }) => {
                this.$message({
                  type: 'success',
                  message: '结算成功'
                })
                this.fetchData()
              })
            } else {
              this.$message.warning('用户只能结算状态为“未结算”的且明细类型为非“延期转支出”的明细流水记录')
            }
          }).catch(_ => {})
      } else if (type === 'reset') {
        if (!onlyOneData()) return

        const { id, settlementType } = this.$refs.commTable.multipleSelection[0]
        this.$confirm(
          '确认撤销结算选中的明细记录?',
          '提示',
          {
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          .then(_ => {
            if (settlementType === '02') {
              bankdetailCancelSettlement(id).then(({ data }) => {
                this.$message({
                  type: 'success',
                  message: '撤销结算成功'
                })
                this.fetchData()
              })
            } else {
              this.$message.warning('用户只能撤销手工录入且结算状态为“已结算”的明细流水记录')
            }
          }).catch(_ => {})
      } else if (type === 'change') {
        if (!onlyOneData()) return

        const { id, type } = this.$refs.commTable.multipleSelection[0]
        this.$confirm(
          '确认延期转支出选中的记录?',
          '提示',
          {
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          .then(_ => {
            console.log(id, type)
            if (type === '02') {
              transformExpenditure(id).then(({ data }) => {
                this.$message({
                  type: 'success',
                  message: '延期转支出成功'
                })
                this.fetchData()
              })
            } else {
              this.$message.warning('用户只能选择明细类型为“支出延期”的记录')
            }
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
        exportBankdetail(id, params).then((data) => {
          if (data) {
            exportExcel(data, `${detailData.bankName}_明细表.xls`)
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
    getBankDetailed(id) {
      bankDetailed(id).then(({ data }) => {
        this.ruleForm.type = data.type
        this.ruleForm.financeClassIdArr = data.parentPath.split(',')
        this.ruleForm.happenDate = data.happenDate
        this.ruleForm.money = data.money
        this.ruleForm.checkNumber = data.checkNumber
        this.ruleForm.checkBankName = data.checkBankName
        this.ruleForm.payType = data.payType
        this.ruleForm.summary = data.summary
        this.optimisticLock = data.optimisticLock
        this.ruleForm.remark = data.remark
      })
    }
  }
}
