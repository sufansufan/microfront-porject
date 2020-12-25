<template>
  <div>
    <contacts-info :disabled="disabled" />
  </div>
</template>

<script>
import contactsInfo from '@puzzlesDash/operationManage/contactsInfo'
export default {
  components: {
    contactsInfo
  },
  data() {
    return {
      disabled: false
    }
  },
  created() {
    const { disabled } = this.$route.query
    this.disabled = disabled || false
  }
}
</script>

<style lang="less" scoped>

</style>
