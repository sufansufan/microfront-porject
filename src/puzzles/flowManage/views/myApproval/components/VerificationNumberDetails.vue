<template>
  <div class="verificationnumber-details">
    <div class="btn">
      <el-button class="back-btn" @click="$emit('changeTabConent', 'siteacceptance', 'default')"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <div class="text">
      <strong>测试申请用款App</strong>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <div class="tab-content">
          <essential-information />
        </div>
      </el-tab-pane>
      <el-tab-pane label="材料入库清单" name="second">
        <div class="tab-content">
          <material-warehousing-list />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import EssentialInformation from '../verificationnumberdetails/EssentialInformation'
import MaterialWarehousingList from '../verificationnumberdetails/MaterialWarehousingList'

export default {
  components: {
    EssentialInformation,
    MaterialWarehousingList
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {}
  }
}
</script>
<style lang="less" scoped>
.verificationnumber-details {
  padding: 10px;
  .btn {
    margin-bottom: 10px;
  }
  .text {
    text-align: center;
    font-size: 20px;
    line-height:20px;
    margin-bottom:10px;
  }
}
</style>
