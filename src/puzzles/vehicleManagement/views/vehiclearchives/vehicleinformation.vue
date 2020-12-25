<template>
  <div class="vehicle-information">
    <div style="margin-bottom:10px;">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" />  返回</el-button>
    </div>
    <el-form :rules="rules" :model="ruleform" label-width="130px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="车票号码">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆类型">
            <el-select v-model="value" placeholder="请选择" disabled="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属组织" prop="number">
            <el-select v-model="value" placeholder="请选择" disabled="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属人" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="司机" prop="number">
            <el-select v-model="value" placeholder="请选择" disabled="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="司机手机" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="车辆识别码" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发动机号码" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="品牌型号" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆颜色" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="核定载质量(千克)" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="核定载人数" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="使用性质" prop="number">
            <el-select v-model="value" placeholder="请选择" disabled="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购置日期" prop="number">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="出厂日期" prop="number">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购买价格" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" disabled="true" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="当前状态" prop="number">
            <el-select v-model="value" placeholder="请选择" disabled="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
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
	.vehicle-information {
		padding: 20px;
		height: calc(100vh - 120px);
    overflow-y: scroll;
    .el-select,.el-date-editor{
      width:100%;
    }

	}
</style>
