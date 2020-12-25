<template>
  <div class="attendance-statistics">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="我的考勤" name="first">
        <div class="tab-content">
          <my-attendance />
        </div>
      </el-tab-pane>
      <el-tab-pane label="公司考勤" name="second">
        <div class="tab-content">
          <company-attendance />
        </div>
      </el-tab-pane>
      <el-tab-pane label="项目考勤" name="third">
        <div class="tab-content">
          <template v-if="project === 'default'">
            <project-attendance @changeTabConent="changeTabConent" />
          </template>
          <template v-if="project === 'details'">
            <project-details @changeTabConent="changeTabConent" />
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工人考勤" name="fourth">
        <div class="tab-content">
          <workers-attendance />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MyAttendance from './components/MyAttendance'
import CompanyAttendance from './components/CompanyAttendance'
import ProjectAttendance from './components/ProjectAttendance'
import WorkersAttendance from './components/WorkersAttendance'
import ProjectDetails from './components/ProjectDetails'

export default {
  components: {
    MyAttendance,
    CompanyAttendance,
    ProjectAttendance,
    WorkersAttendance,
    ProjectDetails
  },
  data() {
    return {
      activeName: 'first',
      materialname: 'default',
      project: 'default'
    }
  },
  methods: {
    handleClick(tab, event) {
      this.materialname = 'default'
      this.project = 'default'
    },

    changeTabConent(type, status) {
      switch (type) {
        case 'materialname':
          this.materialname = status
        case 'project':
          this.project = status
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.attendance-statistics {
  padding: 10px;
  .tab-content {
    overflow-y: auto;
    height: calc(100vh - 172px);
    padding-right: 10px;
  }

}
</style>
