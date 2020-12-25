<template>
  <div class="set-up">
    <div>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="我的统计" name="myStatistics">
          <my-statistics />
        </el-tab-pane>
        <el-tab-pane v-for="item in tabsData" :key="item.name" :label="item.name" :name="item.name">
          <div v-loading="dynamicLoading" class="content">
            <dynamic-component :drag-list="dragList" :resource-id="item.id" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="form-setting" @click="formSetting">
      <i class="iconfont icon-shezhi" />
      报表设置
    </div>
    <drag-dialog ref="dialog" title="报表设置" width="50%">
      <form-setting ref="formSetting" />
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import MyStatistics from './MyStatistics'
import FormSetting from './FormSetting'
import { homeMyReportTab, homeResourceReport } from '@core/api/personelSet'
import DynamicComponent from './DynamicComponent'
export default {
  components: {
    DragDialog,
    MyStatistics,
    FormSetting,
    DynamicComponent
  },
  data() {
    return {
      activeName: 'myStatistics',
      tabsData: [],
      dragList: [],
      dynamicLoading: true
    }
  },
  created() {
    this.fetchReportHeader()
  },
  methods: {
    formSetting() {
      this.$refs.dialog.show = true
    },
    fetchReportHeader() {
      homeMyReportTab().then(({ data }) => {
        this.tabsData = data
      })
    },
    handleClick(e) {
      if (e.label !== '我的统计') {
        const index = Number(e.index - 1)
        this.dynamicLoading = true
        homeResourceReport(this.tabsData[index].id).then(({ data }) => {
          this.dragList = data
          this.dynamicLoading = false
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.set-up {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  position: relative;
  & > div {
    &:first-child {
      width: 100%;
    }
  }
  .form-setting {
    position: absolute;
    top: 0px;
    right: 20px;
    width: 80px;
    height: 33px;
    line-height: 35px;
    text-align: right;
    margin-top: 1px;
    background: @crumbs-bg;
    cursor: pointer;
    z-index: 10;
  }
  .content {
    min-height: 130px;
  }
}
</style>

<style lang="less">
.set-up {
  .el-tabs__item {
    text-decoration: none;
    background: @crumbs-bg;
  }
  .el-tabs__nav-scroll {
    margin-right: 80px
  }
  .el-tabs--border-card>.el-tabs__header {
    background-color: none;
  }
  .el-tabs--border-card {
    box-shadow: none;
    border: none;
    border-top: 1px solid #DCDFE6;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: @primary;
    border-left: 1px solid #DCDFE6;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item:first-child {
    margin-left: 0px;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color: @primary;
  }
  .el-tabs--border-card>.el-tabs__content {
    padding: 15px 0px;
  }
}
</style>
