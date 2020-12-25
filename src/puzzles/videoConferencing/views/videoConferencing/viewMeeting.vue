<template>
  <div class="view-meeting">
    <div class="btn">
      <el-button
        class="back-btn"
        @click="$router.go(-1)"
      ><i class="iconfont icon-fanhui-copy" />  返回</el-button>
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="会议编号">
            <el-input
              v-model="ruleForm.reimbursementNumber"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="会议主题">
            <el-input
              v-model="ruleForm.reimbursementName"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="会议类型">
            <el-select
              v-model="ruleForm.affiliatedOrganization"
              :disabled="true"
              style="width: 100%"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计划开始时间">
            <el-date-picker
              v-model="value1"
              :disabled="true"
              style="width: 100%"
              type="datetime"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预计结束时间">
            <el-date-picker
              v-model="value1"
              :disabled="true"
              type="datetime"
              style="width: 100%"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="tableData"
            row-key="id"
            border
            default-expand-all
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            />
            <el-table-column
              :render-header="renderHeader"
              prop="name"
              label="参会方名称"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.name"
                  :disabled="true"
                  style="width:30%"
                  placeholder="请选择申请类别"
                >
                  <el-option
                    label="区域一"
                    value="shanghai"
                  />
                </el-select>
                <span>{{ scope.row.name }}</span>
              </template>

            </el-table-column>
            <el-table-column
              :render-header="renderHeader"
              prop="name"
              label="参会方负责人"
              align="center"
            />
            <el-table-column
              prop="name"
              :render-header="renderHeaderOne"
              label="指定监控会/会议室"
              align="center"
            />
            <el-table-column
              prop="name"
              label="要求参会人员"
              align="center"
            />
          </el-table>

        </el-col>
      </el-row>
      <el-row style="margin-top:10px;">
        <el-col :span="24">
          <el-form-item
            label="会议内容"
            prop="region"
          >
            <el-input
              v-model="ruleForm.reimbursementName"
              :disabled="true"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="会议资料">
            <div class="enclosure">
              <span>123.doc</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="发起人"
            prop="applicationTime"
          >
            <el-input
              v-model="ruleForm.applicationTime"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="发起时间"
            prop="applicationTime"
          >
            <el-date-picker
              v-model="ruleForm.applicationTime"
              :disabled="true"
              style="width:100%"
              type="date"
              placeholder="选择日期"
            />
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
      ruleForm: {
        region: '',
        reimbursementNumber: 'JK20181211-001',
        reimbursementName: '李小姐',
        affiliatedOrganization: 'shanghai',
        isTrue: 1,
        applicationTime: '2018-02-11 12:24:15'
      },
      tableData: [
        {
          id: '1',
          num: 1,
          parameter: '11', // 参数
          name: '11', // 名称
          explain: '11' // 说明
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.view-meeting {
  padding: 10px;
  height: 100%;
  overflow-y: scroll;
  .btn {
    margin-bottom: 10px;
  }
}
</style>
