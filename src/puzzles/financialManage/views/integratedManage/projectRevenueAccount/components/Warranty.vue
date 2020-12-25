<!--质保押金-->
<template>
  <div class="warranty">
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
        <el-form-item label="甲方未回质保金">
          <amount-input
            v-model="summary.firstPartyNotBackDepositTotal"
            disabled
            placeholder="请输入甲方未回质保金"
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="未退项目质保金">
          <amount-input
            v-model="summary.projectNotReturnWarrantyTotal	"
            placeholder="请输入未退项目质保金"
            unit-name="元"
            disabled
          />
        </el-form-item>
        <el-form-item label="甲方未回押金">
          <amount-input
            v-model="summary.firstPartyNotBackDepositTotal"
            placeholder="请输入甲方未回押金"
            unit-name="元"
            disabled
          />
        </el-form-item>
        <el-form-item label="未退项目押金">
          <amount-input
            v-model="summary.projectNotReturnDepositTotal"
            placeholder="请输入未退项目押金"
            unit-name="元"
            disabled
          />
        </el-form-item>
        <el-form-item label="银行未回保函">
          <amount-input
            v-model="summary.bankNotBackGuaranteeTotal"
            placeholder="请输入银行未回保函"
            unit-name="元"
            disabled
          />
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
import warranty from '../searchTableData/warranty'
import search from '@core/mixins/search'
import { mapGetters } from 'vuex'
import { warrantyDepositList, warrantyDepositDelete, warrantydepositSummary, warrantyDepositCancelReview, warrantyDepositReview } from '@core/api/financialManage/projectfinancemanager'
import { formatMoney, handlerSearchBar, codeChangeName } from '@core/utils'
export default {
  name: 'Warranty',
  mixins: [warranty, search],
  data() {
    return {
      summary: {
        bankNotBackGuaranteeTotal: '',
        firstPartyNotBackDepositTotal: '',
        firstPartyNotBackWarrantyTotal: '',
        projectNotReturnDepositTotal: '',
        projectNotReturnWarrantyTotal: ''
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['operateType', 'approveState', 'PayType', 'TransferType']).then(() => {
      this.selectList = handlerSearchBar(this.selectList, [1, 2], [this.constant.operateType, this.constant.approveState])
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
      if (this.search.operationDate) {
        if (this.search.operationDate.length === 0) {
          params.operationDate = {
            after: '',
            before: ''
          }
        } else {
          params.operationDate = {
            after: params.operationDate[0],
            before: params.operationDate[1]
          }
        }
      } else {
        params.operationDate = {
          after: '',
          before: ''
        }
      }
      warrantyDepositList(params).then(({ data }) => {
        const { operateType, approveState, PayType, TransferType } = this.constant
        const { content, total } = data
        this.tableData = content
        this.count = total
        this.loading = false
        this.tableData.map(item => {
          item.amount = item.amount === null || '' ? '0.00' : formatMoney(item.amount)
          item.operationType = codeChangeName(operateType, item.operationType)
          item.state = codeChangeName(approveState, item.state)
          item.operatingMethod = codeChangeName(PayType, item.operatingMethod)
          item.operatingAccountType = codeChangeName(TransferType, item.operatingAccountType)
          return item
        })
      })
      warrantydepositSummary(params).then(({ data }) => {
        const { bankNotBackGuaranteeTotal, firstPartyNotBackDepositTotal, firstPartyNotBackWarrantyTotal, projectNotReturnDepositTotal, projectNotReturnWarrantyTotal } = data
        this.summary = {
          bankNotBackGuaranteeTotal: bankNotBackGuaranteeTotal === null || '' ? '0.00' : formatMoney(bankNotBackGuaranteeTotal),
          firstPartyNotBackDepositTotal: firstPartyNotBackDepositTotal === null || '' ? '0.00' : formatMoney(firstPartyNotBackDepositTotal),
          firstPartyNotBackWarrantyTotal: firstPartyNotBackWarrantyTotal === null || '' ? '0.00' : formatMoney(firstPartyNotBackWarrantyTotal),
          projectNotReturnDepositTotal: projectNotReturnDepositTotal === null || '' ? '0.00' : formatMoney(projectNotReturnDepositTotal),
          projectNotReturnWarrantyTotal: projectNotReturnWarrantyTotal === null || '' ? '0.00' : formatMoney(projectNotReturnWarrantyTotal)
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
          warrantyDepositDelete(multipleSelection[0].id).then(({ data }) => {
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
            warrantyDepositReview(multipleSelection[0].id).then(({ data }) => {
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
            warrantyDepositCancelReview(multipleSelection[0].id).then(({ data }) => {
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
