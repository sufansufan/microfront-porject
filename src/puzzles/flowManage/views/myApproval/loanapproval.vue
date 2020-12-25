<template>
  <div class="loan-approval">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="resorce-form">
      <el-form-item label="借款单号">
        <el-input v-model="ruleForm.applicant" />
      </el-form-item>
      <el-form-item label="借款人">
        <el-input v-model="ruleForm.applicationTime" value-format="yyyy-MM-dd" disabled />
      </el-form-item>
      <el-form-item label="所属组织" prop="name">
        <el-select v-model="ruleForm.region" style="width: 100%" placeholder="请选择申请类别">
          <el-option
            label="区域一"
            value="shanghai"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否项目借款" prop="region">
        <el-select v-model="ruleForm.region" style="width: 100%" placeholder="请选择申请类别">
          <el-option
            label="区域一"
            value="shanghai"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称" prop="name">
        <el-select v-model="ruleForm.region" style="width: 100%" placeholder="请选择申请类别">
          <el-option
            label="区域一"
            value="shanghai"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="归属单位" prop="region">
        <el-input v-model="ruleForm.applicant" />
      </el-form-item>
      <el-form-item
        label="借款金额"
        prop="name"
      >
        <el-input v-model="ruleForm.applicant" />
      </el-form-item>
      <el-form-item label="借款类型" prop="region">
        <el-select v-model="ruleForm.region" style="width: 100%" placeholder="请选择申请类别">
          <el-option
            label="区域一"
            value="shanghai"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="借款对象" prop="name">
        <el-select v-model="ruleForm.region" style="width: 100%" placeholder="请选择申请类别">
          <el-option
            label="区域一"
            value="shanghai"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="用款日期" prop="region">
        <el-input v-model="ruleForm.applicant" />
      </el-form-item>
      <el-form-item label="借款用途" prop="region" class="purpose">
        <el-input v-model="ruleForm.region" class="full-line" type="textarea" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="支付方式" prop="routec">
        <el-select v-model="ruleForm.region" placeholder="请选择" class="full-width" @change="changeProduct($event)">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <template v-if="ProductActive ==0 && ProductActive !== null">
        <el-form-item label="收款账户名称" prop="route">
          <el-input v-model="ruleForm.route" />
        </el-form-item>
        <el-form-item label="收款账号" prop="route">
          <el-input v-model="ruleForm.route" />
        </el-form-item>
        <el-form-item label="开户行" prop="route">
          <el-input v-model="ruleForm.route" />
        </el-form-item>
      </template>
      <el-form-item v-if="ProductActive ==1" label="收款单位" prop="routec">
        <el-input v-model="ruleForm.routec" />
      </el-form-item>
      <template>
        <el-form-item label="附件" prop="route" class="purpose" />
        <el-form-item label="申请时间" prop="route">
          <el-input v-model="ruleForm.route" />
        </el-form-item>
      </template>
      <el-form-item v-if="showbtn" class="purpose">
        <el-button type="primary">同意</el-button>
        <el-button type="danger">拒绝</el-button>
        <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      showbtn: false,
      ruleForm: {
        region: ''
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
.loan-approval {
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
      text-align: center;
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
