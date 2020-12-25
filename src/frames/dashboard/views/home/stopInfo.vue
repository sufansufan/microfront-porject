<template>
  <div class="stop-info">
    <!-- <div class="lineStyles" @click="$router.push({ name: 'enterpriseView',query:{isExistId:isExistId}})">{{ orgName }}</div> -->
    <div class="lineStyles">{{ orgName }}</div>
    <el-form ref="ruleForm" :key="key" v-loading="loading" :model="ruleForm" label-width="160px" :rules="rules" class="ruleForm">
      <el-form-item label="统一社会信用代码" prop="informationCode">
        <el-input v-model="ruleForm.informationCode" :disabled="disabled" placeholder="请输入统一社会信用代码" />
      </el-form-item>
      <el-form-item label="主营业务" prop="mainBusiness">
        <el-select v-model="ruleForm.mainBusiness" :disabled="disabled || dis" placeholder="请选择主营业务">
          <el-option v-for="item in constant.mainBusiness" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="注册资本" prop="registeredCapital">

        <amount-input v-model="ruleForm.registeredCapital" :disabled="disabled" placeholder="请输入注册资本" />
      </el-form-item>
      <el-form-item label="注册地" prop="registerAddress">
        <el-cascader
          v-model="ruleForm.registerAddress"
          placeholder="请选择注册地"
          clearable
          :disabled="disabled"
          style="width:100%"
          :options="constant.nativePlace"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children',checkStrictly: true }"
        />
      </el-form-item>
      <el-form-item label="成立日期" prop="establishmentDate">
        <el-date-picker v-model="ruleForm.establishmentDate" :disabled="disabled" placeholder="请选择成立日期" type="date" />
      </el-form-item>
      <el-form-item label="办公地址" prop="officeAddress">
        <el-select v-model="ruleForm.officeAddress" :disabled="disabled || dis" placeholder="请选择办公地址">
          <el-option v-for="item in orgType" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="企业性质" prop="unitNature">
        <el-select v-model="ruleForm.unitNature" :disabled="disabled || dis" placeholder="请选择企业性质">
          <el-option v-for="item in constant.enterpriseNature " :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="法定代表人" prop="legal">
        <el-input v-model="ruleForm.legal" :disabled="disabled" placeholder="请输入法定代表人" />
      </el-form-item>
      <el-form-item label="企业联系人" prop="inviteUserName">
        <el-input v-model="ruleForm.inviteUserName" :disabled="disabled" placeholder="请输入企业联系人" />
      </el-form-item>
      <el-form-item label="联系人电话" prop="phone">
        <el-input v-model="ruleForm.phone" :disabled="disabled" placeholder="请输入联系人电话" />
      </el-form-item>
      <el-form-item label="终止原因" prop="reason" class="full-width">
        <el-input v-model="ruleForm.reason" type="textarea" :disabled="disabled" placeholder="请输入终止原因" />
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button v-if="!define" type="primary" @click="submit">确定</el-button>
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" />  返回</el-button>
    </div>

  </div>
</template>
<script>
import { getMesDetails, dealStopCooperate } from '@core/api/cooperativeEnterprise/operateinfo'
import { mapGetters } from 'vuex'
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
      isExistId: '',
      loading: false,
      ruleForm: {
        informationCode: '',
        mainBusiness: '',
        registeredCapital: '',
        registerAddress: '',
        establishmentDate: '',
        officeAddress: '',
        unitNature: '',
        legal: '',
        inviteUserName: '',
        phone: '',
        reason: ''

      },
      organizationId: '',
      orgName: ''
    }
  },

  computed: {
    ...mapGetters(['constant']),
    define() {
      return this.$route.query.deal
    }
  },
  created() {
    this.getMes()
    this.$store.dispatch('getConstant', ['nativePlace', 'mainBusiness', 'enterpriseNature'])
  },
  methods: {
    submit() {
      const id = this.$route.query.serviceId
      const result = 0
      this.loading = true
      dealStopCooperate(id, result).then(() => {
        this.loading = false
        this.$message.success(`您已与${this.ruleForm.inviteCompanyName}企业终止了平台合作关系！`)
        this.$router.replace({ path: '/urgentMore' })
      })
    },
    getMes() {
      // this.loading = true
      getMesDetails(this.$route.query.serviceId).then((data) => {
        this.ruleForm = data.data
        this.loading = false
        this.organizationId = getSessionStorage('mainOrgId')
        // 拼接注册地
        this.ruleForm.registerAddress = data.data.registerAddress.split(',')
        this.orgName = `${data.data.inviteCompanyName}`
        if (data.data.organizationType === 'ProjectDepartment') {
          this.orgName = `${data.data.inviteCompanyName}：${data.data.organizationName}`
        } else if (data.data.organizationType === 'SubCompany') {
          this.orgName = `${data.data.inviteCompanyName}：${data.data.organizationName}`
        }
        isExist(data.data.informationCode, this.organizationId).then(({ data }) => {
          this.isExistId = data
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.stop-info{
  padding:10px;
   .lineStyles{
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #0a4c8a;
    //  text-decoration: underline;
    // cursor: pointer;
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
