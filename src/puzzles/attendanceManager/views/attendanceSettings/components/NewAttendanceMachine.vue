<template>
  <div class="new-attendance-machine">
    <el-form label-width="80px" :rules="rules" :model="ruleform">
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备编号" prop="rolename">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备型号" prop="rolename">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="购买日期" prop="roletype">
            <el-date-picker
              v-model="ruleform.rolename"
              type="date"
              style="width:100%"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="roletype">
            <el-radio v-model="radio" label="1">未使用</el-radio>
            <el-radio v-model="radio" label="2">已报废</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="功能" prop="range">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="人脸识别" />
              <el-checkbox label="近红外人脸识别" />
              <el-checkbox label="身份识别" />
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备类型" prop="range">
            <el-radio v-model="radio" label="1">考勤机</el-radio>
            <el-radio v-model="radio" label="2">闸机</el-radio>
            <el-radio v-model="radio" label="3">人脸识别</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="type">
            <el-input v-model="ruleform.rolename" type="textarea" placeholder="请输入" />
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
  methods: {
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="less">
</style>
