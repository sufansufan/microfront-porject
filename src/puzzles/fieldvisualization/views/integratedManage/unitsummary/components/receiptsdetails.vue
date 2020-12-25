<template>
  <div class="receipts-details">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>合同编号</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>项目名称</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>收款日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="fill-name">
          <span>收款方式</span>
          <el-select
            v-model="value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary">打印</el-button>
            <el-button type="primary"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </el-button-group>
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
          prop="applicationtype"
          label="合同编号"
          align="center"
        />

        <el-table-column
          prop="type"
          align="center"
          label="项目名称"
          width="200"
        />
        <el-table-column
          prop="category"
          label="建设单位"
          align="center"
        />
        <el-table-column
          prop="downtime"
          label="归属单位"
          align="center"
        />
        <el-table-column
          prop="rate"
          label="收款日期"
          align="center"
          width="150"
        />
        <el-table-column
          prop="task"
          label="收款方式"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="收款金额"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="支票号"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="发票编号"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="备注"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="状态"
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

  </div></template>

<script>
import pagination from '@core/mixins/pagination'
export default {
  components: {

  },
  mixins: [pagination],
  data() {
    return {
      count: 30,
      tableData: [
        {
          index: '1',
          number: '借款申请',
          type: '借款审批',
          approvalType: 'reimbursementApproval',
          category: '定时',
          downtime: '提前1月',
          rate: '一次',
          task: '否',
          vestingunit: '第一分公司',
          receiver: '行政专员，办公室主任',
          available: '是',
          name: '资质（资质编号）将于有效期到期，请处理相关事宜！',
          deploy: '是',
          updatetime: '2020.01.01'
        }]

    }
  }
}
</script>

<style lang="less">
.receipts-details{
  .search{
    .select{
      .fill-name{
        width:46%;
      }
      .el-range-editor,.el-select{
        width:100%;
      }

    }

  }
}
</style>
