<template>
  <div class="cash-transfer">
    <el-form
      :rules="rules"
      :model="ruleform"
      label-width="180px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="转出现金账户名称"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
              disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="当前余额"
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
        <el-col :span="8">
          <el-form-item
            label="转入账户类型"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="转账日期"
            prop="value1"
          >
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="类别"
            prop="number"
          >
            <el-select
              v-model="number"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 根据账户转账类型判断 -->
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="转入银行（开户行名称）"
            prop="number"
          >
            <el-select
              v-model="number"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            label="转入银行账户"
            prop="value1"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="转入银行金额"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入银行金额"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="转账说明"
            prop="remark"
          >
            <el-input
              v-model="ruleform.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="录入人员"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
              disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="录入时间"
          >
            <el-date-picker
              v-model="value1"
              type="date"
              format="yyyy-MM-dd-hh-mm-ss"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="btnadd">
            <el-button type="primary">确认转账</el-button>
            <el-button class="cancel-btn" @click="$emit('changeTabBank', 'cashActive', 'default')">取消</el-button>
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
      value1: '2020-12-12',
      options: [
        { label: '定时', value: 'timing' },
        { label: '即时', value: 'timedImmediate' }
      ],
      downTime: '',
      ruleform: {
        number: '',
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: ''
      },
      rules: {
        number: [{ required: true, message: '请填写' }],
        available: [{ required: true, message: '请填写' }],
        name: [{ required: true, message: '请填写' }],
        serviceurl: [{ required: true, message: '请填写' }],
        servicerule: [{ required: true, message: '请填写' }]
      }
    }
  }
}
</script>

<style lang="less">
.cash-transfer {
  .btnadd {
    width: 100%;
    text-align: center;
  }
  .el-date-editor.el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
</style>
