<template>
  <div class="organization-info">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="用户管理" name="baseInfo">
        <base-info :disabled="false" company-type="1" :personnel-id="personnelId" />
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="1ualificationInfo">
        <qualification-info :disabled="false" />
      </el-tab-pane>
    </el-tabs>
    <div v-if="!disabled" class="btn">
      <template v-if="activeName === 'baseInfo'">
        <el-button type="primary" @click="updateInfo">保存</el-button>
      </template>
      <el-button @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import QualificationInfo from './components/QualificationInfo'
export default {
  components: {
    BaseInfo,
    QualificationInfo
  },
  data() {
    return {
      activeName: 'baseInfo',
      personnelId: this.$route.query.id
    }
  }
}
</script>

<style lang="less" scoped>
.organization-info {
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
