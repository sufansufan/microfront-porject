<template>
  <div class="details-view">
    <div class="btn">
      <el-button type="primary" @click="financeSet">财务设置</el-button>
      <el-button type="primary" @click="projectSettle('settle')">项目结清</el-button>
      <el-button type="primary" @click="projectSettle('')">撤销结算</el-button>
      <el-button class="back-btn" type="return" @click="back"><i class="iconfont icon-fanhui-copy" />返回</el-button>
    </div>
    <div class="form">
      <information ref="information" :detail-info="detailInfo" />
    </div>
    <div class="tableList">
      <el-tabs
        ref="tabs"
        v-model="activeName"
        type="card"
        class="one-card-tabs is-padding"
        @tab-click="handleClick"
      >
        <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
          <template v-if="compomentAdd">
            <component :is="componentName ? '' : item.com" :btn-attr="btnAttr" @changeComName="changeComName" />
          </template>
          <template v-else>
            <component :is="compomentAddName" :compoment-id="compomentId" :compoment-type="compomentType" :detail-info="detailInfo" @changeComName="changeComName" />
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <drag-dialog ref="dialog" :title="changeTitle" width="60%">
      <div v-if="changeTitle === '财务设置'" class="set">
        <el-form ref="ruleForm" v-loading="loading" :model="ruleForm" :rules="formRules" label-width="170px" class="rule-form-flex">
          <el-form-item label="计划开工日期">
            <el-date-picker
              v-model="ruleForm.startDate"
              type="date"
              placeholder="请选择计划开工日期"
              clearable
              disabled
            />
          </el-form-item>
          <el-form-item label="计划竣工日期">
            <el-date-picker
              v-model="ruleForm.endDate"
              type="date"
              placeholder="请选择计划竣工日期"
              clearable
              disabled
            />
          </el-form-item>
          <el-form-item label="合同金额">
            <amount-input
              v-model="ruleForm.amount"
              placeholder="请输入合同金额"
              disabled
              unit-name="元"
              @blur="amountBlur('amount')"
            />
          </el-form-item>

          <el-form-item label="实际开工日期">
            <el-date-picker
              v-model="ruleForm.actualStartDate"
              type="date"
              placeholder="请选择实际开工日期"
              clearable
              disabled
            />
          </el-form-item>
          <el-form-item label="实际竣工日期">
            <el-date-picker
              v-model="ruleForm.actualEndDate"
              type="date"
              placeholder="请选择实际竣工日期"
              clearable
              disabled
            />
          </el-form-item>
          <el-form-item label="结算金额">
            <amount-input
              v-model="ruleForm.settlementAmount"
              placeholder="请输入结算金额"
              disabled
              unit-name="元"
              @blur="amountBlur('settlementAmount')"
            />
          </el-form-item>

          <el-form-item label="验收资料是否提交">
            <jdy-select
              v-model="ruleForm.submitInforMation"
              holder="验收资料是否提交"
              :select-data="constant.commonYesNo"
              :select-options="{value:'code',label:'name'}"
            />
          </el-form-item>
          <el-form-item label="项目计税方式">
            <jdy-select
              v-model="ruleForm.taxCalculationMethod"
              holder="项目计税方式"
              :select-data="constant.projectTaxMode"
              :select-options="{value:'code',label:'name'}"
            />
          </el-form-item>
          <el-form-item label="质保方式" prop="warrantyMethod">
            <jdy-select
              v-model="ruleForm.warrantyMethod"
              holder="质保方式"
              :select-data="constant.warrantyMode"
              :select-options="{value:'code',label:'name'}"
            />
          </el-form-item>

          <el-form-item label="质保期" prop="warrantyPeriod">
            <el-input v-model="ruleForm.warrantyPeriod" placeholder="请输入质保期" style="text-align:right;" clearable>
              <template slot="append">
                <slot name="append">月</slot>
              </template>
            </el-input>

          </el-form-item>
          <el-form-item label="质保金到期日">
            <el-date-picker
              v-model="ruleForm.warrantyDepositDueDate"
              type="date"
              placeholder="请选择质保金到期日"
              clearable
            />
          </el-form-item>
          <el-form-item label="质保金比例">
            <amount-input
              v-model="ruleForm.proportionOfWarranty"
              placeholder="请输入质保金比例"
              unit-name="%"
              @blur="amountBlur('proportionOfWarranty')"
            />
          </el-form-item>

          <el-form-item label="开票税率">
            <amount-input
              v-model="ruleForm.invoicingRaxRate"
              placeholder="请输入开票税率"
              unit-name="%"
              @blur="amountBlur('invoicingRaxRate')"
            />
          </el-form-item>
          <el-form-item label="印花税比例">
            <amount-input
              v-model="ruleForm.stampDutyRatio"
              placeholder="请输入印花税比例"
              unit-name="%"
              @blur="amountBlur('stampDutyRatio')"
            />
          </el-form-item>
          <el-form-item label="质保金额">
            <amount-input
              v-model="ruleForm.warrantyAmount"
              placeholder="请输入质保金额"
              unit-name="元"
              @blur="amountBlur('warrantyAmount')"
            />
          </el-form-item>

          <el-form-item label="上缴利润比例">
            <amount-input
              v-model="ruleForm.proportionOfTurnedInProfit"
              placeholder="请输入上缴利润比例"
              unit-name="%"
              @blur="amountBlur('proportionOfTurnedInProfit')"
            />
          </el-form-item>
          <el-form-item label="风险保证金比例">
            <amount-input
              v-model="ruleForm.riskMarginRatio"
              placeholder="请输入风险保证金比例"
              unit-name="%"
              @blur="amountBlur('riskMarginRatio')"
            />
          </el-form-item>
          <el-form-item label="项目应缴税金比例">
            <amount-input
              v-model="ruleForm.proportionOfProjectTaxPayable"
              placeholder="请输入项目应缴税金比例"
              unit-name="%"
              @blur="amountBlur('proportionOfProjectTaxPayable')"
            />
          </el-form-item>

          <el-form-item label="是否预缴">
            <jdy-select
              v-model="ruleForm.prepay"
              holder="是否预缴"
              :select-data="constant.commonYesNo"
              :select-options="{value:'code',label:'name'}"
            />
          </el-form-item>
          <el-form-item label="预缴地区">
            <el-cascader
              v-model="ruleForm.prepaymentArea"
              :options="constant.nativePlace"
              :props="{
                expandTrigger: 'hover',
                value: 'id',
                label: 'zh',
                children: 'children',
                checkStrictly: true
              }"
              placeholder="请选择预缴地区"
              clearable
            />
          </el-form-item>
          <el-form-item label="预缴税率">
            <amount-input
              v-model="ruleForm.prepaidTaxRate"
              placeholder="请输入预缴税率"
              unit-name="%"
              @blur="amountBlur('prepaidTaxRate')"
            />
          </el-form-item>

          <el-form-item label="附加税地区">
            <el-cascader
              v-model="ruleForm.additionalTaxArea"
              :options="constant.nativePlace"
              :props="{
                expandTrigger: 'hover',
                value: 'id',
                label: 'zh',
                children: 'children',
                checkStrictly: true
              }"
              placeholder="请选择附加税地区"
              clearable
            />
          </el-form-item>
          <el-form-item label="地区附加税率">
            <amount-input
              v-model="ruleForm.regionalAdditionalTaxRate"
              placeholder="请输入地区附加税率"
              unit-name="%"
              @blur="amountBlur('regionalAdditionalTaxRate')"
            />
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <el-form ref="settleForm" v-loading="loading" :model="settleForm" :rules="settleRules" label-width="170px" class="rule-form-flex">
          <el-form-item label="合同金额">
            <amount-input
              v-model="settleForm.amount"
              placeholder="请输入合同金额"
              disabled
              unit-name="元"
            />
          </el-form-item>
          <el-form-item label="结算金额">
            <amount-input
              v-model="settleForm.settlementAmount"
              placeholder="请输入结算金额"
              disabled
              unit-name="元"
            />
          </el-form-item>
          <el-form-item label="质保金比例">
            <amount-input
              v-model="settleForm.proportionOfWarranty"
              placeholder="请输入质保金比例"
              disabled
              unit-name="元"
            />
          </el-form-item>

          <el-form-item label="质保期">
            <el-input v-model="settleForm.warrantyPeriod" placeholder="请输入质保期" style="text-align:right;" clearable>
              <template slot="append">
                <slot name="append">月</slot>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="质保金到期日">
            <el-date-picker
              v-model="settleForm.warrantyDepositDueDate"
              type="date"
              placeholder="请选择质保金到期日"
              clearable
              disabled
            />
          </el-form-item>
          <el-form-item label="质保金额">
            <amount-input
              v-model="settleForm.warrantyDeposit"
              placeholder="请输入质保金额"
              disabled
              unit-name="元"
            />
          </el-form-item>

          <el-form-item label="应收款额">
            <amount-input
              v-model="settleForm.amountReceivable"
              placeholder="请输入应收款额"
              disabled
              unit-name="元"
            />
          </el-form-item>
          <el-form-item label="已收款额">
            <amount-input
              v-model="settleForm.amountReceived"
              placeholder="请输入已收款额"
              disabled
              unit-name="元"
            />
          </el-form-item>
          <el-form-item label="未收款额">
            <amount-input
              v-model="settleForm.notAmountReceived"
              placeholder="请输入未收款额"
              disabled
              unit-name="元"
            />
          </el-form-item>

          <el-form-item label="开票总额">
            <amount-input
              v-model="settleForm.totalInvoice"
              placeholder="请输入开票总额"
              disabled
              unit-name="元"
            />
          </el-form-item>
          <el-form-item label="开票已收款总额">
            <amount-input
              v-model="settleForm.billAmountReceived"
              placeholder="请输入开票已收款总额"
              disabled
              unit-name="元"
            />
          </el-form-item>
          <el-form-item label="未开票已收款总额">
            <amount-input
              v-model="settleForm.receivedNotBidAmount"
              placeholder="请输入未开票已收款总额"
              disabled
              unit-name="元"
            />
          </el-form-item>

          <el-form-item label="质保方式">
            <jdy-select
              v-model="settleForm.warrantyMethod"
              holder="质保方式"
              :select-data="constant.warrantyMode"
              disabled
              :select-options="{value:'code',label:'name'}"
            />
          </el-form-item>

          <el-form-item label="结清说明" class="one-width" prop="settleInfo">
            <el-input v-model.trim="settleForm.settleInfo" type="textarea" :maxlength="255" :rows="3" />
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-show-btn">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>
<script>
import { getProjectDetails, getConfig, setConfig, settle, settleCancel } from '@core/api/financialManage/projectfinancemanager'
import { formatMoney } from '@core/utils'
import { validateInteger, toDecimal, validateLength } from '@core/utils/validate'
import { editMainEngContract, editMainDesignContract } from '@core/api/contractManage/contractmanager'
import Information from './components/Information'
import CollectionPlan from './components/CollectionPlan'
import CurrentPaymentDetails from './components/CurrentPaymentDetails'
import Repayment from './components/Repayment'
import CurrentPaymentAdd from './components/CurrentPaymentAdd'
import InvoicingDetails from './components/InvoicingDetails'
import InvoicingAdd from './components/InvoicingAdd'
import PaymentDetails from './components/PaymentDetails'
import PaymentAdd from './components/PaymentAdd'
import ReceiptDetails from './components/ReceiptDetails'
import ReceiptAdd from './components/ReceiptAdd'
import ReceivePayDetails from './components/ReceivePayDetails'
import ReceivePayAdd from './components/ReceivePayAdd'
import Supplementary from './components/Supplementary'
import Warranty from './components/Warranty'
import WarrantyAdd from './components/WarrantyAdd'
import { mapGetters } from 'vuex'
export default {
  name: 'DetailsView',
  components: {
    Information,
    CollectionPlan,
    CurrentPaymentDetails,
    InvoicingDetails,
    PaymentDetails,
    ReceiptDetails,
    ReceivePayDetails,
    Supplementary,
    Warranty,
    InvoicingAdd,
    ReceivePayAdd,
    ReceiptAdd,
    PaymentAdd,
    CurrentPaymentAdd,
    WarrantyAdd,
    Repayment
  },
  data() {
    const validateNumber = (rule, value, callback) => {
      if (validateInteger(value)) {
        if (parseInt(value) < 0 || parseInt(value) >= 1000) {
          callback('请输入0-1000正整数')
        } else {
          callback()
        }
      } else {
        if (value === '') {
          callback()
        } else {
          callback('请输入正整数')
        }
      }
    }
    return {
      btnAttr: {},
      changeTitle: '财务设置',
      componentName: '',
      compomentAdd: true,
      compomentAddName: '',
      compomentId: '', // 列表数据的id
      compomentType: '', // 操作类型
      activeName: 'invoicingDetails',
      tabList: [
        {
          label: '开票明细',
          name: 'invoicingDetails',
          com: 'InvoicingDetails'
        },
        {
          label: '收款明细',
          name: 'ReceivePayDetails',
          com: 'ReceivePayDetails'
        },
        {
          label: '收票明细',
          name: 'ReceiptDetails',
          com: 'ReceiptDetails'
        },
        {
          label: '付款明细',
          name: 'PaymentDetails',
          com: 'PaymentDetails'
        },
        {
          label: '往来款明细',
          name: 'CurrentPaymentDetails',
          com: 'CurrentPaymentDetails'
        },
        {
          label: '质保押金',
          name: 'Warranty',
          com: 'Warranty'
        },
        {
          label: '补充协议',
          name: 'Supplementary',
          com: 'Supplementary'
        }
      ],
      ruleForm: {
        startDate: '',
        endDate: '',
        amount: '',
        actualStartDate: '',
        actualEndDate: '',
        settlementAmount: '',
        submitInforMation: '',
        taxCalculationMethod: '',
        warrantyMethod: '',
        warrantyPeriod: '',
        warrantyDepositDueDate: '',
        proportionOfWarranty: '',
        invoicingRaxRate: '',
        stampDutyRatio: '',
        warrantyAmount: '',
        proportionOfTurnedInProfit: '',
        riskMarginRatio: '',
        proportionOfProjectTaxPayable: '',
        prepay: '',
        prepaymentArea: [],
        prepaidTaxRate: '',
        additionalTaxArea: [],
        regionalAdditionalTaxRate: ''
      },
      formRules: {
        warrantyMethod: [{ required: true, message: '请选择质保方式', trigger: 'change' }],
        warrantyPeriod: [{ required: false, validator: validateNumber, trigger: 'blur' }]
      },
      settleForm: {
        amount: '',
        settlementAmount: '',
        proportionOfWarranty: '',
        warrantyPeriod: '',
        warrantyDepositDueDate: '',
        warrantyDeposit: '',
        amountReceivable: '',
        amountReceived: '',
        notAmountReceived: '',
        totalInvoice: '',
        billAmountReceived: '',
        receivedNotBidAmount: '',
        warrantyMethod: '',
        settleInfo: ''
      },
      settleRules: {
        settleInfo: [{ required: true, message: '请输入结清说明', trigger: 'blur' }, validateLength(0, 255)]
      },
      loading: false,
      detailInfo: {} // 具体详情信息
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  activated() {
    this.$store.dispatch('getConstant', ['commonYesNo', 'projectTaxMode', 'warrantyMode', 'nativePlace']).then(() => {
      this.getDetails()
    })
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1)
    },
    amountBlur(key) {
      this.ruleForm[key] = toDecimal(this.ruleForm[key], 2)
    },
    // data:组件名称 type为取消
    changeComName(data, type, id) {
      this.compomentType = type
      this.compomentId = id
      if (type === 'cancel') {
        this.compomentAdd = true
      } else {
        this.compomentAdd = false
        this.compomentAddName = data
      }
    },
    handleClick() {
      this.componentName = ''
      this.compomentAdd = true
    },
    // 获取详情
    getDetails() {
      this.$nextTick(() => {
        this.$refs.information.loading = true
        this.$refs.information.getFinanceInvoiceType()
      })
      this.detailInfo = {}
      getProjectDetails(this.$route.query.id).then(({ data }) => {
        this.detailInfo = JSON.parse(JSON.stringify(data))
      })
    },
    // 财务设置
    financeSet() {
      const { id } = this.$route.query
      this.loading = true
      getConfig(id).then(({ data }) => {
        const {
          submitInforMation,
          taxCalculationMethod,
          warrantyMethod,
          warrantyPeriod,
          warrantyDepositDueDate,
          proportionOfWarranty,
          stampDutyRatio,
          warrantyAmount,
          proportionOfTurnedInProfit,
          riskMarginRatio,
          proportionOfProjectTaxPayable,
          prepay,
          prepaymentArea,
          prepaidTaxRate,
          additionalTaxArea,
          regionalAdditionalTaxRate,
          invoicingRaxRate
        } = data
        this.btnAttr = {
          taxCalculationMethod: taxCalculationMethod
        }
        this.ruleForm = {
          submitInforMation,
          taxCalculationMethod,
          warrantyMethod,
          warrantyPeriod,
          warrantyDepositDueDate,
          invoicingRaxRate: invoicingRaxRate === null || '' ? '0.00' : formatMoney(invoicingRaxRate),
          proportionOfWarranty: proportionOfWarranty === null || '' ? '0.00' : formatMoney(proportionOfWarranty),
          stampDutyRatio: stampDutyRatio === null || '' ? '0.00' : formatMoney(stampDutyRatio),
          warrantyAmount: warrantyAmount === null || '' ? '0.00' : formatMoney(warrantyAmount),
          proportionOfTurnedInProfit: proportionOfTurnedInProfit === null || '' ? '0.00' : formatMoney(proportionOfTurnedInProfit),
          riskMarginRatio: riskMarginRatio === null || '' ? '0.00' : formatMoney(riskMarginRatio),
          proportionOfProjectTaxPayable: proportionOfProjectTaxPayable === null || '' ? '0.00' : formatMoney(proportionOfProjectTaxPayable),
          prepay,
          prepaymentArea: prepaymentArea.split(','),
          prepaidTaxRate: prepaidTaxRate === null || '' ? '0.00' : formatMoney(prepaidTaxRate),
          additionalTaxArea: additionalTaxArea.split(','),
          regionalAdditionalTaxRate: regionalAdditionalTaxRate === null || '' ? '0.00' : formatMoney(regionalAdditionalTaxRate)
        }
        if (this.detailInfo.type === '01') { // 01为工程合同
          editMainEngContract(id).then(({ data }) => {
            const { startDate, endDate, amount, settlementAmount } = data
            this.ruleForm.amount = amount === null || '' ? '0.00' : formatMoney(amount)
            this.ruleForm.startDate = startDate
            this.ruleForm.endDate = endDate
            this.ruleForm.settlementAmount = settlementAmount === null || '' ? '0.00' : formatMoney(settlementAmount)
            this.loading = false
          })
        } else {
          editMainDesignContract(id).then(({ data }) => {
            const { startDate, endDate, amount, settlementAmount } = data
            this.ruleForm.amount = amount === null || '' ? '0.00' : formatMoney(amount)
            this.ruleForm.startDate = startDate
            this.ruleForm.endDate = endDate
            this.ruleForm.settlementAmount = settlementAmount === null || '' ? '0.00' : formatMoney(settlementAmount)
            this.loading = false
          })
        }
      })
      this.changeTitle = '财务设置'
      this.$refs.dialog.show = true
    },
    // 项目结清 撤销结清
    projectSettle(type) {
      if (type === 'settle') {
        if (this.detailInfo.settleState === '02') {
          this.$message.warning('项目已结清')
          return
        }
        const { amount, settlementAmount, proportionOfWarranty, warrantyPeriod, warrantyDepositDueDate, warrantyDeposit, amountReceivable, amountReceived, notAmountReceived, totalInvoice, billAmountReceived, receivedNotBidAmount, warrantyMethod, info
        } = this.detailInfo
        this.settleForm = {
          amount: amount === null || '' ? '0.00' : formatMoney(amount),
          settlementAmount: settlementAmount === null || '' ? '0.00' : formatMoney(settlementAmount),
          proportionOfWarranty: proportionOfWarranty === null || '' ? '0.00' : formatMoney(proportionOfWarranty),
          warrantyPeriod: warrantyPeriod === null || '' ? '0.00' : formatMoney(warrantyPeriod),
          warrantyDepositDueDate,
          warrantyDeposit: warrantyDeposit === null || '' ? '0.00' : formatMoney(warrantyDeposit),
          amountReceivable: amountReceivable === null || '' ? '0.00' : formatMoney(amountReceivable),
          amountReceived: amountReceived === null || '' ? '0.00' : formatMoney(amountReceived),
          notAmountReceived: notAmountReceived === null || '' ? '0.00' : formatMoney(notAmountReceived),
          totalInvoice: totalInvoice === null || '' ? '0.00' : formatMoney(totalInvoice),
          billAmountReceived: billAmountReceived === null || '' ? '0.00' : formatMoney(billAmountReceived),
          receivedNotBidAmount: receivedNotBidAmount === null || '' ? '0.00' : formatMoney(receivedNotBidAmount),
          warrantyMethod,
          settleInfo: info
        }
        this.changeTitle = '项目结清'
        if (parseFloat(settlementAmount) === parseFloat(amountReceived) && parseFloat(settlementAmount) === parseFloat(totalInvoice)) {
          this.settleRules.settleInfo[0].required = true
        } else {
          this.settleRules.settleInfo[0].required = false
        }
        this.$refs.dialog.show = true
      } else {
        if (this.detailInfo.settleState === '01') {
          this.$message.warning('项目未结清')
          return
        }
        const { id } = this.$route.query
        settleCancel(id).then(({ data }) => {
          this.$message.success('撤销结清成功')
          this.getDetails()
          this.$refs.dialog.show = false
          this.$nextTick(() => {
            this.$refs.information.getDeatails()
            this.$refs.information.getFinanceInvoiceType()
          })
        })
      }
    },
    submit() {
      if (this.changeTitle === '财务设置') {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            const params = {
              ...this.ruleForm,
              contractId: this.$route.query.id
            }
            params.additionalTaxArea = Array.isArray(params.additionalTaxArea) ? params.additionalTaxArea.join(',') : params.additionalTaxArea
            params.prepaymentArea = Array.isArray(params.prepaymentArea) ? params.prepaymentArea.join(',') : params.prepaymentArea
            setConfig(params).then(({ data }) => {
              this.$message.success('财务设置成功')
              this.getDetails()
              this.$refs.dialog.show = false
              this.$nextTick(() => {
                this.$refs.information.getDeatails()
                this.$refs.information.getFinanceInvoiceType()
              })
            })
          }
        })
      } else {
        this.$refs.settleForm.validate(valid => {
          if (valid) {
            this.$confirm('确认结清？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                const params = {
                  settleInfo: this.settleForm.settleInfo
                }
                settle(this.$route.query.id, params).then(({ data }) => {
                  this.$message.success('项目结清成功')
                  this.getDetails()
                  this.$refs.dialog.show = false
                  this.$nextTick(() => {
                    this.$refs.information.getDeatails()
                    this.$refs.information.getFinanceInvoiceType()
                  })
                })
              })
              .catch(() => {})
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.details-view {
  padding-bottom: 40px;
  .dialog-show-btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
