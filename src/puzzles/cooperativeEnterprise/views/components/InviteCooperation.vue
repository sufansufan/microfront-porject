<template>
  <div class="invite-cooperation">
    <el-form ref="ruleForm" :key="key" v-loading="loading" :rules="rules" :model="ruleForm" label-width="120px" class="ruleForm">
      <el-form-item label="企业名称" prop="inviteCompanyName" class="fill-name">
        <el-input v-model.trim="ruleForm.inviteCompanyName" type="textarea" clearable :disabled="true" placeholder="请输入企业名称" />
      </el-form-item>
      <el-form-item label="邀请企业联系人" prop="inviteUserName">
        <el-select v-model="ruleForm.inviteUserName" filterable :disabled="disabled" placeholder="请选择邀请企业联系人" @change="allUser">
          <el-option
            v-for="item in personList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系人电话" prop="phone">
        <el-input v-model.trim="ruleForm.phone" clearable :disabled="disabled" placeholder="请输入联系人电话" />
      </el-form-item>
      <el-form-item label="归属单位" prop="organizationName">
        <el-select v-model="ruleForm.organizationName" :disabled="true" placeholder="请选择归属单位">
          <el-option
            v-for="item in organizationList"
            :key="item.id"
            :label="item.orgName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否完善信息" prop="fullInformation">
        <el-select v-model="ruleForm.fullInformation" :disabled="disabled" placeholder="请选择是否完善信息">
          <el-option
            v-for="item in isFullInformation"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <p>是否需要被邀请的企业提供完整信息</p>
      </el-form-item>
      <template v-if="mesEmail">
        <el-form-item label="短信内容" prop="messageContent" class="fill-name">
          <el-input v-model.trim="ruleForm.messageContent" type="textarea" clearable :disabled="disabled || mes" placeholder="请输入短信内容" />
        </el-form-item>
        <el-form-item label="邮件内容" prop="emailContent" class="fill-name">
          <el-input v-model.trim="ruleForm.emailContent" type="textarea" clearable :disabled="disabled ||mes" placeholder="请输入邮件内容" />
        </el-form-item>
      </template>
      <el-form-item label="备注" prop="remark" class="fill-name">
        <el-input v-model.trim="ruleForm.remark" type="textarea" clearable :disabled="disabled" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item class="fill-name">
        <el-button type="primary" style="float:right;margin-top:20px;" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import table from '@core/mixins/table'
