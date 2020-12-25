<template>
  <div class="base-info">
    <el-form ref="ruleForm" v-loading="loading" :model="ruleForm" label-width="170px" :rules="rules" class="ruleForm">
      <div :class="companyType === '1' ? 'companyType' : 'companydefault'">
        <div>
          <el-form-item label="组织编号" prop="orgNumber">
            <el-input v-model.trim="ruleForm.orgNumber" :maxlength="20" :disabled="disabled" placeholder="请输入组织编号" />
          </el-form-item>
          <el-form-item label="组织名称" prop="orgName">
            <el-input v-model.trim="ruleForm.orgName" :maxlength="50" :disabled="disabled" placeholder="请输入组织名称" />
          </el-form-item>
          <el-form-item label="简称" prop="simpleName">
            <el-input v-model.trim="ruleForm.simpleName" :maxlength="20" :disabled="disabled" placeholder="请输入简称" />
          </el-form-item>
          <el-form-item label="组织类别" prop="orgType">
            <el-select v-model="ruleForm.orgType" :disabled="disabled || dis || orgTypeDisadled" placeholder="请选择组织类别" @change="OrgCategory">
              <el-option v-for="item in constant.orgType" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item
            ref="parentForm"
            label="上级组织"
            prop="parentId"
            :rules="[
              { required: ruleForm.orgType !== 'Company', message: '请选择上级组织 ', trigger: 'change' }
            ]"
          >
            <el-cascader
              v-model="ruleForm.parentId"
              placeholder="请选择上级组织"
              :options="topOrganization"
              :props="defaultProps"
              filterable
              :disabled="disabled ||dis"
              clearable
              style="width:100%"
            />
          </el-form-item>
          <el-form-item label="顺序号" prop="sequenceNumber">
            <el-input v-model.trim="ruleForm.sequenceNumber" :maxlength="8" :disabled="disabled" placeholder="请输入顺序号" />
          </el-form-item>
        </div>
        <template v-if="companyType === '1'">
          <div class="upload-frame" @click="fileClick('photo')">
            <el-upload
              class="avatar-uploader"
              :action="actionUrl"
              :show-file-list="false"
              :data="uploadData"
              :headers="uploadHeaders"
              :on-success="uploadSuccess"
              :disabled="disabled"
              :before-upload="beforeUpload2M"
            >
              <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar" style="width: 100%; height: 100%">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
              <div slot="tip" class="tip-color">建议上传200X200px的图片，大小不能超过2M</div>
            </el-upload>
          </div>
        </template>
      </div>
      <template v-if="ruleForm.orgType==='SubCompany'|| ruleForm.orgType==='ProjectDepartment'|| ruleForm.orgType==='Company'">
        <el-form-item label="是否是法人单位" prop="isLegalEntity">
          <el-select v-model="ruleForm.isLegalEntity" :disabled="disabled" placeholder="请选择是否是法人单位" @change="changeIsLegalEntity">
            <el-option v-for="item in constant.isLegalEntity" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item ref="legalPersonName" label="法定代表人" prop="legalPersonName">
          <el-input v-model.trim="ruleForm.legalPersonName" :disabled="disabled?disabled:legalPersonNameDisabled" placeholder="请输入法定代表人" />
        </el-form-item>
        <el-form-item label="主营业务" prop="mainBusiness">
          <el-select v-model="ruleForm.mainBusiness" disabled placeholder="请选择主营业务">
            <el-option v-for="item in constant.businessType" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="creditCode">
          <el-input v-model.trim="ruleForm.creditCode" :maxlength="20" :disabled="disabled" placeholder="请输入统一社会信用代码" />
        </el-form-item>
        <el-form-item label="注册资本" prop="registeredCapital">
          <el-input v-model.trim="ruleForm.registeredCapital" :maxlength="20" :disabled="disabled" placeholder="请输入注册资本" />
        </el-form-item>
        <el-form-item label="注册地" prop="registeredPlace">
          <el-cascader
            v-model="ruleForm.registeredPlace"
            placeholder="请选择注册地"
            clearable
            :disabled="disabled"
            filterable
            :options="constant.nativePlace"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children' }"
            style="width:100%"
          />

        </el-form-item>
        <el-form-item label="企业性质" prop="unitNature">
          <el-select v-model="ruleForm.unitNature" :disabled="disabled" placeholder="请选择企业性质">
            <el-option v-for="item in constant.enterpriseNature" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="纳税人类型" prop="taxpayerType">
          <el-select v-model="ruleForm.taxpayerType" :disabled="disabled" placeholder="请选择纳税人类型">
            <el-option v-for="item in constant.taxpayerType" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="mainBusinessJudge" label="经营模式" prop="managementModel">
          <el-select v-model="ruleForm.managementModel" :disabled="disabled" placeholder="请选择经营模式">
            <el-option v-for="item in constant.managementModel" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="typeState==='see'" label="状态">
          <el-select v-model="ruleForm.state" :disabled="disabled" placeholder="请选择状态">
            <el-option v-for="item in constant.organizationState" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="mainBusinessJudge" label="是否提供加工/定制服务" prop="isMachining">
          <el-select v-model="ruleForm.isMachining" :disabled="disabled" placeholder="请选择是否提供加工/定制服务">
            <el-option v-for="item in constant.isMachining" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="mainBusinessJudge" label="主营产品分类" class="full-width" prop="mainProducts">
          <el-select v-model="ruleForm.mainProducts" :disabled="disabled" placeholder="请选择主营产品分类">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="mainBusinessJudge" label="工艺说明" class="full-width" prop="processDescription">
          <el-input v-model.trim="ruleForm.processDescription" type="textarea" :rows="3" :disabled="disabled" placeholder="请输入工艺说明" :maxlength="255" />
        </el-form-item>
      </template>
      <el-form-item label="成立日期" prop="establishmentDate">
        <el-date-picker v-model="ruleForm.establishmentDate" :disabled="disabled" placeholder="请选择成立日期" type="date" />
      </el-form-item>
      <el-form-item label="联系电话" prop="telephone">
        <el-input v-model.trim="ruleForm.telephone" :disabled="disabled" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="办公地址" prop="officeAddress">
        <el-input v-model.trim="ruleForm.officeAddress" :maxlength="50" :disabled="disabled" placeholder="请输入办公地址" />
      </el-form-item>
      <el-form-item v-if="typeState==='see'" label="状态">
        <el-select v-model="ruleForm.state" :disabled="disabled" placeholder="请选择状态">
          <el-option v-for="item in constant.organizationState" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="组织简介" class="full-width row-label" prop="orgProfile">
        <el-input v-model.trim="ruleForm.orgProfile" type="textarea" :maxlength="255" :rows="3" :disabled="disabled" placeholder="请输入组织简介" />
      </el-form-item>
      <el-form-item label="附件" class="full-width">
        <el-upload
          :file-list="fileList"
          :action="actionUrl"
          :on-success="fileSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemove"
          :before-upload="beforeUpload50M"
          :disabled="disabled"
          :on-error="fileError"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="fileClick('file')">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" class="full-width row-label" prop="remark">
        <el-input v-model.trim="ruleForm.remark" type="textarea" :maxlength="255" :rows="3" :disabled="disabled" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import upload from '@core/mixins/upload'
