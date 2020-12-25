<template>
  <div class="m_login_verify">
    <div class="wapper">
      <div class="logo_title">登陆页面</div>
      <el-form ref="ruleForm" :model="form" :rules="rules" class="rule-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="form.password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            class="code-btn"
            :loading="loading"
            @click="submit"
          >登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginVerify',
  data() {
    return {
      loading: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auditManage', ['login']),
    getParams() {
      const {
        form: { username, password }
      } = this.$data
      return {
        username,
        password
      }
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = this.getParams()
          this.loading = true
          this.login(params)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.m_login_verify {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  color: #606266;
}
.logo_title {
  text-align: center;
}
.wapper {
  width: 20%;
  height: 55%;
}
.code-btn {
  width: 100%;
  height: 44px;
  font-size: 18px;
  border-radius: 8px;
  margin-top: 10px;
}
</style>
