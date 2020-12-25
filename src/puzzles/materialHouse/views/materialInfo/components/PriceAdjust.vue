<template>
  <div class="price-adjust">
    <div>
      <el-table
        ref="tableRef"
        v-loading="loading"
        default-expand-all
        :data="tableData"
        row-key="id"
        border
        max-height="calc(100vh - 200px)"
      >
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column label="调整类型" prop="type" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.type=='0'?'上调':(scope.row.type=='1'?'下调':'') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="调整比例（%）" prop="number" align="center" />
        <el-table-column label="调整前市场价" align="center">
          <template slot-scope="{row}">
            {{ row.oldPrice | changNumber }}
          </template>
        </el-table-column>
        <el-table-column label="调整后市场价" align="center">
          <template slot-scope="{row}">
            {{ row.newPrice | changNumber }}
          </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="操作人" align="center" />
        <el-table-column prop="createDate" label="操作时间" align="center" />
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
import { priceChangeList } from '@core/api/materialHouse/pricechange'
import { handleMoney } from '@core/utils'
export default {
  filters: {
    changNumber(val) {
      return handleMoney(val)
    }
  },
  mixins: [table, pagination],
  data() {
    return {
      count: 0,
      tableData: [],
      loading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      this.loading = true
      if (type === 'query') {
        this.page = 1
        this.size = 10
      }
      const { page, size } = this
      const { id } = this.$route.query
      this.params = {
        page: page - 1,
        size,
        productId: id
      }
      this.tableData = []
      priceChangeList(this.params).then(({ data: { content, total }}) => {
        this.loading = false
        this.count = total
        this.tableData = content
      })
    }
  }
}
</script>

<style lang="less" scoped>
.price-adjust {
  padding: 0 10px;
}
</style>
<style lang="less">
.price-adjust {
  .el-table__body-wrapper {
    max-height: calc(100vh - 250px);
  }
}
</style>
