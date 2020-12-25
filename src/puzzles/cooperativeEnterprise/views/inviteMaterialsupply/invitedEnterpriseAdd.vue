<template>
  <div class="enterprise-add">
    <jdy-steps :action="action">
      <jdy-step title="基本信息" />
      <jdy-step title="银行账号" />
      <jdy-step title="资质证书" />
    </jdy-steps>
    <keep-alive>
      <template v-if="action===0">
        <base-info ref="baseInfo" :disabled="disabled" :same-id="sameId" :update-id="updateId" :code="code" :updateu-id="updateuId" />
      </template>
      <template v-if="action===1">
        <bank-account ref="bankAccount" :same-id="sameId" :update-id="updateId" :disabled="disabled" :org-name="orgName" :updateu-id="updateuId" />
      </template>
      <template v-if="action===2">
        <certification ref="certification" :update-id="updateId" :org-name="orgName" :disabled="disabled" :updateu-id="updateuId" />
      </template>
    </keep-alive>
    <div class="steps-action">
      <template v-if="action===0">
        <el-button
          type="primary"
          @click="saveAndNext('save')"
        >保存</el-button>
        <el-button
          type="primary"
          @click="saveAndNext('down')"
        > 下一步</el-button>
      </template>
      <template v-if="action===1">
        <el-button type="primary" @click="config('reduce')">上一步</el-button>
        <el-button type="primary" @click="config('add')">下一步</el-button>
      </template>
      <template v-if="action===2">
        <el-button type="primary" @click="config('reduce')">上一步</el-button>
      </template>
      <el-button type="primary" @click="saveAndNext('finish')"> 完成</el-button>
      <el-button class="cancel-btn" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import BaseInfo from '../invitecomponents/BaseInfo'
import BankAccount from '../invitecomponents/BankAccount'
import Certification from '../invitecomponents/Certification'
import { updateOperate } from '@core/api/cooperativeEnterprise/operateinfo'
import { dealInvitation } from '@core/api/cooperativeEnterprise/operateinfo'
import { getUuid } from '@core/utils/index'
import { getSessionStorage } from '@core/utils/auth'
import { cancelDel } from '@core/api/cooperativeEnterprise/provideunitinfo'
export default {
  name: 'EnterpriseAdd',
  components: {
    BaseInfo,
    BankAccount,
    Certification
  },
  data() {
    return {
      finished: true,
      action: 0,
      disabled: false,
      orgName: '',
      serviceId: this.$route.query.serviceId,
      sameId: getUuid(),
      updateId: '',
      multipleSelection: this.$route.query.multipleSelection,
      organizationList: this.$route.query.organizationList,
      company: this.$route.query.company,
      code: this.$route.query.code,
      updateuId: getUuid(),
      orgNames: this.$route.query.orgName,
      orgTypes: this.$route.query.orgType,
      acceptUserId: this.$route.query.acceptUserId,
      acceptUserName: this.$route.query.acceptUserName,
      acceptPhone: this.$route.query.acceptPhone
    }
  },
  created() {
    // 当操作记录id不存在时创建一个操作记录id
    if (!this.updateId) {
      this.updateId = getUuid()
    }
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
    Handled() {
      const params = {
        acceptUserId: this.acceptUserId,
        acceptUserName: this.acceptUserName,
        acceptPhone: this.acceptPhone,
        id: this.serviceId,
        dealResult: 0
      }
      dealInvitation(params).then(() => {
        this.$message.success('操作成功!')
      })
    },
    updateOperate() {
      const { companyId, name, informationCode } = this.multipleSelection
      const { orgName, mainBusiness } =
      this.company
      const { creditCode, registeredCapital, officeAddress, legalPersonName, registeredPlace, establishmentDate, unitNature } = JSON.parse(getSessionStorage('userOrg'))
      const { name: personnelName, telephone: personnelPhone, id: personnelId } = JSON.parse(getSessionStorage('personnel'))
      const params = {
        acceptCompanyId: companyId,
        acceptCompanyName: name,
        acceptInformationCode: informationCode,
        establishmentDate: establishmentDate,
        id: this.$route.query.operaId,
        informationCode: creditCode,
        inviteCompanyName: orgName,
        // 归属单位
        inviteOrganizationId: getSessionStorage('userOrgId'),
        legal: legalPersonName,
        mainBusiness: mainBusiness,
        officeAddress: officeAddress,
        organizationName: this.orgNames,
        organizationType: this.orgTypes,
        registerAddress: registeredPlace,
        registeredCapital: registeredCapital,
        unitNature: unitNature,
        phone: personnelPhone,
        inviteUserId: personnelId,
        inviteUserName: personnelName
      }

      updateOperate([params]).then(() => {
        this.$message.success('更新操作成功')
      })
    },
    saveAndNext(type) {
      if (this.$refs.baseInfo) {
        this.$refs.baseInfo.addOrEdit().then(res => {
          this.$refs.baseInfo.updateDate = res
          if (type === 'down') {
            this.config('add')
          } else if (type === 'finish') {
            if (this.serviceId) {
              this.Handled()
              this.$router.replace({ path: '/home' })
            } else {
              this.updateOperate()
              this.$router.go(-1)
            }
          } else {
            return
          }
        })
      } else if (this.$refs.bankAccount) {
        if (type === 'down') {
          this.config('add')
        } else if (type === 'finish') {
          if (this.serviceId) {
            this.Handled()
            this.$router.replace({ path: '/home' })
          } else {
            this.updateOperate()
            this.$router.go(-1)
          }
        } else {
          return
        }
      } else {
        if (type === 'down') {
          this.config('add')
        } else if (type === 'finish') {
          if (this.serviceId) {
            this.Handled()
            this.$router.replace({ path: '/home' })
          } else {
            this.updateOperate()
            this.$router.go(-1)
          }
        } else {
          return
        }
      }
    },
    cancel() {
      if (this.$route.query.title === '完善信息') {
        cancelDel(this.$route.query.serviceId).then(res => { this.$router.go(-1) })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.enterprise-add {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .steps-action {
    display: flex;
    justify-content: center;
    margin: 30px auto;
  }
}
</style>
