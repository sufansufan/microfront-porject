<template>
  <div class="public-list">
    <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch" />
    <comm-table ref="commTable" v-loading="loading" :single-selected="true" :table-options="tableOptions" :columns="columns" :data="tableData" :count="total" />
    <count-dialog
      v-if="isShowCountDialog"
      :id="countId"
      :is-return="isReturn"
      :count-date="settlementDate"
      :amount="settlementAmount"
      :market="market"
      type="sub"
      :down-load-id="countApprovalNo"
      :show.sync="isShowCountDialog"
      @referTable="referTable"
    />
    <!-- 流程dialog -->
    <flow-dialog v-if="isShowFlowDialog" :id="flowChartId" :show.sync="isShowFlowDialog" />
  </div>
</template>
<script>
import FlowDialog from '../../../components/FlowDialog.vue'
import SearchBar from '@framesDash/components/SearchBar'
import CommTable from '@framesDash/components/CommTable'
import { mapGetters } from 'vuex'
import { handlerSearchBar, codeChangeName, parseTime, formatMoney } from '@core/utils'
import search from '@core/mixins/search'
import countDialog from '../.././components/ClearDialog.vue'
import searchTableData from './searchTableData'
import componentType from '../../../mixins/componentType'
import { subContractPage } from '@core/api/contractManage/contractmanager'
import { openSettlement, handleRevokeEvent, handleDelete, openEdit } from '../../../../utils/settlement'
import { getSessionStorage } from '@core/utils/auth'
export default {
  components: {
    SearchBar,
    CommTable,
    countDialog,
    FlowDialog
  },
  mixins: [searchTableData, search, componentType],
  props: {
    activeName: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      loading: true,
      isShowCountDialog: false,
      // 结算dialog需要逻辑
      countId: '', //
      countApprovalNo: '',
      settlementDate: '', // 结算日期
      settlementAmount: '', // 结算金额
      isReturn: false,
      market: '', // 备注回填
      // 流程dialog
      isShowFlowDialog: false,
      flowChartId: '',
      tableOptions: {
        maxHeight: 'calc(100vh - 270px)',
        defaultSort: {
          prop: 'contractNumber',
          order: 'descending'
        }
      },
      selectList: [],
      btnList: [],
      columns: [],
      tableData: [],
      versionTotal: '',
      supplyTotal: ''
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    const insideListParams = {
      contractId: this.$route.query.id,
      subType: this.activeName === 'labour' ? '01' : this.activeName === 'purchase' ? '02' : this.activeName === 'mechanics' ? '03' : this.activeName === 'subpackage' ? '04' : this.activeName === 'engineeInsure' ? '07' : this.activeName === 'other' ? '06' : ''
    }

    this.$store.dispatch('getConstant', ['subSubTypeOne', 'subSubTypeTwo', 'contractState', 'ApprovalStatus', 'EffectiveState', 'subSubTypeThree', 'ContractSettleState', { type: 'insideList', params: insideListParams }, { type: 'cooperatunitsList', params: { orgId: getSessionStorage('rootOrgId') }}]).then(() => {
      const { subSubTypeOne, ApprovalStatus, ContractSettleState, subSubTypeTwo, subSubTypeThree, cooperatunitsList, insideList } = this.constant
      if (this.activeName === 'labour') {
        this.selectList = handlerSearchBar(this.selectList, [1, 2, 3, 5, 6], [subSubTypeOne, insideList, cooperatunitsList, ApprovalStatus, ContractSettleState])
      } else if (this.activeName === 'purchase') {
        this.selectList = handlerSearchBar(this.selectList, [1, 2, 3, 5, 6], [subSubTypeTwo, insideList, cooperatunitsList, ApprovalStatus, ContractSettleState])
      } else if (this.activeName === 'mechanics') {
        this.selectList = handlerSearchBar(this.selectList, [1, 2, 4, 5], [insideList, cooperatunitsList, ApprovalStatus, ContractSettleState])
      } else if (this.activeName === 'subpackage') {
        this.selectList = handlerSearchBar(this.selectList, [1, 2, 3, 5, 6], [subSubTypeOne, insideList, cooperatunitsList, ApprovalStatus, ContractSettleState])
      } else if (this.activeName === 'engineeInsure') {
        this.selectList = handlerSearchBar(this.selectList, [1, 2, 5, 6], [subSubTypeThree, insideList, ApprovalStatus, ContractSettleState])
      } else {
        this.selectList = handlerSearchBar(this.selectList, [1, 4, 5], [insideList, ApprovalStatus, ContractSettleState])
      }
    })
    if (this.activeName === 'labour') {
      this.selectList = this.labourList
      this.btnList = this.publicbtnList
      this.columns = this.laborColumns
    } else if (this.activeName === 'purchase') {
      this.selectList = this.purchaseList
      this.btnList = this.publicbtnList
      this.columns = this.purchaseColumns
    } else if (this.activeName === 'mechanics') {
      this.selectList = this.mechanicsList
      this.btnList = this.publicbtnList
      this.columns = this.mechanicsColumns
    } else if (this.activeName === 'subpackage') {
      this.selectList = this.subpackageList
      this.btnList = this.publicbtnList
      this.columns = this.subpackageColumns
    } else if (this.activeName === 'engineeInsure') {
      this.selectList = this.engineeinsureList
      this.btnList = this.publicbtnList
      this.columns = this.engineeringColumns
    } else {
      this.selectList = this.otherList
      this.btnList = this.publicbtnList
      this.columns = this.otherColumns
    }
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const { page, size, sortData } = this
      const { moneyAfter, moneyBefore, cooperateUnitId } = this.search
      const { id } = this.$route.query
      this.params = {
        page: page - 1 || 0,
        size: size || 10,
        ...this.search,
        propertyName: 'contractNumber',
        ascending: false,
        ...sortData,
        contractId: id,
        cooperateUnitId: cooperateUnitId ? cooperateUnitId.toString() : '',
        subType: this.activeName === 'labour' ? '01' : this.activeName === 'purchase' ? '02' : this.activeName === 'mechanics' ? '03' : this.activeName === 'subpackage' ? '04' : this.activeName === 'engineeInsure' ? '07' : this.activeName === 'other' ? '06' : '',
        amount: {
          after: moneyAfter,
          before: moneyBefore
        }
      }
      delete this.params.moneyAfter
      delete this.params.moneyBefore
      subContractPage(this.params).then(({ data: { content, total }}) => {
        this.loading = false
        this.total = total
        this.tableData = content
        this.tableData.map(item => {
          if (item.subType) {
            if (item.subType === '01' || item.subType === '04') {
              item.formatSubSubTypeOne = codeChangeName(this.constant.subSubTypeOne, item.subSubType)
            } else if (item.subType === '02') {
              item.formatSubSubTypeTwo = codeChangeName(this.constant.subSubTypeTwo, item.subSubType)
            } else if (item.subType === '07') {
              item.formatSubSubTypeThree = codeChangeName(this.constant.subSubTypeThree, item.subSubType)
            }
          } else {
            return
          }
          item.formatState = codeChangeName(this.constant.contractState, item.state) // 合同状态
          item.formatEffectiveState = codeChangeName(this.constant.EffectiveState, item.effectiveState)// 生效状态
          item.formatApprovalStatus = codeChangeName(this.constant.ApprovalStatus, item.approvalStatus) // 审批状态
          item.formatSettlementState = codeChangeName(this.constant.ContractSettleState, item.settlementState) // 结算状态
          item.signDate = parseTime(item.signDate, 'y-m-d')
          item.filingDate = parseTime(item.filingDate, 'y-m-d')
          item.amount = formatMoney(item.amount)
          item.benefits = formatMoney(item.benefits)
          item.rentMoney = formatMoney(item.rentMoney)
          item.settlementAmount = item.settlementAmount ? formatMoney(item.settlementAmount) : ''
          return item
        })
      })
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
    async deleteData() {
      if (!this.checkOnofTableData()) return
      const row = this.getMultipleSelection()
      const boolean = await handleDelete(row.approvalStatus, row.id, 'sub')
      if (boolean) this.fetchData('qeury')
    },
    // 获得单选元素
    getMultipleSelection() {
      return this.$refs['commTable'].multipleSelection[0]
    },
    checkOnofTableData() {
      return this.$refs.commTable.onlyOneData()
    },
    // 结算完成刷新主合同列表
    referTable() {
      this.fetchData('query')
    },
    async orgJump(type, row) {
      switch (type) {
        case 'add':
          if (this.activeName === 'labour') {
            this.$emit('changeState', 'laborAdd', {
              type: 'add'
            })
          } else if (this.activeName === 'purchase') {
            this.$emit('changeState', 'purchaseAdd', {
              type: 'add'
            })
          } else if (this.activeName === 'mechanics') {
            this.$emit('changeState', 'mechanicsAdd', {
              type: 'add'
            })
          } else if (this.activeName === 'subpackage') {
            this.$emit('changeState', 'subpackageAdd', {
              type: 'add'
            })
          } else if (this.activeName === 'engineeInsure') {
            this.$emit('changeState', 'engineeInsureAdd', {
              type: 'add'
            })
          } else {
            this.$emit('changeState', 'otherAdd', {
              type: 'add'
            })
          }
          break
        case 'edit': {
          if (!this.checkOnofTableData()) return
          const row = this.getMultipleSelection()
          const boolean = await openEdit(row)
          if (boolean) {
            if (this.activeName === 'labour') {
              this.$emit('changeState', 'laborAdd', {
                type: 'edit',
                row: this.getMultipleSelection()
              })
            } else if (this.activeName === 'purchase') {
              this.$emit('changeState', 'purchaseAdd', {
                type: 'edit',
                row: this.getMultipleSelection()
              })
            } else if (this.activeName === 'mechanics') {
              this.$emit('changeState', 'mechanicsAdd', {
                type: 'edit',
                row: this.getMultipleSelection()
              })
            } else if (this.activeName === 'subpackage') {
              this.$emit('changeState', 'subpackageAdd', {
                type: 'edit',
                row: this.getMultipleSelection()
              })
            } else if (this.activeName === 'engineeInsure') {
              this.$emit('changeState', 'engineeInsureAdd', {
                type: 'edit',
                row: this.getMultipleSelection()
              })
            } else {
              this.$emit('changeState', 'otherAdd', {
                type: 'edit',
                row: this.getMultipleSelection()
              })
            }
          }
          break
        }
        // 版本查看
        case 'edition':
          if (!this.checkOnofTableData()) return
          if (this.activeName === 'labour') {
            this.$emit('changeState', 'laborView', {
              type: 'detailVersion',
              row: this.getMultipleSelection()
            })
          } else if (this.activeName === 'purchase') {
            this.$emit('changeState', 'purchaseView', {
              type: 'detailVersion',
              row: this.getMultipleSelection()
            })
          } else if (this.activeName === 'mechanics') {
            this.$emit('changeState', 'mechanicsView', {
              type: 'detailVersion',
              row: this.getMultipleSelection()
            })
          } else if (this.activeName === 'subpackage') {
            this.$emit('changeState', 'subpackageView', {
              type: 'detailVersion',
              row: this.getMultipleSelection()
            })
          } else if (this.activeName === 'engineeInsure') {
            this.$emit('changeState', 'engineeInsureView', {
              type: 'detailVersion',
              row: this.getMultipleSelection()
            })
          } else if (this.activeName === 'other') {
            this.$emit('changeState', 'otherView', {
              type: 'detailVersion',
              row: this.getMultipleSelection()
            })
          }
          break
        case 'settlement': {
          if (!this.checkOnofTableData()) return
          const { approvalNo, id, approvalStatus, settlementState, settlementDate, remark, settlementAmount, settlementProcessId } = this.getMultipleSelection()
          console.log(this.getMultipleSelection(), '111')
          const { done, returnData, refer = false } = await openSettlement(approvalStatus, settlementState, settlementProcessId, 'sub')
          if (!done) return
          if (refer) this.fetchData('query', false)
          if (returnData) {
            // 需要额外回填数据
            this.isReturn = returnData
            this.settlementDate = settlementDate // 结算日期回填
            this.market = remark // 备注回填
            this.settlementAmount = settlementAmount
          }
          this.countId = id // 当前Id
          this.countApprovalNo = approvalNo // 当前审批单号
          this.isShowCountDialog = true
        }

          break
        case 'revoke': {
          if (!this.checkOnofTableData()) return
          const { approvalStatus, settlementState, approvalProcessId, settlementProcessId } = this.getMultipleSelection()
          const revoke = await handleRevokeEvent(approvalStatus, settlementState, approvalProcessId, settlementProcessId, 'contract')
          if (revoke) this.fetchData('query')
          break
        }
        case 'details':
          if (this.activeName === 'labour') {
            this.$emit('changeState', 'laborDetails', {
              type: 'details',
              row
            })
          } else if (this.activeName === 'purchase') {
            this.$emit('changeState', 'purchaseDetails', {
              type: 'details',
              row
            })
          } else if (this.activeName === 'mechanics') {
            this.$emit('changeState', 'mechanicsDetails', {
              type: 'details',
              row
            })
          } else if (this.activeName === 'subpackage') {
            this.$emit('changeState', 'subpackageDetails', {
              type: 'details',
              row
            })
          } else if (this.activeName === 'engineeInsure') {
            this.$emit('changeState', 'engineeInsureDetails', {
              type: 'details',
              row
            })
          } else {
            this.$emit('changeState', 'otherDetails', {
              type: 'details',
              row
            })
          }
          break
        default:
          break
      }
    }

  }
}
</script>

<style lang="less">
.public-list {
  .el-table__body-wrapper {
    max-height: calc(100vh - 320px);
  }
}
</style>
