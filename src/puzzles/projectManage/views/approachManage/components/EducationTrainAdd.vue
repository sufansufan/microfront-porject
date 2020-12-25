<template>
  <div class="education-train-add">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      class="rule-form-flex one-half"
    >
      <el-form-item label="编号" prop="number">
        <el-input
          v-model="ruleForm.number"
          placeholder="请输入编号"
          :disabled="disabled"
          clearable
          :maxlength="20"
        />
      </el-form-item>
      <el-form-item label="培训主题" prop="subject">
        <el-input
          v-model="ruleForm.subject"
          placeholder="请输入培训主题"
          :disabled="disabled"
          clearable
          :maxlength="20"
        />
      </el-form-item>
      <el-form-item label="培训对象">
        <el-input
          v-model="ruleForm.targetObject"
          placeholder="请输入培训对象"
          :disabled="disabled"
          clearable
        />
      </el-form-item>
      <el-form-item label="培训人数">
        <jdy-int v-model="ruleForm.personNumber" holder="培训人数" :one-zero="true" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="主讲人">
        <jdy-select v-model="ruleForm.hostPersonId" :select-data="constant.orgPersonList" :select-options="{value: 'id', label: 'name'}" :model-name="ruleForm.hostPersonName" :is-model-name="true" holder="主讲人" />
      </el-form-item>
      <el-form-item label="记录整理人">
        <jdy-select v-model="ruleForm.recordPersonId" :select-data="constant.orgPersonList" :select-options="{value: 'id', label: 'name'}" :model-name="ruleForm.recordPersonName" :is-model-name="true" holder="记录整理人" />
      </el-form-item>
      <el-form-item label="培训开始时间">
        <el-date-picker
          v-model="ruleForm.startTime"
          type="date"
          placeholder="请选择培训开始时间"
          :picker-options="startPickerDateTime"
        />
      </el-form-item>
      <el-form-item label="培训结束时间">
        <el-date-picker
          v-model="ruleForm.endTime"
          type="date"
          placeholder="请选择培训结束时间"
          :picker-options="endPickerDateTime"
        />
      </el-form-item>
      <el-form-item label="学时">
        <el-input
          v-model="ruleForm.classHours"
          placeholder="请输入学时"
          :disabled="disabled"
          clearable
        >
          <template slot="append">小时</template>
        </el-input>
      </el-form-item>
      <el-form-item />
      <el-form-item label="安全教育记录表">
        <span slot="label"><span class="custom-form-label">*</span>安全教育记录表</span>
        <jdy-upload ref="jdyUpload" type-code="educationTrain" :business-data-id="ruleForm.id" :disabled="disabled" :is-add="tabComType === 'add' ? true : false" @changeBindRuleFormId="changeBindRuleFormId" />
      </el-form-item>
      <el-form-item />
      <el-form-item label="上传人">
        <el-input
          v-model="ruleForm.uploadUserName"
          placeholder="请输入上传人"
          :disabled="true"
          clearable
        />
      </el-form-item>
      <el-form-item label="上传日期" prop="uploadDate">
        <el-date-picker
          v-model="ruleForm.uploadDate"
          type="date"
          placeholder="请选择上传日期"
        />
      </el-form-item>
      <el-form-item label="备注" class="one-width row-label">
        <el-input
          v-model="ruleForm.remark"
          type="textarea"
          placeholder="请输入备注"
          clearable
          :maxlength="255"
          :rows="3"
        />
      </el-form-item>
      <div class="rule-form-btn-box">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button class="cancel-btn" @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSessionStorage } from '@core/utils/auth'
import { validateOnlyCode } from '@core/utils/validate'
import { safeEducationAdd, safeEducationEdit, safeEducationDetails, validateSafeEducationUnique } from '@core/api/projectManage/projectmanager'
import { startPickerDate, endPickerDate } from '@core/utils'
export default {
  props: {
    tabComType: {
      type: String,
      default: ''
    },
    rowData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm: {
        number: '',
        subject: '',
        targetObject: '',
        personNumber: '',
        hostPersonId: '',
        hostPersonName: '',
        recordPersonId: '',
        recordPersonName: '',
        startTime: '',
        endTime: '',
        classHours: '',
        remark: '',
        uploadUserId: getSessionStorage('userId'),
        uploadUserName: getSessionStorage('userName'),
        uploadDate: new Date()
      },
      rules: {
        number: [
          { required: true, message: '请输入编号', trigger: 'blur' },
          { required: true, validator: (rule, value, callback) => {
            var param = {
              number: value
            }
            if (this.ruleForm.id) {
              param.id = this.ruleForm.id
            }
            validateOnlyCode(rule, value, callback, validateSafeEducationUnique(param), '04')
          }, trigger: 'blur' }],
        subject: [{ required: true, message: '请输入培训主题', trigger: 'blur' }],
        uploadDate: [{ required: true, message: '请选择上传日期', trigger: 'change' }]
      },
      disabled: false
    }
  },
  computed: {
    ...mapGetters(['approachProjectInfo', 'constant']),
    startPickerDateTime() {
      return startPickerDate(this.ruleForm.endTime)
    },
    endPickerDateTime() {
      return endPickerDate(this.ruleForm.startTime)
    }
  },
  watch: {
    rowData: {
      handler(newV) {
        if (Object.keys(newV).length) {
          safeEducationDetails(newV.id).then(({ data }) => {
            this.ruleForm = data
          })
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$store.dispatch('getConstant', [{ type: 'orgPersonList', params: this.approachProjectInfo.belongOrgId }])
  },
  methods: {
    cancel() {
      this.$emit('changeTabCom', { name: 'EducationTrain' })
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.$refs.jdyUpload.fileLists.length) {
            this.$message.warning('请选择安全技术交底表')
            return
          }
          const { projectId } = this.$route.query
          const params = {
            Loading: true,
            ...this.ruleForm,
            projectId
          }
          if (this.tabComType === 'add') {
            safeEducationAdd(params).then(() => {
              this.$message.success('新增成功')
              this.$emit('changeTabCom', { name: 'EducationTrain' })
            })
          }
          if (this.tabComType === 'edit') {
            safeEducationEdit(params).then(() => {
              this.$message.success('修改成功')
              this.$emit('changeTabCom', { name: 'EducationTrain' })
            })
          }
        } else {
          return false
        }
      })
    },
    changeBindRuleFormId(id) {
      this.ruleForm.id = id
    }
  }
}
</script>

<style lang="less" scoped>
.education-train-add {

}
</style>
