<!--补充协议-->
<template>
  <div class="supplementary">
    <div class="search">
      <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch" /></div>
    <div class="table">
      <comm-table
        ref="commTable"
        :single-selected="true"
        :columns="columns"
        :data="tableData"
        :count="count"
      />
    </div>
  </div>
</template>
<script>
import supplementary from '../searchTableData/supplementary'
import search from '@core/mixins/search'
export default {
  name: 'Supplementary',
  mixins: [supplementary, search],
  data() {
    return {

    }
  }
}
</script>
<style lang="less" scoped>

</style>
