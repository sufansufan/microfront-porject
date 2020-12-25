<template>
  <div class="base-info">
    <el-form ref="ruleForm" :model="ruleForm" label-width="180px" :rules="rules" class="ruleForm">
      <el-form-item label="企业编号" prop="unitNumber">
        <el-input v-model.trim="ruleForm.unitNumber" clearable maxlength="20" show-word-limit :disabled="disabled" placeholder="请输入企业编号" />
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model.trim="ruleForm.name" maxlength="50" clearable show-word-limit :disabled="disabled" placeholder="请输入企业名称" />
      </el-form-item>
      <el-form-item
        label="主营业务"
        prop="mainBusiness"
      >
        <el-select v-model.trim="ruleForm.mainBusiness" clearable :disabled="disabled || Business" placeholder="请选择主营业务">
          <el-option v-for="item in constant.mainBusiness" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="企业性质" prop="unitNature">
        <el-select v-model.trim="ruleForm.unitNature" clearable :disabled="disabled" placeholder="请选择企业性质">
          <el-option v-for="item in constant.enterpriseNature " :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="纳税人类型" prop="taxpayerType">
        <el-select v-model.trim="ruleForm.taxpayerType" clearable :disabled="disabled" placeholder="请选择纳税人类型">
          <el-option v-for="item in constant.taxpayerType" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="经营模式"
        prop="managementModel"
        :rules="[
          { required: ruleForm.mainBusiness === 'CLGY', message: '请选择经营模式', trigger: 'change' }
        ]"
      >
        <el-select v-model.trim="ruleForm.managementModel" clearable :disabled="disabled || disabledSelect " placeholder="请选择经营模式">
          <el-option v-for="item in constant.managementModel" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>

      <el-form-item label="统一社会信用代码" prop="informationCode">
        <el-input v-model.trim="ruleForm.informationCode" clearable maxlength="20" show-word-limit :disabled="disabled" placeholder="请输入统一社会信用代码" />
      </el-form-item>
      <el-form-item label="成立日期" prop="establishmentDate">
        <el-date-picker v-model.trim="ruleForm.establishmentDate" clearable :disabled="disabled" placeholder="请选择成立日期" type="date" />
      </el-form-item>
      <el-form-item
        v-if="ruleForm.mainBusiness === 'LWFB' ||ruleForm.mainBusiness === 'JZZS'"
        label="安全生产许可证编号"
        prop="safeNumber"
        :rules="[
          { required: ruleForm.mainBusiness === 'LWFB' || ruleForm.mainBusiness === 'JZZS', message: '请输入安全生产许可证编号', trigger: 'blur' }
        ]"
      >
        <el-input v-model.trim="ruleForm.safeNumber" clearable maxlength="20" show-word-limit :disabled="disabled" placeholder="请输入安全生产许可证编号" />

      </el-form-item>
      <el-form-item v-if="ruleForm.mainBusiness === 'LWFB'" label="主项资质" prop="qualificationCategory">
        <el-cascader
          v-model.trim="ruleForm.qualificationCategory"
          style="width:100%"
          clearable
          placeholder="请选择资质"
          :options="constant.quaCategory"
          :props="{ expandTrigger: 'hover', value: 'code', label: 'name', }"
        />
      </el-form-item>
      <el-form-item
        v-if="ruleForm.mainBusiness === 'LWFB'"
        label="资质证书编号"
        prop="qualificationNumber"
        :rules="[
          { min: 0, max: 20, message: '长度不能大于20 个字符', trigger: 'blur' }
        ]"
      >
        <el-input v-model.trim="ruleForm.qualificationNumber" clearable maxlength="20" show-word-limit :disabled="disabled" placeholder="请输入资质证书编号" />
      </el-form-item>
      <el-form-item label="经营范围" prop="businessScope" class="full-width row-label">
        <el-input v-model.trim="ruleForm.businessScope" clearable type="textarea" :rows="3" :disabled="disabled" placeholder="请输入经营范围" maxlength="200" show-word-limit />
      </el-form-item>
      <el-form-item
        label="注册资本（元）"
        prop="registeredCapital"
      >
        <amount-input v-model.trim="ruleForm.registeredCapital" clearable :disabled="disabled" placeholder="请输入注册资本" />
      </el-form-item>
      <el-form-item label="固定资产（元）" prop="fixedAssets">
        <amount-input v-model.trim="ruleForm.fixedAssets" clearable :disabled="disabled" placeholder="请输入固定资产" />
      </el-form-item>
      <el-form-item label="注册地" prop="registeredPlace">
        <el-cascader
          v-model.trim="ruleForm.registeredPlace"
          placeholder="请选择注册地"
          clearable
          :disabled="disabled"
          style="width:100%"
          :options="constant.nativePlace"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children',}"
        />

      </el-form-item>
      <el-form-item label="办公地址" prop="officeAddress">
        <el-input v-model.trim="ruleForm.officeAddress" clearable maxlength="100" show-word-limit :disabled="disabled" placeholder="请输入办公地址" />
      </el-form-item>
      <el-form-item label="通讯地址" prop="postalAddress">
        <el-input v-model.trim="ruleForm.postalAddress" clearable maxlength="100" show-word-limit :disabled="disabled" placeholder="请输入通讯地址" />
      </el-form-item>
      <el-form-item label="公司电话" prop="telephone">
        <el-input v-model.trim="ruleForm.telephone" clearable maxlength="13" show-word-limit :disabled="disabled" placeholder="请输入公司电话" />
      </el-form-item>
      <el-form-item label="企业邮箱" prop="email">
        <el-input v-model.trim="ruleForm.email" clearable :disabled="disabled" placeholder="请输入企业邮箱" />
      </el-form-item>
      <el-form-item label="规模（人数）" prop="scale">
        <el-input v-model.trim="ruleForm.scale" max="10000" clearable :disabled="disabled" placeholder="请输入规模（人数）" />
      </el-form-item>
      <el-form-item label="传真" prop="fax">
        <el-input v-model.trim="ruleForm.fax" :disabled="disabled" clearable placeholder="请输入传真" />
      </el-form-item>
      <el-form-item label="法定代表人" prop="legal">
        <el-input v-model.trim="ruleForm.legal" :disabled="disabled" clearable placeholder="请输入法定代表人" />
      </el-form-item>
      <el-form-item label="身份证号" prop="idNumber">
        <el-input v-model.trim="ruleForm.idNumber" maxlength="18" clearable show-word-limit :disabled="disabled" placeholder="请输入身份证号" @input="discriCard" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model.trim="ruleForm.gender" clearable :disabled="disabled" placeholder="请选择性别">
          <el-option
            v-for="item in constant.gender"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系人" prop="contacts">
        <el-input v-model.trim="ruleForm.contacts" clearable :disabled="disabled" placeholder="请输入联系人" />
      </el-form-item>
      <el-form-item label="联系电话" prop="contactPhone">
        <el-input v-model.trim="ruleForm.contactPhone" clearable maxlength="13" show-word-limit :disabled="disabled" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item
        label="联系QQ号"
        prop="qqNumber"
      >
        <el-input v-model.trim="ruleForm.qqNumber" clearable :disabled="disabled" placeholder="请输入联系QQ号" maxlength="20" show-word-limit />
      </el-form-item>
      <el-form-item label="手机号码" prop="phoneNumber">
        <el-input v-model.trim="ruleForm.phoneNumber" clearable maxlength="11" show-word-limit :disabled="disabled" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item v-if="!updateId" label="首次合作日期" prop="firstDate">
        <el-date-picker v-model.trim="ruleForm.firstDate" clearable :disabled="disabled" placeholder="请选择首次合作日期" type="date" :picker-options="startDateOptions" />
      </el-form-item>
      <el-form-item v-if="!updateId" label="归属单位" prop="belongOrganizationId">
        <el-select v-model.trim="ruleForm.belongOrganizationId" clearable :disabled="disabled ||disOrg" placeholder="请选择归属单位">
          <el-option v-for="item in organizationList" :key="item.id" :label="item.orgName" :value="item.id" />
        </el-select>
      </el-form-item>
      <template v-if="nameView==='details' || updataType === 'view'">
        <template v-if="code[1]==='CLGY' || code[1]==='JZZS' ">
          <el-form-item label="注册企业">
            <el-select v-model.trim="ruleForm.companyId" clearable :disabled="disabled" placeholder="请选择注册企业">
              <el-option v-for="item in isRegister" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item label="合作类型">
            <el-select v-model.trim="ruleForm.cooperateType" clearable :disabled="disabled" placeholder="请选择合作类型">
              <el-option v-for="item in cooperateType" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </template>
        <el-form-item v-if="!updateId" label="企业状态">
          <el-select v-model.trim="ruleForm.state" clearable :disabled="disabled" placeholder="请选择合作类型">
            <el-option v-for="item in constant.CooperativeUnitState" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
      </template>

      <el-form-item
        v-if="ruleForm.mainBusiness === 'CLGY'"
        label="是否提供加工/定制服务"
        prop="machining"
        :rules="[
          {required:ruleForm.mainBusiness === 'CLGY',message:'请选择是否加工/定制服务',trigger:change}
        ]"
      >
        <el-select v-model.trim="ruleForm.machining" clearable :disabled="disabled" placeholder="请选择是否提供加工/定制服务">
          <el-option v-for="item in isMachining" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.mainBusiness === 'CLGY'" label="主营产品分类" prop="mainProducts" class="full-width">
        <el-select v-model.trim="ruleForm.mainProducts" clearable :disabled="disabled" placeholder="请选择主营产品分类">
          <el-option v-for="item in mainProducts" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.mainBusiness === 'CLGY'" label="工艺说明" prop="processDescription" class="full-width row-label">
        <el-input v-model.trim="ruleForm.processDescription" clearable type="textarea" :rows="3" :disabled="disabled" placeholder="请输入工艺说明" maxlength="200" show-word-limit />
      </el-form-item>
      <el-form-item label="企业简介" class="full-width row-label" prop="enterpriseProfile">
        <el-input v-model.trim="ruleForm.enterpriseProfile" clearable type="textarea" :rows="3" :disabled="disabled" placeholder="请输入企业简介" maxlength="200" show-word-limit />
      </el-form-item>
      <el-form-item class="row-label">
        <span slot="label"><span class="custom-form-label">*</span>营业执照</span>
        <el-upload
          :file-list="idCardList"
          :action="actionUrl"
          :on-success="fileIdCardSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemoveIdCard"
          :disabled="disabled"
          :before-upload="beforeUpload50M"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="uploadbefore('idCard')">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <el-form-item
        v-if="ruleForm.mainBusiness === 'LWFB' || ruleForm.mainBusiness === 'JZZS'"
        label="安全生产许可证"
        :rules="[{ required:ruleForm.mainBusiness === 'LWFB' || ruleForm.mainBusiness === 'JZZS'}]"
      >
        <el-upload
          :file-list="degreeList"
          :action="actionUrl"
          :on-success="fileDegreeSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemoveDegree"
          :disabled="disabled"
          :before-upload="beforeUpload50M"
          :on-progress="uploadProgress('degreeLoading')"
        >
          <el-button type="primary" :disabled="disabled" @click="uploadbefore('degreeCard')">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" class="full-width row-label" prop="remark">
        <el-input v-model.trim="ruleForm.remark" clearable type="textarea" :rows="3" :disabled="disabled" placeholder="请输入备注" maxlength="200" show-word-limit />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import upload from '@core/mixins/upload'
