<template>
  <div class="transfer-list">
    <search-bar :select-list="selectList" :search="search" :btn-list="btnList" :column="3" @changeSearch="changeSearch">
      <div slot="searchBar0" class="external-list" label-width="100px">
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
      :loading="loading"
      :count="total"
    />
    <div class="dialog-show-btn">
      <el-button type="primary" @click="onCkick">确定</el-button>
    </div>
  </div>
</template>
<script>
import searchTableData from '../searchTableData/bankTransferList'
import { getOrganizationByBelongList } from '@core/api/organization'
import search from '@/core/mixins/search'
import { mapGetters } from 'vuex'
import {
  bankaccountList
} from '@core/api/financialManage/capitalaccountmanager'
export default {
  name: 'TransferList',
  mixins: [searchTableData, search],
  data() {
    return {
      loading: false,
      total: 0,
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
  created() {
    this.fetchData()
    this.$store.dispatch('getConstant', [
      'ContractAttribution' // 合同归属
    ]).then(() => {})
  },
  methods: {
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const { page, size, search } = this
      const params = {
        page: page - 1 || 0,
        size: size || 5,
        state: '01',
        orgType: this.searchExternal.attribution,
        organizationId: this.searchExternal.belongOrgId,
        ...search
      }

      bankaccountList(params).then(({ data }) => {
        const { page: { content, total }, sum } = data
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
    },
    onCkick() {
      const { onlyOneData } = this.$refs.commTable
      if (!onlyOneData()) return
      const { id, bankNumber } = this.$refs.commTable.multipleSelection[0]
      this.$emit('onDialogShow', id, bankNumber)
    }
  }
}
</script>
<style lang="less" scoped>
.transfer-list {
  .dialog-show-btn {
    display: flex;
    justify-content: flex-end;
  }
  .external-list {
    width: 33.333%;
  }
}
</style>
