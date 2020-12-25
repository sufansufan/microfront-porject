<template>
  <div class="base-info">
    <el-form ref="ruleForm" :key="key" :model="ruleForm" label-width="170px" :rules="rules" class="ruleForm">
      <el-form-item label="企业编号" prop="unitNumber">
        <el-input v-model.trim="ruleForm.unitNumber" maxlength="20" clearable show-word-limit :disabled="disabled" placeholder="请输入企业编号" />
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model.trim="ruleForm.name" maxlength="50" clearable show-word-limit :disabled="disabled" placeholder="请输入企业名称" />
      </el-form-item>
      <el-form-item label="主营业务" prop="mainBusiness">
        <el-select v-model="ruleForm.mainBusiness" disabled clearable placeholder="请选择主营业务">
          <el-option v-for="item in constant.mainBusiness" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="企业性质" prop="unitNature">
        <el-select v-model="ruleForm.unitNature" clearable :disabled="disabled || dis" placeholder="请选择企业性质">
          <el-option v-for="item in constant.enterpriseNature " :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="纳税人类型" prop="taxpayerType">
        <el-select v-model="ruleForm.taxpayerType" clearable :disabled="disabled || dis" placeholder="请选择纳税人类型">
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
        <el-select v-model="ruleForm.managementModel" clearable :disabled="disabled || disabledSelect || mainAndNumber && ruleForm.mainBusiness !== 'CLGY'" placeholder="请选择经营模式">
          <el-option v-for="item in constant.managementModel" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>

      <el-form-item label="统一社会信用代码" prop="informationCode">
        <el-input v-model.trim="ruleForm.informationCode" clearable maxlength="20" show-word-limit :disabled="disabled || mainAndNumber" placeholder="请输入统一社会信用代码" />
      </el-form-item>
      <el-form-item label="成立日期" prop="establishmentDate">
        <el-date-picker v-model="ruleForm.establishmentDate" clearable :disabled="disabled" placeholder="请选择成立日期" type="date" />
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
          v-model="ruleForm.qualificationCategory"
          style="width:100%"
          clearable
          placeholder="请选择资质"
          :options="constant.quaCategory"
          :props="{ expandTrigger: 'hover', value: 'code', label: 'name', children: 'childs' }"
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
        <el-input v-model.trim="ruleForm.businessScope" type="textarea" clearable :rows="3" :disabled="disabled" placeholder="请输入经营范围" maxlength="200" show-word-limit />
      </el-form-item>
      <el-form-item label="注册资本（元）" prop="registeredCapital">
        <amount-input v-model.trim="ruleForm.registeredCapital" clearable :disabled="disabled" placeholder="请输入注册资本" />
      </el-form-item>
      <el-form-item label="固定资产（元）" prop="fixedAssets">
        <amount-input v-model.trim="ruleForm.fixedAssets" clearable :disabled="disabled" placeholder="请输入固定资产" />
      </el-form-item>
      <el-form-item label="注册地" prop="registeredPlace">
        <el-cascader
          v-model="ruleForm.registeredPlace"
          placeholder="请选择注册地"
          clearable
          :disabled="disabled"
          style="width:100%"
          :options="constant.nativePlace"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children' }"
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
      <el-form-item
        label="规模(人数)"
        prop="scale"
      >
        <el-input v-model.trim="ruleForm.scale" clearable :disabled="disabled" placeholder="请输入规模（人数）" />
      </el-form-item>
      <el-form-item label="传真" prop="fax">
        <el-input v-model.trim="ruleForm.fax" maxlength="20" clearable :disabled="disabled" placeholder="请输入传真" />
      </el-form-item>
      <el-form-item label="法定代表人" prop="legal">
        <el-input v-model.trim="ruleForm.legal" :disabled="disabled" clearable placeholder="请输入法定代表人" />
      </el-form-item>
      <el-form-item label="身份证号" prop="idNumber">
        <el-input v-model.trim="ruleForm.idNumber" maxlength="18" clearable show-word-limit :disabled="disabled" placeholder="请输入身份证号" @input="discriCard" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="ruleForm.gender" :disabled="disabled" clearable placeholder="请选择性别">
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

      <el-form-item
        v-if="ruleForm.mainBusiness === 'CLGY'"
        label="是否提供加工/定制服务"
        prop="machining"
        :rules="[
          {required:ruleForm.mainBusiness === 'CLGY',message:'请选择是否加工/定制服务',trigger:change}
        ]"
      >
        <el-select v-model="ruleForm.machining" clearable :disabled="disabled" placeholder="请选择是否提供加工/定制服务">
          <el-option v-for="item in isMachining" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.mainBusiness === 'CLGY'" label="主营产品分类" prop="mainProducts" class="full-width">
        <el-select v-model="ruleForm.mainProducts" clearable :disabled="disabled" placeholder="请选择主营产品分类">
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
        <span slot="label"><span class="custom-form-label ">*</span>营业执照</span>
        <el-upload
          :file-list="idCardList"
          :action="actionUrl"
          :on-success="fileIdCardSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemoveIdCard"
          :disabled="disabled"
          :before-upload="beforeUpload50M"
        >
          <el-button type="primary" :disabled="disabled" @click="uploadbefore('idCard')">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="ruleForm.mainBusiness === 'LWFB' ||ruleForm.mainBusiness === 'JZZS'" class="row-label">
        <span slot="label"><span class="custom-form-label row-label">*</span>安全生产许可证</span>
        <el-upload
          :file-list="degreeList"
          :action="actionUrl"
          :on-success="fileDegreeSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemoveDegree"
          :disabled="disabled"
          :before-upload="beforeUpload50M"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="uploadbefore('degreeCard')">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" class="full-width row-label" prop="remark">
        <el-input v-model.trim="ruleForm.remark" type="textarea" :rows="3" :disabled="disabled" placeholder="请输入备注" maxlength="200" show-word-limit />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import upload from '@core/mixins/upload'
