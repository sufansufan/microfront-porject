<template>
  <div class="title-name two-ellipsis">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.title-name {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 10px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
</style>
