<template>
  <div class="all-purchase-orders">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>近半年订单</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>订单关键字</span>
          <el-input v-model="number" placeholder="请输入" />
        </div>
        <div class="fill-name">
          <span>供应商名称</span>
          <el-input v-model="number" placeholder="请输入" />
        </div>
        <div class="fill-name">
          <span>下单时间</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="选择起始日期"
            end-placeholder="选择截止日期"
          />
        </div>
        <div>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="primary" icon="el-icon-plus"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="id" label="序号" width="50" align="center" />
        <el-table-column prop="id" label="订单编号" width="100" sortable align="center" />
        <el-table-column prop="name" label="项目名称" width="100" sortable align="center" />
        <el-table-column prop="name" label="下单时间" width="100" sortable align="center" />
        <el-table-column prop="id" label="供应商名称" width="100" sortable align="center" />
        <el-table-column prop="name" label="联系人" align="center" />
        <el-table-column prop="servicename" label="总金额" width="100" sortable align="right" header-align="center" />
        <el-table-column prop="rule" label="付款方式" width="100" sortable align="center" header-align="center" />
        <el-table-column prop="rule" label="已付金额" width="100" sortable align="right" header-align="center" />
        <el-table-column prop="rule" label="未付金额" width="100" sortable align="right" header-align="center" />
        <el-table-column prop="rule" label="订单状态" align="right" header-align="center" />
        <el-table-column prop="rule" label="操作" align="center" header-align="center" fixed="right" />
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
  components: {

  },
  mixins: [pagination],
  data() {
    return {
      count: 30,
      number: 11,
      tableData: [
      ],
      ruleform: {
        number: ''
      }

    }
  }
}
</script>

<style lang="less" scoped>
.all-purchase-orders {
  .search {
    .select {
      .fill-name {
        width:30%;
        span {
          min-width: 72px;
        }
      }
      .el-range-editor,.el-select {
        width:100%;
      }
    }
  }
  .form-top {
    margin-top:20px;
  }
}
</style>
