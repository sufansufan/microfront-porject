<template>
  <div class="warranty-add">
    <el-form ref="form" v-loading="loading" :model="form" label-width="170px" :rules="formRules" class="rule-form-flex">
      <el-form-item label="操作日期" prop="operationDate">
        <el-date-picker
          v-model="form.operationDate"
          type="date"
          placeholder="请选择操作日期"
          clearable
        />
      </el-form-item>
      <el-form-item label="操作类型" prop="operationType">
        <jdy-select
          v-model="form.operationType	"
          holder="款项类型"
          :select-data="constant.operateType"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <amount-input
          v-model="form.amount"
          placeholder="请输入金额"
          unit-name="元"
          @blur="amountBlur('amount')"
        />
      </el-form-item>

      <el-form-item label="负责人" prop="chargePersonId">
        <jdy-select
          v-model="form.chargePersonId"
          holder="负责人"
          :select-data="payeeList"
          :select-options="{value:'id',label:'name'}"
        />
      </el-form-item>
      <el-form-item label="支付方式" prop="operatingMethod">
        <jdy-select
          v-model="form.operatingMethod	"
          holder="支付方式"
          :select-data="constant.PayType"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>
      <el-form-item label="操作账户类型">
        <jdy-select
          v-model="form.operatingAccountType	"
          holder="款项类型"
          :select-data="constant.TransferType"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>

      <el-form-item label="操作账户">
        <div class="search-input">
          <el-input v-model.trim="form.paymentAccountName" disabled placeholder="请选择付款账户" />
          <el-button type="primary" icon="iconfont icon-search-copy" @click="selectBankAccount" />
        </div>
      </el-form-item>
      <el-form-item v-if="form.operatingMethod === '02'" label="支票号" prop="chequeNumber">
        <el-input v-model.trim="form.chequeNumber" placeholder="请输入支票号" />
      </el-form-item>
      <el-form-item v-if="form.operatingMethod === '02'" label="支票银行名称" prop="chequeBankName">
        <el-input v-model.trim="form.chequeBankName" placeholder="请输入支票银行名称" />
      </el-form-item>

      <el-form-item label="备注" class="one-width row-label">
        <el-input v-model.trim="form.remark" type="textarea" :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>

    </el-form>
    <div class="btn">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
    <drag-dialog ref="dialog" :title="changeTitle" width="60%">
      <change-bank-account ref="changeBankAccount" :account-type="form.operatingAccountType" />
      <div class="dialog-show-btn">
        <el-button type="primary" @click="onCkick">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>
<script>
import upload from '@core/mixins/upload'
import ChangeBankAccount from './ChangeBankAccount'
import { mapGetters } from 'vuex'
import { codeChangeName, formatMoney } from '@core/utils'
import { getPersonnelsByOrgId } from '@core/api/personnel'
import { getSessionStorage } from '@core/utils/auth'
import { toDecimal, validateLength } from '@core/utils/validate'
import { warrantyDepositAdd, warrantyDepositEdit, getwarrantydeposit } from '@core/api/financialManage/projectfinancemanager'
export default {
  name: 'WarrantyAdd',
  components: { ChangeBankAccount },
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
        operationDate: '',
        operationType: '',
        amount: '',
        chargePersonId: '',
        operatingMethod: '',
        operatingAccountType: '',
        paymentAccountName: '',
        chequeNumber: '',
        chequeBankName: '',
        remark: ''
      },
      formRules: {
        operationDate: [{ required: true, message: '请选择操作日期', trigger: 'change' }],
        operationType: [{ required: true, message: '请选择操作类型', trigger: 'change' }],
        amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        chargePersonId: [{ required: true, message: '请选择负责人', trigger: 'change' }],
        operatingMethod: [{ required: true, message: '请选择支付方式', trigger: 'change' }],
        chequeNumber: [{ required: true, message: '请输入支票号', trigger: 'blur' }, validateLength(0, 20)],
        chequeBankName: [{ required: true, message: '请输入支票银行名称', trigger: 'blur' }, validateLength(0, 50)]
      },
      payeeList: [],
      loading: false,
      changeTitle: ''
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
    this.$store.dispatch('getConstant', ['PayType', 'TransferType', 'operateType'])
    this.getReceivePayPerson()
  },
  methods: {
    cancel() {
      this.$emit('changeComName', 'Warranty', 'cancel')
    },
    amountBlur(key) {
      this.form[key] = toDecimal(this.form[key], 2)
    },
    // 获取负责人
    getReceivePayPerson() {
      getPersonnelsByOrgId(getSessionStorage('orgId')).then(({ data }) => {
        this.payeeList = data
      })
    },
    selectBankAccount() {
      if (this.form.operatingAccountType === '') {
        this.$message.warning('请选择付款类型')
        return
      }
      this.changeTitle = '选择' + codeChangeName(this.constant.TransferType, this.form.operatingAccountType)
      this.$refs.dialog.show = true
      this.$nextTick(() => {
        this.$refs.changeBankAccount.fetchData()
      })
    },
    onCkick() {
      const { onlyOneData } = this.$refs.changeBankAccount.$refs.commTable
      if (!onlyOneData()) return
      if (this.form.operatingAccountType === '01') {
        const { bankNumber, id } = this.$refs.changeBankAccount.$refs.commTable.multipleSelection[0]
        this.form.paymentAccountName = bankNumber
        this.form.paymentAccountId = id
      } else {
        const { name, id } = this.$refs.changeBankAccount.$refs.commTable.multipleSelection[0]
        this.form.paymentAccountName = name
        this.form.paymentAccountId = id
      }
      this.$refs.dialog.show = false
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            contractId: this.contractId,
            ...this.form
          }
          if (this.paymentId) {
            warrantyDepositEdit(params, this.paymentId).then(({ data }) => {
              this.$message.success('修改成功')
              this.cancel()
              this.$refs.form.resetFields()
            })
          } else {
            warrantyDepositAdd(params).then(({ data }) => {
              this.$message.success('新增成功')
              this.cancel()
              this.$refs.form.resetFields()
            })
          }
        }
      })
    },
    getDetails() {
      getwarrantydeposit(this.compomentId).then(({ data }) => {
        const {
          operationDate,
          operationType,
          amount,
          chargePersonId,
          operatingMethod,
          operatingAccountType,
          paymentAccountName,
          chequeNumber,
          chequeBankName,
          remark,
          id
        } = data
        this.paymentId = id
        this.form = {
          operationDate,
          operationType,
          amount: formatMoney(amount),
          chargePersonId,
          operatingMethod,
          operatingAccountType,
          paymentAccountName,
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
.warranty-add {
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
