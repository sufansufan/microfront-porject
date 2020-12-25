<template>
  <div class="receipt-add">
    <el-form ref="form" v-loading="formLoading" :model="form" label-width="170px" :rules="formRules" class="rule-form-flex">
      <el-form-item label="收票日期" prop="receiptDate">
        <el-date-picker
          v-model="form.receiptDate"
          type="date"
          placeholder="请选择收票日期"
          clearable
        />
      </el-form-item>
      <el-form-item label="开票日期" prop="billingDate">
        <el-date-picker
          v-model="form.billingDate"
          type="date"
          placeholder="请选择开票日期"
          clearable
        />
      </el-form-item>
      <el-form-item label="发票编号" prop="invoiceNumber">
        <el-input v-model.trim="form.invoiceNumber" placeholder="请输入发票编号" clearable />
      </el-form-item>

      <el-form-item label="发票类型" prop="invoiceType">
        <jdy-select
          v-model="form.invoiceType"
          holder="发票类型"
          :select-data="constant.financeInvoiceType"
          :select-options="{value:'code',label:'name'}"
        />
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
      <el-form-item label="发票税率" prop="invoiceTaxRate">
        <amount-input
          v-model="form.invoiceTaxRate"
          placeholder="请输入发票税率"
          unit-name="%"
          @blur="amountBlur('invoiceTaxRate')"
        />
      </el-form-item>

      <el-form-item label="发票无税金额" prop="noTaxAmountOnInvoice">
        <amount-input
          v-model="form.noTaxAmountOnInvoice"
          placeholder="请输入发票无税金额"
          @blur="amountBlur('noTaxAmountOnInvoice')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>
      <el-form-item label="发票税金" prop="invoiceTax">
        <amount-input
          v-model="form.invoiceTax"
          placeholder="请输入发票税金"
          @blur="amountBlur('invoiceTax')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>
      <el-form-item label="发票归类" prop="invoiceClassification">
        <jdy-select
          v-model="form.invoiceClassification"
          holder="发票归类"
          :select-data="invoiceClassType"
          :select-options="{value:'classNumber',label:'name'}"
        />
      </el-form-item>

      <el-form-item label="是否认证" prop="certified">
        <jdy-select
          v-model="form.certified"
          holder="是否认证"
          :select-data="constant.commonYesNo"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>
      <el-form-item label="是否进项转存" prop="inputTransfer">
        <jdy-select
          v-model="form.inputTransfer"
          holder="是否进项转存"
          :select-data="constant.commonYesNo"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>
      <el-form-item label="发票代码">
        <el-input v-model.trim="form.invoiceCode" placeholder="请输入发票代码" />
      </el-form-item>

      <el-form-item label="销方纳税人识别号">
        <el-input v-model.trim="form.sellerTaxpayerNumber" placeholder="请输入销方纳税人识别号" />
      </el-form-item>
      <el-form-item label="是否有合同" prop="haveContract">
        <jdy-select
          v-model="form.haveContract"
          holder="是否有合同"
          :select-data="constant.commonYesNo"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>
      <el-form-item v-if="form.haveContract === '01'" label="合同名称" prop="contractName">
        <div class="search-input">
          <el-input v-model.trim="form.contractName" placeholder="请选择合同名称" />
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
      <el-form-item v-if="form.haveContract === '01'" label="开票单位">
        <el-input v-model.trim="form.signUnitName" disabled />
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
    <drag-dialog ref="dialog" title="选择合同" width="60%">
      <change-contract ref="changeContract" :detail-info="detailInfo" :payment-type="form.invoiceClassification" />
      <div class="dialog-show-btn">
        <el-button type="primary" @click="onCkick">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>
