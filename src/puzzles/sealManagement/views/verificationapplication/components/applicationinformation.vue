<template>
  <div class="application-information">
    <el-form :model="ruleform" label-width="150px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请单号">
            <el-input v-model="ruleform.read" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请时间">
            <el-date-picker v-model="ruleform.read" :disabled="true" type="date" placeholder="选择日期" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="申请部门">
            <el-input v-model="ruleform.read" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人">
            <el-input v-model="ruleform.read" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input v-model="ruleform.read" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="附件">
            <span>附件1</span>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="事由">
            <el-input v-model="ruleform.read" type="textarea" :disabled="true" placeholder="请输入" />
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
        read: '只读'
      }

    }
  }
}
</script>

<style lang="less">
.application-information{
  .el-date-editor{
    width:100%;
  }
}
</style>
