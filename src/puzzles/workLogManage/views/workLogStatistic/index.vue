<template>
  <div class="work-log-statistic">
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="日志汇总" name="first">
          <template>
            <log-summary />
          </template>
        </el-tab-pane>
        <el-tab-pane
          label="项目日志统计"
          name="second"
        >
          <template>
            <project-log-statistics />
          </template>
        </el-tab-pane>
        <el-tab-pane
          label="个人日志统计"
          name="three"
        >
          <template>
            <personal-log-statistics />
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import LogSummary from './components/logSummary'
import ProjectLogStatistics from './components/projectLogStatistics'
import PersonalLogStatistics from './components/personalLogStatistics'
export default {
  name: 'Index',
  components: { PersonalLogStatistics, ProjectLogStatistics, LogSummary }
}
</script>

<style lang="less" scoped>
  .work-log-statistic {
    padding: 20px;
  }
</style>
