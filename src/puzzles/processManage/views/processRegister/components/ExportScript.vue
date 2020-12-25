<template>
  <drag-dialog ref="exprotDialog" title="导出脚本" width="50%">
    <el-form ref="form" :model="form" label-position="right" label-width="100px" class="ruleForm">
      <el-form-item prop="check">
        <span slot="label"><span class="custom-form-label">*</span>导出对象</span>
        <span class="tip">（平台将导出以下被勾选项的dml脚本）</span>
        <el-checkbox-group v-model="form.checkList">
          <el-checkbox
            v-for="(item) in checkboxList"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="导出范围">
        <span slot="label"><span class="custom-form-label">*</span>导出范围</span>
        <el-radio-group v-model="form.range" class="radio-group">
          <div v-for="item in rangeList" :key="item.value" class="radio-wapper">
            <el-radio :label="item.value">{{ item.label }}</el-radio>
            <el-date-picker
              v-if="item.date"
              v-model="form.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </el-radio-group>
        <span class="tip">（平台将导出数据的最后修改时间位于此时间段内的dml脚本）</span>
      </el-form-item>
      <el-form-item label="脚本类型">
        <span slot="label"><span class="custom-form-label">*</span>脚本类型</span>
        <span class="tip">（平台将导出勾选类型的dml脚本）</span>
        <el-checkbox-group v-model="form.type">
          <el-checkbox
            v-for="(item) in typeList"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div class="button-list">
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </drag-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import DragDialog from '@frames/dashboard/components/Dialog'
import { exportRegister } from '@core/api/processManage/workflowmanager'
import { exportExcel } from '@core/utils'
export default {
  name: 'ExportScript',
  components: {
    DragDialog
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        range: 0,
        dateRange: [],
        checkList: [],
        type: []
      },
      rangeList: [
        { value: 0, label: '全部' },
        { value: 1, label: '最后修改日期', date: true }
      ],
      checkboxList: [
        { value: 'flowType', label: '流程维护' },
        {
          label: '流程参数',
          value: 'flowParam'
        },
        {
          label: '流程表单',
          value: 'flowForm'
        },
        {
          label: '特定审批人',
          value: 'flowApprover'
        }
      ],
      //  <!-- 删除脚本 插入脚本 更新脚本  -->
      typeList: [
        {
          value: 'delete',
          label: '删除脚本'
        },
        {
          value: 'insert',
          label: '插入脚本'
        },
        {
          value: 'update',
          label: '更新脚本'
        }
      ]
    }
  },
  computed: {

    ...mapGetters(['nodeId']),
    ...mapState({
      applicationList: state => state.processManage.applicationListReg
    })
  },
  methods: {
    confirm() {
      if (!this.nodeId.applicationId) {
        this.$message.warning('请选择应用')
        return
      }
      const params = {
        appId: this.nodeId.id ? this.nodeId.applicationId : '',
        exportObjectList: this.form.checkList,
        isAll: this.form.range,
        registerId: this.nodeId.id ? this.nodeId.id : '',
        sqlType: this.form.type,
        updateDate: {
          after: this.form.dateRange[0],
          before: this.form.dateRange[1]
        }
      }
      if (this.form.checkList.length === 0) {
        this.$message.warning('请选择导出对象')
        return
      } else if (this.form.type.length === 0) {
        this.$message.warning('请选择脚本类型')
        return
      }
      exportRegister(params).then(res => {
        var nameStr = ''
        if (this.nodeId.applicationId) {
          this.applicationList.forEach(item => {
            if (item.applicationId === this.nodeId.applicationId) {
              nameStr += item.name + '_'
            }
          })
        } else if (this.nodeId.id) {
          this.applicationList.forEach(item => {
            item.businessFlowRegisters.forEach(e => {
              if (e.id === this.nodeId.id) {
                nameStr += e.name + '_'
              }
            })
          })
        }
        nameStr += '流程注册的'
        if (params.sqlType.lenght !== 0) {
          params.sqlType.forEach(item => {
            switch (item) {
              case 'delete':
                nameStr += '删除'
                break
              case 'insert':
                nameStr += '插入'
                break
              case 'update':
                nameStr += '更新'
                break
            }
          })
        }
        nameStr = nameStr + '脚本'
        if (res) {
          exportExcel(res, nameStr + '.sql')
          this.$refs.exprotDialog.show = false
        } else {
          this.$message.warning('当前导出内容')
        }
      })
    },
    resetForm() {
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    }
  }
}
</script>

<style lang='less' scoped>
.tip {
  color: #ccc;
}
.radio-group {
  display: block;
}

.button-list {
  display: flex;
  justify-content: flex-end;
}
</style>
