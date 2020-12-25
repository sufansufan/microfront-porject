<template>
  <div class="reimbursement-information">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="报销单号">
            <el-input v-model="ruleForm.reimbursementNumber" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报销人">
            <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="所属组织"
          >
            <el-select
              v-model="ruleForm.affiliatedOrganization"
              disabled
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
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="是否项目费用"
          >
            <el-select
              v-model="ruleForm.affiliatedOrganization"
              disabled
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
          <el-form-item
            label="项目名称"
          >
            <el-select
              v-model="ruleForm.affiliatedOrganization"
              disabled
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
          <el-form-item label="归属单位">
            <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="报销明细"
            prop="name"
          >
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
                prop="number"
                label="报销科目"
                align="center"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.affiliatedOrganization"
                    disabled
                    style="width: 100%"
                    placeholder="请选择申请类别"
                  >
                    <el-option
                      label="区域一"
                      value="shanghai"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                :render-header="renderHeader"
                prop="number"
                label="金额"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.parameter" :disabled="true" />
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                :render-header="renderHeaderOne"
                label="单张票据"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.num" :disabled="true" :min="1" :max="10" label="描述文字" @change="handleChange" />
                </template>
              </el-table-column>
              <el-table-column
                prop="servicename"
                label="费用说明"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.explain" :disabled="true" />
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="报销总金额">
            <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据总张数">
            <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="报销类型"
            prop="name"
          >
            <el-select
              v-model="ruleForm.region"
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
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="报销对象"
          >
            <el-select
              v-model="ruleForm.affiliatedOrganization"
              disabled
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
          <el-form-item
            label="借款单号"
          >
            <div class="loan-btn">
              <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
              <el-button type="primary">同意</el-button>
            </div>

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="借款未还金额">
            <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="此次冲抵金额">
            <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="借款剩余金额">
            <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="应付金额">
            <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="借款用途"
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
          <el-form-item
            label="备注"
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
          <el-form-item
            label="附件"
          >
            <div class="enclosure">
              <span>123.doc</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:100px;">
        <el-col :span="8">
          <el-form-item
            label="申请时间"
            prop="applicationTime"
          >
            <el-input v-model="ruleForm.applicationTime" :disabled="true" />
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
          parameter: '', // 参数
          name: '', // 名称
          explain: '' // 说明
        }
      ]
    }
  },
  methods: {
    deleteIndex(val) {
      this.tableData.splice(val, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.reimbursement-information {
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 100px;
  .loan-btn {
     display: flex;
    .el-input {
      margin-right: 4px;
    }
  }
  .enclosure {
    span {
      display: inline-block;
      text-decoration: underline;
      color: @primary;
    }
  }
  .btn {
    text-align: center;
    padding-top: 20px;
  }
}
</style>
<style>
  .el-input.is-disabled .el-input__inner {
    background-color: #FFF!important;
    color: #606266!important;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #FFF!important;
    color: #606266!important;
  }
</style>
