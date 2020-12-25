<!--投标保证金管理-->
<template>
  <div class="bid-bond-manage">
    <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch">
      <div slot="searchBar0" class="external-list">
        <span>项目归属</span>
        <el-select
          v-model="searchExternal.attribution"
          placeholder="请选择项目归属"
          style="width: 190px"
          clearable
        >
          <el-option
            v-for="item in constant.ContractAttribution"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select
          v-model="searchExternal.company"
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
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      row-key="id"
      border
      max-height="calc(100vh - 400px)"
      @sort-change="sortTable"
      @select="handleSelectionSingleChange"
    >
      <el-table-column type="selection" width="40" fixed label-class-name="table-selection" />
      <el-table-column type="index" width="48" fixed label="序号" align="center" />
      <el-table-column prop="name" label="工程名称" width="100" fixed align="center" sortable="custom" show-overflow-tooltip />
      <el-table-column prop="name" label="归属单位" width="100" fixed align="center" sortable="custom" show-overflow-tooltip />
      <el-table-column prop="name" label="招标单位" width="100" fixed align="left" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="table-click-color" @click="viewDetails"> {{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="招标单位(单位：元)" align="center">
        <el-table-column prop="name" label="收款金额" sortable="custom" align="center" show-overflow-tooltip />
        <el-table-column prop="name" label="退款金额" align="center" show-overflow-tooltip />
        <el-table-column prop="name" label="未退金额" sortable="custom" align="center" show-overflow-tooltip />
      </el-table-column>
      <el-table-column prop="name" label="收分公司/项目部(单位：元)" align="center">
        <el-table-column prop="name" label="收款金额" sortable="custom" align="center" show-overflow-tooltip />
        <el-table-column prop="name" label="退款金额" align="center" show-overflow-tooltip />
        <el-table-column prop="name" label="未退金额" sortable="custom" align="center" show-overflow-tooltip />
      </el-table-column>
      <el-table-column prop="name" label="状态" sortable="custom" width="100" fixed="right" align="center" />
    </el-table>
    <div class="pagination">
      <el-pagination
        v-show="count"
        :page-sizes="pageSizes"
        :page-size="size"
        :total="count"
        :current-page="page"
        :layout="pageLayout"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <div class="summary">
      <el-form ref="summary" :model="summary" label-width="200px" class="rule-form-flex">
        <el-form-item label="招标单位收款金额合计">
          <el-input v-model.trim="summary.name" disabled />
        </el-form-item>
        <el-form-item label="招标单位退款金额合计">
          <el-input v-model.trim="summary.name" disabled />
        </el-form-item>
        <el-form-item label="招标单位未退金额合计">
          <el-input v-model.trim="summary.name" disabled />
        </el-form-item>

        <el-form-item label="收分公司/项目部金额合计">
          <el-input v-model.trim="summary.name" disabled />
        </el-form-item>
        <el-form-item label="退分公司/项目部金额合计">
          <el-input v-model.trim="summary.name" disabled />
        </el-form-item>
        <el-form-item label="未退分公司/项目部金额合计">
          <el-input v-model.trim="summary.name" disabled />
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>

<script>
import searchTableData from './searchTableData'
import { mapGetters } from 'vuex'
import search from '@core/mixins/search'
export default {
  name: 'BidBondManage',
  mixins: [searchTableData, search],
  data() {
    return {
      searchExternal: {
        attribution: '', // 项目归属
        company: '' // 项目归属单位
      },
      companyList: [],
      tableData: [{ name: '项目收支台账' }],
      loading: false,
      count: null,
      summary: {
        name: ''
      },
      ruleForm: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请选择成本会计', trigger: 'change' }]
      },
      options: [
        { code: '2', name: 'name' }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  methods: {
    // 查看
    viewDetails() {
      this.$router.push({ name: 'projectView' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
