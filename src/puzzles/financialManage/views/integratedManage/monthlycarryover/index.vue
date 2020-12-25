<template>
  <div class="monthly-carryover">
    <search-bar :select-list="selectList" :btn-list="btnList" @changeSearch="changeSearch" />
    <comm-table
      ref="commTable"
      :single-selected="true"
      :columns="columns"
      :data="tableData"
      :count="count"
    />
  </div>
</template>

<script>
import searchTableData from './searchTableData'
export default {
  name: 'MonthlyCarryover',
  mixins: [searchTableData]
}
</script>

<style lang="scss" scoped>

</style>
