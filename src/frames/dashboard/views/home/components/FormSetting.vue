<template>
  <div v-loading="loading" class="form-setting-box">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane v-for="item in reportList" :key="item.id" :label="item.name" :name="item.name">
        <drag-form :id="item.id" :key="item.id" :item-data="item" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DragForm from './DragForm'
import { getAllReportPower } from '@core/api/personelSet'
export default {
  components: {
    DragForm
  },
  data() {
    return {
      activeName: 'first',
      reportList: [],
      loading: true
    }
  },
  created() {
    this.fetchAllReport()
  },
  methods: {
    fetchAllReport() {
      this.loading = true
      getAllReportPower().then(({ data }) => {
        this.loading = false
        this.reportList = data
        this.activeName = data[0].name
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form-setting-box {
  min-height: 300px;
}
</style>

<style lang="less">
.form-setting-box {
  .el-tabs__item {
    text-decoration: underline !important;
  }
  .el-tabs--border-card {
    box-shadow: none !important;
    border: none !important;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    background: @crumbs-bg !important;
    border-right-color: @crumbs-bg !important;
    border-left: @crumbs-bg !important;
    color: @primary !important;
  }
  .el-tabs__nav-scroll {
    margin-right: 0px !important;
  }
  .el-tabs--border-card > .el-tabs__content {
    padding: 0px !important;
  }
}
</style>
