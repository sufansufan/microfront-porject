<!--收款计划-->
<template>
  <div class="collection-plan">
    <div class="search">
      <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch" />
    </div>
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
import collectionPlan from '../searchTableData/collectionPlan'
import search from '@core/mixins/search'
export default {
  name: 'CollectionPlan',
  mixins: [collectionPlan, search],
  data() {
    return {

    }
  }
}
</script>