<script>
import upload from '@core/mixins/upload'
import ChangeContract from './ChangeContract'
import { formatMoney } from '@core/utils'
import { toDecimal } from '@core/utils/validate'
import { receiptAdd, receiptEdit, getReceiptDetail } from '@core/api/financialManage/projectfinancemanager'
import { mapGetters } from 'vuex'
import { financeclassList } from '@core/api/financialManage/financeclassmanager'
export default {
  name: 'ReceiptAdd',
  components: { ChangeContract },
  mixins: [upload],
  props: {
    compomentId: {
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
        receiptDate: '',
        billingDate: '',
        invoiceNumber: '',
        invoiceAmount: '',
        invoiceType: '',
        invoiceTaxRate: '',
        noTaxAmountOnInvoice: '',
        invoiceTax: '',
        invoiceClassification: '',
        certified: '',
        inputTransfer: '',
        invoiceCode: '',
        sellerTaxpayerNumber: '',
        haveContract: '',
        internalContractId: '',
        contractName: '',
        remark: ''
      },
      formRules: {
        receiptDate: [{ required: true, message: '请选择收票日期', trigger: 'change' }],
        billingDate: [{ required: true, message: '请选择开票日期', trigger: 'change' }],
        invoiceNumber: [{ required: true, message: '请输入发票编号', trigger: 'blur' }],
        invoiceType: [{ required: true, message: '请选择发票类型', trigger: 'change' }],
        invoiceAmount: [{ required: true, message: '请输入发票金额', trigger: 'blur' }],
        invoiceTaxRate: [{ required: true, message: '请输入发票税率', trigger: 'blur' }],
        noTaxAmountOnInvoice: [{ required: true, message: '请输入发票无税金额', trigger: 'blur' }],
        invoiceTax: [{ required: true, message: '请输入发票税金', trigger: 'blur' }],
        invoiceClassification: [{ required: true, message: '请选择发票归类', trigger: 'change' }],
        certified: [{ required: true, message: '请选择是否认证', trigger: 'change' }],
        inputTransfer: [{ required: true, message: '请选择是否进项转存', trigger: 'change' }],
        haveContract: [{ required: true, message: '请选择是否有合同', trigger: 'change' }],
        contractName: [{ required: true, message: '请选择合同名称', trigger: 'blur' }]
      },
      loading: false,
      formLoading: false,
      receiptId: '',
      total: 0,
      invoiceClassType: [],
      companyList: [],
      tableData: [],
      selectList: [
        {
          value: 'bankNumber',
          searchType: 'input',
          name: '合同编号'
        },
        {
          value: 'bankName',
          searchType: 'select',
          name: '合同名称',
          selectData: []
        }
      ],
      btnList: [
      ],
      columns: [
        {
          type: 'selection',
          single: true
        },
        {
          label: '序号',
          index: true
        },
        {
          label: '合同编号',
          prop: 'contractNumber',
          showTooltip: true
        },
        {
          label: '合同名称',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '合同类型',
          prop: 'subType',
          showTooltip: true
        },
        {
          label: '合同金额',
          prop: 'amount',
          showTooltip: true
        },
        {
          label: '结算金额',
          prop: 'settlementAmount',
          showTooltip: true
        },
        {
          label: '签订单位',
          prop: 'signUnitName',
          showTooltip: true
        },
        {
          label: '签订日期',
          prop: 'signDate',
          showTooltip: true
        }
      ]
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
          this.formLoading = true
          this.getDetails()
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['financeInvoiceType', 'commonYesNo'])
    this.getFinanceInvoiceType()
  },
  methods: {
    cancel() {
      this.$emit('changeComName', 'ReceiptAdd', 'cancel')
    },
    submit(type) {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            contractId: this.contractId,
            ...this.form
          }
          if (this.billingdeId) {
            receiptEdit(params, this.billingdeId).then(({ data }) => {
              this.$message.success('修改成功')
              if (type === 'add') {
                this.$refs.form.resetFields()
                this.form.remark = ''
                this.billingdeId = ''
              } else {
                this.cancel()
              }
            })
          } else {
            receiptAdd(params).then(({ data }) => {
              this.$message.success('新增成功')
              if (type === 'add') {
                this.$refs.form.resetFields()
                this.form.remark = ''
              } else {
                this.cancel()
              }
            })
          }
        }
      })
    },
    getDetails() {
      getReceiptDetail(this.compomentId).then(({ data }) => {
        const { receiptDate, billingDate, invoiceNumber, invoiceType, invoiceAmount, invoiceTaxRate, noTaxAmountOnInvoice, invoiceTax, invoiceClassification, certified, inputTransfer, invoiceCode, sellerTaxpayerNumber, haveContract, remark } = data
        this.form = {
          receiptDate,
          billingDate,
          invoiceNumber,
          invoiceType,
          invoiceAmount: formatMoney(invoiceAmount),
          invoiceTaxRate: formatMoney(invoiceTaxRate),
          noTaxAmountOnInvoice: formatMoney(noTaxAmountOnInvoice),
          invoiceTax: formatMoney(invoiceTax),
          invoiceClassification,
          certified,
          inputTransfer,
          invoiceCode,
          sellerTaxpayerNumber,
          haveContract,
          remark
        }
        this.formLoading = false
      })
    },
    amountBlur(key) {
      this.form[key] = toDecimal(this.form[key], 2)
    },
    selectAccount() {
      if (this.form.invoiceClassification === '') {
        this.$message.warning('请选择发票归类')
        return
      }
      this.$refs.dialog.show = true
      this.$nextTick(() => {
        this.$refs.changeContract.fetchData()
      })
    },
    // 获取发票归类
    getFinanceInvoiceType() {
      const params = {
        financeClassNumber: 'LB03',
        page: 0,
        size: 20
      }
      financeclassList(params).then(({ data }) => {
        this.invoiceClassType = data.content
      })
    },
    onCkick() {
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
    }
  }
}
</script>
<style lang="less" scoped>
.receipt-add {
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
}
</style>
