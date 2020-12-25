<template>
  <div class="confirmationof-loan">
    <div class="title">
      <crumb-box>
        <div>借款信息</div>
      </crumb-box>
    </div>
    <el-form ref="ruleform" :model="ruleform" :rules="rules" label-width="120px" class="resorce-form">
      <el-form-item label="借款单号">
        <el-input v-model="ruleform.applicant" />
      </el-form-item>
      <el-form-item label="借款人">
        <el-input v-model="ruleform.applicationTime" value-format="yyyy-MM-dd" disabled />
      </el-form-item>
      <el-form-item label="所属组织" prop="name">
        <el-select v-model="ruleform.region" style="width: 100%" placeholder="请选择申请类别">
          <el-option label="区域一" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否项目借款" prop="region">
        <el-select v-model="ruleform.region" style="width: 100%" placeholder="请选择申请类别">
          <el-option label="区域一" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称" prop="name">
        <el-select v-model="ruleform.region" style="width: 100%" placeholder="请选择申请类别">
          <el-option label="区域一" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item label="归属单位" prop="region">
        <el-input v-model="ruleform.applicant" />
      </el-form-item>
      <el-form-item label="借款对象" prop="name">
        <el-select v-model="ruleform.region" style="width: 100%" placeholder="请选择申请类别">
          <el-option label="区域一" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item label="用款日期" prop="region">
        <el-input v-model="ruleform.applicant" />
      </el-form-item>
      <el-form-item label="借款用途" prop="name" class="purpose">
        <el-input v-model="ruleform.region" class="full-line" type="textarea" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="支付方式" prop="routec">
        <el-select v-model="ruleform.category" placeholder="请选择" class="full-width" @change="changeProduct($event)">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <template v-if="ProductActive ==0 && ProductActive !== null">
        <el-form-item label="收款账户名称" prop="route">
          <el-input v-model="ruleform.route" />
        </el-form-item>
        <el-form-item label="收款账号" prop="route">
          <el-input v-model="ruleform.route" />
        </el-form-item>
        <el-form-item label="开户行" prop="route">
          <el-input v-model="ruleform.route" />
        </el-form-item>
      </template>
      <el-form-item v-if="ProductActive ==1" label="收款单位" prop="routec">
        <el-input v-model="ruleform.routec" />
      </el-form-item>
      <template v-if="ProductActive !==null">
        <el-form-item label="附件" prop="route" class="purpose">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button type="primary">上传附件</el-button>
            <div slot="tip" class="el-upload__tip">单个附件请不要超过20M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="申请时间" prop="route">
          <el-input v-model="ruleform.route" />
        </el-form-item>
      </template>
    </el-form>
    <div class="title">
      <crumb-box>
        <div>确认信息</div>
      </crumb-box>
    </div>
    <el-form ref="ruleform" :model="ruleform" :rules="rules" label-width="110px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="付款金额">
            <el-input v-model="ruleform.applicant" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款人">
            <el-select v-model="ruleform.region" style="width: 100%" placeholder="请选择申请类别">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="付款日期" prop="name">
            <el-input v-model="ruleform.applicant" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预计还款日期" prop="region">
            <el-input v-model="ruleform.applicant" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="支票号" prop="name">
            <el-input v-model="ruleform.applicant" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支票银行名称" prop="region">
            <el-input v-model="ruleform.applicant" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="付款账户类型" prop="name">
            <el-select v-model="ruleform.region" style="width: 100%" placeholder="请选择申请类别">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款账户" prop="region">
            <el-input v-model="ruleform.applicant" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="name">
            <el-input v-model="ruleform.region" type="textarea" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item style="text-align:center;">
            <el-button type="primary">确定</el-button>
            <el-button class="cancel-btn"@click="$router.go(-1)">取消</el-button>
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
        number: '',
        name: '',
        category: '',
        task: '',
        route: '',
        routec: '',
        news: false,
        region: ''
      },
      rules: {
        number: [{
          required: true,
          message: '请填写'
        }],
        name: [{
          required: true,
          message: '请填写'
        }],
        category: [{
          required: true,
          message: '请选择'
        }],
        route: [{
          required: true,
          message: '请填写'
        }],
        news: [{
          required: true,
          message: '请选择'
        }]
      },
      options: [{
        value: '0',
        label: '电汇'
      },
      {
        value: '1',
        label: '支票'
      },
      {
        value: '2',
        label: '现金'
      }
      ],
      ProductActive: null
    }
  },
  methods: {
    changeProduct(event) {
      this.ProductActive = event
    }
  }
}
</script>

<style lang="less" scoped>
	.confirmationof-loan {
		height: calc(100vh - 160px);
		overflow-y: auto;
		padding: 20px;
		.resorce-form {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.el-form-item {
				width: 49%;

				.full-width {
					width: 100%;
				}
			}

			.purpose {
				width: 100%;

				.full-line {
					width: 100%;
				}
			}

			.text {
				color: #333;
			}
		}
	}
</style>
