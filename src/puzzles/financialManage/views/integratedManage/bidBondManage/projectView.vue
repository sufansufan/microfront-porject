<template>
  <div class="project-view">
    <div class="btn">
      <el-button class="back-btn" type="return" @click="back"><i class="iconfont icon-fanhui-copy" />返回</el-button>
    </div>
    <div class="info">
      <information />
    </div>
    <crumb-box>收付款明细列表</crumb-box>
    <component :is="compomentName" @changeComName="changeComName" />
  </div>
</template>
<script>
import Information from './components/Information'
import ReceivePayment from './components/ReceivePayment'
import ReceivePaymentAdd from './components/ReceivePaymentAdd'
export default {
  name: 'ProjectView',
  components: {
    Information,
    ReceivePayment,
    ReceivePaymentAdd
  },
  data() {
    return {
      compomentName: 'ReceivePayment'
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    changeComName(data) {
      this.compomentName = data
    }
  }
}
</script>
<style lang="less" scoped>
.project-view {
  margin-bottom: 10px;
  .btn {
    margin-bottom: 10px;
  }
  .crumb-box {
    display: flex;
    justify-content: center;
    margin: 0 10px;
  }
}
</style>
