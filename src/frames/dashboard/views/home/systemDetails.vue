<template>
  <div class="system-details">
    <div v-if="lineStyles" class="lineStyles styles" @click="$router.push({ name: 'enterpriseView',query:{isExistId:isExistId,updataType:'view'}})">{{ orgName }}</div>
    <div v-if="styles" class="lineStyles">{{ orgName }}</div>
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
      <el-form-item label="是否完善合作企业信息" prop="fullInformation">
        <el-select v-model="ruleForm.fullInformation" :disabled="disabled" placeholder="请选择是否完善合作企业信息">
          <el-option v-for="item in fullInformation" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <div class="full-name">受邀企业填写信息</div>
      <el-form-item label="是否同意线上合作" prop="dealResult" class="full-width">
        <el-select v-model="ruleForm.dealResult" :disabled="deal" placeholder="请选择是否同意线上合作" @change="isDeal">
          <el-option v-for="item in isDealResult" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <template v-if="ruleForm.fullInformation ==='否' && ruleForm.dealResult==='0'">
        <el-form-item label="企业联系人" prop="acceptUserName">
          <el-select v-model="ruleForm.acceptUserName" :disabled="deal" placeholder="请选择企业联系人" @change="changeSelect">
            <el-option
              v-for="item in personList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系人电话" prop="acceptPhone">
          <el-input v-model="ruleForm.acceptPhone" :disabled="deal" placeholder="请输入联系人电话" />
        </el-form-item>
        <el-form-item label="备注" class="full-width" prop="remark">
          <el-input v-model="ruleForm.remark" :disabled="deal" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </template>
      <template
        v-if=" ruleForm.fullInformation ==='是' && ruleForm.dealResult ==='1' || ruleForm.fullInformation ==='否' && ruleForm.dealResult ==='1'"
      >
        <el-form-item label="拒绝理由" class="full-width" prop="reason">
          <el-input v-model="ruleForm.reason" :disabled="deal" type="textarea" placeholder="请输入拒绝理由" />
        </el-form-item>
      </template>
    </el-form>
    <div class="btn">
      <template v-if="!define">
        <el-button v-if="ruleForm.fullInformation ==='是' && ruleForm.dealResult ==='0'" type="primary" @click="submitGo">确定并完善信息</el-button>
        <template
          v-if="ruleForm.fullInformation ==='是' && ruleForm.dealResult ==='1' ||
            ruleForm.fullInformation ==='否' && ruleForm.dealResult ==='0' || ruleForm.dealResult==='1' "
        >
          <el-button type="primary" @click="submit">确定</el-button>
        </template>
      </template>
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
  </div>
