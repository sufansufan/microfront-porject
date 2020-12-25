<template>
  <div class="fuelcard-information">
    <div style="margin-bottom:10px;">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" />  返回</el-button>
    </div>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="基本信息"
        name="first"
      >
        <essential-information />

      </el-tab-pane>
      <el-tab-pane
        label="充值记录"
        name="second"
      >
        <recharge-record />
      </el-tab-pane>
      <el-tab-pane
        label="使用记录"
        name="third"
      >
        <usage-record />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import EssentialInformation from './components/essentialinformation'
import RechargeRecord from './components/rechargerecord'
import UsageRecord from './components/usagerecord'

export default {
  components: {
    EssentialInformation,
    RechargeRecord,
    UsageRecord
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    changeTab(status) {
      this.$emit('changeTabBank', 'material', status)
    }
  }
}
</script>
<style lang="less" scoped>
.fuelcard-information {
  padding:20px;
  height: calc(100vh - 120px);
  overflow-y: scroll;
}
</style>
