<template>
  <div class="site-information">
    <div class="search">
      <div class="btn">
        <div>
          <el-button-group>
            <el-button class="back-btn" @click="backGo()"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <information-from />
      </el-tab-pane>
      <el-tab-pane label="材料入库清单" name="second">
        <information-purchase />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import InformationFrom from './SiteInformationFrom'
import InformationPurchase from './SiteInformationPurchase'
export default {
  components: { InformationFrom, InformationPurchase },
  data() {
    return {
      activeName: 'first',
      count: 30,
      isActive: true,
      value1: '2020-02-04',
      ruleform: {
        number: 111,
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: ''
      },
      rules: {
        money: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      materialState: 'default',
      siteState: 'default'
    }
  },
  methods: {
    backGo() {
      this.$emit('changeTabConent', 'site', 'default')
    }

  }
}
</script>

<style lang="less" scoped>
  .site-information {
    .link-a {
      color:@primary;
      cursor: pointer;
    }
    .text {
      color:@primary;
      padding: 0;
      margin: 0;
      li{
        padding: 0;
        margin: 0;
      }
    }
    .form-top {
      margin-top: 20px;
    }
    .form-border {
      margin-bottom: 20px;
    }
    .tab-active {
      position: relative;
      .tab-btn {
        position: absolute;
        top:1.5px;
        right: 0;
      }
    }
    .pagination {
      margin-bottom: 100px;
    }
    .el-tabs--card {
      .el-tabs__header {
         border-bottom-color:transparent;
      }
    }
    .dictionary-form {
      display: flex;
      flex-wrap: wrap;
      .full-item {
        width: 100%;
      }
      .there-points {
        width: 33.3%;
        .el-form-item__content {
          display: flex;
          .is-disabled {
            width: 100%;
          }
          .el-select {
            width: 100%;
          }
        }
      }
      .ipt-one {
        .is-plain {
          width: 20%!important;
        }
          .el-input__inner {
            text-align: center;
          }
        }
      .one-pointes {
        span {
          display: inline-block;
          width: 40px;
          margin-left: 6px;
          color: @primary;
          cursor: pointer;
        }
      }
    }
    .search>.select>.fill-name {
			// width: 22%;
			margin-right: 5px;

			.fill-line {
				width: 100%;
			}

			span {
				min-width: 70px;
				text-align: right;

			}
    }
    .dictionary-box {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #333;
      padding:6px;
      padding-top:18px;
      .el-form-item {
        width: 50%;
        .is-disabled {
            width: 100%;
          }
          .el-select {
            width: 100%;
          }
          .el-date-editor {
            width: 100%;
          }
      }
      .full-form {
        width: 50%;
        margin-right: 50%;
      }
    }
    // .el-dialog {
    //   height: 70%;
    //   overflow-y: scroll;
    // }
    .btnadd {
        width: 100%;
        text-align: center;
    }
    .tan-box {

      .btnadd {
        margin-top: 20px;
      }
       .btn-top {
        margin-bottom:20px;
      }
      .text {
        margin: 10px 0;
      }
    }

  }
</style>
<style>
  .el-input.is-disabled .el-input__inner {
    background-color: #FFF!important;
    color: #606266!important;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #FFF!important;
    color: #606266!important;
  }
</style>
