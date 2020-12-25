<template>
  <div class="login-box">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="rule-form">
      <el-form-item prop="username">
        <div class="flex">
          <div>
            <img src="../../../assets/login/login_user_icon.png" alt="">
          </div>
          <div>
            <el-input v-model.trim="ruleForm.username" placeholder="用户名" style="width: 290px" />
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <div class="flex">
          <div>
            <img src="../../../assets/login/login_password_icon.png" alt="">
          </div>
          <div>
            <el-input v-model.trim="ruleForm.password" :type="passwordState ? 'password' : ''" placeholder="请输入密码" style="width: 290px">
              <i slot="suffix" class="iconfont password" :class="passwordState ? 'icon-yincang1' : 'icon-xianshi1'" @click="passwordState = !passwordState" />
            </el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="code">
        <div class="flex">
          <div>
            <img src="../../../assets/login/login_verificationCode_icon.png" alt="">
          </div>
          <div>
            <el-input v-model.trim="ruleForm.code" placeholder="验证码" style="width: 170px" />
          </div>
          <div>
            <code-img ref="codeImg" />
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" class="code-btn" :loading="loading" @click="submit">登 录</el-button>
      </el-form-item>
      <el-form-item>
        <div class="remember">
          <div>
            <div>
              <el-checkbox v-model="remember">记住密码</el-checkbox>
            </div>
            <span>|</span>
            <div>
              忘记密码?
            </div>
          </div>
          <div>
            企业注册
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CodeImg from './CodeImg'
export default {
  components: {
    CodeImg
  },
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        code: ''
      },
      loading: false,
      remember: false,
      passwordState: true,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown)
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false)
  },
  methods: {
    keyDown(e) {
      if (e.keyCode === 13) {
        if (this.loading) return false
        this.submit()
      }
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          const userInfo = JSON.parse(JSON.stringify(this.ruleForm))
          delete userInfo.code
          if (this.ruleForm.code !== this.$refs.codeImg.$data.verifyCode) {
            this.$message({
              message: '验证码不正确',
              showClose: true,
              type: 'warning',
              duration: 1500,
              customClass: 'login-message'
            })
            this.loading = false
            return
          }
          this.$store.dispatch('login', userInfo).then(res => {
            this.loading = false
            this.$router.replace({
              path: '/home',
              query: {
                redirect: this.$router.currentRoute.fullPath
              }
            })
          }).catch(() => {
            this.loading = false
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
.login-box {
  .rule-form {
    margin-top: 40px;
    .el-form-item {
      margin-top: 10px;
      .flex {
        display: flex;
        align-items: center;
        height: 44px;
        & > div {
          &:first-child {
            min-width: 22px;
            height: 24px;
            margin-right: 10px;
            & > img {
              width: 100%;
              height: 100%;
            }
          }
          &:last-child {
            height: 100%;
          }
        }
      }
      .code-btn {
        width: 100%;
        height: 44px;
        font-size: 18px;
        border-radius: 8px;
        margin-top: 10px;
      }
      .remember {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        & > div {
          &:first-child {
            display: flex;
            align-items: flex-start;
            & > span {
              margin: 0 5px;
              color: #b2b2b2;
            }
            & > div:last-child {
              color: @primary;
            }
          }
          &:last-child {
            color: @primary;
          }
        }
      }
    }
  }
  .password {
    font-size: 16px;
    line-height: 38px;
    cursor: pointer;
  }
}
</style>
<style lang="less">
.login-box {
  .el-input__inner {
    border: 0;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
    background: #EFFAFF;
    font-size: 18px;
    height: 38px;
    padding: 0px;
  }
  .el-form-item__error {
    top: 90%;
    left: 32px;
  }
}
</style>
