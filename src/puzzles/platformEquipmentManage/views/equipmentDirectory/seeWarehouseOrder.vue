<template>
  <div class="see-warehouse-order">
    <receipt-no :disabled="true" :number-id="$route.query.id" :is-go-back="true" />
  </div>
</template>

<script>
import ReceiptNo from './components/ReceiptNo'
export default {
  name: 'SeeWarehouseOrder',
  components: {
    ReceiptNo
  }
}
</script>

<style lang="less" scoped>
.see-warehouse-order {
  padding: 10px;
}
</style>
