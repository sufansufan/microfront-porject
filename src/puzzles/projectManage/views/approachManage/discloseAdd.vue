<template>
  <div class="disclose-add">
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
      <el-form-item label="安全技术交底名称" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入安全技术交底名称"
          :disabled="disabled"
          clearable
          :maxlength="50"
        />
      </el-form-item>
      <el-form-item label="交底人" prop="userId">
        <jdy-select v-model="ruleForm.userId" :select-data="disclosePersonList" :select-options="{value: 'userId', label: 'userName'}" :model-name.sync="ruleForm.userName" :is-model-name="true" holder="交底人" />
      </el-form-item>
      <el-form-item label="交底日期" prop="date">
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          placeholder="请选择交底日期"
        />
      </el-form-item>
      <el-form-item>
        <span slot="label"><span class="custom-form-label">*</span>安全技术交底表</span>
        <jdy-upload ref="jdyUpload" type-code="safeTechnologyBook" :business-data-id="ruleForm.id" :disabled="disabled" :is-add="$route.query.type === 'add'" @changeBindRuleFormId="changeBindRuleFormId" />
      </el-form-item>
      <el-form-item />
      <el-form-item label="上传人" prop="name">
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
      <el-form-item label="备注" prop="remark" class="one-width row-label">
        <el-input
          v-model="ruleForm.remark"
          type="textarea"
          placeholder="请输入备注"
          :disabled="disabled"
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
import { getSessionStorage } from '@core/utils/auth'
import { validateOnlyCode } from '@core/utils/validate'
import { discloseAdd, discloseDetails, discloseUpdate, validateDiscloseUnique, disclosePerson } from '@core/api/projectManage/projectmanager'
export default {
  data() {
    return {
      ruleForm: {
        number: '',
        name: '',
        userId: '',
        userName: '',
        date: '',
        id: '',
        uploadUserId: getSessionStorage('userId'),
        uploadUserName: getSessionStorage('userName'),
        uploadDate: new Date(),
        remark: ''

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
            validateOnlyCode(rule, value, callback, validateDiscloseUnique(param), '04')
          }, trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入安全技术交底名称', trigger: 'blur' }],
        userId: [{ required: true, message: '请选择交底人', trigger: 'change' }],
        date: [{ required: true, message: '请选择交底日期', trigger: 'change' }],
        uploadDate: [{ required: true, message: '请选择交上传', trigger: 'change' }]
      },
      disabled: false,
      disclosePersonList: []
    }
  },
  created() {
    const { type, id } = this.$route.query
    this.getDisclosePerson()
    if (type === 'edit') {
      this.getDetails(id)
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    submit() {
      if (!this.$refs.jdyUpload.fileLists.length) {
        this.$message.warning('请选择安全技术交底表')
        return
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const { projectId } = this.$route.query
          const params = {
            ...this.ruleForm,
            projectId
          }
          const { type } = this.$route.query
          if (type === 'add') {
            discloseAdd(params).then(() => {
              this.$message.success('新增成功')
              this.$router.go(-1)
            })
          } else if (type === 'edit') {
            discloseUpdate(params).then(() => {
              this.$message.success('修改成功')
              this.$router.go(-1)
            })
          }
        } else {
          return false
        }
      })
    },
    getDetails(id) {
      discloseDetails(id).then(({ data }) => {
        this.ruleForm = data
      })
    },
    changeBindRuleFormId(id) {
      this.ruleForm.id = id
    },
    getDisclosePerson() {
      const { projectId } = this.$route.query
      disclosePerson(projectId).then(({ data }) => {
        this.disclosePersonList = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.disclose-add {
  padding: 10px;
}
</style>
