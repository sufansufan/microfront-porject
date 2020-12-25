<template>
  <div class="add-advancepayment">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="预缴税款所在区">
            <el-select v-model="ruleForm.affiliatedOrganization" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预缴税率（%）">
            <el-input v-model="ruleForm.reimbursementName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="预缴附加税所在区">
            <el-select v-model="ruleForm.affiliatedOrganization" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地区附加税率（%）">
            <el-input v-model="ruleForm.reimbursementName" />

          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="本次预缴税额">
            <el-input v-model="ruleForm.reimbursementName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预缴税款日期">
            <el-input v-model="ruleForm.reimbursementName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="预缴附加税">
            <el-input v-model="ruleForm.reimbursementName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="完税凭证号">
            <el-input v-model="ruleForm.reimbursementName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="缴款人">
            <el-input v-model="ruleForm.reimbursementName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="缴纳方式">
            <el-input v-model="ruleForm.reimbursementName" />

          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="预缴附加税">
            <el-input v-model="ruleForm.reimbursementName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="完税凭证号">
            <el-input v-model="ruleForm.reimbursementName" />

          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="缴款人">
            <el-input v-model="ruleForm.reimbursementName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="缴纳方式">
            <el-select v-model="ruleForm.affiliatedOrganization" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="ruleForm.reimbursementName" type="textarea" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="录入人员">
            <el-input v-model="ruleForm.reimbursementName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="录入日期">
            <el-input v-model="ruleForm.reimbursementName" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="btn">
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
      ruleForm: {
        region: '',
        reimbursementNumber: '',
        reimbursementName: '',
        affiliatedOrganization: '',
        isTrue: '',
        applicationTime: ''
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
	.add-advancepayment {
		.el-select,.btn{
			width:100%
      }
      .btn{
        text-align:right;
      }
	}
</style>
