<template>
  <div class="contacts-info">
    <contactsList :select-state="false" :btn-disabled="disabled" :company-id="$route.query.id" />
  </div>
</template>

<script>
import contactsList from '@puzzlesDash/operationManage/contactsList'
export default {
  components: {
    contactsList
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.contacts-info{

}
</style>
