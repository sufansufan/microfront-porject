<template>
  <div class="contacts-manage">
    <contactsList />
  </div>
</template>

<script>
import contactsList from '@puzzlesDash/operationManage/contactsList'
export default {
  name: 'ContactsManage',
  components: {
    contactsList
  }
}
</script>

<style lang="less" scoped>
.contacts-manage {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
}
</style>
