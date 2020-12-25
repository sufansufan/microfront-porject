<template>
  <div class="employee-info">

    <el-tabs v-model="activeName" type="card" class="one-card-tabs" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="baseInfo">
        <base-info ref="baseInfo" :disabled="disabled" :personnel-id="personnelId" />
      </el-tab-pane>
      <el-tab-pane label="任职信息" name="postInfo">
        <post-info ref="postInfo" :disabled="disabled" :personnel-id="personnelId" />
      </el-tab-pane>
      <el-tab-pane label="合同信息" name="contractInfo">
        <contract-info ref="contractInfo" :disabled="disabled" :personnel-id="personnelId" />
      </el-tab-pane>
      <el-tab-pane label="持证信息" name="cardInfo">
        <card-info ref="cardInfo" :disabled="disabled" :personnel-id="personnelId" />
      </el-tab-pane>
      <el-tab-pane name="last">
        <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
      </el-tab-pane>
    </el-tabs>
    <div v-if="!disabled" class="btn">
      <template v-if="activeName === 'baseInfo'">
        <el-button type="primary" @click="updateInfo">保存</el-button>
      </template>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import PostInfo from './components/PostInfo'
import ContractInfo from './components/ContractInfo'
import CardInfo from './components/CardInfo'
export default {
  name: 'EmployeeInfo',
  components: {
    BaseInfo,
    PostInfo,
    ContractInfo,
    CardInfo
  },
  data() {
    return {
      activeName: this.$route.query.contractInfo || 'baseInfo',
      disabled: true,
      personnelId: this.$route.query.id,
      querySearch: this.$route.query.search
    }
  },
  created() {
    const { type } = this.$route.query
    this.disabled = type === 'see'
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'employeeManage' })
    },
    updateInfo() {
      this.$refs.baseInfo.addOrEdit()
    },
    handleClick(tab) {
      console.log(tab.name)
      if (tab.name === 'postInfo') {
        this.$refs.postInfo.fetchData()
      } else if (tab.name === 'last') {
        this.$router.go(-1)
      } else if (tab.name === 'baseInfo') {
        this.$refs.baseInfo.fetchData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.employee-info {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .btn {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
  }
}
</style>
