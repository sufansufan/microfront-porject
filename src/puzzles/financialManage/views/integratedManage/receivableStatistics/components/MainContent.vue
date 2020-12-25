<template>
  <div class="main-content">
    <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch">
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
      <el-form ref="ruleForm" :key="key" :model="ruleForm" label-width="160px" class="rule-form-flex four-width">
        <el-form-item label="合同金额合计" prop="user1">
          <!-- <el-input v-model="formInline.user1" disabled />         -->
          <el-input
            v-model.trim="formInline.user1"
            disabled
          />
        </el-form-item>
        <el-form-item label="金酸金额合计">
          <el-input
            v-model.trim="formInline.user2"
            disabled
          />
        </el-form-item>
        <el-form-item label="应收款额合计">
          <el-input
            v-model.trim="formInline.user3"
            disabled
          />
        </el-form-item>
        <el-form-item label="已收款额合计">
          <el-input
            v-model.trim="formInline.user4"
            disabled
          />
        </el-form-item>
        <el-form-item label="未收款额合计">
          <el-input
            v-model.trim="formInline.user5"
            disabled
          />
        </el-form-item>
        <el-form-item label="质保金额">
          <el-input
            v-model.trim="formInline.user6"
            disabled
          />
        </el-form-item>
        <el-form-item label="质保/保函/押金合计">
          <el-input
            v-model.trim="formInline.user7"
            disabled
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import searchTableData from '../searchTableData'
import search from '@/core/mixins/search'
export default {
  name: 'MainContent',
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
        belongOrgId: '', // 归属单位
        year: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
