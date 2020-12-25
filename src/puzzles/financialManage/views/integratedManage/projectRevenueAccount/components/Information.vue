<template>
  <div class="information">
    <div class="information-name">
      <span>{{ form.name }}</span>
    </div>
    <div class="information-form">
      <el-form ref="form" v-loading="loading" :model="form" label-width="170px" class="rule-form-flex four-width">
        <el-form-item label="工程名称" class="one-half">
          <el-input v-model.trim="form.name" disabled />
        </el-form-item>
        <el-form-item label="建设单位" class="one-half">
          <el-input v-model.trim="form.constructionUnit" disabled />
        </el-form-item>

        <el-form-item label="合同编号">
          <el-input v-model.trim="form.contractNumber" disabled />
        </el-form-item>
        <el-form-item label="工程状态">
          <jdy-select
            v-model="form.projectState"
            holder="工程状态"
            :select-data="constant.EngineeringStatus"
            disabled
            :select-options="{value:'code',label:'name'}"
          />
        </el-form-item>
        <el-form-item label="项目归属" class="one-half">
          <div class="search-input">
            <jdy-select
              v-model="form.attribution"
              holder="项目归属范围"
              :select-data="constant.ContractAttribution"
              disabled
              :select-options="{value:'code',label:'name'}"
            />
            <el-input v-model.trim="form.belongOrgName" disabled />
          </div>
        </el-form-item>

        <el-form-item label="合同金额">
          <amount-input
            v-model="form.amount"
            placeholder="请输入合同金额"
            disabled
          >
            <template slot="append">元</template>
          </amount-input>
        </el-form-item>
        <el-form-item label="印花税比例">
          <amount-input
            v-model="form.stampDutyRatio"
            placeholder="请输入印花税比例"
            disabled
            unit-name="%"
          />
        </el-form-item>
        <el-form-item label="上缴利润比例">
          <amount-input
            v-model="form.proportionOfTurnedInProfit"
            placeholder="请输入上缴利润比例"
            disabled
            unit-name="%"
          />
        </el-form-item>
        <el-form-item label="结清状态">
          <jdy-select
            v-model="form.settleState"
            holder="结清状态"
            :select-data="constant.projectSettleState"
            disabled
            :select-options="{value:'code',label:'name'}"
          />
        </el-form-item>

        <el-form-item label="结算金额">
          <amount-input
            v-model="form.settlementAmount"
            placeholder="请输入结算金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="印花税">
          <amount-input
            v-model="form.projectStampDuty"
            placeholder="请输入印花税"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="上缴利润总额">
          <amount-input
            v-model="form.turnInProfit"
            placeholder="请输入上缴利润总额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="项目应收税金比例">
          <amount-input
            v-model="form.proportionOfProjectTaxPayable"
            placeholder="请输入项目应收税金比例"
            disabled
            unit-name="%"
          />
        </el-form-item>

        <el-form-item label="应收款金额">
          <amount-input
            v-model="form.amountReceivable"
            placeholder="请输入应收款金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="质保方式">
          <jdy-select
            v-model="form.warrantyMethod"
            holder="质保方式"
            :select-data="constant.warrantyMode"
            disabled
            :select-options="{value:'code',label:'name'}"
          />
        </el-form-item>
        <el-form-item label="应上缴利润">
          <amount-input
            v-model="form.profitPayable"
            placeholder="请输入应上缴利润"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="项目应收税金">
          <amount-input
            v-model="form.projectTaxReceivable"
            placeholder="请输入项目应收税金"
            disabled
            unit-name="元"
          />
        </el-form-item>

        <el-form-item label="已收款金额">
          <amount-input
            v-model="form.amountReceived"
            placeholder="请输入已收款金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="质保金比例">
          <amount-input
            v-model="form.proportionOfWarranty"
            placeholder="请输入质保金比例"
            disabled
            unit-name="%"
          />
        </el-form-item>
        <el-form-item label="已上缴利润">
          <amount-input
            v-model="form.paidInProfit"
            placeholder="请输入已上缴利润"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="风险保证金比例">
          <amount-input
            v-model="form.riskMarginRatio"
            placeholder="请输入风险保证金比例"
            disabled
            unit-name="%"
          />
        </el-form-item>

        <el-form-item label="未收款金额">
          <amount-input
            v-model="form.notAmountReceived"
            placeholder="请输入未收款金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="质保金额">
          <amount-input
            v-model="form.warrantyDeposit"
            placeholder="请输入质保金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="应付款金额">
          <amount-input
            v-model="form.amountPayable"
            placeholder="请输入应付款金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="风险保证金">
          <amount-input
            v-model="form.riskMargin"
            placeholder="请输入风险保证金"
            disabled
            unit-name="元"
          />
        </el-form-item>

        <el-form-item label="开票税率">
          <amount-input
            v-model="form.invoicingRaxRate"
            placeholder="请输入开票税率"
            disabled
            unit-name="%"
          />
        </el-form-item>
        <el-form-item label="质保期">
          <el-input v-model="form.warrantyPeriod" placeholder="请输入质保期" style="text-align:right;" clearable>
            <template slot="append">
              <slot name="append">月</slot>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="已付款金额">
          <amount-input
            v-model="form.amountPaid"
            placeholder="请输入已付款金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="未认证发票">
          <amount-input
            v-model="form.unCertifiedReceipt"
            placeholder="请输入未认证发票"
            disabled
            unit-name="元"
          />
        </el-form-item>

        <el-form-item label="开票总额">
          <amount-input
            v-model="form.totalInvoice"
            placeholder="请输入开票总额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="质保金到期日">
          <el-date-picker
            v-model="form.warrantyDepositDueDate"
            type="date"
            placeholder="请选择质保金到期日"
            clearable
            disabled
          />
        </el-form-item>
        <el-form-item label="未付款金额">
          <amount-input
            v-model="form.receiveNoPayMoney"
            placeholder="请输入未付款金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="已认证发票">
          <amount-input
            v-model="form.certifiedReceipt"
            placeholder="请输入已认证发票"
            disabled
            unit-name="元"
          />
        </el-form-item>

        <el-form-item label="开票税金总额">
          <amount-input
            v-model="form.taxAmount"
            placeholder="请输入开票税金总额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="开票已收款总额">
          <amount-input
            v-model="form.billAmountReceived"
            placeholder="请输入开票已收款总额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="收票总额">
          <amount-input
            v-model="form.totalAmount"
            placeholder="请输入收票总额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="收票已付款总额">
          <amount-input
            v-model="form.invoicingPaymentMoney"
            placeholder="请输入收票已付款总额"
            disabled
            unit-name="元"
          />
        </el-form-item>

        <el-form-item label="开票未收款总额">
          <amount-input
            v-model="form.billBalanceReceived"
            placeholder="请输入开票未收款总额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="未开票已收款总额">
          <amount-input
            v-model="form.receivedNotBidAmount"
            placeholder="请输入未开票已收款总额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="收票税金金额">
          <amount-input
            v-model="form.invoiceTax"
            placeholder="请输入收票税金金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="收票未付款总额">
          <amount-input
            v-model="form.unpaidAmount"
            placeholder="请输入收票未付款总额"
            disabled
            unit-name="元"
          />
        </el-form-item>

        <el-form-item label="甲方质保/保函/押金">
          <amount-input
            v-model="form.warrantyGuaranteeDeposit"
            placeholder="请输入甲方质保/保函/押金"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="项目质保/押金">
          <amount-input
            v-model="form.projectWarranty"
            placeholder="请输入项目质保/押金"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="收票无税金额">
          <amount-input
            v-model="form.noTaxAmountOnInvoice"
            placeholder="请输入收票无税金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="未收票已付款总额">
          <amount-input
            v-model="form.paymentNoReceipt"
            placeholder="请输入未收票已付款总额"
            disabled
            unit-name="元"
          />
        </el-form-item>

        <el-form-item label="往来款借入金额">
          <amount-input
            v-model="form.borrowAmount"
            placeholder="请输入往来款借入金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="往来款借出金额">
          <amount-input
            v-model="form.loanAmount"
            placeholder="请输入往来款借出金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="往来款余额">
          <amount-input
            v-model="form.contactBalance"
            placeholder="请输入往来款余额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="预缴税率">
          <amount-input
            v-model="form.prepaidTaxRate"
            placeholder="请输入预缴税率"
            disabled
            unit-name="%"
          />
        </el-form-item>

        <el-form-item label="借入已还金额">
          <amount-input
            v-model="form.borrowReturnAmount"
            placeholder="请输入借入已还金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="借出已还金额">
          <amount-input
            v-model="form.loanReturnAmount"
            placeholder="请输入借出已还金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="地区附加税率">
          <amount-input
            v-model="form.regionalAdditionalTaxRate"
            placeholder="请输入地区附加税率"
            disabled
            unit-name="%"
          />
        </el-form-item>
        <el-form-item label="已预缴增值税">
          <amount-input
            v-model="form.prepaidTax"
            placeholder="请输入已预缴增值税"
            disabled
            unit-name="元"
          />
        </el-form-item>

        <el-form-item label="借入未还金额">
          <amount-input
            v-model="form.borrowNotReturnAmount"
            placeholder="请输入借入未还金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="借出未还金额">
          <amount-input
            v-model="form.loanNotReturnAmount"
            placeholder="请输入借出未还金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="地区附件税">
          <amount-input
            v-model="form.regionalAdditionalTax"
            placeholder="请输入地区附件税"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="进项已抵扣税金">
          <amount-input
            v-model="form.inputDeductedTax"
            placeholder="请输入进项已抵扣税金"
            disabled
            unit-name="元"
          />
        </el-form-item>

        <el-form-item label="成本费用类别">
          <jdy-select
            v-model="form.costClass"
            holder="成本费用类别"
            :select-data="paymentTypeList"
            :select-options="{value:'classNumber',label:'name'}"
            @change="changeCost"
          />
          <span style="color:red;font-size:12px">切换下拉框可查看不同的成本金额及成本占比</span>
        </el-form-item>
        <el-form-item label="成本金额">
          <amount-input
            v-model="costMoney"
            placeholder="请输入成本金额"
            disabled
            unit-name="元"
          />
        </el-form-item>
        <el-form-item label="成本占比">
          <amount-input
            v-model="costProportion"
            placeholder="请输入成本占比"
            disabled
            unit-name="%"
          />
        </el-form-item>
        <el-form-item label="项目可用余额">
          <amount-input
            v-model="form.projectAvailableBalance"
            placeholder="请输入项目可用余额"
            disabled
            unit-name="元"
          />
        </el-form-item>

        <el-form-item label="结清说明" class="one-width row-label">
          <el-input v-model.trim="form.info" type="textarea" :maxlength="255" :rows="3" disabled />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { formatMoney } from '@core/utils'
