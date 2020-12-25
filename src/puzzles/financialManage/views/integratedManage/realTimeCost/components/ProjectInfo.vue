<!--工程合同信息-->
<template>
  <div class="project-info">
    <div class="project-name">
      <span>工程名称（成本会计：王会计）</span>
    </div>
    <el-form ref="form" :model="form" label-width="170px" :rules="formRules" class="rule-form-flex">
      <el-form-item label="合同编号">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="合同归属">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="归属单位">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="合同类型">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="合同类别">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="签订日期">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="工程名称" class="one-width">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="收支类型">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="合同金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="结算金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="工程地点">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="建设单位">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="建设单位联系人">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="建设单位联系电话">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="设计单位">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="监理单位">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="工程规模">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="合同状态">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="归档日期">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="工程状态">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="开工日期">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="竣工日期">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="绝对工期">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="工程建筑师">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="是否注册建筑师">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="变更建筑师">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="建筑用途">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="结构类型">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="建筑面积">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="是否备案">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="是否有施工许可证">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="是否有中标通知书">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="合同备案号">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="施工许可证号">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="合同结算书">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="施工许可证">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="中标通知书">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="工程概况" class="one-width row-label">
        <el-input v-model.trim="form.name" disabled type="textarea" :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>

      <el-form-item label="工程范围" class="one-width row-label">
        <el-input v-model.trim="form.name" disabled type="textarea" :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>

      <el-form-item label="合同备注" class="one-width row-label">
        <el-input v-model.trim="form.name" type="textarea" disabled :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>

      <el-form-item label="经办组织">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="经办日期">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="经办人">
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
  name: 'ProjectInfo',
  data() {
    return {
      form: {
        name: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.project-info {
  margin-bottom: 10px;
  .project-name {
    display: flex;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    margin: 10px 0;
  }
}
</style>
