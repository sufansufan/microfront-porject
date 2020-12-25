<template>
  <div class="warehous-manage">
    <div class="search">
      <div class="select">
        <div>
          <span>入库单号</span>
          <el-input v-model.trim="search.storageNumber" placeholder="请输入入库单号" clearable />
        </div>
        <div>
          <span>入库人</span>
          <el-input v-model.trim="search.storagePersonName" placeholder="请输入入库人" clearable />
        </div>
        <div>
          <span>入库日期</span>
          <el-date-picker
            v-model="search.storageDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            :default-time="defaultTime"
          />
        </div>
        <div class="query">
          <div>
            <el-button type="primary" @click="fetchData('query')"><i class="iconfont icon-search-copy" /> 查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div v-power="'warehousManage:warehouse'">
          <el-button type="primary" @click="jumpState('add')"><i class="iconfont icon-ruku" /> 入库</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        row-key="id"
        border
        height="calc(100vh - 280px)"
        :default-sort="{prop: 'storageDate', order: 'descending'}"
        @selection-change="handleSelectionChange"
        @sort-change="sortTable"
      >
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="storageNumber" label="入库单号" sortable="custom" header-align="center">
          <template slot-scope="scope">
            <span class="table-click-color" @click="jumpState('details', scope.row.id)">{{ scope.row.storageNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="purchaseAmount" label="入库总金额" header-align="center" align="right">
          <template slot-scope="{row}">
            {{ row.purchaseAmount.toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="storagePersonName" label="入库人" align="center" />
        <el-table-column prop="storageDate" label="入库时间" sortable="custom" align="center" />
        <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip />
      </el-table>
    </div>
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
  </div>
</template>

<script>
import table from '@core/mixins/table'
import pagination from '@core/mixins/pagination'
import { queryLibraryList } from '@core/api/platformEquipmentManage/devicemanager'
export default {
  name: 'WrehousManage',
  mixins: [table, pagination],

  data() {
    return {
      search: {
        storageNumber: '',
        storagePersonName: '',
        storageDate: []
      },
      tableData: [],
      loading: false,
      count: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    jumpState(type, id) {
      this.$router.push({ name: 'addWarehous', query: { type, id: type === 'details' ? id : '' }})
    },
    fetchData(type) {
      if (type === 'query') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      this.loading = true
      const { page, size, search: { storageDate }} = this
      const params = {
        page: page - 1,
        size,
        propertyName: 'storageDate',
        ascending: false,
        ...this.search,
        ...this.sortData
      }
      delete params.storageDate
      if (storageDate && storageDate.length) {
        params.storageDate = {
          after: storageDate[0],
          before: storageDate[1]
        }
      }
      queryLibraryList(params).then(({ data: { content, total }}) => {
        this.loading = false
        this.tableData = content
        this.count = total
      })
    }
  }
}
</script>

<style lang="less" scoped>
.warehous-manage {
  padding: 10px;
}
</style>
