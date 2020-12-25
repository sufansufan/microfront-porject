<template>
  <div class="product-pictures">
    <div class="list">
      <div class="item">
        <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=18151648,1347682526&fm=26&gp=0.jpg">
      </div>
    </div>

  </div>
</template>

<script>

export default {
  components: { },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .product-pictures {
    .list {
      display: flex;
      .item {
        width: 25%;
        background: #f8fafa;
        border: 1px solid #ddd;
        padding: 6px;
        img {
          width: 100%;
        }
      }
    }

  }
</style>
