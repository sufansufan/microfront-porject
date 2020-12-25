<template>
  <div class="work-log-detail">
    <div>
      工作日志（提交）
    </div>
    <el-form label-width="110px" :rules="rules" :model="ruleform" class="resorce-form">
      <el-form-item label="日期" prop="dateofpayment">
        <el-input v-model="ruleform.dateofpayment" placeholder="请输入" class="full-width" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'WorkLogDetail'
}
</script>

<style lang="less" scoped>
.work-log-detail {
  padding: 20px;
}
</style>
