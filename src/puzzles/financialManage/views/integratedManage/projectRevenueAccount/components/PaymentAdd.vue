<template>
  <div class="payment-add">
    <el-form ref="form" v-loading="loading" :model="form" label-width="170px" :rules="formRules" class="rule-form-flex">
      <el-form-item label="付款日期" prop="paymentDate">
        <el-date-picker
          v-model="form.paymentDate"
          type="date"
          placeholder="请选择付款日期"
          clearable
        />
      </el-form-item>
      <el-form-item label="付款金额" prop="paymentMoney">
        <amount-input
          v-model="form.paymentMoney"
          placeholder="请输入付款金额"
          unit-name="元"
          @blur="amountBlur('paymentMoney')"
        />
      </el-form-item>
      <el-form-item label="是否保证金" prop="warranty">
        <jdy-select
          v-model="form.warranty"
          holder="是否保证金"
          :select-data="constant.commonYesNo"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>

      <el-form-item label="付款类型" prop="paymentType">
        <jdy-select
          v-model="form.paymentType"
          holder="付款类型"
          :select-data="paymentTypeList"
          :select-options="{value:'classNumber',label:'name'}"
        />
      </el-form-item>
      <el-form-item label="付款类别" prop="paymentClass">
        <jdy-select
          v-model="form.paymentClass"
          holder="付款类别"
          :select-data="constant.collectionCategory"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>
      <el-form-item label="是否有合同" prop="haveContract">
        <jdy-select
          v-model="form.haveContract"
          holder="是否有合同"
          :select-data="constant.commonYesNo"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>

      <el-form-item v-if="form.haveContract === '01'" label="合同名称">
        <div class="search-input">
          <el-input v-model.trim="form.contractName" disabled placeholder="请选择合同名称" />
          <el-button type="primary" icon="iconfont icon-search-copy" @click="selectAccount" />
        </div>
      </el-form-item>
      <el-form-item v-if="form.haveContract === '01'" label="合同编号">
        <el-input v-model.trim="form.contractNumber" disabled />
      </el-form-item>
      <el-form-item v-if="form.haveContract === '01'" label="合同金额">
        <amount-input
          v-model="form.amount"
          placeholder="请输入合同金额"
          disabled
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item v-if="form.haveContract === '01'" label="结算金额">
        <amount-input
          v-model="form.settlementAmount"
          placeholder="请输入合同金额"
          disabled
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>
      <el-form-item label="收款单位">
        <el-input v-model.trim="form.orgName" placeholder="请输入收款单位" />
      </el-form-item>
      <el-form-item label="收款人">
        <el-input v-model.trim="form.paypee" clearable :maxlength="50" placeholder="请输入收款人" />
      </el-form-item>

      <el-form-item label="支付方式" prop="paymentMethod">
        <jdy-select
          v-model="form.paymentMethod"
          holder="支付方式"
          :select-data="constant.PayType"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>
      <el-form-item label="付款账户类型">
        <jdy-select
          v-model="form.paymentAccountType"
          holder="付款账户类型"
          :select-data="constant.TransferType"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>
      <el-form-item label="付款账户" prop="name">
        <div class="search-input">
          <el-input v-model.trim="form.paymentAccountName" disabled placeholder="请选择付款账户" />
          <el-button type="primary" icon="iconfont icon-search-copy" @click="selectBankAccount" />
        </div>
      </el-form-item>

      <el-form-item v-if="form.paymentMethod === '02'" label="支票号" prop="chequeNumber">
        <el-input v-model.trim="form.chequeNumber" placeholder="请输入支票号" />
      </el-form-item>
      <el-form-item v-if="form.paymentMethod === '02'" label="支票银行名称" prop="chequeBankName">
        <el-input v-model.trim="form.chequeBankName" placeholder="请输入支票银行名称" />
      </el-form-item>

      <el-form-item label="对应发票" class="one-width">
        <el-transfer
          v-model="form.addBillingReceiveDtos"
          :titles="['未选发票', '已选发票']"
          :data="invoiceList"
          :button-texts="['移除', '选择']"
        />
      </el-form-item>

      <el-form-item label="附件" class="one-width">
        <jdy-upload type-code="invoicing" />
      </el-form-item>

      <el-form-item label="备注" class="one-width row-label">
        <el-input v-model.trim="form.remark" type="textarea" :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>
      <el-form-item label="付款人">
        <el-input v-model.trim="form.paypee" clearable :maxlength="50" />
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="submit">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
    <drag-dialog ref="dialog" :title="changeTitle" width="60%">
      <div v-if="changeTitle === '选择合同'">
        <change-contract ref="changeContract" :detail-info="detailInfo" :payment-type="form.paymentType" />
      </div>
      <div v-else>
        <change-bank-account ref="changeBankAccount" :account-type="form.paymentAccountType" />
      </div>
      <div class="dialog-show-btn">
        <el-button type="primary" @click="onCkick">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>
