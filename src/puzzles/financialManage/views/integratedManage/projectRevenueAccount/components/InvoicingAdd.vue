<template>
  <div class="invoicing-add">
    <el-form ref="form" v-loading="loading" :model="form" label-width="120px" :rules="formRules" class="rule-form-flex">
      <el-form-item label="开票日期" prop="billingDate">
        <el-date-picker
          v-model="form.billingDate"
          type="date"
          placeholder="请选择开票日期"
          clearable
        />
      </el-form-item>
      <el-form-item label="发票类型" prop="invoiceType">
        <jdy-select
          v-model="form.invoiceType"
          holder="发票类型"
          :select-data="constant.financeInvoiceType"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>
      <el-form-item label="发票编号" prop="invoiceNumber">
        <el-input v-model.trim="form.invoiceNumber" clearable placeholder="请输入发票编号" :maxlength="20" />
      </el-form-item>

      <el-form-item label="发票金额" prop="invoiceAmount">
        <amount-input
          v-model="form.invoiceAmount"
          placeholder="请输入发票金额"
          @blur="amountBlur('invoiceAmount')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>
      <el-form-item label="开票税率" prop="invoicingTaxRate">
        <amount-input
          v-model="form.invoicingTaxRate"
          placeholder="请输入开票税率"
          unit-name="%"
          @blur="amountBlur('invoicingTaxRate')"
        />
      </el-form-item>
      <el-form-item label="发票无税金额" prop="noTaxAmount">
        <amount-input
          v-model="form.noTaxAmount"
          placeholder="请输入发票无税金额"
          @blur="amountBlur('noTaxAmount')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>
      <el-form-item label="发票税金" prop="invoiceTax">
        <amount-input
          v-model="form.invoiceTax"
          placeholder="请输入发票税金"
          disabled
          @blur="amountBlur('invoiceTax')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="附件" class="one-width">
        <jdy-upload type-code="invoicing" :business-data-id="uploadData.businessDataId" />
      </el-form-item>

      <el-form-item label="备注" class="one-width row-label">
        <el-input v-model.trim="form.remark" type="textarea" :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>

    </el-form>
    <div class="btn">
      <el-button type="primary" @click="submit('submit')">提交</el-button>
      <el-button type="primary" @click="submit('add')">提交并新增</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import upload from '@core/mixins/upload'
