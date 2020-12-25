<template>
  <div>
    <jdy-steps :action="action">
      <jdy-step title="基本信息" />
      <jdy-step title="流程设计" />
      <jdy-step title="流程设计" />
    </jdy-steps>
  </div>
</template>

<script>
export default {
  name: 'FlowConfig',
  data() {
    return {
      action: 1
    }
  }
}
</script>

<style scoped>

</style>
