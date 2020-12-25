<template>
  <div class="base-info">
    <el-form ref="ruleForm" :key="key" v-loading="loading" :rules="rules" :model="ruleForm" label-width="160px" class="info-form">
      <el-form-item label="审批类型" prop="registerId">
        <el-cascader
          v-model="ruleForm.registerId"
          filterable
          :disabled="operaType !== 'add'"
          placeholder="请选择审批类型"
          clearable
          :options="approveType"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'businessFlowRegisters' }"
          @change="changeLink"
        />
      </el-form-item>
      <el-form-item label="是否通用" prop="isCommonUse">
        <el-switch v-model="ruleForm.isCommonUse" :disabled="operaType === 'customize' || operaType === 'view'" />
      </el-form-item>
      <el-form-item v-if="!ruleForm.isCommonUse" label="适用范围" prop="useRange">
        <el-select v-model="ruleForm.useRange" :disabled="operaType === 'customize' || operaType === 'view'" filterable multiple clearable placeholder="请选择适用范围">
          <el-option
            v-for="item in constant.useRange"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="operaType === 'customize' || (operaType === 'view' && ruleForm.organizationId)" label="归属单位" prop="organizationId">
        <el-select v-model="ruleForm.organizationId" filterable clearable placeholder="请选择适用范围" :disabled="operaType === 'view'">
          <el-option
            v-for="item in orgListData"
            :key="item.id"
            :label="item.orgName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否允许使用自由流程" prop="isFreeFlow">
        <el-switch v-model="ruleForm.isFreeFlow" :disabled="!isFreeDis || operaType === 'view'" /><br>
        <span style="color:#ccc;font-size:12px;">自由流程指由每个环节的执行人确定是否存在下一环节以及下一环节由谁来执行；</span>
      </el-form-item>
      <el-form-item label="附件" prop="annex">
        <el-upload
          :file-list="fileList"
          :action="actionUrl"
          :on-success="fileSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemove"
          :before-upload="beforeUpload50M"
          :disabled="operaType === 'view'"
          :on-error="fileError"
          :on-progress="uploadProgress"
        >
          <el-button type="primary" :disabled="disabled">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="说明" prop="remark" class="full-width row-label">
        <el-input v-model.trim="ruleForm.remark" type="textarea" :rows="3" :maxlength="255" :disabled="operaType === 'view'" placeholder="请输入说明" clearable />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { validateLength } from '@core/utils/validate'
