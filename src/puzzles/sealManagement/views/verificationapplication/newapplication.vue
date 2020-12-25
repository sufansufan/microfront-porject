<template>
  <div class="new-application">
    <el-form :rules="rules" :model="ruleform" label-width="150px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请单号">
            <el-input v-model="ruleform.read" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请时间">
            <el-date-picker v-model="ruleform.read" type="date" placeholder="选择日期" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请部门" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人" prop="number">
            <el-input v-model="ruleform.read" placeholder="请输入" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input v-model="ruleform.read" placeholder="请输入" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="附件" prop="number">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">上传附件</el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              >单个附件请不要超过20M</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="事由" prop="number">
            <el-input v-model="ruleform.number" type="textarea" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="审批人:" prop="number">
            <span>平台找不到您发起此流程后的相关审批人（上级领导）无法发起流程，找不到项目经理请联系工程部，找不到其他岗位或人员请联系人力资源部！</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="btnadd">
            <el-button
              type="primary"
              @click="$router.push({
                name: 'addnextstep'
              })"
            >下一步</el-button>
            <el-button type="primary">保存</el-button>
            <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
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
  },
  methods: {

  }
}
</script>

<style lang="less">
	.new-application {
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
