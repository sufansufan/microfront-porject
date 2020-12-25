<!--开票明细-->
<template>
  <div class="invoicing-detail">
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
  </div>
</template>
<script>
import invoicing from '../searchTableData/invoicing'
import { formatMoney, handlerSearchBar, codeChangeName } from '@core/utils'
import { mapGetters } from 'vuex'

import search from '@core/mixins/search'
import { billingdetailList, billingdetailDel, billingCancelApprove, billingApprove } from '@core/api/financialManage/projectfinancemanager'
export default {
  name: 'InvoicingDetail',
  mixins: [invoicing, search],
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
      this.selectList = handlerSearchBar(this.selectList, [1, 2, 3], [this.constant.projectFinanceSource, this.constant.financeInvoiceType, this.constant.approveState])
      this.fetchData()
    })
  },
  methods: {
    fetchData(type) {
      console.log(122)
      this.multipleSelection = []
      this.loading = true
      this.queryCopy(type)
      const { page, size, sortData } = this
      const params = {
        page: page - 1 || 0,
        size: size || 10,
        propertyName: 'createDate',
        ascending: false,
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
      billingdetailList(params).then(({ data }) => {
        const { projectFinanceSource, financeInvoiceType, approveState } = this.constant
        const { content, total } = data
        this.tableData = content
        this.count = total
        this.tableData.map(item => {
          item.invoiceAmount = item.invoiceAmount === null || '' ? '0.00' : formatMoney(item.invoiceAmount)
          item.invoicingTaxRate = item.invoicingTaxRate === null || '' ? '0.00' : formatMoney(item.invoicingTaxRate)
          item.noTaxAmount = item.noTaxAmount === null || '' ? '0.00' : formatMoney(item.noTaxAmount)
          item.invoiceTax = item.invoiceTax === null || '' ? '0.00' : formatMoney(item.invoiceTax)
          item.amountReceived = item.amountReceived === null || '' ? '0.00' : formatMoney(item.amountReceived)
          item.balanceReceived = item.balanceReceived === null || '' ? '0.00' : formatMoney(item.balanceReceived)
          item.sourceName = codeChangeName(projectFinanceSource, item.source)
          item.invoiceTypeName = codeChangeName(financeInvoiceType, item.invoiceType)
          item.stateName = codeChangeName(approveState, item.state)
          return item
        })
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
          billingdetailDel(multipleSelection[0].id).then(({ data }) => {
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
        this.$confirm('确认审核选中发票？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            billingApprove(multipleSelection[0].id).then(({ data }) => {
              this.$message.success('审核成功')
              this.fetchData('query')
            })
          })
          .catch(() => { })
      } else {
        this.$confirm('确认撤销审核选中发票？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            billingCancelApprove(multipleSelection[0].id).then(({ data }) => {
              this.$message.success('撤销审核成功')
              this.fetchData('query')
            })
          })
          .catch(() => { })
      }
    }
  }
}
</script>

