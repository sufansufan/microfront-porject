<template>
  <div class="sub-contract">
    <div v-if="!isAdd" class="top">
      <el-button
        v-if="isDetailVersion"
        class="back-btn"
        @click="onBack"
      >返回</el-button>
      <div class="extend-name">
        {{ contractName }}
      </div>
    </div>
    <div class="container">
      <el-form
        ref="ruleForm"
        v-loading="loading"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="constrack-form"
      >
        <el-form-item label="审批单号" prop="approvalNo">
          <el-input v-model="ruleForm.approvalNo" :disabled="true" :maxlength="18" />
        </el-form-item>

        <el-form-item label="发起组织" prop="startOrgId">
          <el-select
            v-model="ruleForm.startOrgId"
            clearable
            :disabled="disabled"
            :placeholder="getPlaceHolder('发起组织')"
            @change="(val) => {handlerChange({type: 'select', formName: 'startOrgId',
                                              selectOptions:{ code:'code',name:'name' },
                                              value: val, name: '发起组织',selectData:'startOrgIdList'})}"
          >
            <el-option
              v-for="item in startOrgList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="生效状态" prop="effectiveState">
          <el-select
            v-model="ruleForm.effectiveState"
            clearable
            :disabled="true"
            :placeholder="getPlaceHolder('生效状态',1)"
            @change="(val) => {handlerChange({type: 'select', formName: 'effectiveState', value: val, name: '生效状态',
                                              selectOptions:{ code:'code',name:'name' },selectData:'statusList'})}"
          >
            <el-option
              v-for="item in statusList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="合同编号" prop="contractNumber">
          <el-input
            v-model="ruleForm.contractNumber"
            :disabled="disabled"
            :maxlength="20"
            clearable
            :placeholder="getPlaceHolder('合同编号')"
            @change="(val) => {handlerChange({type: 'input',selectOptions:{ code:'code',name:'name' }, formName: 'contractNumber', value: val, name: '合同编号'})}"
          />
        </el-form-item>

        <el-form-item label="合同名称" prop="name" class="residue-row">
          <el-input
            v-model.trim="ruleForm.name"
            :disabled="disabled"
            :maxlength="100"
            :placeholder="getPlaceHolder('合同名称')"
            clearable
            @change="(val) => {handlerChange({type: 'input', formName: 'name',
                                              selectOptions:{ code:'code',name:'name' },
                                              value: val, name: '合同名称'})}"
          />
        </el-form-item>

        <el-form-item label="合同类别" prop="category">
          <el-select
            v-model="ruleForm.category"
            :disabled="true"
            clearable
            :placeholder="getPlaceHolder('合同类别',1)"
            @change="(val) => {handlerChange({type: 'select', formName: 'category', value: val, name: '合同类别',
                                              selectOptions:{ code:'code',name:'name' },selectData:'categoryList'})}"
          >
            <el-option
              v-for="item in categoryList"
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
            :placeholder="getPlaceHolder('合同金额')"
            @blur="amountInputBlur('amount')"
            @change="(val) => {handlerChange({type: 'input',selectOptions:{ code:'code',name:'name' }, formName: 'amount', value: val, name: '合同金额'})}"
          />
        </el-form-item>

        <el-form-item label="结算金额" prop="settlementAmount">
          <amount-input
            v-model.trim="ruleForm.settlementAmount"
            :disabled="settleDisabled"
            :placeholder="getPlaceHolder('结算金额')"
            @blur="amountInputBlur('settlementAmount')"
            @change="(val) => {handlerChange({type: 'input',selectOptions:{ code:'code',name:'name' }, formName: 'settlementAmount', value: val, name: '结算金额'})}"
          />
        </el-form-item>

        <el-form-item label="收支类型" prop="balanceType">
          <el-select
            v-model="ruleForm.balanceType"
            :disabled="disabled"
            clearable
            :placeholder="getPlaceHolder('收支类型',1)"
            @change="(val) => {handlerChange({type: 'select', formName: 'balanceType', selectData: 'collectTypeList',selectOptions: {code: 'code', name: 'name'}, value: val, name: '收支类型'})}"
          >
            <el-option
              v-for="item in collectTypeList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="合同状态" prop="state">
          <el-select
            v-model="ruleForm.state"
            :disabled="disabled"
            clearable
            :placeholder="getPlaceHolder('合同状态',1)"
            @change="(val) => {handlerChange({type: 'select', formName: 'state', selectData: 'statusList',selectOptions: {code: 'code', name: 'name'}, value: val, name: '合同状态'})}"
          >
            <el-option
              v-for="item in contractStatusList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
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
            :disabled="disabled || disabledFillingDate"
            :placeholder="getPlaceHolder('归档日期',1)"
            type="date"
            clearable
            @change="(val) => {handlerChange({type: 'date', formName: 'filingDate',value: val, name: '归档日期'})}"
          />
        </el-form-item>

        <el-form-item label="分包公司" prop="cooperateUnitId">
          <el-cascader
            v-model="ruleForm.cooperateUnitId"
            :placeholder="getPlaceHolder('分包公司', 1)"
            clearable
            :disabled="disabled || isShowCooperateList"
            filterable
            :options="constant.cooperatunitsList"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'list' }"
            @change="(val) => {handlerChange({type: 'cascader', formName: 'cooperateUnitId', selectData: 'constant.cooperatunitsList',selectOptions: {code: 'id', name: 'name'}, value: val, name: '分包公司'})}"
          />
        </el-form-item>

        <el-form-item label="分包方代表" prop="contactPersonName">
          <el-input
            v-model="ruleForm.contactPersonName"
            :disabled="disabled"
            :maxlength="20"
            :placeholder="getPlaceHolder('分包方代表')"
            clearable
            @change="(val) => {handlerChange({type: 'input',selectOptions:{ code:'code',name:'name' }, formName: 'contactPersonName', value: val, name: '分包方代表'})}"
          />
        </el-form-item>

        <el-form-item label="联系电话" prop="contactTelephone">
          <el-input
            v-model="ruleForm.contactTelephone"
            :disabled="disabled"
            :maxlength="11"
            :placeholder="getPlaceHolder('联系电话')"
            clearable
            @change="(val) => {handlerChange({type: 'input',selectOptions:{ code:'code',name:'name' }, formName: 'contactTelephone', value: val, name: '联系电话'})}"
          />
        </el-form-item>

        <el-form-item label="签订日期" prop="signDate">
          <el-date-picker
            v-model="ruleForm.signDate"
            :disabled="disabled"
            :placeholder="getPlaceHolder('签订日期',1)"
            type="date"
            clearable
            @change="(val) => {handlerChange({type: 'date', formName: 'signDate', value: val, name: '签订日期'})}"
          />
        </el-form-item>

        <el-form-item label="签订地点" prop="signingAddress">
          <el-input
            v-model="ruleForm.signingAddress"
            :disabled="disabled"
            :placeholder="getPlaceHolder('签订地点')"
            :maxlength="50"
            clearable
            @change="(val) => {handlerChange({type: 'input',selectOptions:{ code:'code',name:'name' }, formName: 'signingAddress', value: val, name: '签订地点'})}"
          />
        </el-form-item>

        <el-form-item label="支付方式" prop="paymentMethod">
          <el-select
            v-model="ruleForm.paymentMethod"
            :disabled="disabled"
            clearable
            :placeholder="getPlaceHolder('支付方式',1)"
            @change="(val) => {handlerChange({type: 'select',selectOptions:{ code:'code',name:'name' }, formName: 'paymentMethod', value: val, name: '支付方式',selectData:'SubSubTypeEnumList'})}"
          >
            <el-option
              v-for="item in SubSubTypeEnumList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="合同">
          <el-upload
            :file-list="contractList"
            :action="actionUrl"
            :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'contractList', {name: '合同', record: true, formName: 'content' })}"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'contractList', {name: '合同', record: true, children: true, formName: 'content' })}"
            :before-upload="beforeUpload50M"
            :disabled="disabled"
            :on-error="fileError"
            :on-progress="uploadProgress"
            :on-preview="previewFile"
          >
            <el-button type="primary" :disabled="disabled" @click="uploadBusinessId(ruleForm.approvalNo,'contract')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item v-if="isDetail || isDetailVersion || isSettlementBookList" label="结算书">
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
            <el-button type="primary" :disabled="settleDisabled" @click="handleUploadEngFile(ruleForm.approvalNo,'settlementBook')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item
          label="备注"
          class="fill-in-row row-label"
          prop="remark"
        >
          <el-input
            v-model="ruleForm.remark"
            :maxlength="255"
            :disabled="disabled"
            :rows="3"
            :placeholder="getPlaceHolder('备注')"
            type="textarea"
            @change="(val) => {handlerChange({type: 'input', formName: 'remark', value: val, name: '备注'})}"
          />
        </el-form-item>

        <el-form-item label="经办组织" prop="handlingOrgId">
          <el-cascader
            v-model="ruleForm.handlingOrgId"
            :placeholder="getPlaceHolder('经办组织', 1)"
            clearable
            :disabled="disabled"
            filterable
            :options="handleOrgList"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'orgName', children: 'children',checkStrictly: true }"
            @change="(val) => fetchHandlingOrgPersonId(val)"
          />

          <!--

         @change="(val) => {handlerChange({type: 'cascader', formName: 'handlingOrgId',
                                              selectOptions: {code: 'id', name: 'orgName'},
                                              selectData: 'handleOrgList', value: val, name: '经办组织'})}"
       -->

        </el-form-item>
        <el-form-item label="经办日期" prop="handlingDate">
          <el-date-picker
            v-model="ruleForm.handlingDate"
            type="date"
            :disabled="disabled"
            :placeholder="getPlaceHolder('经办日期', 1)"
            clearable
            @change="(val) => {handlerChange({type: 'date', formName: 'handlingDate', value: val, name: '经办日期'})}"
          />
        </el-form-item>
        <el-form-item label="经办人" prop="handlingPersonId">
          <el-select
            v-model="ruleForm.handlingPersonId"
            clearable
            :disabled="disabled || ruleForm.handlingOrgId.length === 0"
            :placeholder="getPlaceHolder('经办人', 1)"
            @change="(val) => {handlerChange({type: 'select', formName: 'handlingPersonId', selectData: 'handleManList',selectOptions: {code: 'code', name: 'name'}, value: val, name: '经办人'})}"
          >
            <el-option
              v-for="item in handleManList"
              :key="item.code"
              :value="item.code"
              :label="item.name"
            />
          </el-select>

        </el-form-item>

        <template v-if="!isAdd">
          <el-form-item label="录入人" prop="createUserName">
            <el-input v-model="ruleForm.createUserName" :disabled="true" />
          </el-form-item>

          <el-form-item label="录入时间" prop="createDate">
            <el-date-picker
              v-model="ruleForm.createDate"
              :disabled="true"
              type="datetime"
              readonly
            />
          </el-form-item>

          <template v-if="isEdit && isShowContent && !isContractEntry && !isSettlementBookList">
            <el-form-item label="修改原因" prop="reason">
              <el-input v-model="ruleForm.reason" :maxlength="20" placeholder="请输入修改原因" />
            </el-form-item>

            <el-form-item
              label="修改内容"
              prop="editContent"
              class="fill-in-row"
            >
              <update-context :update-data="ruleForm.content" />
            </el-form-item>

          </template>
        </template>

        <template v-if="(isDetailVersion || (isEdit && isShowContent)) || isContractEntry">
          <el-form-item
            label="修改记录"
            class="fill-in-row"
          >
            <history-record :is-current="true" :data="currentContent" />
          </el-form-item>

          <el-form-item class="fill-in-row">
            <history-record v-if="processTypeStatus === 'start' && content.length > 0" :data="content" />
          </el-form-item>
        </template>
        <template v-if="isAdd || isDetailVersion">
          <el-form-item class="fill-in-row" :label="processLabel">
            <flow-chart :id="processId" :is-new="isAdd" :label.sync="processLabel" />
          </el-form-item>
        </template>
        <div v-if="(isAdd || isEdit) && processOtions.btnStatus" class="btn">
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button class="cancel-btn" @click="onCancel">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import HistoryRecord from './HistoryRecord'
import { validateLength, validateOnlyCode } from '@core/utils/validate'
import editGeneratorNo from '../mixins/editGeneratorNo.js'
import componentType from '../mixins/componentType'
import { getSessionStorage } from '@core/utils/auth'
import { mapActions, mapGetters } from 'vuex'
import UpdateContext from '@framesDash/components/UpdateContext'
import formUpdateContext from '@core/mixins/formUpdateContext'
import { subContractSave, subContractEdit, subContractDetails, sonContractVersionDetails, validateUnique
} from '@core/api/contractManage/contractmanager'
import uploadExtend from '../mixins/upload'
import formatterContent from '../mixins/formatterContent'

