<template>
  <div class="receive-patment-add">
    <el-form ref="form" :model="form" label-width="170px" :rules="formRules" class="rule-form-flex">
      <el-form-item label="收付款类型" prop="name">
        <el-input v-model.trim="form.name" />
      </el-form-item>
      <el-form-item label="收付款日期" prop="name">
        <el-input v-model.trim="form.name" />
      </el-form-item>
      <el-form-item label="金额" prop="name">
        <el-input v-model.trim="form.name" />
      </el-form-item>

      <el-form-item label="收付款方式" prop="name">
        <el-input v-model.trim="form.name" />
      </el-form-item>
      <el-form-item label="收付款账户类型">
        <el-input v-model.trim="form.name" />
      </el-form-item>
      <el-form-item label="收付款账户">
        <el-input v-model.trim="form.name" />
      </el-form-item>

      <el-form-item label="支票号">
        <el-input v-model.trim="form.name" />
      </el-form-item>
      <el-form-item label="支票银行名称">
        <el-input v-model.trim="form.name" />
      </el-form-item>

      <el-form-item label="备注" class="one-width row-label">
        <el-input v-model.trim="form.name" type="textarea" :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>

    </el-form>
    <div class="btn">
      <el-button type="primary">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReceivePatmentAdd',
  data() {
    return {
      form: {
        name: ''
      },
      formRules: {
        name: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('changeComName', 'ReceivePayment')
    }
  }
}
</script>
<style lang="less" scoped>
.receive-patment-add {
  .btn {
    display: flex;
    justify-content: center;
  }
}
</style>
