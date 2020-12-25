<template>
  <div class="historical-price">
    <div>
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        row-key="id"
        height="calc(100vh - 230px)"
        border
      >
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="unitPrice" label="市场价格" align="center" />
        <el-table-column prop="soldAmount" label="已售数量" align="center" />
        <el-table-column prop="createUserName" label="调整人" align="center" />
        <el-table-column prop="createDate" label="调整时间" align="center" />
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
import { queryPrice } from '@core/api/platformEquipmentManage/devicemanager'
export default {
  mixins: [table, pagination],
  props: {
    disabled: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      tableData: [],
      loading: false,
      count: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const { id } = this.$route.query
      const parmas = {
        deviceCatalogueId: id,
        propertyName: 'createDate',
        ascending: false
      }
      queryPrice(parmas).then(({ data: { content, total }}) => {
        this.count = total
        this.tableData = content
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
