<template>
  <div class="my-attendance">
    <el-calendar v-model="value" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style lang="less" scoped>
.my-attendance {

}
</style>
