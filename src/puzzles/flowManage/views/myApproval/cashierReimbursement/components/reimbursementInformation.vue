<template>
  <div class="reimbursement-information">
    <div class="title">
      <crumb-box>
        <div>报销信息</div>
      </crumb-box>
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
      <el-row>
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
    <div class="title">
      <crumb-box>
        <div>确认信息</div>
      </crumb-box>
    </div>
    <el-form
      ref="ruleFormAnther"
      :model="ruleFormAnther"
      :rules="rulesAnther"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="付款金额">
            <el-input v-model="ruleFormAnther.reimbursementNumber" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="付款人" prop="date1">
            <el-input v-model="ruleFormAnther.date1" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="date1" label="付款日期">
            <el-input v-model="ruleFormAnther.date1" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="付款账户类型">
            <el-input v-model="ruleFormAnther.reimbursementNumber" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="付款账户"
            prop="date1"
          >
            <div class="loan-btn">
              <el-input v-model="ruleFormAnther.date1" :disabled="true" />
              <el-button type="primary" icon="el-icon-search" />
            </div>

          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="支票号" prop="date1">
            <el-input v-model="ruleFormAnther.date1" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="支票银行名称" prop="date1">
            <el-input v-model="ruleFormAnther.date1" :disabled="true" />
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
              v-model="ruleFormAnther.reimbursementName"
              :disabled="true"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:200px;">
        <el-col :span="24">
          <div class="btn-an">
            <el-button type="primary">确认</el-button>
            <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import CrumbBox from '@frames/dashboard/components/CrumbBox'
export default {
  components: { CrumbBox },
  data() {
    return {
      ruleForm: {
        region: '',
        reimbursementNumber: 'JK20181211-001',
        reimbursementName: '李小姐',
        affiliatedOrganization: 'shanghai',
        isTrue: 1,
        applicationTime: '2018-02-11 12:24:15',
        one: '111'
      },
      ruleFormAnther: {
        region: '',
        reimbursementNumber: 'JK20181211-001',
        reimbursementName: '李小姐',
        affiliatedOrganization: 'shanghai',
        isTrue: 1,
        applicationTime: '2018-02-11 12:24:15',
        one: '111',
        date1: '123'
      },
      rulesAnther: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
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
   .title {
     margin-bottom: 20px;
   }
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
  .btn-an {
      margin-top: 40px;
      text-align: center;
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
