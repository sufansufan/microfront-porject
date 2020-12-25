<template>
  <div class="engineer-detail">
    <div class="extend-name">{{ $route.query.name }}</div>
    <tab-router :tab-data="tabData" />
  </div>
</template>

<script>
import { officeTab } from './tabRouter'
import TabRouter from '../components/TabRouter'
export default {
  name: 'OfficeDetail',
  components: {
    TabRouter
  },
  data() {
    return {
      tabData: officeTab
    }
  },
  created() {

  },
  methods: {

  }

}
</script>

<style lang="less" scoped>
  .engineer-detail {
    padding: 10px;
    height: calc(100vh - 140px);
    overflow-y: auto;
    .extend-name {
      /*flex: 1;*/
      /*text-align: center;*/
      font-size: 16px;
      text-align: center;
      /*padding: 10px 0;*/
      font-weight: bolder
    }
  }
</style>
