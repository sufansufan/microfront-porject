<template>
  <div class="main-content">
    <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch">
      <div slot="searchBar0" class="external-list">
        <span>项目归属</span>
        <el-select
          v-model="searchExternal.attribution"
          placeholder="请选择项目归属"
          style="width: 190px"
          clearable
        >
          <el-option
            v-for="item in constant.ContractAttribution"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select
          v-model="searchExternal.company"
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
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      row-key="id"
      border
      :default-sort="{
        prop: 'contractNumber',
        order: 'descending'
      }"
      max-height="calc(100vh - 400px)"
      @selection-change="handleSelectionChange"
      @sort-change="sortTable"
    >
      <el-table-column type="selection" width="40" fixed />
      <el-table-column type="index" width="48" fixed label="序号" align="center" />
      <el-table-column prop="costAccountingName" label="成本会计" width="100" fixed align="center" sortable="custom" show-overflow-tooltip />
      <el-table-column prop="contractNumber" label="合同编号" width="100" fixed align="center" sortable="custom" show-overflow-tooltip />
      <el-table-column prop="name" label="工程名称" width="100" fixed align="left" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="table-click-color" @click="viewDetails(scope.row)"> {{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="工程信息" align="center">
        <el-table-column prop="belongOrgName" label="归属单位" sortable="custom" width="100" align="center" show-overflow-tooltip />
        <el-table-column prop="belongOrgName" label="建设单位" align="center" show-overflow-tooltip />
        <el-table-column prop="projectState" label="工程状态" sortable="custom" width="100" align="center" show-overflow-tooltip />
        <el-table-column prop="amount" label="合同金额" sortable="custom" width="100" align="right" header-align="center" show-overflow-tooltip />
        <el-table-column prop="settlementAmount" label="结算金额" sortable="custom" width="120" header-align="center" align="right" show-overflow-tooltip>
          <template slot="header">
            <span>结算金额</span>
            <el-tooltip class="item" effect="dark" content="工程合同结算状态为已审核通过时，显示合同中的结算金额；否则不显示" placement="top-start">
              <span class="instructions">?</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="name" label="收取和支付甲方的费用情况" align="center" show-overflow-tooltip>
        <el-table-column prop="amountReceivable" label="应收款金额" sortable="custom" width="140" align="right" header-align="center" show-overflow-tooltip>
          <template slot="header">
            <span>应收款金额</span>
            <el-tooltip class="item" effect="dark" content="结算金额>0时 应收金额取结算金额；否则取合同金额" placement="top-start">
              <span class="instructions">?</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="amountReceived" label="已收款金额" sortable="custom" width="120" align="right" header-align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="table-click-color"> {{ scope.row.amountReceived }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="notAmountReceived" label="未收款金额" sortable="custom" width="120" align="right" header-align="center" show-overflow-tooltip />
        <el-table-column prop="warrantyDeposit" label="交甲方质保金" sortable="custom" width="120" align="right" header-align="center" show-overflow-tooltip />
        <el-table-column prop="warrantyGuaranteeDeposit" label="甲方质保/保函/押金" sortable="custom" width="170" align="right" header-align="center" show-overflow-tooltip />
        <el-table-column prop="totalInvoice" label="开票总额" sortable="custom" width="100" align="right" header-align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="table-click-color"> {{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="noTaxAmount" label="开票无税总额" sortable="custom" width="120" align="right" header-align="center" show-overflow-tooltip />
        <el-table-column prop="taxAmount" label="开票税金总额" sortable="custom" width="120" align="right" header-align="center" show-overflow-tooltip />
      </el-table-column>
      <el-table-column prop="name" label="余款情况" align="center" show-overflow-tooltip>
        <el-table-column prop="amountPayable" label="应付款金额" sortable="custom" width="120" align="right" header-align="center" show-overflow-tooltip>
          <template slot="header">
            <span>应付款金额</span>
            <el-tooltip class="item" effect="dark" content="公司向分公司/合伙人项目部要付款的金额" placement="top-start">
              <span class="instructions">?</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="amountPaid" label="已付款金额" sortable="custom" width="120" align="right" header-align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="table-click-color"> {{ scope.row.amountPaid }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="receiveNoPayMoney" label="未付款金额" sortable="custom" width="120" align="right" header-align="center" show-overflow-tooltip />
        <el-table-column prop="totalAmount" label="收票总额" sortable="custom" width="100" align="right" header-align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="table-click-color"> {{ scope.row.name }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="name" label="上缴税费" align="center" show-overflow-tooltip>
        <el-table-column prop="projectTaxReceivable" label="项目应缴税金" sortable="custom" width="120" align="right" header-align="center" show-overflow-tooltip />
        <el-table-column prop="projectStampDuty" label="项目印花税" sortable="custom" width="120" align="right" header-align="center" show-overflow-tooltip />
      </el-table-column>
      <el-table-column prop="name" label="分公司/项目部付给公司的费用" align="center" show-overflow-tooltip>
        <el-table-column prop="profitPayable" label="应上缴利润" sortable="custom" width="120" align="right" header-align="center" show-overflow-tooltip>
          <template slot="header">
            <span>应上缴利润</span>
            <el-tooltip class="item" effect="dark" content="分公司/合伙人项目部向公司缴纳的利润，即应缴利润=开票总额×上缴利润比例" placement="top-start">
              <span class="instructions">?</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="paidInProfit" label="已上缴利润" sortable="custom" width="120" align="right" header-align="center" show-overflow-tooltip />
        <el-table-column prop="riskMargin" label="风险保证金" sortable="custom" width="120" align="right" header-align="center" show-overflow-tooltip />
        <el-table-column prop="projectWarranty" label="项目质保/押金" sortable="custom" width="140" align="right" header-align="center" show-overflow-tooltip />
      </el-table-column>
      <el-table-column prop="name" label="往来款借入" align="center" show-overflow-tooltip>
        <el-table-column prop="borrowAmount" label="借入金额" sortable="custom" width="100" align="right" header-align="center" show-overflow-tooltip />
        <el-table-column prop="borrowReturnAmount" label="已还金额" sortable="custom" width="100" align="right" header-align="center" show-overflow-tooltip />
        <el-table-column prop="borrowNotReturnAmount" label="未还金额" sortable="custom" width="100" align="right" header-align="center" show-overflow-tooltip />
      </el-table-column>
      <el-table-column prop="name" label="往来款借出" align="center" show-overflow-tooltip>
        <el-table-column prop="loanAmount" label="借出金额" sortable="custom" width="100" align="right" header-align="center" show-overflow-tooltip />
        <el-table-column prop="loanReturnAmount" label="已还金额" sortable="custom" width="100" align="right" header-align="center" show-overflow-tooltip />
        <el-table-column prop="loanNotReturnAmount" label="未还金额" sortable="custom" width="100" align="right" header-align="center" show-overflow-tooltip />
      </el-table-column>
      <el-table-column prop="info" label="结清说明" align="center" show-overflow-tooltip />
      <el-table-column prop="settleState" label="是否结清" sortable="custom" width="100" fixed="right" align="center" />
    </el-table>
    <div class="pagination">
      <el-pagination
        v-show="count"
        :page-sizes="pageSizes"
        :page-size="size"
        :total="count"
        :current-page="page"
        :layout="pageLayout"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <div class="summary">
      <el-form ref="summary" :model="summary" label-width="200px" class="rule-form-flex four-width">
        <el-form-item label="合同金额合计">
          <amount-input v-model="summary.amountTotal" placeholder="请输入合同金额合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="结算金额合计">
          <amount-input v-model="summary.settlementAmountTotal" placeholder="请输入结算金额合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="应收款金额合计">
          <amount-input v-model="summary.amountReceivableTotal" placeholder="请输入应收款金额合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="已收款金额合计">
          <amount-input v-model="summary.amountReceivedTotal" placeholder="请输入已收款金额合计" disabled unit-name="元" />
        </el-form-item>

        <el-form-item label="未收款金额合计">
          <amount-input v-model="summary.notAmountReceivedTotal" placeholder="请输入未收款金额合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="交甲方质保金合计">
          <amount-input v-model="summary.warrantyDepositTotal" placeholder="请输入交甲方质保金合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="甲方质保/保函/押金合计">
          <amount-input v-model="summary.warrantyGuaranteeDepositTotal	" placeholder="请输入甲方质保/保函/押金合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="开票总额合计">
          <amount-input v-model="summary.totalInvoiceTotal" placeholder="请输入开票总额合计" disabled unit-name="元" />
        </el-form-item>

        <el-form-item label="开票无税总额合计">
          <amount-input v-model="summary.noTaxAmountTotal" placeholder="请输入开票无税总额合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="开票税金总额合计">
          <amount-input v-model="summary.taxAmountTotal" placeholder="请输入开票税金总额合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="应付款金额合计">
          <amount-input v-model="summary.amountPayableTotal" placeholder="请输入应付款金额合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="已付款金额合计">
          <amount-input v-model="summary.amountPaidTotal" placeholder="请输入已付款金额合计" disabled unit-name="元" />
        </el-form-item>

        <el-form-item label="未付款金额合计">
          <amount-input v-model="summary.unpaidAmountTotal" placeholder="请输入未付款金额合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="收票总额合计">
          <amount-input v-model="summary.totalAmountTotal" placeholder="请输入收票总额合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="项目应缴税金合计">
          <amount-input v-model="summary.projectTaxReceivableTotal" placeholder="请输入项目应缴税金合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="项目印花税合计">
          <amount-input v-model="summary.projectStampDutyTotal" placeholder="请输入项目印花税合计" disabled unit-name="元" />
        </el-form-item>

        <el-form-item label="应缴利润合计">
          <amount-input v-model="summary.profitPayableTotal" placeholder="请输入应缴利润合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="已上缴利润合计">
          <amount-input v-model="summary.paidInProfitTotal" placeholder="请输入已上缴利润合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="风险保证金合计">
          <amount-input v-model="summary.riskMarginTotal" placeholder="请输入风险保证金合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="项目质保/押金合计">
          <amount-input v-model="summary.projectWarrantyTotal" placeholder="请输入项目质保/押金合计" disabled unit-name="元" />
        </el-form-item>

        <el-form-item label="往来款借入合计">
          <amount-input v-model="summary.borrowAmountTotal" placeholder="请输入往来款借入合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="往来款借入已还合计">
          <amount-input v-model="summary.borrowReturnAmountTotal" placeholder="请输入往来款借入已还合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="往来款借入未还合计">
          <amount-input v-model="summary.borrowNotReturnAmountTotal" placeholder="请输入往来款借入未还合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="往来款借出合计">
          <amount-input v-model="summary.loanAmountTotal" placeholder="请输入往来款借出合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="往来款借出已还合计">
          <amount-input v-model="summary.loanReturnAmountTotal" placeholder="请输入往来款借出已还合计" disabled unit-name="元" />
        </el-form-item>
        <el-form-item label="往来款借出未还合计">
          <amount-input v-model="summary.loanNotReturnAmountTotal" placeholder="请输入往来款借出未还合计" disabled unit-name="元" />
        </el-form-item>
      </el-form>

    </div>
    <div class="dialog">
      <drag-dialog ref="dialog" title="分配成本会计" width="45%">
        <el-form ref="ruleForm" :key="key" :model="ruleForm" :rules="rules" label-width="110px">
          <el-form-item label="成本会计" prop="name">
            <el-select v-model="ruleForm.name" filterable clearable placeholder="请选择成本会计">
              <el-option
                v-for="item in costList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </drag-dialog>
    </div>
  </div>
</template>
<script>
import searchTableData from '../searchTableData'
import pagination from '@core/mixins/pagination'
import search from '@core/mixins/search'
import table from '@core/mixins/table'
import { handlerSearchBar, codeChangeName, formatMoney } from '@core/utils'
import { getMainAllList } from '@core/api/contractManage/contractmanager'
import { projectAccountList, projectAccountSummary, setCostAccounting } from '@core/api/financialManage/projectfinancemanager'
import { mapGetters } from 'vuex'
import { getApproverList } from '@core/api/personnel'
export default {
  name: 'MainContent',
  mixins: [searchTableData, search, table, pagination],
  data() {
    return {
      searchExternal: {
        attribution: '', // 项目归属
        company: '' // 项目归属单位
      },
      companyList: [],
      tableData: [{ name: 'sasdasdas' }],
      loading: false,
      count: null,
      summary: {
        amountTotal: '',
        settlementAmountTotal: '',
        amountReceivableTotal: '',
        amountReceivedTotal: '',
        notAmountReceivedTotal: '',
        warrantyDepositTotal: '',
        warrantyGuaranteeDepositTotal: '',
        totalInvoiceTotal: '',
        noTaxAmountTotal: '',
        taxAmountTotal: '',
        amountPayableTotal: '',
        amountPaidTotal: '',
        unpaidAmountTotal: '',
        totalAmountTotal: '',
        projectTaxReceivableTotal: '',
        projectStampDutyTotal: '',
        profitPayableTotal: '',
        paidInProfitTotal: '',
        riskMarginTotal: '',
        projectWarrantyTotal: '',
        borrowAmountTotal: '',
        borrowReturnAmountTotal: '',
        borrowNotReturnAmountTotal: '',
        loanAmountTotal: '',
        loanReturnAmountTotal: '',
        loanNotReturnAmountTotal: ''
      },
      ruleForm: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请选择成本会计', trigger: 'change' }]
      },
      costList: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['EngineeringStatus', 'commonYesNo', 'financeprojectType', 'projectSettleState']).then(() => {
      this.selectList = handlerSearchBar(this.selectList, [1, 2, 3, 7, 8, 9, 10], [this.constant.EngineeringStatus, this.constant.financeprojectType, this.constant.projectSettleState, this.constant.commonYesNo, this.constant.commonYesNo, this.constant.commonYesNo, this.constant.commonYesNo, this.constant.commonYesNo])
      this.fetchData()
      this.getMainList()
      this.getCostPerson()
    })
  },
  methods: {
    fetchData(type) {
      this.multipleSelection = []
      this.loading = true
      this.queryCopy(type)
      const { page, size, sortData } = this
      const params = {
        page: page - 1 || 0,
        size: size || 10,
        propertyName: 'contractNumber',
        ascending: false,
        ...this.search,
        ...sortData
      }
      if (this.search.signDate) {
        if (this.search.signDate.length === 0) {
          params.signDate = {
            after: '',
            before: ''
          }
        } else {
          params.signDate = {
            after: params.signDate[0],
            before: params.signDate[1]
          }
        }
      } else {
        params.signDate = {
          after: '',
          before: ''
        }
      }
      projectAccountList(params).then(({ data }) => {
        const { EngineeringStatus, projectSettleState } = this.constant
        this.loading = false
        const { content, total } = data
        this.tableData = content
        this.tableData.map(item => {
          item.projectState = codeChangeName(EngineeringStatus, item.projectState)
          item.settleState = codeChangeName(projectSettleState, item.settleState)
          item.amount = item.amount === null || '' ? '0.00' : formatMoney(item.amount)
          item.settlementAmount = item.settlementAmount === null || '' ? '' : formatMoney(item.settlementAmount)
          item.amountReceivable = item.amountReceivable === null || '' ? '0.00' : formatMoney(item.amountReceivable)
          item.amountReceived = item.amountReceived === null || '' ? '0.00' : formatMoney(item.amountReceived)
          item.notAmountReceived = item.notAmountReceived === null || '' ? '0.00' : formatMoney(item.notAmountReceived)
          item.warrantyDeposit = item.warrantyDeposit === null || '' ? '0.00' : formatMoney(item.warrantyDeposit)
          item.warrantyGuaranteeDeposit = item.warrantyGuaranteeDeposit === null || '' ? '0.00' : formatMoney(item.warrantyGuaranteeDeposit)
          item.totalInvoice = item.totalInvoice === null || '' ? '0.00' : formatMoney(item.totalInvoice)
          item.noTaxAmount = item.noTaxAmount === null || '' ? '0.00' : formatMoney(item.noTaxAmount)
          item.taxAmount = item.taxAmount === null || '' ? '0.00' : formatMoney(item.taxAmount)
          item.amountPayable = item.amountPayable === null || '' ? '0.00' : formatMoney(item.amountPayable)
          item.amountPaid = item.amountPaid === null || '' ? '0.00' : formatMoney(item.amountPaid)
          item.receiveNoPayMoney = item.receiveNoPayMoney === null || '' ? '0.00' : formatMoney(item.receiveNoPayMoney)
          item.totalAmount = item.totalAmount === null || '' ? '0.00' : formatMoney(item.totalAmount)
          item.projectTaxReceivable = item.projectTaxReceivable === null || '' ? '' : formatMoney(item.projectTaxReceivable)
          item.projectStampDuty = item.projectStampDuty === null || '' ? '' : formatMoney(item.projectStampDuty)
          item.profitPayable = item.profitPayable === null || '' ? '' : formatMoney(item.profitPayable)
          item.paidInProfit = item.paidInProfit === null || '' ? '' : formatMoney(item.paidInProfit)
          item.riskMargin = item.riskMargin === null || '' ? '' : formatMoney(item.riskMargin)
          item.projectWarranty = item.projectWarranty === null || '' ? '0.00' : formatMoney(item.projectWarranty)
          item.borrowAmount = item.borrowAmount === null || '' ? '0.00' : formatMoney(item.borrowAmount)
          item.borrowReturnAmount = item.borrowReturnAmount === null || '' ? '0.00' : formatMoney(item.borrowReturnAmount)
          item.borrowNotReturnAmount = item.borrowNotReturnAmount === null || '' ? '0.00' : formatMoney(item.borrowNotReturnAmount)
          item.loanAmount = item.loanAmount === null || '' ? '0.00' : formatMoney(item.loanAmount)
          item.loanReturnAmount = item.loanReturnAmount === null || '' ? '0.00' : formatMoney(item.loanReturnAmount)
          item.loanNotReturnAmount = item.loanNotReturnAmount === null || '' ? '0.00' : formatMoney(item.loanNotReturnAmount)
          return item
        })
        this.count = total
      })
      projectAccountSummary(params).then(({ data }) => {
        this.summary = {
          ...data
        }
        for (const key in this.summary) {
          this.summary[key] = this.summary[key] === null || '' ? '0.00' : formatMoney(this.summary[key])
        }
      })
    },
    // 分配成本会计
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = {
            id: this.ruleForm.name,
            name: codeChangeName(this.costList, this.ruleForm.name, 'id', 'name'),
            projectAccountIds: []
          }
          this.multipleSelection.forEach(item => {
            params.projectAccountIds.push(item.id)
          })

          setCostAccounting(params).then(({ data }) => {

          })
        }
      })
    },
    // 查看
    viewDetails(row) {
      const { id } = row
      this.$router.push({ name: 'detailsView', query: { id: id }})
    },
    // 获取主合同所有列表数据----工程名称
    getMainList() {
      const params = {
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
      getMainAllList(params).then(({ data }) => {
        const list = []
        data.map(item => {
          if (item.type === '01' || item.type === '02') {
            list.push(item)
          }
          return item
        })
        this.selectList = handlerSearchBar(this.selectList, [5], [list])
      })
    },
    // 获取成本会计人员
    getCostPerson() {
      const params = {
        postId: '1d99566c9ef1444c7f581d9225a43cf8'
      }
      getApproverList(params).then(({ data }) => {
        this.costList = data
        this.selectList = handlerSearchBar(this.selectList, [6], data)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main-content {
  padding-bottom: 20px;
  .instructions {
    color: #0a4c8a;
    cursor: pointer;
  }

}
</style>
