
import { toDecimal, validatePhone, validateRulePrice, validateLandline, validatePriceZero, validatePeriod } from '@core/utils/validate'
import { getSessionStorage } from '@core/utils/auth'

export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      required: true
    },
    breezeInfo: Object,
    processOtions: {
      default: () => {
        return {
          btnStatus: true
        }
      },
      type: Object
    },
    processTypeStatus: {
      default: 'start',
      type: String
    }
  },
  data() {
    return {
      processLabel: ''

    }
  },
  computed: {
    // 是否是流程修改
    isContractRevise() {
      const { processType } = this.$route.query
      if (!processType) {
        return false
      } else {
        if (processType === 'P_ContractRevise') {
          return true
        } else {
          return false
        }
      }
    },
    // 是否是流程录入
    isContractEntry() {
      const { processType } = this.$route.query
      if (!processType) {
        return false
      } else {
        if (processType === 'P_ContractEntry') {
          return true
        } else {
          return false
        }
      }
    },
    // 是否是结算流程以及结算书
    isSettlementBookList() {
      const { processType } = this.$route.query
      if (!processType) {
        return false
      } else {
        return processType === 'P_ContractSettlement'
      }
    },
    isAdd() {
      return this.options?.type === 'add'
    },
    isEdit() {
      return this.options?.type === 'edit'
    },
    isDetail() {
      return this.options?.type === 'details'
    },
    isDetailVersion() {
      return this.options?.type === 'detailVersion'
    },
    contractId() {
      return this.$route.query.id
    },
    currentId() {
      return this.options?.row?.id
    },
    currentVersion() {
      return this.options?.row?.revisionNumber
    },
    disabledFillingDate() {
      if (!this.ruleForm?.state) return true
      else {
        // this.ruleForm.filingDate = ''
        this.handlerChange({ type: 'date', formName: 'filingDate', value: '', name: '归档日期' })
        return ['01', '03'].includes(this.ruleForm.state)
      }
    },
    contractName() {
      return this.options?.row?.name
    },
    secondLevelContractId() {
      return this.breezeInfo?.row?.id
    },
    secondLevelBelongOrgId() {
      return this.breezeInfo?.row?.belongOrgId
    },
    processId() {
      if (this.isNew || this.isAdd) {
        return this.ruleForm.startOrgId
      } else {
        return this.ruleForm.approvalProcessId
      }
    }
    // 经办组织
    // handlingOrgId() {
    //   const { handlingOrgId } = this.ruleForm
    //   if (handlingOrgId === '') return
    //   else {
    //     var arr = handlingOrgId
    //     var index = arr.indexOf('SubCompany', 'ProjectDepartment')
    //     if (index > -1) {
    //       console.log(arr.splice(index, 1), '99999')
    //       return arr.splice(index, 1).toString()
    //     } else {
    //       return handlingOrgId.toString()
    //     }
    //   }
    // }
  },
  watch: {
    'ruleForm.state'() {
      if (this.ruleForm.state === '01' || this.ruleForm.state === '03' || this.ruleForm.state === '') {
        this.ruleForm.filingDate = ''
        this.$refs.ruleForm.clearValidate('filingDate')
        this.handlerChange({ type: 'date', formName: 'filingDate', value: '', name: '归档日期' })
      }
    }
  },
  methods: {
    // 大于0
    validtorMoney(rule, value, callback) {
      if (!validateRulePrice(rule, value, callback)) {
        callback(new Error('只能输入大于0的金额'))
      } else {
        callback()
      }
    },
    // 大于等于0
    validtorZeroMon(rule, value, callback) {
      if (!validatePriceZero(rule, value, callback)) {
        callback(new Error('只能输入大于等于0的金额'))
      } else {
        callback()
      }
    },

    // 回填经办人经办组织
    async initDefaultFiled() {
      const { handlingPersonId = '', handlingOrgId = '' } = JSON.parse(getSessionStorage('contactFormData'))
      if (this.fetchHandlingOrgPersonId) {
        await this.fetchHandlingOrgPersonId(handlingOrgId, false, false)
      }
      this.ruleForm.handlingPersonId = handlingPersonId
      this.ruleForm.handlingOrgId = handlingOrgId
    },
    amountInputBlur(key) {
      if (this.ruleForm[key]) {
        this.ruleForm[key] = toDecimal(this.ruleForm[key], 2)
      }
    },
    validPhone() {
      const func = (rule, value, callback) => {
        if (!validatePhone(value) && value !== '') {
          callback(new Error('请输入电话正确格式'))
        } else {
          callback()
        }
      }
      return func
    },
    validPhoneorMob() {
      var funMob = (rule, value, callback) => {
        if (!validateLandline(value) && value !== '') {
          callback(new Error('请输入正确的手机号码或者座机'))
        } else {
          callback()
        }
      }
      return funMob
    },
    validtorInteger() {
      const integer = (rule, value, callback) => {
        if (!validatePeriod(value)) {
          callback(new Error('只能输入大于0的整数'))
        } else {
          callback()
        }
      }
      return integer
    }
  }
}
