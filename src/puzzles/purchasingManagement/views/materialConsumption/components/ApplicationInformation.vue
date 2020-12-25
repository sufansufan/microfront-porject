<template>
  <div class="application-information">
    <div class="form-border">
      <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-form">
        <el-form-item label="项目单号" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="项目名称" prop="number" class="there-points">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目编号" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="工程状态" prop="number" class="there-points">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目归属" prop="number" class="there-points">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="归属单位" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="供应商" prop="number" class="there-points one-pointes">
          <div style="display:flex;">
            <el-input v-model="ruleform.number" disabled placeholder="请输入" />
            <span class="look" @click="changeShow">查看</span>
          </div>
        </el-form-item>
        <el-form-item label="采购订单" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="采购总金额" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="已付金额" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="剩余未付金额" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="本次申请付款" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="付款方式" prop="number" class="there-points">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="支票号" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="要求付款时间" prop="number" class="there-points">
          <el-date-picker v-model="value1" disabled type="date" placeholder="选择日期时间" />
        </el-form-item>

        <el-form-item label="是否预付款" prop="number" class="there-points">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否已开发票" prop="number" class="there-points">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="" class="there-points" />

        <el-form-item label="付款类别" prop="number" class="there-points" style="margin-right:50%">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款说明" prop="remark" class="full-item">
          <el-input v-model="ruleform.remark" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>

        <el-form-item label="账户名称" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="收款账号" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="开户行" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="发票编号" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票代码" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="销方纳税人识别号" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="收票日期" prop="number" class="there-points">
          <el-date-picker v-model="value1" disabled type="date" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item label="开票日期" prop="number" class="there-points">
          <el-date-picker v-model="value1" disabled type="date" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item label="发票类型" prop="number" class="there-points">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="发票金额" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票税率（%）" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票无税金额" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="发票税金" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票归类" prop="number" class="there-points">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="票据张数" prop="number" class="there-points ipt-one">
          <el-button size="small" plain disabled>-</el-button>
          <el-input v-model="ruleform.number" disabled />
          <el-button size="small" plain disabled>+</el-button>
        </el-form-item>

        <el-form-item label="附件" prop="number" class="there-points">
          <div class="text">
            <li>11.text</li>
          </div>
        </el-form-item>

        <el-form-item label="备注" prop="remark" class="full-item">
          <el-input v-model="ruleform.remark" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>

        <el-form-item label="申请人" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="申请时间" prop="number" class="there-points">
          <el-date-picker v-model="value1" disabled type="date" placeholder="选择日期时间" />
        </el-form-item>

      </el-form>
    </div>
    <drag-dialog ref="dialog" title="订单详情" width="85%" height="70%">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <essential-information />
        </el-tab-pane>
        <el-tab-pane label="材料采购清单" name="second">
          <template v-if="materialState==='default'">
            <material-purchase @changeTabConent="changeTabConent" />
          </template>
          <template v-if="materialState==='details'">
            <material-name @changeTabConent="changeTabConent" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="现场验收" name="third">
          <template v-if="siteState==='default'">
            <site-acceptance @changeTabConent="changeTabConent" />
          </template>
          <template v-if="siteState==='information'">
            <site-information @changeTabConent="changeTabConent" />
          </template>
          <template v-if="siteState==='supply'">
            <supply-list @changeTabConent="changeTabConent" />
          </template>
        </el-tab-pane>
      </el-tabs>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import EssentialInformation from './AppEssentialInformation'
import MaterialPurchase from './AppMaterialPurchase'
import SiteAcceptance from './AppSiteAcceptance'
import MaterialName from './AppMaterialName'
import SiteInformation from './SiteInformation'
import SupplyList from './SupplyList'
export default {
  components: { DragDialog, EssentialInformation, MaterialPurchase,
    SiteAcceptance, MaterialName, SiteInformation, SupplyList },
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
    changeTabConent(type, status) {
      switch (type) {
        case 'material':
          this.materialState = status
          break
        case 'site':
          this.siteState = status
          break
        default:
          break
      }
    },
    changeShow() {
      this.$refs.dialog.show = true
    }
  }
}
</script>

<style lang="less" scoped>
  .application-information {
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
        text-decoration: underline;
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
          display: flex!important;
          .is-disabled {
            width: 100%;
          }
          .el-select {
            width: 100%;
          }
          .look {
            display: inline-block;
            width: 40px;
            margin-left: 6px;
            color: @primary;
            cursor: pointer;
          }
        }
      }
      .ipt-one {
        .is-plain {
          width: 20%!important;
        }
        .el-input {
          width: 57%!important;
        }
          .el-input__inner {
            text-align: center;
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
