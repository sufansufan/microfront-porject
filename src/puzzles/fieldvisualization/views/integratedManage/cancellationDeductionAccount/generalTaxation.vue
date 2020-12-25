<template>
  <div class="general-taxation">
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
      <el-form :rules="rules" :model="ruleform" label-width="120px" class="dictionary-form">
        <el-form-item label="归属单位" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="月度" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="含税销售额" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="不含税销售额" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="销项税金" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="预缴增值税" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="进项税金" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="进项转出额" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="可抵税金" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="可退进项税" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="可退附加税" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="可退税金总计" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="进项留抵" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="已退回税金" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="已退回附加税" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="总计退回税金" prop="number">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="进项留抵总额" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="未退税金" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="未退附加税" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="总计未退税金" prop="number" class="four-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
      </el-form>
    </div>
    <div class="tab-active">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="开票明细" name="first">
          <Invoice-Details />
        </el-tab-pane>
        <el-tab-pane label="预缴明细" name="second">
          <receipts-details />
        </el-tab-pane>
        <el-tab-pane label="收票信息" name="third">
          <ticket-collection-details />
        </el-tab-pane>
        <el-tab-pane label="认证明细" name="fourth">
          <certification-details />
        </el-tab-pane>
        <el-tab-pane label="进项转出" name="fifth">
          <transfer-of-entries />
        </el-tab-pane>
        <el-tab-pane label="进销抵扣" name="sixth">
          <export-deduction />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import InvoiceDetails from './components/generalTaxation/invoiceDetails'
import ReceiptsDetails from './components/generalTaxation/receiptsDetails'
import TicketCollectionDetails from './components/generalTaxation/ticketCollectionDetails'
import CertificationDetails from './components/generalTaxation/certificationDetails'
import TransferOfEntries from './components/generalTaxation/transferOfEntries'
import ExportDeduction from './components/generalTaxation/exportDeduction'
export default {
  components: { InvoiceDetails, ReceiptsDetails, TicketCollectionDetails, CertificationDetails, TransferOfEntries, ExportDeduction },
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
      this.$router.push('/financialManage/integratedManage/cancellationDeductionAccount')
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
  .general-taxation {
    .link-a {
      color:@primary;
      cursor: pointer;
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
        .el-form-item {
          width: 25%;
          .is-disabled {
            width: 100%;
          }
        }
    }
    .search>.select>.fill-name {
			margin-right: 5px;
			.fill-line {
				width: 100%;
			}
			span {
				min-width: 70px;
				text-align: right;
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
