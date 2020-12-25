<template>
  <!-- 其他合同主页面 -->
  <div class="design-other-contract">
    <search-bar
      :select-list="selectList"
      :btn-list="btnList"
      :search="search"
      @changeSearch="changeSearch"
    />
    <comm-table
      ref="table"
      v-loading="loading"
      :columns="columns"
      :data="tableData"
      :table-options="tableOptions"
      :count="total"
    />
    <!-- 结算dialog -->
    <count-dialog
      v-if="isShowCountDialog"
      :id="countId"
      type="sub"
      :is-return="isReturn"
      :count-date="settlementDate"
      :amount="settlementAmount"
      :market="market"
      :down-load-id="countApprovalNo"
      :show.sync="isShowCountDialog"
      @referTable="referTable"
    />

    <!-- 流程dialog -->
    <flow-dialog v-if="isShowFlowDialog" :id="flowChartId" :show.sync="isShowFlowDialog" />

  </div>
</template>

<script>
import SearchBar from '@framesDash/components/SearchBar'
import CommTable from '@framesDash/components/CommTable'
import search from '@core/mixins/search'
import { subContractPage } from '@core/api/contractManage/contractmanager'
import { codeChangeName, formatMoney, parseTime } from '@core/utils'
import CountDialog from '../.././components/ClearDialog.vue'
import { handlerSearchBar } from '@core/utils'
import { mapGetters, mapActions } from 'vuex'
import { openSettlement, handleDelete, handleRevokeEvent, openEdit } from '../../../../utils/settlement'

