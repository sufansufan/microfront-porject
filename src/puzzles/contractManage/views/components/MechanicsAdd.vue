<!-- 机械合同 -->
<template>
  <div class="mechanics-add">
    <div v-if="isDetailVersion && processOtions.btnStatus " class="details-title">
      <div>
        <el-button class="back-btn" @click="onCancle"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      </div>
      <div class="contract-name">{{ options.row.name }}</div>
      <div />
    </div>
    <el-form ref="ruleForm" :key="key" v-loading="loading" :rules="rules" :model="ruleForm" label-width="110px" class="mechanics-form">
      <el-form-item label="审批单号" prop="approvalNo">
        <el-input
          v-model.trim="ruleForm.approvalNo"
          clearable
          placeholder="请输入审批单号"
          :maxlength="18"
          :disabled="disabled || isAdd || isEdit"
          @change="(val) => {handlerChange({type: 'input', formName: 'approvalNo', value: val, name: '审批单号'})}"
        />
      </el-form-item>
      <el-form-item label="发起组织" prop="startOrgId">
        <el-select
          v-model="ruleForm.startOrgId"
          clearable
          placeholder="请选择发起组织"
          :disabled="disabled"
          @change="(val) => {handlerChange({type: 'select', formName: 'startOrgId', selectData: 'constant.userOrganization',selectOptions: {code: 'id', name: 'orgName'}, value: val, name: '发起组织'})}"
        >
          <el-option v-for="item in constant.userOrganization" :key="item.id" :label="item.orgName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="生效状态" prop="effectiveState">
        <el-select
          v-model="ruleForm.effectiveState"
          clearable
          placeholder="请选择生效状态"
          :disabled="disabled || isAdd ||isEdit"
          @change="(val) => {handlerChange({type: 'select', formName: 'effectiveState', selectData: 'constant.EffectiveState',selectOptions: {code: 'code', name: 'name'}, value: val, name: '生效状态'})}"
        >
          <el-option v-for="item in constant.EffectiveState" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="合同编号" prop="contractNumber">
        <el-input
          v-model.trim="ruleForm.contractNumber"
          clearable
          placeholder="请输入合同编号"
          :maxlength="20"
          :disabled="disabled"
          @change="(val) => {handlerChange({type: 'input', formName: 'contractNumber', value: val, name: '合同编号'})}"
        />
      </el-form-item>
      <el-form-item label="合同名称" prop="name" class="two-width">
        <el-input
          v-model.trim="ruleForm.name"
          clearable
          placeholder="请输入合同名称"
          :maxlength="100"
          :disabled="disabled"
          @change="(val) => {handlerChange({type: 'input', formName: 'name', value: val, name: '合同名称'})}"
        />
      </el-form-item>
      <el-form-item label="合同类别" prop="category">
        <el-select
          v-model="ruleForm.category"
          clearable
          placeholder="请选择合同类别"
          :disabled="disabled ||isAdd"
          @change="(val) => {handlerChange({type: 'select', formName: 'category', selectData: 'constant.ContractCategory',selectOptions: {code: 'code', name: 'name'}, value: val, name: '合同类别'})}"
        >
          <el-option v-for="item in constant.ContractCategory" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="合同金额" prop="amount">
        <amount-input
          v-model.trim="ruleForm.amount"
          :disabled="disabled"
          placeholder="请输入合同金额"
          @blur="amountInputBlur('amount')"
          @change="(val) => {handlerChange({type: 'input',selectOptions: {suf:'元'}, formName: 'amount', value: val, name: '合同金额'})}"
        />
      </el-form-item>
      <el-form-item label="结算金额" prop="settlementAmount">
        <amount-input
          v-model.trim="ruleForm.settlementAmount"
          :disabled="settleDisabled || isAdd"
          placeholder="请输入结算金额"
          @blur="amountInputBlur('settlementAmount')"
          @change="(val) => {handlerChange({type: 'input',selectOptions: {suf:'元'}, formName: 'settlementAmount', value: val, name: '结算金额'})}"
        />
      </el-form-item>
      <el-form-item label="收支类型" prop="balanceType">
        <el-select
          v-model="ruleForm.balanceType"
          clearable
          placeholder="请选择收支类型"
          :disabled="disabled"
          @change="(val) => {handlerChange({type: 'select', formName: 'balanceType', selectData: 'constant.BalanceType',selectOptions: {code: 'code', name: 'name'}, value: val, name: '收支类型'})}"
        >
          <el-option v-for="item in constant.BalanceType" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="合同状态" prop="state">
        <el-select
          v-model="ruleForm.state"
          clearable
          placeholder="请选择合同状态"
          :disabled="disabled"
          @change="(val) => {handlerChange({type: 'select', formName: 'state', selectData: 'contractState',selectOptions: {code: 'code', name: 'name'}, value: val, name: '合同状态'})}"
        >
          <el-option v-for="item in constant.contractState" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="归档日期"
        prop="filingDate"
        :rules="[
          { required: ruleForm.state === '02', message: '请选择归档日期', trigger: 'change' }
        ]"
      >
        <el-date-picker
          v-model="ruleForm.filingDate"
          type="date"
          placeholder="请选择归档日期"
          clearable
          :disabled="disabled || ruleForm.state ===''|| ruleForm.state==='01' || ruleForm.state==='03'"
          @change="(val) => {handlerChange({type: 'date', formName: 'filingDate', value: val, name: '归档日期'})}"
        />
      </el-form-item>
      <el-form-item label="租赁公司" prop="cooperateUnitId">
        <el-cascader
          v-model="ruleForm.cooperateUnitId"
          placeholder="请选择租赁公司"
          clearable
          :disabled="disabled || isShowCooperateList"
          style="width:100%"
          filterable
          :options="constant.cooperatunitsList"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'list' }"
          @change="(val) => {handlerChange({type: 'cascader', formName: 'cooperateUnitId', selectData: 'constant.cooperatunitsList',selectOptions: {code: 'id', name: 'name'}, value: val, name: '租赁公司'})}"
        />
      </el-form-item>
      <el-form-item label="联系人" prop="contactPersonName">
        <el-input
          v-model.trim="ruleForm.contactPersonName"
          clearable
          placeholder="请输入联系人"
          :maxlength="20"
          :disabled="disabled"
          @change="(val) => {handlerChange({type: 'input', formName: 'contactPersonName', value: val, name: '联系人'})}"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="contactTelephone">
        <el-input
          v-model.trim="ruleForm.contactTelephone"
          clearable
          placeholder="请输入联系电话"
          :disabled="disabled"
          @change="(val) => {handlerChange({type: 'input', formName: 'contactTelephone', value: val, name: '联系电话'})}"
        />
      </el-form-item>
      <el-form-item label="签订日期" prop="signDate">
        <el-date-picker
          v-model="ruleForm.signDate"
          type="date"
          placeholder="请选择签订日期"
          clearable
          :disabled="disabled"
          @change="(val) => {handlerChange({type: 'date', formName: 'signDate', value: val, name: '签订日期'})}"
        />
      </el-form-item>
      <el-form-item label="签订地点" prop="signingAddress">
        <el-input
          v-model.trim="ruleForm.signingAddress"
          :maxlength="50"
          :disabled="disabled"
          placeholder="请输入签订地点"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'signingAddress', value: val, name: '签订地点'})}"
        />
      </el-form-item>
      <el-form-item label="结算方式" prop="countWay">
        <el-select
          v-model="ruleForm.countWay"
          clearable
          placeholder="请选择结算方式"
          :disabled="disabled"
          @change="(val) => {handlerChange({type: 'select', formName: 'countWay', selectData: 'constant.CountWay',selectOptions: {code: 'code', name: 'name'}, value: val, name: '结算方式'})}"
        >
          <el-option v-for="item in constant.CountWay" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="支付方式" prop="paymentMethod">
        <el-select
          v-model="ruleForm.paymentMethod"
          clearable
          placeholder="请选择支付方式"
          :disabled="disabled"
          :rules="[
            { required: ruleForm.disease === 'Has', message: '请选择支付方式', trigger: 'blur' }
          ]"
          @change="(val) => {handlerChange({type: 'select', formName: 'paymentMethod', selectData: 'constant.PaymentMode',selectOptions: {code: 'code', name: 'name'}, value: val, name: '支付方式'})}"
        >
          <el-option v-for="item in constant.PaymentMode" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="租赁起始日期" prop="rentStart">
        <el-date-picker
          v-model="ruleForm.rentStart"
          type="date"
          placeholder="请选择租赁起始日期"
          clearable
          :picker-options="pickerBeginDateBefore"
          :disabled="disabled"
          @change="(val) => {handleStartDate(val, handlerChange({type: 'date', formName: 'rentStart', value: val, name: '租赁起始日期'}))
          }"
        />
      </el-form-item>
      <el-form-item label="租赁到期日期" prop="rentEnd">
        <el-date-picker
          v-model="ruleForm.rentEnd"
          type="date"
          placeholder="请选择租赁到期日期"
          clearable
          :picker-options="pickerBeginDateAfter"
          :disabled="disabled"
          @change="(val) => {handleEndDate(handlerChange({type: 'date', formName: 'rentEnd', value: val, name: '租赁到期日期'}))
          }"
        />
      </el-form-item>
      <el-form-item label="租赁押金" prop="rentMoney">
        <amount-input
          v-model.trim="ruleForm.rentMoney"
          :disabled="disabled"
          placeholder="请输入租赁押金"
          @blur="amountInputBlur('rentMoney')"
          @change="(val) => {handlerChange({type: 'input',selectOptions: {suf:'元'}, formName: 'rentMoney', value: val, name: '租赁押金'})}"
        />
      </el-form-item>
      <el-form-item label="使用地点" prop="placeOfUse" class="two-width ">
        <el-input
          v-model.trim="ruleForm.placeOfUse"
          :disabled="disabled"
          :maxlength="50"
          placeholder="请输入使用地点"
          @change="(val) => {handlerChange({type: 'input', formName: 'placeOfUse', value: val, name: '使用地点'})}"
        />
      </el-form-item>
      <el-form-item label="合同">
        <el-upload
          :file-list="contractList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'contractList', {name: '合同', record: true, formName: 'content' })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'contractList', {name: '合同', record: true, formName: 'content' })}"
          :before-upload="beforeUpload50M"
          :disabled="disabled"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="uploadbefore('contract')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="isDetail ||isDetailVersion || isSettlementBookList" label="结算书">
        <el-upload
          :file-list="settlementBookList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'settlementBookList', {name: '结算书', record: true })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'settlementBookList', {name: '结算书', record: true, children: true, formName: 'editContent' })}"
          :before-upload="beforeUpload50M"
          :disabled="settleDisabled"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="settleDisabled" @click="uploadbefore('settlementBook')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" prop="remark" class="all-width row-label">
        <el-input
          v-model.trim="ruleForm.remark"
          type="textarea"
          :maxlength="255"
          :rows="3"
          :disabled="disabled"
          placeholder="请输入备注"
          @change="(val) => {handlerChange({type: 'input', formName: 'remark', value: val, name: '备注'})}"
        />
      </el-form-item>
      <el-form-item label="经办组织" prop="handlingOrgId">
        <el-cascader
          v-model="ruleForm.handlingOrgId"
          placeholder="请选择经办组织"
          clearable
          :disabled="disabled"
          style="width:100%"
          filterable
          :options="handleOrgList"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'orgName', children: 'children',checkStrictly: true }"
          @change="(val) => fetchHandlingOrgPersonId(val)"
        />
      </el-form-item>
      <el-form-item label="经办日期" prop="handlingDate">
        <el-date-picker
          v-model="ruleForm.handlingDate"
          type="date"
          placeholder="请选择经办日期"
          clearable
          :disabled="disabled"
          @change="(val) => {handlerChange({type: 'date', formName: 'handlingDate', value: val, name: '经办日期'})}"
        />
      </el-form-item>
      <el-form-item label="经办人" prop="handlingPersonId">
        <el-select
          v-model="ruleForm.handlingPersonId"
          clearable
          placeholder="请选择经办人"
          :disabled="disabled || ruleForm.handlingOrgId.length === 0"
          @change="(val) => {handlerChange({type: 'select', formName: 'handlingPersonId', selectData: 'constant.orgPersonList',selectOptions: {code: 'id', name: 'name'}, value: val, name: '经办人'})}"
        >
          <el-option v-for="item in constant.orgPersonList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <template v-if="isEdit || isDetail || isDetailVersion">
        <el-form-item label="录入人" prop="createUserName">
          <el-input v-model.trim="ruleForm.createUserName" clearable placeholder="请输入录入人" :maxlength="18" :disabled="disabled || isEdit" />
        </el-form-item>
        <el-form-item label="录入时间" prop="createDate">
          <el-input v-model.trim="ruleForm.createDate" clearable placeholder="请输入录入时间" :maxlength="18" :disabled="disabled || isEdit" />
        </el-form-item>
      </template>
      <template v-if="isEdit && isShowContent && !isContractEntry && !isSettlementBookList">
        <el-form-item label="修改原因" prop="reason">
          <el-input
            v-model.trim="ruleForm.reason"
            clearable
            placeholder="请输入修改原因"
            :maxlength="20"
            :disabled="disabled"
          />
        </el-form-item>
        <el-form-item label="修改内容" class="all-width ">
          <update-context :update-data="ruleForm.content" />
        </el-form-item>
      </template>
      <template v-if="(isDetailVersion || (isShowContent && isEdit) || isContractRevise) && !isSettlementBookList">
        <el-form-item
          label="修改记录"
          class="all-width"
        >
          <history-record :is-current="true" :data="currentContent" />
        </el-form-item>
        <el-form-item class="all-width">
          <history-record v-if="processTypeStatus === 'start' && content.length > 0" :data="content" />
        </el-form-item>
      </template>
      <template v-if="isAdd || isDetailVersion">
        <el-form-item label="审批流程" class="all-width">
          <flow-chart :id="processId" :is-new="isAdd" />
        </el-form-item>
      </template>
    </el-form>
    <div v-if="(isAdd || isEdit) && processOtions.btnStatus" class="btn">
      <el-button type="primary" @click="submit(0)">保存</el-button>
      <el-button type="primary" @click="submit(1)">提交</el-button>
      <el-button class="cancel-btn" @click="onCancle">取消</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { validateLength, validateOnlyCode } from '@core/utils/validate'