<script>
import upload from '@core/mixins/upload'
import ChangeContract from './ChangeContract'
import ChangeBankAccount from './ChangeBankAccount'
import { mapGetters } from 'vuex'
import { financeclassList } from '@core/api/financialManage/financeclassmanager'
import { paymentAdd, paymentEdit, getpaymentDetail } from '@core/api/financialManage/projectfinancemanager'
import { validateLength, toDecimal } from '@core/utils/validate'
import { codeChangeName } from '@core/utils'
export default {
  name: 'PaymentAdd',
  components: { ChangeContract, ChangeBankAccount },
  mixins: [upload],
  props: {
    compomentId: {
      type: String,
      default: ''
    },
    compomentType: {
      type: String,
      default: ''
    },
    detailInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      invoiceList: [],
      form: {
        paymentDate: '',
        paymentMoney: '',
        warranty: '02',
        paymentType: '',
        paymentClass: '',
        haveContract: '02',
        internalContractId: '',
        contractName: '',
        amount: '',
        settlementAmount: '',
        contractNumber: '',
        paypee: '',
        orgName: '',
        paymentMethod: '',
        paymentAccountType: '',
        paymentAccountId: '',
        paymentAccountName: '',
        addBillingReceiveDtos: '',
        remark: ''
      },
      formRules: {
        paymentDate: [{ required: true, message: '请选择付款日期', trigger: 'change' }],
        paymentMoney: [{ required: true, message: '请输入付款金额', trigger: 'blur' }],
        warranty: [{ required: true, message: '请选择是否保证金', trigger: 'change' }],
        paymentType: [{ required: true, message: '请选择付款类型', trigger: 'change' }],
        paymentClass: [{ required: true, message: '请选择付款类别', trigger: 'change' }],
        haveContract: [{ required: true, message: '请选择是否有合同', trigger: 'change' }],
        contractName: [{ required: true, message: '请选择合同名称', trigger: 'change' }],
        orgName: [{ required: true, message: '请输入收款单位', trigger: 'blur' }, validateLength(0, 50)],
        paypee: [{ required: true, message: '请输入收款人', trigger: 'blur' }, validateLength(0, 50)],
        paymentMethod: [{ required: true, message: '请选择支付方式', trigger: 'change' }],
        chequeNumber: [{ required: true, message: '请输入支票号', trigger: 'blur' }, validateLength(0, 20)],
        chequeBankName: [{ required: true, message: '请输入支票银行名称', trigger: 'blur' }, validateLength(0, 50)],
        remark: [validateLength(0, 255)],
        summary: [validateLength(0, 255)]
      },
      paymentId: '',
      paymentTypeList: [],
      paymentType: '',
      changeTitle: '选择合同'
    }
  },
  computed: {
    ...mapGetters(['constant']),
    // 合同ID
    contractId() {
      return this.$route.query.id
    }
  },
  watch: {
    compomentId: {
      handler(val) {
        if (val) {
          this.loading = true
          this.getDetails()
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['financeInvoiceType', 'PayType', 'TransferType', 'collectionCategory', 'ContractAttribution', 'commonYesNo'])
    this.getFinanceInvoiceType()
  },
  methods: {
    cancel() {
      this.$emit('changeComName', 'PaymentAdd', 'cancel')
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            contractId: this.contractId,
            ...this.form
          }
          if (this.paymentId) {
            paymentEdit(params, this.paymentId).then(({ data }) => {
              this.$message.success('修改成功')
              this.cancel()
              this.$refs.form.resetFields()
            })
          } else {
            paymentAdd(params).then(({ data }) => {
              this.$message.success('新增成功')
              this.cancel()
              this.$refs.form.resetFields()
            })
          }
        }
      })
    },
    getDetails() {
      getpaymentDetail(this.compomentId).then(({ data }) => {
        const {
          id, paymentDate, paymentMoney, warranty, paymentType, paymentClass, haveContract, internalContractId, contractName, amount, settlementAmount, contractNumber, paypee, orgName, paymentMethod, paymentAccountType, paymentAccountId, paymentAccountName, addBillingReceiveDtos, remark
        } = data
        this.paymentId = id
        this.form = {
          paymentDate, paymentMoney, warranty, paymentType, paymentClass, haveContract, internalContractId, contractName, amount, settlementAmount, contractNumber, paypee, orgName, paymentMethod, paymentAccountType, paymentAccountId, paymentAccountName, addBillingReceiveDtos, remark
        }
        this.loading = false
      })
    },
    amountBlur(key) {
      this.form[key] = toDecimal(this.form[key], 2)
    },
    selectAccount() {
      if (this.form.paymentType === '') {
        this.$message.warning('请选择付款类型')
        return
      }
      this.changeTitle = '选择合同'
      this.$refs.dialog.show = true
      this.$nextTick(() => {
        this.$refs.changeContract.fetchData()
      })
    },
    selectBankAccount() {
      if (this.form.paymentAccountType === '') {
        this.$message.warning('请选择付款类型')
        return
      }
      this.changeTitle = '选择' + codeChangeName(this.constant.TransferType, this.form.paymentAccountType)
      this.$refs.dialog.show = true
      this.$nextTick(() => {
        this.$refs.changeBankAccount.fetchData()
      })
    },
    // 获取付款类型
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
    onCkick() {
      if (this.changeTitle === '选择合同') {
        const { onlyOneData } = this.$refs.changeContract.$refs.commTable
        if (!onlyOneData()) return
        const { name, id, contractNumber, amount, settlementAmount, signUnitName } = this.$refs.changeContract.$refs.commTable.multipleSelection[0]
        this.form.internalContractId = id
        this.form.contractName = name
        this.form.contractNumber = contractNumber
        this.form.amount = amount
        this.form.settlementAmount = settlementAmount
        this.form.signUnitName = signUnitName
        this.$refs.dialog.show = false
      } else {
        const { onlyOneData } = this.$refs.changeBankAccount.$refs.commTable
        if (!onlyOneData()) return
        if (this.form.paymentAccountType === '01') {
          const { bankNumber, id } = this.$refs.changeBankAccount.$refs.commTable.multipleSelection[0]
          this.form.paymentAccountName = bankNumber
          this.form.paymentAccountId = id
        } else {
          const { name, id } = this.$refs.changeBankAccount.$refs.commTable.multipleSelection[0]
          this.form.paymentAccountName = name
          this.form.paymentAccountId = id
        }
        this.$refs.dialog.show = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.payment-add {
  padding: 10px 0;
   .btn {
     width: 100%;
     display: flex;
     justify-content: center;
     margin-top: 10px;
   }
   .search-input {
      display: flex;
      justify-content: space-between;
    }
    .dialog-show-btn {
      display: flex;
      justify-content: flex-end;
    }
}
</style>
