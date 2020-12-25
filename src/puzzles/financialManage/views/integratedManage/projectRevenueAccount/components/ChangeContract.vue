<template>
  <div class="change-contract">
    <search-bar :select-list="selectList" :search="search" :btn-list="btnList" :column="3" @changeSearch="changeSearch" />
    <comm-table
      ref="commTable"
      :single-selected="true"
      :columns="columns"
      :data="tableData"
      :loading="loading"
      :count="total"
    />
  </div>
</template>
<script>
import { subContractList } from '@core/api/contractManage/contractmanager'
import { formatMoney } from '@core/utils'
import search from '@core/mixins/search'
export default {
  mixins: [search],
  props: {
    detailInfo: {
      type: Object,
      default: () => {}
    },
    paymentType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      total: null,
      loading: false,
      selectList: [
        {
          value: 'bankNumber',
          searchType: 'input',
          name: '合同编号'
        },
        {
          value: 'bankName',
          searchType: 'select',
          name: '合同名称',
          selectData: []
        }
      ],
      btnList: [
      ],
      columns: [
        {
          type: 'selection',
          single: true
        },
        {
          label: '序号',
          index: true
        },
        {
          label: '合同编号',
          prop: 'contractNumber',
          showTooltip: true
        },
        {
          label: '合同名称',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '合同类型',
          prop: 'subType',
          showTooltip: true
        },
        {
          label: '合同金额',
          prop: 'amount',
          showTooltip: true
        },
        {
          label: '结算金额',
          prop: 'settlementAmount',
          showTooltip: true
        },
        {
          label: '签订单位',
          prop: 'signUnitName',
          showTooltip: true
        },
        {
          label: '签订日期',
          prop: 'signDate',
          showTooltip: true
        }
      ]
    }
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
        ...this.search,
        ...sortData,
        subType: this.getContractType(this.paymentType).subType,
        subSubType: this.getContractType(this.paymentType).subSubType
      }
      subContractList(params).then(({ data }) => {
        this.loading = false
        this.tableData = data
        this.tableData.map(item => {
          item.amount = formatMoney(item.amount)
          return item
        })
      })
    },
    // 获取合同类型
    getContractType(classNumber) {
      var contractType = {
        subType: '',
        subSubType: ''
      }
      // this.detailInfo.type 为01时为工程02为设计
      if (this.detailInfo.type === '01') {
        switch (classNumber) {
          case 'LB0301':
            contractType = {
              subType: '02',
              subSubType: '01'
            }
            break
          case 'LB0302':
            contractType = {
              subType: '02',
              subSubType: '02'
            }
            break
          case 'LB0303':
            contractType = {
              subType: '01',
              subSubType: ''
            }
            break
          case 'LB0304':
            contractType = {
              subType: '03',
              subSubType: ''
            }
            break
          case 'LB0305':
            contractType = {
              subType: '04',
              subSubType: ''
            }
            break
          case 'LB0306':
            contractType = {
              subType: '06',
              subSubType: ''
            }
            break
          case 'LB0307':
            contractType = {
              subType: '06',
              subSubType: ''
            }
            break
          case 'LB0308':
            contractType = {
              subType: '06',
              subSubType: ''
            }
            break
          case 'LB0309':
            contractType = {
              subType: '06',
              subSubType: ''
            }
            break
          case 'LB03010':
            contractType = {
              subType: '06',
              subSubType: ''
            }
            break
          case 'LB03011':
            contractType = {
              subType: '07',
              subSubType: ''
            }
            break
          case 'LB03012':
            contractType = {
              subType: '06',
              subSubType: ''
            }
            break
          case 'LB03013':
            contractType = {
              subType: '06',
              subSubType: ''
            }
            break
          default:
            break
        }
      } else {
        if (classNumber === 'LB0305') {
          contractType = {
            subType: '04',
            subSubType: ''
          }
        } else {
          contractType = {
            subType: '06',
            subSubType: ''
          }
        }
      }
      return contractType
    }
  }
}
</script>
