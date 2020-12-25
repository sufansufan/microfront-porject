<template>
  <div class="engineer-detail">
    <h3 class="title">{{ $route.query.name }}</h3>
    <!-- :one-hidden="hasSubcontract" -->
    <tab-router :tab-data="tabData" />
  </div>
</template>

<script>
import { engineerTab } from './tabRouter'
import TabRouter from '../components/TabRouter'
export default {
  name: 'EngineerDetail',
  components: {
    TabRouter
  },
  data() {
    return {
      tabData: engineerTab
    }
  },
  computed: {
    hasSubcontract() {
      return !this.$route.query.hasSub
    }
  }
}
</script>

<style lang="less" scoped>
.engineer-detail {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .title{
    font-size: 16px;
    text-align: center;
    padding: 10px 0;
    font-weight: bolder
  }
}
</style>
