<template>
  <div class="process-config">
    <div class="main">
      <main-content />
    </div>
  </div>
</template>
<script>
import MainContent from './components/MainContent'
export default {
  name: 'ProcessConfig',
  components: {
    MainContent
  },
  data() {
    return {

    }
  },
  created() {
    console.log(111111)
  },
  methods: {

  }
}
</script>
<style lang="less"  scoped>
.process-config {
  display: flex;
  height: calc(100vh - 100px);
  overflow-x: auto;
  & > .main {
    width: 100%;
  }
}
</style>
