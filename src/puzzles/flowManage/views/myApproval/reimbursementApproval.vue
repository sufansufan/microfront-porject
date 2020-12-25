<template>
  <div class="loan-approval">
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="reimbursement-form">
        <el-form-item label="报销单号">
          <el-input v-model="ruleForm.reimbursementNumber" :disabled="true" />
        </el-form-item>
        <el-form-item label="报销人">
          <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
        </el-form-item>
        <el-form-item label="所属组织">
          <el-select v-model="ruleForm.affiliatedOrganization" disabled placeholder="请选择申请类别">
            <el-option
              label="区域一"
              value="shanghai"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否项目费用">
          <el-select v-model="ruleForm.affiliatedOrganization" disabled style="width: 100%" placeholder="请选择申请类别">
            <el-option
              label="区域一"
              value="shanghai"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目费用">
          <el-select v-model="ruleForm.affiliatedOrganization" disabled style="width: 100%" placeholder="请选择申请类别">
            <el-option
              label="区域一"
              value="shanghai"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
        </el-form-item>
        <el-form-item label="报销明细" prop="name" class="full-width">
          <el-table :data="tableData" row-key="id" border default-expand-all>
            <el-table-column type="index" label="序号" align="center" width="50" />
            <el-table-column prop="number" label="报销科目" align="center">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.affilitedOrganization"
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
            <el-table-column prop="number" label="金额" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.parameter" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="单张票据" align="center">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.num" :disabled="true" :min="1" :max="10" label="描述文字" @change="handleChange" />
              </template>
            </el-table-column>
            <el-table-column prop="servicename" label="费用说明" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.explain" :disabled="true" />
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="报销总金额">
          <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
        </el-form-item>
        <el-form-item label="单据总张数">
          <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
        </el-form-item>
        <el-form-item label="报销类型" prop="name">
          <el-select v-model="ruleForm.region" placeholder="请选择申请类别">
            <el-option
              label="区域一"
              value="shanghai"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="报销对象">
          <el-select v-model="ruleForm.affiliatedOrganization" disabled placeholder="请选择申请类别">
            <el-option
              label="区域一"
              value="shanghai"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="借款单号">
          <div class="loan-btn">
            <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
            <el-button type="primary">同意</el-button>
          </div>
        </el-form-item>
        <el-form-item label="借款未还金额">
          <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
        </el-form-item>
        <el-form-item label="此次冲抵金额">
          <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
        </el-form-item>
        <el-form-item label="借款剩余金额">
          <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
        </el-form-item>
        <el-form-item label="应付金额">
          <el-input v-model="ruleForm.reimbursementName" :disabled="true" />
        </el-form-item>
        <el-form-item label="借款用途" prop="region" class="full-width">
          <el-input v-model="ruleForm.reimbursementName" :disabled="true" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="备注" prop="region" class="full-width">
          <el-input v-model="ruleForm.reimbursementName" :disabled="true" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="附件" class="full-width">
          <div class="table-click-color">
            <span>123.doc</span>
          </div>
        </el-form-item>
        <el-form-item label="申请时间" prop="applicationTime">
          <el-input v-model="ruleForm.applicationTime" :disabled="true" />
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="primary">同意</el-button>
        <el-button type="danger">拒绝</el-button>
        <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
      </div>
    </div>
    <div class="step">
      <process direction="vertical" />
      <approval-record />
    </div>
  </div>
</template>

<script>
import Process from '@frames/dashboard/components/Process'
import ApprovalRecord from '@frames/dashboard/components/ApprovalRecord'
export default {
  components: {
    Process,
    ApprovalRecord
  },
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
  }
}
</script>

<style lang="less" scoped>
.loan-approval {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .reimbursement-form {
    display: flex;
    flex-wrap: wrap;
    & > .el-form-item {
    width: 33.33%;
    .el-select, .el-input {
      width: 100%;
    }
    }
    & > .full-width {
      width: 100%;
    }
    .loan-btn {
      display: flex;
      .el-input {
        margin-right: 4px;
      }
    }
  }
  .btn {
    text-align: center;
    margin: 30px 0px;
  }
  & > div:last-child {
    margin-bottom: 30px;
  }
}
</style>
