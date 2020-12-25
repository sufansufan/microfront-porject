<!-- @date: 2020-08-18 17:49:26 -->
<template>
  <div class="search">
    <div class="select">
      <div>
        <span>编号</span>
        <div>
          <el-input v-model="authorizationId" placeholder="请输入编号" />
        </div>
      </div>

      <div>
        <span>授权人工号</span>
        <div>
          <el-input v-model="jobNumber" placeholder="请输入授权人工号" />
        </div>
      </div>

      <div>
        <span>授权时间</span>
        <div>
          <el-date-picker
            v-model="date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </div>
      </div>
      <div>
        <span>授权人</span>
        <div>
          <el-input v-model="authorization" placeholder="请输入授权人" />
        </div>
      </div>
      <div>
        <span>状态</span>
        <div>
          <el-select v-model="status" clearable multiple>
            <el-option
              v-for="status in statusList"
              :key="status"
              :value="status.value"
              :label="status.label"
            />
          </el-select>
        </div>
      </div>
      <div class="query">
        <div>
          <el-button icon="el-icon-search" type="primary" @click="handlerClickSearch">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="btn">
      <div>
        <el-button-group>
          <el-button type="primary" @click="handlerAuthorization">访问授权</el-button>
        </el-button-group>
      </div>
    </div>

    <custom-dialog ref="dialog" title="数据库访问权限">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="授权人">
          <el-input v-model="userName" readonly />
        </el-form-item>
        <el-form-item label="授权企业">
          <el-input v-model="orgName" readonly />
        </el-form-item>
        <el-form-item label="输入秘钥" prop="secretKey">
          <el-input v-model.trim="form.secretKey" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" :rows="4" placeholder="请输入描述" />
        </el-form-item>
      </el-form>
      <div v-solt:footer style="text-align:center">
        <el-button type="primary" @click="confirmAuthorization">确定授权</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </div>
    </custom-dialog>
  </div>
</template>

<script>
import { validateLength } from '@core/utils/validate'
import { getSessionStorage } from '@core/utils/auth.js'
import CustomDialog from '@frames/dashboard/components/Dialog'
export default {
  name: 'TopSearch',
  components: {
    CustomDialog
  },
  data() {
    return {
      dialog: false,
      date: [],
      authorization: '',
      status: [],
      jobNumber: '',
      authorizationId: '',
      form: {
        secretKey: '',
        description: ''
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      rules: {
        secretKey: validateLength(0, 30),
        description: validateLength(0, 255)
      },
      statusList: [
        {
          value: 'pending',
          label: '待处理'
        },
        {
          value: 'processing',
          label: '处理中'
        },
        {
          value: 'done',
          label: '已完成'
        }
      ]
    }
  },
  computed: {
    userName() {
      return getSessionStorage('userName')
    },
    orgName() {
      return getSessionStorage('orgName')
    }
  },
  watch: {},
  created() {},
  methods: {
    getParams() {
      const result = {
        authorization: this.authorization,
        status: this.status,
        id: this.authorizationId,
        authorizer: this.jobNumber,
        authorizedTime: this.formaterDate(this.date)
      }
      return result
    },
    formaterDate(date) {
      const params = {
        after: date[0] ? date[0] : '',
        before: date[1] ? date[1] : ''
      }
      return params
    },
    handlerClickSearch() {
      const params = this.getParams()
      this.$emit('update-params', params)
    },
    handlerAuthorization() {
      this.$refs.dialog.show = true
    },
    confirmAuthorization() {
      this.$refs.form.validate(boolean => {
        if (boolean) {
          this.$emit('update-authorization', {
            enterpriseKey: this.form.secretKey,
            description: this.form.description
          })
          this.clearDescription()
          this.$refs.dialog.show = false
        }
      })
    },
    // 需要不需要清空没人说 我也不知道
    clearDescription() {
      this.form.description = ''
      this.form.secretKey = ''
      this.$refs.form.clearValidate()
      // this.$refs.form.resetFields();
    },
    cancel() {
      this.clearDescription()
      this.$refs.dialog.show = false
    }
  }
}
</script>
<style lang='less' scoped>
</style>
<style lang='less'>
</style>
