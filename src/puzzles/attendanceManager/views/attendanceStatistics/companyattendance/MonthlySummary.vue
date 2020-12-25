<template>
  <div class="monthly-summary">
    <div class="search">
      <div class="select">
        <div>
          <span>展示字段</span>
          <el-checkbox v-model="checked">应出勤天数</el-checkbox>
          <el-checkbox v-model="checked">出勤天数</el-checkbox>
          <el-checkbox v-model="checked">工作时长</el-checkbox>
          <el-checkbox v-model="checked">迟到次数</el-checkbox>
          <el-checkbox v-model="checked">迟到时长</el-checkbox>
          <el-checkbox v-model="checked">旷工（迟到）次数</el-checkbox>
          <el-checkbox v-model="checked">旷工（迟到）时长</el-checkbox>
          <el-checkbox v-model="checked">早退次数</el-checkbox>
          <el-checkbox v-model="checked">早退时长</el-checkbox>
        </div>
        <div>
          <span />
          <el-checkbox v-model="checked">旷工（早退）次数</el-checkbox>
          <el-checkbox v-model="checked">旷工（早退）时长</el-checkbox>
          <el-checkbox v-model="checked">旷工天数</el-checkbox>
          <el-checkbox v-model="checked">缺卡次数</el-checkbox>
          <el-checkbox v-model="checked">加班</el-checkbox>
          <el-checkbox v-model="checked">外出</el-checkbox>
          <el-checkbox v-model="checked">出差</el-checkbox>
          <el-checkbox v-model="checked">补卡</el-checkbox>
          <el-checkbox v-model="checked">请假</el-checkbox>
        </div>
        <div class="fill-name">
          <span>月份</span>
          <el-date-picker v-model="value" type="month" placeholder="选择月" />
        </div>
        <div class="fill-name">
          <span>员工</span>
          <el-select v-model="value" placeholder="请选择员工">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <slot name="button" />
        </div>
        <div>
          <slot name="checkbox" />
        </div>
        <div class="fill-name">
          <span>汇总内容</span>
          <el-checkbox v-model="checked">考勤类别</el-checkbox>
          <el-checkbox v-model="checked">考勤日历</el-checkbox>
        </div>
        <div>
          <div>
            <el-button type="primary">查询</el-button>
            <el-button type="primary"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p style="color:#ccc">考勤统计存在延迟，当日考勤建议隔日后再查看</p>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="姓名" width="50" align="center" />
        <el-table-column prop="applicationtype" label="工号" align="center" />
        <el-table-column prop="category" label="应出勤天数" align="center" width="150" />
        <div>
          <slot name="table" />
        </div>
        <el-table-column prop="downtime" label="出勤天数" align="center" width="150" />
        <el-table-column prop="rate" label="工作时长" align="center" width="150" />
        <el-table-column prop="task" label="迟到次数" align="center" />
        <el-table-column prop="task" label="迟到时长" align="center" />
        <el-table-column prop="task" label="旷工（迟到）次数" align="center" width="150" />
        <el-table-column prop="task" label="旷工（迟到）时长" align="center" width="150" />
        <el-table-column prop="task" label="早退次数" align="center" />
        <el-table-column prop="task" label="早退时长" align="center" />
        <el-table-column prop="task" label="旷工（早退）次数" align="center" width="150" />
        <el-table-column prop="task" label="旷工（早退）时长" align="center" width="150" />
        <el-table-column prop="task" label="旷工天数" align="center" />
        <el-table-column prop="task" label="缺卡次数" align="center" />
        <el-table-column prop="task" label="加班" align="center" />
        <el-table-column prop="task" label="外出" align="center" />
        <el-table-column prop="task" label="出差" align="center" />
        <el-table-column prop="task" label="补卡" align="center" />
        <el-table-column label="请假" align="center">
          <el-table-column prop="task" label="事假" align="center" />
          <el-table-column prop="task" label="病假" align="center" />
          <el-table-column prop="task" label="婚假" align="center" />
          <el-table-column prop="task" label="产假" align="center" />
          <el-table-column prop="task" label="年假" align="center" />
          <el-table-column prop="task" label="丧假" align="center" />
          <el-table-column prop="task" label="调休" align="center" />
          <el-table-column prop="task" label="其他" align="center" />
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      value: '',
      checked: false,
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
      ],
      options: []
    }
  },
  methods() {}
}
</script>

<style lang="less">
.monthly-summary {
  .search > .select > .fill-name {
    width:24%;
    .el-date-editor,
    .el-select {
      width: 100%;
    }
  }
}
</style>
