<template>
  <div class="essential-information">
    <el-form label-width="130px" :rules="rules" :model="ruleform">
      <el-row>
        <el-col :span="8">
          <el-form-item label="验收单号" prop="rolename">
            <el-input v-model="ruleform.rolename" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供货单号" prop="rolename">
            <el-input v-model="ruleform.rolename" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="采购单号" prop="rolename">
            <el-input v-model="ruleform.rolename" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="材料款（元）" prop="roletype">
            <el-input v-model="ruleform.rolename" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="负责人" prop="roletype">
            <el-input v-model="ruleform.rolename" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="验收完成时间" prop="roletype">
            <el-date-picker
              v-model="ruleform.rolename"
              type="datetime"
              :disabled="true"
              style="width:100%"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="验收结果" prop="range">
            <el-select
              v-model="ruleform.roletype"
              placeholder="请选择"
              style="width:100%"
              :disabled="true"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="参与人" prop="type">
            <el-select
              v-model="ruleform.roletype"
              placeholder="请选择"
              style="width:100%"
              :disabled="true"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="附件" prop="remark">
            <span style="color:#0a4c8a">134533333223</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
              type="textarea"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="审批人" prop="remark">
            <process />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Process from '@frames/dashboard/components/Process'
export default {
  components: { Process },
  data() {
    return {
      num: 1,
      ruleform: {
        rolename: '',
        roletype: '',
        range: '',
        type: '',
        application: '',
        remark: ''
      },
      rules: {
        rolename: [
          {
            required: true,
            message: '请填写'
          }
        ],
        roletype: [
          {
            required: true,
            message: '请选择'
          }
        ],
        range: [
          {
            required: true,
            message: '请选择'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择'
          }
        ],
        application: [
          {
            required: true,
            message: '请填写'
          }
        ]
      }
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    view() {}
  }
}
</script>

<style lang="less">
</style>
