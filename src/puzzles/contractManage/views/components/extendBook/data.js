export default {
  data() {
    return {
      engineerAndDesign: [
        {
          type: 'selection',
          single: true,
          fixed: 'left'
        },
        {
          label: '序号',
          index: true,
          fixed: 'left'
        },
        {
          label: '审批单号',
          showTooltip: true,
          fixed: 'left',
          width: 180,
          prop: 'approvalNo',
          sortable: 'custom',
          defaultSort: true
        },
        {
          label: '协议编号',
          showTooltip: true,
          width: 180,
          prop: 'contractNumber',
          sortable: 'custom',
          defaultSort: true
        },
        {
          label: '协议状态',
          width: 150,
          prop: 'formatState',
          sortable: 'custom'
        },
        {
          label: '协议名称',
          showTooltip: true,
          width: 200,
          prop: 'name',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.clickCurrentRow('name', row.name, row)
                }
              }
            }, row.name)
          },
          sortable: 'custom'
        },
        {
          label: '协议金额',
          width: 150,
          showTooltip: true,
          prop: 'formatAmount',
          sortable: 'custom'
        },
        {
          label: '建筑面积(m²)',
          prop: 'buildArea',
          width: 150,
          sortable: 'custom'
        },
        {
          label: '签订日期',
          prop: 'signDate',
          width: 180,
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '归档日期',
          width: 180,
          showTooltip: true,
          prop: 'filingDate',
          sortable: 'custom'
        },
        {
          label: '发起组织',
          prop: 'startOrgName',
          width: 180,
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '生效状态',
          prop: 'formatEffectiveState',
          width: 150,
          sortable: 'custom',
          fixed: 'right'
        },
        {
          label: '审批状态',
          fixed: 'right',
          width: 150,
          prop: 'approvalStatus',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeSupplyApprovalStatus(row)
              },
              on: {
                click: () => {
                  this.clickApprovalSatus(row.approvalProcessId, row)
                }
              }
            }, row.formatApprovalStatus)
          },
          sortable: 'custom'
        }
      ],
      // 劳务/采购合同
      serviceAndPurchase: [],
      // 机器合同
      machine: [],
      // 分包合同
      subPackage: [
        {
          type: 'selection',
          single: true,
          fixed: 'left'
        },
        {
          label: '序号',
          index: true,
          fixed: 'left'
        },
        {
          label: '审批单号',
          showTooltip: true,
          width: 180,
          fixed: 'left',
          prop: 'approvalNo',
          sortable: 'custom',
          defaultSort: true
        },
        {
          label: '协议编号',
          width: 180,
          showTooltip: true,
          prop: 'contractNumber',
          sortable: 'custom'
        },
        // {
        //   label: '分包方式',
        //   showTooltip: true,
        //   width: 160,
        //   prop: 'subSubType',
        //   sortable: 'custom'
        // },
        {
          label: '协议状态',
          width: 180,
          prop: 'formatState',
          sortable: 'custom'
        },
        {
          label: '协议名称',
          showTooltip: true,
          width: 200,
          prop: 'name',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.clickCurrentRow('name', row.name, row)
                }
              }
            }, row.name)
          },
          sortable: 'custom'
        }, {
          label: '协议金额',
          prop: 'amount',
          width: 180,
          sortable: 'custom'
        },
        {
          label: '签订日期',
          prop: 'signDate',
          width: 180,
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '归档日期',
          prop: 'filingDate',
          showTooltip: true,
          width: 180,
          sortable: 'custom'
        },
        {
          label: '发起组织',
          width: 200,
          showTooltip: true,
          prop: 'startOrgName',
          sortable: 'custom'
        },
        {
          label: '生效状态',
          prop: 'formatEffectiveState',
          showTooltip: true,
          fixed: 'right',
          width: 180,
          sortable: 'custom'
        },
        {
          label: '审批状态',
          fixed: 'right',
          prop: 'approvalStatus',
          showTooltip: true,
          width: 180,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeSupplyApprovalStatus(row)
              },
              on: {
                click: () => {
                  this.clickApprovalSatus(row.approvalProcessId, row)
                }
              }
            }, row.formatApprovalStatus)
          },
          sortable: 'custom'
        }
      ],
      // 通用补充协议
      universal: [
        {
          type: 'selection',
          single: true,
          fixed: 'left'
        },
        {
          label: '序号',
          index: true,
          fixed: 'left'
        },
        {
          label: '审批单号',
          showTooltip: true,
          prop: 'approvalNo',
          fixed: 'left',
          width: 180,
          sortable: 'custom',
          defaultSort: true
        },
        {
          label: '协议编号',
          showTooltip: true,
          width: 180,
          prop: 'contractNumber',
          sortable: 'custom',
          defaultSort: true
        },
        {
          label: '协议状态',
          prop: 'formatState',
          showTooltip: true,
          width: 180,
          sortable: 'custom'
        },
        {
          label: '协议名称',
          showTooltip: true,
          width: 200,
          prop: 'name',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.clickCurrentRow('name', row.name, row)
                }
              }
            }, row.name)
          },
          sortable: 'custom'
        },
        {
          label: '协议金额',
          prop: 'amount',
          showTooltip: true,
          width: 180,
          sortable: 'custom'
        },
        {
          label: '签订日期',
          prop: 'signDate',
          showTooltip: true,
          width: 180,
          sortable: 'custom'
        },
        {
          label: '归档日期',
          prop: 'filingDate',
          showTooltip: true,
          width: 180,
          sortable: 'custom'
        },
        {
          label: '发起组织',
          showTooltip: true,
          width: 180,
          prop: 'startOrgName',
          sortable: 'custom'
        },
        {
          label: '生效状态',
          prop: 'formatEffectiveState',
          width: 180,
          fixed: 'right',
          sortable: 'custom'
        },
        {
          label: '审批状态',
          showTooltip: true,
          fixed: 'right',
          prop: 'approvalStatus',
          width: 180,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeSupplyApprovalStatus(row)
              },
              on: {
                click: () => {
                  this.clickApprovalSatus(row.approvalProcessId, row)
                }
              }
            }, row.formatApprovalStatus)
          },
          sortable: 'custom'
        }
      ],
      // 版本查看
      contractLook: [
        {
          type: 'selection',
          single: true
        },
        {
          label: '序号',
          index: true
        },
        {
          label: '审批单号',
          showTooltip: true,
          width: 150,
          prop: 'approvalNo'
        },
        {
          label: '合同编号',
          showTooltip: true,
          width: 150,
          prop: 'contractNumber'
        },

        {
          label: '合同名称',
          width: 150,
          showTooltip: true,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.clickCurrentRow('name', row.name, row)
                }
              }
            }, row.name)
          }
        },
        {
          label: '合同状态',
          showTooltip: true,
          width: 100,
          prop: 'formatState'
        },
        {
          label: '归属单位',
          width: 150,
          showTooltip: true,
          prop: 'belongOrgName'
        },
        {
          label: '签订单位',
          showTooltip: true,
          width: 150,
          prop: 'signUnitName'
        },
        {
          label: '合同金额',
          width: 120,
          showTooltip: true,
          prop: 'formatAmount'
        },
        {
          label: '结算金额',
          width: 120,
          showTooltip: true,
          prop: 'formatSettlementAmount'
        },
        {
          label: '签订日期',
          width: 100,
          showTooltip: true,
          prop: 'signDate'
        },
        {
          label: '归档日期',
          width: 100,
          showTooltip: true,
          prop: 'filingDate'
        },
        {
          label: '经办组织',
          width: 150,
          showTooltip: true,
          prop: 'handlingOrgName'
        },
        {
          label: '发起组织',
          showTooltip: true,
          width: 150,
          prop: 'startOrgName'
        },
        {
          label: '生效状态',
          showTooltip: true,
          width: 100,
          prop: 'formatEffectiveState'
        },
        {
          label: '版本创建日期1',
          showTooltip: true,
          width: 100,
          prop: 'createDate'
        },
        {
          label: '审批状态',
          showTooltip: true,
          prop: 'approvalStatus',
          width: 100,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeSupplyApprovalStatus(row)
              },
              on: {
                click: () => {
                  this.clickApprovalSatus(row.approvalProcessId, row)
                }
              }
            }, row.formatApprovalStatus)
          }
        },
        {
          label: '结算状态',
          showTooltip: true,
          prop: 'settlementState',
          width: 100,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeSettlementState(row)
              },
              on: {
                click: () => {
                  this.clickSettlementState(row.settlementProcessId, row)
                }
              }
            }, row.formatSettlementState)
          }
        }
      ],
      // 补充协议中的版本查看
      extendLook: [
        {
          type: 'selection',
          single: true
        },
        {
          label: '序号',
          index: true
        },
        {
          label: '审批单号',
          width: 200,
          showTooltip: true,
          prop: 'approvalNo'
        },
        {
          label: '协议编号',
          showTooltip: true,
          width: 200,
          prop: 'contractNumber'
        },
        {
          label: '协议状态',
          width: 100,
          showTooltip: true,
          prop: 'formatState'
        },
        {
          label: '协议名称',
          showTooltip: true,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.clickCurrentRow('name', row.name, row)
                }
              }
            }, row.name)
          }
        },
        {
          label: '协议金额',
          width: 150,
          prop: 'formatAmount'
        },
        {
          label: '签订日期',
          width: 150,
          showTooltip: true,
          prop: 'signDate'
        },
        {
          label: '归档日期',
          width: 150,
          prop: 'filingDate'
        },
        {
          label: '发起组织',
          showTooltip: true,
          prop: 'startOrgName'
        },
        {
          label: '生效状态',
          width: 100,
          prop: 'formatEffectiveState'
        },
        {
          label: '版本创建日期',
          width: 150,
          prop: 'createDate'
        },
        {
          label: '审批状态',
          width: 100,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeSupplyApprovalStatus(row)
              },
              on: {
                click: () => {
                  this.clickApprovalSatus(row.approvalProcessId, row)
                }
              }
            }, row.formatApprovalStatus)
          }
        }
      ]

    }
  },
  methods: {
    // 判断审批状态
    judeSupplyApprovalStatus({ approvalStatus }) {
      return approvalStatus !== '01'
    },
    // 判断结算状态
    judeSettlementState({ settlementState }) {
      return settlementState !== '01'
    },
    // 点击结算状态
    clickSettlementState(id, row) {
      if (!this.judeSettlementState(row)) return
      this.processId = id
      this.isShowDialog = true
    },
    // 点击审批状态
    clickApprovalSatus(id, row) {
      if (!this.judeSupplyApprovalStatus(row)) return
      this.processId = id
      this.isShowDialog = true
    },
    clickCurrentRow(type, value, row) {
      this.$emit('clickRow', {
        prop: type,
        value,
        row
      })
    }
  }
}
