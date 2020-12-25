<template>
  <div class="view-contract-version">
    <!-- <div class="contract-name">{{ `${$route.query.name}(${options.row.name})` }}</div> -->
    <div class="contract-name">{{ `${options.row.name}` }}</div>
    <div class="search">
      <div class="btn">
        <!-- <div>
          <el-button-group>
            <el-button type="primary" @click="deletaData"><i class="iconfont icon-xinzeng1-copy" /> 删除</el-button>
          </el-button-group>
        </div> -->
        <!-- <div>
          <el-button-group>
            <el-button type="primary" @click="revokeData"><i class="iconfont icon-icon7-copy" /> 撤销</el-button>
          </el-button-group>
        </div> -->
        <div>
          <el-button-group>
            <el-button class="back-btn" @click="handlerClick"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <comm-table ref="commTable" v-loading="loading" :single-selected="true" :table-options="tableOptions" :columns="columns" :data="tableData" :count="total" />
    <!-- 流程dialog -->
    <flow-dialog v-if="isShowFlowDialog" :id="flowChartId" :show.sync="isShowFlowDialog" />
  </div>
</template>
<script>
import FlowDialog from '../../../components/FlowDialog.vue'
import CommTable from '@framesDash/components/CommTable'
import search from '@core/mixins/search'
import { codeChangeName, parseTime, formatMoney } from '@core/utils'
import searchTableData from './searchTableData'
import { mapGetters } from 'vuex'
import { getContractVersionList, getSupplyVersionList, supplyVersionDelete } from '@core/api/contractManage/contractmanager'
export default {
  name: 'ContractVersion',
  components: {
    CommTable,
    FlowDialog
  },
  mixins: [search, searchTableData],
  props: {
    activeName: {
      default: '',
      type: String
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 流程dialog
      isShowFlowDialog: false,
      flowChartId: '',
      tableOptions: {
        maxHeight: 'calc(100vh - 290px)',
        defaultSort: {
          prop: 'approvalNo',
          order: 'descending'
        }
      },
      loading: true,
      columns: [],
      contractColumns: [
        { type: 'selection', single: true },
        { label: '序号', index: true },
        { label: '审批单号', prop: 'approvalNo', sortable: 'custom', width: '160px', showTooltip: true },
        { label: '合同编号', prop: 'contractNumber', width: '130px', showTooltip: true },
        { label: '合同名称',
          showTooltip: true,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.orgJump('contract', row)
                }
              }
            }, row.name)
          }
        },
        { label: '合同状态', prop: 'stateName', width: '100px' },
        { label: '归属单位', prop: 'belongOrgNames', width: '130px', showTooltip: true },
        { label: '签订单位', prop: 'signUnitName', width: '100px' },
        { label: '合同金额', prop: 'amount', width: '100px', showTooltip: true },
        { label: '结算金额', prop: 'settlementAmount', width: '100px', showTooltip: true },
        { label: '签订日期', prop: 'signDate', width: '100px', showTooltip: true },
        { label: '归档日期', prop: 'filingDate', width: '100px', showTooltip: true },
        { label: '经办组织', prop: 'handlingOrgName', width: '160px', showTooltip: true },
        { label: '发起组织', prop: 'startOrgName', width: '160px', showTooltip: true },
        { label: '生效状态', prop: 'effectiveName', width: '100px' },
        { label: '版本创建日期', prop: 'createDate', width: '130px', showTooltip: true },
        { label: '审批状态',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': row.approvalName !== '草稿'
              },
              on: {
                click: () => {
                  this.hanldeApproval(row)
                }
              }
            }, row.approvalName)
          }
        },
        { label: '结算状态',
          width: '100px',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': row.settlementName !== '未结算'
              },
              on: {
                click: () => {
                  this.hanldeSettlement(row)
                }
              }
            }, row.settlementName)
          }
        }

      ],
      supplyColumns: [
        { type: 'selection', single: true },
        { label: '序号', index: true },
        { label: '审批单号', prop: 'approvalNo', sortable: 'custom', width: 180, showTooltip: true },
        { label: '协议编号', prop: 'contractNumber', width: 180, showTooltip: true },
        { label: '协议状态', prop: 'stateName', width: 160 },
        { label: '协议名称',
          sortable: 'custom',
          width: 250,
          showTooltip: true,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': true
              },
              on: {
                click: () => {
                  this.orgJump('supply', row)
                }
              }
            }, row.name)
          }
        },
        { label: '协议金额', prop: 'amount', width: 150, showTooltip: true },
        { label: '签订日期', prop: 'signDate', width: 170, showTooltip: true },
        { label: '归档日期', prop: 'filingDate', width: 170, showTooltip: true },
        { label: '发起组织', prop: 'startOrgName', width: 170, showTooltip: true },
        { label: '生效状态', prop: 'effectiveName', width: 120 },
        { label: '版本创建日期', prop: 'createDate', width: 140, showTooltip: true },
        { label: '审批状态',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': row.approvalName !== '草稿'
              },
              on: {
                click: () => {
                  this.hanldeApproval(row)
                }
              }
            }, row.approvalName)
          }
        }
      ],
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['EffectiveState', 'contractState', 'ApprovalStatus', 'ContractSettleState'])
    if (this.activeName === 'labour' || this.activeName === 'purchase' || this.activeName === 'mechanics' || this.activeName === 'other' || this.activeName === 'subpackage' || this.activeName === 'engineeInsure') {
      this.columns = this.contractColumns
      this.fetchDataContract()
    } else if (this.activeName === 'labourSupply' || this.activeName === 'purchaseSupply' || this.activeName === 'mechanicsSupply' || this.activeName === 'subpackageSupply' || this.activeName === 'engineeringSupply' || this.activeName === 'otherSupply') {
      this.columns = this.supplyColumns
      this.fetchDataSupply()
    }
  },
  methods: {
    fetchDataContract(type) {
      this.loading = true
      this.queryCopy(type)
      const { page, size, sortData } = this
      const { id } = this.options.row
      this.params = {
        page: page - 1 || 0,
        size: size || 10,
        id: id,
        ...sortData,
        propertyName: 'approvalNo',
        ascending: false
      }
      getContractVersionList(this.params).then(({ data: { content, total }}) => {
        this.loading = false
        this.total = total
        this.tableData = content
        this.tableData.map(item => {
          item.belongOrgNames = item.contractDTO.belongOrgName
          item.stateName = codeChangeName(this.constant.contractState, item.state)
          item.effectiveName = codeChangeName(this.constant.EffectiveState, item.effectiveState)
          item.approvalName = codeChangeName(this.constant.ApprovalStatus, item.approvalStatus)
          item.settlementName = codeChangeName(this.constant.ContractSettleState, item.settlementState)
          item.signDate = parseTime(item.signDate, 'y-m-d')
          item.filingDate = parseTime(item.filingDate, 'y-m-d')
          item.createDate = parseTime(item.createDate, 'y-m-d')
          item.amount = formatMoney(item.amount)
          item.settlementAmount = item.settlementAmount ? formatMoney(item.settlementAmount) : ''
          return item
        })
      })
    },
    fetchDataSupply(type) {
      this.loading = true
      this.queryCopy(type)
      const { page, size, sortData } = this
      const { id } = this.options.row
      this.params = {
        page: page - 1 || 0,
        size: size || 10,
        ...sortData,
        id: id,
        propertyName: 'approvalNo',
        ascending: false
      }
      getSupplyVersionList(this.params).then(({ data: { content, total }}) => {
        this.loading = false
        this.total = total
        this.tableData = content
        this.tableData.map(item => {
          item.stateName = codeChangeName(this.constant.contractState, item.state)
          item.effectiveName = codeChangeName(this.constant.EffectiveState, item.effectiveState)
          item.approvalName = codeChangeName(this.constant.ApprovalStatus, item.approvalStatus)
          item.settlementName = codeChangeName(this.constant.ContractSettleState, item.settlementState)
          item.signDate = parseTime(item.signDate, 'y-m-d')
          item.filingDate = parseTime(item.filingDate, 'y-m-d')
          item.createDate = parseTime(item.createDate, 'y-m-d')
          item.amount = item.amount.toFixed(2)
          return item
        })
      })
    },
    // 点击审批状态
    hanldeApproval({ approvalProcessId, approvalStatus }) {
      if (approvalStatus === '01') return
      this.flowChartId = approvalProcessId
      this.isShowFlowDialog = true
    },
    // 点击结算状态
    hanldeSettlement({ settlementProcessId, settlementState }) {
      if (settlementState === '01') return
      this.flowChartId = settlementProcessId
      this.isShowFlowDialog = true
    },
    deletaData() {
      if (!this.$refs.commTable.onlyOneData()) return
      const { id, adminOrganName } = this.getMultipleSelection()
      var deleteStatus = ['0']
      if (!deleteStatus.includes(adminOrganName)) {
        this.$message.warning('只有审批状态为“草稿”/“已撤销”且不存在补充协议的数据才允许删除。')
        return
      }
      this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        supplyVersionDelete(id).then(() => {
          // this.fetchData('query')
          this.$message.success('删除成功')
        })
      })
    },
    // 获得单选元素
    getMultipleSelection() {
      return this.$refs['commTable'].multipleSelection[0]
    },
    revokeData() {
      if (!this.$refs.commTable.onlyOneData()) return
    },
    orgJump(type, row) {
      switch (type) {
        case 'contract':
          if (this.activeName === 'labour') {
            this.$emit('changeState', 'laborAdd', {
              type: 'detailVersion',
              row: this.options.row,
              versionerow: row
            })
          } else if (this.activeName === 'purchase') {
            this.$emit('changeState', 'purchaseAdd', {
              type: 'detailVersion',
              row: this.options.row,
              versionerow: row
            })
          } else if (this.activeName === 'mechanics') {
            this.$emit('changeState', 'mechanicsAdd', {
              type: 'detailVersion',
              row: this.options.row,
              versionerow: row
            })
          } else if (this.activeName === 'subpackage') {
            this.$emit('changeState', 'subpackageAdd', {
              type: 'detailVersion',
              row: this.options.row,
              versionerow: row
            })
          } else if (this.activeName === 'engineeInsure') {
            this.$emit('changeState', 'engineeInsureAdd', {
              type: 'detailVersion',
              row: this.options.row,
              versionerow: row
            })
          } else {
            this.$emit('changeState', 'otherAdd', {
              type: 'detailVersion',
              row: this.options.row,
              versionerow: row

            })
          }
          break
        case 'supply':
          if (this.activeName === 'labourSupply') {
            this.$emit('changeState', 'laborsupplyAdd', {
              type: 'detailVersion',
              row: this.options.row,
              versionerow: row
            })
          } else if (this.activeName === 'purchaseSupply') {
            this.$emit('changeState', 'purchasesupplyAdd', {
              type: 'detailVersion',
              row: this.options.row,
              versionerow: row
            })
          } else if (this.activeName === 'mechanicsSupply') {
            this.$emit('changeState', 'mechanicssupplyAdd', {
              type: 'detailVersion',
              row: this.options.row,
              versionerow: row
            })
          } else if (this.activeName === 'subpackageSupply') {
            this.$emit('changeState', 'subpackagesupplyAdd', {
              type: 'detailVersion',
              row: this.options.row,
              versionerow: row
            })
          } else if (this.activeName === 'engineeringSupply') {
            this.$emit('changeState', 'engineeringsupplyAdd', {
              type: 'detailVersion',
              row: this.options.row,
              versionerow: row
            })
          } else {
            this.$emit('changeState', 'othersupplyAdd', {
              type: 'detailVersion',
              row: this.options.row,
              versionerow: row
            })
          }
          break

        default:
          break
      }
    },
    handlerClick() {
      if (this.options.type === 'detailVersion') {
        if (this.activeName === 'labour') {
          this.$emit('changeState', 'laborList')
        } else if (this.activeName === 'purchase') {
          this.$emit('changeState', 'purchaseList')
        } else if (this.activeName === 'mechanics') {
          this.$emit('changeState', 'mechanicsList')
        } else if (this.activeName === 'subpackage') {
          this.$emit('changeState', 'subpackageList')
        } else if (this.activeName === 'engineeInsure') {
          this.$emit('changeState', 'engineeInsureList')
        } else {
          this.$emit('changeState', 'otherList')
        }
      } else {
        if (this.activeName === 'labourSupply') {
          this.$emit('changeState', 'supplyAgreement')
        } else if (this.activeName === 'purchaseSupply') {
          this.$emit('changeState', 'supplyAgreement')
        } else if (this.activeName === 'mechanicsSupply') {
          this.$emit('changeState', 'supplyAgreement')
        } else if (this.activeName === 'subpackageSupply') {
          this.$emit('changeState', 'supplyAgreement')
        } else if (this.activeName === 'engineeringSupply') {
          this.$emit('changeState', 'supplyAgreement')
        } else {
          this.$emit('changeState', 'supplyAgreement')
        }
      }
    }

  }
}
</script>

<style lang="less" scoped>
.view-contract-version {
  .contract-name {
    font-size:16px;
    text-align: center;
    padding:10px 0;
    font-weight:bolder;
  }
}
</style>
<style lang="less">
.view-contract-version {
  .el-table__body-wrapper {
    max-height: calc(100vh - 340px);
  }
}
</style>
