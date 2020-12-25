<template>
  <div class="engineer-info">
    <!-- 工程合同详情 仅做嵌套 -->
    <el-form
      ref="form"
      v-loading="loading"
      :model="ruleForm"
      :rules="rules"
      label-width="130px"
      class="constrack-form"
    >
      <el-form-item
        label="审批单号"
        label-width="180px"
        prop="approvalNo"
      >
        <el-input
          v-model="ruleForm.approvalNo"
          :disabled="disabled"
          clearable
          placeholder="请输入审批单号"
        />
      </el-form-item>

      <el-form-item
        label="发起组织"
        label-width="180px"
        prop="startOrgId"
      >
        <el-select
          v-model="ruleForm.startOrgId"
          placeholder="请选择发起组织"
          :disabled="disabled"
          clearable
        >
          <el-option
            v-for="ortItem in constant.userOrganization"
            :key="ortItem.id"
            :label="ortItem.orgName"
            :value="ortItem.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="生效状态"
        label-width="180px"
        prop="effectiveState"
      >
        <el-select
          v-model="ruleForm.effectiveState"
          :disabled="disabled"
          clearable
          placeholder="请选择生效状态"
        >
          <el-option
            v-for="item in constant.EffectiveState"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="合同编号"
        label-width="180px"
        prop="contractNumber"
      >
        <el-input
          v-model="ruleForm.contractNumber"
          placeholder="请输入合同编号"
          :disabled="disabled"
          clearable
        />
      </el-form-item>

      <el-form-item
        label="合同归属"
        label-width="180px"
        prop="attribution"
      >
        <el-select
          v-model="ruleForm.attribution"
          placeholder="请选择合同归属"
          :disabled="disabled"
          clearable
        >
          <el-option
            v-for="item in constant.ContractAttribution"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label-width="180px"
        label="归属单位"
        prop="belongOrgId"
      >
        <el-select
          v-model="ruleForm.belongOrgId"
          placeholder="请选择归属单位"
          :disabled="disabled"
          clearable
        >
          <el-option
            v-for="item in constant.userOrganization"
            :key="item.id"
            :label="item.orgName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label-width="180px"
        label="合同类型"
        prop="type"
      >
        <el-select
          v-model="ruleForm.type"
          :disabled="disabled"
          clearable
          placeholder="请选择合同类型"
        >
          <el-option
            v-for="item in constant.MainContractType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="合同类别"
        label-width="180px"
        prop="category"
      >
        <el-select
          v-model="ruleForm.category"
          :disabled="disabled"
          clearable
          placeholder="请选择合同类别"
        >
          <el-option
            v-for="item in constant.ContractCategory"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="签订日期"
        label-width="180px"
        prop="signDate"
      >
        <el-date-picker
          v-model="ruleForm.signDate"
          style="width: 100%"
          type="date"
          :disabled="disabled"
          clearable
          placeholder="请选择签订日期"
        />
      </el-form-item>

      <el-form-item
        label="合同名称"
        label-width="180px"
        class="fill-in-row"
        prop="name"
      >
        <el-input
          v-model="ruleForm.name"
          :disabled="disabled"
          clearable
          placeholder="请输入合同名称"
        />
      </el-form-item>

      <el-form-item
        label="收支类型"
        label-width="180px"
        prop="balanceType"
      >
        <el-select
          v-model="ruleForm.balanceType"
          :disabled="disabled"
          clearable
          placeholder="请选择收支类型"
        >
          <el-option
            v-for="item in constant.BalanceType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="合同金额"
        label-width="180px"
        prop="amount"
      >
        <amount-input
          v-model.trim="ruleForm.amount"
          :disabled="disabled"
          placeholder="请输入合同金额"
          @blur="amountInputBlur('amount')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item
        label="结算金额"
        label-width="180px"
        prop="settlementAmount"
      >
        <amount-input
          v-model.trim="ruleForm.settlementAmount"
          :disabled="disabled"
          placeholder="请输入结算金额"
          @blur="amountInputBlur('settlementAmount')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item
        label="签订单位"
        label-width="180px"
        prop="constructionUnit"
      >
        <el-input
          v-model="ruleForm.constructionUnit"
          :disabled="disabled"
          clearable
          placeholder="请输入签订单位"
        />
      </el-form-item>

      <el-form-item
        label="联系人"
        label-width="180px"
        prop="contactPerson"
      >
        <el-input
          v-model="ruleForm.contactPerson"
          :disabled="disabled"
          clearable
          placeholder="请输入联系人"
        />
      </el-form-item>

      <el-form-item
        label="联系电话"
        label-width="180px"
        prop="contactPersonTel"
      >
        <el-input
          v-model="ruleForm.contactPersonTel"
          :disabled="disabled"
          clearable
          placeholder="请输入联系电话"
        />
      </el-form-item>

      <el-form-item
        label="关联合同编号"
        label-width="180px"
        prop="relationContractNo"
      >
        <el-input
          v-model="ruleForm.relationContractNo"
          :disabled="disabled"
          clearable
          placeholder="请输入关联合同编号"
        />
      </el-form-item>
      <el-form-item
        label="关联合同名称"
        label-width="180px"
        prop="relationContractName"
      >
        <el-input
          v-model="ruleForm.relationContractName"
          :disabled="disabled"
          clearable
          placeholder="请输入关联合同名称"
        />
      </el-form-item>
      <el-form-item
        label="关联合同金额"
        label-width="180px"
        prop="relationContractAmount"
      >
        <amount-input
          v-model.trim="ruleForm.relationContractAmount"
          :disabled="disabled"
          placeholder="请输入关联合同金额"
          @blur="amountInputBlur('relationContractAmount')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>
      <el-form-item
        label="联系地址"
        label-width="180px"
        class="residue-row"
        prop="contactAddress"
      >
        <el-input
          v-model="ruleForm.contactAddress"
          :disabled="disabled"
          clearable
          placeholder="请输入联系地址"
        />
      </el-form-item>
      <el-form-item
        label="协议期限"
        label-width="180px"
        prop="agreementTerm"
      >
        <el-input
          v-model="ruleForm.agreementTerm"
          :disabled="disabled"
          clearable
          :maxlength="4"
          placeholder="请输入协议期限"
        >
          <template slot="append">月</template>
        </el-input>
      </el-form-item>

      <el-form-item
        label="合同状态"
        label-width="180px"
        prop="state"
      >
        <el-select
          v-model="ruleForm.state"
          :disabled="disabled"
          clearable
          placeholder="请输入合同状态"
        >
          <el-option
            v-for="item in constant.contractState"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="归档日期"
        label-width="180px"
        prop="overDate"
      >
        <el-date-picker
          v-model="ruleForm.filingDate"
          style="width: 100%"
          type="date"
          :disabled="disabled"
          clearable
          placeholder="请输入归档日期"
        />
      </el-form-item>

      <el-form-item
        label="签订地点"
        label-width="180px"
        prop="signPlace"
      >
        <el-input
          v-model="ruleForm.signPlace"
          :disabled="disabled"
          clearable
          placeholder="请输入签订地点"
        />
      </el-form-item>

      <el-form-item
        label="合作内容(技术、资源等)"
        label-width="180px"
        class="fill-in-row  row-label "
      >
        <el-input
          v-model="ruleForm.cooperationContent"
          placeholder="请输入合作内容(技术、资源等)"
          :disabled="disabled"
          clearable
          type="textarea"
          :maxlength="200"
          :rows="3"
        />
      </el-form-item>

      <el-form-item
        label="合同"
        label-width="180px"
      >
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
          <el-button
            size="small"
            type="primary"
            :disabled="disabled"
          >
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
          :disabled="disabled"
        >
          <el-button
            size="small"
            type="primary"
            :disabled="disabled"
          >
            <i class="iconfont icon-chuanshu_shangchuan" /> 上传附件
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="合同备注"
        label-width="180px"
        class="fill-in-row  row-label "
        prop="remark"
      >
        <el-input
          v-model="ruleForm.remark"
          placeholder="请输入合同备注"
          :disabled="disabled"
          clearable
          type="textarea"
          :maxlength="200"
          :rows="3"
        />
      </el-form-item>

      <el-form-item
        label="经办组织"
        label-width="180px"
        prop="handlingOrgId"
      >
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
      <el-form-item
        label="经办日期"
        label-width="180px"
        prop="handlingDate"
      >
        <el-date-picker
          v-model="ruleForm.handlingDate"
          style="width: 100%"
          placeholder="请选择经办日期"
          :disabled="disabled"
          clearable
          type="date"
        />
      </el-form-item>
      <el-form-item
        label="经办人"
        label-width="180px"
        prop="handlingPersonName"
      >
        <el-input
          v-model="ruleForm.handlingPersonName"
          :disabled="disabled"
          clearable
          placeholder="请输入经办人"
        />
      </el-form-item>
      <el-form-item
        label="录入人"
        label-width="180px"
        prop="operationPersonName"
      >
        <el-input
          v-model="ruleForm.createUserName"
          :disabled="true"
          placeholder="请输入录入人"
          clearable
        />
      </el-form-item>

      <el-form-item
        label="录入时间"
        label-width="180px"
        prop="operationDate"
      >
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
import { getOneOfOther } from '@core/api/contractManage/contractmanager'
import upload from '@core/mixins/upload'
import { setSessionStorage, getSessionStorage } from '@core/utils/auth'
import { toDecimal } from '@core/utils/validate'

