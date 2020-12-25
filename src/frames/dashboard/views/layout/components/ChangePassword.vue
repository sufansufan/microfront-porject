<template>
  <div class="change-password">
    <el-form ref="ruleForm" :key="key" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model.trim="ruleForm.oldPassword" clearable />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model.trim="ruleForm.newPassword" type="password" :show-password="true" clearable />
      </el-form-item>
      <span class="pass-tipe">长度为6-12位字符、不包括空格</span>
      <div style="margin-left: 80px">
        <check-password :password="ruleForm.newPassword" />
      </div>
      <el-form-item />
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model.trim="ruleForm.confirmPassword" type="password" :show-password="true" clearable />
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="submit">保存</el-button>
    </div>
  </div>
</template>

<script>
import CheckPassword from './CheckPassword'
import { changePassword } from '@core/api/personnel'
export default {
  components: {
    CheckPassword
  },
  data() {
    return {
      key: 1,
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { newPassword, confirmPassword } = this.ruleForm
          if (newPassword !== confirmPassword) {
            this.$message.warning('新密码和确认密码不一致')
            return
          }
          const params = { ...this.ruleForm }
          delete params.confirmPassword
          changePassword(params).then(res => {
            this.$message.success('修改成功')
            this.$emit('closeDialog', 'changePassword')
            // this.$store.dispatch('signOut').then(res => {
            //   setTimeout(() => {
            //     this.$router.replace({ path: 'login' })
            //   }, 500)
            // })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.change-password {
  .btn {
    display: flex;
    justify-content: flex-end;
  }
  .pass-tipe {
    color: #ccc;
    line-height: 12px;
    margin-left: 80px;
  }
}
</style>
