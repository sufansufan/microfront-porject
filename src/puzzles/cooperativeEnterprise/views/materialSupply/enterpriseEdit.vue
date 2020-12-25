<template>
  <div class="enterprise-edit">
    <div class="title">{{ orgName }}</div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本信息" name="baseInfo">
        <base-info ref="baseInfo" :disabled="false" :enterprise-id="enterpriseId" @childEvent="fromChild" />
      </el-tab-pane>
      <el-tab-pane label="银行信息" name="bankAccount">
        <bank-account :disabled="false" :enterprise-id="enterpriseId" :org-name="orgName" />
      </el-tab-pane>
      <el-tab-pane label="资质证书" name="Certification">
        <certification :disabled="false" :enterprise-id="enterpriseId" />
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
import BaseInfo from '../components/BaseInfo'
import BankAccount from '../components/BankAccount'
import Certification from '../components/Certification'
export default {
  components: {
    BaseInfo,
    BankAccount,
    Certification
  },
  data() {
    return {
      activeName: 'baseInfo',
      enterpriseId: this.$route.query.id,
      orgName: ''
    }
  },
  created() {

  },
  methods: {
    fromChild(data) {
      this.orgName = data
    },
    updateInfo() {
      this.$refs.baseInfo.addOrEdit().then(res => {
        this.$message.success('修改成功')
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.enterprise-edit {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
   .title{
      text-align: center;
      font-size:16px;
      font-weight: 700;
      color:#000;
      font-style: normal;
    }
  .btn {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
  }
}
</style>
