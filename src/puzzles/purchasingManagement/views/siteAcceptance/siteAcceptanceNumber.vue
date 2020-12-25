<template>
  <div class="site-acceptance-number">
    <div class="search">
      <div class="btn">
        <el-button-group>
          <el-button class="back-btn" @click="backGo()"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
        </el-button-group>
        <div class="head-title">1清测试合同显示字段长度的合同哈哈还哈哈1清测试合同显示字段长度的合同哈哈还哈哈1清测试合同显示字段长度的合同哈哈还哈哈1清测试合同显示字段长度的合同哈哈还哈哈1清测试合同显示字段长度的合同哈哈还哈哈</div>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <base-information />
      </el-tab-pane>
      <el-tab-pane label="材料入库清单" name="second">
        <in-going-list @changeTabConent="changeTabConent" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BaseInformation from './components/BaseInformation'
import InGoingList from './components/InGoingList'
export default {
  components: { BaseInformation, InGoingList },
  data() {
    return {
      activeName: 'first',
      deliveryState: 'default',
      title: 'deliveryState'
    }
  },
  methods: {
    backGo() {
      this.$router.push('/purchasingManagement/siteAcceptance')
    }
  }
}
</script>

<style lang="less" scoped>
  .site-acceptance-number {
    .btn {
      display: flex;
      .head-title {
        text-align: center;
        flex: 1;
        margin-left: 10px;
        font: 600 18px/30px '微软雅黑';
      }
    }

  }
</style>
