export default {
  data() {
    return {
      selectList: [{
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
        value: 'type',
        searchType: 'select',
        name: '合同类型',
        selectData: []
      },
      {
        value: 'state',
        searchType: 'select',
        name: '合同状态',
        selectData: []
      },
      {
        value: 'signUnitName',
        searchType: 'input',
        name: '签订单位'
      },
      {
        value: 'moneyBefore,moneyAfter',
        searchType: 'rangeInput',
        name: '合同金额'
      },
      {
        value: 'handlingOrgId',
        searchType: 'cascader',
        name: '经办组织',
        selectOption: {
          expandTrigger: 'hover',
          value: 'id',
          label: 'orgName'
        },
        selectData: []
      },
      {
        value: 'filingDateBetween',
        searchType: 'pickerDate',
        name: '归档日期'
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
      btnList: [{
        children: [{
          name: '新增',
          power: 'contractInput:add',
          on: () => {
            this.handleAddContract()
          },
          icon: 'icon-xinzeng1-copy'
        },
        {
          name: '修改',
          power: 'contractInput:edit',
          on: () => {
            this.editContract()
          },
          icon: 'icon-xiugai-copy'
        },
        {
          name: '删除',
          power: 'contractInput:delete',
          on: () => {
            this.deleteContract()
          },
          icon: 'icon-icon7-copy'
        },
        {
          name: '版本查看',
          power: 'contractInput:edition',
          on: () => {
            this.lookContract()
          },
          icon: 'icon-banbenchakan'
        }
        ]
      },
      {
        children: [{
          name: '结算',
          power: 'contractInput:settle',
          on: () => {
            this.countContract()
          },
          icon: 'icon-jiesuan'
        }]
      },
      {
        children: [{
          name: '撤销',
          power: 'contractInput:revoke',
          on: () => {
            this.revocationContract()
          },
          icon: 'icon-chexiao'
        }]
      }
      ],
      columns: [{
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
        prop: 'approvalNo',
        showTooltip: true,
        width: 160,
        sortable: 'custom',
        fixed: 'left'
      },
      {
        label: '合同编号',
        prop: 'contractNumber',
        showTooltip: true,
        sortable: 'custom',
        width: 150
      },
      {
        label: '合同名称',
        sortable: 'custom',
        prop: 'name',
        showTooltip: true,
        width: 200,
        render: (h, row) => {
          return h('span', {
            class: {
              'table-click-color': true
            },
            on: {
              click: () => {
                this.contractType(row)
              }
            }
          }, row.name)
        }
      },
      {
        label: '合同类型',
        prop: 'formatType',
        sortable: 'custom',
        width: 100
      },
      {
        label: '合同状态',
        prop: 'formatState',
        sortable: 'custom',
        width: 100
      },
      {
        label: '归属单位',
        prop: 'belongOrgName',
        sortable: 'custom',
        showTooltip: true,
        width: 150
      },
      {
        label: '签订单位',
        showTooltip: true,
        prop: 'signUnitName',
        sortable: 'custom',
        width: 100
      },
      {
        label: '合同金额',
        prop: 'amount',
        showTooltip: true,
        sortable: 'custom',
        width: 120
      },
      {
        label: '结算金额',
        showTooltip: true,
        prop: 'settlementAmount',
        sortable: 'custom',
        width: 120
      },
      {
        label: '签订日期',
        prop: 'signDate',
        sortable: 'custom',
        width: 100
      },
      {
        label: '归档日期',
        prop: 'filingDate',
        sortable: 'custom',
        width: 100
      },
      {
        label: '经办组织',
        prop: 'handlingOrgName',
        sortable: 'custom',
        showTooltip: true,
        width: 150
      },
      {
        label: '发起组织',
        prop: 'startOrgName',
        sortable: 'custom',
        showTooltip: true,
        width: 150
      },
      {
        label: '生效状态',
        prop: 'formatEffectiveState',
        sortable: 'custom',
        width: 100,
        fixed: 'right'
      },
      {
        label: '审批状态',
        prop: 'approvalStatus',
        render: (h, row) => {
          return h('span', {
            class: {
              'table-click-color': this.judeApprovalStatus(row)
            },
            on: {
              click: () => {
                this.triggerClickAuditStatus(row)
              }
            }
          }, row.formatApprovalStatus)
        },
        sortable: 'custom',
        width: 100,
        fixed: 'right'
      },
      {
        label: '结算状态',
        prop: 'settlementState',
        width: 120,
        sortable: 'custom',
        fixed: 'right',
        render: (h, row) => {
          return h('span', {
            class: {
              'table-click-color': this.judeSettlementStatus(row)
            },
            on: {
              click: () => {
                this.triggerClickClearStatus(row)
              }
            }
          }, row.formatSettlementState)
        }
      }
      ]
    }
  },
  methods: {
    // 审批状态超链接判断
    judeApprovalStatus({ approvalStatus }) {
      return approvalStatus !== '01'
    },
    // 点击审批状态
    triggerClickAuditStatus({ approvalProcessId, approvalStatus }) {
      if (!this.judeApprovalStatus({ approvalStatus })) return
      this.flowChartId = approvalProcessId
      this.isShowFlowDialog = true
    },
    // 结算状态超链接判断
    judeSettlementStatus({ settlementState }) {
      return settlementState !== '01'
    },
    // 点击结算状态
    triggerClickClearStatus({ settlementProcessId, settlementState }) {
      if (!this.judeSettlementStatus({ settlementState })) return
      this.flowChartId = settlementProcessId
      this.isShowFlowDialog = true
    },
    contractType(row) {
      const {
        type, id, name, constructionUnit, hasSubcontract, settlementState
      } = row
      sessionStorage.setItem('constructionUnit', constructionUnit)
      switch (type) {
        case '01':
          this.$router.push({
            name: 'engineerDetail',
            query: {
              id,
              name,
              hasSub: hasSubcontract,
              settlementState
            }
          })
          break
        case '02':
          this.$router.push({
            name: 'designDetail',
            query: {
              id,
              name,
              hasSub: hasSubcontract,
              settlementState
            }
          })
          break
        case '03':
          this.$router.push({
            name: 'officeDetail',
            query: {
              id,
              name,
              hasSub: hasSubcontract
            }
          })
          break
        case '04':
          this.$router.push({
            name: 'otherDetail',
            query: {
              id,
              name,
              hasSub: hasSubcontract
            }
          })
          break
        default:
          break
      }
    }
  }
}
