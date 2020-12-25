<template>
  <div class="monitoring-playback">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="项目监控" name="first">
        <div class="tabs-content">
          <project-monitoring />
        </div>
      </el-tab-pane>
      <el-tab-pane label="办公室监控" name="second">
        <div class="tabs-content">
          <office-monitoring />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProjectMonitoring from './components/projectmonitoring'
import OfficeMonitoring from './components/officemonitoring'
export default {
  components: {
    ProjectMonitoring,
    OfficeMonitoring
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang='less'>
.monitoring-playback{
	padding: 10px;
  height: calc(100vh - 120px);
  overflow-y: scroll;
}

</style>