import { mapGetters } from 'vuex'
import { getCurrentPersonnelInfo } from '@core/api/personnel'
import { provideAdd, provideUpdate, providelist } from '@core/api/cooperativeEnterprise/provideunitinfo'
import { validateID, validatePhone, validateInteger, validateEmail, validateNumber } from '@core/utils/validate'
import { deleteFileCoop, copyFile } from '@core/api/accessoryFile'
import { getSessionStorage } from '@core/utils/auth'
export default {
  mixins: [upload],
  props: {
    disabled: {
      default: true,
      type: Boolean
    },
    code: {
      default: '',
      type: String
    },
    updateId: {
      default: '',
      type: String
    },
    operateinfoId: {
      default: '',
      type: String
    },
    updateuId: {
      default: '',
      type: String
    },
    sameId: {
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
    var validInteger = (rule, value, callback) => {
      if (!validateInteger(value) && value) {
        callback(new Error('请输入正整数，'))
      } else {
        callback()
      }
    }
    // var validNumber = (rule, value, callback) => {
    //   if (!validatePositive(value) && value) {
    //     callback(new Error('请输入任意正整数，正小数（小数位不超过2位），'))
    //   } else {
    //     callback()
    //   }
    // }
    var validqqNumber = (rule, value, callback) => {
      if (!validateNumber(value) && value) {
        callback(new Error('只能是数字'))
      } else {
        callback()
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
      idCardList: [],
      degreeList: [],
      saveId: '',
      uid: '',
      disOrg: true,
      isMachining: [
        {
          code: '1',
          name: '是'
        },
        {
          code: '0',
          name: '否'
        }
      ],
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
        machining: '0',
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
        mainProducts: '',
        processDescription: '',
        enterpriseProfile: '',
        remark: '',
        safeNumber: '',
        qualificationNumber: '',
        qualificationCategory: ''
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
        telephone: [{ required: true, message: '请输入公司电话', trigger: 'blur' }],
        qqNumber: [{ validator: validqqNumber, trigger: 'blur' }],
        // registeredCapital: [{ validator: validNumber, trigger: 'blur' }],
        // fixedAssets: [{ validator: validNumber, trigger: 'blur' }],
        scale: [{ validator: validInteger, trigger: 'blur' }],
        email: [{ required: true, validator: validMail, trigger: 'blur' }],
        legal: [{ required: true, message: '请输入法定代表人', trigger: 'blur' }],
        idNumber: [{ required: true, validator: validID, trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        contacts: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        contactPhone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        phoneNumber: [{ required: true, validator: validPhone, trigger: 'blur' }],
        // firstDate: [{ required: true, message: '请选择首次合作日期', trigger: 'change' }],
        belongOrganizationId: [{ required: true, message: '请选择归属单位', trigger: 'change' }],
        enterpriseProfile: [{ required: true, message: '请输入企业简介', trigger: 'blur' }]
      },
      orgType: [],
      disabledSelect: false,
      newsId: this.$route.query.newsId,
      serviceId: this.$route.query.serviceId,
      noticeId: this.$route.query.noticeId,
      updateDate: '',
      organizationId: '',
      mainAndNumber: false,
      a: 1
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    operateinfoId(v) {
      if (v) {
        this.fetchData()
      }
    },
    updateId(v) {
      if (v) {
        this.fetchData()
      }
    }
  },
  created() {
    this.actionUrl = this.actionUrl.replace('platform', 'cooperativeunit')
    this.organizationId = getSessionStorage('userOrgId')
    if (!this.organizationId) {
      this.organizationId = getSessionStorage('mainOrgId')
    }
    const title = this.$route.query.title
    if (title === '完善信息' || title === '更新信息') {
      if (this.newsId) {
        this.fetchData()
      } else {
        this.fetchOrgInfo()
        this.mainAndNumber = true
      }
    } else if (title === '查看企业最新信息' || title === '历史记录') {
      this.fetchData()
    }
    this.$store.dispatch('getConstant', ['enterpriseNature', 'gender', 'taxpayerType', 'quaCategory', 'nativePlace', 'mainBusiness', 'managementModel'])
  },
  methods: {
    uploadbefore(type) {
      switch (type) {
        case 'idCard':
          this.uploadData.typeCode = 'idCard'
          this.uploadData.businessDataId = this.sameId
          break
        case 'degreeCard':
          this.uploadData.typeCode = 'degreeCard'
          this.uploadData.businessDataId = this.sameId
          break
        default:
          break
      }
    },
    fetchFileList(id, type, copy) {
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
        if (copy === 'copy') {
          const param = data
          param.map(item => {
            item.businessDataId = this.sameId
          })
          copyFile(param).then(({ data }) => {
            switch (type) {
              case 'idCard':
                this.idCardList = data
                if (data) {
                  this.idCardList.map(item => {
                    item.name = item.fileName
                    item.url = item.fileUrl
                    return item
                  })
                }
                break
              case 'degreeCard':
                this.degreeList = data
                if (data) {
                  this.degreeList.map(item => {
                    item.name = item.fileName
                    item.url = item.fileUrl
                    return item
                  })
                }
                break
              default:
                break
            }
          })
        }
      })
    },
    fileIdCardSuccess(response, file, fileList) {
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
      if (this.operateinfoId) {
        providelist(this.operateinfoId).then(({ data }) => {
          this.ruleForm = data
          this.ruleForm.registeredPlace = data.registeredPlace.split(',')
          if (data.machining) {
            this.ruleForm.machining = '1'
          } else {
            this.ruleForm.machining = '0'
          }
        })
      } else if (this.newsId || this.noticeId) {
        providelist(this.newsId || this.noticeId).then(({ data }) => {
          this.ruleForm = data
          this.ruleForm.registeredPlace = data.registeredPlace.split(',')
          const { id } = this.ruleForm
          this.uploadData.businessDataId = id
          this.fetchFileList(id, 'idCard', 'copy')
          this.fetchFileList(id, 'degreeCard', 'copy')
          this.mainAndNumber = true
          if (data.machining) {
            this.ruleForm.machining = '1'
          } else {
            this.ruleForm.machining = '0'
          }
        })
      } else if (this.serviceId) {
        providelist(this.serviceId).then(({ data }) => {
          this.ruleForm = data
          this.ruleForm.registeredPlace = data.registeredPlace.split(',')
          const { id } = this.ruleForm
          this.uploadData.businessDataId = id
          this.fetchFileList(id, 'idCard')
          this.fetchFileList(id, 'degreeCard')
          if (data.machining) {
            this.ruleForm.machining = '1'
          } else {
            this.ruleForm.machining = '0'
          }
        })
      } else if (this.updateId) {
        providelist(this.updateId).then(({ data }) => {
          this.ruleForm = data
          this.ruleForm.registeredPlace = data.registeredPlace.split(',')
          if (data.machining) {
            this.ruleForm.machining = '1'
          } else {
            this.ruleForm.machining = '0'
          }
        })
      }
    },

    fetchOrgInfo() {
      getCurrentPersonnelInfo(this.organizationId).then(({ data: { organizationDTO, personnelDTO }}) => {
        const { orgNumber, orgName, mainBusiness, unitNature, taxpayerType, managementModel, creditCode, establishmentDate, registeredCapital, registeredPlace, officeAddress, telephone, legalPersonName, orgProfile, remark, isMachining, processDescription } = organizationDTO
        this.ruleForm = {
          unitNumber: orgNumber,
          name: orgName,
          mainBusiness: mainBusiness || 'JZZS',
          unitNature,
          taxpayerType,
          managementModel,
          informationCode: creditCode,
          establishmentDate,
          businessScope: '',
          registeredCapital,
          fixedAssets: '',
          registeredPlace: registeredPlace.split(','),
          officeAddress,
          postalAddress: '',
          telephone,
          email: '',
          scale: '',
          fax: '',
          legal: legalPersonName,
          idNumber: '',
          gender: '',
          contacts: '',
          contactPhone: '',
          qqNumber: '',
          phoneNumber: '',
          firstDate: '',
          belongOrganizationId: '',
          mainProducts: '',
          processDescription,
          enterpriseProfile: orgProfile,
          remark,
          safeNumber: '',
          qualificationNumber: '',
          qualificationCategory: ''
        }
        this.ruleForm.machining = isMachining || '0'
      })
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
            if (this.serviceId) {
              const params = {
                Loading: true,
                ...this.ruleForm,
                // id: this.uploadData.businessDataId,
                id: this.sameId,
                operateinfoId: this.serviceId,
                belongOrganizationName: getSessionStorage('userOrgName')
              }
              params.registeredPlace = params.registeredPlace.toString()
              params.qualificationCategory = params.qualificationCategory.toString()
              if (params.machining === '0') {
                params.machining = false
              } else {
                params.machining = true
              }
              if (this.updateDate === null) {
                provideUpdate(params).then(({ data }) => {
                  this.$message.success('修改成功!')
                  resolve(data)
                })
              } else {
                provideAdd(params).then(({ data }) => {
                  this.$message.success('保存成功!')
                  resolve(data)
                })
              }
            } else if (this.newsId) {
              const params = {
                Loading: true,
                ...this.ruleForm,
                id: this.sameId,
                operateinfoId: this.newsId,
                belongOrganizationName: getSessionStorage('userOrgName')
              }
              params.registeredPlace = params.registeredPlace.toString()
              params.qualificationCategory = params.qualificationCategory.toString()
              if (params.machining === '0') {
                params.machining = false
              } else {
                params.machining = true
              }
              if (this.$route.query.title === '更新信息') {
                params.operateinfoId = this.$route.query.operaId
              }
              if (this.updateDate === null) {
                provideUpdate(params).then(({ data }) => {
                  this.$message.success('修改成功!')
                  resolve(data)
                })
              } else {
                provideAdd(params).then(({ data }) => {
                  this.$message.success('保存成功!')
                  resolve(data)
                })
              }
            } else {
              const param = {
                Loading: true,
                ...this.ruleForm,
                id: this.sameId,
                operateinfoId: this.$route.query.operaId,
                belongOrganizationName: getSessionStorage('userOrgName')
              }
              param.registeredPlace = param.registeredPlace.toString()
              param.qualificationCategory = param.qualificationCategory.toString()
              if (param.machining === '0') {
                param.machining = false
              } else {
                param.machining = true
              }
              if (this.updateDate === null) {
                provideUpdate(param).then(({ data }) => {
                  this.$message.success('修改成功!')
                  resolve(data)
                })
              } else {
                provideAdd(param).then(({ data }) => {
                  this.$message.success('保存成功!')
                  resolve(data)
                })
              }
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
