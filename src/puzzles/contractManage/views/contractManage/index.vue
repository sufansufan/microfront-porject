<template>
  <div class="contract-manage">
    <search-bar
      :select-list="selectList"
      :btn-list="btnList"
      :search="search"
      @changeSearch="handlerOuterSearch"
    >
      <div slot="searchBar0" class="external-list">
        <span>合同归属</span>
        <el-select
          v-model="search.attribution"
          placeholder="请选择项目归属"
          style="width: 190px"
          clearable
          @change="handlerChangeProject"
        >
          <el-option
            v-for="item in ContractAttributionList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select
          v-model="search.belongOrgId"
          :disabled="disabledCompany"
          clearable
          placeholder="请选择归属单位"
        >
          <el-option
            v-for="item in companyList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </div>
    </search-bar>
    <comm-table
      ref="table"
      v-loading="loading"
      :single-selected="true"
      :columns="columns"
      :table-options="tableOptions"
      :data="tableData"
      :count="total"
    />

    <count-dialog
      v-if="isShowCountDialog"
      :id="countId"
      :is-return="isReturn"
      :count-date="settlementDate"
      :amount="settlementAmount"
      :market="market"
      :down-load-id="countApprovalNo"
      :show.sync="isShowCountDialog"
      @referTable="referTable"
    />

    <flow-dialog v-if="isShowFlowDialog" :id="flowChartId" :show.sync="isShowFlowDialog" />

  </div>
</template>

