<template>
  <div class="go-notify">

    <p class="text">当前考勤方案:【主测日志公司员工考勤】【一天一班:8:30~17:30（休息:12:00 ~13:00）】</p>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="打卡记录"
        name="first"
      >
        <go-more />
      </el-tab-pane>
      <el-tab-pane
        label="考勤记录"
        name="second"
      />
    </el-tabs>
  </div>
</template>

<script>
import GoMore from './components/GoMore'
export default {
  components: { GoMore },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
.go-notify {
  padding: 10px;
  .text {
    padding: 14px 0;
  }
}
</style>