</template>
<script>
import { getMesDetails, dealInvitation, history } from '@core/api/cooperativeEnterprise/operateinfo'
import { getUserInfo, getLoginPersonnel } from '@core/api/personnel'
import { isExist } from '@core/api/cooperativeEnterprise/companyinfo'
import { mapGetters } from 'vuex'
import { getSessionStorage } from '@core/utils/auth'
import table from '@core/mixins/table'
export default {
  mixins: [table],
  props: {
    disabled: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      lineStyles: false,
      styles: false,
      loading: false,
      personList: [],
      orgName: '',
      isExistId: '',
      isDealResult: [
        {
          code: '0',
          name: '同意'
        },
        {
          code: '1',
          name: '拒绝'
        }
      ],
      fullInformation: [
        {
          code: 'true',
          name: '是'
        },
        {
          code: 'false',
          name: '否'
        }
      ],
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
        fullInformation: '',
        id: '',

        acceptPhone: '',
        acceptUserName: '',
        dealResult: '',
        remark: '',
        reason: ''
      },
      rules: {
        dealResult: [{ required: true, message: '请选择是否线上合作 ', trigger: 'blur' }],
        acceptUserName: [{ required: true, message: '请输入企业联系人 ', trigger: 'blur' }],
        acceptPhone: [{ required: true, message: '请输入联系人电话 ', trigger: 'blur' },
          { pattern: /^1[234567890]\d{9}$/, message: '手机号格式不正确' }],
        reason: [{ required: true, message: '请输入拒绝理由 ', trigger: 'blur' }]
      },
      userInfoList: [],
      topOrganization: [],
      Category: null,
      orgType: [],
      dis: false,
      selectValue: '',
      organizationId: this.$route.query.organizationId

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
    },
    deal() {
      if (this.$route.query.deal === 'false' || !this.$route.query.deal) {
        return false
      } else {
        return true
      }
    }
  },
  created() {
    this.getLoginPerson()
    this.getMes()
    this.getloginMes()
    this.$store.dispatch('getConstant', ['nativePlace', 'mainBusiness', 'enterpriseNature'])
  },
  methods: {
    isDeal() {
      this.$refs.ruleForm.clearValidate()
    },
    getLoginPerson() {
      getLoginPersonnel().then(({ data }) => {
        this.personList = data
      })
    },
    changeSelect(e) {
      if (this.personList && this.personList.length > 0) {
        this.personList.forEach(item => {
          if (item.id === e) {
            this.ruleForm.acceptPhone = item.telephone
            this.selectValue = item.name
          }
        })
      }
    },
    getloginMes() {
      getUserInfo().then(({ data }) => {
        this.userInfoList.push(data.personnelDTO)
        this.ruleForm.acceptUserName = this.userInfoList[0].id
        this.ruleForm.acceptPhone = this.userInfoList[0].telephone
        this.selectValue = this.userInfoList[0].name
      })
    },
    submitGo() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          history(getSessionStorage('creditCode'), getSessionStorage('orgId')).then((res) => {
            if (res.data !== null) {
              this.$router.push({ name: 'invitedEnterpriseAdd', query: { serviceId: this.$route.query.serviceId, newsId: res.data.id, acceptUserId: this.userInfoList[0].id, acceptUserName: this.userInfoList[0].name, acceptPhone: this.userInfoList[0].telephone, title: '完善信息' }})
            } else {
              this.$router.push({ name: 'invitedEnterpriseAdd', query: { serviceId: this.$route.query.serviceId, acceptUserId: this.userInfoList[0].id, acceptUserName: this.userInfoList[0].name, acceptPhone: this.userInfoList[0].telephone, title: '完善信息' }})
            }
          })
        } else {
          return false
        }
      })
    },
    submit() {
      if (this.$route.query.deal === true) {
        this.$message.warning('该条紧急任务已处理!')
      } else {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const params = {
              ...this.ruleForm,
              Loading: true,
              acceptUserId: this.ruleForm.acceptUserName,
              acceptUserName: this.selectValue,
              id: this.$route.query.serviceId
            }

            dealInvitation(params).then(() => {
              this.$message.success('操作成功')
              this.$router.replace({ path: '/urgentMore' })
            })
          } else {
            return false
          }
        })
      }
    },
    getMes() {
      this.loading = true
      getMesDetails(this.$route.query.serviceId).then((data) => {
        this.ruleForm = data.data
        this.loading = false
        if (this.$route.query.deal) {
          this.ruleForm.remark = data.data.remark
          this.ruleForm.reason = data.data.reason
        } else {
          this.ruleForm.remark = ''
        }

        // 拼接注册地
        this.ruleForm.registerAddress = data.data.registerAddress.split(',')
        this.ruleForm.fullInformation = data.data.fullInformation === true ? '是' : '否'
        if (data.data.organizationType === 'Company') {
          this.orgName = `${data.data.inviteCompanyName}`
          isExist(data.data.informationCode, this.organizationId).then(({ data }) => {
            this.isExistId = data
            if (data) {
              this.lineStyles = true
              this.styles = false
            } else {
              this.lineStyles = false
              this.styles = true
            }
          })
        } else {
          this.orgName = `${data.data.inviteCompanyName}：${data.data.organizationName}`
          isExist(data.data.informationCode, this.organizationId).then(({ data }) => {
            this.isExistId = data
            if (data) {
              this.lineStyles = true
              this.styles = false
            } else {
              this.lineStyles = false
              this.styles = true
            }
          })
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.system-details{
  padding:10px;
  .lineStyles{
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #0a4c8a;
  }
  .styles {
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
