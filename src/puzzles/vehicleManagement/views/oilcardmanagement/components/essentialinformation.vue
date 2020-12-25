<template>
  <div class="essential-information">
    <el-form
      :rules="rules"
      :model="ruleform"
      label-width="150px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="加油卡号">
            <el-input
              v-model="ruleform.read"
              placeholder="请输入"
              disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="油卡密码">
            <el-input
              v-model="ruleform.read"
              placeholder="请输入"
              disabled="true"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="购卡日期"
            prop="number"
          >
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="到期日期"
            prop="number"
          >
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="车牌号码"
            prop="number"
          >
            <el-input
              v-model="ruleform.read"
              placeholder="请输入"
              disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="所属组织"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
              disabled="true"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="持有人"
            prop="remark"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
              disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="卡余额"
            prop="remark"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
              disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="备注"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              type="textarea"
              disabled="true"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="录入人"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"

              disabled="true"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="录入时间"
            prop="number"
          >
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      number: '',
      options: [
        {
          label: '定时',
          value: 'timing'
        },
        {
          label: '即时',
          value: 'timedImmediate'
        }
      ],
      downTime: '',
      ruleform: {
        number: '',
        available: false,
        name: '',
        read: '只读',
        serviceurl: '',
        servicerule: '',
        remark: ''
      },
      rules: {
        number: [
          {
            required: true,
            message: '请填写'
          }
        ],
        available: [
          {
            required: true,
            message: '请填写'
          }
        ],
        name: [
          {
            required: true,
            message: '请填写'
          }
        ],
        serviceurl: [
          {
            required: true,
            message: '请填写'
          }
        ],
        servicerule: [
          {
            required: true,
            message: '请填写'
          }
        ]
      }
    }
  }
}
</script>

<style lang="less">
.essential-information {
  .el-textarea,
  .el-date-editor,
  .el-select {
    width: 100%;
  }
}
</style>
