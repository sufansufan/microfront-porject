export default {
  data() {
    return {
      labourList: [
        {
          value: 'contractNumber',
          searchType: 'input',
          name: '合同编号'
        },
        {
          value: 'subSubType',
          searchType: 'select',
          name: '合同类型',
          selectData: []
        },
        {
          value: 'id',
          searchType: 'select',
          name: '合同名称',
          selectData: [],
          selectOption: {
            custom: true,
            value: 'id',
            label: 'name',
            customLeft: 'name',
            customRight: 'contractNumber'
          }
        },
        {
          value: 'cooperateUnitId',
          searchType: 'cascader',
          name: '劳务公司',
          selectOption: {
            expandTrigger: 'hover',
            value: 'id',
            label: 'name'
          },
          selectData: []
        },

        {
          value: 'moneyAfter,moneyBefore',
          searchType: 'rangeInput',
          name: '合同金额',
          selectData: []
        },

        {
          value: 'approvalStatus',
          searchType: 'select',
          name: '审批状态',
          selectData: []
        },
        {
          value: 'settlementState',
          searchType: 'select',
          name: '结算状态',
          selectData: []
        }
      ],
      purchaseList: [
        {
          value: 'contractNumber',
          searchType: 'input',
          name: '合同编号'
        },
        {
          value: 'subSubType',
          searchType: 'select',
          name: '合同类型',
          selectData: []
        },
        {
          value: 'id',
          searchType: 'select',
          name: '合同名称',
          selectData: [],
          selectOption: {
            custom: true,
            value: 'id',
            label: 'name',
            customLeft: 'name',
            customRight: 'contractNumber'
          }
        },
        {
          value: 'cooperateUnitId',
          searchType: 'cascader',
          name: '供应商',
          selectOption: {
            expandTrigger: 'hover',
            value: 'id',
            label: 'name'
          },
          selectData: []
        },
        {
          value: 'moneyAfter,moneyBefore',
          searchType: 'rangeInput',
          name: '合同金额',
          selectData: []
        },

        {
          value: 'approvalStatus',
          searchType: 'select',
          name: '审批状态',
          selectData: []
        },
        {
          value: 'settlementState',
          searchType: 'select',
          name: '结算状态',
          selectData: []
        }
      ],
      mechanicsList: [
        {
          value: 'contractNumber',
          searchType: 'input',
          name: '合同编号'
        },

        {
          value: 'id',
          searchType: 'select',
          name: '合同名称',
          selectData: [],
          selectOption: {
            custom: true,
            value: 'id',
            label: 'name',
            customLeft: 'name',
            customRight: 'contractNumber'
          }
        },
        {
          value: 'cooperateUnitId',
          searchType: 'cascader',
          name: '租赁公司',
          selectOption: {
            expandTrigger: 'hover',
            value: 'id',
            label: 'name'
          },
          selectData: []
        },
        {
          value: 'moneyAfter,moneyBefore',
          searchType: 'rangeInput',
          name: '合同金额',
          selectData: []
        },

        {
          value: 'approvalStatus',
          searchType: 'select',
          name: '审批状态',
          selectData: []
        },
        {
          value: 'settlementState',
          searchType: 'select',
          name: '结算状态',
          selectData: []
        }
      ],
      subpackageList: [
        {
          value: 'contractNumber',
          searchType: 'input',
          name: '合同编号'
        },
        {
          value: 'subSubType',
          searchType: 'select',
          name: '分包方式',
          selectData: []
        },

        {
          value: 'id',
          searchType: 'select',
          name: '合同名称',
          selectData: [],
          selectOption: {
            custom: true,
            value: 'id',
            label: 'name',
            customLeft: 'name',
            customRight: 'contractNumber'
          }
        },
        {
          value: 'cooperateUnitId',
          searchType: 'cascader',
          name: '分包公司',
          selectOption: {
            expandTrigger: 'hover',
            value: 'id',
            label: 'name'
          },
          selectData: []
        },
        {
          value: 'moneyAfter,moneyBefore',
          searchType: 'rangeInput',
          name: '合同金额',
          selectData: []
        },

        {
          value: 'approvalStatus',
          searchType: 'select',
          name: '审批状态',
          selectData: []
        },
        {
          value: 'settlementState',
          searchType: 'select',
          name: '结算状态',
          selectData: []
        }
      ],
      engineeinsureList: [
        {
          value: 'contractNumber',
          searchType: 'input',
          name: '合同编号'
        },

        {
          value: 'subType',
          searchType: 'select',
          name: '合同类型',
          selectData: []
        },
        {
          value: 'id',
          searchType: 'select',
          name: '合同名称',
          selectData: [],
          selectOption: {
            custom: true,
            value: 'id',
            label: 'name',
            customLeft: 'name',
            customRight: 'contractNumber'
          }
        },
        {
          value: 'signUnitName',
          searchType: 'input',
          name: '保险人'
        },
        {
          value: 'moneyAfter,moneyBefore',
          searchType: 'rangeInput',
          name: '合同金额(保费)',
          selectData: []
        },
        {
          value: 'produceStatus',
          searchType: 'select',
          name: '审批状态',
          selectData: []
        },
        {
          value: 'approvalStatus',
          searchType: 'select',
          name: '结算状态',
          selectData: []
        }
      ],
      otherList: [
        {
          value: 'contractNumber',
          searchType: 'input',
          name: '合同编号'
        },
        {
          value: 'id',
          searchType: 'select',
          name: '合同名称',
          selectData: [],
          selectOption: {
            custom: true,
            value: 'id',
            label: 'name',
            customLeft: 'name',
            customRight: 'contractNumber'
          }
        },
        {
          value: 'signUnitName',
          searchType: 'input',
          name: '签订单位'
        },
        {
          value: 'moneyAfter,moneyBefore',
          searchType: 'rangeInput',
          name: '合同金额',
          selectData: []
        },

        {
          value: 'approvalStatus',
          searchType: 'select',
          name: '审批状态',
          selectData: []
        },
        {
          value: 'settlementState',
          searchType: 'select',
          name: '结算状态',
          selectData: []
        }
      ],
      publicbtnList: [],
      laborColumns: [
        { type: 'selection', single: true },
        { label: '序号', index: true, fixed: 'left' },
        { label: '审批单号', prop: 'approvalNo', sortable: 'custom', width: 160, fixed: 'left' },
        { label: '合同编号', prop: 'contractNumber', sortable: 'custom', width: 150, showTooltip: true },
        { label: '合同类型', prop: 'subSubType', sortable: 'custom', width: 120,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatSubSubTypeOne)
          }
        },
        { label: '合同状态', prop: 'state', sortable: 'custom', width: 120,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatState)
          }
        },
        { label: '合同名称',
          sortable: 'custom',
          showTooltip: true,
          width: 200,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.orgJump('details', row)
                }
              }
            }, row.name)
          }
        },
        { label: '劳务公司', prop: 'cooperateUnitName', sortable: 'custom', width: 160, showTooltip: true },
        { label: '合同金额', prop: 'amount', sortable: 'custom', width: 120 },
        { label: '结算金额', prop: 'settlementAmount', sortable: 'custom', width: 120 },
        { label: '签订日期', prop: 'signDate', sortable: 'custom', width: 120 },
        { label: '归档日期', prop: 'filingDate', sortable: 'custom', width: 120 },
        { label: '发起组织', prop: 'startOrgName', sortable: 'custom', width: 160, showTooltip: true },
        { label: '生效状态', prop: 'effectiveState', width: 120, sortable: 'custom', fixed: 'right',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatEffectiveState)
          }

        },
        { label: '审批状态', sortable: 'custom', prop: 'approvalStatus', width: 120, fixed: 'right',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeApprovalStatus(row)
              },
              on: {
                click: () => {
                  this.hanldeApproval(row)
                }
              }
            }, row.formatApprovalStatus)
          }
        },
        { label: '结算状态',
          fixed: 'right',
          width: 120,
          prop: 'settlementState',
          sortable: 'custom',
          showTooltip: true,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeSettlementStatus(row)
              },
              on: {
                click: () => {
                  this.hanldeSettlement(row)
                }
              }
            }, row.formatSettlementState)
          }
        }
      ],
      purchaseColumns: [
        { type: 'selection', single: true },
        { label: '序号', index: true, fixed: 'left' },
        { label: '审批单号', prop: 'approvalNo', sortable: 'custom', width: 160, fixed: 'left' },
        { label: '合同编号', prop: 'contractNumber', sortable: 'custom', width: 150, showTooltip: true },
        { label: '合同类型', prop: 'subSubType', sortable: 'custom', width: 120, showTooltip: true,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatSubSubTypeTwo)
          }
        },
        { label: '合同状态', prop: 'state', sortable: 'custom', width: 120,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatState)
          }
        },
        { label: '合同名称',
          showTooltip: true,
          width: 200,
          sortable: 'custom',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.orgJump('details', row)
                }
              }
            }, row.name)
          }
        },
        { label: '供应商', width: 160, prop: 'cooperateUnitName', sortable: 'custom', showTooltip: true },
        { label: '合同金额', prop: 'amount', sortable: 'custom', width: 120 },
        { label: '结算金额', prop: 'settlementAmount', sortable: 'custom', width: 120 },
        { label: '质保期(月)', prop: 'guaranteePeriod', sortable: 'custom', width: 120 },
        { label: '签订日期', prop: 'signDate', sortable: 'custom', width: 120 },
        { label: '归档日期', prop: 'filingDate', sortable: 'custom', width: 120 },
        { label: '发起组织', prop: 'startOrgName', sortable: 'custom', width: 160, showTooltip: true },
        { label: '生效状态', prop: 'effectiveState', sortable: 'custom', width: 120, fixed: 'right',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatEffectiveState)
          }
        },
        { label: '审批状态', sortable: 'custom', prop: 'approvalStatus', width: 120, fixed: 'right',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeApprovalStatus(row)
              },
              on: {
                click: () => {
                  this.hanldeApproval(row)
                }
              }
            }, row.formatApprovalStatus)
          }
        },
        { label: '结算状态', sortable: 'custom', prop: 'settlementState', width: 120, fixed: 'right',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeSettlementStatus(row)
              },
              on: {
                click: () => {
                  this.hanldeSettlement(row)
                }
              }
            }, row.formatSettlementState)
          }
        }
      ],
      mechanicsColumns: [
        { type: 'selection', single: true },
        { label: '序号', index: true, fixed: 'left' },
        { label: '审批单号', prop: 'approvalNo', sortable: 'custom', width: 160, fixed: 'left' },
        { label: '合同编号', prop: 'contractNumber', sortable: 'custom', width: 150, showTooltip: true },
        { label: '合同状态', prop: 'state', sortable: 'custom', width: 120,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatState)
          }
        },
        { label: '合同名称',
          sortable: 'custom',
          width: 200,
          showTooltip: true,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.orgJump('details', row)
                }
              }
            }, row.name)
          }
        },
        { label: '租赁公司', prop: 'cooperateUnitName', sortable: 'custom', width: 160, showTooltip: true },
        { label: '合同金额', prop: 'amount', sortable: 'custom', width: 120, showTooltip: true },
        { label: '结算金额', width: 120, prop: 'settlementAmount', sortable: 'custom', showTooltip: true },
        { label: '租赁押金', prop: 'rentMoney', sortable: 'custom', width: 120 },
        { label: '签订日期', prop: 'signDate', sortable: 'custom', width: 120 },
        { label: '归档日期', prop: 'filingDate', sortable: 'custom', width: 120 },
        { label: '发起组织', prop: 'startOrgName', sortable: 'custom', width: 160, showTooltip: true },
        { label: '生效状态', prop: 'effectiveState', sortable: 'custom', width: 120, fixed: 'right',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatEffectiveState)
          }

        },
        { label: '审批状态', sortable: 'custom', prop: 'approvalStatus', width: 120, fixed: 'right',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeApprovalStatus(row)
              },
              on: {
                click: () => {
                  this.hanldeApproval(row)
                }
              }
            }, row.formatApprovalStatus)
          }
        },
        { label: '结算状态', sortable: 'custom', width: 120, fixed: 'right', prop: 'settlementState',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeSettlementStatus(row)
              },
              on: {
                click: () => {
                  this.hanldeSettlement(row)
                }
              }
            }, row.formatSettlementState)
          }
        }
      ],
      subpackageColumns: [
        { type: 'selection', single: true },
        { label: '序号', index: true, fixed: 'left' },
        { label: '审批单号', prop: 'approvalNo', sortable: 'custom', width: 160, fixed: 'left' },
        { label: '合同编号', prop: 'contractNumber', sortable: 'custom', width: 150, showTooltip: true },
        { label: '分包方式', prop: 'subSubType', sortable: 'custom', width: 120,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatSubSubTypeOne)
          }
        },
        { label: '合同状态', prop: 'state', sortable: 'custom', width: 120,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatState)
          }
        },
        { label: '合同名称',
          sortable: 'custom',
          width: 200,
          showTooltip: true,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.orgJump('details', row)
                }
              }
            }, row.name)
          }
        },
        { label: '分包公司', prop: 'cooperateUnitName', sortable: 'custom', width: 160, showTooltip: true },
        { label: '合同金额', prop: 'amount', sortable: 'custom', width: 120 },
        { label: '结算金额', prop: 'settlementAmount', sortable: 'custom', width: 120 },
        { label: '绝对工期(天)', prop: 'absolutePeriod', sortable: 'custom', width: 120 },
        { label: '签订日期', prop: 'signDate', sortable: 'custom', width: 120 },
        { label: '归档日期', prop: 'filingDate', sortable: 'custom', width: 120 },
        { label: '发起组织', prop: 'startOrgName', sortable: 'custom', width: 160, showTooltip: true },
        { label: '生效状态', prop: 'effectiveState', sortable: 'custom', width: 120, fixed: 'right',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatEffectiveState)
          }
        },
        { label: '审批状态', sortable: 'custom', prop: 'approvalStatus', width: 120, fixed: 'right',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeApprovalStatus(row)
              },
              on: {
                click: () => {
                  this.hanldeApproval(row)
                }
              }
            }, row.formatApprovalStatus)
          }
        },
        { label: '结算状态', width: 120, sortable: 'custom', fixed: 'right', prop: 'settlementState',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeSettlementStatus(row)
              },
              on: {
                click: () => {
                  this.hanldeSettlement(row)
                }
              }
            }, row.formatSettlementState)
          }
        }
      ],
      engineeringColumns: [
        { type: 'selection', single: true },
        { label: '序号', index: true, fixed: 'left' },
        { label: '审批单号', prop: 'approvalNo', sortable: 'custom', width: 160, fixed: 'left' },
        { label: '合同编号', prop: 'contractNumber', sortable: 'custom', width: 150, showTooltip: true },
        { label: '合同类型', prop: 'subSubType', sortable: 'custom', width: 120,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatSubSubTypeThree)
          }
        },
        { label: '合同状态', prop: 'state', sortable: 'custom', width: 120,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatState)
          }

        },
        { label: '合同名称',
          sortable: 'custom',
          width: 200,
          showTooltip: true,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.orgJump('details', row)
                }
              }
            }, row.name)
          }
        },
        { label: '保险人', prop: 'signUnitName', sortable: 'custom', width: 120 },
        { label: '合同金额(保费)', prop: 'amount', sortable: 'custom', width: '140px' },
        { label: '保险金(万元)', prop: 'benefits', sortable: 'custom', width: 120 },
        { label: '保险有效期限', prop: 'insuranceTerm', sortable: 'custom', width: '120px;' },
        { label: '签订日期', prop: 'signDate', sortable: 'custom', width: 120 },
        { label: '归档日期', prop: 'filingDate', sortable: 'custom', width: 120 },
        { label: '发起组织', prop: 'startOrgName', sortable: 'custom', width: 160, showTooltip: true },
        { label: '生效状态', prop: 'effectiveState', sortable: 'custom', width: 120, fixed: 'right',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatEffectiveState)
          }
        },
        { label: '审批状态', sortable: 'custom', width: 120, fixed: 'right', prop: 'approvalStatus',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeApprovalStatus(row)
              },
              on: {
                click: () => {
                  this.hanldeApproval(row)
                }
              }
            }, row.formatApprovalStatus)
          }
        },
        { label: '结算状态', sortable: 'custom', width: 120, fixed: 'right', prop: 'settlementState',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeSettlementStatus(row)
              },
              on: {
                click: () => {
                  this.hanldeSettlement(row)
                }
              }
            }, row.formatSettlementState)
          }
        }
      ],
      otherColumns: [
        { type: 'selection', single: true },
        { label: '序号', index: true, fixed: 'left' },
        { label: '审批单号', prop: 'approvalNo', sortable: 'custom', width: 160, fixed: 'left' },
        { label: '合同编号', prop: 'contractNumber', sortable: 'custom', width: 140, showTooltip: true },
        { label: '合同状态', prop: 'state', sortable: 'custom', width: 140,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatState)
          }
        },
        { label: '合同名称',
          sortable: 'custom',
          showTooltip: true,
          width: 250,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.orgJump('details', row)
                }
              }
            }, row.name)
          }
        },
        { label: '签订单位', prop: 'signUnitName', sortable: 'custom', width: 150, showTooltip: true },
        { label: '合同金额', prop: 'amount', sortable: 'custom', width: 140 },
        { label: '结算金额', prop: 'settlementAmount', sortable: 'custom', width: 140 },
        { label: '签订日期', prop: 'signDate', sortable: 'custom', width: 140 },
        { label: '归档日期', prop: 'filingDate', sortable: 'custom', width: 140 },
        { label: '发起组织', prop: 'startOrgName', sortable: 'custom', width: 160, showTooltip: true },
        { label: '生效状态', prop: 'effectiveState', sortable: 'custom', width: 120, fixed: 'right',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatEffectiveState)
          }
        },
        { label: '审批状态', sortable: 'custom', width: 120, fixed: 'right', prop: 'approvalStatus',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeApprovalStatus(row)
              },
              on: {
                click: () => {
                  this.hanldeApproval(row)
                }
              }
            }, row.formatApprovalStatus)
          }
        },
        { label: '结算状态', sortable: 'custom', width: 120, fixed: 'right', prop: 'settlementState',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': this.judeSettlementStatus(row)
              },
              on: {
                click: () => {
                  this.hanldeSettlement(row)
                }
              }
            }, row.formatSettlementState)
          }
        }
      ]
    }
  },
  created() {
    var permissonList = []
    this.publicbtnList = []
    if (this.activeName === 'labour') {
      permissonList.push('labor:add', 'labor:edit', 'labor:delete', 'labor:edition', 'labor:settle', 'labor:revoke')
    } else if (this.activeName === 'purchase') {
      permissonList.push('purchase:add', 'purchase:edit', 'purchase:delete', 'purchase:edition', 'purchase:settle', 'purchase:revoke')
    } else if (this.activeName === 'mechanics') {
      permissonList.push('mechanics:add', 'mechanics:edit', 'mechanics:delete', 'mechanics:edition', 'mechanics:settle', 'mechanics:revoke')
    } else if (this.activeName === 'subpackage') {
      permissonList.push('subpackage:add', 'subpackage:edit', 'subpackage:delete', 'subpackage:edition', 'subpackage:settle', 'subpackage:revoke')
    } else if (this.activeName === 'engineeInsure') {
      permissonList.push('engineeInsure:add', 'engineeInsure:edit', 'engineeInsure:delete', 'engineeInsure:edition', 'engineeInsure:revoke')
    } else if (this.activeName === 'other') {
      permissonList.push('other:add', 'other:edit', 'other:delete', 'other:edition', 'other:settle', 'other:revoke')
    }
    this.publicbtnList = [
      {
        children: [
          { name: '新增', power: permissonList[0], on: () => { this.orgJump('add') }, icon: 'icon-xinzeng1-copy' },
          { name: '修改', power: permissonList[1], on: () => { this.orgJump('edit') }, icon: 'icon-xiugai-copy' },
          { name: '删除', power: permissonList[2], on: () => { this.deleteData() }, icon: 'icon-icon7-copy' },
          { name: '版本查看', power: permissonList[3], on: () => { this.orgJump('edition') }, icon: 'icon-banbenchakan' }
        ]
      }
    ]
    if (this.activeName === 'engineeInsure') {
      this.publicbtnList[1] = {
        children: [
          { name: '撤销', power: permissonList[4], on: () => { this.orgJump('revoke') }, icon: 'icon-chexiao' }
        ]
      }
    } else {
      this.publicbtnList.push(
        {
          children: [
            { name: '结算', power: permissonList[4], on: () => { this.orgJump('settlement') }, icon: 'icon-jiesuan' }
          ]
        },
        {
          children: [
            { name: '撤销', power: permissonList[5], on: () => { this.orgJump('revoke') }, icon: 'icon-chexiao' }
          ]
        }
      )
    }
  },
  methods: {
    // 判断审批状态超链接
    judeApprovalStatus({ approvalStatus }) {
      // 不等于草稿状态的话是超链接
      return approvalStatus !== '01'
    },
    // 点击审批状态
    hanldeApproval({ approvalProcessId, approvalStatus }) {
      if (!this.judeApprovalStatus({ approvalStatus })) return
      this.flowChartId = approvalProcessId
      this.isShowFlowDialog = true
    },
    // 判断结算状态
    judeSettlementStatus({ settlementState }) {
      return settlementState !== '01'
    },
    // 点击结算状态
    hanldeSettlement({ settlementProcessId, settlementState }) {
      if (!this.judeSettlementStatus({ settlementState })) return
      this.flowChartId = settlementProcessId
      this.isShowFlowDialog = true
    }
  }
}
