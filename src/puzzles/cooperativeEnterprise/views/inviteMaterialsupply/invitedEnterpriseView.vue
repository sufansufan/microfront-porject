<template>
  <div class="enterprise-view">
    <div>
      <el-tabs v-model="activeName" type="card" class="one-card-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="baseInfo">
          <base-info :disabled="true" company-type="1" :lately-id="latelyId" :type="type" :operateinfo-id="operateinfoId" :organization-list="organizationList" />
        </el-tab-pane>
        <el-tab-pane label="银行信息" name="bankAccount">
          <bank-account :disabled="true" :lately-id="latelyId" :type="type" :operateinfo-id="operateinfoId" />
        </el-tab-pane>
        <el-tab-pane label="资质证书" name="Certification">
          <certification :disabled="true" :lately-id="latelyId" :type="type" :operateinfo-id="operateinfoId" />
        </el-tab-pane>
        <el-tab-pane label="签订合同" name="SignAContract">
          <sign-contract :disabled="true" :enterprise-id="enterpriseId" />
        </el-tab-pane>
        <el-tab-pane label="合作项目" name="JointProject">
          <joint-project :disabled="true" :enterprise-id="enterpriseId" />
        </el-tab-pane>
        <el-tab-pane name="last">
          <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import BaseInfo from '../invitecomponents/BaseInfo'
import BankAccount from '../invitecomponents/BankAccount'
import Certification from '../invitecomponents/Certification'
import SignContract from '../components/SignContract'
import JointProject from '../components/JointProject'
import tabs from '@core/mixins/tabs'
export default {
  name: 'EnterpriseView',
  components: {
    BaseInfo,
    BankAccount,
    Certification,
    SignContract,
    JointProject

  },
  mixins: [tabs],
  data() {
    return {
      activeName: 'baseInfo',
      enterpriseId: this.$route.query.id,
      sign: this.$route.query.sign,
      cooperation: this.$route.query.cooperation,
      operateinfoId: this.$route.query.operateinfoId,
      type: this.$route.query.type,
      serviceId: this.$route.query.serviceId,
      latelyId: this.$route.query.latelyId,
      organizationList: this.$route.query.organizationList
    }
  },
  created() {
    if (this.sign) {
      this.activeName = 'SignAContract'
    } else if (this.cooperation) {
      this.activeName = 'JointProject'
    } else {
      return
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.enterprise-view {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  & > div {
    &:first-child {
      margin-bottom: 10px;
    }
  }
  // .el-button{
  //   position:absolute;
  //   left:520px;
  //   top:140px;
  // }
}
</style>