import upload from '@core/mixins/upload'
import { getAttributionUnit } from '@core/api/organization'
import { copyFileList } from '@core/api/accessoryFile'
import { getUuid } from '@core/utils'
import { getTree, addConfigBase, editConfigBase, customConfigAdd, customConfigEdit } from '@core/api/processManage/workflowmanager'
import { mapGetters } from 'vuex'
export default {
  name: 'BaseInfo',
  mixins: [upload],
  props: {
    baseInfoData: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      fileList: [],
      disabled: false,
      ruleForm: {
        registerId: '',
        isCommonUse: false,
        useRange: [],
        isFreeFlow: false,
        remark: '',
        organizationId: ''
      },
      rules: {
        registerId: [{ required: true, message: '请选择审批类型', trigger: 'change' }],
        useRange: [{ required: true, message: '请选择适用范围', trigger: 'change' }],
        organizationId: [{ required: true, message: '请选择归属单位', trigger: 'change' }],
        remark: validateLength(0, 255)
      },
      approveType: [],
      submitStatus: false,
      configBaseInfo: {},
      registerName: '',
      orgListData: [],
      customConfigId: '',
      isFreeDis: false

    }
  },
  computed: {
    ...mapGetters(['constant']),
    operaType() {
      return this.$route.query.type
    }
  },
  watch: {
    baseInfoData: {
      handler(val) {
        if (JSON.stringify(val) !== '{}') {
          this.getApproveType()
        }
      },
      immediate: true,
      deep: true
    }
  },
  activated() {
    this.$store.dispatch('getConstant', ['useRange']).then(() => {
      if (this.$route.query.type === 'customize') {
        this.loading = true
        this.uploadData.businessDataId = this.$route.query.id
        this.getUploadFile()
        this.getOrg()
      }
    })
  },
  created() {
    if (this.$route.query.type === 'add') this.getApproveType()
    this.uploadData.typeCode = 'processConfig'
    if (this.$route.query.type === 'edit') {
      this.loading = true
      this.getUploadFile()
      this.uploadData.businessDataId = this.$route.query.id
    }
  },
  methods: {
    // 获取审批类型
    getApproveType() {
      getTree().then(({ data }) => {
        this.approveType = data
        if (this.$route.query.type !== 'add') {
          this.ruleForm = { ...this.baseInfoData }
          if (this.$route.query.type === 'view') this.getOrg()
          this.loading = false
        }
      })
    },
    // 获取归属单位
    getOrg() {
      this.getOrgList().then((data) => {
        if (data) {
          if (!this.baseInfoData.isCommonUse) {
            const newArr = []
            this.baseInfoData.useRange.forEach(item => {
              data.forEach(e => {
                if (item === e.orgType) {
                  newArr.push(e)
                }
              })
            })
            this.orgListData = newArr
          }
        }
      })
    },
    saveSub() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            const params = {
              Loading: true,
              ...this.ruleForm,
              id: this.uploadData.businessDataId
            }
            params.registerId = params.registerId[1]
            params.useRange = params.useRange.join(',')
            if (this.submitStatus || this.$route.query.type === 'edit') {
              editConfigBase(params, this.$route.query.id || this.configBaseInfo.id).then(({ data }) => {
                this.configBaseInfo = data
                this.$store.commit('SET_CONFIGBASEINFO', { ...data })
                this.$message.success('保存成功')
                resolve(true)
              })
            } else {
              addConfigBase(params).then(({ data }) => {
                this.$message.success('保存成功')
                this.configBaseInfo = data
                this.$store.commit('SET_CONFIGBASEINFO', { ...data })
                resolve(true)
              })
            }
          }
        })
      })
    },
    // 自定义配置this.baseInfoData.defaultConfigId
    customSub() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            const params = {
              Loading: true,
              defaultConfigId: this.uploadData.businessDataId,
              id: this.customConfigId,
              isFreeFlow: this.ruleForm.isFreeFlow,
              organizationId: this.ruleForm.organizationId,
              organizationName: '',
              remark: this.ruleForm.remark
            }
            this.orgListData.forEach(item => {
              if (params.organizationId === item.id) {
                params.organizationName = item.orgName
              }
            })
            if (this.$route.query.type === 'customize' && this.baseInfoData.organizationId === '' && !this.submitStatus) {
              customConfigAdd(params).then(({ data }) => {
                this.configBaseInfo = data
                this.$store.commit('SET_CONFIGBASEINFO', { ...data })
                this.$message.success('保存成功')
                resolve(true)
              })
            } else {
              customConfigEdit(params, params.id).then(({ data }) => {
                this.$message.success('保存成功')
                this.configBaseInfo = data
                this.$store.commit('SET_CONFIGBASEINFO', { ...data })
                resolve(true)
              })
            }
          }
        })
      })
    },
    // 上传成功
    fileSuccess(response, file, fileList) {
      this.fileList = fileList
      this.uploadLoading.close()
    },
    // 获取附件
    getUploadFile() {
      this.getFileLoad(this.$route.query.id).then(data => {
        this.fileList = data
        this.fileList.map(item => {
          item.name = item.fileName
          item.url = item.fileUrl
          return item
        })
        if (this.$route.query.type === 'customize') {
          const id = getUuid()
          this.customConfigId = id
          this.fileList.map(item => {
            item.businessDataId = id
          })
          this.copyUpload(this.fileList)
        }
      })
    },
    // 获取归属单位
    getOrgList() {
      return new Promise((resolve, reject) => {
        this.orgListData = []
        getAttributionUnit().then(({ data }) => {
          this.orgListData = data
          resolve(true)
        })
      })
    },
    copyUpload(data) {
      copyFileList(data).then(({ data }) => {
        this.fileList = data
        this.fileList.map(item => {
          item.name = item.fileName
          item.url = item.fileUrl
          return item
        })
      })
    },
    // 根据当前流程
    changeLink(data) {
      if (data) {
        this.approveType.forEach(item => {
          item.businessFlowRegisters.forEach(element => {
            if (element.id === data[1]) {
              this.ruleForm.isFreeFlow = element.isFreeFlow
              this.isFreeDis = element.isFreeFlow
            }
          })
        })
      }
    }

  }
}
</script>
<style lang="less" scoped>

</style>
<style lang="less">
.base-info {
  .info-form {
    display: flex;
    flex-wrap: wrap;
    &>.el-form-item{
      width: 100%;
      .el-select {
        width: 100%;
      }
    }
    &>.el-form-item:nth-of-type(1),
    &>.el-form-item:nth-of-type(2) {
      width: 50%;
    }
  }
  .upload-frame {
    .avatar-uploader .el-upload {
      width: 100px !important;
      height: 100px !important;
    }
    .avatar-uploader-icon {
      width: 100px !important;
      height: 100px !important;
      line-height: 100px;
    }
    .avatar {
      width: auto !important;
      height: 100% !important;
      // display: block;
      background-size: contain;
    }
  }
}
</style>