import { mapGetters } from 'vuex'
import { formatMoney, getUuid } from '@core/utils'
import { validateLength, toDecimal, validatePriceZero } from '@core/utils/validate'
import { billingdetailVal, billingdetailAdd, billingDetails, billingdetailEdit, getConfig } from '@core/api/financialManage/projectfinancemanager'
export default {
  name: 'InvoicingAdd',
  mixins: [upload],
  props: {
    compomentId: {
      type: String,
      default: ''
    }
  },
  data() {
    const validateNumber = (rule, value, callback) => {
      const params = {
        id: this.billingdeId,
        propNameList: ['invoiceNumber'],
        propValueList: [this.form.invoiceNumber]
      }
      billingdetailVal(params).then(res => {
        if (res && res.data === true) {
          callback()
        } else if (res && res.data === false) {
          callback('发票编号已存在，请重新输入')
        }
      })
    }
    const validateTaxRate = (rule, value, callback) => {
      const reg = /^(100)$|^((\d|[1-9]\d)(\.\d{1,2})?)$/
      if (reg.test(value)) {
        callback()
      } else {
        callback('请输入0-100正数')
      }
    }
    const validateAmount = (rule, value, callback) => {
      if (!validatePriceZero(rule, value, callback)) {
        callback(new Error('只能输入大于等于0的金额'))
      } else {
        callback()
      }
    }
    const validateNoTaxAmount = (rule, value, callback) => {
      if (this.form.invoiceAmount === '') {
        callback('请输入发票金额')
      } else {
        if (Number(value) < 0 || Number(value) > Number(this.form.invoiceAmount)) {
          callback('请输入0-' + this.form.invoiceAmount + '金额')
        } else {
          callback()
        }
      }
    }
    return {
      form: {
        billingDate: Date.now(),
        invoiceType: '',
        invoiceNumber: '',
        invoiceAmount: '',
        invoicingTaxRate: '',
        noTaxAmount: '',
        invoiceTax: '',
        remark: ''
      },
      formRules: {
        billingDate: [{ required: true, message: '请选择开票日期', trigger: 'change' }],
        invoiceType: [{ required: true, message: '请选择发票类型', trigger: 'change' }],
        invoiceNumber: [{ required: true, message: '请输入发票编号', trigger: 'blur' }, validateLength(0, 20),
          { required: true, validator: validateNumber, trigger: 'blur' }],
        invoiceAmount: [{ required: true, message: '请输入发票金额', trigger: 'blur' },
          { required: true, validator: validateAmount, trigger: 'blur' }],
        invoicingTaxRate: [{ required: true, message: '请输入开票税率', trigger: 'blur' }, validateLength(0, 20),
          { required: true, validator: validateTaxRate, trigger: 'blur' }],
        noTaxAmount: [{ required: true, message: '请输入发票无税金额', trigger: 'blur' },
          { required: true, validator: validateAmount, trigger: 'blur' },
          { required: true, validator: validateNoTaxAmount, trigger: 'blur' }],
        invoiceTax: [{ required: true, message: '请输入发票税金', trigger: 'blur' }, validateLength(0, 20)],
        remark: [validateLength(0, 255)]
      },
      billingdeId: '',
      loading: false,
      financeSet: {}

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
    this.$store.dispatch('getConstant', ['financeInvoiceType'])
    this.getFinanceSet()
  },
  methods: {
    cancel() {
      this.$emit('changeComName', 'InvoicingAdd', 'cancel')
    },
    submit(type) {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            Loading: true,
            contractId: this.contractId,
            haveAttachment: this.fileList.length !== 0,
            ...this.form
          }
          if (this.billingdeId) {
            billingdetailEdit(params, this.billingdeId).then(({ data }) => {
              this.$message.success('修改成功')
              if (type === 'add') {
                this.$refs.form.resetFields()
                this.form.remark = ''
                this.billingdeId = ''
                this.getFinanceSet()
                this.uploadData.businessDataId = getUuid()
              } else {
                this.cancel()
              }
            })
          } else {
            params.id = this.uploadData.businessDataId
            billingdetailAdd(params).then(({ data }) => {
              this.$message.success('新增成功')
              if (type === 'add') {
                this.$refs.form.resetFields()
                this.form.remark = ''
                this.getFinanceSet()
                this.uploadData.businessDataId = getUuid()
              } else {
                this.cancel()
              }
            })
          }
        }
      })
    },
    getDetails() {
      billingDetails(this.compomentId).then(({ data }) => {
        const { billingDate, invoiceAmount, invoiceNumber, invoiceTax, invoiceType, invoicingTaxRate, noTaxAmount, remark, id } = data
        this.billingdeId = id
        this.form = {
          billingDate,
          invoiceAmount: formatMoney(invoiceAmount),
          invoiceNumber,
          invoiceTax: formatMoney(invoiceTax),
          invoiceType,
          invoicingTaxRate: formatMoney(invoicingTaxRate),
          noTaxAmount: formatMoney(noTaxAmount),
          remark
        }
        this.getFileLoad(id, 'invoicing').then(data => {
          this.fileList = data
          this.fileList.map(item => {
            item.name = item.fileName
            item.url = item.fileUrl
            return item
          })
        })
        this.loading = false
      })
    },
    amountBlur(key) {
      this.form[key] = toDecimal(this.form[key], 2)
      if (key === 'invoiceAmount' || key === 'invoicingTaxRate') {
        this.computeDefault()
      }
    },
    getFinanceSet() {
      getConfig(this.$route.query.id).then(({ data }) => {
        this.financeSet = { ...data }
        const { invoicingRaxRate } = this.financeSet
        this.form.invoicingTaxRate = invoicingRaxRate === null || '' ? '0.00' : toDecimal(invoicingRaxRate, 2)
        this.computeDefault()
      })
    },
    // 计算开票无税金额默认值
    computeDefault() {
      const computeValue = (this.form.invoiceAmount ? parseFloat(this.form.invoiceAmount) : 0) / (1 + (this.form.invoicingTaxRate ? parseFloat(this.form.invoicingTaxRate) : 0))
      this.form.noTaxAmount = computeValue === 0 ? '0.00' : toDecimal(computeValue, 2)
      const invoiceTaxValue = (this.form.invoiceAmount ? parseFloat(this.form.invoiceAmount) : 0) - parseFloat(this.form.noTaxAmount)
      this.form.invoiceTax = invoiceTaxValue === 0 ? '0.00' : toDecimal(invoiceTaxValue, 2)
    },
    // 去除金额里面的,号
    eemoveComma() {

    }
  }
}
</script>
<style lang="less" scoped>
.invoicing-add {
  padding-top: 10px;
   .btn {
     width: 100%;
     display: flex;
     justify-content: center;
     margin-top: 10px;
   }
}
</style>
