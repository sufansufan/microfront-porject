<template>
  <div class="outgoing-single-number">
    <div class="search">
      <div class="btn">
        <el-button-group>
          <el-button class="back-btn" @click="backGo()">返回</el-button>
        </el-button-group>
        <div class="head-title">1清测试合同显示字段长度的合同哈哈还哈哈1清测试合同显示字段长度的合同哈哈还哈哈1清测试合同显示字段长度的合同哈哈还哈哈1清测试合同显示字段长度的合同哈哈还哈哈1清测试合同显示字段长度的合同哈哈还哈哈</div>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <base-information />
      </el-tab-pane>
      <el-tab-pane label="材料出库清单" name="second">
        <out-going-list />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BaseInformation from './components/BaseInformation'
import OutGoingList from './components/OutGoingList'
export default {
  components: { BaseInformation, OutGoingList },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    backGo() {
      this.$router.push('/purchasingManagement/materialOutStock')
    }
  }
}
</script>

<style lang="less" scoped>
  .outgoing-single-number {
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
