<!--往来款明细-->
<template>
  <div class="Current-payment-details">
    <div class="search">
      <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch" /></div>
    <div class="table">
      <comm-table
        ref="commTable"
        v-loading="loading"
        :single-selected="true"
        :columns="columns"
        :table-options="tableOptions"
        :data="tableData"
        :count="count"
      />
    </div>
    <div class="total">
      <el-form ref="summary" :model="summary" label-width="200px" class="rule-form-flex four-width">
        <el-form-item label="借入金额">
          <amount-input
            v-model="summary.borrowAmountTotal"
            placeholder="请输入借入金额"
            unit-name="元"
            disabled
          />
        </el-form-item>
        <el-form-item label="借入已归还金额">
          <amount-input
            v-model="summary.borrowReturnedMoneyTotal"
            placeholder="请输入借入已归还金额"
            unit-name="元"
            disabled
          />
        </el-form-item>
        <el-form-item label="借入未归还金额">
          <amount-input
            v-model="summary.borrowNoReturnMoneyTotal"
            placeholder="请输入借入未归还金额"
            unit-name="元"
            disabled
          />
        </el-form-item>
        <el-form-item label="借出金额">
          <amount-input
            v-model="summary.loanAmountTotal"
            placeholder="请输入借出金额"
            unit-name="元"
            disabled
          />
        </el-form-item>
        <el-form-item label="借出已归还金额">
          <amount-input
            v-model="summary.loanReturnedMoneyTotal"
            placeholder="请输入借出已归还金额"
            unit-name="元"
            disabled
          />
        </el-form-item>
        <el-form-item label="借出未归还金额">
          <amount-input
            v-model="summary.loanNoReturnMoneyTotal"
            placeholder="请输入借出未归还金额"
            unit-name="元"
            disabled
          />
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
import currentPayment from '../searchTableData/currentPayment'
import { mapGetters } from 'vuex'
import search from '@core/mixins/search'
import { contactDetaillList, contactDelete, contactDetaillSummary } from '@core/api/financialManage/projectfinancemanager'
import { formatMoney, handlerSearchBar, codeChangeName } from '@core/utils'
export default {
  name: 'CurrentPaymentDetails',
  mixins: [currentPayment, search],
  data() {
    return {
      summary: {
        borrowAmountTotal: '',
        borrowReturnedMoneyTotal: '',
        borrowNoReturnMoneyTotal: '',
        loanAmountTotal: '',
        loanReturnedMoneyTotal: '',
        loanNoReturnMoneyTotal: ''
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['financePaymentType', 'projectFinanceSource', 'PayType']).then(() => {
      this.selectList = handlerSearchBar(this.selectList, [1], [this.constant.financePaymentType])
      this.fetchData()
    })
  },
  methods: {
    fetchData(type) {
      this.multipleSelection = []
      this.loading = true
      this.queryCopy(type)
      const { page, size, sortData } = this
      const params = {
        page: page - 1 || 0,
        size: size || 10,
        // propertyName: 'contractNumber',
        // ascending: false,
        ...this.search,
        ...sortData
      }
      if (this.search.dateOfOccurrence) {
        if (this.search.dateOfOccurrence.length === 0) {
          params.dateOfOccurrence = {
            after: '',
            before: ''
          }
        } else {
          params.dateOfOccurrence = {
            after: params.dateOfOccurrence[0],
            before: params.dateOfOccurrence[1]
          }
        }
      } else {
        params.dateOfOccurrence = {
          after: '',
          before: ''
        }
      }
      if (this.search.estimatedDate) {
        if (this.search.estimatedDate.length === 0) {
          params.estimatedDate = {
            after: '',
            before: ''
          }
        } else {
          params.estimatedDate = {
            after: params.estimatedDate[0],
            before: params.estimatedDate[1]
          }
        }
      } else {
        params.estimatedDate = {
          after: '',
          before: ''
        }
      }
      contactDetaillList(params).then(({ data }) => {
        const { financePaymentType, projectFinanceSource, PayType } = this.constant
        const { content, total } = data
        this.tableData = content
        this.count = total
        this.loading = false
        this.tableData.map(item => {
          item.amount = item.amount === null || '' ? '0.00' : formatMoney(item.amount)
          item.returnedMoney = item.returnedMoney === null || '' ? '0.00' : formatMoney(item.returnedMoney)
          item.noReturnMoney = item.noReturnMoney === null || '' ? '0.00' : formatMoney(item.noReturnMoney)
          item.interestTotal = item.interestTotal === null || '' ? '0.00' : formatMoney(item.interestTotal)
          item.source = codeChangeName(projectFinanceSource, item.source)
          item.paymentType = codeChangeName(financePaymentType, item.paymentType)
          item.paymentMethod = codeChangeName(PayType, item.paymentMethod)
          return item
        })
      })
      contactDetaillSummary(params).then(({ data }) => {
        const { borrowAmountTotal, borrowNoReturnMoneyTotal, borrowReturnedMoneyTotal, loanAmountTotal, loanNoReturnMoneyTotal, loanReturnedMoneyTotal } = data
        this.summary = {
          borrowAmountTotal: borrowAmountTotal === null || '' ? '0.00' : formatMoney(borrowAmountTotal),
          borrowNoReturnMoneyTotal: borrowNoReturnMoneyTotal === null || '' ? '0.00' : formatMoney(borrowNoReturnMoneyTotal),
          borrowReturnedMoneyTotal: borrowReturnedMoneyTotal === null || '' ? '0.00' : formatMoney(borrowReturnedMoneyTotal),
          loanAmountTotal: loanAmountTotal === null || '' ? '0.00' : formatMoney(loanAmountTotal),
          loanNoReturnMoneyTotal: loanNoReturnMoneyTotal === null || '' ? '0.00' : formatMoney(loanNoReturnMoneyTotal),
          loanReturnedMoneyTotal: loanReturnedMoneyTotal === null || '' ? '0.00' : formatMoney(loanReturnedMoneyTotal)
        }
      })
    },
    deleteData() {
      const { onlyOneData, multipleSelection } = this.$refs.commTable
      if (!onlyOneData()) return
      this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          contactDelete(multipleSelection[0].id).then(({ data }) => {
            this.$message.success('删除成功')
            this.fetchData('query')
          })
        })
        .catch(() => { })
    },
    repayment() {
      const { onlyOneData, multipleSelection } = this.$refs.commTable
      if (!onlyOneData()) return
      this.$emit('changeComName', 'Repayment', 'repayment', multipleSelection[0].id)
    }
  }
}
</script>
<style lang="less" scoped>
.Current-payment-details {
  padding: 10px 0;
  .total {
    padding: 10px 0;
  }
}
</style>
