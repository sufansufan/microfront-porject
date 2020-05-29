<template>
  <div class="export-script">
    <drag-dialog ref="dialog" title="导出脚本" width="45%">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="export-form">
        <template v-if="type !== 'system'">
          <el-form-item label="导出对象" prop="name">
            <p>（平台将导出以下被勾选项的dml脚本）</p>
            <el-checkbox v-model="checked">数据字典分类</el-checkbox>
            <el-checkbox v-model="checked">数据字典</el-checkbox>
            <el-checkbox v-model="checked">紧急任务分类</el-checkbox>
            <el-checkbox v-model="checked">紧急任务</el-checkbox>
            <el-checkbox v-model="checked">系统消息分类</el-checkbox>
            <el-checkbox v-model="checked">系统消息</el-checkbox>
            <el-checkbox v-model="checked">日常任务分类</el-checkbox>
            <el-checkbox v-model="checked">日常任务</el-checkbox>
            <el-checkbox v-model="checked">调度任务</el-checkbox>
            <el-checkbox v-model="checked">附件类型</el-checkbox>
          </el-form-item>
        </template>
        <el-form-item label="导出范围" prop="name">
          <div>
            <el-radio-group v-model="ruleForm.range">
              <el-radio :label="3">全部</el-radio>
            </el-radio-group>
          </div>
          <div>
            <el-radio-group v-model="ruleForm.range">
              <el-radio :label="3">最后修改日期</el-radio>
              <el-date-picker
                v-model="range"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-radio-group>
            <p>（平台将导出数据的最后修改时间位于此时间段内的dml脚本）</p>

          </div>
        </el-form-item>
        <el-form-item label="脚本类型" prop="name">
          <p>（平台将导出勾选类型的dml脚本）</p>
          <el-checkbox v-model="checked">删除脚本</el-checkbox>
          <el-checkbox v-model="checked">插入脚本</el-checkbox>
          <el-checkbox v-model="checked">更新脚本</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  components: {
    DragDialog
  },
  props: {
    type: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      ruleForm: {
        range: ''
      }
    }
  },
  methods: {
    dialogOpen() {
      this.$refs.dialog.show = true
    }

  }
}
</script>

<style lang="less" scoped>
.export-script {
  .export-form {
    & > .el-form-item {
      margin-bottom: 0px;
      & .el-checkbox {
        width: 100px;
      }
      p {
        color: #ccc;
      }
    }
  }
}
</style>
