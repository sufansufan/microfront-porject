<template>
  <div class="disassemble">
    <el-form label-width="110px" :rules="rules" :model="ruleform">
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备类型" prop="rolename">
            <el-radio v-model="radio" label="1">考勤机</el-radio>
            <el-radio v-model="radio" label="2">闸机</el-radio>
            <el-radio v-model="radio" label="3">人脸识别</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备编号" prop="rolename">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="拆卸日期" prop="roletype">
            <el-date-picker
              v-model="ruleform.rolename"
              type="date"
              style="width:100%"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align:center;">
      <el-button type="primary">保存</el-button>
      <el-button class="cancel-btn" @click="$emit('changeTabConent', 'equipment', 'default')">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '1',
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
  methods: {}
}
</script>

<style lang="less">
</style>
