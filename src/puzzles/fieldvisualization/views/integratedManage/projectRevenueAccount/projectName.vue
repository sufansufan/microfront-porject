<template>
  <div class="project-name">
    <div class="search">
      <div class="btn">
        <div>
          <el-button-group>
            <el-button class="back-btn" @click="backGo()"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div class="form-border">
      <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-form">
        <el-form-item label="项目名称" prop="number" class="item-half">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="建设单位" prop="number" class="item-half">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="项目归属" prop="number" class="item-half">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="工程状态" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="质保期" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="合同编号" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="合同金额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="结算金额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="质保金到期日" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="质保金比例" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="质保金额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="印花税比例" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="管理税比例" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="税金比例" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="保证金比例" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="质保方式" prop="number" class="four-points">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item class="four-points" />

        <el-form-item label="应收款金额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="未收款金额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="已收款金额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="开票总金额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="开票税率" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="开票未收款" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票无税金额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票税金总额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="应付款金额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="未付款金额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="已付款金额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="收票总金额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="项目税金" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="收票未付款" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="收票无税金额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="收票税金总额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="印花税" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="项目保证金" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="管理费" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item class="four-points" />

        <el-form-item label="未认证发票" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="已认证发票" prop="number" class="five-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <div class="total-sum">
          &nbsp;&nbsp;&nbsp;&nbsp;总金额：<span>0.00</span> 元 占&nbsp;比：<span>0.0</span>%
        </div>
      </el-form>
    </div>
    <div class="tab-active">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="开票明细" name="first">
          <Invoice-Details />
        </el-tab-pane>
        <el-tab-pane label="收款明细" name="second">
          <receipts-details />
        </el-tab-pane>
        <el-tab-pane label="收票明细" name="third">
          <ticket-collection-details />
        </el-tab-pane>
        <el-tab-pane label="付款明细" name="fourth">
          <payment-details />
        </el-tab-pane>
        <el-tab-pane label="质保押金" name="fifth">
          <guarantee-deposit />>
        </el-tab-pane>
        <el-tab-pane label="收款计划" name="sixth">
          <collection-plan />
        </el-tab-pane>
        <el-tab-pane label="补充协议" name="seventh">
          <supplementary-agreement />
        </el-tab-pane>
      </el-tabs>
      <div class="tab-btn">
        <el-button icon="el-icon-s-tools" type="primary" @click="changeShow">财务配置</el-button>
      </div>
    </div>
    <drag-dialog ref="dialog" title="财务配置" width="70%" height="70%">
      <div v-if="isActive" class="tan-box">
        <div class="btn-top">
          <el-button type="primary" icon="el-icon-document" @click="confirmChange(isActive)">项目结清</el-button>
        </div>
        <el-form :rules="rules" :model="formrule" label-width="120px" class="dictionary-box">
          <el-form-item label="合同编号">
            <el-input v-model="formrule.read" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="项目编号">
            <el-input v-model="formrule.read" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="建设单位">
            <el-input v-model="formrule.read" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="formrule.read" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="项目类型">
            <el-select v-model="number" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="项目年份">
            <el-select v-model="number" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="项目归属">
            <el-select v-model="number" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="归属单位">
            <el-input v-model="ruleform.read" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="工程状态">
            <el-select v-model="number" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="计划开工日期">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="计划竣工日期">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="合同金额（元）">
            <el-input v-model="formrule.read" placeholder="请输入" />
          </el-form-item>
        </el-form>
        <div class="text">工程财务状态配置信息</div>
        <el-form :rules="rules" :model="formrule" label-width="160px" class="dictionary-box">
          <el-form-item label="工程验收资料是否提交" class="full-form">
            <el-select v-model="number" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="实际开工日期">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="实际竣工日期">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
          </el-form-item>
        </el-form>
        <div class="text">开票与回款配置信息</div>
        <el-form :rules="rules" :model="formrule" label-width="140px" class="dictionary-box">
          <el-form-item label="结算金额" prop="money">
            <el-input v-model="formrule.money" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="质保方式">
            <el-select v-model="number" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="质保期（月）">
            <el-input v-model="formrule.money" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="质保金到期日">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="质保金比例（%）">
            <el-input v-model="formrule.money" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="质保金额（元）">
            <el-input v-model="formrule.money" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="开票税率（%）">
            <el-input v-model="formrule.money" placeholder="请输入" />
          </el-form-item>
        </el-form>
        <div class="text">付款与收票配置信息</div>
        <el-form :rules="rules" :model="formrule" label-width="140px" class="dictionary-box">
          <el-form-item label="印花税比例（%）">
            <el-input v-model="formrule.money" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="管理税比例（%）">
            <el-input v-model="formrule.money" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="税金比例（%）">
            <el-input v-model="formrule.money" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="管理税比例（%）">
            <el-input v-model="formrule.money" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="保证金比例（%）">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
          </el-form-item>
        </el-form>
        <div class="text">税务配置信息</div>
        <el-form :rules="rules" :model="formrule" label-width="140px" class="dictionary-box">
          <el-form-item label="项目计税方式">
            <el-select v-model="number" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否预缴">
            <el-select v-model="number" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="预缴税率（%）">
            <el-input v-model="formrule.money" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="缴税地区">
            <el-select v-model="number" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="附加税地区">
            <el-select v-model="number" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="地区附加税率（%）">
            <el-input v-model="formrule.money" placeholder="请输入" />
          </el-form-item>
        </el-form>
        <div class="btnadd">
          <el-button type="primary" icon="el-icon-set-up">提交</el-button>
          <el-button class="cancel-btn">取消</el-button>
        </div>
      </div>
      <div v-if="!isActive">
        <el-form :rules="rules" :model="formrule" label-width="160px" class="dictionary-form">
          <el-form-item label="项目名称" class="full-itemm">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="建设单位" class="full-itemm">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="项目归属">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="工程状态">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="质保期(月)">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="质保金到期日">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="合同金额">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="结算金额">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="质保金比例">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="质保金额">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="应收款额">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="开票总金额">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="已收款额">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="开票未收款">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="未收款金额">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="是否结清">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="结清说明" prop="remark" class="full-item">
            <el-input v-model="ruleform.remark" type="textarea" :rows="2" placeholder="请输入内容" />
          </el-form-item>
        </el-form>
        <div class="btnadd">
          <el-button type="primary">确认结清</el-button>
          <el-button>撤销结清</el-button>
          <el-button class="back-btn" @click="confirmChange(isActive)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
        </div>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import InvoiceDetails from './components/invoiceDetails'
import ReceiptsDetails from './components/receiptsDetails'
import PaymentDetails from './components/paymentDetails'
import TicketCollectionDetails from './components/ticketCollectionDetails'
import GuaranteeDeposit from './components/guaranteeDeposit'
import CollectionPlan from './components/collectionPlan'
import SupplementaryAgreement from './components/supplementaryAgreement'
export default {
  components: { DragDialog, InvoiceDetails, ReceiptsDetails, TicketCollectionDetails, PaymentDetails, GuaranteeDeposit, CollectionPlan, SupplementaryAgreement },
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
      this.$router.push('/financialManage/integratedManage/projectRevenueAccount')
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

<style lang="less" scope>
  .project-name {
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
