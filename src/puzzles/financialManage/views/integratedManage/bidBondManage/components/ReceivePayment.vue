<template>
  <div class="receive-payment">
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
import receivePayment from '../searchTableData/receivePayment'
export default {
  name: 'ReceivePatment',
  mixins: [receivePayment],
  data() {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.receive-payment {
  margin-bottom: 10px;
}
</style>
