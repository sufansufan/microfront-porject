<template>
  <div class="directory-add">
    <base-info :disabled="false" />
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
export default {
  components: {
    BaseInfo
  }
}
</script>

<style lang="less" scoped>
.directory-add {
  padding: 10px;
}
</style>
