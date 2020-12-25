<template>
  <div class="attendance-plan">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="公司考勤方案" name="first">
        <div class="tab-content">
          <template v-if="companyplan === 'default'">
            <company-attendance-plan @changeTabConent="changeTabConent" />
          </template>
          <template v-if="companyplan === 'add'">
            <new-company-attendance @changeTabConent="changeTabConent" />
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane label="项目考勤方案" name="second">
        <div class="tab-content">
          <template v-if="companyplan === 'default'">
            <project-attendance-scheme @changeTabConent="changeTabConent" />
          </template>
          <template v-if="companyplan === 'details'">
            <new-company-attendance @changeTabConent="changeTabConent" />
          </template>

        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import CompanyAttendancePlan from '../attendanceplan/CompanyAttendancePlan'
import ProjectAttendanceScheme from '../attendanceplan/ProjectAttendanceScheme'
import NewCompanyAttendance from '../attendanceplan/NewCompanyAttendance'
export default {
  components: {
    CompanyAttendancePlan,
    ProjectAttendanceScheme,
    NewCompanyAttendance
  },
  data() {
    return {
      activeName: 'first',
      companyplan: 'default',
      projectplan: 'default'

    }
  },
  methods: {
    handleClick(tab, event) {
      this.companyplan = 'default'
      this.projectplan = 'default'
    },
    changeTabConent(type, status) {
      switch (type) {
        case 'companyplan':
          this.companyplan = status
          break
        case 'projectplan':
          this.projectplan = status
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.attendance-plan {
  .tab-content {
    overflow-y: auto;
    height: calc(100vh - 262px);
    padding-right: 10px;
  }

}
</style>