import { getLoginPersonnel } from '@core/api/personnel'
import { sendInvite } from '@core/api/cooperativeEnterprise/operateinfo'
import { getCompany } from '@core/api/organization'
import { validatePhone } from '@core/utils/validate'
import { getSessionStorage } from '@core/utils/auth'
export default {
  components: {},
  mixins: [table],
  props: {
    multipleSelection: {
      default: () => [],
      type: Array
    },

    organizationDTO: {
      default: () => {},
      type: Array
    },
    organization: {
      default: () => {},
      type: Array

    }
  },
  data() {
    var validPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        if (!validatePhone(value)) {
          callback(new Error('请输入正确的电话'))
        } else {
          callback()
        }
      }
    }
    return {
      loading: false,
      mesEmail: false,
      mes: true,
      orgName: '',
      registeredPlace: '',
      Allcompany: {
        company: {},
        subCompany: {}
      },
      organizationList: [],

      mesContent: '',
      // userInfoList: [],
      personList: [],
      isFullInformation: [
        {
          code: 'true',
          name: '是'
        },
        {
          code: 'false',
          name: '否'
        }
      ],
      inviteUserNameList: [],
      ruleForm: {
        inviteCompanyName: '',
        inviteUserName: '',
        phone: '',
        organizationName: '',
        fullInformation: '',
        messageContent: '',
        emailContent: '',
        remark: ''
      },
      rules: {
        inviteUserName: [{ required: true, message: '请选择邀请企业联系人 ', trigger: 'change' }],
        phone: [{ required: true, validator: validPhone, trigger: 'blur' }],
        fullInformation: [{ required: true, message: '请选择是否完善信息 ', trigger: 'change' }],
        messageContent: [{ required: true, trigger: 'blur' }],
        emailContent: [{ required: true, trigger: 'blur' }]
      },
      inviteUserName: ''
    }
  },
  watch: {
    multipleSelection: {
      handler() {
        this.multipleSelection.map(v => {
          if (!v.companyId) {
            this.mesEmail = true
          } else {
            this.mesEmail = false
          }
        })
        this.ruleForm.inviteCompanyName = this.multipleSelection.map(item => {
          return `${item.name}(${item.registeredPlace})`
        }).join('，')
      },

      immediate: true,
      deep: true
    }
  },
  created() {
    this.ruleForm.organizationName = getSessionStorage('userOrgId')
    this.organizationList.push(JSON.parse(getSessionStorage('userOrg')))
    this.ruleForm.inviteUserName = JSON.parse(getSessionStorage('personnel')).id
    const { name, telephone } = JSON.parse(getSessionStorage('personnel'))
    const { orgName, creditCode } = JSON.parse(getSessionStorage('organization'))
    this.inviteUserName = name
    this.ruleForm.phone = telephone
    this.mesContent = `尊敬的贵公司，我是${orgName}企业的${name}，我司特邀请贵公司进行线上业务合作，如您愿意合作请复制链接到电脑的浏览器中交接平台加入平台：http://www.zgjdyh.cn &comid=bug007_ ${creditCode} 邀请码：0000`
    this.ruleForm.messageContent = this.mesContent
    this.ruleForm.emailContent = this.mesContent

    this.getLoginPerson()
    this.getCompany()
    this.ruleForm.fullInformation = this.isFullInformation[0].code
  },

  methods: {
    allUser(value) {
      if (this.personList && this.personList.length > 0) {
        this.personList.forEach(item => {
          if (item.id === value) {
            this.ruleForm.phone = item.telephone
            this.inviteUserName = item.name
          }
        })
      }
    },
    getCompany() {
      getCompany().then(({ data }) => {
        const { company, subCompany } = data
        this.Allcompany = {
          company: company,
          subCompany: subCompany
        }
      })
    },
    getLoginPerson() {
      getLoginPersonnel().then(({ data }) => {
        this.personList = data
      })
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.organizationDTO.creditCode == null || this.organizationDTO.creditCode === '') {
            this.$message.warning('当前用户没有归属单位')
          }
          const { emailContent, fullInformation, phone, inviteUserName, messageContent, remark } = this.ruleForm
          const { companyId, name, informationCode, mainBusiness } = this.multipleSelection[0]
          const { establishmentDate, creditCode, legalPersonName, id, orgName, orgType, registeredPlace, registeredCapital, unitNature, officeAddress } = JSON.parse(getSessionStorage('userOrg'))
          // const obj = [this.ruleForm, this.organization]
          // const newArr = this.multipleSelection.map(item => {
          //   return Object.assign({}, item, ...obj)
          // })
          // console.log(newArr, '999')

          const params = {
            acceptCompanyId: companyId,
            acceptCompanyName: name,
            establishmentDate: establishmentDate,
            fullInformation: fullInformation,
            informationCode: creditCode,
            inviteCompanyName: this.organizationDTO.orgName,
            inviteUserId: inviteUserName,
            inviteUserName: this.inviteUserName,
            acceptMainBusiness: mainBusiness,
            legal: legalPersonName,
            mainBusiness: this.organizationDTO.mainBusiness,
            officeAddress: officeAddress,
            organizationId: id,
            organizationName: orgName,
            organizationType: orgType,
            phone: phone,
            registerAddress: registeredPlace,
            registeredCapital: registeredCapital,
            remark: remark,
            acceptInformationCode: informationCode,
            unitNature: unitNature,
            emailContent: emailContent,
            messageContent: messageContent
          }
          sendInvite([params]).then(() => {
            this.$emit('dialog')
            this.$message.success('邀请成功')
          })
        } else {
          return false
        }
      })
    }

  }

}
</script>

<style>

</style>
