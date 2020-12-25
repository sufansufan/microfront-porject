<!--收款明细-->
<template>
  <div class="receive-pay-details">
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
import receivepay from '../searchTableData/receivepay'
import { handlerSearchBar, codeChangeName, formatMoney } from '@core/utils'
import { receiveDetailList, receiveDelete, receiveCancelReview, receiveReview } from '@core/api/financialManage/projectfinancemanager'
import search from '@core/mixins/search'
import { mapGetters } from 'vuex'
export default {
  name: 'ReceivePayDetails',
  mixins: [receivepay, search],
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['approveState', 'projectFinanceSource', 'collectionCategory', 'PayType', 'TransferType']).then(() => {
      this.selectList = handlerSearchBar(this.selectList, [1, 3, 4], [this.constant.projectFinanceSource, this.constant.collectionCategory, this.constant.approveState])
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
      if (this.search.paymentDate) {
        if (this.search.paymentDate.length === 0) {
          params.paymentDate = {
            after: '',
            before: ''
          }
        } else {
          params.paymentDate = {
            after: params.paymentDate[0],
            before: params.paymentDate[1]
          }
        }
      } else {
        params.paymentDate = {
          after: '',
          before: ''
        }
      }
      receiveDetailList(params).then(({ data }) => {
        const { projectFinanceSource, collectionCategory, approveState, PayType, TransferType } = this.constant
        const { content, total } = data
        this.tableData = content
        this.tableData.map(item => {
          item.source = codeChangeName(projectFinanceSource, item.source)
          item.collectionCategory = codeChangeName(collectionCategory, item.collectionCategory)
          item.paymentMethod = codeChangeName(PayType, item.paymentMethod)
          item.receivingAccountType = codeChangeName(TransferType, item.receivingAccountType)
          item.state = codeChangeName(approveState, item.state)
          item.amountReceived = item.amountReceived === null || '' ? '0.00' : formatMoney(item.amountReceived)
          item.receivedNotBidAmount = item.receivedNotBidAmount === null || '' ? '0.00' : formatMoney(item.receivedNotBidAmount)
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
          receiveDelete(multipleSelection[0].id).then(({ data }) => {
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
            receiveReview(multipleSelection[0].id).then(({ data }) => {
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
            receiveCancelReview(multipleSelection[0].id).then(({ data }) => {
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
