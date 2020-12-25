<template>
  <div class="right-register">
    <search-bar :select-list="selectList" :search="search" :btn-list="btnList" @changeSearch="changeSearch">
      <div slot="searchBar0" class="external-list">
        <span>归属单位</span>
        <el-select
          v-model="searchExternal.attribution"
          placeholder="请选择项目归属"
          style="width:30%"
          clearable
          @change="handlerChangeProject"
        >
          <el-option
            v-for="item in ContractAttributionList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <jdy-select
          v-model="searchExternal.belongOrgId"
          placeholder="请选择归属单位"
          style="width:70%"
          :disabled="disabledCompany"
          :select-data="companyList"
          @change="companyChange"
        />
      </div>
    </search-bar>
    <comm-table
      ref="commTable"
      :single-selected="true"
      :columns="columns"
      :data="tableData"
      :count="total"
      :loading="loading"
    />
    <div class="from-box">
      <el-form ref="ruleForm" :key="key" :model="ruleForm" label-width="160px" class="rule-form-flex four-width">
        <el-form-item label="当前余额汇总" prop="user1">
          <!-- <el-input v-model="sumData.user1" disabled />         -->
          <el-input
            v-model.trim="sumData.currentBalance"
            disabled
          />
        </el-form-item>
        <el-form-item label="可用余额汇总">
          <el-input
            v-model.trim="sumData.availableBalance"
            disabled
          />
        </el-form-item>
        <el-form-item label="账上余额汇总">
          <el-input
            v-model.trim="sumData.accounBalance"
            disabled
          />
        </el-form-item>
        <el-form-item label="支出合计汇总">
          <el-input
            v-model.trim="sumData.expendTotal"
            disabled
          />
        </el-form-item>
        <el-form-item label="收入合计汇总">
          <el-input
            v-model.trim="sumData.incomeTotal"
            disabled
          />
        </el-form-item>
        <el-form-item label="指出延期汇总">
          <el-input
            v-model.trim="sumData.expendDelay"
            disabled
          />
        </el-form-item>
        <el-form-item label="收款未到汇总">
          <el-input
            v-model.trim="sumData.collectionNotReceived"
            disabled
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import searchTableData from '../searchTableData/bank'
import { getOrganizationByBelongList } from '@core/api/organization'
import search from '@/core/mixins/search'
import { mapGetters } from 'vuex'
import {
  codeChangeName,
  parseTime
} from '@core/utils'
import {
  bankaccountList
} from '@core/api/financialManage/capitalaccountmanager'
export default {
  components: {},
  directives: {
    'functSize': {
      bind(el, pinding) {
        el.style.fontSize = parseInt(pinding.value) + 'px'
      }
    }
  },
  mixins: [searchTableData, search],
  data() {
    return {
      loading: false,
      total: 0,
      sumData: {},
      companyList: [],
      searchExternal: {
        attribution: '', // 账户归属
        belongOrgId: '' // 归属单位
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    disabledCompany() {
      return !this.searchExternal.attribution
    },
    // 合同归属List
    ContractAttributionList() {
      return this.constant.ContractAttribution
    }
  },
  activated() {
    this.fetchData()
    this.$store.dispatch('getConstant', [
      'BankAccountState',
      'BankAccountType'
    ])
  },
  // mounted() {
  //   // this.$refs.dialogNumber.show = true
  // },
  methods: {
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const { page, size, search } = this
      const params = {
        page: page - 1 || 0,
        size: size || 10,
        orgType: this.searchExternal.attribution,
        organizationId: this.searchExternal.belongOrgId,
        ...search
      }

      bankaccountList(params).then(({ data }) => {
        const { page: { content, total }, sum } = data
        content.forEach(item => {
          item.accountName = codeChangeName(this.constant.BankAccountType, item.accountType) // 账户类型
          item.stateName = codeChangeName(this.constant.BankAccountState, item.state)// 状态
          item.openDate = parseTime(item.openAccountDate, 'y-m-d') // 开户日期
          item.lastDate = parseTime(item.lastOperateDate) // 最后一次操作时间
        })
        this.total = total
        this.tableData = content
        this.loading = false
        this.sumData = sum
      }).catch(e => {
      })
    },
    async handlerChangeProject(val) {
      if (val) {
        this.$set(this.searchExternal, 'company', '')
        const { data } = await getOrganizationByBelongList(val)
        this.companyList = data.map(i => ({ code: i.id, name: i.orgName }))
      } else {
        return
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
