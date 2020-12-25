<template>
  <div>
    <div class="top-nav">
      <div class="company">
        <div>
          <img :src="navTopInfo.titleImg" alt="">
        </div>
        {{ navTopInfo.orgName }}
      </div>
      <div class="title">
        {{ navTopInfo.title }}
      </div>
      <ul class="top-list">
        <li @click="$router.push('/home')">
          <div>
            <img src="../../../assets/home/home.png" alt="">
          </div>
          首页
        </li>
        <li>
          <div>
            <img src="../../../assets/home/application.png" alt="">
          </div>
          应用
        </li>
        <li>
          <div>
            <img src="../../../assets/home/message.png" alt="">
          </div>
          消息
        </li>
        <el-popover placement="bottom" width="400" trigger="hover" popper-class="top-nav-app-download">
          <div class="app-download">
            <div class="head">
              <div :class="changeApp === 1 ? 'app-color' : ''" @click="changeApp = 1">企业版APP</div>
              <div :class="changeApp === 2 ? 'app-color' : ''" @click="changeApp = 2">工人版App</div>
            </div>
            <div class="content">
              <div>
                <img :src="changeApp === 1 ? require( '../../../assets/login/big-android.png') : require( '../../../assets/login/big-worker.png')" alt="">
                <div>
                  扫码下载，仅支持安卓版
                </div>
              </div>
            </div>
          </div>
          <li slot="reference">
            <div>
              <img src="../../../assets/home/appLoad.png" alt="">
            </div>
            APP下载
          </li>
        </el-popover>
        <el-dropdown trigger="hover" @command="handleCommand">
          <li>
            <div>
              <img src="../../../assets/home/setting.png" alt="">
            </div>
            设置
          </li>
          <el-dropdown-menu slot="dropdown" class="top-nav-dropdown">
            <el-dropdown-item command="head">
              <i class="iconfont icon-touxiang" />
              个人头像
            </el-dropdown-item>
            <el-dropdown-item command="commonLanguage">
              <i class="iconfont icon-changyong1" />
              个人常用语
            </el-dropdown-item>
            <el-dropdown-item command="changePassword">
              <i class="iconfont icon-mima" />
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <li>
          <div>
            <img src="../../../assets/home/help.png" alt="">
          </div>
          帮助
        </li>
        <li @click="signOut">
          <div>
            <img src="../../../assets/home/signOut.png" alt="">
          </div>
          退出
        </li>
      </ul>
    </div>
    <drag-dialog ref="dialog" title="编辑头像" width="40%">
      <cropper ref="cropperBox" :head-img="headImg" @closeDialog="closeDialog" />
    </drag-dialog>
    <drag-dialog ref="languageDialog" title="常用语设置" width="50%">
      <common-language ref="language" @closeDialog="closeDialog" />
    </drag-dialog>
    <drag-dialog ref="changePassword" title="修改密码" width="50%">
      <change-password ref="password" @closeDialog="closeDialog" />
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import Cropper from '@frames/dashboard/components/Cropper'
import CommonLanguage from '@frames/dashboard/components/CommonLanguage'
import ChangePassword from './ChangePassword'
import { getHeadImg } from '@core/api/personelSet'
import { mapGetters } from 'vuex'
import { getSessionStorage } from '@core/utils/auth'
export default {
  components: {
    DragDialog,
    Cropper,
    CommonLanguage,
    ChangePassword
  },
  data() {
    return {
      headImg: '',
      changeApp: 1
    }
  },
  computed: {
    ...mapGetters(['navInfo']),
    navTopInfo() {
      const isData = Object.prototype.hasOwnProperty.call(this.navInfo, 'title')
      if (isData) {
        return this.navInfo
      } else {
        return JSON.parse(getSessionStorage('navInfo'))
      }
    }
  },

  methods: {
    signOut() {
      this.$confirm('您将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('signOut').then(res => {
          this.$router.replace({
            path: '/login'
          })
        })
      }).catch(() => {
        // this.$message.info('已取消')
      })
    },
    handleCommand(command) {
      switch (command) {
        case 'head':
          this.$refs.dialog.show = true
          this.getImg()
          this.$nextTick(() => {
            this.$refs.cropperBox.option = {
              img: '',
              size: null,
              outputType: '',
              autoCrop: true,
              autoCropWidth: 130,
              autoCropHeight: 130,
              centerBox: true,
              fixedBox: true
            }
          })
          break
        case 'commonLanguage':
          this.$refs.languageDialog.show = true
          this.$nextTick(() => {
            this.$refs.language.commonValue = ''
          })
          break
        case 'changePassword':
          this.$refs.changePassword.show = true
          this.$nextTick(() => {
            this.$refs.password.ruleForm = {
              oldPassword: '',
              newPassword: '',
              confirmPassword: ''
            }
            this.$refs.password.key += 1
          })
          break
        default:
          break
      }
    },
    closeDialog(type) {
      switch (type) {
        case 'dialog':
          this.$refs.dialog.show = false
          break
        case 'languageDialog':
          this.$refs.languageDialog.show = false
          break
        case 'changePassword':
          this.$refs.changePassword.show = false
          break
        default:
          break
      }
    },
    getImg() {
      getHeadImg().then(({ data }) => {
        if (data !== null) {
          this.headImg = data.headImg
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.top-nav {
  width: calc(100% - 40px);
  height: 80px;
  text-align: center;
  background: url('../../../assets/home/bg.png') no-repeat center;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  line-height: 80px;
  color: #fff;
  padding: 0 20px;
  .company {
    display: flex;
    align-items: center;
    margin-left: 60px;
    font-size: 24px;
    & > div {
      width: 44px;
      height: 44px;
      margin-right: 10px;
      // margin-top: -10px;
      & > img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  .title {
    font-size: 32px;
  }
  .top-list {
    min-width: 400px;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    li {
      width: 60px;
      height: 74px;
      line-height: 20px;
      padding-top: 6px;
      cursor: pointer;
      color: #fff;
      list-style: none;
      & > div {
        font-size: 30px;
        width: 26px;
        height: 26px;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 5px;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        background: rgba(0, 60, 116, 0.7);
      }
    }
  }

}
</style>

<style lang="less">
.top-nav-dropdown {
  top: 68px !important;
  .dropdown-box {
    display: flex;
  }
  .el-dropdown-menu__item i {
    margin-right: 0px;
  }
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #0A4C8A !important;
    color: #fff;
  }
}
.top-nav-app-download {
  top: 68px !important;
  .app-color {
    color: @primary;
  }
  &.el-popover {
    padding: 0px;
  }
  .app-download {
    .head {
      background: @crumbs-bg;
      width: 100%;
      height: 40px;
      display: flex;
      cursor: pointer;
      & > div {
        width: 50%;
        text-align: center;
        line-height: 40px;
      }
    }
  }
  &.el-popper[x-placement^=bottom] .popper__arrow::after {
    border-bottom-color: @crumbs-bg;
  }
  .content {
    height: 300px;
    width: 100%;
    & > div {
      width: 180px;
      height: 180px;
      margin: 0 auto;
      margin-top: 70px;
      text-align: center;
      color: #333333;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

</style>
