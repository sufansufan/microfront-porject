<template>
  <div class="service-info">
    <div v-if="$route.query.type ==='details'" class="back-info">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      <div class="title-name">{{ $route.query.companyName }}</div>
      <div />
    </div>
    <el-form ref="ruleForm" v-loading="loading" :rules="rules" :model="ruleForm" label-width="135px" class="info-form">
      <el-form-item label="企业编号" prop="companyNumber">
        <el-input v-model.trim="ruleForm.companyNumber" :maxlength="20" :disabled="disabled" placeholder="请输入企业编号" clearable />
      </el-form-item>
      <el-form-item label="企业名称" prop="companyName">
        <el-input v-model.trim="ruleForm.companyName" :maxlength="50" :disabled="disabled" placeholder="请输入企业名称" clearable />
      </el-form-item>
      <el-form-item label="企业简称" prop="companySimpleName">
        <el-input v-model.trim="ruleForm.companySimpleName" :maxlength="20" :disabled="disabled" placeholder="请输入企业简称" clearable />
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="informationCode">
        <el-input v-model.trim="ruleForm.informationCode	" :maxlength="20" :disabled="disabled || disInformationCode" placeholder="请输入统一社会信用代码" clearable />
      </el-form-item>
      <el-form-item label="注册地" class="two-width" prop="registerPlace">
        <el-cascader
          v-model="ruleForm.registerPlace"
          placeholder="请选择注册地"
          clearable
          :disabled="disabled"
          filterable
          :options="constant.nativePlace"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children' }"
          style="width:100%"
        />
      </el-form-item>
      <el-form-item label="办公地址" prop="officeAddress">
        <el-input v-model.trim="ruleForm.officeAddress" placeholder="请输入办公地址" :maxlength="50" :disabled="disabled" clearable />
      </el-form-item>
      <el-form-item label="法定代表人" prop="legal">
        <el-input v-model.trim="ruleForm.legal" :maxlength="20" placeholder="请输入法定代表人" :disabled="disabled" clearable />
      </el-form-item>
      <el-form-item label="身份证号" prop="idNumber">
        <el-input v-model.trim="ruleForm.idNumber" :maxlength="18" placeholder="请输入身份证号" :disabled="disabled" clearable />
      </el-form-item>
      <el-form-item label="联系人" prop="contacts">
        <el-input v-model.trim="ruleForm.contacts" placeholder="请输入联系人" :maxlength="20" :disabled="disabled" clearable />
      </el-form-item>
      <el-form-item label="手机号" prop="mobilePhone">
        <el-input v-model.trim="ruleForm.mobilePhone" :maxlength="11" placeholder="请输入手机号" :disabled="disabled" clearable />
      </el-form-item>
      <el-form-item label="授权状态">
        <el-select v-model.trim="ruleForm.status" :disabled="disabled || empowerStatus" placeholder="请选择授权状态" clearable>
          <el-option
            v-for="item in constant.authorizeStatus"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" class="all-width row-label" prop="remark">
        <el-input v-model.trim="ruleForm.remark" type="textarea" :rows="3" placeholder="请输入备注" :disabled="disabled" :maxlength="255" clearable />
      </el-form-item>
      <el-form-item label="资质附件" class="all-width">
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
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <template v-if="$route.query.type ==='details'">
        <el-form-item label="录入人">
          <el-input v-model.trim="ruleForm.createDate" placeholder="请输入录入人" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="录入时间">
          <el-input v-model.trim="ruleForm.createUserName" placeholder="请输入录入时间" :disabled="disabled" />
        </el-form-item>
      </template>
    </el-form>
    <div v-if="$route.query.type !=='details'" class="base-info-footer">
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { validateLength } from '@core/utils/validate'
import upload from '@core/mixins/upload'
import { saveService, editService, getServiceId, validateUnique } from '@core/api/serviceProvider/serviceCompany'
import { validateID, validatePhone, validateOnlyCode } from '@core/utils/validate'
export default {
  mixins: [upload],
  props: {
    disabled: {
      default: true,
      type: Boolean
    }
  },
  data() {
    var checkId = this.$route.query.id
    var validID = (rule, value, callback) => {
      if (!validateID(value) && value !== '') {
        callback(new Error('请输入正确格式'))
      } else {
        callback()
      }
    }
    var validPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        if (!validatePhone(value)) {
          callback(new Error('请输入正确格式'))
        } else {
          callback()
        }
      }
    }
    return {
      loading: false,
      disInformationCode: false,
      empowerStatus: true,
      ruleForm: {
        id: '',
        companyNumber: '',
        companyName: '',
        companySimpleName: '',
        informationCode: '',
        registerPlace: '',
        officeAddress: '',
        legal: '',
        idNumber: '',
        contacts: '',
        mobilePhone: '',
        status: '0',
        remark: ''

      },
      rules: {
        companyNumber: [
          { required: true, message: '请输入企业编号', trigger: 'blur' },
          { required: true, validator: (rule, value, callback) => { validateOnlyCode(rule, value, callback, validateUnique({ companyNumber: value, id: checkId }), '01') }, trigger: 'blur' },
          validateLength(0, 20)
        ],
        companyName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }, validateLength(0, 50)],
        informationCode: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
          { required: true, validator: (rule, value, callback) => { validateOnlyCode(rule, value, callback, validateUnique({ informationCode: value, id: checkId }), '02') }, trigger: 'blur' },
          validateLength(0, 20)
        ],
        registerPlace: [{ required: true, message: '请选择注册地', trigger: 'change' }],
        contacts: [{ required: true, message: '请输入联系人', trigger: 'blur' }, validateLength(0, 20)],
        mobilePhone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { required: true, validator: validPhone, trigger: 'blur' }, validateLength(0, 11)],
        idNumber: [{ validator: validID, trigger: 'blur' }, validateLength(0, 18)],
        remark: [validateLength(0, 255)]
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['nativePlace', 'authorizeStatus'])
    this.uploadData.typeCode = 'serviceQualify'
    const { id, companyId } = this.$route.query
    if (id) {
      this.getServiceDetails(id)
      this.fetchFile(id)
      this.uploadData.businessDataId = id
      if (companyId === '' || companyId === null) {
        this.disInformationCode = false
      } else {
        this.disInformationCode = true
      }
    }
  },
  methods: {
    // 根据ID获取数据
    getServiceDetails(id) {
      this.loading = true
      getServiceId(id).then(({ data }) => {
        this.loading = false
        this.ruleForm = {
          ...data,
          registerPlace: data.registerPlace.split(',')
        }
      })
    },
    // 点击提交
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { registerPlace } = this.ruleForm
          var params = {
            Loading: true,
            ...this.ruleForm,
            registerPlace: registerPlace.toString(),
            id: this.uploadData.businessDataId
          }
          const { type } = this.$route.query
          if (type === 'add') {
            saveService(params).then(() => {
              this.$message.success('新增成功')
              this.$router.go(-1)
            })
          } else if (type === 'edit') {
            editService(params).then(() => {
              this.$message.success('修改成功')
              this.$router.go(-1)
            })
          }
        } else {
          return
        }
      })
    },
    // 上传成功
    fileSuccess(response, file, fileList) {
      this.fileList = fileList
      this.uploadLoading.close()
    },
    // 查看附件
    fetchFile(id) {
      this.getFileLoad(id).then(data => {
        this.fileList = data
        this.formLoading = false
        this.fileList.map(item => {
          item.name = item.fileName
          item.url = item.fileUrl
          return item
        })
      })
    }

  }
}
</script>

<style lang="less" scoped>
.service-info {
  padding: 10px;
  .back-info{
    padding-bottom:10px;
    display:flex;
    justify-content: space-between;
    .title-name{
     font-size:16px;
     color:#333;
     font-weight: bold;
     line-height:32px;
   }
  }
  .info-form {
    display: flex;
    flex-wrap: wrap;
    display: flex;
    width: 100%;
    & > div {
      width: 50%;
    }
    & > .el-form-item {
      width: 50%;
      .el-date-editor.el-input,.el-select {
        width: 100%;
      }
      &.all-width{
        width:100%;
      }
    }
  }
  .base-info-footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
<style lang="less" >

</style>
