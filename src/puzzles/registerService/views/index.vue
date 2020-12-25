<template>
  <div class="register-service">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="企业审核" name="enterpriseAudit">
        <enterprise-audit />
      </el-tab-pane>
      <!-- <el-tab-pane label="经销商审核" name="distributorAudit">
        <distributor-audit />
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import EnterpriseAudit from './components/EnterpriseAudit'
// import DistributorAudit from './components/DistributorAudit'
export default {
  name: 'RegisterService',
  components: {
    EnterpriseAudit
    // DistributorAudit
  },
  data() {
    return {
      activeName: 'enterpriseAudit'
    }
  },
  methods: {
    handleClick() {
    }
  }
}
</script>

<style lang="less" scoped>
.register-service {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
}
</style>