<script>
import FlowDialog from '../components/FlowDialog'
import searchTableData from './searchTableData'
import { getSessionStorage } from '@core/utils/auth'
import { handlerSearchBar } from '@core/utils'
import { codeChangeName, formatMoney, parseTime, filterListData } from '@core/utils'
import search from '@core/mixins/search'
import {
  getMainList,
  getMainAllList,
  deleteMainContract,
  getMainConstarctType
} from '@core/api/contractManage/contractmanager'
import { getOrganizationByBelongList } from '@core/api/organization'
import { openSettlement, handleRevokeEvent, openEdit } from '../../utils/settlement'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'ContractInput',
  components: {
    FlowDialog,
    countDialog: () => import('./components/ClearDialog.vue')
  },
  mixins: [searchTableData, search],
  data() {
    return {
      loading: false,
      // 结算dialog需要逻辑
      countId: '', //
      countApprovalNo: '',
      settlementDate: '', // 结算日期
      settlementAmount: '', // 结算金额
      isReturn: false,
      market: '', // 备注回填
      // 结算dialog end
      // 流程dialog
      isShowFlowDialog: false,
      flowChartId: '',
      // 流程dialog end
      search: {
        attribution: '', // 合同归属
        belongOrgId: '' // 合同归属单位
      },
      // 合同类型
      mainTypeList: [],
      tableOptions: {
        maxHeight: '400px',
        defaultSort: {
          prop: 'contractNumber',
          order: 'descending'
        }
      },
      isShowCountDialog: false,
      companyList: [],
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['constant']),
    disabledCompany() {
      return !this.search.attribution
    },
    // 合同归属List
    ContractAttributionList() {
      const mainBusiness = JSON.parse(getSessionStorage('navInfo')).mainBusiness
      if (mainBusiness === 'JZZS') {
        return this.constant.contractAttributionList
      } else {
        return filterListData(this.constant.contractAttributionList, 'ProjectDepartment')
      }
    }
  },
  activated() {
    Promise.all([this.initSessionStorage(), this.initDictionaries()]).then(() => {
      this.fetchData()
    })
  },
  methods: {
    ...mapMutations(['SET_COMMON_COMMPANY']),
    ...mapActions(['getConstant']),
    // 唯一性
    checkOnofTableData() {
      return this.$refs['table'].onlyOneData()
    },
    // 获得单选元素
    getMultipleSelection() {
      return this.$refs['table'].multipleSelection[0]
    },
    // 跳转页面
    onJump(pageName, id, name) {
      const params = {
        name: pageName,
        query: {
          id,
          name
        }
      }
      this.$router.push(params)
    },
    // 新增合同
    handleAddContract() {
      this.$router.push({
        name: 'contractAdd',
        query: {
          id: 0
        }
      })
    },
    // 修改合同
    async editContract() {
      if (!this.checkOnofTableData()) return
      const row = this.getMultipleSelection()
      const boolean = await openEdit(row)
      if (boolean) {
        this.$router.push({
          name: 'contractEdit',
          query: {
            type: 'edit',
            id: row.id,
            name: row.name,
            category: row.type,
            hasApprovedVersion: row.hasApprovedVersion, // / 是否存在审批通过
            hasSubcontract: row.hasSubcontract // 是否存在补充协议或者内部合同
          }
        })
      }
    },
    async _judeDelVersion(boolean) {
      const message = boolean ? '请确认是否删除当前版本，删除后，将显示该合同的上一个版本' : '请确认是否删除该合同'
      return this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        return true
      })
    },
    // 删除合同
    async deleteContract() {
      if (!this.checkOnofTableData()) return
      const { id, approvalStatus, hasMoreVersion } = this.getMultipleSelection()
      if (approvalStatus === '05' || approvalStatus === '01') {
        const boolean = await this._judeDelVersion(hasMoreVersion)
        if (boolean) {
          await deleteMainContract(id)
          this.fetchAllList()
          this.fetchData('query')
        }
      } else {
        this.$message.warning('只有审批状态为“草稿”/“已撤销”且不存在内部合同和补充协议的数据才允许删除。')
      }
    },
    // 版本查看
    lookContract() {
      if (!this.checkOnofTableData()) return
      const currentSelection = this.getMultipleSelection()
      const id = currentSelection.id
      this.$router.push({
        name: 'contractVersion',
        query: {
          id
        }
      })
    },
    // 结算完成刷新主合同列表
    referTable() {
      this.fetchData('query')
    },
    // 结算
    async countContract() {
      if (!this.checkOnofTableData()) return
      const { approvalNo, id, approvalStatus, settlementState, settlementDate, remark, settlementAmount, settlementProcessId } = this.getMultipleSelection()
      // 这里处理
      const { done, returnData, refer = false } = await openSettlement(approvalStatus, settlementState, settlementProcessId)
      if (!done) return
      if (refer) {
        this.fetchData('query', false)
      }
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
    //  撤销
    async revocationContract() {
      if (!this.checkOnofTableData()) return
      const { approvalStatus, settlementState, approvalProcessId, settlementProcessId } = this.getMultipleSelection()
      const refer = await handleRevokeEvent(approvalStatus, settlementState, approvalProcessId, settlementProcessId, 'contract')
      if (refer) this.fetchData('query')
    },
    async handlerChangeProject(val) {
      if (val) {
        this.$set(this.search, 'belongOrgId', '')
        const { data } = await getOrganizationByBelongList(val)
        this.companyList = data.map(i => ({ code: i.id, name: i.orgName }))
      } else {
        return
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

      // if (parseFloat(moneyBefore).toString() === 'NaN' || parseFloat(moneyAfter).toString() === 'NaN') {
      //   this.$message.warning('请输入正确数字范围')
      //   return false
      // } else {
      //   if (moneyBefore < 0 || moneyAfter < 0) {
      //     this.$message.warning('金额只允许大于等于0')
      //     return false
      //   }
      //   return true
      // }
    },
    // 点击查询按钮
    handlerOuterSearch(params) {
      if (!this._validateMoney(params)) return
      // 判断金额
      this.search = {
        ...this.search,
        ...params
      }
      this.fetchData('query')
    },
    // 获取所有参数
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
        ...this.search,
        ...(this.sortData || defaultSort)
      }
      // 处理级联
      this.formatCascader(formatParams)
      // 处理金额
      this.formatMoney(formatParams)
      // 处理日期
      this.formatDate(formatParams)
      return formatParams
    },
    // 处理级联
    formatCascader(obj) {
      // const { handlingOrgId = '' } = obj
      if (obj['handlingOrgId']) {
        obj['handlingOrgId'] = obj['handlingOrgId'].join(',')
      }
    },
    // 处理日期
    formatDate(obj) {
      let { filingDateBetween } = obj
      if (!filingDateBetween) filingDateBetween = []
      obj['filingDateBetween'] = {
        after: filingDateBetween ? filingDateBetween[0] : null,
        before: filingDateBetween ? filingDateBetween[1] : null
      }
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
    // 请求表格数据
    async fetchData(type, isNeedLoading = true) {
      isNeedLoading && (this.loading = true)
      this.queryCopy(type)
      const params = this.getParams()
      const { data: { content, total }} = await getMainList(params)
      content.forEach(item => {
        item.formatType = codeChangeName(this.mainTypeList, item.type)
        item.signUnitName = item.type === '01' || item.type === '02' ? item.constructionUnit : item.type === '03' || item.type === '04' ? item.signUnitName : ''
        item.formatState = codeChangeName(this.constant.contractState, item.state)
        item.formatApprovalStatus = codeChangeName(this.constant.ApprovalStatus, item.approvalStatus)
        item.formatSettlementState = codeChangeName(this.constant.ContractSettleState, item.settlementState)
        item.formatEffectiveState = codeChangeName(this.constant.EffectiveState, item.effectiveState)
        item.amount = formatMoney(item.amount)
        item.settlementAmount = item.settlementAmount ? formatMoney(item.settlementAmount) : ''
        item.signDate = parseTime(item.signDate, 'y-m-d')
        item.filingDate = parseTime(item.filingDate, 'y-m-d')
      })
      this.tableData = content
      this.total = total
      this.loading = false
      this.$refs['table'].multipleSelection = []
    },
    // 获取sessionStroage
    async initSessionStorage() {
      // const id = getSessionStorage('orgId')
      // const { data } = await getPersonnelsByOrgId(id)
      // const orgList = data.map((i) => ({ name: i.name, code: i.id }))
      this.fetchAllList()
      const { data: mainTypeList } = await getMainConstarctType()
      this.mainTypeList = mainTypeList
      // this.selectList = handlerSearchBar(this.selectList, [2, 6], [mainTypeList, orgList])
      this.selectList = handlerSearchBar(this.selectList, [2], [mainTypeList])
    },
    async fetchAllList() {
      const allListData = {
        amount: { after: '', before: '' },
        approvalStatus: '',
        ascending: false,
        attribution: '',
        belongOrgId: '',
        contractNumber: '',
        filingDateBetween: {},
        handlingOrgId: '',
        name: '',
        page: 0,
        propertyName: 'approvalNo',
        settlementState: '',
        signUnitName: '',
        size: 10,
        state: '',
        type: ''
      }
      const { data: mainList } = await getMainAllList(allListData)
      this.selectList = handlerSearchBar(this.selectList, [1], [mainList])
    },
    // 请求数据字典
    async initDictionaries() {
      const dictionariesList = [
        // 'MainContractType', // 主合同类型
        'contractState', // 合同状态
        'ApprovalStatus', // 审批状态
        'ContractSettleState', // 结算状态
        'EffectiveState', // 生效状态
        'contractAttributionList', // 合同归属
        {
          type: 'orgList',
          params: {
            parentPath: getSessionStorage('orgId'),
            del: '0',
            state: 'ok',
            componentBusinessCode: '190010'
          }
        } // 经办组织
      ]
      await this.getConstant(dictionariesList)
      // 请求完成后赋值
      const {
        // MainContractType,
        contractState,
        ApprovalStatus,
        ContractSettleState,
        orgList
      } = this.constant
      this.selectList = handlerSearchBar(
        this.selectList,
        [3, 8, 6, 9],
        [contractState, ApprovalStatus, orgList, ContractSettleState]
      )
    }
  }

}
</script>

<style lang="less" scoped>
.contract-manage {
  padding: 10px;
}
</style>
