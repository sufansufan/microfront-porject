<template>
  <div class="add-project">
    <el-form label-width="80px" :rules="rules" :model="ruleform">
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目名称" prop="rolename">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目类型" prop="roletype">
            <el-select v-model="ruleform.roletype" placeholder="请选择" class="fill-name">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目归属" prop="roletype">
            <el-select v-model="ruleform.roletype" placeholder="请选择" class="fill-name">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="归属单位" prop="range">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="招标单位" prop="type">
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
            <el-button class="cancel-btn">取消</el-button>
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
	.add-project {
		.fill-name {
			width: 100%;
		}

		.btnadd {
			width: 100%;
			text-align: center;
		}
	}
</style>
