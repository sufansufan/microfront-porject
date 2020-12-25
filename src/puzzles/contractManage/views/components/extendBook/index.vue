<template>
  <div class="extend-book">
    <div class="button-list">
      <el-button-group v-for="(group,idx) in btnList" :key="idx">
        <el-button
          v-for="(item, index) in group"
          :key="index"
          v-power="item.power"
          :type="getStyle(item.style)"
          :class="item.back ? 'back-btn' : ''"
          :icon="`iconfont ${item.icon}`"
          @click="
            () => {
              handlerClickBtn(item);
            }
          "
        >
          {{ item.label }}
        </el-button>
      </el-button-group>
    </div>
    <div class="table-wapper">
      <comm-table
        ref="table"
        v-loading="loading"
        :single-selected="true"
        :columns="columns"
        :data="_tableData"
        :table-options="tableOptions"
        :count="+total"
      />
    </div>

    <div v-if="isShowDialog">
      <flow-dialog v-if="isShowDialog" :id="processId" :show.sync="isShowDialog" />
    </div>

  </div>
</template>

<script>
import CommTable from '@framesDash/components/CommTable'
import CommonData from './data.js'
import { mapGetters, mapActions } from 'vuex'
import { handleRevokeEvent, handleDelete, openEdit } from '../../../utils/settlement'
import { formatMoney, codeChangeName } from '@core/utils'
import FlowDialog from '../FlowDialog.vue'
import { parseTime } from '../../../../../core/utils/index.js'
export default {
  name: 'ExtendBook',
  components: {
    CommTable,
    FlowDialog
  },
  mixins: [CommonData],
  props: {
    /*
      触发事件
      @handlerClickBtn({type,row})
      @fetchData(params)
      @clickRow()
    */
    tableData: {
      type: Array,
      default: () => []
    },
    tableOptions: {
      type: Object,
      default: () => {}
    },
    /*
      engineer // 工程
      deSign // 设计
      service // 劳务
      purchase // 采购
      machine // 机器
      subPackage // 分包
      universal // 通用
      contractVersion // 合同版本查看
      extendVersion // 补充协议版本查看
      不在列表 // 自定义表头 传入customColumns
    */
    type: {
      type: String,
      default: 'custom'
    },
    customColumns: {
      type: Array,
      default: () => [
        {
          label: '审批单号',
          prop: 'approvalNumber',
          sortable: 'custom',
          defaultSort: true
        },
        {
          label: '合同编号',
          prop: 'contractId',
          sortable: 'custom'
        }
      ]
    },
    total: {
      type: [Number, String],
      default: 30
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 补充协议BTN
    extendBtnList: {
      type: Array,
      default: () => []
    },
    // 三级需要归属合同结算状态
    settlementState: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShowDialog: false,
      processId: '',
      columns: [],
      // 版本查看BTN
      versionBtnList: [[
        {
          type: 'return',
          label: '返回',
          power: '',
          icon: 'icon-fanhui-copy',
          back: true
        }
      ]]
    }
  },
  computed: {
    ...mapGetters(['constant']),
    _tableData() {
      const cloneData = JSON.parse(JSON.stringify(this.tableData))
      cloneData.forEach(item => {
        item.formatState = codeChangeName(this.constant.contractState, item.state) // 合同状态
        item.formatApprovalStatus = codeChangeName(this.constant.ApprovalStatus, item.approvalStatus) // 审批状态
        item.formatEffectiveState = codeChangeName(this.constant.EffectiveState, item.effectiveState) // 生效状态
        item.formatSettlementState = codeChangeName(this.constant.ContractSettleState, item.settlementState) // 结算状态
        // 金额
        item.formatAmount = item.amount !== null ? item.amount === 0 ? '0.00' : formatMoney(item.amount) : ''
        item.formatSettlementAmount = item.settlementAmount !== null ? item.settlementAmount === 0 ? '0.00' : formatMoney(item.settlementAmount) : ''
        // 日期
        item.signDate = parseTime(item.signDate, 'y-m-d')
        item.filingDate = parseTime(item.filingDate, 'y-m-d')
        item.createDate = parseTime(item.createDate, 'y-m-d')
      })
      return cloneData
    },
    // 初始化btn
    btnList() {
      return this.type.includes('Version') ? this.versionBtnList : this.extendBtnList
    }
  },
  created() {
    this.initDirectors()
    this.initHeader()
    this.initDefaultSort()
    this.fetchData()
  },
  methods: {
    ...mapActions(['getConstant']),
    // 初始化数据字典
    async initDirectors() {
      const dictionariesList = [
        'contractState', // 协议状态
        'ApprovalStatus', // 审批状态
        'EffectiveState' // 生效状态
      ]
      if (this.type === 'contractVersion') dictionariesList.push('ContractSettleState')
      await this.getConstant(dictionariesList)
    },
    // 按钮样式
    getStyle(style) {
      if (style !== undefined) return style
      else return 'primary'
    },
    getClass(style) {
      if (style) return style
    },
    // 初始化表头
    initHeader() {
      const map = {
        engineer: 'engineerAndDesign',
        deSign: 'engineerAndDesign',
        service: 'serviceAndPurchase',
        purchase: 'serviceAndPurchase',
        machine: 'machine',
        subPackage: 'subPackage',
        universal: 'universal',
        contractVersion: 'contractLook',
        extendVersion: 'extendLook'
      }
      if (!(this.type in map)) {
        this.columns = this.customColumns
      } else {
        this.columns = this[map[this.type]]
      }
    },
    // 初始化默认sort
    initDefaultSort() {
      const initSort = {}
      if (!this.columns || this.columns.length === 0) return
      if (this.tableOptions && this.tableOptions.defaultSort) {
        const defaultSort = this.tableOptions.defaultSort
        initSort['propertyName'] = defaultSort.prop
        initSort['ascending'] = defaultSort.order === 'ascending'
      }
      this.sortData = initSort
    },
    // 唯一性
    checkOnofTableData() {
      return this.$refs['table'].onlyOneData()
    },
    // 获得单选元素
    getMultipleSelection() {
      return this.$refs['table'].multipleSelection[0]
    },
    // 点击button
    handlerClickBtn({ type, valid }) {
      let currentRow = null
      if (valid) {
        if (!this.checkOnofTableData()) return
        currentRow = this.getMultipleSelection()
      }
      const methodsName = {
        'back': this._handleRevokeBtn,
        'del': this._handleDelBtn,
        'edit': this.handleEditBtn,
        'add': this._handlerClickBtn,
        'look': this._handlerClickBtn,
        'return': this._handlerClickBtn
      }
      methodsName[type](currentRow, type)
    },
    // 点击button触发事件
    _handlerClickBtn(currentRow, type) {
      this.$emit('handlerClickBtn', {
        type,
        row: currentRow
      })
    },
    // 点击修改按钮
    async handleEditBtn(row, type) {
      const currentType = 'supply'
      // 主合同状态 row 当前补充协议状态
      const currentRow = JSON.parse(JSON.stringify(row))
      // 工程设计 都用二级状态 options
      // 其他 -- 分包/其他都是三级 breezeInfo
      const statusList = [
        'engineer',
        'deSign'
      ]
      if (statusList.includes(this.type)) {
        currentRow['belongMainType'] = this.$route.query.settlementState
      } else {
        currentRow['belongMainType'] = this.settlementState
      }
      const boolean = await openEdit(currentRow, currentType)
      if (boolean) {
        this._handlerClickBtn(row, type)
      } else if (boolean === '退回流程') {
        this.$router.push({ path: '/processManage/myApprove' })
      }
    },
    // 删除逻辑
    async _handleDelBtn(row) {
      const boolean = await handleDelete(row.approvalStatus, row.id, 'supply')
      if (boolean) this.reloadTable()
    },
    // 撤销逻辑-补充协议
    async _handleRevokeBtn({ approvalStatus, settlementState, approvalProcessId, settlementProcessId }) {
      const boolean = await handleRevokeEvent(approvalStatus, settlementState, approvalProcessId, settlementProcessId, 'supply')
      if (boolean) this.reloadTable()
    },
    getParams() {
      // const page = typeof this.page === undefined ? this.page - 1 : 0
      const page = this.page === undefined ? 0 : this.page - 1
      if (this.sortData?.propertyName) {
        if (this.sortData?.propertyName.startsWith('format')) {
          this.sortData.propertyName = this.sortData.propertyName.slice(6)
        }
      }
      const params = {
        page,
        size: this.size || 10,
        ...this.sortData
      }
      return params
    },
    // 刷新table
    reloadTable() {
      const params = this.getParams()
      params['page'] = 0
      params['size'] = 10
      this.$refs['table'].multipleSelection = []
      this.$emit('fetchData', params)
    },
    fetchData(query) {
      const params = this.getParams()
      this.$emit('fetchData', params)
    }
  }
}
</script>

<style scoped lang="less">
.extend-book {
  .button-list {
    /*padding-top:10px;*/
    /*background-color: #1e83e9;*/
    /*display: flex;*/
    /*flex-direction: row ;*/
    height: 42px;
    .el-button-group {
      margin-left: 0px;
    }
  }
}
</style>
