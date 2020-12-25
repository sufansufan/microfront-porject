<template>
  <div class="view-applications">
    <div class="btn">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <template>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="申请信息" name="first">
          <div class="tabs-content">
            <application-information />
          </div>
        </el-tab-pane>
        <el-tab-pane label="印证明细" name="second">
          <div class="tabs-content">
            <confirmation-details />
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import ApplicationInformation from './components/applicationinformation'
import ConfirmationDetails from './components/confirmationdetails'
export default {
  components: {
    ApplicationInformation,
    ConfirmationDetails
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="less" scoped>
.view-applications{
  padding: 10px;
  .btn {
    margin-bottom: 10px;
  }
  .tabs-content {
    height: 70vh;
    overflow-y: auto;
    padding-right: 10px;
  }
}
</style>
