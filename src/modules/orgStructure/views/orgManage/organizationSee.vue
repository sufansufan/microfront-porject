<template>
  <div class="organization-info">
    <div>
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
    <div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="用户管理" name="baseInfo">
          <base-info :disabled="true" company-type="1" :personnel-id="personnelId" />
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="1ualificationInfo">
          <qualification-info :disabled="true" />
        </el-tab-pane>
      </el-tabs>
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
  },
  created() {
  }
}
</script>

<style lang="less" scoped>
.organization-info {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  & > div {
    &:first-child {
      margin-bottom: 10px;
    }
  }
}
</style>
