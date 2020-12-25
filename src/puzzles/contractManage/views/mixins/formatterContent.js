import formUpdateContext from '@core/mixins/formUpdateContext'
import UpdateContext from '@framesDash/components/UpdateContext'
import { searchHasApproveVersion, hasApprovedVersionContract, getSupplyVersionNum } from '@core/api/contractManage/contractmanager'
import { formatMoney } from '@core/utils'
export default {
  data() {
    return {
      content: [], // 历史修改记录
      currentContent: [], // 当前版本修改记录
      isShowContent: false,
      versionNum: '',
      isShowCooperateList: false
    }
  },
  mixins: [formUpdateContext],
  components: {
    UpdateContext
  },
  computed: {
    isShowHistory() {
      return this.content.length > 0
    },
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
    isContract() {
      return Array.isArray(this.settlementBookList)
    },
    currentId() {
      return this.options?.row?.id || this.options?.id
    },
    disabledHandlingPersonId() {
      return !(this.ruleForm.handlingOrgId && this.ruleForm.handlingOrgId.length > 0)
    }
  },
  created() {
    if (this.isEdit) {
      this.judeShowEditContent()
      this.isShowCooperate()
    }
  },
  methods: {
    async isShowCooperate() {
      const { data } = await getSupplyVersionNum(this.currentId)
      this.versionNum = data
      if (this.isShowContent && this.versionNum === true) {
        this.isShowCooperateList = false
      } else {
        this.isShowCooperateList = true
      }
    },
    async judeShowEditContent() {
      if (this.isContract) {
        // 合同
        const { data } = await hasApprovedVersionContract(this.currentId)
        // 是否显示内部合同的修改内容
        this.isShowContent = data
      } else {
        const { data } = await searchHasApproveVersion(this.currentId)
        // 是否显示补充协议的修改内容
        this.isShowContent = data
      }
    },
    handlerChange(val) {
      const row = this.formUpdateContext(val)
      this.getChangeUploadContext(row, 'content')
    },
    formatterRequestConent(requestContent, requestReason) {
      const content = requestContent || this.ruleForm.content
      const reason = requestReason || this.ruleForm.reason
      const obj = {
        content: this.isShowContent ? JSON.stringify(content) : null,
        reason: reason
      }
      if (!obj.reason) {
        return null
      }
      return obj
    },
    // 经办组织变化请求经办人List
    async fetchHandlingOrgPersonId(value, trigger = true, clear = true) {
      clear && (this.ruleForm.handlingPersonId = '')
      if (!value || !value.length) return
      const list = [
        {
          type: 'orgPersonList',
          params: value.slice(-1)[0]
        } // 经办人
      ]
      await this.getConstant(list)
      if (trigger) {
        this.handlerChange({ type: 'cascader', formName: 'handlingOrgId',
          selectOptions: { code: 'id', name: 'orgName' },
          selectData: 'handleOrgList', value, name: '经办组织' })
      }
    },
    async formatterResponseConent(responseData, type = 'supplement') {
      const { currentEditNotes, historyEditNotes } = responseData
      const data = responseData[type === 'supplement' ? 'supplementalAgreementDTO' : 'subContractDTO']

      // 历史修改记录 等待后台确定格式
      this.content = historyEditNotes.map(i => {
        return {
          name: i.operationPersonName,
          date: i.operationDate,
          content: i.content ? JSON.parse(i.content) : [],
          reason: i.reason
        }
      })
      let handlingOrgId = ''
      if (data.handlingOrgId) {
        handlingOrgId = data.handlingOrgId.split(',')
      }
      let cooperateUnitId = ''
      if (data.cooperateUnitId) {
        cooperateUnitId = data.cooperateUnitId.split(',')
      }

      // 这一步需要额外处理 经办人 经办组织
      await this.fetchHandlingOrgPersonId(handlingOrgId, false, false)
      this.ruleForm = {
        ...data,
        signUnitName: type === 'supplement' ? data.subCcontractDTO?.signUnitName || data.contractDTO?.signUnitName : data?.signUnitName,
        amount: formatMoney(data['amount']),
        settlementAmount: formatMoney(data['settlementAmount']),
        benefits: data['benefits'] ? formatMoney(data['benefits']) : null, // 保险金
        handlingOrgId, cooperateUnitId, content: []
      }
      this.currentContent = currentEditNotes.map(i => {
        return {
          name: i.operationPersonName,
          date: i.operationDate,
          content: i.content ? JSON.parse(i.content) : [],
          reason: i.reason
        }
      })
      this.deepRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
    }
  }
}
