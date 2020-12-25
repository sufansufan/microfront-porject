<template>
  <div class="attendance-summary">
    <div class="search">
      <div class="select">
        <div>
          <span>月份</span>
          <el-date-picker
            v-model="value"
            type="month"
            placeholder="选择月"
          />
        </div>
        <div>
          <el-checkbox v-model="checked">离职员工</el-checkbox>
        </div>
        <div>
          <el-button
            type="primary"
            icon="el-icon-search"
          >查询</el-button>
          <el-button type="primary"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
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
          label="编号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="applicationtype"
          label="组织"
          align="center"
        />

        <el-table-column
          prop="type"
          align="center"
          label="人数"
          width="150"
        />
        <el-table-column
          prop="category"
          label="应出勤（天）"
          align="center"
          width="150"
        />
        <el-table-column
          prop="downtime"
          label="出勤（天）"
          align="center"
          width="150"
        />
        <el-table-column
          prop="rate"
          label="出勤率（%）"
          align="center"
          width="150"
        />
        <el-table-column
          prop="task"
          label="外出时长"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="出差时长"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="请假时长"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="加班时长"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="旷工（天）"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="迟到（人次）"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="旷工（迟到）（人次）"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="早退（人次）"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="旷工（早退）（人次）"
          align="center"
          width="150"
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
    <div>
      <p>考勤统计存在延迟，当日考勤建议隔日后再查看</p>
      <p>出勤（天）:当天打卡或有审批通过的外出、出差考勤申请，则出勤（天）j记为一天</p>
      <p />
    </div>
  </div>

</template>

<script>
import pagination from '@core/mixins/pagination'
export default {
  components: {},
  mixins: [pagination],
  data() {
    return {
      value: '',
      checked: false,
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
        }
      ]
    }
  },
  methods() {
  }
}
</script>

<style lang="less" scoped>
.attendance-summary{
  p{
      color:#cccccc;
  }
}
</style>