import { validatePhone, validateNumber, validateLength } from '@core/utils/validate'
import { saveOrganization, editOrganization, detailsOrg, getOrgTree, verificationOrg } from '@core/api/organization'
import { judgePersonnelProOrDep } from '@core/api/personnel'
import { mapGetters } from 'vuex'
import { getSessionStorage } from '@core/utils/auth'
import { filterListData } from '@core/utils'
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
    personnelId: {
      default: '',
      type: String
    },
    organizationId: {
      default: '',
      type: String
    }
  },
  data() {
    var validPhone = (rule, value, callback) => {
      if (value) {
        if (!validatePhone(value)) {
          callback(new Error('请输入正确的电话'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var validNumber = (rule, value, callback) => {
      if (!validateNumber(value)) {
        callback(new Error('长度只能是3-8位的纯数字'))
      } else {
        callback()
      }
    }
    var validateSequenceNumber = (rule, value, callback) => {
      var params = {
        sequenceNumber: this.ruleForm.sequenceNumber,
        id: this.personnelId
      }
      verificationOrg(params).then(res => {
        if (res && res.data === true) {
          callback()
        } else if (res && res.data === false) {
          callback('顺序号已存在，请重新输入')
        }
      })
    }
    return {
      defaultProps: {
        children: 'children',
        label: 'orgName',
        value: 'id',
        checkStrictly: true
      },
      ruleForm: {
        orgNumber: '',
        orgName: '',
        simpleName: '',
        orgType: '',
        parentId: [],
        sequenceNumber: '',
        isLegalEntity: '0',
        legalPersonName: '',
        mainBusiness: '',
        creditCode: '',
        registeredCapital: '',
        registeredPlace: '',
        establishmentDate: '',
        telephone: '',
        officeAddress: '',
        unitNature: '',
        taxpayerType: '',
        managementModel: '',
        isMachining: '0',
        mainProducts: '',
        processDescription: '',
        orgProfile: '',
        remark: ''
      },
      rules: {
        orgNumber: [validateLength(0, 20)],
        orgName: [{ required: true, message: '请输入组织名称 ', trigger: 'blur' }, validateLength(0, 50)],
        orgType: [{ required: true, message: '请选择组织类别 ', trigger: 'change' }],
        simpleName: [validateLength(0, 20)],
        sequenceNumber: [
          { required: true, message: '请输入顺序号', trigger: 'blur' },
          { validator: validNumber, trigger: 'blur' },
          { required: true, validator: validateSequenceNumber, trigger: 'blur' }
        ],
        isLegalEntity: [{ required: true, message: '请选择是否法人单位 ', trigger: 'change' }],
        creditCode: [{ required: true, message: '请输入统一社会信用代码 ', trigger: 'blur' }, validateLength(0, 20)],
        registeredCapital: [{ required: true, message: '请输入注册资本 ', trigger: 'blur' }, validateLength(0, 20)],
        registeredPlace: [{ required: true, message: '请选择注册地', trigger: 'change' }],
        establishmentDate: [{ required: true, message: '请选择成立日期', trigger: 'change' }],
        officeAddress: [{ required: true, message: '请输入办公地址', trigger: 'blur' }, validateLength(0, 50)],
        unitNature: [{ required: true, message: '请选择企业性质', trigger: 'change' }],
        managementModel: [{ required: true, message: '请选择经营模式', trigger: 'change' }],
        isMachining: [{ required: true, message: '请选择是否提供加工/定制服务', trigger: 'change' }],
        mainProducts: [{ required: false, message: '请选择主营产品分类', trigger: 'change' }],
        taxpayerType: [{ required: true, message: '请选择纳税人类型', trigger: 'change' }],
        telephone: [{ validator: validPhone, trigger: 'blur' }],
        legalPersonName: [validateLength(0, 20)],
        processDescription: [validateLength(0, 255)],
        remark: [validateLength(0, 255)],
        orgProfile: [validateLength(0, 255)]
      },
      topOrganization: [],
      options: [],
      Category: null,
      orgType: [],
      dis: false,
      legalPersonNameDisabled: true,
      mainBusinessJudge: false,
      orgTypeDisadled: false,
      photoList: [],
      typeState: this.$route.query.type,
      loading: false
    }
  },

  computed: {
    ...mapGetters(['constant', 'navInfo'])
  },
  watch: {
    personnelId: {
      handler(value) {
        if (value) {
          this.getTree().then(() => {
            this.fetchData()
          })
        }
      },
      immediate: true,
      deep: true
    },
    organizationId: {
      handler(value) {
        if (value) {
          this.getTree().then(() => {
            this.fetchData()
          })
        }
      },
      immediate: true,
      deep: true
    },
    'ruleForm.orgType': {
      handler: function(value) {
        value === 'Department' ? this.$emit('pushDepartmentStatus', false) : this.$emit('pushDepartmentStatus', true)
        const list = JSON.parse(JSON.stringify(this.topOrganization))
        this.topOrganization = []
        if (value === 'SubCompany' || value === 'ProjectDepartment') {
          this.topOrganization = this.getTreeList(list, true)
        } else {
          this.topOrganization = this.getTreeList(list, false)
        }
      }
    }

  },
  created() {
    const { mainBusiness } = JSON.parse(getSessionStorage('navInfo'))
    this.$store.dispatch('getConstant', ['organizationState', 'isLegalEntity', 'mainBusiness', 'nativePlace', 'orgType',
      'businessType', 'enterpriseNature', 'taxpayerType', 'managementModel', 'isMachining']).then(() => {
      if (mainBusiness !== 'JZZS') {
        this.constant.orgType = filterListData(this.constant.orgType, ['ProjectDepartment', 'Company'])
      } else {
        if (!this.dis) this.constant.orgType = filterListData(this.constant.orgType, 'Company')
      }
      if (this.$route.query.type === 'add') {
        this.getPersonnelProOrDep()
      }
    })
    this.getTree()
    this.mainBusinessLogic()
  },
  methods: {
    // 获取详情
    fetchData() {
      const selfRule = this.rules
      this.loading = true
      detailsOrg(this.personnelId || this.organizationId).then(({ data }) => {
        if (!data) {
          this.$message.warning('该资质已被删除')
          this.$router.go(-1)
          return
        }
        this.$emit('childEvent', data.orgName)
        const { isLegalEntity } = data
        this.ruleForm = {
          ...data,
          registeredCapital: data.registeredCapital ? String(data.registeredCapital) : '',
          isLegalEntity: isLegalEntity && isLegalEntity.toString()
        }
        this.loading = false
        if (data.orgType === 'Company') {
          this.dis = true
          this.$store.dispatch('getConstant', 'orgType')
          selfRule.registeredCapital[0].required = true
          selfRule.registeredPlace[0].required = true
          selfRule.creditCode[0].required = true
          selfRule.taxpayerType[0].required = true
        } else {
          this.dis = false
          selfRule.creditCode[0].required = false
          selfRule.taxpayerType[0].required = false
          selfRule.registeredCapital[0].required = false
          selfRule.registeredPlace[0].required = false
        }
        if (data.mainBusiness === 'CLGY') {
          this.mainBusinessJudge = true
        } else {
          this.mainBusinessJudge = false
        }
        // 拼接上级组织   注册地
        this.ruleForm.parentId = data.parentPath ? data.parentPath.split(',') : []
        this.ruleForm.registeredPlace = data.registeredPlace.split(',')
        const { id } = this.ruleForm
        this.uploadData.businessDataId = id

        this.getFile(id, 'organManageBase')
        this.getFile(id, 'organManagePhoto')
      })
    },
    getFile(id, type) {
      this.getFileLoad(id, type).then(data => {
        if (type === 'organManageBase') {
          this.fileList = data
          this.fileList.map(item => {
            item.name = item.fileName
            item.url = item.fileUrl
          })
        } else if (type === 'organManagePhoto') {
          this.uploadImgUrl = data.length ? data[0].fileUrl : ''
          this.photoList = data
        }
      })
    },
    getTree() {
      return new Promise((resolve, reject) => {
        getOrgTree({}).then(({ data }) => {
          this.topOrganization = data
          resolve()
        })
      })
    },
    getTreeList(val, type) {
      val.forEach(item => {
        if (item.orgType !== 'Company') {
          if (!type) {
            delete item.disabled
          } else {
            item.disabled = type
          }
        }
        if (item.children.length) {
          this.getTreeList(item.children, type)
        }
      })
      return val
    },
    // 组织类别判断
    OrgCategory(val) {
      const selfRule = this.rules
      this.Category = val
      this.ruleForm.parentId = ''
      this.$emit('OrgCategory', this.Category)

      // 是否必填项
      if (val !== 'Company') {
        selfRule.creditCode[0].required = false
        selfRule.taxpayerType[0].required = false
        selfRule.registeredCapital[0].required = false
        selfRule.registeredPlace[0].required = false
      } else {
        selfRule.registeredCapital[0].required = true
        selfRule.registeredPlace[0].required = true
        selfRule.creditCode[0].required = true
        selfRule.taxpayerType[0].required = true
      }
    },
    addOrEdit() {
      return new Promise((resolve, inject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const { parentId } = this.ruleForm
            const params = {
              Loading: true,
              ...this.ruleForm,
              parentId: parentId.length ? parentId[parentId.length - 1] : '',
              id: this.uploadData.businessDataId
            }
            // 注册地转换成字符串
            params.registeredPlace = params.registeredPlace.toString()
            if (this.Category === 'Department') {
              if (this.personnelId) {
                editOrganization(params, this.personnelId).then(({ data }) => {
                  this.$message.success('修改成功!')
                  this.$router.go(-1)
                  resolve(data)
                })
              } else {
                saveOrganization(params).then(({ data }) => {
                  this.$message.success('保存成功!')
                  this.$router.go(-1)
                  resolve(data)
                })
              }
            } else {
              if (this.personnelId) {
                editOrganization(params, this.personnelId).then(({ data }) => {
                  this.$message.success('修改成功!')
                  resolve(data)
                })
              } else {
                saveOrganization(params).then(({ data }) => {
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
    // 是否为法人代表  是：可编辑法定代表人 否 不可编辑法人代表
    changeIsLegalEntity() {
      if (this.ruleForm.isLegalEntity === '1') {
        this.legalPersonNameDisabled = false // 是否可编辑
      } else {
        this.legalPersonNameDisabled = true
        this.ruleForm.legalPersonName = '' // 不可编辑时 值为空
        this.$refs['legalPersonName'].clearValidate()
      }
    },
    fileClick(type) {
      if (type === 'file') {
        this.uploadData.typeCode = 'organManageBase'
      } else if (type === 'photo') {
        this.uploadData.typeCode = 'organManagePhoto'
      }
    },
    fileSuccess(response, file, fileList) {
      this.fileList = fileList
      this.uploadLoading.close()
    },
    uploadSuccess(response, file, fileList) {
      this.uploadLoading.close()
      const { data } = response
      const row = data[0]
      this.uploadImgUrl = row.fileUrl
      this.photoList.forEach(item => {
        if (item.id !== row.id) {
          this.handleRemove(item)
        }
      })
    },
    // 主营业务逻辑
    mainBusinessLogic() {
      // 判别主营业务以及所对应的相关字段显隐状态
      this.ruleForm.mainBusiness = this.navInfo.mainBusiness ? this.navInfo.mainBusiness : '' // 有'其他企业'列表时 空应为'其他企业'
      if (this.ruleForm.mainBusiness === 'CLGY') {
        this.ruleForm.managementModel = ''
        this.ruleForm.isMachining = '0'
        this.ruleForm.mainProducts = ''
        this.ruleForm.processDescription = ''
        this.mainBusinessJudge = true
      } else {
        this.mainBusinessJudge = false
      }
    },
    getPersonnelProOrDep() {
      judgePersonnelProOrDep().then(({ data }) => {
        if (data) {
          this.constant.orgType = filterListData(this.constant.orgType, ['ProjectDepartment', 'Company', 'SubCompany'])
          this.ruleForm.orgType = 'Department'
          this.orgTypeDisadled = data
        }
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
