<template>
  <div class="crumb-box" :style="{'background': bgColor}">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      default: '#f7f4f8',
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.crumb-box {
  width: calc(100% - 20px);
  height: 40px;
  padding: 0 10px;
  color: @crumbs-font;
  background: @crumbs-bg;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
  & > div {
    display: flex;
    align-items: center;
    .image {
      width: 24px;
      height: 24px;
      margin-right: 5px;
    }
  }
}
</style>
