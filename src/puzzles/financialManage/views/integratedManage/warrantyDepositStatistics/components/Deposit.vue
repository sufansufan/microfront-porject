<template>
  <div class="deposit">
    <search-bar :select-list="selectList" :search="search" :btn-list="btnList" @changeSearch="changeSearch">
      <div slot="searchBar0" class="external-list">
        <span>归属单位</span>
        <el-select
          v-model="searchExternal.attribution"
          placeholder="请选择项目归属"
          style="width: 190px"
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
        <el-select
          v-model="searchExternal.company"
          :disabled="disabledCompany"
          clearable
          placeholder="请选择归属单位"
        >
          <el-option
            v-for="item in companyList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </div>
    </search-bar>
    <comm-table
      ref="commTable"
      :single-selected="true"
      :columns="columns"
      :data="tableData"
      :count="50"
    />
    <div class="from-box">
      <el-form ref="ruleForm" :key="key" :model="ruleForm" label-width="160px" class="rule-form-flex el-form-item">
        <el-form-item label="合同金额合计" prop="user1">
          <el-input
            v-model.trim="formInline.user1"
            disabled
          />
        </el-form-item>
        <el-form-item label="结算金额合计">
          <el-input
            v-model.trim="formInline.user2"
            disabled
          />
        </el-form-item>
        <el-form-item label="交甲方押金合计">
          <el-input
            v-model.trim="formInline.user3"
            disabled
          />
        </el-form-item>
        <el-form-item label="甲方退押金合计">
          <el-input
            v-model.trim="formInline.user4"
            disabled
          />
        </el-form-item>
        <el-form-item label="收项目押金合计">
          <el-input
            v-model.trim="formInline.user5"
            disabled
          />
        </el-form-item>
        <el-form-item label="退项目押金合计">
          <el-input
            v-model.trim="formInline.user6"
            disabled
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import searchTableData from '../searchTableData/deposit'
import search from '@/core/mixins/search'
export default {
  name: 'Deposit',
  components: {},
  mixins: [searchTableData, search],
  data() {
    return {
      formInline: {
        user1: '123456',
        user2: '123456',
        user3: '123456',
        user4: '123456',
        user5: '123456',
        user6: '123456',
        user7: '123456'
      },
      searchExternal: {
        attribution: '', // 账户归属
        belongOrgId: '' // 归属单位
      },
      dialogTitle: '',
      multipleSelection: []
    }
  },
  created() {
    // this.fetchData('query')
  },
  // mounted() {
  //   // this.$refs.dialogNumber.show = true
  // },
  methods: {
    // fetchData(type) {
    //   this.queryCopy(type)
    //   const params = {
    //     pageNum: this.page || 1,
    //     pageSize: this.size || 10,
    //     ...this.search,
    //     ...this.sortData
    //   }

    //   getUserInformationList(params).then(res => {
    //     this.$refs.commTable.loading = false
    //     this.tableData = res.data.list
    //     this.tabCount = res.data.total
    //     this.multipleSelection = []
    //   }).catch(e => {
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>
</style>
