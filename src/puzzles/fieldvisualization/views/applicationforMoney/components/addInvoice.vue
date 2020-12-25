<template>
  <div class="add-invoice">
    <el-form :rules="rules" :model="ruleform" label-width="130px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="收票日期" prop="number">
            <el-input v-model="ruleform.number" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开票日期" prop="number">
            <el-input v-model="ruleform.number" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票编号" prop="number">
            <el-input v-model="ruleform.number" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="发票类型" prop="number">
            <el-select
              v-model="ruleform.category"
              placeholder="请选择"
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
        <el-col :span="8">
          <el-form-item label="发票金额" prop="number">
            <el-input v-model="ruleform.number" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票税率(%)" prop="number">
            <el-input v-model="ruleform.number" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="发票无税金额" prop="number">
            <el-input v-model="ruleform.number" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票税金" prop="number">
            <el-input v-model="ruleform.number" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票归类" prop="number">
            <el-select
              v-model="ruleform.category"
              placeholder="请选择"
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
        <el-col :span="8">
          <el-form-item label="发票代码" prop="number">
            <el-input v-model="ruleform.number" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="销方纳税人识别号" prop="number">
            <el-input v-model="ruleform.number" placeholder="请输入" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="number">
            <el-input v-model="ruleform.number" placeholder="请输入" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="btnadd">
            <el-button type="primary">保存</el-button>
            <el-button type="primary">保存并新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {

  },
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
  }
}
</script>

<style lang="less" scoped>
.add-invoice {
  .btnadd {
    width: 100%;
    text-align: right;
  }
  .el-select {
    width: 100%;
  }
}
</style>
