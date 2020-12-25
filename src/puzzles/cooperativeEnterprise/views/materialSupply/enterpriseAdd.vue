<template>
  <div class="enterprise-add">
    <jdy-steps :action="action">
      <jdy-step title="基本信息" />
      <jdy-step title="银行账号" />
      <jdy-step title="资质证书" />
    </jdy-steps>
    <div class="title">{{ orgName }}</div>
    <keep-alive>
      <template v-if="action===0">
        <base-info ref="baseInfo" :disabled="disabled" :code="code" :enterprise-id="enterpriseId" :organization-list="organizationList" />
      </template>
      <template v-if="action===1">
        <bank-account ref="bankAccount" :disabled="disabled" :enterprise-id="enterpriseId" :org-name="orgName" />
      </template>
      <template v-if="action===2">
        <certification ref="certification" :org-name="orgName" :disabled="disabled" :enterprise-id="enterpriseId" />
      </template>
    </keep-alive>
    <div class="steps-action">
      <template v-if="action===0">
        <el-button
          type="primary"
          @click="saveAndNext('down')"
        > 下一步</el-button>
        <el-button
          type="primary"
          @click="saveAndNext('save')"
        >保存</el-button>
      </template>
      <template v-if="action===1">
        <el-button type="primary" @click="config('reduce')">上一步</el-button>
        <el-button type="primary" @click="config('add')">下一步</el-button>
      </template>
      <template v-if="action===2">
        <el-button type="primary" @click="config('reduce')">上一步</el-button>
        <el-button type="primary" @click="$router.go(-1)">完成</el-button>
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
      action: 0,
      disabled: false,
      enterpriseId: '',
      orgName: '',
      organizationList: this.$route.query.organizationList,
      code: this.$route.query.code
    }
  },
  created() {
    this.disabled = false
  },
  methods: {
    config(type) {
      switch (type) {
        case 'add':
          this.action += 1
          break
        case 'reduce':
          this.action -= 1
          break
        default:
          break
      }
    },
    saveAndNext(type) {
      this.$refs.baseInfo.addOrEdit().then(res => {
        this.enterpriseId = res.id
        this.orgName = res.name
        if (type === 'down') {
          this.config('add')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.enterprise-add {
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
  .steps-action {
    display: flex;
    justify-content: center;
    margin: 30px auto;
  }
}
</style>
