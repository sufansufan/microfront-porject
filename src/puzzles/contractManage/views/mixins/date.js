import { validateInteger } from '@core/utils/validate'

export default {
  data() {
    return {
      // 开工日期不晚于竣工日期 租赁起始日期不晚于租赁到期日期
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          const beginDateVal = this.ruleForm.rentEnd ? this.ruleForm.rentEnd : this.ruleForm.finishDate
          if (beginDateVal) {
            return time.getTime() > new Date(beginDateVal).getTime()
          }
        }
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          const beginDateVal = this.ruleForm.rentStart ? this.ruleForm.rentStart : this.ruleForm.startDate
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal).getTime()
          }
        }
      },
      absolutePeriod: Number.MAX_SAFE_INTEGER,
      dateType: '' // 区分是 绝对工期还是有限期限
    }
  },
  computed: {
    validateAbsolutePeriod() {
      const typeName = this.ruleForm.finishDate ? 'finishDate' : 'endDate'
      if (this.ruleForm.startDate && this.ruleForm[typeName]) {
        const oneDay = 86400000
        const startDate = new Date(this.ruleForm.startDate).getTime()
        const endDate = new Date(this.ruleForm[typeName]).getTime()
        const absoluteDate = endDate - startDate + oneDay
        return absoluteDate / oneDay
      } else {
        return this.absolutePeriod
      }
    }
  },
  // 绝对工期 日期计算
  methods: {
    handleUpdateStartDate(val, needCtx = false) {
      if (needCtx) {
        this.handlerChange({ type: 'date', formName: 'startDate', value: val, name: '开工日期' })
      }
      if (val) {
        this._updateAbsoluteData()
      } else {
        this.ruleForm.absolutePeriod = ''
        this.handlerAbsolutePeriod('')
      }
    },
    handleUpdateEndDate(val, needCtx = false) {
      if (needCtx) {
        this.handlerChange({ type: 'date', formName: 'endDate', value: val, name: '竣工日期' })
      }
      if (val) {
        this._updateAbsoluteData()
      } else {
        this.ruleForm.absolutePeriod = ''
        this.handlerAbsolutePeriod('')
      }
    },

    validateAbsolutePeriodFunc(rule, value, callback) {
      const valida = (rule, value, callback) => {
        const typeName = this.ruleForm.finishDate ? 'finishDate' : 'endDate'
        if (!value) callback()
        if (!validateInteger(value)) callback(new Error('只能输入大于0的整数'))
        if (value <= this.validateAbsolutePeriod) {
          callback()
        } else if (value > Number.MAX_SAFE_INTEGER) {
          callback(new Error('日期超过最大范围'))
        } else if (!this.ruleForm.startDate && !this.ruleForm[typeName]) {
          callback()
        } else {
          callback(new Error('绝对工期不得大于竣工日期-开工日期+1天'))
        }
      }
      return valida
    },
    _updateAbsoluteData() {
      const typeName = this.ruleForm.finishDate ? 'finishDate' : 'endDate'
      if (this.ruleForm.startDate && this.ruleForm[typeName]) {
        const oneDay = 86400000
        const startDate = new Date(this.ruleForm.startDate).getTime()
        const endDate = new Date(this.ruleForm[typeName]).getTime()
        const absoluteDate = endDate - startDate + oneDay
        if (absoluteDate <= 0) {
          this.absolutePeriod = Number.MAX_SAFE_INTEGER
          this.ruleForm.absolutePeriod = ''
          // this.handlerAbsolutePeriod(this.ruleForm.absolutePeriod)
        } else {
          this.ruleForm.absolutePeriod = ''
          this.absolutePeriod = absoluteDate / oneDay
          this.ruleForm.absolutePeriod = absoluteDate / oneDay
          this.handlerAbsolutePeriod(this.ruleForm.absolutePeriod)
        }
      } else {
        this.ruleForm.absolutePeriod = ''
        this.absolutePeriod = Number.MAX_SAFE_INTEGER
        // this.handlerAbsolutePeriod(this.ruleForm.absolutePeriod)
      }
    },
    handlerAbsolutePeriod(val) {
      this.handlerChange({
        type: 'input',
        formName: 'absolutePeriod',
        value: val,
        name: '绝对工期',
        selectOptions: {
          suf: '天'
        }
      })
    }
  }
}
