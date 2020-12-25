<!-- @date: 2020-08-17 10:08:55 -->
<template>
  <div>
    <div class="top_button">
      <el-button type="primary" @click="processMaintain">流程维护</el-button>
      <el-button type="primary" @click="handleExport">导出脚本</el-button>
    </div>
    <div class="middle_tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="流程参数" name="first">
          <template>
            <process-param ref="processParam" :process-list="processList" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="流程表单" name="second">
          <keep-alive>
            <template>
              <process-from ref="processFrom" :process-list="processList" />
            </template>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="特定审批人" name="third">
          <keep-alive>
            <template>
              <approver ref="approver" :process-list="processList" />
            </template>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>

    <export-script ref="exprotScript" :show.sync="isShowDialog" />

  </div>
</template>

<script>
import ProcessParam from './ProcessParam'
import ProcessFrom from './ProcessFrom'
import Approver from './Approver'
import ExportScript from './ExportScript'
export default {
  components: {
    ExportScript,
    ProcessParam,
    ProcessFrom,
    Approver
  },
  props: {
    processTree: {
      default: () => {},
      type: Object
    },
    appId: {
      default: () => '',
      type: String
    }
  },
  data() {
    return {
      activeName: 'first',
      isShowDialog: false,
      processList: ''
    }
  },
  computed: {},
  watch: {
    processTree: {
      handler(val) {
        if (val) {
          this.processList = val
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {

  },
  mounted() {

  },
  activated() {},
  methods: {
    // 导出脚本
    handleExport() {
      this.$refs.exprotScript.$refs.exprotDialog.show = true
      this.$refs.exprotScript.resetForm()
    },
    // 流程维护
    processMaintain() {
      this.$router.push({ name: 'processMaintain', query: { appId: this.appId }})
    },
    // 获取列表数据
    getData() {
      this.$refs.processParam.fetchData('query')
      this.$refs.processFrom.fetchData('query')
      this.$refs.approver.fetchData('query')
    }
  }
}
</script>
<style lang='less' scoped>
.top_button {
  padding-bottom: 10px;
}

.button_wapper {
  margin-top: 10px;
}
</style>
<style lang='less'>
</style>
