<template>
  <div class="add-collectionpayment">
    <el-form label-width="110px" :rules="rules" :model="ruleform">
      <el-row>
        <el-col :span="24">
          <el-form-item label="收付款类型" prop="rolename">
            <el-select v-model="ruleform.rolename" placeholder="请选择" class="fill-name">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="收付款日期" prop="roletype">
            <el-date-picker v-model="ruleform.roletype" type="date" placeholder="选择日期" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收付款方式" prop="roletype">
            <el-select v-model="ruleform.roletype" placeholder="请选择" class="fill-name">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支票号" prop="roletype">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="发票金额(元)" prop="range">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="application">
            <el-input v-model="ruleform.rolename" type="textarea" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="录入人员" prop="remark">
            <el-input v-model="ruleform.remark" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="录入日期" prop="remark">
            <el-input v-model="ruleform.remark" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="btnadd">
            <el-button type="primary">提交</el-button>
            <el-button class="cancel-btn" @click="$router.back(-1)">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      ruleform: {
        rolename: '',
        roletype: '',
        range: '',
        type: '',
        application: '',
        remark: ''
      },
      rules: {
        rolename: [{
          required: true,
          message: '请填写'
        }],
        roletype: [{
          required: true,
          message: '请选择'
        }],
        range: [{
          required: true,
          message: '请选择'
        }],
        type: [{
          required: true,
          message: '请选择'
        }],
        application: [{
          required: true,
          message: '请填写'
        }]
      }
    }
  }
}
</script>

<style lang="less">
	.add-collectionpayment {
		.fill-name,.el-date-editor{
			width: 100%;
		}
		.btnadd {
			width: 100%;
			text-align: center;
		}
	}
</style>
