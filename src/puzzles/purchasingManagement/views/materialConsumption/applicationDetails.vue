<template>
  <div class="application-details">
    <div class="search">
      <div class="btn">
        <div>
          <el-button-group>
            <el-button class="back-btn" @click="backGo()"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用款申请信息" name="first">
          <application-information />
        </el-tab-pane>
        <el-tab-pane label="批准信息" name="second">
          <approval-information />
        </el-tab-pane>
        <el-tab-pane label="付款信息" name="third">
          <payment-information />
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import ApplicationInformation from './components/ApplicationInformation'
import ApprovalInformation from './components/ApprovalInformation'
import PaymentInformation from './components/PaymentInformation'

export default {
  components: { ApplicationInformation, ApprovalInformation, PaymentInformation },
  data() {
    return {
      activeName: 'first',
      count: 30,
      isActive: true,
      ruleform: {
        number: 111,
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: ''
      },
      formrule: {
        number: 111,
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: '',
        money: ''
      },
      rules: {
        money: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      tableData: [
        {
          id: '1',
          number: '01',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用'
        },
        {
          id: '2',
          number: '02',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用'
        }
      ]
    }
  },
  methods: {
    changeTab(status) {
      this.$emit('changeTabBank', 'cashActive', status)
    },
    backGo() {
      this.$router.push('/purchasingManagement/materialConsumption')
    },
    changeShow() {
      this.$refs.dialog.show = true
    },
    confirmChange(isActive) {
      this.isActive = !isActive
    }
  }
}
</script>

<style lang="less" scoped>
  .application-details {
    .link-a {
      color:@primary;
      cursor: pointer;
    }
    .form-top {
      margin-top: 20px;
    }
    .form-border {
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }

    .pagination {
      margin-bottom: 100px;
    }
    .dictionary-form {
      display: flex;
      flex-wrap: wrap;
      .item-half {
        width: 50%;
      }
      .there-points {
        width: 33.3%;
      }
      .four-points {
        width: 25%;
      }
      .five-points {
        width: 50%;
        .el-form-item__content {
          display: flex;
          .is-disabled {
            width: 50%;
          }
          .el-select {
            width: 50%;
          }
        }
      }
     .total-sum {
        width: 25%;
        display: flex;
        align-items: baseline;
        span {
          display: inline-block;
          padding:4px 0;
          margin: 0 7px;
          border-bottom: 1px solid #333;
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
