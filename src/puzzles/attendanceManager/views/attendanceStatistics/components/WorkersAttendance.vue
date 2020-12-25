<template>
  <div class="workers-attendance">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="考勤统计" name="first">
        <div class="tab-content">
          <attendance-statistics />
        </div>
      </el-tab-pane>
      <el-tab-pane label="打卡记录" name="second">
        <div class="tab-content">
          <daily-attendance-record />
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import AttendanceStatistics from '../workersattendance/AttendanceStatistics'
import DailyAttendanceRecord from '../workersattendance/DailyAttendanceRecord'
export default {
  components: {
    AttendanceStatistics,
    DailyAttendanceRecord
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
.workers-attendance {
  .tab-content {
    overflow-y: auto;
    height: calc(100vh - 222px);
    padding-right: 10px;
  }

}
</style>
