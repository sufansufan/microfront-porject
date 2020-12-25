<template>
  <div class="company-attendance">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="考勤汇总" name="first">
        <div class="tab-content">
          <attendance-summary ref="AttendanceSummary">
            <div slot="button">
              <el-checkbox v-model="checked">离职员工</el-checkbox>
            </div>
            <div slot="table">
              <el-table-column prop="applicationtype" label="组织" align="center" />
            </div>
            <div slot="text">
              <p>考勤统计存在延迟，当日考勤建议隔日后再查看</p>
              <p>出勤（天）:当天打卡或有审批通过的外出、出差考勤申请，则出勤（天）j记为一天</p>
            </div>
          </attendance-summary>
        </div>
      </el-tab-pane>
      <el-tab-pane label="月度汇总" name="second">
        <div class="tab-content">
          <monthly-summary ref="MonthlySummary">
            <div slot="button">
              <div class="fill-name">
                <span>部门</span>
                <el-select v-model="value" placeholder="请选择部门">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div slot="checkbox">
              <div class="fill-name">
                <span />
                <el-checkbox v-model="checked">离职员工</el-checkbox>
              </div>
            </div>
            <div slot="table">
              <el-table-column prop="type" align="center" label="组织" width="150" />
            </div>
          </monthly-summary>
        </div>
      </el-tab-pane>
      <el-tab-pane label="打卡记录" name="third">
        <div class="tab-content">
          <daily-attendance-record ref="DailyAttendanceRecord">
            <div slot="button">
              <div class="fill-name">
                <span>部门</span>
                <el-select v-model="value" placeholder="请选择部门" style="width:80%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div slot="checkbox">
              <div class="fill-name">
                <span />
                <el-checkbox v-model="checked">离职员工</el-checkbox>
              </div>
            </div>
            <div slot="table">
              <el-table-column prop="type" align="center" label="组织" width="150" />
            </div>
          </daily-attendance-record>
        </div>
      </el-tab-pane>
      <el-tab-pane label="申请汇总" name="fourth">
        <div class="tab-content">
          <application-summary ref="ApplicationSummary">
            <div slot="button">
              <div class="fill-name">
                <span>部门</span>
                <el-select v-model="value" placeholder="请选择部门">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
          </application-summary>
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
      activeName: 'first',
      materialname: 'default'
    }
  },
  methods: {
    handleClick(tab, event) {
      this.materialname = 'default'
    },

    changeTabConent(type, status) {
      switch (type) {
        case 'materialname':
          this.materialname = status
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.company-attendance {
  .tab-content {
    overflow-y: auto;
    height: calc(100vh - 222px);
    padding-right: 10px;
  }
}
</style>
