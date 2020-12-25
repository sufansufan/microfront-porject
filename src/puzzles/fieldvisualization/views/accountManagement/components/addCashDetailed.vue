<template>
  <div class="add-cash-detailed">
    <el-form
      :rules="rules"
      :model="ruleform"
      label-width="150px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="账号名称"
          >
            <el-input
              v-model="ruleform.read"
              placeholder="请输入"
              disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="明细类型"
            prop="number"
          >
            <el-select
              v-model="number"
              placeholder="请选择支付方式"
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
            label="类别"
            prop="number"
          >
            <el-select
              v-model="number"
              placeholder="请选择支付方式"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="生效日期"
            prop="number"
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
            label="发生额（元）"
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
            label="单据号"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              disabled="true"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="支付方式"
            prop="number"
          >
            <el-select
              v-model="number"
              placeholder="请选择支付方式"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item
            label="摘要"
          >
            <el-input
              v-model="ruleform.read"
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
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              disabled="true"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="录入时间"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              disabled="true"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="btnadd">
        <el-button type="primary">保存</el-button>
        <el-button class="cancel-btn">取消</el-button>
      </div>

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
        { label: '定时', value: 'timing' },
        { label: '即时', value: 'timedImmediate' }
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
.add-cash-detailed {
  .btnadd {
    width: 100%;
    text-align: center;
  }
  .el-date-editor.el-input {
    width: 100%;
  }
  .select-small {
    width: 50%;
  }
  .el-form-item--small .el-form-item__content {
    display: flex;
  }
}
</style>
