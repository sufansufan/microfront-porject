<template>
  <div class="organization-info">
    <div>
      <el-tabs v-model="activeName" type="card" class="one-card-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="baseInfo">
          <base-info :disabled="true" company-type="1" :personnel-id="personnelId" @pushDepartmentStatus="getDepStatus" @childEvent="fromChild" />
        </el-tab-pane>
        <el-tab-pane v-if="depStatus" label="资质信息" name="1ualificationInfo">
          <qualification-info :disabled="true" :personnel-id="personnelId" :org-name="orgName" />
        </el-tab-pane>
        <el-tab-pane name="last">
          <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import QualificationInfo from './components/QualificationInfo'
import tabs from '@core/mixins/tabs'
export default {
  components: {
    BaseInfo,
    QualificationInfo
  },
  mixins: [tabs],
  data() {
    return {
      activeName: 'baseInfo',
      personnelId: this.$route.query.id,
      depStatus: null
    }
  },
  computed: {

  },
  created() {
  },
  methods: {
    fromChild(data) {
      this.orgName = data
    },
    getDepStatus(msg) {
      this.depStatus = msg
    }
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
