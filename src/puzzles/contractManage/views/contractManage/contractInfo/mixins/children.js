import { mapGetters, mapActions } from 'vuex'
import { validateDecimal, validateRulePrice, toDecimal } from '@core/utils/validate'
import { addMainContract, saveEditMainEngContract, saveEditMainSignContract, saveEditMainOfficeContract,
  saveEditMainOtherContract, processAgainSubmit } from '@core/api/contractManage/contractmanager'
import uploadMixns from '../../../mixins/upload'
import copyUploadMixins from '../../../mixins/editGeneratorNo'
import dateMixins from '../../../mixins/date'
// import { formatMoney } from '@core/utils'
export default {
  mixins: [uploadMixns, dateMixins, copyUploadMixins], //
  inject: ['getParentParamsData', 'getChildResponseData', 'getBuildMasterList'],
  props: {
    isLook: Boolean,
    // 区分当前类型
    currentInfo: {
      type: String,
      required: true
    }
  },
  watch: {
    // 归档日期
    'ruleForm.state': {
      handler(n) {
        this.validateFilingDate(n === '02')
      }
    },
    // 关联合同编号是否必填
    'parentParams.category': {
      handler(n) {
        this.validateRelationContract(n === '01')
      }
    }
    // 'ruleForm.amount': {
    //   handler(n) {
    //     if (n) {
    //       this.ruleForm.amount = formatMoney(n)
    //     }
    //   }

    // },
    // 'ruleForm.settlementAmount': {
    //   handler(n) {
    //     if (n) {
    //       this.ruleForm.settlementAmount = formatMoney(n)
    //     }
    //   }
    // }
  },
  data() {
    return {
      pickerDateBefore: {
        disabledDate: (time) => {
          const beginDateVal = this.ruleForm.endDate
          if (beginDateVal) {
            return time.getTime() > new Date(beginDateVal).getTime()
          }
        }
      },
      pickerDateAfter: {
        disabledDate: (time) => {
          const beginDateVal = this.ruleForm.startDate
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal).getTime()
          }
        }
      },
      // 数据字典基础 全都有
      baseDictionares: [
        'BalanceType', // 收支类型 全都有
        'contractState' // 合同状态 全都有
      ],
      // 数据字典 工程-设计
      engineerDesignDictionares: [
        'ProjectScale', // 工程规模 设计和工程有,
        'EngineeringStatus', // 工程状态 设计和工程,
        'StructureType', // 结构类型 工程设计存在
        'nativePlace' // 工程地点
      ],
      // 数据字典 办公类
      officeDictionares: [
        'ContractBusinessType', // 业务类型 只有办公存在
        'PaymentClass' // 支付类别 只有办公有
      ],
      deepRuleForm: {}
    }
  },
  computed: {
    ...mapGetters(['constant']),
    // 是否编辑
    isEdit() {
      return Number(this.$route.query.id) !== 0 && !this.isLook
    },
    // 当前合同类型
    currentContralName() {
      return this.$options.name
    },
    // 是否备案
    contractIsLaw() {
      if (this.ruleForm.isRecord === 1) {
        return true
      } else {
        this.ruleForm.recordNumber = ''
        this.handlerChange({
          type: 'input',
          formName: 'recordNumber',
          value: '',
          name: '合同备案号'
        })
        return false
      }
    },
    // 是否有使用许可证
    contractIsLicence() {
      return this.ruleForm.isConstructionPermit === 1
    },
    // 是否selectList
    switchList() {
      const list = [{
        code: 0,
        name: '否'
      },
      {
        code: 1,
        name: '是'
      }
      ]
      return list
    },
    // reponseData
    childResponseData() {
      return this.getChildResponseData()
    },
    // 父数据
    parentParams() {
      return this.getParentParamsData()
    },
    // 工程规模List
    projectScaleOptions() {
      return this.constant.ProjectScale
    },
    // 收支类型
    collectTypeList() {
      return this.constant.BalanceType
    },
    // 合同状态
    contractStatusList() {
      return this.constant.contractState
    },
    // 工程状态
    projectStatusList() {
      return this.constant.EngineeringStatus
    },
    // 结构类型List
    structureTypeList() {
      return this.constant.StructureType
    },
    // 工程地点
    projectPlaceOptions() {
      return this.constant.nativePlace
    },
    // 工程建造师List 工程合同独有
    buildMasterList() {
      return this.getBuildMasterList()
    },
    // 归档日期
    disabledFilingDate() {
      // 02 可编辑
      return this.ruleForm.state !== '02'
    },
    // 合同是否存在审批通过的记录
    hasApprovedVersion() {
      return this.$route.query.hasApprovedVersion
    }
  },
  methods: {
    ...mapActions(['getConstant']),
    // 关联合同编号
    validateRelationContract(boolean) {
      if (!boolean) {
        const validateInfo = [{
          required: true,
          trigger: 'change',
          message: '请选择关联合同编号'
        }]
        this.$set(this.rules, 'relationContractId', validateInfo)
      } else {
        this.$set(this.rules, 'relationContractId', {})
      }
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    // 清空工程建造师和设计建造师
    clearBuilder() {
      this.ruleForm.engineeringPersonId = ''
      this.ruleForm.changeEngineeringId = ''
      this.buildMasterList = []
    },
    validateFilingDate(boolean) {
      if (boolean) {
        const validateInfo = [{
          required: true,
          trigger: 'change',
          message: '请输入归档日期'
        }]
        this.$set(this.rules, 'filingDate', validateInfo)
      } else {
        this.$set(this.rules, 'filingDate', {})
      }
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    handleChangeState(val) {
      this.ruleForm.filingDate = ''
      this.handlerChange({
        type: 'select',
        formName: 'state',
        selectData: 'contractStatusList',
        selectOptions: {
          code: 'code',
          name: 'name'
        },
        value: val,
        name: '合同状态'
      })
      this.handlerChange({
        type: 'date',
        formName: 'filingDate',
        value: this.ruleForm.filingDate,
        name: '归档日期'
      })
    },
    handlerChange(val) {
      const row = this.formUpdateContext(val)
      this.$emit('getChangeUploadContext', row, 'content')
    },
    // 上传文件
    handleUploadEngFile(type) {
      this.uploadData.typeCode = type
      this.uploadData.businessDataId = this.parentParams.approvalNo
    },
    // 修改子组件值
    handlerBuildMasterList(data) {
      if (this.currentContralName !== 'EnginnerInfo') return
    },
    // 请求公共数据字典
    async initPublicDictionaries() {
      await this.getConstant(this.baseDictionares)
    },
    // 校验当前表单 false未通过
    validateCurrentForm() {
      let valid = false // 默认未通过
      this.$refs['ruleForm'].validate((boolean) => {
        valid = boolean
      })
      return valid
    },
    async onSave() {
      this.loading = true
      // 获取当前所有参数
      const params = this.getParams()
      // 根据当前合同进行不同的接口调用

      await this.sendSaveData(params, 'save')
      this.loading = false
    },
    async onSubmit() {
      this.loading = true
      const params = this.getParams()
      await this.sendSaveData(params, 'sumbit')
      this.loading = false
    },
    onCancel() {
      this.$router.go(-1)
    },
    // 处理参数
    formatParams(params) {
      params['handlingOrgId'] = params['handlingOrgId'].toString()
      if (this.currentContralName === 'EnginnerInfo' || this.currentContralName === 'SignInfo') {
        params['projectSite'] = params['projectSite'].toString()
        params['projectScale'] = params['projectScale'].toString()
      }
      return params
    },
    // 获取所有参数
    getParams() {
      const childrenParams = this.ruleForm
      const parentParams = this.parentParams
      const params = {
        ...parentParams,
        ...childrenParams,
        Loading: true
      }
      if (this.isEdit) {
        const modificationRecordDTO = {
          content: this.hasApprovedVersion ? JSON.stringify(parentParams.content) : null,
          reason: parentParams.reason
        }
        params['modificationRecordDTO'] = modificationRecordDTO
      }
      const fomatParams = this.formatParams(params)
      return fomatParams
    },
    async sendSaveData(data, category = 0) {
      const {
        pageType,
        taskId
      } = this.$route.query
      if (pageType) {
        const params = {
          Loading: true,
          ...data,
          processTaskId: taskId
        }
        processAgainSubmit(params, 1).then(() => {
          this.$message.success('提交成功')
          this.$router.go(-1)
        })
      } else {
        const list = {
          add: addMainContract,
          edit: {
            EnginnerInfo: saveEditMainEngContract,
            SignInfo: saveEditMainSignContract,
            OtherInfo: saveEditMainOtherContract,
            OfficeInfo: saveEditMainOfficeContract
          }
        }
        const methodsName =
          this.currentInfo === 'add'
            ? list[this.currentInfo]
            : list[this.currentInfo][this.currentContralName]
        const type = category === 'save' ? 0 : 1 // 类型 保存/修改
        await methodsName(data, type)
        this.onCancel()
      }
    },

    getPlaceHolder(title, type = 0) {
      const typeMap = ['请输入', '请选择']
      return `${typeMap[type]}${title}`
    },
    // 编辑查看逻辑 这个会调用两次 Promise异步解决办法(暂时)
    initReponseData() {
      this.ruleForm = this.childResponseData
      // this.ruleForm.state = '01'
      this.deepRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
    },
    // 详情查看初始化文件列表
    async initResponseFileList() {
      const id = this.parentParams.approvalNo
      const list = ['contract', 'constructionPermit',
        'winBidBook', 'settlementBook'
      ]
      const data = await this.fetchFormFileList(list, id)
      for (const [key, value] of list.entries()) {
        this[`${value}List`] = data[key]
        this[`deep${value.slice(0, 1).toUpperCase()}${value.slice(1)}List`] = JSON.parse(JSON.stringify(data[key]))
      }
      if (this.isEdit) {
        this.editGeneratorNo(this.ruleForm.approvalStatus, 'main')
      }
    },
    validateArea(rule, value, callback) {
      if (!value) {
        return callback(new Error('建筑面积不能为空'))
      } else {
        if (!validateDecimal(value)) {
          callback(new Error('只能输入大于0的数(允许两位小数)'))
        } else {
          callback()
        }
      }
    },
    validateAreaNo(rule, value, callback) {
      if (!validateDecimal(value) && value !== '') {
        callback(new Error('只能输入大于0的数(允许两位小数)'))
      } else {
        callback()
      }
    },
    // 大于0的金额
    validtorMoneyZero(rule, value, callback) {
      if (!validateRulePrice(rule, value, callback)) {
        callback(new Error('只能输入大于0的金额'))
      } else {
        callback()
      }
    },
    amountInputBlur(key) {
      if (this.ruleForm[key]) {
        this.ruleForm[key] = toDecimal(this.ruleForm[key], 2)
      }
    },
    // 有问题
    validtorMoney(rule, value, callback) {
      if (Number(value) === 0) {
        callback()
      } else {
        if (!validateRulePrice(rule, value, callback)) {
          callback(new Error('金额只能输入大于等于0的数字'))
        } else {
          callback()
        }
      }
    }

  },
  created() {
    if (this.parentParams.type) {
      Promise.all([
        this.initPublicDictionaries(),
        this.initPraviteDictionares()
      ]).then(() => {
        if (this.currentInfo !== 'add') {
          this.initReponseData()
        }
      })
    }
  }

}
