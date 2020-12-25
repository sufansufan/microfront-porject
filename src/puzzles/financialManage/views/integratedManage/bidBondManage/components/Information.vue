<template>
  <div class="information">
    <div class="information-name">
      <span>工程名称（成本会计：王会计）</span>
    </div>
    <el-form ref="form" :model="form" label-width="170px" class="rule-form-flex ">

      <el-form-item label="项目类型">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="项目归属">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="归属单位">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="招标单位">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="招标单位收款金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="招标单位退款金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="招标单位未退金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="收分公司/项目部金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="退分公司/项目部金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="未退分公司/项目部金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="备注" class="one-width">
        <el-input v-model.trim="form.name" type="textarea" :maxlength="255" :rows="3" disabled />
      </el-form-item>

      <el-form-item label="结清说明" class="one-width">
        <el-input v-model.trim="form.name" type="textarea" :maxlength="255" :rows="3" disabled />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'Information',
  data() {
    return {
      form: {
        name: '10'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.information-name {
    display: flex;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    margin: 10px 0;
  }

</style>
