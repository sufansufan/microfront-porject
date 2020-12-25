<template>
  <div class="essential-information">
    <div class="form-border">
      <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-form">
        <el-form-item label="出库单号" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="项目名称" prop="number" class="there-points">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目经理" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="施工队" class="there-points">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="领料人" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联系方式" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="出库人" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="出库人联系方式" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="出库时间" prop="number" class="there-points">
          <el-date-picker v-model="value1" disabled type="date" placeholder="选择日期时间" />
        </el-form-item>

        <el-form-item label="材料款" class="full-item">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="附件" prop="number" class="full-item">
          <ul class="text">
            <li>11.text</li>
          </ul>
        </el-form-item>

        <el-form-item label="备注" prop="remark" class="full-item">
          <el-input v-model="ruleform.remark" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  components: { },
  data() {
    return {
      count: 30,
      value1: '2020-02-04',
      ruleform: {
        number: 111,
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: '',
        money: ''
      },
      rules: {

      }
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .essential-information {
    .link-a {
      color:@primary;
      cursor: pointer;
    }
    .text {
      color:@primary;
      margin-left: 17px;
      li{
        list-style-type: disc;
      }
    }
    .form-top {
      margin-top: 20px;
    }
    .form-border {
      margin-bottom: 20px;
      // border-bottom: 1px solid #ddd;
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
      .two-points {
        width: 66.6%;
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
