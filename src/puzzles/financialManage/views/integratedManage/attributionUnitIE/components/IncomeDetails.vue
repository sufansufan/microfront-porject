<template>
  <div class="right-register">
    <search-bar :select-list="selectList" :search="search" :btn-list="btnList" @changeSearch="changeSearch" />
    <comm-table
      ref="commTable"
      :single-selected="true"
      :columns="columns"
      :data="tableData"
      :count="50"
    />
  </div>
</template>

<script>
import searchTableData from '../searchTableData/incomeDetails'
import search from '@/core/mixins/search'

export default {
  name: 'IncomeDetails',
  directives: {
    'functSize': {
      bind(el, pinding) {
        el.style.fontSize = parseInt(pinding.value) + 'px'
      }
    }
  },
  mixins: [searchTableData, search],
  data() {
    return {
      dialogTitle: '',
      multipleSelection: [],
      selectData: [
        {
          label: 'select1',
          value: '1'
        },
        {
          label: 'select2',
          value: '2'
        }
      ]
    }
  },
  created() {
    // this.fetchData('query')
  },
  // mounted() {
  //   // this.$refs.dialogNumber.show = true
  // },
  methods: {
    // fetchData(type) {
    //   this.queryCopy(type)
    //   const params = {
    //     pageNum: this.page || 1,
    //     pageSize: this.size || 10,
    //     ...this.search,
    //     ...this.sortData
    //   }

    //   getUserInformationList(params).then(res => {
    //     this.$refs.commTable.loading = false
    //     this.tableData = res.data.list
    //     this.tabCount = res.data.total
    //     this.multipleSelection = []
    //   }).catch(e => {
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>
.buttons{
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
</style>
