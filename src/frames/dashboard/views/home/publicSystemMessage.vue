<template>
  <div class="public-system-message">
    <system-message :system-data="systemData" />
  </div>
</template>

<script>
export default {
  components: {
    SystemMessage: () => import('./components/SystemMessage')
  },
  computed: {
    systemData() {
      return this.$route.query
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
