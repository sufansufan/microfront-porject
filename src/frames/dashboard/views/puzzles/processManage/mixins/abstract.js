export default {
  methods: {
    abstractClick(type, row = this.multipleSelection[0]) {
      if (type === 'add' && !row && !this.onlyOneData()) return
      const { businessId, processId, taskId, definitionCode } = row
      const { data, mainType, subType, parentMainType, parentSubType, registerCode } = JSON.parse(row.businessData)
      const { id, type: category } = JSON.parse(data)
      this.ruleFormData = JSON.parse(data)
      this.handlerContractJump({ mainType, subType, parentMainType, parentSubType })
      // const mainTypeList = ['01', '02', '03', '04']
      var query = {
        pageType: this.pageType,
        id,
        processId,
        taskId,
        type,
        processType: definitionCode,
        mainType
      }
      if (definitionCode === 'P_ContractRevise' || definitionCode === 'P_ContractEntry') {
        query = {
          ...query,
          category: category,
          hasApprovedVersion: true,
          hasSubcontract: false
        }
      }
      this.$router.push({ name: 'approve', query })
    },
    handlerContractJump(row) {
      const { mainType, subType, parentMainType, parentSubType } = row
      if (mainType === '01') {
        if (subType === '01') this.pageType = '01' // 工程合同
        if (subType === '02') this.pageType = '02' // 设计合同
        if (subType === '03') this.pageType = '03' // 办公类合同
        if (subType === '04') this.pageType = '04' // 其它合同
      }
      // 内部合同
      if (mainType === '02') {
        if (parentMainType === '01' && parentSubType === '01') {
          if (subType === '01') this.pageType = '05' // 主合同-工程合同-劳务分包
          if (subType === '02') this.pageType = '06' // 主合同-工程合同-采购合同
          if (subType === '03') this.pageType = '07' // 主合同-工程合同-机械合同
          if (subType === '04') this.pageType = '08' // 主合同-工程合同-分包合同
          if (subType === '06') this.pageType = '09' // 主合同-工程合同-其它合同
          if (subType === '07') this.pageType = '10' // 主合同-工程合同-工程保险合同
        }
        if (parentMainType === '01' && parentSubType === '02') {
          if (subType === '04') this.pageType = '11' // 主合同-设计合同-分包合同
          if (subType === '06') this.pageType = '12' // 主合同-设计合同-其它合同
        }
      }
      // 补充协议
      if (mainType === '03') {
        if (!subType && parentMainType === '01') {
          if (parentSubType === '01') this.pageType = '13' // 工程合同-补充协议
          if (parentSubType === '02') this.pageType = '14' // 设计合同-补充协议
          if (parentSubType === '03') this.pageType = '15' // 办公类合同-补充协议
          if (parentSubType === '04') this.pageType = '15' // 其它合同-补充协议
        }
        if (parentMainType === '02') {
          // 工程合同
          if (parentSubType === '01') {
            if (subType === '01') this.pageType = '17' // 劳务分包-补充协议
            if (subType === '02') this.pageType = '18' // 采购合同-补充协议
            if (subType === '03') this.pageType = '19' // 机械合同-补充协议
            if (subType === '04') this.pageType = '20' // 分包合同-补充协议
            if (subType === '06') this.pageType = '21' // 其它合同-补充协议
            if (subType === '07') this.pageType = '22' // 工程保险合同-补充协议
          }
          // 设计合同
          if (parentSubType === '02') {
            if (subType === '04') this.pageType = '23' // 分包合同-补充协议
            if (subType === '06') this.pageType = '24' // 其它合同-补充协议
          }
        }
      }
    }
  }
}
