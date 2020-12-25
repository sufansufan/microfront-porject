<template>
  <div class="out-project">
    <drag-dialog ref="dialog" :title="title" :is-show.sync="isShow">
      <template #default>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="rule-form-flex"
        >
          <el-form-item label="退出日期" prop="date" class="one-width">
            <el-date-picker
              v-model="ruleForm.date"
              type="date"
              clearable
              placeholder="请选择退出日期"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </template>

    </drag-dialog>
  </div>
</template>

<script>
import { quitproject } from '@core/api/projectManage/projectmanager'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '退出项目'
    },
    projectInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm: {
        date: ''
      },
      rules: {
        date: [{ type: 'date', required: true, message: '请选择退出日期', tirgger: ['change', 'blur'] }]
      }
    }
  },
  computed: {
    pickerOptions() {
      const that = this
      return {
        disabledDate(time) {
          return time.getTime() < new Date(that.projectInfo?.inDate).getTime() - 3600 * 24 * 1000
        }
      }
    },
    isShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  methods: {
    submit() {
      console.log(this.ruleForm)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const params = {
            Loading: true,
            id: this.projectInfo.id,
            ...this.ruleForm
          }
          quitproject(params).then(() => {
            this.$message.success('退出项目成功')
            this.isShow = false
            this.$emit('fetchData')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
