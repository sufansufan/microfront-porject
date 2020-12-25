<template>
  <div class="collection-account">
    <div class="search">
      <div class="select">
        <div>
          <span>归属单位</span>
          <el-select
            v-model="roleValue"
            placeholder="请选择"
            class="fill-name"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="roleValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <span>账户名称</span>
          <el-input
            v-model="input"
            placeholder="任务类型"
          />
        </div>
        <div>
          <div>
            <el-button
              type="primary"
              icon="el-icon-search"
            >查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
      >
        <el-table-column
          type="selection"
          width="40"
        />
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="date"
          label="账户名称"
          align="center"
        />
        <el-table-column
          prop="date"
          label="归属单位"
          align="center"
        />
        <el-table-column
          prop="amount"
          label="当前余额"
          align="center"
        />
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
import pagination from '@core/mixins/pagination'
import { formatMoney } from '../../../../../core/utils/'
export default {
  components: {},
  mixins: [pagination],
  data() {
    return {
      count: 30,
      tableData: [
        {
          index: 1,
          date: '现金账户-1',
          amount: formatMoney(3000)
        }
      ]
    }
  }
}
</script>

<style lang="less">
.collection-account {
  .search {
    .select {
      div {
        .fill-name {
          width: 140px;
          margin-right:2px;
        }
      }
    }
  }
}
</style>