import { mapGetters } from 'vuex'
import { financeclassList } from '@core/api/financialManage/financeclassmanager'
import { getCost } from '@core/api/financialManage/projectfinancemanager'
export default {
  name: 'Information',
  props: {
    detailInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        name: '',
        attribution: '',
        belongOrgName: '',
        constructionUnit: '',
        contractNumber: '',
        projectState: '',
        amount: '',
        stampDutyRatio: '',
        proportionOfTurnedInProfit: '',
        settleState: '',
        settlementAmount: '',
        projectStampDuty: '',
        turnInProfit: '',
        proportionOfProjectTaxPayable: '',
        amountReceivable: '',
        warrantyMethod: '',
        profitPayable: '',
        projectTaxReceivable: '',
        amountReceived: '',
        proportionOfWarranty: '',
        paidInProfit: '',
        riskMarginRatio: '',
        notAmountReceived: '',
        warrantyDeposit: '',
        amountPayable: '',
        riskMargin: '',
        invoicingRaxRate: '',
        warrantyPeriod: '',
        amountPaid: '',
        unCertifiedReceipt: '',
        totalInvoice: '',
        warrantyDepositDueDate: '',
        receiveNoPayMoney: '',
        certifiedReceipt: '',
        taxAmount: '',
        billAmountReceived: '',
        totalAmount: '',
        invoicingPaymentMoney: '',
        billBalanceReceived: '',
        receivedNotBidAmount: '',
        invoiceTax: '',
        unpaidAmount: '',
        warrantyGuaranteeDeposit: '',
        projectWarranty: '',
        noTaxAmountOnInvoice: '',
        paymentNoReceipt: '',
        borrowAmount: '',
        loanAmount: '',
        contactBalance: '',
        prepaidTaxRate: '',
        borrowReturnAmount: '',
        loanReturnAmount: '',
        regionalAdditionalTaxRate: '',
        prepaidTax: '',
        borrowNotReturnAmount: '',
        loanNotReturnAmount: '',
        regionalAdditionalTax: '',
        inputDeductedTax: '',
        costAccountingName: '',
        projectAvailableBalance: '',
        info: '',
        costClass: 'LB0301'
      },
      paymentTypeList: [],
      costMoney: '',
      costProportion: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    '$route.query.id': {
      handler(val) {
        if (val) {
          // this.getDeatails()
        }
      },
      immediate: true,
      deep: true
    },
    detailInfo: {
      handler(val) {
        if (val) {
          if (JSON.stringify(val) !== '{}') {
            this.getDeatails()
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['projectSettleState', 'ContractAttribution', 'warrantyMode', 'EngineeringStatus'])
  },
  activated() {
    this.getFinanceInvoiceType()
  },
  methods: {
    changeCost(value) {
      if (value === '') return
      getCost(this.$route.query.id, value).then(({ data }) => {
        const { costMoney, costProportion } = data
        this.costMoney = costMoney === null || '' ? '0.00' : formatMoney(costMoney)
        this.costProportion = costProportion === null || '' ? '0.00' : formatMoney(costProportion)
      })
    },
    // 获取成本费用类别
    getFinanceInvoiceType() {
      const params = {
        financeClassNumber: 'LB03',
        page: 0,
        size: 20
      }
      financeclassList(params).then(({ data }) => {
        this.paymentTypeList = data.content
      })
    },
    getDeatails() {
      // const { id } = this.$route.query
      const { amount, stampDutyRatio, proportionOfTurnedInProfit, settlementAmount, projectStampDuty, turnInProfit, proportionOfProjectTaxPayable, amountReceivable, profitPayable, projectTaxReceivable, amountReceived, proportionOfWarranty, paidInProfit, riskMarginRatio, notAmountReceived, warrantyDeposit, amountPayable, riskMargin, invoicingRaxRate, amountPaid, unCertifiedReceipt, totalInvoice, receiveNoPayMoney, certifiedReceipt, taxAmount, billAmountReceived, invoicingPaymentMoney, billBalanceReceived, receivedNotBidAmount, invoiceTax, unpaidAmount, warrantyGuaranteeDeposit, projectWarranty, noTaxAmountOnInvoice, paymentNoReceipt, borrowAmount, loanAmount, contactBalance, prepaidTaxRate, borrowReturnAmount, loanReturnAmount, regionalAdditionalTaxRate, prepaidTax, borrowNotReturnAmount, loanNotReturnAmount, regionalAdditionalTax, inputDeductedTax, projectAvailableBalance, totalAmount, name, constructionUnit, contractNumber, projectState, warrantyMethod, settleState, warrantyDepositDueDate, belongOrgName, attribution, warrantyPeriod, info
      } = this.detailInfo
      const amountParam = {
        amount, stampDutyRatio, proportionOfTurnedInProfit, settlementAmount, projectStampDuty, turnInProfit, proportionOfProjectTaxPayable, amountReceivable, profitPayable, projectTaxReceivable, amountReceived, proportionOfWarranty, paidInProfit, riskMarginRatio, notAmountReceived, warrantyDeposit, amountPayable, riskMargin, invoicingRaxRate, amountPaid, unCertifiedReceipt, totalInvoice, receiveNoPayMoney, certifiedReceipt, taxAmount, billAmountReceived, invoicingPaymentMoney, billBalanceReceived, receivedNotBidAmount, invoiceTax, unpaidAmount, warrantyGuaranteeDeposit, projectWarranty, noTaxAmountOnInvoice, paymentNoReceipt, borrowAmount, loanAmount, contactBalance, prepaidTaxRate, borrowReturnAmount, loanReturnAmount, regionalAdditionalTaxRate, prepaidTax, borrowNotReturnAmount, loanNotReturnAmount, regionalAdditionalTax, inputDeductedTax, projectAvailableBalance
      }

      for (const key in amountParam) {
        amountParam[key] = amountParam[key] === null || '' ? '0.00' : formatMoney(amountParam[key])
      }
      this.form = {
        name,
        ...amountParam,
        totalAmount,
        constructionUnit,
        contractNumber,
        projectState,
        warrantyMethod,
        settleState,
        warrantyDepositDueDate,
        belongOrgName,
        attribution,
        warrantyPeriod,
        info
      }
      this.loading = false
      this.form.costClass = 'LB0301'
      this.changeCost(this.form.costClass)
      // getProjectDetails(id).then(({ data }) => {

      // })
    }
  }
}
</script>
<style lang="less" scoped>
.information {
  .information-name {
    display: flex;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    margin: 10px 0;
  }
  .rule-form-flex {
    & > .el-form-item:nth-of-type(5){
      .el-form-item__content {
        display: flex;
        justify-content: space-between;
        .el-input:first-of-type {
          width: 20%;
        }
      }
    }
  }
  .search-input {
    display: flex;
    justify-content: space-between;
  }
}
</style>
