<template>
  <div class="detail-box">
    <div class="go-back">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="报销信息" name="first">
        <reimbursement-info :disable="true" />
      </el-tab-pane>
      <el-tab-pane label="发票信息" name="two">
        <invoice-info />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ReimbursementInfo from './components/ReimbursementInfo'
import InvoiceInfo from './components/InvoiceInfo'
export default {
  name: 'Detail',
  components: {
    ReimbursementInfo,
    InvoiceInfo
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
.detail-box {
  padding: 20px;
  height: calc(100vh - 160px);
  overflow-y: auto;
  .go-back {
    margin-bottom: 20px;
  }
}
</style>

<style lang="less">
.detail-box {
  .el-tabs__header {
    margin-bottom: 0px !important;
  }
}
</style>
