<!--收票明细-->
<template>
  <div class="receipt-details">
    <div class="search">
      <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch" />
    </div>
    <div class="table">
      <comm-table
        ref="commTable"
        :single-selected="true"
        :columns="columns"
        :data="tableData"
        :count="count"
      />
    </div>
  </div>
</template>
<script>
import receipt from '../searchTableData/receipt'
import search from '@core/mixins/search'
import { financeclassList } from '@core/api/financialManage/financeclassmanager'
import { handlerSearchBar, codeChangeName, formatMoney } from '@core/utils'
import { receiptDetaillList, receiptDelete, receiptReview, receiptCancelReview } from '@core/api/financialManage/projectfinancemanager'
import { mapGetters } from 'vuex'
export default {
  name: 'ReceiptDetails',
  mixins: [receipt, search],
  props: {
    btnAttr: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['approveState', 'projectFinanceSource', 'financeInvoiceType']).then(() => {
      this.selectList = handlerSearchBar(this.selectList, [2, 4], [this.constant.approveState, this.constant.financeInvoiceType])
      this.fetchData()
      this.getFinanceInvoiceType()
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
      if (this.search.billingDate) {
        if (this.search.billingDate.length === 0) {
          params.billingDate = {
            after: '',
            before: ''
          }
        } else {
          params.billingDate = {
            after: params.billingDate[0],
            before: params.billingDate[1]
          }
        }
      } else {
        params.billingDate = {
          after: '',
          before: ''
        }
      }
      receiptDetaillList(params).then(({ data }) => {
        const { projectFinanceSource, approveState, financeInvoiceType } = this.constant
        const { content, total } = data
        this.tableData = content
        this.tableData.map(item => {
          item.source = codeChangeName(projectFinanceSource, item.source)
          item.state = codeChangeName(approveState, item.state)
          item.invoiceType = codeChangeName(financeInvoiceType, item.invoiceType)

          item.invoiceAmount = item.invoiceAmount === null || '' ? '0.00' : formatMoney(item.invoiceAmount)
          item.invoiceTaxRate = item.invoiceTaxRate === null || '' ? '0.00' : formatMoney(item.invoiceTaxRate) + '%'
          item.noTaxAmountOnInvoice = item.noTaxAmountOnInvoice === null || '' ? '0.00' : formatMoney(item.noTaxAmountOnInvoice)
          item.invoiceTax = item.invoiceTax === null || '' ? '0.00' : formatMoney(item.invoiceTax)
          item.invoicingPaymentMoney = item.invoicingPaymentMoney === null || '' ? '0.00' : formatMoney(item.invoicingPaymentMoney)
          item.invoicingPaymentBalance = item.invoicingPaymentBalance === null || '' ? '0.00' : formatMoney(item.invoicingPaymentBalance)
          return item
        })
        this.count = total
        this.loading = false
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
          receiptDelete(multipleSelection[0].id).then(({ data }) => {
            this.$message.success('删除成功')
            this.fetchData('query')
          })
        })
        .catch(() => { })
    },
    audit(type) {
      const { onlyOneData, multipleSelection } = this.$refs.commTable
      if (!onlyOneData()) return
      if (type === 'audit') { // 审核
        this.$confirm('确认审核选中记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            receiptReview(multipleSelection[0].id).then(({ data }) => {
              this.$message.success('审核成功')
              this.fetchData('query')
            })
          })
          .catch(() => { })
      } else {
        this.$confirm('确认撤销审核选中记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            receiptCancelReview(multipleSelection[0].id).then(({ data }) => {
              this.$message.success('撤销审核成功')
              this.fetchData('query')
            })
          })
          .catch(() => { })
      }
    },
    // 获取发票归类
    getFinanceInvoiceType() {
      const params = {
        financeClassNumber: 'LB03',
        page: 0,
        size: 20
      }
      financeclassList(params).then(({ data }) => {
        this.selectList = handlerSearchBar(this.selectList, [5], [data.content])
        this.tableData.map(item => {
          item.invoiceClassification = codeChangeName(data.content, item.invoiceClassification, 'classNumber', 'name')
          return item
        })
      })
    }
  }
}
</script>
