<template>
  <div class="export-script">
    <drag-dialog ref="dialog" title="导出脚本" width="45%">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="export-form">
        <template v-if="type !== 'system'">
          <el-form-item label="导出对象" prop="name">
            <span slot="label"><span class="custom-form-label">*</span>导出对象</span>
            <p>（平台将导出以下被勾选项的dml脚本）</p>
            <el-checkbox-group v-model="systemCheck">
              <el-checkbox label="dictionaryType">数据字典分类</el-checkbox>
              <el-checkbox label="dictionary">数据字典</el-checkbox>
              <el-checkbox label="emergencyworkType">紧急任务分类</el-checkbox>
              <el-checkbox label="emergencywork">紧急任务</el-checkbox>
              <el-checkbox label="systemNoticeType">系统消息分类</el-checkbox>
              <el-checkbox label="systemNotice">系统消息</el-checkbox>
              <el-checkbox label="dailytasksType">日常任务分类</el-checkbox>
              <el-checkbox label="dailytasks">日常任务</el-checkbox>
              <el-checkbox label="scheduleTask">调度任务</el-checkbox>
              <el-checkbox label="accessoryType">附件类型</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <el-form-item label="导出范围">
          <span slot="label"><span class="custom-form-label">*</span>导出范围</span>
          <div>
            <el-radio-group v-model="ruleForm.range">
              <el-radio :label="1">全部</el-radio> <br>
              <el-radio :label="2" style="margin-top:10px">最后修改日期</el-radio>
            </el-radio-group>
          </div>
          <div v-if="ruleForm.range === 2">
            <el-date-picker
              v-model="range"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="defaultTime"
            />
            <p>（平台将导出数据的最后修改时间位于此时间段内的dml脚本）</p>
          </div>
        </el-form-item>
        <el-form-item label="脚本类型" prop="name">
          <span slot="label"><span class="custom-form-label">*</span>脚本类型</span>
          <p>（平台将导出勾选类型的dml脚本）</p>
          <el-checkbox-group v-model="dmlCheck">
            <el-checkbox label="delete">删除脚本</el-checkbox>
            <el-checkbox label="insert">插入脚本</el-checkbox>
            <el-checkbox label="update">更新脚本</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import table from '@core/mixins/table'
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  components: {
    DragDialog
  },
  mixins: [table],
  props: {
    type: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      ruleForm: {
        range: 1
      },
      checked: '',
      rules: {},
      range: '',
      dmlCheck: [],
      systemCheck: []
    }
  },
  methods: {
    dialogOpen() {
      this.$refs.dialog.show = true
    },
    // 提交
    submit() {
      if (this.dmlCheck.length === 0) {
        this.$message.warning('请选择脚本类型')
        return
      }
      const params = {
        isAll: '',
        updateDate: {},
        sqlType: this.dmlCheck
      }
      if (this.type !== 'system') {
        params.exportObjectList = this.systemCheck
        if (this.systemCheck.length === 0) {
          this.$message.warning('请选择导出对象')
          return
        }
      }
      if (this.ruleForm.range === 1) {
        params.isAll = 1
        params.updateDate = { after: '', before: '' }
      } else {
        params.isAll = 0
        params.updateDate = {
          after: this.range[0],
          before: this.range[1]
        }
      }
      this.$emit('systemSub', params)
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
