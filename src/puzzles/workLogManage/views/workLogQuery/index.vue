<template>
  <div class="work-log-query">
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <template>
            <total-log />
          </template>
        </el-tab-pane>
        <el-tab-pane
          label="工作日志"
          name="second"
        >
          <template>
            <work-log />
          </template>
        </el-tab-pane>
        <el-tab-pane
          label="施工日志"
          name="three"
        >
          <template>
            <construction-log />
          </template>
        </el-tab-pane>
        <el-tab-pane
          label="安全日志"
          name="four"
        >
          <template>
            <safety-log />
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import TotalLog from './components/totalLog'
import WorkLog from './components/workLog'
import ConstructionLog from './components/constructionLog'
import SafetyLog from './components/safetyLog'
export default {
  name: 'Index',
  components: {
    SafetyLog,
    ConstructionLog,
    WorkLog,
    TotalLog
  }
}
</script>

<style lang="less" scoped>
  .work-log-query {
    padding: 20px;
  }
</style>
