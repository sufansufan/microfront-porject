<template>
  <div class="engineer-info">
    <!-- 工程合同详情 仅做嵌套 -->
    <el-form
      ref="ruleForm"
      v-loading="loading"
      :model="ruleForm"
      :rules="rules"
      label-width="130px"
      class="constrack-form"
    >
      <el-form-item label="审批单号" prop="approvalNo">
        <el-input v-model="ruleForm.approvalNo" :disabled="disabled" clearable placeholder="请输入审批单号" />
      </el-form-item>

      <el-form-item label="发起组织" prop="startOrgId">
        <el-select v-model="ruleForm.startOrgId" :disabled="disabled" clearable placeholder="请选择发起组织">
          <el-option
            v-for="ortItem in constant.userOrganization"
            :key="ortItem.id"
            :label="ortItem.orgName"
            :value="ortItem.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="生效状态" prop="effectiveState">
        <el-select v-model="ruleForm.effectiveState" :disabled="disabled" clearable placeholder="请选择生效状态">
          <el-option
            v-for="item in constant.EffectiveState"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="合同编号" prop="contractNumber">
        <el-input v-model="ruleForm.contractNumber" placeholder="请输入合同编号" :disabled="disabled" clearable />
      </el-form-item>

      <el-form-item label="合同归属" prop="attribution">
        <el-select v-model="ruleForm.attribution" placeholder="请选择合同归属" :disabled="disabled" clearable>
          <el-option
            v-for="item in constant.ContractAttribution"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="归属单位" prop="belongOrgId">
        <el-select v-model="ruleForm.belongOrgId" :disabled="disabled" clearable placeholder="请选择归属单位">
          <el-option
            v-for="item in constant.userOrganization"
            :key="item.id"
            :label="item.orgName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="合同类型" prop="type">
        <el-select v-model="ruleForm.type" :disabled="disabled" clearable placeholder="请选择合同类型">
          <el-option
            v-for="item in constant.MainContractType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="合同类别" prop="category">
        <el-select v-model="ruleForm.category" :disabled="disabled" clearable placeholder="请选择合同类别">
          <el-option
            v-for="item in constant.ContractCategory"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="签订日期" prop="signDate">
        <el-date-picker v-model="ruleForm.signDate" type="date" style="width: 100%" :disabled="disabled" clearable placeholder="请选择签订日期" />
      </el-form-item>

      <el-form-item label="合同名称" class="fill-in-row" prop="name">
        <el-input v-model="ruleForm.name" :disabled="disabled" clearable placeholder="请输入合同名称" />
      </el-form-item>

      <el-form-item label="收支类型" prop="balanceType">
        <el-select v-model="ruleForm.balanceType" :disabled="disabled" clearable placeholder="请选择收支类型">
          <el-option
            v-for="item in constant.BalanceType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="合同金额" prop="amount">
        <amount-input
          v-model.trim="ruleForm.amount"
          :disabled="disabled"
          placeholder="请输入合同金额"
          @blur="amountInputBlur('amount')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="结算金额" prop="settlementAmount">
        <amount-input
          v-model.trim="ruleForm.settlementAmount"
          :disabled="settleDisabled"
          placeholder="请输入结算金额"
          @blur="amountInputBlur('settlementAmount')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="签订单位" prop="signUnitName">
        <el-input v-model="ruleForm.signUnitName" :disabled="disabled" clearable placeholder="请输入签订单位" />
      </el-form-item>

      <el-form-item label="联系人" prop="contactPerson">
        <el-input v-model="ruleForm.contactPerson" :disabled="disabled" clearable placeholder="请输入联系人" />
      </el-form-item>

      <el-form-item label="联系电话" prop="contactPersonTel">
        <el-input v-model="ruleForm.contactPersonTel" :disabled="disabled" clearable placeholder="请输入联系电话" />
      </el-form-item>

      <el-form-item label="合同状态" prop="state">
        <el-select v-model="ruleForm.state" :disabled="disabled" clearable placeholder="请选择合同状态">
          <el-option
            v-for="item in constant.contractState"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="归档日期" prop="filingDate">
        <el-date-picker v-model="ruleForm.filingDate" style="width: 100%" type="date" :disabled="disabled" clearable placeholder="请选择归档日期" />
      </el-form-item>

      <el-form-item label="签订地点" prop="signPlace">
        <el-input v-model="ruleForm.signPlace" :disabled="disabled" clearable placeholder="请输入签订地点" />
      </el-form-item>

      <el-form-item label="开工日期" prop="startDate">
        <el-date-picker
          v-model="ruleForm.startDate"
          style="width: 100%"
          placeholder="请选择开工日期"
          type="date"
          :disabled="disabled"
          clearable
        />
      </el-form-item>

      <el-form-item label="竣工日期" prop="endDate">
        <el-date-picker
          v-model="ruleForm.endDate"
          style="width: 100%"
          placeholder="请选择竣工日期"
          type="date"
          :disabled="disabled"
          clearable
        />
      </el-form-item>

      <el-form-item label="有效期限" prop="validityTerm">
        <el-input v-model="ruleForm.validityTerm" :disabled="disabled" clearable placeholder="请输入有效期限" :maxlength="4">
          <template slot="append">年</template>
        </el-input>
      </el-form-item>

      <el-form-item label="业务类型" prop="businessType">
        <el-select v-model="ruleForm.businessType" :disabled="disabled" clearable placeholder="请选择业务类型">
          <el-option
            v-for="item in constant.ContractBusinessType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="支付类别" prop="paymentCategory">
        <el-select v-model="ruleForm.paymentCategory" :disabled="disabled" clearable placeholder="请选择支付类别">
          <el-option
            v-for="item in constant.PaymentClass"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="押金金额" prop="depositAmount">
        <amount-input
          v-model.trim="ruleForm.depositAmount"
          :disabled="disabled"
          placeholder="请输入押金金额"
          @blur="amountInputBlur('depositAmount')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="合同">
        <el-upload
          :data="uploadData"
          :file-list="fileList"
          :on-success="uploadSuccess"
          :action="actionUrl"
          :headers="uploadHeaders"
          :on-remove="handleRemove"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
          :disabled="disabled"
        >
          <el-button size="small" type="primary" :disabled="disabled">
            <i class="iconfont icon-chuanshu_shangchuan" /> 上传附件
          </el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="结算书">
        <el-upload
          :data="uploadData"
          :file-list="settlementList"
          :on-success="uploadSuccess"
          :action="actionUrl"
          :headers="uploadHeaders"
          :on-remove="handleRemove"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
          :disabled="settleDisabled"
        >
          <el-button size="small" type="primary" :disabled="settleDisabled">
            <i class="iconfont icon-chuanshu_shangchuan" /> 上传附件
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="合同备注" class="fill-in-row row-label">
        <el-input
          v-model="ruleForm.remark"
          :disabled="disabled"
          placeholder="请输入合同备注"
          clearable
          type="textarea"
          :maxlength="200"
          :rows="3"
        />
      </el-form-item>

      <el-form-item label="经办组织" prop="handlingOrgId">
        <el-cascader
          v-model="ruleForm.handlingOrgId"
          style="width: 100%"
          placeholder="请选择经办组织"
          clearable
          :disabled="disabled"
          filterable
          :options="constant.orgList"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'orgName', children: 'children',checkStrictly: true }"
        />
      </el-form-item>
      <el-form-item label="经办日期" prop="handlingDate">
        <el-date-picker
          v-model="ruleForm.handlingDate"
          style="width: 100%"
          placeholder="请选择经办日期"
          type="date"
          :disabled="disabled"
          clearable
        />
      </el-form-item>
      <el-form-item label="经办人" prop="handlingPersonName">
        <el-input v-model="ruleForm.handlingPersonName" :disabled="disabled" clearable placeholder="请输入经办人" />
      </el-form-item>
      <el-form-item label="录入人" prop="operationPersonName">
        <el-input
          v-model="ruleForm.createUserName"
          :disabled="true"
          placeholder="请输入录入人"
          clearable
        />
      </el-form-item>
      <el-form-item label="录入时间" prop="operationDate">
        <el-input
          v-model="ruleForm.createDate"
          :disabled="true"
          placeholder="请选择录入时间"
          clearable
        />
      </el-form-item>
      <template v-if="!recordDisabled" class="fill-in-row">
        <el-form-item v-if="ruleForm.modificationRecordList.length" label="修改记录" class="fill-in-row">
          <history-record :is-current="true" :data="ruleForm.modificationRecordList" />
        </el-form-item>
        <history-record v-if="!disabled && ruleForm.modificationRecordHistoryList.length" :data="ruleForm.modificationRecordHistoryList" />
      </template>
    </el-form>

  </div>
