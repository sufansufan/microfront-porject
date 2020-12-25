<template>
  <div class="log-submit">
    <div>
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <h2 style="padding:15px 0 15px 40px;">公司日志提交流程</h2>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.log-submit{
  height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 10px;

}
</style>