export default {
  name: 'OtherContract',
  components: {
    SearchBar,
    CommTable,
    CountDialog,
    FlowDialog: () => import('../../../components/FlowDialog')
  },
  mixins: [search],
  data() {
    return {
      // 结算dialog
      isShowCountDialog: false,
      countId: '',
      isReturn: false,
      settlementDate: '',
      settlementAmount: '',
      market: '',
      countApprovalNo: '',
      // 结算dialog end
      // 流程dialog
      isShowFlowDialog: false,
      flowChartId: '',
      // 流程dialog结束
      loading: false,
      tableOptions: {
        maxHeight: 'calc( 100vh - 410px)',
        defaultSort: {
          order: 'descending',
          prop: 'contractNumber'
        }
      },
      selectList: [
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
          value: 'moneyBefore,moneyAfter',
          searchType: 'rangeInput',
          name: '合同金额'
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
      btnList: [
        {
          children: [
            {
              name: '新增',
              power: 'desOther:add',
              on: () => {
                this.handleAddContract()
              },
              icon: 'icon-xinzeng1-copy'
            },
            {
              name: '修改',
              power: 'desOther:edit',
              on: () => {
                this.editContract()
              },
              icon: 'icon-xiugai-copy'
            },
            {
              name: '删除',
              power: 'desOther:delete',
              on: () => {
                this.deleteContract()
              },
              icon: 'icon-icon7-copy'
            },
            {
              name: '版本查看',
              power: 'desOther:edition',
              on: () => {
                this.lookContract()
              },
              icon: 'icon-banbenchakan'
            }
          ]
        },
        {
          children: [
            {
              name: '结算',
              power: 'desOther:settle',
              on: () => {
                this.countContract()
              },
              icon: 'icon-jiesuan'
            }
          ]
        },
        {
          children: [
            {
              name: '撤销',
              power: 'desOther:revoke',
              on: () => {
                this.revocationContract()
              },
              icon: 'icon-chexiao'
            }
          ]
        }
      ],
      columns: [
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
          prop: 'approvalNo',
          showTooltip: true,
          width: 150,
          fixed: 'left',
          sortable: 'custom'
        },
        {
          label: '合同编号',
          width: 150,
          prop: 'contractNumber',
          sortable: 'custom',
          showTooltip: true
        },
        {
          label: '合同状态',
          width: 140,
          prop: 'state',
          sortable: 'custom',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatState)
          }
        },
        {
          label: '合同名称',
          showTooltip: true,
          width: 200,
          prop: 'name',
          sortable: 'custom',
          render: (h, row) => {
            return h(
              'span',
              {
                class: {
                  'table-click-color': true
                },
                on: {
                  click: () => {
                    this.clickContractName(row)
                  }
                }
              },
              row.name
            )
          }
        },
        {
          label: '签订单位',
          width: 150,
          showTooltip: true,
          prop: 'signUnitName',
          sortable: 'custom'
        },
        {
          label: '合同金额',
          prop: 'amount',
          width: 140,
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '结算金额',
          width: 140,
          showTooltip: true,
          prop: 'settlementAmount',
          sortable: 'custom'
        },
        {
          label: '签订日期',
          prop: 'signDate',
          width: 140,
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '归档日期',
          prop: 'filingDate',
          width: 140,
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '发起组织',
          showTooltip: true,
          width: 150,
          prop: 'startOrgName',
          sortable: 'custom'
        },
        {
          label: '生效状态',
          width: 140,
          fixed: 'right',
          prop: 'effectiveState',
          showTooltip: true,
          sortable: 'custom',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatEffectiveState)
          }
        },
        {
          label: '审批状态',
          fixed: 'right',
          showTooltip: true,
          width: 140,
          prop: 'approvalStatus',
          render: (h, row) => {
            return h(
              'span',
              {
                class: {
                  'table-click-color': this.judeApprovalStatus(row)
                },
                on: {
                  click: () => {
                    this.triggerClickAuditStatus(row)
                  }
                }
              },
              row.formatApprovalStatus
            )
          },
          sortable: 'custom'
        },
        {
          label: '结算状态',
          fixed: 'right',
          showTooltip: true,
          prop: 'settlementState',
          width: 140,
          render: (h, row) => {
            return h(
              'span',
              {
                class: {
                  'table-click-color': this.judeApprovalSettlementState(row)
                },
                on: {
                  click: () => {
                    this.triggerClickClearStatus(row)
                  }
                }
              },
              row.formatSettlementState
            )
          },
          sortable: 'custom'
        }
      ],
      total: 0,
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['constant']),
    // 内部合同中挂载的主合同Id
    contractId() {
      return this.$route.query.id
    }
  },
  created() {
    this.initDictionaries()
    this.fetchData()
  },
  methods: {
    ...mapActions(['getConstant']),
    // 判断结算状态
    judeApprovalSettlementState({ settlementState }) {
      return settlementState !== '01'
    },
    // 判断审批状态超链接
    judeApprovalStatus({ approvalStatus }) {
      // 不等于草稿状态的话是超链接
      return approvalStatus !== '01'
    },
    // 点击结算状态
    triggerClickClearStatus({ settlementProcessId, settlementState }) {
      if (!this.judeSettlementStatus({ settlementState })) return
      this.flowChartId = settlementProcessId
      this.isShowFlowDialog = true
    },
    // 点击审批状态
    triggerClickAuditStatus({ approvalProcessId, approvalStatus }) {
      if (!this.judeApprovalStatus({ approvalStatus })) return
      this.flowChartId = approvalProcessId
      this.isShowFlowDialog = true
    },
    getParams() {
      const defaultSort = {
        ascending: false,
        propertyName: 'contractNumber'
      }
      if (this.sortData) {
        if (this.sortData.propertyName?.startsWith('format')) {
          this.sortData.propertyName = this.sortData.propertyName.slice(6)
        }
      }
      const formatParams = {
        page: this.page ? this.page - 1 : 0,
        size: this.size || 10,
        contractId: this.contractId, // 当前合同Id
        subType: '06', // 类型
        ...this.search,
        ...(this.sortData || defaultSort)
      }
      // 处理金额
      this.formatMoney(formatParams)
      return formatParams
    },
    // 格式化金额
    formatMoney(obj) {
      const { moneyBefore = '', moneyAfter = '' } = obj
      obj['amount'] = {
        after: moneyBefore,
        before: moneyAfter
      }
      if (Reflect.has(obj, 'moneyBefore,moneyAfter')) {
        delete obj['moneyBefore,moneyAfter']
      } else {
        delete obj['moneyBefore']
        delete obj['moneyAfter']
      }
    },
    _validateMoney({ moneyBefore = 0, moneyAfter = 0 }) {
      const reg = /(^(([1-9]([0-9]+)?)|(0{1}))(\.[0-9]{1,2})?$)/
      const before = moneyBefore === '' ? 0 : moneyBefore
      const after = moneyAfter === '' ? 0 : moneyAfter
      if (parseFloat(before).toString() === 'NaN' || parseFloat(after).toString() === 'NaN') {
        this.$message.warning('请输入正确数字范围')
        return false
      }
      if (reg.test(before) && reg.test(after)) {
        return true
      } else {
        this.$message.warning('请输入正确数字金额')
        return false
      }
    },
    changeSearch(params) {
      if (!this._validateMoney(params)) return
      // 判断金额
      this.search = {
        ...this.search,
        ...params
      }
      this.fetchData('query')
    },
    // 请求table
    async fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const params = this.getParams()
      const { data: { content, total }} = await subContractPage(params)
      content.forEach(item => {
        // 审批状态
        item.formatApprovalStatus = codeChangeName(this.constant.ApprovalStatus, item.approvalStatus)
        // 结算状态
        item.formatSettlementState = codeChangeName(this.constant.ContractSettleState, item.settlementState)
        // 合同状态
        item.formatState = codeChangeName(this.constant.contractState, item.state)
        // 生效状态
        item.formatEffectiveState = codeChangeName(this.constant.EffectiveState, item.effectiveState)
        // 金额
        item.amount = formatMoney(item.amount)
        item.settlementAmount = item.settlementAmount ? formatMoney(item.settlementAmount) : ''
        // 日期
        item.signDate = parseTime(item.signDate, 'y-m-d')
        item.filingDate = parseTime(item.filingDate, 'y-m-d')
      })
      this.tableData = content
      this.total = total
      this.loading = false
      this.$refs['table'].multipleSelection = []
    },
    // 字典
    async initDictionaries() {
      const dictionariesList = [
        'ApprovalStatus', // 审批状态
        'ContractSettleState', // 结算状态
        'contractState', // 合同状态
        'EffectiveState', // 生效状态
        {
          type: 'insideList',
          params: {
            contractId: this.contractId,
            subType: '06'
          }
        }
      ]
      await this.getConstant(dictionariesList)
      const {
        insideList,
        ApprovalStatus,
        ContractSettleState,
        cooperatunitsList
      } = this.constant
      this.selectList = handlerSearchBar(
        this.selectList,
        [1, 2, 4, 5],
        [insideList, cooperatunitsList, ApprovalStatus, ContractSettleState]
      )
    },
    // 唯一性校验
    checkOnofTableData() {
      return this.$refs['table'].onlyOneData()
    },
    // 获得单选元素
    getMultipleSelection() {
      return this.$refs['table'].multipleSelection[0]
    },
    // 新增
    handleAddContract() {
      this.$emit('changeState', 'otherInfo', {
        type: 'add'
      })
    },
    // 修改
    async editContract() {
      if (!this.checkOnofTableData()) return
      const row = this.getMultipleSelection()
      const boolean = await openEdit(row)
      if (boolean) {
        this.$emit('changeState', 'otherInfo', {
          type: 'edit',
          row
        })
      }
    },
    // 删除
    async deleteContract() {
      if (!this.checkOnofTableData()) return
      const row = this.getMultipleSelection()
      const boolean = await handleDelete(row.approvalStatus, row.id, 'sub')
      if (boolean) this.fetchData('qeury')
    },
    // 版本查看
    lookContract() {
      if (!this.checkOnofTableData()) return
      const row = this.getMultipleSelection()
      this.$emit('changeState', 'otherVersion', {
        row
      })
    },
    // 结算
    async countContract() {
      if (!this.checkOnofTableData()) return
      const { approvalNo, id, approvalStatus, settlementState, settlementDate, remark, settlementAmount, settlementProcessId } = this.getMultipleSelection()
      const { done, returnData, refer = false } = await openSettlement(approvalStatus, settlementState, settlementProcessId, 'sub')
      if (!done) return
      if (refer) this.fetchData('query')
      if (returnData) {
        this.isReturn = returnData
        this.settlementDate = settlementDate // 结算日期回填
        this.market = remark // 备注回填
        this.settlementAmount = settlementAmount
      }
      this.countId = id // 当前Id
      this.countApprovalNo = approvalNo // 当前审批单号
      this.isShowCountDialog = true
    },
    // 撤销
    async revocationContract() {
      if (!this.checkOnofTableData()) return
      const { approvalStatus, settlementState, approvalProcessId, settlementProcessId } = this.getMultipleSelection()
      const boolean = await handleRevokeEvent(approvalStatus, settlementState,
        approvalProcessId, settlementProcessId, 'contract')
      if (boolean) this.fetchData('qeury')
    },
    // 点击合同名称
    clickContractName(row) {
      this.$emit('changeState', 'otherDetail', {
        type: 'details',
        row
      })
    }
  }
}
</script>

<style lang='less'>
.design-other-contract{
  .el-table__body-wrapper {
    max-height: calc( 100vh - 410px);
  }
}
</style>
