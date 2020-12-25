<template>
  <div class="build-person-info">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      class="rule-form-flex one-half"
    >
      <el-form-item label="姓名">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入姓名"
          disabled
        />
      </el-form-item>
      <el-form-item label="性别">
        <jdy-select
          v-model="ruleForm.gender"
          holder="性别"
          :select-data="constant.gender"
          disabled
        />
      </el-form-item>
      <el-form-item label="工种">
        <jdy-select
          v-model="ruleForm.workType"
          holder="工种"
          :select-data="constant.workType"
          disabled
        />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input
          v-model="ruleForm.age"
          placeholder="请输入年龄"
          disabled
        />
      </el-form-item>
      <el-form-item label="所在施工队/班组">
        <el-input
          v-model="ruleForm.constructionTeamName"
          placeholder="请输入所在施工队/班组"
          disabled
          clearable
        />
      </el-form-item>
      <el-form-item label="状态">

        <jdy-select
          v-model="ruleForm.state"
          holder="状态"
          :select-data="constant.memberState"
          disabled
        />
      </el-form-item>
      <el-form-item label="教育、培训开始日期" prop="startDate">
        <el-date-picker
          v-model="ruleForm.startDate"
          type="date"
          placeholder="请选择教育、培训开始日期"
          :picker-options="startPickerDateTime"
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item label="教育、培训结束日期" prop="endDate">
        <el-date-picker
          v-model="ruleForm.endDate"
          type="date"
          placeholder="请选择教育、培训结束日期"
          :picker-options="endPickerDateTime"
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item label="教育学时" prop="classHours">
        <jdy-int v-model="ruleForm.classHours" holder="教育学时" :one-zero="true" :disabled="disabled" :maxlength="5">
          <template slot="append">小时</template>
        </jdy-int>
      </el-form-item>
      <el-form-item label="考试成绩" prop="score">
        <el-input
          v-model="ruleForm.score"
          placeholder="请输入考试成绩"
          :disabled="disabled"
          clearable
          :maxlength="4"
        />
      </el-form-item>
      <el-form-item v-if="ruleForm.state !== '01'" label="首次进场日期" prop="name">
        <el-date-picker
          v-model="ruleForm.firstEntryDate"
          type="date"
          placeholder="请选择首次进场日期"
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item v-if="ruleForm.state !== '01'" />
      <el-form-item prop="name">
        <span slot="label"><span class="custom-form-label">*</span>安全教育卡</span>
        <jdy-upload ref="jdyUpload" type-code="safeEducationCard" :business-data-id="ruleForm.id" :disabled="disabled" :is-add="false" @changeBindRuleFormId="changeBindRuleFormId" />
      </el-form-item>
      <el-form-item prop="name">
        <span slot="label"><span class="custom-form-label">*</span>考卷</span>
        <jdy-upload ref="jdyUploadPoper" type-code="papers" :business-data-id="ruleForm.id" :disabled="disabled" :is-add="false" @changeBindRuleFormId="changeBindRuleFormId" />
      </el-form-item>
      <el-form-item prop="name">
        <span slot="label"><span class="custom-form-label">*</span>安全作业承诺书</span>
        <jdy-upload ref="jdyUploadBook" type-code="safeTaskBook" :business-data-id="ruleForm.id" :disabled="disabled" :is-add="false" @changeBindRuleFormId="changeBindRuleFormId" />
      </el-form-item>
      <el-form-item />
      <el-form-item label="上传人" prop="name">
        <el-input
          v-model="ruleForm.uploadUserName"
          placeholder="请输入记录整理人"
          disabled
          clearable
        />
      </el-form-item>
      <el-form-item label="上传日期" prop="uploadDate">
        <el-date-picker
          v-model="ruleForm.uploadDate"
          type="date"
          placeholder="请选择培训开始时间"
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item label="备注" prop="name" class="one-width row-label">
        <el-input
          v-model="ruleForm.remark"
          type="textarea"
          placeholder="请输入备注"
          clearable
          :maxlength="255"
          :rows="3"
          :disabled="disabled"
        />
      </el-form-item>
      <div v-if="!disabled" class="rule-form-btn-box">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button class="cancel-btn" @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { buildPersonAdd, buildPersonUpdate } from '@core/api/projectManage/projectmanager'
import { mapGetters, mapActions } from 'vuex'
import { startPickerDate, endPickerDate } from '@core/utils'
import { getSessionStorage } from '@core/utils/auth'
export default {
  props: {
    rowData: {
      type: Object,
      default: () => {}
    },
    tabComType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        gender: '',
        workType: '',
        age: '',
        constructionTeamName: '',
        state: '',
        startDate: '',
        endDate: '',
        classHours: '',
        score: '',
        firstEntryDate: '',
        uploadUserId: getSessionStorage('userId'),
        uploadUserName: getSessionStorage('userName'),
        uploadDate: new Date(),
        remark: ''
      },
      rules: {
        startDate: [{ required: true, message: '请选择教育、培训开始日期', trigger: 'change' }],
        endDate: [{ required: true, message: '请选择教育、培训结束日期', trigger: 'change' }],
        classHours: [{ required: true, message: '请输入教育学时', trigger: 'blur' }],
        score: [{ required: true, message: '请输入考核成绩', trigger: 'blur' }],
        uploadDate: [{ required: true, message: '请选择上传日期', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    startPickerDateTime() {
      return startPickerDate(this.ruleForm.endDate)
    },
    endPickerDateTime() {
      return endPickerDate(this.ruleForm.startDate)
    },
    disabled() {
      return this.tabComType === 'details'
    }
  },
  watch: {
    rowData: {
      handler(newV) {
        this.ruleForm = JSON.parse(JSON.stringify(newV))
        this.ruleForm.constructionTeamName = newV.constructionTeamName.replace(/,/g, '/')
        this.ruleForm.uploadDate = newV.uploadDate || new Date()
        this.ruleForm.uploadUserName = getSessionStorage('userName')
        this.ruleForm.uploadUserId = getSessionStorage('userId')
      },
      immediate: true
    }
  },
  created() {
    this.getConstant(['workType', 'gender', 'memberState'])
  },
  methods: {
    ...mapActions(['getConstant']),
    cancel() {
      this.$emit('changeTabCom', { name: 'BuildPerson' })
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.$refs.jdyUpload.fileLists.length) {
            this.$message.warning('请选择安全教育卡')
            return
          }
          if (!this.$refs.jdyUploadPoper.fileLists.length) {
            this.$message.warning('请选择安全教育卡')
            return
          }
          if (!this.$refs.jdyUploadBook.fileLists.length) {
            this.$message.warning('请选择安全教育卡')
            return
          }
          const params = {
            Loading: true,
            ...this.ruleForm,
            constructionTeamName: this.ruleForm.constructionTeamName.replace(/['/']/g, ',')
          }
          console.log(this.rowData)
          if (!this.rowData.id) {
            buildPersonAdd(params).then(() => {
              this.$message.success('录入成功')
              this.$emit('changeTabCom', { name: 'BuildPerson' })
            })
          } else {
            buildPersonUpdate(params).then(() => {
              this.$message.success('录入成功')
              this.$emit('changeTabCom', { name: 'BuildPerson' })
            })
          }
        } else {
          return false
        }
      })
    },
    changeBindRuleFormId(id) {
      if (!this.ruleForm.id) {
        this.ruleForm.id = id
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
