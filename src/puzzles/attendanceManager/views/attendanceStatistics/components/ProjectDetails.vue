<template>
  <div class="project-details">
    <div style="margin-bottom:20px;" class="name">
      <el-button class="back-btn" @click="$emit('changeTabConent', 'project', 'default')"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      <h2>项目名称</h2>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="考勤汇总" name="first">
        <div class="tab-content">
          <AttendanceSummary ref="AttendanceSummary">
            <div slot="button">
              <el-checkbox v-model="checked">已退出员工</el-checkbox>
            </div>
            <div slot="message">
              <p>考勤统计存在延迟，当日考勤建议隔日后再查看</p>
            </div>
          </AttendanceSummary>
        </div>
      </el-tab-pane>
      <el-tab-pane label="月度汇总" name="second">
        <div class="tab-content">
          <MonthlySummary ref="MonthlySummary">
            <div slot="checkbox">
              <div class="fill-name">
                <span />
                <el-checkbox v-model="checked">已退出员工</el-checkbox>
              </div>
            </div>
          </MonthlySummary>
        </div>
      </el-tab-pane>
      <el-tab-pane label="打卡记录" name="third">
        <div class="tab-content">
          <DailyAttendanceRecord ref="DailyAttendanceRecord">
            <div slot="checkbox">
              <div class="fill-name">
                <span />
                <el-checkbox v-model="checked">已退出员工</el-checkbox>
              </div>
            </div>
          </DailyAttendanceRecord>
        </div>
      </el-tab-pane>
      <el-tab-pane label="申请汇总" name="fourth">
        <div class="tab-content">
          <application-summary />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AttendanceSummary from '../companyattendance/AttendanceSummary'
import MonthlySummary from '../companyattendance/MonthlySummary'
import DailyAttendanceRecord from '../companyattendance/DailyAttendanceRecord'
import ApplicationSummary from '../companyattendance/ApplicationSummary'

export default {
  components: {
    AttendanceSummary,
    MonthlySummary,
    DailyAttendanceRecord,
    ApplicationSummary
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
    }
  }
}
</script>

<style lang="less" scoped>
.project-details{
  .tab-content {
    overflow-y: auto;
    height: calc(100vh - 222px);
    padding-right: 10px;
  }
  .name{
      display:flex;
      .el-button{
          width:4%;
      }
      h2{
          flex:1;
          text-align: center;
      }
  }
}
</style>
