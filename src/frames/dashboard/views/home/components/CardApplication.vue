<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="申请人">
          <el-input
            v-model="ruleForm.applicant"
            disabled
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="申请时间">
          <el-input
            v-model="ruleForm.applicationTime"
            value-format="yyyy-MM-dd"
            disabled
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item
          label="异常记录"
          prop="name"
        >
          <el-input
            v-model="ruleForm.name"
            disabled
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="申请类别"
          prop="region"
        >
          <el-select
            v-model="ruleForm.region"
            placeholder="请选择申请类别"
          >
            <el-option
              label="区域一"
              value="shanghai"
            />
            <el-option
              label="区域二"
              value="beijing"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item
          v-show="'attendanceAdjust'!=from"
          label="当日打卡记录"
        >
          <div>
            <el-table
              :data="tableData"
              row-key="id"
              border
              default-expand-all
            >
              <el-table-column
                type="index"
                label="序号"
                width="48"
                header-align="center"
              />
              <el-table-column
                prop="date"
                label="打卡时间"
                width="150"
                header-align="center"
              />
              <el-table-column
                prop="name"
                label="打卡地点"
                header-align="center"
              />
            </el-table>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item
      label="缺卡事由"
      prop="desc"
    >
      <el-input
        v-model="ruleForm.desc"
        type="textarea"
      />
    </el-form-item>
    <el-form-item
      label="附件"
    >
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
        <el-button
          size="small"
          type="primary"
        >上传附件</el-button>
        <div
          slot="tip"
          class="el-upload__tip"
        >单个附件请不要超过20M</div>
      </el-upload>
    </el-form-item>
    <el-form-item class="cen-t">
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
      >提交</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        applicant: '小明',
        applicationTime: '2020-01-07 09:00:00',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      },
      tableData: {}
    }
  },
  methods: {
    submitForm(formName) {
      this.$emit('hasShaw', true)
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.cen-t div{
  justify-content: center;
  width: 100%;
  display: flex;
}
.el-table td div {
  text-align: center;
}
.fa-upload:before {
    content: "\f093";
}
.search > .select > div > span {
  background-color: #f5f5f5;
  padding-right: 12px;
  text-align: right;
  margin-right: 0;
  width: 96px;
}
.search > .select > div {
  margin-right: 0;
}
.el-button--primary {
  margin-left: 4px;
}
.link-a {
  color: #0a4c8a;
}
.el-button span {
  color: #0a4c8a;
}
</style>
