<template>
  <div class="invite-feedback">
    <div class="lineStyles" @click="$router.push({ name: 'enterpriseView',query:{isExistId:isExistId,updataType:'view'}})">{{ orgName }}</div>
    <el-form ref="ruleForm" :key="key" v-loading="loading" :model="ruleForm" label-width="170px" :rules="rules" class="ruleForm">
      <el-form-item label="统一社会信用代码" prop="acceptInformationCode">
        <el-input v-model="ruleForm.acceptInformationCode" :disabled="disabled" placeholder="请输入统一社会信用代码" />
      </el-form-item>
      <el-form-item label="主营业务" prop="acceptMainBusiness">
        <el-select v-model="ruleForm.acceptMainBusiness" :disabled="disabled" placeholder="请选择主营业务">
          <el-option v-for="item in constant.mainBusiness" :key="item.code" :label="item.name" :value="item.code" />
        </el-select></el-form-item>
      <el-form-item label="是否完善合作企业信息" prop="fullInformation">
        <el-select v-model="ruleForm.fullInformation" :disabled="disabled" placeholder="请选择是否完善合作企业信息">
          <!-- <el-option v-for="item in constant.isMachining" :key="item.code" :label="item.name" :value="item.code" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="是否同意线上合作" prop="dealResult">
        <el-select v-model="ruleForm.dealResult" :disabled="disabled" placeholder="请选择是否同意线上合作">
          <!-- <el-option v-for="item in constant.isMachining" :key="item.code" :label="item.name" :value="item.code" /> -->
        </el-select>
      </el-form-item>

      <template v-if="ruleForm.fullInformation==='否' && ruleForm.dealResult==='同意'">
        <el-form-item label="企业联系人" prop="acceptUserName">
          <el-input v-model="ruleForm.acceptUserName" :disabled="disabled" placeholder="请输入企业联系人" />
        </el-form-item>
        <el-form-item label="联系人电话" prop="acceptPhone">
          <el-input v-model="ruleForm.acceptPhone" :disabled="disabled" placeholder="请输入联系人电话" />
        </el-form-item>
        <el-form-item label="备注" class="full-width" prop="remark">
          <el-input v-model="ruleForm.remark" type="textarea" :disabled="disabled" placeholder="请输入备注" />
        </el-form-item>
      </template>
      <template
        v-if="ruleForm.fullInformation==='是' && ruleForm.dealResult ==='拒绝' ||
          ruleForm.fullInformation==='否' && ruleForm.dealResult ==='拒绝'"
      >
        <el-form-item label="拒绝理由" class="full-width" prop="reason">
          <el-input v-model="ruleForm.reason" type="textarea" :disabled="disabled" placeholder="请输入拒绝理由" />
        </el-form-item>
      </template>
    </el-form>
    <div class="btn">
      <template v-if="!define">
        <el-button v-if="ruleForm.fullInformation==='是' && ruleForm.dealResult==='同意'" type="primary" @click="enterpriseInfo">查看企业最新信息</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </template>
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMesDetails, dealInvitationFulback } from '@core/api/cooperativeEnterprise/operateinfo'
import { dealByServiceId } from '@core/api/emergencyWork'
import { isExist } from '@core/api/cooperativeEnterprise/companyinfo'
import { getSessionStorage } from '@core/utils/auth'
export default {
  props: {
    disabled: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      orgName: '',
      isExistId: '',
      loading: false,
      ruleForm: {
        acceptInformationCode: '',
        acceptMainBusiness: '',
        fullInformation: '',
        dealResult: '',
        acceptUserName: '',
        acceptPhone: '',
        remark: '',
        reason: ''
      },
      latelyId: '',
      inviteOrgName: '',
      organizationId: ''
    }
  },
  computed: {
    ...mapGetters(['constant']),
    define() {
      if (this.$route.query.deal === 'false' || !this.$route.query.deal) {
        return false
      } else {
        return true
      }
    }
  },
  created() {
    this.getMes()
    this.$store.dispatch('getConstant', 'mainBusiness')
  },
  methods: {
    enterpriseInfo() {
      setTimeout(() => {
        this.$router.push({ name: 'invitedEnterpriseView', query: { serviceId: this.$route.query.serviceId, title: '查看企业最新信息' }})
      }, 0)
    },
    getMes() {
      this.loading = true
      getMesDetails(this.$route.query.serviceId).then((data) => {
        this.ruleForm = data.data
        this.loading = false
        if (this.$route.query.deal) {
          this.ruleForm.remark = data.data.remark
          this.ruleForm.reason = data.data.reason
        }
        this.organizationId = getSessionStorage('mainOrgId')
        this.ruleForm.dealResult = data.data.dealResult === '0' ? '同意' : '拒绝'
        this.ruleForm.fullInformation = data.data.fullInformation === true ? '是' : '否'
        this.orgName = `${data.data.acceptCompanyName}`
        isExist(data.data.acceptInformationCode, this.organizationId).then(({ data }) => {
          this.isExistId = data
        })
      })
    },
    submit() {
      this.loading = true
      if (this.ruleForm.dealResult === '拒绝') {
        this.loading = false
        // 调取标记为已处理接口
        dealByServiceId(this.$route.query.serviceId, this.$route.query.taskTypeId).then(res => {
          // this.$message.warning('该条紧急任务已处理')
          this.$router.replace({ path: '/urgentMore' })
          this.$message.success('操作成功')
        })
      } else {
        const id = this.$route.query.serviceId
        const result = 0
        dealInvitationFulback(id, result).then(() => {
          this.loading = false
          this.$message.success(`您已与${this.ruleForm.acceptCompanyName}企业建立平台合作关系，待合作企业发布产品，即可使用商城采购了！`)
          this.$router.replace({ path: '/urgentMore' })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.invite-feedback{
  padding:10px;
  .lineStyles{
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #0a4c8a;
    text-decoration: underline;
    cursor: pointer;
  }

  .ruleForm {
    display: flex;
    flex-wrap: wrap;
    &>.el-form-item {
      width:50%;
    }
    .el-select,
    .el-input {
      width: 100%;
    }
    .full-width,.full-name{
      width: 100%;
    }
    .full-name{
      line-height:34px;
      background-color:rgba(242, 242, 242, 1);
      font-size:14px;
      color:#333;
      margin-bottom:10px;

    }
  }
  .btn {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
  }
}
</style>
