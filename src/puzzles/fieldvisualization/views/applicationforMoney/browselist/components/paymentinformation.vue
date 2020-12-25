<template>
  <div class="payment-information">
    <el-form
      :rules="rules"
      :model="ruleform"
      label-width="100px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="单据编号"
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
            label="收款单位"
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
            label="工程名称"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="财务类别"
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
            label="付款类别"
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
            label="支付方式"
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
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="账户类型"
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
            label="付款账户"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item
            label="当前余额"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item
            label="付款日期"
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
            label="付款金额"
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
            label="领款人"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="摘要"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              type="textarea"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item
            label="合同名称"
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
            label="合同编号"
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
            label="合同金额"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="对应发票"
            prop="number"
          >

            <transfer-list />
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
              placeholder="请输入"
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
            <el-input v-model="ruleform.number" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="录入日期"
            prop="number"
          >
            <el-date-picker
              v-model="ruleform.number"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import TransferList from './transferlist'
export default {
  components: { TransferList },
  data() {
    return {
      ruleform: {
        number: '',
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: ''
      }
    }
  },
  methods: {}
}
</script>

<style lang="less">
.payment-information {
  // height: calc(100vh - 160px);
  // overflow-y: auto;
  // // padding:20px 0;

  .el-date-editor,.el-select {
    width: 100%;
  }

}
</style>
