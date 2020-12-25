<template>
  <div class="outgoing-application">
    <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-form">
      <el-form-item label="申请人" class="there-points">
        <el-input v-model="ruleform.number" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="申请日期" class="there-points">
        <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" />
      </el-form-item>

      <el-form-item label="开始时间" class="there-points">
        <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" /></el-form-item>

      <el-form-item label="结束时间" class="there-points">
        <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" /></el-form-item>

      <el-form-item label="时长" class="there-points" style="margin-right:40%;">
        <el-input v-model="ruleform.number" disabled placeholder="请输入" />
      </el-form-item>

      <el-form-item label="外出事由" class="full-item">
        <el-input v-model="ruleform.remark" type="textarea" :rows="2" placeholder="请填写请假事由" />
      </el-form-item>
      <el-form-item label="附件" class="full-item">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">上传附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="审批人" prop="number" class="there-points">
        <process />
      </el-form-item>
      <el-form-item class="full-item btntask">
        <el-button type="primary">确定</el-button>
        <el-button class="cancel-btn" @click="$router.push('/attendanceManager/attendanceApplication')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Process from '@frames/dashboard/components/Process'
export default {
  components: { Process },
  data() {
    return {
      activeName: 'first',
      count: 30,
      isActive: true,
      value1: '2020-02-04',
      ruleform: {
        number: 111,
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: '',
        money: ''
      },
      rules: {
        number: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .outgoing-application {
    padding: 20px;
    overflow-y: scroll;
    height: calc(100% - 140px);
    .dictionary-form {
      display: flex;
      flex-wrap: wrap;
      .full-item {
        width: 100%;
        .el-form-item__content {
          display: flex;

          .el-select {
            width: 100%;
          }
        }
      }
      .el-input {
        width: 100%;
      }
      .there-points {
        width: 50%;
        .el-form-item__content {
          display: flex;

          .el-select {
            width: 100%;
          }
        }
      }
      .btntask {
        width: 100%;
        text-align: center;
      }
    }
  }
</style>
