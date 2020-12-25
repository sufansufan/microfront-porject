<template>
  <div class="meetting-room-detail">
    <div class="go-back">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-form label-width="110px" :rules="rules" :model="ruleform" class="resorce-form">
      <el-form-item label="会议室编号" prop="loannumber">
        <el-input v-model="ruleform.loannumber" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="会议室名称" prop="borrower">
        <el-input v-model="ruleform.borrower" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="会议室归属" prop="affiliatedorganization">
        <el-select v-model="ruleform.affiliatedorganization" placeholder="请选择" class="full-width">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="归属单位" prop="projectloan">
        <el-select v-model="ruleform.projectloan" placeholder="请选择" class="full-width">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="视频会议" prop="entryname">
        <el-select v-model="ruleform.entryname" placeholder="请选择" class="full-width">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="视频监控" prop="vestingunit">
        <el-input v-model="ruleform.vestingunit" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="会议室地址" prop="usageofloan" class="purpose">
        <el-input v-model="ruleform.vestingunit" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="管理员" prop="loanamount">
        <el-input v-model="ruleform.loanamount" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="联系电话" prop="typesofloans">
        <el-input v-model="ruleform.loanamount" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="可容纳人数" prop="dateofpayment">
        <el-input v-model="ruleform.dateofpayment" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="状态" prop="borrowers">
        <el-select v-model="ruleform.borrowers" placeholder="请选择" class="full-width">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="拥有设备" prop="borrowers" class="purpose">
        <el-checkbox-group v-model="checkList" class="full-width">
          <el-checkbox label="投影仪" />
          <el-checkbox label="无线网络" />
          <el-checkbox label="有线网络" />
          <el-checkbox label="液晶电视" />
          <el-checkbox label="音响" />
          <el-checkbox label="麦克风" />
          <el-checkbox label="空调" />
          <el-checkbox label="其他设备" />
          <el-input v-model="ruleform.dateofpayment" placeholder="请输入" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="录入人" prop="dateofpayment">
        <el-input v-model="ruleform.dateofpayment" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="录入时间" prop="dateofpayment">
        <el-input v-model="ruleform.dateofpayment" placeholder="请输入" class="full-width" />
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MeettingRoomDetail',
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
  .meetting-room-detail {
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
    }
    .go-back {
      margin-left: 45px;
      margin-bottom: 10px;
    }
  }
</style>
