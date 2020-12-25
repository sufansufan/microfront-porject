// 新增借款
<template>
  <div class="add-loan">
    <el-form label-width="110px" :rules="rules" :model="ruleform" class="resorce-form">
      <el-form-item label="借款单号" prop="loannumber">
        <el-input v-model="ruleform.loannumber" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="借款人" prop="borrower">
        <el-input v-model="ruleform.borrower" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="所属组织" prop="affiliatedorganization">
        <el-select v-model="ruleform.affiliatedorganization" placeholder="请选择" class="full-width">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否项目借款" prop="projectloan">
        <el-select v-model="ruleform.projectloan" placeholder="请选择" class="full-width">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称" prop="entryname">
        <el-select v-model="ruleform.entryname" placeholder="请选择" class="full-width">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="归属单位" prop="vestingunit">
        <el-input v-model="ruleform.vestingunit" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="借款金额" prop="loanamount">
        <el-input v-model="ruleform.loanamount" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="借款类型" prop="typesofloans">
        <el-select v-model="ruleform.typesofloans" placeholder="请选择" class="full-width">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="借款对象" prop="borrowers">
        <el-select v-model="ruleform.borrowers" placeholder="请选择" class="full-width">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="用款日期" prop="dateofpayment">
        <el-input v-model="ruleform.dateofpayment" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="借款用途" prop="usageofloan" class="purpose">
        <el-input v-model="ruleform.usageofloan" type="textarea" placeholder="请输入" class="full-line" />
      </el-form-item>

      <el-form-item label="支付方式" prop="paymentmethod">
        <el-select v-model="ruleform.paymentmethod" placeholder="请选择" class="full-width" @change="changeProduct($event)">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <template v-if="ProductActive ==0 && ProductActive !== null">
        <el-form-item label="收款账户名称" prop="beneficiaryname">
          <el-input v-model="ruleform.beneficiaryname" />
        </el-form-item>
        <el-form-item label="收款账号" prop="receivingaccount">
          <el-input v-model="ruleform.receivingaccount" />
        </el-form-item>
        <el-form-item label="开户行" prop="openingbank">
          <el-input v-model="ruleform.openingbank" />
        </el-form-item>
      </template>
      <el-form-item v-if="ProductActive ==1" label="收款单位" prop="collectionunit">
        <el-input v-model="ruleform.collectionunit" />
      </el-form-item>
      <template>
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
        <template>
          <el-form-item label="审批人" prop="approver" class="purpose">
            <span class="text">审批人</span>
          </el-form-item>
        </template>
      </template>
      <div class="btn">
        <el-button type="primary">保存</el-button>
        <el-button type="primary">确定</el-button>
        <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      ruleform: { // 附件暂且搁置
        loannumber: '',
        borrower: '',
        affiliatedorganization: '',
        projectloan: '',
        entryname: '',
        vestingunit: '',
        loanamount: '',
        typesofloans: '',
        borrowers: '',
        dateofpayment: '',
        usageofloan: '',
        paymentmethod: '',
        beneficiaryname: '',
        receivingaccount: '',
        openingbank: '',
        collectionunit: '',
        approver: ''
      },
      rules: {
        affiliatedorganization: [{
          required: true,
          message: '请选择'
        }],
        projectloan: [{
          required: true,
          message: '请选择'
        }],
        entryname: [{
          required: true,
          message: '请选择'
        }],
        loanamount: [{
          required: true,
          message: '请填写'
        }],
        typesofloans: [{
          required: true,
          message: '请选择'
        }],
        borrowers: [{
          required: true,
          message: '请选择'
        }],
        dateofpayment: [{
          required: true,
          message: '请填写'
        }],
        usageofloan: [{
          required: true,
          message: '请填写'
        }],
        paymentmethod: [{
          required: true,
          message: '请选择'
        }],
        beneficiaryname: [{
          required: true,
          message: '请填写'
        }],
        receivingaccount: [{
          required: true,
          message: '请填写'
        }],
        openingbank: [{
          required: true,
          message: '请填写'
        }],
        collectionunit: [{
          required: true,
          message: '请填写'
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

<style lang="less">
	.add-loan {
		padding: 20px;
		height: calc(100vh - 160px);
		overflow-y: auto;
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
			.btn {
				width: 100%;
				text-align: center;
				margin-top: 20px;
			}
		}
	}
</style>
