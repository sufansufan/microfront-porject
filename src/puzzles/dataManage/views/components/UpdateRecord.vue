<template>
  <div class="update-record">
    <div class="search">
      <div class="select">
        <div>
          <span>资料名称</span>
          <el-input
            v-model="input"
            placeholder="请输入资料名称"
            class="fill-name"
          />
        </div>
        <div>
          <span>资料目录</span>
          <el-input
            v-model="input"
            placeholder="请输入资料目录"
            class="fill-name"
          />
        </div>
        <div>
          <span>更新日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="请选择更新时间（起）"
            end-placeholder="请选择更新时间（止）"
            class="fill-name"
          />
        </div>
        <div>
          <span>更新账户</span>
          <el-input
            v-model="input"
            placeholder="请输入更新账户"
            class="fill-name"
          />
        </div>
        <div>
          <span>更新人</span>
          <el-input
            v-model="input"
            placeholder="请输入更新人"
            class="fill-name"
          />
        </div>
        <div>
          <span>岗位</span>
          <el-input
            v-model="input"
            placeholder="请输入岗位"
            class="fill-name"
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
        default-expand-all
      >
        <el-table-column
          prop="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="name"
          label="资料名称"
          align="center"
          header-align="center"
          sortable
        />
        <el-table-column
          prop="name"
          label="资料目录"
          align="center"
          header-align="center"
          sortable
        />
        <el-table-column
          prop="name"
          label="单位工程名称"
          align="center"
          header-align="center"
          sortable
        />
        <el-table-column
          prop="name"
          label="更新时间"
          align="center"
          header-align="center"
          sortable
        />
        <el-table-column
          prop="name"
          label="更新账户"
          align="center"
          header-align="center"
          sortable
        />
        <el-table-column
          prop="name"
          label="更新人"
          align="center"
          header-align="center"
          sortable
        />
        <el-table-column
          prop="name"
          label="岗位"
          align="center"
          header-align="center"
          sortable
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
export default {
  name: 'UpdateRecord',
  mixins: [pagination],
  data() {
    return {
      value1: '',
      tableData: [
        {
          index: '1',
          name: 'xxxxxxxxxx'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .update-record {
    .search > .select > div {
      margin-right: 0;
      width: 25%;
    }
    .fill-name {
      width: 380px;
    }
    .fill-text {
      width: 189px;
    }
    .ascription {
      margin-right: 2px;
    }
  }
</style>
