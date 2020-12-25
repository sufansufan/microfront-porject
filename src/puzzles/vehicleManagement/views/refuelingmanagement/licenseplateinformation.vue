<template>
  <div class="licenseplate-information">
    <div style="margin-bottom:10px;">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" />  返回</el-button>
    </div>
    <el-form :rules="rules" :model="ruleform" label-width="130px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="车牌号码">
            <el-select v-model="value" placeholder="请选择" disabled="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属组织">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="支付方式" prop="number">
            <el-select v-model="value" placeholder="请选择" disabled="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="加油卡号" prop="number">
            <el-select v-model="value" placeholder="请选择" disabled="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="加油日期" prop="number">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="加油站" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="油类型" prop="number">
            <el-select v-model="value" placeholder="请选择" disabled="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="加油量（升）" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="单价（元）" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="金额（元）" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="经手人" prop="number">
            <el-select v-model="value" placeholder="请选择" disabled="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="number">
            <el-input v-model="ruleform.read" type="textarea" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="录入人" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="录入时间" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {

  data() {
    return {
      ruleform: {
        number: '',
        available: false,
        name: '',
        read: '只读',
        serviceurl: '',
        servicerule: '',
        remark: ''
      },
      rules: {
        number: [{
          required: true,
          message: '请填写'
        }],
        available: [{
          required: true,
          message: '请填写'
        }],
        name: [{
          required: true,
          message: '请填写'
        }],
        serviceurl: [{
          required: true,
          message: '请填写'
        }],
        servicerule: [{
          required: true,
          message: '请填写'
        }]
      }
    }
  }
}
</script>
<style lang="less" scoped>
	.licenseplate-information {
		padding: 20px;
		height: calc(100vh - 120px);
    overflow-y: scroll;
    .el-select,.el-date-editor{
      width:100%;
    }

	}
</style>
