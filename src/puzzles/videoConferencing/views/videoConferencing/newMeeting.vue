<template>
  <div class="new-meeting">
    <div>
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-form :rules="rules" :model="ruleform" label-width="150px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="会议编号">
            <el-input
              v-model="ruleform.read"
              placeholder="请输入"
              :disabled="true
              "
            />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="会议主题">
            <el-input
              v-model="ruleform.read"
              placeholder="请输入会议主题"
              :disabled="true
              "
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="会议类型" prop="number">
            <el-select v-model="value" placeholder="请选择会议类型">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计划开始时间" prop="number">
            <el-date-picker
              v-model="value"
              type="datetime"
              placeholder="请选择计划开始时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预计结束时间" prop="number">
            <el-date-picker
              v-model="value"
              type="datetime"
              placeholder="请选择预计结束时间"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <Detail />
        </el-col>

      </el-row>
      <el-row style="margin-top:10px;">
        <el-col :span="24">
          <el-form-item label="会议内容" prop="number">
            <el-input v-model="ruleform.number" type="textarea" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="会议资料" prop="number">
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
        <el-col :span="8">
          <el-form-item label="发起人:" prop="number">
            <el-input v-model="ruleform.number" placeholder="请输入" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发起时间:" prop="number">
            <el-date-picker
              v-model="value"
              type="date"
              :disabled="true"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <div class="btnadd">
      <el-button type="primary">保存</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>

  </div>
</template>

<script>
import Detail from './components/Detail'
export default {
  components: { Detail },
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
	.new-meeting {
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
