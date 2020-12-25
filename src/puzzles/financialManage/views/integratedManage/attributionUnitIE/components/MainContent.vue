<template>
  <div class="main-content">
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
    <!-- max-height="calc(100vh - 400px)" -->
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      row-key="id"
      border
      @sort-change="sortTable"
      @select="handleSelectionSingleChange"
    >
      <!-- <el-table-column type="selection" width="40" fixed label-class-name="table-selection" /> -->
      <el-table-column type="index" width="48" fixed label="序号" align="center" />
      <el-table-column prop="name" label="项目归属单位" width="120" fixed align="center" sortable="custom" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="table-click-color" @click="viewDetails(scope.row)"> {{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目款" align="center">
        <el-table-column prop="name" label="余额" sortable="custom" align="center" show-overflow-tooltip />
        <el-table-column prop="name" label="申请金额" sortable="custom" align="center" show-overflow-tooltip />
        <el-table-column prop="name" label="批准金额" sortable="custom" align="center" show-overflow-tooltip />
      </el-table-column>
      <el-table-column prop="name" label="风险保证金" align="center" show-overflow-tooltip>
        <el-table-column prop="name" label="余额" sortable="custom" align="center" show-overflow-tooltip />
        <el-table-column prop="name" label="申请金额" sortable="custom" align="center" show-overflow-tooltip />
        <el-table-column prop="name" label="批准金额" sortable="custom" align="center" show-overflow-tooltip />
      </el-table-column>
      <el-table-column prop="name" label="质保/保函/押金" align="center" show-overflow-tooltip>
        <el-table-column prop="name" label="余额" sortable="custom" align="center" show-overflow-tooltip />
        <el-table-column prop="name" label="申请金额" sortable="custom" align="center" show-overflow-tooltip />
        <el-table-column prop="name" label="批准金额" sortable="custom" align="center" show-overflow-tooltip />
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-show="count"
        :page-sizes="pageSizes"
        :page-size="size"
        :total="50"
        :current-page="page"
        :layout="pageLayout"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <div class="from-box">
      <el-form ref="ruleForm" :key="key" :model="ruleForm" label-width="200px" class="rule-form-flex">
        <el-form-item label="项目款余额合计" prop="user1">
          <el-input
            v-model.trim="formInline.user1"
            disabled
          />
        </el-form-item>
        <el-form-item label="风险保证金余额合计">
          <el-input
            v-model.trim="formInline.user2"
            disabled
          />
        </el-form-item>
        <el-form-item label="质保/保函/押金余额合计">
          <el-input
            v-model.trim="formInline.user3"
            disabled
          />
        </el-form-item>
        <el-form-item label="项目款申请金额合计">
          <el-input
            v-model.trim="formInline.user4"
            disabled
          />
        </el-form-item>
        <el-form-item label="风险保证金申请金额合计">
          <el-input
            v-model.trim="formInline.user5"
            disabled
          />
        </el-form-item>
        <el-form-item label="质保/保函/押金申请金额合计">
          <el-input
            v-model.trim="formInline.user6"
            disabled
          />
        </el-form-item>
        <el-form-item label="项目款批准金额合计">
          <el-input
            v-model.trim="formInline.user7"
            disabled
          />
        </el-form-item>
        <el-form-item label="风险保证金批准金额合计">
          <el-input
            v-model.trim="formInline.user7"
            disabled
          />
        </el-form-item>
        <el-form-item label="风险保证金批准金额合计">
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
import { toDecimal } from '@core/utils/validate'
import search from '@/core/mixins/search'
export default {
  name: 'MainContent',
  mixins: [searchTableData, search],
  data() {
    return {
      companyList: [],
      tableData: [{ name: '归属单位收支汇总', id: 'id-1' }],
      loading: false,
      count: '50',
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
  },
  created() {
    const num = toDecimal('111121314', 2)
    console.log(num)
  },
  methods: {
    viewDetails(data) {
      console.log(data)
      this.$router.push({ name: 'details', query: { id: data.id }})
    }
  }
}
</script>
<style lang="less" scoped>

</style>
