<template>
  <div class="approval-information">
    <el-form ref="ruleform" :model="ruleform" :rules="rules" label-width="110px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="批准用款金额">
            <el-input v-model="ruleform.applicant" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="批准用款金额">
            <el-input v-model="ruleform.applicant" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="录入人员">
            <el-input v-model="ruleform.applicant" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="录入日期">
            <el-date-picker
              v-model="ruleform.applicant"
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
export default {
  components: {

  },
  data() {
    return {
      ruleform: {
        applicant: '',
        region: ''

      }

    }
  }
}
</script>

<style lang="less" scoped>
.approval-information{
 .el-date-editor{
  width:100%;
}
}

</style>
