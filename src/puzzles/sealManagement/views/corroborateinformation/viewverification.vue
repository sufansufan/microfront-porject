<template>
  <div class="view-verification">
    <div style="margin-bottom:10px;">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-form :rules="rules" :model="ruleform" label-width="150px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="编号">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="印证名称">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
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
          <el-form-item label="保管人" prop="number">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="能否借出" prop="number">
            <el-select v-model="value" placeholder="请选择" disabled="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效期">
            <el-date-picker v-model="ruleform.read" disabled="true" type="date" placeholder="选择日期" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态" prop="number">
            <el-select v-model="value" placeholder="请选择" disabled="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="附件" prop="number">
            <span>·确认派车按钮不动.mp4</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="number">
            <el-input v-model="ruleform.number" disabled="true" type="textarea" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="录入人" prop="number">
            <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="录入时间" prop="number">
            <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" />
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
      number: '',
      options: [{
        label: '定时',
        value: 'timing'
      },
      {
        label: '即时',
        value: 'timedImmediate'
      }
      ],
      downTime: '',
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

<style lang="less">
	.view-verification {
		height: calc(100vh - 160px);
		overflow-y: auto;
		padding: 20px;
		.el-textarea,
		.el-date-editor,
		.el-select {
			width: 100%;
		}

		.btnadd {
			width: 100%;
			text-align: center;
		}
	}
</style>
