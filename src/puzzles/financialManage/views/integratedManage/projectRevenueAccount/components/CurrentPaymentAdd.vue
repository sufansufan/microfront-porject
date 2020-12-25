<template>
  <div class="current-payment-add">
    <el-form ref="form" v-loading="loading" :model="form" label-width="170px" :rules="formRules" class="rule-form-flex">
      <el-form-item label="发生日期" prop="dateOfOccurrence">
        <el-date-picker
          v-model="form.dateOfOccurrence"
          type="date"
          placeholder="请选择发生日期"
          clearable
        />
      </el-form-item>
      <el-form-item label="款项类型" prop="paymentType">
        <jdy-select
          v-model="form.paymentType	"
          holder="款项类型"
          :select-data="constant.financePaymentType"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>
      <el-form-item label="往来款对象" prop="currentPaymentObject">
        <el-input v-model.trim="form.currentPaymentObject" placeholder="请输入往来款对象" clearable />
      </el-form-item>

      <el-form-item label="金额" prop="amount">
        <amount-input
          v-model="form.amount"
          placeholder="请输入金额"
          unit-name="元"
          @blur="amountBlur('amount')"
        />
      </el-form-item>
      <el-form-item label="预计归还日期">
        <el-date-picker
          v-model="form.estimatedDate"
          type="date"
          placeholder="请选择预计归还日期"
          clearable
        />
      </el-form-item>
      <el-form-item label="计息方式">
        <el-input v-model.trim="form.interestBearingMethod" clearable placeholder="请输入计息方式" />
      </el-form-item>

      <el-form-item label="利息总额">
        <amount-input
          v-model="form.interestTotal"
          placeholder="请输入利息总额"
          unit-name="元"
          @blur="amountBlur('interestTotal')"
        />
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model.trim="form.chargePersonName" placeholder="请输入负责人" clearable />
      </el-form-item>
      <el-form-item label="支付方式" prop="paymentMethod">
        <jdy-select
          v-model="form.paymentMethod"
          holder="支付方式"
          :select-data="constant.PayType"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>

      <el-form-item v-if="form.paymentMethod === '02'" label="支票号" prop="chequeNumber">
        <el-input v-model.trim="form.chequeNumber" placeholder="请输入支票号" />
      </el-form-item>
      <el-form-item v-if="form.paymentMethod === '02'" label="支票银行名称" prop="chequeBankName">
        <el-input v-model.trim="form.chequeBankName" placeholder="请输入支票银行名称" />
      </el-form-item>

      <el-form-item label="附件" class="one-width">
        <jdy-upload type-code="invoicing" />
      </el-form-item>

      <el-form-item label="备注" class="one-width row-label">
        <el-input v-model.trim="form.remark" type="textarea" :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>

    </el-form>
    <div class="btn">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button type="primary" @click="submit('add')">提交并新增</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import upload from '@core/mixins/upload'
import { contactAdd, contactEdit, getcontactDetail } from '@core/api/financialManage/projectfinancemanager'
import { validateLength, toDecimal } from '@core/utils/validate'
import { formatMoney } from '@core/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'CurrentPaymentAdd',
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
      form: {
        dateOfOccurrence: '',
        paymentType: '',
        currentPaymentObject: '',
        amount: '',
        estimatedDate: '',
        interestBearingMethod: '',
        interestTotal: '',
        paymentMethod: '',
        chequeNumber: '',
        chequeBankName: '',
        remark: ''
      },
      formRules: {
        dateOfOccurrence: [{ required: true, message: '请选择发生日期', trigger: 'change' }],
        paymentType: [{ required: true, message: '请选择款项类型', trigger: 'change' }],
        currentPaymentObject: [{ required: true, message: '请输入往来款对象', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        paymentMethod: [{ required: true, message: '请选择支付方式', trigger: 'change' }],
        chequeNumber: [{ required: true, message: '请输入支票号', trigger: 'blur' }, validateLength(0, 20)],
        chequeBankName: [{ required: true, message: '请输入支票银行名称', trigger: 'blur' }, validateLength(0, 50)]
      },
      contacttId: ''
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
    this.$store.dispatch('getConstant', ['PayType', 'commonYesNo', 'financePaymentType'])
  },
  methods: {
    cancel() {
      this.$emit('changeComName', 'CurrentPaymentDetails', 'cancel')
    },
    amountBlur(key) {
      this.form[key] = toDecimal(this.form[key], 2)
    },
    submit(type) {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            contractId: this.contractId,
            ...this.form
          }
          if (this.contacttId) {
            contactEdit(params, this.contacttId).then(({ data }) => {
              this.$message.success('修改成功')
              if (type === 'add') {
                this.$refs.form.resetFields()
                this.form.remark = ''
                this.contacttId = ''
              } else {
                this.cancel()
              }
            })
          } else {
            contactAdd(params).then(({ data }) => {
              this.$message.success('新增成功')
              if (type === 'add') {
                this.$refs.form.resetFields()
                this.form.remark = ''
                this.contacttId = ''
              } else {
                this.cancel()
              }
            })
          }
        }
      })
    },
    getDetails() {
      getcontactDetail(this.compomentId).then(({ data }) => {
        const {
          dateOfOccurrence, paymentType, currentPaymentObject, amount, estimatedDate, interestBearingMethod, interestTotal, paymentMethod, chequeNumber, chequeBankName, remark, id
        } = data
        this.contacttId = id
        this.form = {
          dateOfOccurrence,
          paymentType,
          currentPaymentObject,
          amount: formatMoney(amount),
          estimatedDate,
          interestBearingMethod,
          interestTotal: formatMoney(interestTotal),
          paymentMethod,
          chequeNumber,
          chequeBankName,
          remark
        }
        this.loading = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.current-payment-add {
  padding: 10px 0;
   .btn {
     width: 100%;
     display: flex;
     justify-content: center;
     margin-top: 10px;
   }
}
</style>
