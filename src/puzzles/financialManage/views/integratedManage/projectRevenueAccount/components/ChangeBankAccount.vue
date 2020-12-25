<template>
  <div class="change-bank-account">
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
import search from '@core/mixins/search'
import { bankaccountList, cashPage } from '@core/api/financialManage/capitalaccountmanager'
export default {
  mixins: [search],
  props: {
    accountType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      total: null,
      loading: false,
      selectList: [],
      selectListBank: [
        {
          value: 'bankNumber',
          searchType: 'input',
          name: '银行账号'
        },
        {
          value: 'bankName',
          searchType: 'select',
          name: '账户（开户行名称）',
          selectData: []
        }
      ],
      selectListCash: [
        {
          value: 'bankNumber',
          searchType: 'input',
          name: '账户名称'
        }
      ],
      btnList: [
      ],
      columns: [],
      columnsBank: [
        {
          type: 'selection',
          single: true
        },
        {
          label: '序号',
          index: true
        },
        {
          label: '银行（开户行名称）',
          prop: 'bankName',
          showTooltip: true,
          align: 'left'
        },
        {
          label: '银行账号',
          prop: 'bankNumber',
          showTooltip: true,
          align: 'left'
        },
        {
          label: '归属单位',
          prop: 'organizationName',
          showTooltip: true
        },
        {
          label: '当前余额',
          prop: 'currentBalance',
          showTooltip: true,
          align: 'right'
        },
        {
          label: '开户行地址',
          prop: 'bankAddress',
          showTooltip: true
        }
      ],
      columnsCash: [
        {
          type: 'selection',
          single: true
        },
        {
          label: '序号',
          index: true
        },
        {
          label: '账户名称',
          prop: 'name',
          showTooltip: true
        },

        {
          label: '归属单位',
          prop: 'organizationName',
          showTooltip: true
        },
        {
          label: '当前余额',
          prop: 'currentBalance',
          showTooltip: true,
          align: 'right'
        }
      ]
    }
  },
  watch: {
    accountType: {
      handler(val) {
        if (val === '01') {
          this.selectList = this.selectListBank
          this.columns = this.columnsBank
        } else {
          this.columns = this.columnsCash
          this.selectList = this.selectListCash
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const { page, size, sortData } = this
      const params = {
        page: page - 1 || 0,
        size: size || 10,
        propertyName: this.accountType === '01' ? 'openAccountDate' : 'createDate',
        ascending: false,
        ...this.search,
        ...sortData
      }
      if (this.accountType === '01') {
        bankaccountList(params).then(({ data }) => {
          const { content, total } = data.page
          this.loading = false
          this.tableData = content
          this.total = total
        })
      } else {
        cashPage(params).then(({ data }) => {
          const { content, total } = data.page
          this.loading = false
          this.tableData = content
          this.total = total
        })
      }
    }
  }
}
</script>
