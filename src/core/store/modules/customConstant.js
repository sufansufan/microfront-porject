export default {
  // 流程审批中审批类型
  processApproveType: [
    {
      code: 'P_ContractEntry',
      name: '合同录入审批'
    },
    {
      code: 'P_ContractEntry',
      name: '合同录入审批'
    },
    {
      code: 'P_ContractSettlement',
      name: '合同结算审批'
    }
  ],
  trueAndFalse: [
    {
      code: 0,
      name: '否'
    },
    {
      code: 1,
      name: '是'
    }
  ],
  approve: [
    {
      mainType: '01',
      children: [
        {
          subType: '01' // 工程合同
        },
        {
          subType: '02' // 设计合同
        },
        {
          subType: '03' // 办公类合同
        },
        {
          subType: '04' // 其它合同
        }
      ]
    },
    {
      mainType: '02', // 内部合同
      parentMainType: '01', // 主合同
      parentSubType: '01', // 工程合同
      children: [
        {
          subType: '01' //  主合同-工程合同-劳务分包
        },
        {
          subType: '02' //  主合同-工程合同-采购合同
        },
        {
          subType: '03' //  主合同-工程合同-机械合同
        },
        {
          subType: '04' //  主合同-工程合同-分包合同
        },
        {
          subType: '06' //  主合同-工程合同-其它合同
        },
        {
          subType: '07' //  主合同-工程合同-工程保险合同
        }
      ]
    },
    {
      mainType: '02', // 内部合同
      parentMainType: '01', // 主合同
      parentSubType: '02', // 设计合同
      children: [
        {
          subType: '04' //  主合同-工程合同-分包合同
        },
        {
          subType: '06' //  主合同-工程合同-其它合同
        }
      ]
    },
    {
      mainType: '03', // 补充协议
      subType: '', // 补充和协议
      parentMainType: '01', // 主合同
      children: [
        {
          parentSubType: '01' // 工程合同-补充协议
        },
        {
          parentSubType: '02' // 设计合同-补充协议
        },
        {
          parentSubType: '03' // 办公类合同-补充协议
        },
        {
          parentSubType: '04' // 其它合同-补充协议
        }
      ]
    },
    {
      mainType: '03', // 补充协议
      parentMainType: '02', // 内部合同
      children: [
        {
          subType: '01', // 劳务分包-补充协议
          parentSubType: '01' // 工程合同
        },
        {
          subType: '02', // 采购合同-补充协议
          parentSubType: '01' // 工程合同
        },
        {
          subType: '03', // 机械-补充协议
          parentSubType: '01' // 工程合同
        },
        {
          subType: '04', // 分包合同-补充协议
          parentSubType: '01' // 工程合同
        },
        {
          subType: '06', // 其它合同-补充协议
          parentSubType: '01' // 工程合同
        },
        {
          subType: '07', // 工程保险合同-补充协议
          parentSubType: '01' // 工程合同
        },
        {
          subType: '04', // 分包合同-补充协议
          parentSubType: '02' // 设计合同
        },
        {
          subType: '06', // 其它合同-补充协议
          parentSubType: '02' // 设计合同
        }
      ]
    }
  ]
}
