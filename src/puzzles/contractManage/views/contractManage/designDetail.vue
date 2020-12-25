<template>
  <div class="design-detail">
    <h3 class="title">{{ $route.query.name }}</h3>
    <!-- :one-hidden="hasSubcontract" -->
    <tab-router :tab-data="tabData" />
  </div>
</template>

<script>
import { designTab } from './tabRouter'
import TabRouter from '../components/TabRouter'
export default {
  name: 'DesignDetail',
  components: {
    TabRouter
  },
  data() {
    return {
      tabData: designTab
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
.design-detail {
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
