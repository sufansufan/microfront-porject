<template>
  <div class="supplementary-card-application">
    <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-form">
      <el-form-item label="申请人" class="there-points">
        <el-input v-model="ruleform.number" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="申请日期" class="there-points">
        <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" />
      </el-form-item>

      <el-form-item label="异常记录" prop="remark" class="there-points">
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="申请类别" prop="name" class="anther">
        <div style="display:flex;">
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div class="num">
            <span>早退分钟数</span>
            <el-input-number v-model="num" :min="1" :max="10" label="描述文字" @change="handleChange" />
          </div>
        </div>
      </el-form-item>

      <el-form-item label="当日打卡记录" class="full-item">
        <el-table :data="tableData" row-key="id" border default-expand-all>
          <el-table-column prop="id" label="序号" width="50" fixed align="center" />
          <el-table-column prop="id" label="打卡时间" align="center" width="120" />
          <el-table-column prop="id" label="打卡地址" align="center" />
        </el-table>
      </el-form-item>

      <el-form-item label="缺卡事由" prop="remark" class="full-item">
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
      num: 1,
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
      },
      tableData: []
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .supplementary-card-application {
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
      .anther {
        width: 50%;
        .el-form-item__content {
          display: flex;
          .el-select {
            width: 50%!important;
          }
          .num {
            width: 50%;
            display: flex;
            align-items: center;
            span {
              margin: 0 6px;
            }
            .el-input-number {
              flex: 1;
            }
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
