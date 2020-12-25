<template>
  <div class="supply-agreement">
    <div class="search">
      <div class="btn">
        <div>
          <el-button-group>
            <el-button v-power="permissonList[0]" type="primary" @click="orgJump('add')"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
            <el-button v-power="permissonList[1]" type="primary" @click="orgJump('edit')"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button v-power="permissonList[2]" type="primary" @click="deleteData"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
            <el-button v-power="permissonList[3]" type="primary" @click="orgJump('edition')"><i class="iconfont icon-banbenchakan" /> 版本查看</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button-group>
            <el-button v-power="permissonList[4]" type="primary" @click="orgJump('revoke')"><i class="iconfont icon-chexiao" /> 撤销</el-button>
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
import { getSupplyList } from '@core/api/contractManage/contractmanager'
import searchTableData from './searchTableData'
import { codeChangeName, parseTime, formatMoney } from '@core/utils'
import componentType from '../../../mixins/componentType'
import { mapGetters } from 'vuex'
import { handleRevokeEvent, handleDelete, openEdit } from '../../../../utils/settlement'
export default {
  components: {
    CommTable,
    FlowDialog
  },

  mixins: [search, componentType, searchTableData],
  props: {
    activeName: {
      default: '',
      type: String
    }
  },
  data() {
    return {
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
      loading: true,
      columns: [],
      laborColumns: [
        { type: 'selection', single: true },
        { label: '序号', index: true, fixed: 'left' },
        { label: '审批单号', prop: 'approvalNo', sortable: 'custom', width: 180, fixed: 'left' },
        { label: '协议编号', prop: 'contractNumber', sortable: 'custom', width: 160, showTooltip: true },
        { label: '协议类型', prop: 'subSubType', sortable: 'custom', width: 140,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatSubSubTypeOne)
          }
        },
        { label: '协议状态', prop: 'state', sortable: 'custom', width: 140,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatState)
          } },
        { label: '协议名称',
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
        { label: '协议金额', prop: 'amount', sortable: 'custom', width: 160 },
        { label: '签订日期', prop: 'signDate', sortable: 'custom', width: 160 },
        { label: '归档日期', prop: 'filingDate', sortable: 'custom', width: 200 },
        { label: '发起组织', prop: 'startOrgName', sortable: 'custom', width: 160, showTooltip: true },
        { label: '生效状态', prop: 'effectiveState', sortable: 'custom', width: 140, fixed: 'right',
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
        }
      ],
      purchaseColumns: [
        { type: 'selection', single: true },
        { label: '序号', index: true, fixed: 'left' },
        { label: '审批单号', prop: 'approvalNo', sortable: 'custom', width: 180, fixed: 'left' },
        { label: '协议编号', prop: 'contractNumber', sortable: 'custom', width: 160, showTooltip: true },
        { label: '协议类型', prop: 'subSubType', sortable: 'custom', width: 140,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatSubSubTypeTwo)
          }
        },
        { label: '协议状态', prop: 'state', sortable: 'custom', width: 140,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatState)
          } },
        { label: '协议名称',
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
        { label: '协议金额', prop: 'amount', sortable: 'custom', width: 160 },
        { label: '签订日期', prop: 'signDate', sortable: 'custom', width: 160 },
        { label: '归档日期', prop: 'filingDate', sortable: 'custom', width: 200 },
        { label: '发起组织', prop: 'startOrgName', sortable: 'custom', width: 160, showTooltip: true },
        { label: '生效状态', prop: 'effectiveState', sortable: 'custom', width: 140, fixed: 'right',
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
        }
      ],
      mechanicsColumns: [
        { type: 'selection', single: true },
        { label: '序号', index: true, fixed: 'left' },
        { label: '审批单号', prop: 'approvalNo', sortable: 'custom', width: 180, fixed: 'left' },
        { label: '协议编号', prop: 'contractNumber', sortable: 'custom', width: 180, showTooltip: true },
        { label: '协议状态', prop: 'state', sortable: 'custom', width: 140,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatState)
          } },
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
                  this.orgJump('details', row)
                }
              }
            }, row.name)
          }
        },
        { label: '协议金额', prop: 'amount', sortable: 'custom', width: 160 },
        { label: '租赁押金', prop: 'rentMoney', sortable: 'custom', width: 160 },
        { label: '签订日期', prop: 'signDate', sortable: 'custom', width: 200 },
        { label: '归档日期', prop: 'filingDate', sortable: 'custom', width: 160 },
        { label: '发起组织', prop: 'startOrgName', sortable: 'custom', width: 140, showTooltip: true },
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
        }
      ],
      subpackageColumns: [
        { type: 'selection', single: true },
        { label: '序号', index: true, fixed: 'left' },
        { label: '审批单号', prop: 'approvalNo', sortable: 'custom', width: 180, fixed: 'left' },
        { label: '协议编号', prop: 'contractNumber', sortable: 'custom', width: 160, showTooltip: true },
        { label: '分包方式', prop: 'subSubType', sortable: 'custom', width: 140,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatSubSubTypeOne)
          }
        },
        { label: '协议状态', prop: 'state', sortable: 'custom', width: 140,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatState)
          }

        },
        { label: '协议名称',
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
        { label: '协议金额', prop: 'amount', sortable: 'custom', width: 140 },
        { label: '绝对工期（天）', prop: 'absolutePeriod', sortable: 'custom', width: 160 },
        { label: '签订日期', prop: 'signDate', sortable: 'custom', width: 140 },
        { label: '归档日期', prop: 'filingDate', sortable: 'custom', width: 140 },
        { label: '发起组织', prop: 'startOrgName', sortable: 'custom', width: 150, showTooltip: true },
        { label: '生效状态', prop: 'effectiveState', sortable: 'custom', width: 120, fixed: 'right',
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatEffectiveState)
          }
        },
        { label: '审批状态', sortable: 'custom', width: 140, fixed: 'right', prop: 'approvalStatus',
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
        }
      ],
      otherColumns: [
        { type: 'selection', single: true },
        { label: '序号', index: true, fixed: 'left' },
        { label: '审批单号', prop: 'approvalNo', sortable: 'custom', width: 180, fixed: 'left' },
        { label: '协议编号', prop: 'contractNumber', sortable: 'custom', width: 200, showTooltip: true },
        { label: '协议状态', prop: 'state', sortable: 'custom', width: 170,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatState)
          }
        },
        { label: '协议名称',
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
        { label: '协议金额', prop: 'amount', sortable: 'custom', width: 170 },
        { label: '签订日期', prop: 'signDate', sortable: 'custom', width: 170 },
        { label: '归档日期', prop: 'filingDate', sortable: 'custom', width: 170 },
        { label: '发起组织', prop: 'startOrgName', sortable: 'custom', width: 170, showTooltip: true },
        { label: '生效状态', prop: 'effectiveState', sortable: 'custom', fixed: 'right', width: 170,
          render: (h, row) => {
            return h('span', {
              class: {
                'table-click-color': false
              }

            }, row.formatEffectiveState)
          }

        },
        { label: '审批状态', sortable: 'custom', width: 160, fixed: 'right', prop: 'approvalStatus',
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
        }
      ],
      tableData: [],
      permissonList: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['EffectiveState', 'subSubTypeOne', 'subSubTypeTwo', 'contractState', 'ApprovalStatus', 'generateNo'])

    if (this.activeName === 'labourSupply') {
      this.columns = this.laborColumns
      this.fetchData()
      this.permissonList.push('laborAgree:add', 'laborAgree:edit', 'laborAgree:delete', 'laborAgree:edition', 'laborAgree:revoke')
    } else if (this.activeName === 'purchaseSupply') {
      this.columns = this.purchaseColumns
      this.fetchData()
      this.permissonList.push('purchaseAgree:add', 'purchaseAgree:edit', 'purchaseAgree:delete', 'purchaseAgree:edition', 'purchaseAgree:revoke')
    } else if (this.activeName === 'mechanicsSupply') {
      this.columns = this.mechanicsColumns
      this.fetchData()
      this.permissonList.push('mechanicsAgree:add', 'mechanicsAgree:edit', 'mechanicsAgree:delete', 'mechanicsAgree:edition', 'mechanicsAgree:revoke')
    } else if (this.activeName === 'subpackageSupply') {
      this.columns = this.subpackageColumns
      this.btnList = this.publicbtnList
      this.fetchData()
      this.permissonList.push('esubpackageAgree:add', 'esubpackageAgree:edit', 'esubpackageAgree:delete', 'esubpackageAgree:edition', 'esubpackageAgree:revoke')
    } else if (this.activeName === 'engineeringSupply') {
      this.columns = this.otherColumns
      this.fetchData()
      this.permissonList.push('engineeInsureAgree:add', 'engineeInsureAgree:edit', 'engineeInsureAgree:delete', 'engineeInsureAgree:edition', 'engineeInsureAgree:revoke')
    } else if (this.activeName === 'otherSupply') {
      this.columns = this.otherColumns
      this.fetchData()
      this.permissonList.push('eotherAgree:add', 'eotherAgree:edit', 'eotherAgree:delete', 'eotherAgree:edition', 'eotherAgree:revoke')
    }
  },
  methods: {
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const { page, size, sortData } = this
      // const { id } = this.$route.query
      this.params = {
        page: page - 1 || 0,
        size: size || 10,
        propertyName: 'contractNumber',
        ascending: false,
        ...sortData,
        contractId: this.secondLevelContractId, // 归属合同id
        subType: this.activeName === 'labourSupply' ? '01' : this.activeName === 'purchaseSupply' ? '02' : this.activeName === 'mechanicsSupply' ? '03' : this.activeName === 'subpackageSupply' ? '04' : this.activeName === 'engineeringSupply' ? '07' : this.activeName === 'otherSupply' ? '06' : ''
      }
      getSupplyList(this.params).then(({ data: { content, total }}) => {
        this.loading = false
        this.total = total
        this.tableData = content
        this.tableData.map(item => {
          const { subType } = item.subCcontractDTO
          if (subType) {
            if (subType === '01' || subType === '04') {
              item.formatSubSubTypeOne = codeChangeName(this.constant.subSubTypeOne, item.subSubType)
            } else if (subType === '02') {
              console.log(codeChangeName(this.constant.subSubTypeTwo, item.subSubType), '02')
              item.formatSubSubTypeTwo = codeChangeName(this.constant.subSubTypeTwo, item.subSubType)
            } else if (subType === '07') {
              item.formatSubSubTypeThree = codeChangeName(this.constant.subSubTypeThree, item.subSubType)
            }
          } else {
            return
          }
          item.formatSubSubType = codeChangeName(this.constant.subSubTypeOne, item.subSubType)
          item.formatState = codeChangeName(this.constant.contractState, item.state)
          item.formatEffectiveState = codeChangeName(this.constant.EffectiveState, item.effectiveState)
          item.formatApprovalStatus = codeChangeName(this.constant.ApprovalStatus, item.approvalStatus)
          item.signDate = parseTime(item.signDate, 'y-m-d')
          item.filingDate = parseTime(item.filingDate, 'y-m-d')
          item.amount = formatMoney(item.amount)
          item.rentMoney = formatMoney(item.rentMoney)
          return item
        })
      })
    },
    // 获得单选元素
    getMultipleSelection() {
      return this.$refs['commTable'].multipleSelection[0]
    },
    checkOnofTableData() {
      return this.$refs.commTable.onlyOneData()
    },
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
    async deleteData() {
      if (!this.checkOnofTableData()) return
      const { id, approvalStatus } = this.getMultipleSelection()
      const refer = await handleDelete(approvalStatus, id, 'supply')
      if (refer) this.fetchData('query')
    },

    async orgJump(type, row) {
      switch (type) {
        case 'add':
          if (this.activeName === 'labourSupply') {
            this.$emit('changeState', 'laborsupplyAdd', {
              type: 'add'
            })
          } else if (this.activeName === 'purchaseSupply') {
            this.$emit('changeState', 'purchasesupplyAdd', {
              type: 'add'
            })
          } else if (this.activeName === 'mechanicsSupply') {
            this.$emit('changeState', 'mechanicssupplyAdd', {
              type: 'add'
            })
          } else if (this.activeName === 'subpackageSupply') {
            this.$emit('changeState', 'subpackagesupplyAdd', {
              type: 'add'
            })
          } else if (this.activeName === 'engineeringSupply') {
            this.$emit('changeState', 'engineeringsupplyAdd', {
              type: 'add'
            })
          } else {
            this.$emit('changeState', 'othersupplyAdd', {
              type: 'add'
            })
          }
          break
        case 'edit': {
          if (!this.checkOnofTableData()) return
          const row = this.getMultipleSelection()
          const boolean = await openEdit(row, 'supply')
          if (boolean) {
            if (this.activeName === 'labourSupply') {
              this.$emit('changeState', 'laborsupplyAdd', {
                type: 'edit',
                row: this.getMultipleSelection()
              })
            } else if (this.activeName === 'purchaseSupply') {
              this.$emit('changeState', 'purchasesupplyAdd', {
                type: 'edit',
                row: this.getMultipleSelection()
              })
            } else if (this.activeName === 'mechanicsSupply') {
              this.$emit('changeState', 'mechanicssupplyAdd', {
                type: 'edit',
                row: this.getMultipleSelection()
              })
            } else if (this.activeName === 'subpackageSupply') {
              this.$emit('changeState', 'subpackagesupplyAdd', {
                type: 'edit',
                row: this.getMultipleSelection()
              })
            } else if (this.activeName === 'engineeringSupply') {
              this.$emit('changeState', 'engineeringsupplyAdd', {
                type: 'edit',
                row: this.getMultipleSelection()
              })
            } else {
              this.$emit('changeState', 'othersupplyAdd', {
                type: 'edit',
                row: this.getMultipleSelection()
              })
            }
          }

          break
        }

        case 'details':
          if (this.activeName === 'labourSupply') {
            this.$emit('changeState', 'laborsupplyAdd', {
              type: 'details',
              row
            })
          } else if (this.activeName === 'purchaseSupply') {
            this.$emit('changeState', 'purchasesupplyAdd', {
              type: 'details',
              row
            })
          } else if (this.activeName === 'mechanicsSupply') {
            this.$emit('changeState', 'mechanicssupplyAdd', {
              type: 'details',
              row
            })
          } else if (this.activeName === 'subpackageSupply') {
            this.$emit('changeState', 'subpackagesupplyAdd', {
              type: 'details',
              row
            })
          } else if (this.activeName === 'engineeringSupply') {
            this.$emit('changeState', 'engineeringsupplyAdd', {
              type: 'details',
              row
            })
          } else {
            this.$emit('changeState', 'othersupplyAdd', {
              type: 'details',
              row
            })
          }
          break
          // 版本查看
        case 'edition':
          if (!this.checkOnofTableData()) return
          if (this.activeName === 'labourSupply') {
            this.$emit('changeState', 'laborsupplyView', {
              type: 'versionView',
              row: this.getMultipleSelection()
            })
          } else if (this.activeName === 'purchaseSupply') {
            this.$emit('changeState', 'purchasesupplyView', {
              type: 'versionView',
              row: this.getMultipleSelection()
            })
          } else if (this.activeName === 'mechanicsSupply') {
            this.$emit('changeState', 'mechanicssupplyView', {
              type: 'versionView',
              row: this.getMultipleSelection()
            })
          } else if (this.activeName === 'subpackageSupply') {
            this.$emit('changeState', 'subpackagesupplyView', {
              type: 'versionView',
              row: this.getMultipleSelection()
            })
          } else if (this.activeName === 'engineeringSupply') {
            this.$emit('changeState', 'engineeringsupplyView', {
              type: 'versionView',
              row: this.getMultipleSelection()
            })
          } else {
            this.$emit('changeState', 'othersupplyView', {
              type: 'versionView',
              row: this.getMultipleSelection()
            })
          }
          break
        case 'revoke': {
          if (!this.checkOnofTableData()) return
          const { approvalStatus, approvalProcessId, settlementProcessId } = this.getMultipleSelection()
          const refer = await handleRevokeEvent('', approvalStatus, approvalProcessId, settlementProcessId, 'suppy')
          if (refer) this.fetchData('query')
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
.supply-agreement{
  .el-table__body-wrapper {
    max-height: calc(100vh - 320px);
  }
}
</style>