import { mapGetters } from 'vuex'
export default {
  name: 'OtherContracts',
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
      settlementList: [], // 结算书附件
      fileList: [], // 合同附件
      ruleForm: {
        amount: 0, // 合同金额
        approvalNo: '', // 审批单号
        balanceType: '', // 收支类型
        category: '', // 合同类别
        contractNumber: '', // 合同编号
        effectiveState: '', // 生效状态
        filingDate: '', // 归档日期
        handlingDate: '', // 经办日期
        handlingOrgId: '', // 经办组织Id
        handlingPersonId: '', // 经办人Id
        handlingPersonName: '', // 经办人名称
        name: '', // 合同名称
        settlementAmount: 0, // 结算金额
        signDate: '', // 签订日期
        constructionUnit: '', // 保险人/签订单位Id
        startOrgId: '', // 发起组织Id
        state: '', // 合同状态
        modificationRecordList: [],
        modificationRecordHistoryList: []
      },
      rules: {
        approvalNo: [
          { required: true, message: '请输入审批单号', trigger: 'blur' }
        ],
        startOrgId: [
          { required: true, message: '请选择发起组织', trigger: 'change' }
        ],
        effectiveState: [
          { required: true, message: '请选择生效状态', trigger: 'change' }
        ],
        contractNumber: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
        ],
        attribution: [
          { required: true, message: '请选择合同归属', trigger: 'change' }
        ],
        belongOrgId: [
          { required: true, message: '请选择归属单位', trigger: 'change' }
        ],

        type: [
          { required: true, message: '请选择合同类型', trigger: 'change' }
        ],
        category: [
          { required: true, message: '请选择合同类别', trigger: 'change' }
        ],
        signDate: [
          { required: true, message: '请选择签订日期', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请选择合同名称', trigger: 'change' }
        ],
        balanceType: [
          { required: true, message: '请选择收支类型', trigger: 'change' }
        ],
        amount: [
          { required: true, message: '请输入收合同金额', trigger: 'blur' }
        ],

        constructionUnit: [
          { required: true, message: '请输入签订单位', trigger: 'blur' }
        ],
        state: [{ required: true, message: '请选择合同状态', trigger: 'blur' }],
        handlingOrgId: [
          { required: true, message: '请选择经办组织', trigger: 'change' }
        ],
        handlingDate: [
          { required: true, message: '请选择经办日期', trigger: 'change' }
        ],
        handlingPersonId: [
          { required: true, message: '请选择经办人', trigger: 'change' }
        ],
        relationContractNo: [
          { required: false, message: '请输入关联合同编号', trigger: 'change' }
        ]
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
      { type: 'orgPersonList', params: getSessionStorage('orgId') }
    ])
      .then(() => {})
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
      getOneOfOther(id).then(({ data }) => {
        data.handlingOrgId = data.handlingOrgId.split(',')
        this.ruleForm = {
          ...this.ruleForm,
          ...data
        }

        this.ruleForm.type === '04' && this.ruleForm.category !== '01' ? this.rules['relationContractNo'][0].required = true : this.rules['relationContractNo'][0].required = false
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

        setSessionStorage('contractFormData', JSON.stringify(this.form))

        this.fetchFileList(this.ruleForm.approvalNo, 'otherContract')

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
      width: 66.66%;
      .half {
        width: 100%;
      }
    }
    .fill-in-row {
      width: 100%;
    }
  }
  .btn {
    width: 200px;
    margin: 10px auto;
  }
}
</style>
