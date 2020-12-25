<template>
  <div class="organization-info">
    <el-tabs v-model="activeName" type="card" class="one-card-tabs" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="baseInfo">
        <base-info ref="baseInfo" :disabled="false" :organization-id="organizationId" company-type="1" :personnel-id="personnelId" @pushDepartmentStatus="getDepStatus" @childEvent="fromChild" />
      </el-tab-pane>
      <el-tab-pane v-if="depStatus" label="资质信息" name="qualificationInfo">
        <qualification-info :disabled="false" :organization-id="organizationId" :personnel-id="personnelId" :org-name="orgName" />
      </el-tab-pane>
      <el-tab-pane name="last">
        <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
      </el-tab-pane>
    </el-tabs>
    <div class="btn">
      <template v-if="activeName === 'baseInfo'">
        <el-button type="primary" @click="updateInfo">保存</el-button>
      </template>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import QualificationInfo from './components/QualificationInfo'
import tabs from '@core/mixins/tabs'
import { getQualification } from '@core/api/qualification'
export default {
  components: {
    BaseInfo,
    QualificationInfo
  },
  mixins: [tabs],
  data() {
    return {
      activeName: 'baseInfo',
      personnelId: this.$route.query.id || '',
      depStatus: null,
      orgName: '',
      organizationId: ''
    }
  },
  computed: {

  },
  created() {
    if (this.$route.query.qualificationId) {
      this.getDetails()
    } else if (this.$route.query.organizationId) {
      this.personnelId = this.$route.query.organizationId
    }
  },
  methods: {
    fromChild(data) {
      this.orgName = data
    },
    // 获取当前资质信息
    getDetails() {
      getQualification(this.$route.query.qualificationId).then(({ data }) => {
        if (data) {
          this.organizationId = data.organizationId
          this.personnelId = data.organizationId
          this.activeName = 'qualificationInfo'
        } else {
          this.$message.warning('该资质已被删除')
          this.$router.go(-1)
        }
      })
    },
    updateInfo() {
      this.$refs.baseInfo.addOrEdit().then(res => {
        this.$router.replace({ path: '/orgStructure/orgManage' })
      })
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
  .btn {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
  }
}
</style>