export default {
  name: 'SubDetailInfo',
  components: {
    UpdateContext,
    HistoryRecord,
    flowChart: () => import('./FlowChart')
  },
  mixins: [formUpdateContext, formatterContent, componentType, uploadExtend, editGeneratorNo],
  props: {
    settleDisabled: {
      default: true,
      type: Boolean
    },
    processTypeStatus: {
      default: 'start',
      type: String
    },
    processOtions: {
      default: () => {
        return {
          btnStatus: true
        }
      },
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      contractList: [],
      settlementBookList: [],
      deepSettlementBookList: [],
      deepContractList: [],
      deepRuleForm: {},
      ruleForm: {
        approvalNo: '',
        startOrgId: '',
        effectiveState: '',
        contractNumber: '', // 合同编号
        name: '', // 合同名称
        category: '', // 合同类别
        amount: '', // 合同金额
        settlementAmount: '', // 结算金额
        balanceType: '', // 收支类型
        state: '', // 合同状态
        filingDate: '', // 归档日期
        cooperateUnitId: '', // 分包单位
        contactPersonName: '', // 分包方代表
        contactTelephone: '', // 联系电话
        signDate: '', // 签订日期
        signingAddress: '', // 签订地点
        paymentMethod: '', // 支付方式
        handlingOrgId: '', // 经办组织
        handlingDate: new Date(), // 经办日期
        handlingPersonId: '', // 经办人
        createUserName: '', // 录入人
        createDate: '', // 录入时间
        reason: '', // 修改原因
        content: [] // 修改内容
      },
      rules: {
        reason: [
          { required: true, message: '请输入修改原因', trigger: 'blur' }
        ],
        approvalNo: [
          {
            required: true,
            message: this.getPlaceHolder('审批单号'),
            trigger: 'blur'
          }
        ],
        startOrgId: [
          {
            required: true,
            message: this.getPlaceHolder('发起组织', 1),
            trigger: 'change'
          }
        ],
        effectiveState: [
          {
            required: true,
            message: this.getPlaceHolder('生效状态', 1),
            trigger: 'change'
          }
        ],
        contactTelephone: [
          { validator: this.validPhone(), trigger: 'blur' },
          validateLength(0, 11)
        ],
        contractNumber: [
          {
            required: true,
            message: this.getPlaceHolder('合同编号'),
            trigger: 'blur'
          },
          { required: true, validator: (rule, value, callback) => { validateOnlyCode(rule, value, callback, validateUnique({ contractNumber: value, id: this.isNew ? undefined : this.currentId }), '04') }, trigger: 'blur' },
          validateLength(0, 20)
        ],
        name: [
          {
            required: true,
            message: this.getPlaceHolder('合同名称'),
            trigger: 'blur'
          },
          validateLength(0, 100)
        ],
        category: [
          {
            required: true,
            message: this.getPlaceHolder('合同类别', 1),
            trigger: 'change'
          }
        ],
        amount: [
          {
            required: true,
            message: this.getPlaceHolder('合同金额'),
            trigger: 'blur'
          },
          { required: true, validator: this.validtorZeroMon, trigger: 'blur' }
        ],
        balanceType: [
          {
            required: true,
            message: this.getPlaceHolder('收支类型', 1),
            trigger: 'change'
          }
        ],
        state: [
          {
            required: true,
            message: this.getPlaceHolder('合同状态', 1),
            trigger: 'change'
          }
        ],
        cooperateUnitId: [
          // {
          //   required: true,
          //   message: this.getPlaceHolder('分包公司'),
          //   trigger: 'blur'
          // }
        ],
        contactPersonName: [validateLength(0, 20)],
        signDate: [
          {
            required: true,
            message: this.getPlaceHolder('签订日期', 1),
            trigger: 'change'
          }
        ],
        signingAddress: [validateLength(0, 50)],

        remark: [validateLength(0, 255)],
        handlingOrgId: [
          {
            required: true,
            message: this.getPlaceHolder('经办组织', 1),
            trigger: 'change'
          }
        ],
        handlingDate: [
          {
            required: true,
            message: this.getPlaceHolder('经办日期', 1),
            trigger: 'change'
          }
        ],
        handlingPersonId: [
          {
            required: true,
            message: this.getPlaceHolder('经办人', 1),
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    // 当前编辑的行
    currentRow() {
      return this.options?.row
    },
    // 审批单号
    approvalNo() {
      return this.constant.generateNo
    },
    // 发起组织List
    startOrgList() {
      return this.constant.userOrganization.map(i => {
        return {
          code: i.id,
          name: i.orgName
        }
      })
    },
    // 生效状态
    statusList() {
      return this.constant.EffectiveState
    },
    // 合同类别
    categoryList() {
      return this.constant.ContractCategory
    },
    // 收支类型
    collectTypeList() {
      return this.constant.BalanceType
    },
    // 合同状态
    contractStatusList() {
      return this.constant.contractState
    },
    // 支付方式
    SubSubTypeEnumList() {
      return this.constant.PaymentMode
    },
    // 经办组织 orgList
    handleOrgList() {
      return this.constant.orgList
    },
    // 经办人List
    handleManList() {
      return this.constant?.orgPersonList.map(i => ({ code: i.id, name: i.name }))
    }
  },
  created() {
    if (!this.isAdd) { this.loading = true }
    const fetchList = [this.initDictionaries]
    if (this.isEdit || this.isDetail) {
      fetchList.push(this.fetchdetail)
    } else if (this.isDetailVersion) {
      fetchList.push(this.fetchVersionDetail)
    }
    Promise.all(fetchList.map(func => (func()))).then(async(res) => {
      this.ruleForm.approvalNo = this.approvalNo
      this.ruleForm.startOrgId = getSessionStorage('rootOrgId')
      this.ruleForm.effectiveState = '01'
      this.ruleForm.category = '01'
      if (!this.isAdd) {
        const responseData = res[1]
        await this.returnFormData(responseData)
        this.returnFileList()
        this.loading = false
      }
    })
  },
  methods: {
    ...mapActions(['getConstant']),
    handlerChange(val) {
      const row = this.formUpdateContext(val)
      this.getChangeUploadContext(row, 'content')
    },
    async returnFileList() {
      const array = ['contract', 'settlementBook']
      const { approvalNo } = this.ruleForm
      const data = await this.fetchFormFileList(array, approvalNo)
      this.contractList = data[0]
      this.settlementBookList = data[1]
      if (this.isEdit) {
        this.editGeneratorNo(this.ruleForm.approvalStatus, 'subContarct')
      }
    },
    async initDictionaries() {
      const dictionariesList = [
        'generateNo', // 审批单号
        'EffectiveState', // 生效状态
        'ContractCategory', // 合同类别
        'userOrganization', // 发起组织
        'contractState', // 合同状态
        'BalanceType', // 收支类型
        'PaymentMode', // 分包方式 等待后台整合
        // 'cooperatunitsList', // 分包公司
        // {
        //   type: 'orgPersonList',
        //   params: getSessionStorage('orgId')
        // }, // 经办人
        {
          type: 'orgList',
          params: {
            parentPath: getSessionStorage('orgId'),
            del: '0',
            state: 'ok'
          }
        }] // 经办组织
      await this.getConstant(dictionariesList)
    },
    // 回填数据
    async returnFormData(data) {
      await this.formatterResponseConent(data, 'contract')
      // 存储分包公司字段 key覆盖签订单位
      sessionStorage.setItem('constructionUnit', this.ruleForm.cooperateUnitId)
      // 暂时放入sessionStorage
      sessionStorage.setItem('contactFormData', JSON.stringify({
        handlingPersonId: this.ruleForm.handlingPersonId,
        handlingOrgId: this.ruleForm.handlingOrgId
      }))
    },
    async fetchdetail() {
      // 当前合同ID
      const { data: data } = await subContractDetails(this.currentRow.id)
      return data
    },
    async fetchVersionDetail() {
      const { data: data } = await sonContractVersionDetails(this.currentRow.id, this.currentRow.revisionNumber)
      return data
    },
    getPlaceHolder(title, type = 0) {
      const typeMap = ['请输入', '请选择']
      return `${typeMap[type]}${title}`
    },
    onBack() {
      this.$emit('changeState', 'subMain')
    },
    onSave() {
      this.$refs['ruleForm'].validate(boolean => {
        if (boolean) {
          this.saveFormData('save')
        }
      })
    },
    onSubmit() {
      this.$refs['ruleForm'].validate(boolean => {
        if (boolean) {
          this.saveFormData('submit')
        }
      })
    },
    getParams() {
      const params = {
        ...this.ruleForm,
        contractId: this.contractId,
        subType: '04',
        Loading: true
        // 不用刻意增加Id了 修改时候详情已经返回了Id
      }
      params['handlingOrgId'] = params['handlingOrgId'].toString()
      if (this.isEdit) {
        params['subModificationRecordDTO'] = this.formatterRequestConent()
      }
      return params
    },
    async saveFormData(category) {
      const params = this.getParams()
      const type = category === 'save' ? 0 : 1
      const pageType = this.isAdd ? 'add' : 'edit'
      const methods = {
        'add': subContractSave,
        'edit': subContractEdit
      }
      await methods[pageType](params, type)
      this.onCancel()
    },
    onCancel() {
      this.$emit('changeState', 'subMainList')
    }
  }
}
</script>

<style lang="less" scoped>
.sub-contract {
  .top {
    display: flex;
    padding: 10px 0;
    height: 32px;
    line-height: 32px;
    .extend-name {
      flex: 1;
      text-align: center;
    }
  }
  .container {
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
  }
  .btn {
    width: 100%;
    text-align: center;
    padding-top:30px;
  }
}
</style>
<style lang="less">
.sub-contract {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-cascader  {
    width: 100%;
  }
}
</style>
