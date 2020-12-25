<template>
  <!-- 分包合同主页面 -->

  <div class="design-contract-sub-contract">
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
import { handlerSearchBar } from '@core/utils'
import { mapGetters, mapActions } from 'vuex'
// openSettlement
import { openSettlement, handleDelete, handleRevokeEvent, openEdit } from '../../../../utils/settlement'
import {
  codeChangeName, formatMoney, parseTime
} from '@core/utils'
import {
  subContractPage
} from '@core/api/contractManage/contractmanager'
export default {
  name: 'SubContratMain',
  components: {
    SearchBar,
    CommTable,
    countDialog: () =>
      import(
        /*  webpackChunkName: "my-chunk-name" */ '../../components/ClearDialog.vue'
      ),
    FlowDialog: () => import('../../../components/FlowDialog')
  },
  mixins: [search],
  props: {
    activeName: {
      default: 'labour',
      type: String
    }
  },
  data() {
    return {
      isShowFlowDialog: false,
      flowChartId: '',
      // 结算dialog需要逻辑
      countId: '', //
      countApprovalNo: '',
      settlementDate: '', // 结算日期
      settlementAmount: '', // 结算金额
      isReturn: false,
      market: '', // 备注回填
      // 结算dialog end
      loading: false,
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
          value: 'cooperateUnitId',
          searchType: 'cascader',
          name: '分包公司',
          selectOption: {
            expandTrigger: 'hover',
            selectOptions: { code: 'id', name: 'name', children: 'list' }
          }
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
              power: 'desSubpackage:add',
              on: () => {
                this.handleAddContract()
              },
              icon: 'icon-xinzeng1-copy'
            },
            {
              name: '修改',
              power: 'desSubpackage:edit',
              on: () => {
                this.editContract()
              },
              icon: 'icon-xiugai-copy'
            },
            {
              name: '删除',
              power: 'desSubpackage:delete',
              on: () => {
                this.deleteContract()
              },
              icon: 'icon-icon7-copy'
            },
            {
              name: '版本查看',
              power: 'desSubpackage:edition',
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
              power: 'desSubpackage:settle',
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
              power: 'desSubpackage:revoke',
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
          width: 150,
          fixed: 'left',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '合同编号',
          prop: 'contractNumber',
          width: 150,
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '合同状态',
          showTooltip: true,
          prop: 'state',
          width: 180,
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
          label: '分包公司',
          width: 160,
          prop: 'cooperateUnitName',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '合同金额',
          width: 160,
          prop: 'amount',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '结算金额',
          width: 160,
          showTooltip: true,
          prop: 'settlementAmount',
          sortable: 'custom'
        },
        {
          label: '签订日期',
          width: 160,
          showTooltip: true,
          prop: 'signDate',
          sortable: 'custom'
        },
        {
          label: '归档日期',
          width: 160,
          showTooltip: true,
          prop: 'filingDate',
          sortable: 'custom'
        },
        {
          label: '发起组织',
          prop: 'startOrgName',
          showTooltip: true,
          width: 150,
          sortable: 'custom'
        },
        {
          label: '生效状态',
          width: 140,
          showTooltip: true,
          fixed: 'right',
          prop: 'effectiveState',
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
          showTooltip: true,
          fixed: 'right',
          width: 150,
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
          showTooltip: true,
          fixed: 'right',
          sortable: 'custom',
          width: 140,
          prop: 'settlementState',
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
          }
        }
      ],
      tableData: [],
      total: 0,
      tableOptions: {
        maxHeight: 'calc( 100vh - 410px)',
        defaultSort: {
          order: 'descending',
          prop: 'contractNumber'
        }
      },
      isShowCountDialog: false
    }
  },
  computed: {
    ...mapGetters(['constant']),
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
    // 撤销
    async revocationContract() {
      if (!this.checkOnofTableData()) return
      const { approvalStatus, settlementState, approvalProcessId, settlementProcessId } = this.getMultipleSelection()
      const boolean = await handleRevokeEvent(approvalStatus, settlementState,
        approvalProcessId, settlementProcessId, 'contract')
      if (boolean) this.fetchData('qeury')
    },
    // 删除
    async deleteContract() {
      if (!this.checkOnofTableData()) return
      const row = this.getMultipleSelection()
      const boolean = await handleDelete(row.approvalStatus, row.id, 'sub')
      if (boolean) this.fetchData('qeury')
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
    async initDictionaries() {
      const dictionariesList = [
        'ApprovalStatus', // 审批状态
        'ContractSettleState', // 结算状态
        'contractState', // 合同状态
        // 'cooperatunitsList', // 分包公司
        {
          type: 'insideList',
          params: {
            contractId: this.contractId,
            subType: '04'
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
    // 处理金额
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
    getParams() {
      const defaultSort = {
        ascending: false,
        propertyName: 'contractNumber'
      }
      if (this.sortData) {
        if (this.sortData?.propertyName?.startsWith('format')) {
          this.sortData.propertyName = this.sortData.propertyName.slice(6)
        }
      }
      const formatParams = {
        page: this.page ? this.page - 1 : 0,
        size: this.size || 10,
        contractId: this.contractId,
        subType: '04', // 类型
        ...this.search, // old data
        // 格式化search中的 分包公司
        cooperateUnitId: this.search['cooperateUnitId'].length > 0 ? JSON.stringify(this.search['cooperateUnitId']) : '',
        ...(this.sortData || defaultSort)
      }
      // 处理金额
      this.formatMoney(formatParams)
      return formatParams
    },
    // 请求表格数据
    async fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const params = this.getParams()
      const { data: { content, total }} = await subContractPage(params)
      content.forEach(item => {
        item.formatEffectiveState = codeChangeName(this.constant.EffectiveState, item.effectiveState)
        item.formatState = codeChangeName(this.constant.contractState, item.state)
        item.formatApprovalStatus = codeChangeName(this.constant.ApprovalStatus, item.approvalStatus)
        item.formatSettlementState = codeChangeName(this.constant.ContractSettleState, item.settlementState)
        // 金额
        item.amount = item.amount ? formatMoney(item.amount) : '0.00'
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
    // 唯一性校验
    checkOnofTableData() {
      return this.$refs['table'].onlyOneData()
    },
    // 获得单选元素
    getMultipleSelection() {
      return this.$refs['table'].multipleSelection[0]
    },
    // 点击新增
    handleAddContract() {
      this.$emit('changeState', 'subInfo', {
        type: 'add'
      })
    },
    // 点击修改
    async editContract() {
      if (!this.checkOnofTableData()) return
      const row = this.getMultipleSelection()
      // 判断是否可以修改
      const boolean = await openEdit(row)
      if (boolean) {
        this.$emit('changeState', 'subInfo', {
          type: 'edit',
          row
        })
      }
    },
    // 版本查看
    lookContract() {
      if (!this.checkOnofTableData()) return
      const row = this.getMultipleSelection()
      this.$emit('changeState', 'subVersion', {
        row
      })
    },
    // 判断审批状态超链接
    judeApprovalStatus({ approvalStatus }) {
      // 不等于草稿状态的话是超链接
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
    // 判断结算状态
    judeApprovalSettlementState({ settlementState }) {
      return settlementState !== '01'
    },
    // 判断是否是超链接
    judeHyperlink(row) {
      return Math.random() * 100 > 50
    },
    // 点击name
    clickContractName(row) {
      this.$emit('changeState', 'subDetail', {
        type: 'details',
        row
      })
    },
    changeSearch(params) {
      if (!this._validateMoney(params)) return
      // 判断金额
      this.search = {
        ...this.search,
        ...params
      }
      this.fetchData('query')
    }
  }
}
</script>

<style lang='less' scoped>
.design-contract-sub-contract{
  .el-table__body-wrapper {
    max-height: calc( 100vh - 410px);
  }
}
</style>
