<template>
  <div class="approve-box">
    <div class="approve-component" :class="isDetails === 'details' ? 'action' : ''">
      <component :is="pageComponent" ref="component" :disabled="disabled" :settle-disabled="settleDisabled" :options="componentOptions" :process-otions="{btnStatus: false}" :info-type="componentOptions.type" :record-disabled="recordDisabled" :process-type-status="processType" />
      <div v-loading="loading" class="process-record">
        <approval-record :process-data="processData" />
      </div>
    </div>
    <div v-if="isDetails !== 'details'" class="approve-btn">
      <approval-opera :process-data="processData" @getBtnStatus="getBtnStatus" @submitApproval="submitApproval" />
    </div>
  </div>
</template>

<script>
import component from './component'
import ApprovalOpera from './components/ApprovalOpera'
import ApprovalRecord from '@frames/dashboard/components/ApprovalRecord'
import { getProcessRecord, readCcProcess } from '@core/api/processManage/workflowmanager'
import { processAgainSubmit, processAgainAgree, processSubcontractAgree, processSubcontractreSettle, processMainSettle } from '@core/api/contractManage/contractmanager'
import { getSessionStorage } from '@core/utils/auth'
export default {
  components: {
    MainInfo: component.MainInfo,
    EngineerInfo: component.EngineerInfo,
    Labor: component.Labor,
    Purchase: component.Purchase,
    Mechanics: component.Mechanics,
    Subpackage: component.Subpackage,
    EngineeInsure: component.EngineeInsure,
    DesignInfo: component.DesignInfo,
    Other: component.Other,
    Office: component.Office,
    OtherContract: component.OtherContract,
    DesignSubpackage: component.DesignSubpackage,
    DesignOther: component.DesignOther,
    EngineerAgree: component.EngineerAgree,
    LaborAgree: component.LaborAgree,
    PurchaseAgree: component.PurchaseAgree,
    MechanicsAgree: component.MechanicsAgree,
    SubpackageAgree: component.SubpackageAgree,
    EngineeInsureAgree: component.EngineeInsureAgree,
    OtherAgree: component.OtherAgree,
    DesignAgree: component.DesignAgree,
    DesignSubpackageAgree: component.DesignSubpackageAgree,
    DesignOtherAgree: component.DesignOtherAgree,
    OfficeAgree: component.OfficeAgree,
    OtherContractAgree: component.OtherContractAgree,
    ApprovalOpera,
    ApprovalRecord
  },
  data() {
    return {
      pageComponent: '',
      processData: [],
      loading: false,
      disabled: true,
      settleDisabled: true,
      recordDisabled: null, // 修改记录状态
      componentOptions: {
        type: 'details'
      },
      ruleFormData: {},
      processType: ''
    }
  },
  computed: {
    isDetails() {
      return this.$route.query.type
    }
  },
  created() {
    this.featchCcProcess()
    if (this.isDetails === 'details') {
      this.handlerPageComponent()
    }
    this.getProcessData()
  },
  methods: {
    handlerPageComponent(type) {
      const { pageType, id, processType } = this.$route.query
      this.componentOptions = {
        ...this.componentOptions,
        row: { id }
      }
      if (type === 'start') {
        this.componentOptions = {
          ...this.componentOptions,
          type: 'edit'
        }
      }
      switch (pageType) {
        case '01':
          if (type === 'start') {
            if (processType === 'P_ContractRevise' || processType === 'P_ContractEntry') {
              this.pageComponent = 'MainInfo'
            } else {
              this.pageComponent = 'EngineerInfo'
            }
          } else {
            this.pageComponent = 'EngineerInfo'
          }
          break
        case '02':
          if (type === 'start') {
            if (processType === 'P_ContractRevise' || processType === 'P_ContractEntry') {
              this.pageComponent = 'MainInfo'
            } else {
              this.pageComponent = 'DesignInfo'
            }
          } else {
            this.pageComponent = 'DesignInfo'
          }
          break
        case '03':
          if (type === 'start') {
            if (processType === 'P_ContractRevise' || processType === 'P_ContractEntry') {
              this.pageComponent = 'MainInfo'
            } else {
              this.pageComponent = 'Office'
            }
          } else {
            this.pageComponent = 'Office'
          }
          break
        case '04':
          if (type === 'start') {
            if (processType === 'P_ContractRevise' || processType === 'P_ContractEntry') {
              this.pageComponent = 'MainInfo'
            } else {
              this.pageComponent = 'OtherContract'
            }
          } else {
            this.pageComponent = 'OtherContract'
          }
          break
        case '05':
          this.pageComponent = 'Labor'
          break
        case '06':
          this.pageComponent = 'Purchase'
          break
        case '07':
          this.pageComponent = 'Mechanics'
          break
        case '08':
          this.pageComponent = 'Subpackage'
          break
        case '09':
          this.pageComponent = 'Other'
          break
        case '10':
          this.pageComponent = 'EngineeInsure'
          break
        case '11':
          this.pageComponent = 'DesignSubpackage'
          break
        case '12':
          this.pageComponent = 'DesignOther'
          break
        case '13':
          this.pageComponent = 'EngineerAgree'
          break
        case '14':
          this.pageComponent = 'DesignAgree'
          break
        case '15':
          this.pageComponent = 'OfficeAgree'
          break
        case '16':
          this.pageComponent = 'OtherContractAgree'
          break
        case '17':
          this.pageComponent = 'LaborAgree'
          break
        case '18':
          this.pageComponent = 'PurchaseAgree'
          break
        case '19':
          this.pageComponent = 'MechanicsAgree'
          break
        case '20':
          this.pageComponent = 'SubpackageAgree'
          break
        case '21':
          this.pageComponent = 'OtherAgree'
          break
        case '22':
          this.pageComponent = 'EngineeInsureAgree'
          break
        case '23':
          this.pageComponent = 'DesignSubpackageAgree'
          break
        case '24':
          this.pageComponent = 'DesignOtherAgree'
          break
        default:
          break
      }
    },
    getProcessData() {
      this.loading = true
      const { processId } = this.$route.query
      const params = {
        processId,
        userId: getSessionStorage('userId')
      }
      getProcessRecord(params).then(({ data }) => {
        this.loading = false
        this.processData = data.allFlowsRecords
      })
    },
    // 判断抄送流程是已读还是未读
    featchCcProcess() {
      const { taskId } = this.$route.query
      if (taskId) readCcProcess(taskId)
    },
    getBtnStatus(type) {
      this.processType = type
      const { processType } = this.$route.query
      if (type === 'start') {
        if (processType === 'P_ContractEntry') {
          this.disabled = false
          this.settleDisabled = true
          this.recordDisabled = true
        } else if (processType === 'P_ContractSettlement') {
          this.disabled = true
          this.settleDisabled = false
          this.recordDisabled = true
        } else if (processType === 'P_ContractRevise') {
          this.disabled = false
          this.settleDisabled = true
          this.recordDisabled = false
        }
      } else {
        if (processType === 'P_ContractEntry') {
          this.recordDisabled = true
        } else if (processType === 'P_ContractSettlement') {
          this.recordDisabled = true
        } else if (processType === 'P_ContractRevise') {
          this.recordDisabled = false
        }
      }
      this.handlerPageComponent(type)
    },
    submitApproval() {
      const { processType, mainType } = this.$route.query
      if (this.pageComponent === 'MainInfo') {
        this.$refs.component.onSubmit()
        return
      }
      const { taskId } = this.$route.query
      const { handlingOrgId, projectScale, projectSite, content, reason } = this.$refs.component.ruleForm
      var params = {
        Loading: true,
        ...this.$refs.component.ruleForm,
        handlingOrgId: handlingOrgId?.toString(),
        projectScale: projectScale?.toString(),
        projectSite: projectSite?.toString(),
        processTaskId: taskId
      }
      const modificationRecordDTO = {
        content: processType === 'P_ContractRevise' && this.processType === 'start' ? JSON.stringify(content) : '',
        reason
      }
      if (mainType === '01') {
        params = {
          ...params,
          modificationRecordDTO
        }
      } else {
        params = {
          ...params,
          subModificationRecord: modificationRecordDTO
        }
      }
      this.fetchApi(params)
    },
    fetchApi(params) {
      this.$refs.component.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const { mainType, taskId, processType } = this.$route.query
          if (mainType === '01') {
            if (processType === 'P_ContractSettlement') {
              this.mainResetSettle(params, taskId)
            } else {
              processAgainSubmit(params, 1).then(() => {
                this.$message.success('提交成功')
                this.$router.go(-1)
              })
            }
          } else if (mainType === '02') {
            if (processType === 'P_ContractSettlement') {
              this.resetSettle(params, taskId)
            } else {
              processSubcontractAgree(params, taskId).then(() => {
                this.$message.success('提交成功')
                this.$router.go(-1)
              })
            }
          } else if (mainType === '03') {
            processAgainAgree(params, taskId).then(() => {
              this.$message.success('提交成功')
              this.$router.go(-1)
            })
          }
        } else {
          return false
        }
      })
    },
    resetSettle(params, taskId) {
      const obj = {
        contractId: params.id,
        settlementAmount: params.settlementAmount
      }
      processSubcontractreSettle(obj, taskId).then(() => {
        this.$message.success('提交成功')
        this.$router.go(-1)
      })
    },
    mainResetSettle(params, taskId) {
      const obj = {
        processTaskId: taskId,
        contractId: params.id,
        settlementAmount: params.settlementAmount
      }
      processMainSettle(obj, 1).then(() => {
        this.$message.success('提交成功')
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.approve-box {
  padding: 10px;
  .approve-component {
    height: calc(100vh - 200px);
    overflow-y: auto;
    &.action {
      height: calc(100vh - 140px);
    }
  }
  .approve-btn {
    margin-top: 20px;
  }
  .process-record {
    margin-top: 20px;
  }
}
</style>