import upload from '@core/mixins/upload'
import HistoryRecord from './HistoryRecord'
import flowChart from './FlowChart'
import componentType from '../mixins/componentType'
import { getSessionStorage } from '@core/utils/auth'
import { mechanicalContractSave, mechanicalContractEdit, mechanicalContractDetails, sonContractVersionDetails, validateUnique } from '@core/api/contractManage/contractmanager'
import formatterContent from '../mixins/formatterContent'
import dateMixins from '../mixins/date'
import copyUploadMixins from '../mixins/editGeneratorNo'
import { formatMoney } from '@core/utils'
export default {
  name: 'MechanicsAdd',
  components: {
    HistoryRecord,
    flowChart
  },
  mixins: [upload, componentType, formatterContent, dateMixins, copyUploadMixins],
  props: {
    processOtions: {
      default: () => {
        return {
          btnStatus: true
        }
      },
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    settleDisabled: {
      default: true,
      type: Boolean
    },
    processTypeStatus: {
      default: 'start',
      type: String
    }
  },
  data() {
    if (this.options.row) var { id } = this.options.row
    return {
      loading: false,
      content: [], // 历史修改记录
      currentContent: [], // 修改记录
      deepRuleForm: {},
      contractList: [],
      settlementBookList: [],
      ruleForm: {
        approvalNo: '', // 审批单号
        startOrgId: getSessionStorage('rootOrgId'), // 发起组织
        effectiveState: '01', // 生效状态
        contractNumber: '', // 合同编号
        name: '', // 合同名称
        category: '01', // 合同类别
        amount: '', // 合同金额
        settlementAmount: '', // 结算金额
        balanceType: '', // 收支类型
        state: '', // 合同状态
        filingDate: '', // 归档日期
        // cooperateUnitId: [], // 租赁公司
        contactPersonName: '', // 联系人
        contactTelephone: '', // 联系电话
        signDate: '', // 签订日期
        signingAddress: '', // 签订地点
        countWay: '', // 结算方式
        paymentMethod: '', // 支付方式
        rentStart: '', // 租赁起始日期
        rentEnd: '', // 租赁到期日期
        rentMoney: '', // 租赁押金
        placeOfUse: '', // 使用地点
        remark: '', // 备注
        handlingOrgId: [], // 经办组织
        handlingDate: '', // 经办日期
        handlingPersonId: '', // 经办人
        createUserName: '', // 录入人
        createDate: '', // 录入时间
        reason: '', // 修改原因
        content: [], // 修改内容
        id: '',
        optimisticLock: ''
      },
      rules: {
        approvalNo: [{ required: true, message: '请输入审批单号', trigger: 'blur' }, validateLength(0, 18)],
        startOrgId: [{ required: true, message: '请选择发起组织', trigger: 'change' }],
        effectiveState: [{ required: true, message: '请选择生效状态', trigger: 'change' }],
        contractNumber: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { required: true, validator: (rule, value, callback) => { validateOnlyCode(rule, value, callback, validateUnique({ contractNumber: value, id: id }), '04') }, trigger: 'blur' },
          validateLength(0, 20)],
        name: [{ required: true, message: '请输入合同名称', trigger: 'blur' }, validateLength(0, 100)],
        category: [{ required: true, message: '请选择合同类别', trigger: 'change' }],
        amount: [{ required: true, message: '请输入合同金额', trigger: 'blur' }, { required: true, validator: this.validtorZeroMon, trigger: 'blur' }],
        balanceType: [{ required: true, message: '请选择收支类型', trigger: 'change' }],
        state: [{ required: true, message: '请选择合同状态', trigger: 'change' }],
        contactTelephone: [{ validator: this.validPhoneorMob(), trigger: 'blur' }], // 联系电话
        // cooperateUnitId: [{ required: true, message: '请选择租赁公司', trigger: 'change' }],
        signDate: [{ required: true, message: '请选择签订日期', trigger: 'change' }],
        countWay: [{ required: true, message: '请选择结算方式', trigger: 'change' }],
        rentStart: [{ required: true, message: '请选择租赁起始日期', trigger: 'change' }],
        rentEnd: [{ required: true, message: '请选择租赁到期日期', trigger: 'change' }],
        rentMoney: [{ required: true, message: '请输入租赁押金', trigger: 'blur' }, { required: true, validator: this.validtorZeroMon, trigger: 'blur' }],
        handlingOrgId: [{ required: true, message: '请选择经办组织', trigger: 'change' }],
        handlingDate: [{ required: true, message: '请选择经办日期', trigger: 'change' }],
        handlingPersonId: [{ required: true, message: '请选择经办人', trigger: 'change' }],
        signingAddress: [validateLength(0, 50)], // 签订地点
        contactPersonName: [validateLength(0, 20)], // 联系人
        remark: [validateLength(0, 255)],
        reason: [{ required: true, message: '请输入修改原因', trigger: 'blur' }, validateLength(0, 20)] // 修改原因
      }

    }
  },

  computed: {
    ...mapGetters(['constant']),
    // 经办组织 orgList
    handleOrgList() {
      return this.constant.orgList
    }

  },
  created() {
    this.ruleForm.handlingDate = new Date()
    const orgListParams = {
      parentPath: getSessionStorage('orgId'),
      del: '0',
      state: 'ok'
    }
    // 'cooperatunitsList',
    this.$store.dispatch('getConstant', ['EffectiveState', 'ContractCategory', 'BalanceType', 'contractState', 'PaymentMode', 'userOrganization', 'generateNo', 'CountWay', { type: 'orgList', params: orgListParams }, { type: 'orgPersonList', params: getSessionStorage('orgId') }]).then(() => {
      this.ruleForm.approvalNo = this.constant.generateNo
      this.uploadData.businessDataId = this.ruleForm.approvalNo
    })
    if (this.options.row) {
      const { id, revisionNumber } = this.options.row
      if (this.isEdit || this.isDetail) {
        this.getContractDetails(id)
      } else if (this.isDetailVersion) {
        this.getVersionDetails(id, revisionNumber)
      }
    }
  },
  methods: {
    ...mapActions(['getConstant']),
    onCancle() {
      this.$emit('changeState', 'mechanicsList')
    },
    handleStartDate(val) {
      if (val) {
        this.pickerBeginDateAfter = {
          disabledDate(time) {
            return time.getTime() < val.getTime()
          }
        }
      }
    },
    handleEndDate(value) {
      if (value) {
        this.pickerBeginDateBefore = {
          disabledDate(time) {
            return time.getTime() > value.getTime()
          }
        }
      }
    },
    // 获取版本详情
    getVersionDetails(id, revisionNumber) {
      this.loading = true
      sonContractVersionDetails(id, revisionNumber).then(async({ data }) => {
        this.loading = false
        await this.formatterResponseConent(data, 'contract')
        this.ruleForm.rentMoney = formatMoney(data.subContractDTO.rentMoney)
        const { approvalNo } = this.ruleForm
        this.getFileList(approvalNo)
      })
    },
    // 获取详情
    getContractDetails(id) {
      this.loading = true
      mechanicalContractDetails(id).then(async({ data }) => {
        this.loading = false
        await this.formatterResponseConent(data, 'contract')
        this.ruleForm.rentMoney = formatMoney(data.subContractDTO.rentMoney)
        sessionStorage.setItem('constructionUnit', this.ruleForm.cooperateUnitId)
        const { approvalNo, rentStart, rentEnd } = this.ruleForm
        console.log(rentStart, rentEnd, '1111111111111111')
        // this.ruleForm.rentStart = rentStart && new Date(rentStart)
        // this.ruleForm.rentEnd = rentEnd && new Date(rentEnd)
        // rentStart, rentEnd
        // this.handleStartDate(this.ruleForm.rentStart)
        // this.handleEndDate(this.ruleForm.rentEnd)
        this.getFileList(approvalNo)
        sessionStorage.setItem('contactFormData', JSON.stringify({
          handlingPersonId: this.ruleForm.handlingPersonId,
          handlingOrgId: this.ruleForm.handlingOrgId
        }))
      })
    },
    getFileList(number) {
      this.uploadData.businessDataId = number
      this.fetchFileList(number, 'contract')
      this.fetchFileList(number, 'settlementBook')
    },
    uploadbefore(type) {
      switch (type) {
        case 'contract':
          this.uploadData.typeCode = 'contract'
          break
        case 'settlementBook':
          this.uploadData.typeCode = 'settlementBook'
          break
        default:
          break
      }
    },
    fetchFileList(id, type) {
      this.getFileLoad(id, type).then(data => {
        switch (type) {
          case 'contract':
            this.contractList = data
            this.contractList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            break
          case 'settlementBook':
            this.settlementBookList = data
            this.settlementBookList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            break
          default:
            break
        }
        if (this.isEdit) {
          this.editGeneratorNo(this.ruleForm.approvalStatus, 'subContarct')
        }
      })
    },
    submit(type) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { handlingOrgId } = this.ruleForm
          const { id } = this.$route.query
          var params = {
            Loading: true,
            ...this.ruleForm,
            contractId: id,
            subType: '03',
            // cooperateUnitId: cooperateUnitId.toString(),
            handlingOrgId: handlingOrgId.toString()
          }
          delete params.id
          delete params.optimisticLock
          delete params.content
          if (this.isAdd) {
            mechanicalContractSave(params, type).then(res => {
              this.$message.success('新增成功')
              this.$emit('changeState', 'mechanicsList')
            })
          } else if (this.isEdit) {
            const { id, optimisticLock } = this.ruleForm
            params = {
              ...params,
              id: id,
              optimisticLock: optimisticLock,
              subModificationRecordDTO: this.formatterRequestConent()
            }
            mechanicalContractEdit(params, type).then(res => {
              this.$message.success('修改成功')
              this.$emit('changeState', 'mechanicsList')
            })
          }
        } else {
          return
        }
      })
    }

  }
}

</script>

<style lang="less" scoped>
.mechanics-add{
  .mechanics-form {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    & > div {
      width: 50%;
    }
    & > .el-form-item {
      width:33.33%;
      .el-date-editor.el-input,.el-select {
        width: 100%;
      }
       &.all-width {
        width:100%;
      }
       &.two-width {
        width:66.66%;
      }
    }
  }
  .details-title {
     padding: 7px 0 10px 0;
     display: flex;
     justify-content: space-between;
     .contract-name {
        font-size: 16px;
        text-align: center;
        padding: 10px 0;
        font-weight: bolder;
     }
  }
   .btn {
      width: 100%;
      text-align: center;
      padding-top:30px;
    }
}
</style>
