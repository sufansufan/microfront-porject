<template>
  <div class="left-to-right-mould">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftToRightMould'
}
</script>

<style lang="less" scoped>
.left-to-right-mould {
  display: flex;
  & > .left {
    width: 200px;
    min-height: calc(100vh - 120px);
    background: #eeeeee;
  }
  & > .right {
    width: calc(100% - 200px);
    height: calc(100vh - 120px);
    overflow-y: auto;
    padding: 20px;
  }
}
</style>