</template>

<script>
import HistoryRecord from './HistoryRecord'
import { getOneOfOffice } from '@core/api/contractManage/contractmanager'
import upload from '@core/mixins/upload'
import { toDecimal } from '@core/utils/validate'

import { mapGetters } from 'vuex'
import { setSessionStorage, getSessionStorage } from '@core/utils/auth'
export default {
  name: 'OfficeContractForm',
  components: {
    HistoryRecord
  },
  mixins: [upload],
  props: {
    disabled: {
      type: Boolean,
      default: true
    },
    settleDisabled: {
      default: true,
      type: Boolean
    },
    recordDisabled: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      loading: false,
      fileList: [], // 合同附件
      settlementList: [], // 结算书附件
      ruleForm: {
        amount: 0, // 合同金额
        approvalNo: '', // 审批单号
        attribution: '', // 归属单位类型
        balanceType: '', // 收支类型
        belongOrgId: '', // 归属单位Id
        businessType: '', // 业务类型
        category: '', // 合同类别
        signUnitId: '', // 建设单位/签订单位
        contactPerson: '', // 建设单位联系人/联系人
        contactPersonTel: '', // 建设单位联系电话/联系电话
        contractNumber: '', // 合同编号
        depositAmount: 0, // 押金金额
        effectiveState: '', // 生效状态
        endDate: '', // 竣工日期/到期日期
        filingDate: '', // 归档日期
        handlingDate: '', // 经办日期
        handlingOrgId: '', // 经办组织Id
        handlingPersonName: '', // 经办人名称
        name: '', // 合同名称
        paymentCategory: '', // 支付类别
        remark: '', // 备注
        settlementAmount: 0, // 结算金额
        signDate: '', // 签订日期
        signPlace: '', // 签订地点
        startDate: '', // 开工日期/起始日期
        startOrgId: '', // 发起组织Id
        state: '', // 合同状态
        type: '', // 合同类型
        validityTerm: 0// 有效期限
      },
      rules: {
        approvalNo: [{ required: true, message: '请输入审批单号', trigger: 'blur' }],
        startOrgId: [{ required: true, message: '请选择发起组织', trigger: 'change' }],
        effectiveState: [{ required: true, message: '请选择生效状态', trigger: 'change' }],
        contractNumber: [{ required: true, message: '请输入合同编号', trigger: 'blur' }],
        attribution: [{ required: true, message: '请选择合同归属', trigger: 'change' }],
        belongOrgId: [{ required: true, message: '请选择归属单位', trigger: 'change' }],

        type: [{ required: true, message: '请选择合同类型', trigger: 'change' }],
        category: [{ required: true, message: '请选择合同类别', trigger: 'change' }],
        signDate: [{ required: true, message: '请选择签订日期', trigger: 'change' }],
        name: [{ required: true, message: '请选择合同名称', trigger: 'change' }],
        balanceType: [{ required: true, message: '请选择收支类型', trigger: 'change' }],
        amount: [{ required: true, message: '请输入收合同金额', trigger: 'blur' }],

        signUnitName: [{ required: true, message: '请输入签订单位', trigger: 'blur' }],
        state: [{ required: true, message: '请选择合同状态', trigger: 'blur' }],
        paymentCategory: [{ required: true, message: '请选择支付类别', trigger: 'change' }],
        handlingOrgId: [{ required: true, message: '请选择经办组织', trigger: 'change' }],
        handlingDate: [{ required: true, message: '请选择经办日期', trigger: 'change' }],
        handlingPersonName: [{ required: true, message: '请选择经办人', trigger: 'change' }]

      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    const orgListParams = {
      parentPath: getSessionStorage('orgId'),
      del: '0',
      state: 'ok'
    }
    this.$store.dispatch('getConstant', [
      'EffectiveState',
      'ContractCategory',
      'BalanceType',
      'contractState',
      'SubContractType',
      'userOrganization',
      'generateNo',
      'ContractAttribution',
      'ContractBusinessType',
      'MainContractType',
      'PaymentClass',
      { type: 'orgList', params: orgListParams },
      { type: 'orgPersonList', params: getSessionStorage('orgId')
      }]).then(() => {})

    this.getOneForID(this.$route.query.id)
  },
  methods: {
    // 获取附件
    fetchFileList(id, type) {
      this.getFileLoad(id, type).then(data => {
        switch (type) {
          case 'contract':
            this.fileList = data
            this.fileList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            break
          case 'settlementBook':
            this.settlementList = data
            this.settlementList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            break
          default:
            break
        }
      })
    },
    getOneForID(id) {
      this.loading = true
      getOneOfOffice(id).then(({ data }) => {
        data.handlingOrgId = data.handlingOrgId.split(',')
        this.ruleForm = data
        this.ruleForm.modificationRecordList = data.modificationRecordList.map(i => {
          return {
            content: JSON.parse(i.content),
            reason: i.reason,
            date: i.operationDate,
            name: i.operationPersonName
          }
        })
        this.ruleForm.modificationRecordHistoryList = data.modificationRecordHistoryList.map(i => {
          return {
            content: JSON.parse(i.content),
            reason: i.reason,
            date: i.operationDate,
            name: i.operationPersonName
          }
        })
        this.loading = false

        setSessionStorage('contractFormData', JSON.stringify(this.ruleForm))

        this.fetchFileList(this.ruleForm.approvalNo, 'officeContract')

        this.fetchFileList(this.ruleForm.approvalNo, 'settlementBook')
      })
    },
    amountInputBlur(value) {
      if (this.ruleForm[`${value}`]) {
        this.ruleForm[`${value}`] = toDecimal(this.ruleForm[value], 2)
      }
    }
  }

}
</script>

<style scoped lang="less">
    .engineer-info {
        /*padding: 100px;*/
        .constrack-form {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            .el-form-item {
                width: 33.33%;
                .el-select {
                    width: 100%;
                }
            }
            .fill-in-row {
                width: 100%;
            }
            .residue-row {
                width: 66.6%;
                .half {
                    width: calc(50% - 65px);
                }
            }
        }
        .btn {
            width: 200px;
            margin: 10px auto;
        }
    }
</style>
