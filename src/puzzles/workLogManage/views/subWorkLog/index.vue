<template>
  <div class="sub-work-log">
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="未读日志" name="first">
          <template>
            <un-read-work-log />
          </template>
        </el-tab-pane>
        <el-tab-pane
          label="已读日志"
          name="second"
        >
          <template>
            <readed-work-log />
          </template>
        </el-tab-pane>
        <el-tab-pane
          label="关注日志"
          name="three"
        >
          <template>
            <followed-work-log />
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import UnReadWorkLog from './components/unReadWorkLog'
import ReadedWorkLog from './components/readedWorkLog'
import FollowedWorkLog from './components/followedWorkLog'
export default {
  name: 'Index',
  components: {
    UnReadWorkLog,
    ReadedWorkLog,
    FollowedWorkLog
  }
}
</script>

<style lang="less" scoped>
  .sub-work-log {
    padding: 20px;
  }
</style>
