<template>
  <div class="see-order">
    <purchase-order-no :number-id="numberId" :is-order="true" />
  </div>
</template>

<script>
import PurchaseOrderNo from './components/PurchaseOrderNo'
export default {
  name: 'SeeOrder',
  components: {
    PurchaseOrderNo
  },
  data() {
    return {
      numberId: ''
    }
  },
  created() {
    this.numberId = this.$route.query.id
  }
}
</script>

<style lang="less" scoped>
.see-order {
  padding: 10px;
}
</style>
