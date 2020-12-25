<template>
  <div class="number-appoint">
    <drag-dialog ref="dialog" :title="title" :is-show.sync="isShow">
      <template #default>
        <el-form
          ref="ruleForm"
          v-loading="loading"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="rule-form-flex"
        >
          <el-form-item label="项目岗位" class="one-half">
            <el-input
              v-model="projectInfo.postName"
              :placeholder="getPlaceHolder('项目岗位')"
              :disabled="true"
              clearable
            />
          </el-form-item>
          <el-form-item label="员工姓名" prop="userId" class="one-half">
            <jdy-select
              v-model="ruleForm.userId"
              holder="员工姓名"
              value-key="id"
              :select-data="personnelList"
              :select-options="{value: 'id', label: 'name'}"
              :disabled="disabled"
            />
          </el-form-item>
          <el-form-item label="其它职责" prop="otherDuty" class="one-width">
            <el-checkbox-group v-model="ruleForm.otherDuty">
              <el-checkbox label="01">材料验收(勾选后该员工将参与材料验收工作)</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="进入日期" prop="inDate" class="one-width">
            <el-date-picker
              v-model="ruleForm.inDate"
              type="date"
              clearable
              :placeholder="getPlaceHolder('进入日期', 1)"
              :picker-options="startPickerDateTime"
            />
          </el-form-item>
          <el-form-item label="备注" class="one-width row-label">
            <el-input
              v-model="ruleForm.remark"
              :placeholder="getPlaceHolder('备注')"
              clearable
              type="textarea"
              :rows="3"
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
import { getAllPersonnel } from '@core/api/personnel'
import { memberAppoint, updateMemberAppoint } from '@core/api/projectManage/projectmanager'
import { getSessionStorage } from '@core/utils/auth'
import { endPickerDate } from '@core/utils'
// import { mapGetters } from 'vuex'
export default {
  inject: ['getRuleForm'],
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
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        userId: '',
        userName: '',
        otherDuty: [],
        inDate: '',
        remark: ''
      },
      personnelList: [],
      rules: {
        inDate: [
          { required: true, message: '请选择进入日期', trigger: 'change' }
        ],
        userId: [
          { required: true, message: '请选择员工姓名', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    // ...mapGetters(['projectInfo']),
    isShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    },
    startPickerDateTime() {
      const { startDate, realStartDate } = this.projectInfo
      const startDateTime = new Date(startDate).getTime()
      const realStartDateTime = new Date(realStartDate).getTime()
      var disabledDate = ''
      if (!startDateTime && realStartDateTime) {
        disabledDate = realStartDateTime
      } else if (startDateTime && !realStartDateTime) {
        disabledDate = realStartDateTime
      } else if (startDateTime && realStartDateTime) {
        if (startDateTime < realStartDateTime) {
          disabledDate = startDateTime
        } else {
          disabledDate = realStartDateTime
        }
      }
      return endPickerDate(disabledDate)
    }
  },
  watch: {
    isEdit: {
      handler(newV) {
        const { userId, userName, otherDuty, inDate, remark, id } = this.projectInfo
        this.ruleForm = {
          userId: { id: userId, name: userName },
          otherDuty: [otherDuty],
          inDate,
          remark,
          id
        }
      },
      immediate: true
    }
  },
  created() {
    this.fetchAllPersonnel()
  },
  methods: {
    getPlaceHolder(title, type = 0) {
      const typeMap = ['请输入', '请选择']
      return `${typeMap[type]}${title}`
    },
    fetchAllPersonnel() {
      const orgId = getSessionStorage('orgId')
      getAllPersonnel(orgId, { componentBusinessCode: '210009' }).then(({ data }) => {
        this.personnelList = data
      })
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const { postId, postName } = this.projectInfo
          const { projectId } = this.$route.query
          const { userId: { id, name }, otherDuty } = this.ruleForm
          const params = {
            Loading: true,
            ...this.ruleForm,
            userId: id,
            userName: name,
            postId,
            postName,
            projectId,
            otherDuty: otherDuty.toString()
          }
          this.submitApi(params)
        } else {
          return false
        }
      })
    },
    submitApi(params) {
      if (this.isEdit) {
        updateMemberAppoint(params).then(() => {
          this.$message.success('修改成功')
          this.isShow = false
          this.$emit('fetchData')
        })
      } else {
        memberAppoint(params).then(() => {
          this.$message.success('任命成功')
          this.isShow = false
          this.$emit('fetchData')
        })
      }
    }
  }
}
</script>
