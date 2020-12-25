<template>
  <div class="bank-transfer">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="rule-form-flex">
      <el-form-item label="转出银行(开户行名称)" prop="bankName" class="one-half">
        <el-input v-model.trim="ruleForm.bankName" clearable disabled placeholder="请输入转出银行(开户行名称)" />
      </el-form-item>

      <el-form-item label="转出银行账号" prop="bankNumber" class="one-half">
        <el-input v-model.trim="ruleForm.bankNumber" clearable disabled placeholder="请输入转出银行账号" />
      </el-form-item>

      <el-form-item label="开户行地址" class="one-half">
        <el-input v-model.trim="ruleForm.bankAddress" disabled />
      </el-form-item>

      <el-form-item label="归属单位" class="one-half">
        <div class="external-list">
          <el-select
            v-model="ruleForm.attribution"
            placeholder=""
            style="width: 30%"
            disabled
          >
            <el-option
              v-for="item in ContractAttributionList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
              disabled
            />
          </el-select>
          <el-select
            v-model="ruleForm.company"
            disabled
            style="width: 70%"
          >
            <el-option
              v-for="item in companyList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
      </el-form-item>

      <el-form-item label="当前余额" class="one-half">
        <el-input
          v-model.trim="ruleForm.accounBalance"
          disabled
        />
      </el-form-item>

      <el-form-item label="转出金额" prop="outBalance" class="one-half">
        <amount-input
          v-model.trim="ruleForm.outBalance"
          @blur="formatValue('outBalance')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="转账日期" required prop="outDate" class="one-half">
        <el-date-picker v-model="ruleForm.outDate" type="date" placeholder="请选择转账日期" style="width: 100%;" clearable />
      </el-form-item>

      <el-form-item label="账户类型" prop="type" class="one-half">
        <jdy-select
          v-model="ruleForm.type"
          :holder="getPlaceHolder('账户类型',1)"
          :select-data="constant.TransferType"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>

      <el-form-item label="转入账户" prop="inAccountName" class="one-half">
        <div class="search-input">
          <el-input v-model.trim="ruleForm.inAccountName" clearable placeholder="请选择转入账户" style="width:90%" disabled />
          <el-button icon="iconfont icon-search-copy" type="primary" :disabled="!ruleForm.type" @click="onShowList" />
        </div>
      </el-form-item>

      <el-form-item label="转账说明" prop="remark" class="one-width">
        <el-input v-model.trim="ruleForm.remark" type="textarea" maxlength="255" clearable placeholder="请输入备注" />
      </el-form-item>

      <el-form-item label="录入人" prop="recorder" class="one-half">
        <el-input v-model.trim="ruleForm.recorder" clearable :placeholder="getPlaceHolder('录入人')" disabled />
      </el-form-item>

      <el-form-item class="one-width btn-box">
        <el-button type="primary" @click="submitForm('ruleForm')">确认转账</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
    <div class="dialog">
      <drag-dialog ref="dialog" title="选择转入银行账户" width="60%">
        <bank-transfer-list v-if="ruleForm.type==='01'" @onDialogShow="onDialogShow" />
        <cash-transfer-list v-else @onDialogShow="onDialogShow" />
      </drag-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSessionStorage } from '@core/utils/auth'
import BankTransferList from './components/BankTransferList'
import CashTransferList from './components/CashTransferList'
import { validateLength, toDecimal } from '@core/utils/validate'
import { getDetailBankaccount, transfer } from '@core/api/financialManage/capitalaccountmanager'

export default {
  name: 'BankTransfer',
  components: { BankTransferList, CashTransferList },
  data() {
    const validateMax = (rule, value, callback) => {
      console.log(value)
      if (value > this.ruleForm.accounBalance) {
        callback(new Error('金额超出'))
      } else
      if (value < 0) {
        callback(new Error('金额不能小于0'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        bankName: '',
        bankNumber: '',
        accounBalance: '',
        bankAddress: '',
        type: '',
        outBalance: '',
        outDate: '',
        inAccountId: '',
        inAccountName: '',
        attribution: '', // 账户归属
        company: '', // 归属单位
        recorder: '',
        remark: ''
      },
      rules: {
        outBalance: [
          { required: true, message: '请输入转出金额', trigger: 'blur' },
          { validator: validateMax, trigger: 'blur' }
        ],
        outDate: [
          { required: true, message: '请选择转账日期', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择账户类型', trigger: 'change' }
        ],
        inAccountName: [
          { required: true, message: '请选择转入账户', trigger: 'change' }
        ],
        remark: [validateLength(0, 255)]
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.ruleForm.recorder = getSessionStorage('userName')
    this.$store.dispatch('getConstant', [
      'TransferType'
    ]).then(() => { })
    if (this.$route.query.id) {
      this.detailBankaccount(this.$route.query.id)
    }
  },
  mounted() {
    this.getdatatime()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(
            '确认转账后系统无法撤销，您确定要完成转账吗？',
            '提示',
            {
              type: 'warning',
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            })
            .then(_ => {
              const data = {
                inAccountId: this.ruleForm.inAccountId,
                outBalance: this.ruleForm.outBalance,
                outDate: this.ruleForm.outDate,
                remark: this.ruleForm.remark
              }
              transfer(this.$route.query.id, this.ruleForm.type, data).then(({ data }) => {
                this.$router.go(-1)
              })
            }).catch(_ => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    detailBankaccount(id) {
      getDetailBankaccount(id).then(({ data }) => {
        this.ruleForm.bankName = data.bankName
        this.ruleForm.bankNumber = data.bankNumber
        this.ruleForm.bankAddress = data.bankAddress
        this.ruleForm.company = data.organizationName
        this.ruleForm.accounBalance = data.accounBalance
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onShowList() {
      this.$refs.dialog.show = true
    },
    onDialogShow(id, bankName) {
      this.ruleForm.inAccountName = bankName
      this.ruleForm.inAccountId = id
      this.$refs.dialog.show = false
    },
    getPlaceHolder(title, type = 0) {
      const typeMap = ['请输入', '请选择']
      return `${typeMap[type]}${title}`
    },
    getdatatime() { // 默认显示今天
      this.ruleForm.outDate = new Date()
    },
    formatValue(key) {
      if (this.ruleForm[key]) {
        this.ruleForm[key] = toDecimal(this.ruleForm[key], 2)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.bank-transfer {
  height: calc(100vh - 130px);
  overflow-y: auto;
  padding: 10px;
  .external-list {
    display: flex;
  }
  .btn-box {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-input {
    display: flex;
    justify-content: space-between;
  }
}
</style>
