<template>
  <div class="supplementary-details">
    <div class="btn">
      <el-button class="back-btn" type="return" @click="back"><i class="iconfont icon-fanhui-copy" />返回</el-button>
    </div>
    <div class="supplementary-name">
      <span>工程名称（成本会计：王会计）</span>
    </div>
    <el-form ref="form" :model="form" label-width="170px" :rules="formRules" class="rule-form-flex">
      <el-form-item label="协议编号">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="协议名称">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="协议金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="协议状态">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="归档日期">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="建设单位">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="签订日期">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="签订地点">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="结构类型">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="建筑面积">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="绝对工期">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="协议概况" class="one-width row-label">
        <el-input v-model.trim="form.name" disabled type="textarea" :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>

      <el-form-item label="协议范围" class="one-width row-label">
        <el-input v-model.trim="form.name" disabled type="textarea" :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>

      <el-form-item label="协议" class="one-width row-label">
        <span>1231231</span>
      </el-form-item>

      <el-form-item label="备注" class="one-width row-label">
        <el-input v-model.trim="form.name" type="textarea" disabled :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>

      <el-form-item label="经办人">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="经办日期">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="经办组织">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="录入人">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="录入时间">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'SupplementaryDetails',
  data() {
    return {
      form: {
        name: '10'
      }
    }
  },
  methods: {
    back() {
      this.$emit('changeComName', 'Supplementary', 'cancel')
    }
  }
}
</script>
<style lang="less" scoped>
.supplementary-details {
  margin-bottom: 10px;
  .supplementary-name {
    display: flex;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    margin: 10px 0;
  }
}
</style>
