<template>
  <div class="reimbursement-add">
    <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="add-form">
      <el-form-item label="报销单号">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="报销人">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="所属组织">
        <el-select v-model="value" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否项目费用">
        <el-select v-model="value" placeholder="请选择是否项目费用" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-select v-model="value" placeholder="请选择项目名称" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="归属单位">
        <el-input v-model="ruleForm.name" placeholder="请输入归属单位" />
      </el-form-item>
      <el-form-item label="报销明细" class="full-width">
        <detail />
      </el-form-item>
      <el-form-item label="报销总金额">
        <el-input v-model="ruleForm.name" placeholder="请输入报销总金额" />
      </el-form-item>
      <el-form-item label="发票总张数">
        <el-input v-model="ruleForm.name" placeholder="请输入发票总张数" />
      </el-form-item>
      <el-form-item label="报销类型">
        <el-input v-model="ruleForm.name" placeholder="请输入报销类型" />
      </el-form-item>
      <el-form-item label="报销对象">
        <el-input v-model="ruleForm.name" placeholder="请输入报销对象" />
      </el-form-item>
      <el-form-item label="应付金额">
        <el-input v-model="ruleForm.name" placeholder="请输入应付金额" />
      </el-form-item>
      <el-form-item label="支付方式">
        <el-select v-model="value" placeholder="请选择支付方式" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="收款账户名词">
        <el-input v-model="ruleForm.name" placeholder="请输入收款账户名词" />
      </el-form-item>
      <el-form-item label="收款账户">
        <el-input v-model="ruleForm.name" placeholder="请输入收款账户" />
      </el-form-item>
      <el-form-item label="开户行">
        <el-input v-model="ruleForm.name" placeholder="请输入开户行" />
      </el-form-item>
      <el-form-item label="备注" class="full-width">
        <el-input v-model="ruleForm.name" placeholder="请输入备注" type="textarea" />
      </el-form-item>
      <el-form-item label="附件" class="full-width">
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
      <el-form-item label="审批人" class="full-width">
        审批人
      </el-form-item>
    </el-form>
    <div class="submit">
      <el-button type="primary">保存</el-button>
      <el-button type="primary">提交</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import Detail from './components/Detail'
export default {
  name: 'ReimbursementAdd',
  components: {
    Detail
  },
  data() {
    return {
      fileList: [],
      ruleForm: {
        name: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.reimbursement-add {
  padding: 20px;
  height: calc(100vh - 160px);
  overflow-y: auto;
  .add-form {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .el-form-item {
      width: 33%;
      &.full-width {
        width: 100%;
      }
    }
  }
  .submit {
    margin: 30px 0px;
    width: 100%;
    text-align: center;
  }
}
</style>
