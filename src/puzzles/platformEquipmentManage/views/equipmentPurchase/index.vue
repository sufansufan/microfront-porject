<template>
  <div class="equipment-purchase">
    <div class="search">
      <div class="select">
        <div>
          <span>状态</span>
          <el-select v-model="search.consignorState" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in constant.deviceOrderState"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
        <div>
          <span>开票状态</span>
          <el-select v-model="search.invoiceState" placeholder="请选择开票状态" clearable>
            <el-option
              v-for="item in constant.deviceInvoiceState"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
        <div>
          <span>采购企业</span>
          <el-input v-model.trim="search.purchaseCompanyName" placeholder="请输入采购企业" clearable />
        </div>
        <div class="query">
          <div>
            <el-button type="primary" @click="fetchData('query')"><i class="iconfont icon-search-copy" /> 查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button v-power="'equipmentPurchase:confirm'" type="primary" @click="jumpState('confirm')"><i class="iconfont icon-querenshoukuan" /> 确认收款</el-button>
            <el-button v-power="'equipmentPurchase:goods'" type="primary" @click="jumpState('edit')"><i class="iconfont icon-fahuo" /> 发货</el-button>
            <el-button v-power="'equipmentPurchase:invoice'" type="primary" @click="jumpState('billing')"><i class="iconfont icon-kaipiao" /> 开票</el-button>
            <el-button v-power="'equipmentPurchase:close'" type="primary" @click="jumpState('close')"><i class="iconfont icon-guanbidingdan" /> 关闭订单</el-button>
          </el-button-group>
        </div>
        <div v-power="'equipmentPurchase:export'">
          <el-dropdown>
            <el-button type="primary">
              <i class="iconfont icon-daochu-copy" /> 导出
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="exportShipment">导出发货单</el-dropdown-item>
              <el-dropdown-item @click.native="exportBinning">导出装箱单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div>
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        row-key="id"
        border
        max-height="calc(100vh - 280px)"
        @sort-change="sortTable"
        @select="handleSelectionSingleChange"
      >
        <el-table-column type="selection" width="40" label-class-name="table-selection" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="orderNumber" label="订单号" header-align="center" width="150" sortable="custom">
          <template slot-scope="scope">
            <span class="table-click-color" @click="jumpStateDetails('details', scope.row.id,scope.row.consignorState,)">{{ scope.row.orderNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderDate" label="下单时间" align="center" width="150" sortable="custom" />
        <el-table-column prop="amount" label="金额" header-align="center" align="right" width="120" sortable="custom">
          <template slot-scope="{row}">
            {{ row.amount.toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="purchaseTotal" label="数量" align="center" width="70" sortable="custom" />
        <el-table-column prop="purchaseCompanyName" label="采购企业" align="center" show-overflow-tooltip />
        <el-table-column prop="consigneeName" label="收货人" align="center" width="100" show-overflow-tooltip />
        <el-table-column prop="telephone" label="联系电话" align="center" show-overflow-tooltip />
        <el-table-column prop="consigneeAddress" label="收货地址" align="center" width="150" show-overflow-tooltip />
        <el-table-column prop="remark" label="订单备注" align="center" show-overflow-tooltip />
        <el-table-column prop="consignorState" label="状态" align="center" sortable="custom" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{ row.consignorStateName }}
          </template>
        </el-table-column>
        <el-table-column prop="invoiceState" label="开票状态" align="center" sortable="custom">
          <template slot-scope="{row}">
            {{ row.invoiceStateName }}
          </template>
        </el-table-column>
        <el-table-column prop="scheduleDescription" label="进度说明" align="center" show-overflow-tooltip />
        <el-table-column prop="scheduleRemark" label="说明" align="center" show-overflow-tooltip />
      </el-table>
    </div>
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
    <drag-dialog ref="confirm" title="确认收款" width="60%">
      <el-form ref="confirmRuleForm" :key="key" :rules="rules" :model="confirmRuleForm" label-width="110px" class="ruleForm">
        <el-form-item label="收款金额" prop="amount">
          <el-input v-model.trim="confirmRuleForm.amount" disabled />
        </el-form-item>
        <el-form-item label="收款时间" prop="operateDate">
          <el-date-picker v-model="confirmRuleForm.operateDate" placeholder="请选择收款时间" type="datetime" />
        </el-form-item>
        <el-form-item label="确认人">
          <el-input v-model.trim="confirmRuleForm.operatorName" disabled />
        </el-form-item>
        <el-form-item label="说明" prop="remark" class="resmark row-label">
          <el-input v-model.trim="confirmRuleForm.remark" :maxlength="255" :rows="3" type="textarea" />
        </el-form-item>
      </el-form>
      <div class="base-info-footer">
        <el-button type="primary" @click="getCollection">确定</el-button>
      </div>
    </drag-dialog>
    <drag-dialog ref="billing" title="开票" width="60%">
      <el-form ref="billingRuleForm" :key="key" :rules="billingRules" :model="billingRuleForm" label-width="110px" class="ruleForm">
        <el-form-item label="开票金额" prop="amount">
          <el-input v-model.trim="billingRuleForm.amount" placeholder="请输入开票金额" />
        </el-form-item>
        <el-form-item label="开票日期" prop="operateDate">
          <el-date-picker v-model="billingRuleForm.operateDate" placeholder="请选择开票日期" type="date" />
        </el-form-item>
        <el-form-item label="开票人" prop="operatorName">
          <el-select v-model="billingRuleForm.operatorName" filterable placeholder="请选择开票人" clearable>
            <el-option
              v-for="item in personnelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发票号码" prop="invoiceNumber">
          <el-input v-model.trim="billingRuleForm.invoiceNumber" placeholder="请输入发票号码" />
        </el-form-item>
        <el-form-item label="说明" prop="remark" style="width:100%" class="row-label">
          <el-input v-model.trim="billingRuleForm.remark" :maxlength="255" :rows="3" type="textarea" placeholder="请输入说明" />
        </el-form-item>
      </el-form>
      <div class="base-info-footer">
        <el-button type="primary" @click="saveInvoice">确定</el-button>
      </div>
    </drag-dialog>
    <drag-dialog ref="close" title="关闭订单" width="60%">
      <el-form ref="closeRuleForm" :key="key" :rules="closeRules" :model="closeRuleForm" label-width="110px" class="ruleForm">
        <el-form-item label="操作人" prop="operatorName" class="resmark">
          <el-input v-model="closeRuleForm.operatorName" disabled />
        </el-form-item>
        <el-form-item label="关闭原因" prop="remark" class="resmark">
          <el-input v-model="closeRuleForm.remark" type="textarea" :maxlength="255" />
        </el-form-item>
      </el-form>
      <div class="base-info-footer">
        <el-button type="primary" @click="saveClose">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import table from '@core/mixins/table'
import pagination from '@core/mixins/pagination'
import DragDialog from '@frames/dashboard/components/Dialog'
import { queryOrderList, confirmCollection, makeInvoice, exportInvoice, closeOrder, exportPacking } from '@core/api/platformEquipmentManage/deviceordermanager'
import { getSessionStorage } from '@core/utils/auth'
import { validateLength } from '@core/utils/validate'
import { mapGetters } from 'vuex'
import { exportExcel } from '@core/utils'
import { getCustodian } from '@core/api/personnel'
import { filterListData } from '@core/utils'
export default {
  name: 'EquipmentPurchase',
  components: {
    DragDialog
  },
  mixins: [table, pagination],
  data() {
    return {
      personnelList: [],
      search: {
        consignorState: '',
        invoiceState: '',
        purchaseCompanyName: ''
      },
      closeRuleForm: {
        remark: ''
      },
      confirmRuleForm: {
        amount: '',
        operateDate: '',
        operatorName: '',
        remark: ''
      },
      billingRuleForm: {
        amount: '',
        operateDate: '',
        operatorName: '',
        invoiceNumber: '',
        remark: ''
      },
      rules: {
        amount: [{ required: true, message: '请输入收款金额 ', trigger: 'blur' }],
        operateDate: [{ required: true, message: '请选择收款时间 ', trigger: 'change' }],
        remark: [validateLength(0, 255)]
      },
      billingRules: {
        amount: [{ required: true, message: '请输入开票金额 ', trigger: 'blur' }],
        operateDate: [{ required: true, message: '请选择开票日期 ', trigger: 'change' }],
        operatorName: [{ required: true, message: '请选择开票人 ', trigger: 'change' }],
        invoiceNumber: [{ required: true, message: '请输入发票号码 ', trigger: 'blur' }],
        remark: [validateLength(0, 255)]
      },
      closeRules: {
        remark: [{ required: true, message: '请输入关闭原因 ', trigger: 'blur' }, validateLength(0, 255)]
      },
      tableData: [],
      loading: false,
      count: 0
    }
  },
  computed: {
    ...mapGetters(['constant', 'equipmentItem'])
  },
  created() {
    this.$store.dispatch('getConstant', ['deviceOrderState', 'deviceInvoiceState']).then(() => {
      this.constant.deviceOrderState = filterListData(this.constant.deviceOrderState, ['05', '07'])
    })
    this.fetchData()
    this.fetchPersonnel()
  },
  methods: {
    fetchPersonnel() {
      getCustodian().then(({ data }) => {
        this.personnelList = data
      })
    },
    // 导出发货单
    exportShipment() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        var shipment = this.multipleSelection.some(item => {
          return item.consignorState === '03'
        })
        if (!shipment) {
          this.$message.warning('请选择已发货的订单')
        } else {
          exportInvoice(this.multipleSelection[0].id).then(res => {
            exportExcel(res, `${this.multipleSelection[0].orderNumber}发货单.xls`)
          })
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    // 导出装箱单
    exportBinning() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        var binning = this.multipleSelection.some(item => {
          return item.consignorState === '03'
        })
        if (!binning) {
          this.$message.warning('请选择已发货的订单')
        } else {
          exportPacking(this.multipleSelection[0].id).then(res => {
            exportExcel(res, `${this.multipleSelection[0].orderNumber}装箱单.xls`)
          })
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    // 关闭订单
    saveClose() {
      this.$refs.closeRuleForm.validate(valid => {
        if (valid) {
          const { id } = this.closeRuleForm
          const params = {
            Loading: true,
            ...this.closeRuleForm
          }
          delete params.id
          delete params.operatorName
          closeOrder(params, id).then(() => {
            this.fetchData()
            this.$message.success('关闭订单成功')
            this.$refs.close.show = false
          })
        } else {
          return false
        }
      })
    },
    jumpStateDetails(type, orderId, orderState) {
      this.$router.push({ name: 'addSend', query: { type, orderId, orderState }})
    },
    jumpState(type) {
      if (!this.onlyOneData()) return
      const { amount, id, consignorState } = this.multipleSelection[0]
      switch (type) {
        case 'confirm':
          var confirmList = ['01']
          if (!confirmList.includes(consignorState)) {
            this.$message.warning('请选择状态待付款的订单')
            return
          }
          this.confirmRuleForm = {
            ...this.confirmRuleForm,
            amount,
            operatorName: getSessionStorage('userName'),
            id,
            operateDate: '',
            remark: ''
          }
          this.$refs.confirm.show = true

          break
        case 'edit':
          var stateList = ['02', '03']
          if (!stateList.includes(consignorState)) {
            this.$message.warning('只有待收货、已发货才能进行发货')
            return
          }
          this.$router.push({ name: 'addSend', query: { type, orderId: id, consignorState: consignorState }})
          break
        case 'billing':
          var openState = this.multipleSelection.some(item => {
            const code = ['02']
            return code.includes(item.invoiceState)
          })
          if (openState) {
            var billingState = this.multipleSelection.some(item => {
              const code = ['02', '03', '06']
              return code.includes(item.consignorState)
            })
            if (billingState) {
              this.billingRuleForm = {
                ...this.billingRuleForm,
                amount,
                operatorName: getSessionStorage('userName'),
                id,
                operateDate: '',
                invoiceNumber: '',
                remark: ''
              }
              this.$refs.billing.show = true
            } else {
              this.$message.warning('请选择状态待发货、已发货、已完成的订单')
            }
          } else {
            this.$message.warning('请选择开票状态待开票的订单')
          }
          break
        case 'close':
          var closeState = ['01']
          if (!closeState.includes(consignorState)) {
            this.$message.warning('请选择状态待付款的订单')
            return
          }
          this.closeRuleForm = {
            operatorName: getSessionStorage('userName'),
            id,
            remark: ''
          }
          this.$refs.close.show = true
          break
        default:
          break
      }
      this.key += 1
    },
    fetchData(type) {
      this.loading = true
      if (type === 'query') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      const { page, size, sortData } = this
      const params = {
        page: page - 1,
        size,
        ...this.search,
        ascending: false,
        propertyName: 'orderDate',
        ...sortData
      }
      queryOrderList(params).then(({ data: { content, total }}) => {
        this.loading = false
        this.tableData = content
        this.count = total
      })
    },
    // 确认收款
    getCollection() {
      this.$refs.confirmRuleForm.validate(valid => {
        if (valid) {
          const { id } = this.confirmRuleForm
          const params = {
            Loading: true,
            ...this.confirmRuleForm
          }
          delete params.id
          delete params.amount
          delete params.operatorName
          confirmCollection(params, id).then(() => {
            this.fetchData('query')
            this.$message.success('确认收款成功')
            this.$refs.confirm.show = false
          })
        } else {
          return false
        }
      })
    },
    saveInvoice() {
      this.$refs.billingRuleForm.validate(valid => {
        if (valid) {
          const { id } = this.billingRuleForm
          const { id: personId } = JSON.parse(getSessionStorage('personnel'))
          const params = {
            Loading: true,
            ...this.billingRuleForm,
            operatorId: personId
          }
          makeInvoice(params, id).then(() => {
            this.fetchData()
            this.$message.success('开票成功')
            this.$refs.billing.show = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.equipment-purchase{
  padding: 10px;
  .ruleForm{
    display: flex;
    flex-wrap: wrap;
     & > .el-form-item {
      width: 50%;
      .el-date-editor.el-input,.el-select {
        width: 100%;
      }
      &.resmark{
        width: 100%;
      }
    }
  }
   .base-info-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
<style lang="less">
.equipment-purchase {
  .el-table__body-wrapper {
    max-height: calc(100vh - 330px);
  }
}
</style>