import { saveBusiness, updateBusiness, seeBusiness } from '@core/api/cooperativeEnterprise/companyinfo'
import { mapGetters } from 'vuex'
import { providelist } from '@core/api/cooperativeEnterprise/provideunitinfo'
import { getUuid } from '@core/utils/index'
import { validateID, validatePhone, validateInteger, validateEmail, validateNumber } from '@core/utils/validate'
import { deleteFileCoop } from '@core/api/accessoryFile'
import { getSessionStorage } from '@core/utils/auth'
import { getOrganization } from '@core/api/organization'
export default {
  mixins: [upload],
  props: {
    disabled: {
      default: true,
      type: Boolean
    },
    companyType: {
      default: '',
      type: String
    },
    enterpriseId: {
      default: '',
      type: String
    },
    serviceId: {
      default: '',
      type: String
    },
    code: {
      default: '',
      type: String
    },
    type: {
      default: '',
      type: String
    },
    updateId: {
      default: '',
      type: String
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
    var validqqNumber = (rule, value, callback) => {
      if (!validateNumber(value) && value) {
        callback(new Error('只能是数字'))
      } else {
        callback()
      }
    }
    // var validNumber = (rule, value, callback) => {
    //   if (!validatePositive(value) && value) {
    //     callback(new Error('请输入任意正数，正小数（小数位不超过2位），'))
    //   } else {
    //     callback()
    //   }
    // }
    var validInteger = (rule, value, callback) => {
      if (!validateInteger(value) && value) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }
    const validID = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号码不能为空'))
      } else {
        if (!validateID(value)) {
          callback(new Error('身份证号码不正确'))
        } else {
          callback()
        }
      }
    }
    const validMail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else {
        if (!validateEmail(value)) {
          callback(new Error('邮箱格式不正确'))
        } else {
          callback()
        }
      }
    }

    return {
      idCardLoading: false,
      startDateOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      Business: true,
      uid: '',
      disOrg: true,
      enterprise: false,
      isRegister: [
        { code: true, name: '是' },
        { code: false, name: '否' }],
      cooperateType: [
        { code: '0', name: '线上' },
        { code: '1', name: '线下' }],
      isMachining: [
        {
          code: true,
          name: '是'
        },
        {
          code: false,
          name: '否'
        }
      ],
      idCardList: [],
      degreeList: [],

      organizationList: [],
      mainProducts: [],
      ruleForm: {
        unitNumber: '',
        name: '',
        mainBusiness: '',
        unitNature: '',
        taxpayerType: '',
        managementModel: '',
        informationCode: '',
        establishmentDate: '',
        businessScope: '',
        registeredCapital: '',
        fixedAssets: '',
        registeredPlace: '',
        officeAddress: '',
        postalAddress: '',
        telephone: '',
        email: '',
        scale: '',
        fax: '',
        legal: '',
        idNumber: '',
        gender: '',
        contacts: '',
        contactPhone: '',
        qqNumber: '',
        phoneNumber: '',
        firstDate: '',
        belongOrganizationId: '',
        machining: '',
        mainProducts: '',
        processDescription: '',
        enterpriseProfile: '',
        remark: '',
        safeNumber: '',
        qualificationNumber: '',
        qualificationCategory: '',
        id: getUuid()
      },
      rules: {
        name: [{ required: true, message: '请输入企业名称 ', trigger: 'blur' }],
        unitNature: [{ required: true, message: '请选择企业性质', trigger: 'change' }],
        mainBusiness: [{ required: true, message: '请选择主营业务', trigger: 'change' }],
        taxpayerType: [{ required: true, message: '请选择纳税人类型', trigger: 'change' }],
        informationCode: [{ required: true, message: '请输入统一社会信用代码 ', trigger: 'blur' },
          { min: 0, max: 20, message: '长度不能大于20 个字符', trigger: 'blur' }],
        establishmentDate: [{ required: true, message: '请选择成立日期 ', trigger: 'change' }],
        businessScope: [{ required: true, message: '请输入经营范围 ', trigger: 'blur' }],
        registeredPlace: [{ required: true, message: '请选择注册地', trigger: 'change' }],
        officeAddress: [{ required: true, message: '请输入办公地址', trigger: 'blur' }],
        postalAddress: [{ required: true, message: '请输入通讯地址', trigger: 'blur' }],
        telephone: [{ required: true, message: '请输入公司电话', trigger: 'blur' },
          { min: 0, max: 13, message: '长度不能大于13 个字符', trigger: 'blur' }],
        // registeredCapital: [{ validator: validMoney, trigger: 'blur' }],
        // fixedAssets: [{ validator: validNumber, trigger: 'blur' }],
        scale: [{ validator: validInteger, trigger: 'blur' }],
        qqNumber: [{ validator: validqqNumber, trigger: 'blur' }],
        businessLicense: [{ required: false, message: '请上传附件', trigger: 'blur' }],
        email: [{ required: true, validator: validMail, trigger: 'blur' }],
        legal: [{ required: true, message: '请输入法定代表人', trigger: 'blur' }],
        idNumber: [{ required: true, validator: validID, trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        contacts: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        contactPhone: [{ required: true, message: '请输入联系电话', trigger: 'blur' },
          { min: 0, max: 13, message: '长度不能大于13 个字符', trigger: 'blur' }],
        phoneNumber: [{ required: true, validator: validPhone, trigger: 'blur' }],
        firstDate: [{ required: true, message: '请选择首次合作日期', trigger: 'change' }],
        // belongOrganizationId: [{ required: true, message: '请选择归属单位', trigger: 'change' }],
        enterpriseProfile: [{ required: true, message: '请输入企业简介', trigger: 'blur' }]
      },
      orgType: [],
      disabledSelect: false,
      isExistId: this.$route.query.isExistId

    }
  },
  computed: {
    ...mapGetters(['constant']),
    updataType() {
      return this.$route.query.updataType
    },
    nameView() {
      return this.$route.query.view
    }
  },
  watch: {
    enterpriseId: {
      handler(v) {
        if (v) {
          this.fetchData()
        }
      },
      immediate: true,
      deep: true
    },
    serviceId(v) {
      if (v) {
        this.fetchData()
      }
    },
    updateId: {
      handler(v) {
        if (v) {
          this.fetchData()
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.actionUrl = this.actionUrl.replace('platform', 'cooperativeunit')
    this.ruleForm.belongOrganizationId = getSessionStorage('userOrgId')

    if (!JSON.parse(getSessionStorage('userOrg'))) {
      getOrganization().then(({ data }) => {
        this.organizationList.push(data)
      })
    } else {
      this.organizationList.push(JSON.parse(getSessionStorage('userOrg')))
    }
    if (this.isExistId) {
      this.fetchData()
    }
    if (this.code[1] === 'CLGY') {
      this.ruleForm.mainBusiness = 'CLGY'
      this.ruleForm.machining = false
      this.disabledSelect = false
    } else if (this.code[1] === 'LWFB') {
      this.disabledSelect = true

      this.ruleForm.mainBusiness = 'LWFB'
    } else if (this.code[1] === 'JZZS') {
      this.disabledSelect = true
      this.ruleForm.mainBusiness = 'JZZS'
    } else {
      this.disabledSelect = true
      this.ruleForm.mainBusiness = 'QTLX'
    }
    if (!this.code) {
      this.disabledSelect = false
    }

    this.$store.dispatch('getConstant', ['enterpriseNature', 'gender', 'taxpayerType', 'quaCategory', 'nativePlace', 'mainBusiness', 'CooperativeUnitState', 'managementModel']).then(() => {
      this.constant.quaCategory = this.constant.quaCategory.map(item => {
        item.children = [{
          code: '01',
          name: '一级'
        }, {
          code: '02',
          name: '二级'
        }, {
          code: '03',
          name: '不分等级'
        }]
        return item
      })
    })
  },
  methods: {

    uploadbefore(type) {
      switch (type) {
        case 'idCard':
          this.uploadData.typeCode = 'idCard'
          break
        case 'degreeCard':
          this.uploadData.typeCode = 'degreeCard'
          break
        default:
          break
      }
    },
    fetchFileList(id, type) {
      this.getFileLoad(id, type).then(data => {
        switch (type) {
          case 'idCard':
            this.idCardList = data
            this.idCardList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            break
          case 'degreeCard':
            this.degreeList = data
            this.degreeList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            break
          default:
            break
        }
      })
    },
    fileIdCardSuccess(response, file, fileList) {
      this.idCardLoading = false
      this.$message.success('上传成功')
      this.idCardList = fileList
      this.uploadLoading.close()
    },
    fileDegreeSuccess(response, file, fileList) {
      this.degreeList = fileList
      this.uploadLoading.close()
    },
    discriCard() {
      if (this.ruleForm.idNumber.length > 16) {
        parseInt(this.ruleForm.idNumber.substr(16, 1)) % 2 === 1 ? this.ruleForm.gender = '1' : this.ruleForm.gender = '2'
      }
    },
    fetchData() {
      if (this.serviceId) {
        this.loading = true
        seeBusiness(this.serviceId).then(({ data }) => {
          this.ruleForm = data
          this.loading = false
          // 拼接注册地
          this.ruleForm.registeredPlace = data.registeredPlace.split(',')
          const { id } = this.ruleForm
          this.uploadData.businessDataId = id
          this.fetchFileList(id, 'idCard')
          this.fetchFileList(id, 'degreeCard')
        })
      } else if (this.updateId) {
        this.loading = true
        providelist(this.updateId).then(({ data }) => {
          this.ruleForm = data
          this.loading = false
          // 拼接注册地
          this.ruleForm.registeredPlace = data.registeredPlace.split(',')
          const { id } = this.ruleForm
          this.uploadData.businessDataId = id
          this.fetchFileList(id, 'idCard')
          this.fetchFileList(id, 'degreeCard')
        })
      } else if (this.isExistId) {
        this.loading = true
        seeBusiness(this.isExistId).then(({ data }) => {
          this.ruleForm = data
          this.loading = false
          // 拼接注册地
          this.ruleForm.registeredPlace = data.registeredPlace.split(',')
          // 显示附件
          this.fetchFileList(this.isExistId, 'idCard')
          this.fetchFileList(this.isExistId, 'degreeCard')
        })
      } else {
        this.loading = true
        seeBusiness(this.enterpriseId).then(({ data }) => {
          if (data.companyChildType !== 'CLGY') {
            this.disabledSelect = true
          }
          this.ruleForm = data
          this.loading = false
          // 拼接注册地
          this.ruleForm.registeredPlace = data.registeredPlace.split(',')
          this.ruleForm.qualificationCategory = data.qualificationCategory.split(',')
          this.ruleForm.companyId = data.companyId === null ? '否' : '是'
          this.$emit('childEvent', data.name)
          const { id } = this.ruleForm
          this.uploadData.businessDataId = id
          this.fetchFileList(id, 'idCard')
          this.fetchFileList(id, 'degreeCard')
        })
      }
    },
    addOrEdit() {
      return new Promise((resolve, inject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (!this.idCardList.length) {
              this.$message.warning('请上传营业执照')
              return
            }
            const { mainBusiness } = this.ruleForm
            if (mainBusiness === 'JZZS' || mainBusiness === 'LWFB') {
              if (!this.degreeList.length) {
                this.$message.warning('请上传安全生产许可证')
                return
              }
            }
            const params = {
              Loading: true,
              ...this.ruleForm,
              id: this.uploadData.businessDataId,
              companyChildType: this.code[1],
              companyType: this.code[0],
              belongOrganizationName: getSessionStorage('userOrgName')
            }
            if (this.ruleForm.registeredPlace) {
              params.registeredPlace = params.registeredPlace.toString()
            }
            if (this.ruleForm.qualificationCategory) {
              params.qualificationCategory = params.qualificationCategory.toString()
            }
            if (this.enterpriseId) {
              updateBusiness(params, this.enterpriseId).then(({ data }) => {
                this.$message.success('修改成功!')
                resolve(data)
              })
            } else {
              saveBusiness(params).then(({ data }) => {
                this.$message.success('保存成功!')
                resolve(data)
              })
            }
          } else {
            inject()
            return false
          }
        })
      })
    },
    handleRemoveIdCard(file, fileList) {
      var id = ''
      if (file.response) {
        id = file.response.data[0].id
      } else {
        id = file.id
      }
      deleteFileCoop(id).then(res => {
        this.idCardList = fileList
      })
    },
    handleRemoveDegree(file, fileList) {
      var id = ''
      if (file.response) {
        id = file.response.data[0].id
      } else {
        id = file.id
      }
      deleteFileCoop(id).then(res => {
        this.degreeList = fileList
      })
    }
  }
}
</script>

<style lang="less" scoped>
	.base-info {

		.ruleForm {
			display: flex;
			flex-wrap: wrap;
			&>.el-form-item {
				width: 33.33%;
			}
			.companyType {
				width: 100%;
				display: flex;
				flex-wrap: wrap;

				&>div {
					&:first-child {
						width: 66.66%;
						display: flex;
						flex-wrap: wrap;

						.el-form-item {
							width: 50%;
						}
					}

					&:last-child {
						width: 33.33%;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}

			.companydefault {
				width: 100%;
				display: flex;
				flex-wrap: wrap;

				&>div {
					&:first-child {
						width: 100%;
						display: flex;
						flex-wrap: wrap;

						.el-form-item {
							width: 33.33%;
						}
					}
				}
			}
			.el-select,
			.el-input {
				width: 100%;
			}
			.full-width {
				width: 100%;
			}
		}
	}
</style>
<style lang="less">
    .el-upload-list__item .el-progress{
      display: none !important;
    }
</style>
