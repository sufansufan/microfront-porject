<template>
  <div class="enginner-contract-extend-info">
    <!-- 非新增显示top -->
    <div v-if="!isNew && (options && !options.type)" class="top">
      <el-button
        v-if="isLook || isExtendLook"
        class="back-btn"
        @click="onBack"
      ><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      <div class="extend-name">{{ options.name }}</div>
    </div>

    <div class="container">
      <el-form
        ref="ruleForm"
        v-loading="loading"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="constrack-ruleForm"
      >
        <el-form-item label="审批单号" prop="approvalNo">
          <el-input v-model.trim="ruleForm.approvalNo" :maxlength="18" clearable :disabled="true" placeholder="请输入审批单号" />
        </el-form-item>

        <el-form-item label="发起组织">
          <el-select
            v-model="ruleForm.startOrgId"
            clearable
            :disabled="isLook || isExtendLook"
            placeholder="请输入发起组织"
            @change="(val) => {handlerChange({type: 'select', formName: 'startOrgId', value: val, name: '发起组织',
                                              selectOptions:{ code:'code',name:'name' },selectData:'startOrgIdList'})}"
          >
            <el-option
              v-for="item in startOrgIdList"
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
            placeholder="请输入生效状态"
            @change="(val) => {handlerChange({type: 'select', formName: 'effectiveState', value: val, name: '生效状态',
                                              selectOptions:{ code:'code',name:'name' },selectData:'effectiveStateList'})}"
          >
            <el-option
              v-for="item in effectiveStateList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="协议编号" prop="contractNumber">
          <el-input
            v-model.trim="ruleForm.contractNumber"
            placeholder="请输入协议编号"
            :maxlength="20"
            :disabled="isLook || isExtendLook"
            clearable
            @change="(val) => {handlerChange({type: 'input', formName: 'contractNumber', value: val, name: '协议编号'})}"
          />
        </el-form-item>

        <el-form-item label="协议名称" prop="name" class="residue-row">
          <el-input
            v-model.trim="ruleForm.name"
            placeholder="请输入协议名称"
            :maxlength="100"
            :disabled="isLook || isExtendLook"
            clearable
            @change="(val) => {handlerChange({type: 'input', formName: 'name', value: val, name: '协议名称'})}"
          />
        </el-form-item>

        <el-form-item label="协议金额" prop="amount">
          <amount-input
            v-model="ruleForm.amount"
            :disabled="isLook || isExtendLook"
            placeholder="请输入协议金额"
            unit-name="元"
            @blur="amountInputBlur('amount')"
            @change="(val) => {handlerChange({type: 'input', formName: 'amount', value: val, name: '协议金额',selectOptions:{ suf:'元' }})}"
          >
            <template slot="append">元</template>
          </amount-input>
        </el-form-item>
        <el-form-item label="协议状态" prop="state">
          <el-select
            v-model="ruleForm.state"
            placeholder="请选择协议状态"
            clearable
            :disabled="isLook || isExtendLook"
            @change="handlerStateChange"
          >
            <el-option
              v-for="item in statusList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="归档日期"
          :rules="[
            { required: ruleForm.state === '02', message: '请选择归档日期', trigger: 'change' }
          ]"
          prop="filingDate"
        >
          <el-date-picker
            v-model="ruleForm.filingDate"
            type="date"
            :disabled="isLook || isExtendLook || disabledSignDate"
            placeholder="请选择归档日期"
            clearable
            @change="(val) => {handlerChange({type: 'date', formName: 'filingDate', value: val, name: '归档日期'})}"
          />
        </el-form-item>

        <el-form-item label="建设单位" prop="buildCompany">
          <el-input
            v-model="constructionUnit"
            placeholder="请输入建设单位"
            clearable
            :maxlength="20"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input
            v-model.trim="ruleForm.contactPersonName"
            :maxlength="20"
            clearable
            :disabled="isLook || isExtendLook"
            placeholder="请输入联系人"
            @change="(val) => {handlerChange({type: 'input', formName: 'contactPersonName', value: val, name: '联系人'})}"
          />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactTelephone">
          <el-input
            v-model.trim="ruleForm.contactTelephone"
            placeholder="请输入联系电话"
            clearable
            :disabled="isLook || isExtendLook"
            @change="(val) => {handlerChange({type: 'input', formName: 'contactTelephone', value: val, name: '请输入联系电话'})}"
          />
        </el-form-item>
        <el-form-item label="签订日期" prop="signDate">
          <el-date-picker
            v-model="ruleForm.signDate"
            type="date"
            placeholder="请选择签订日期"
            :disabled="isLook || isExtendLook"
            clearable
            @change="(val) => {handlerChange({type: 'date', formName: 'signDate', value: val, name: '签订日期'})}"
          />
        </el-form-item>

        <el-form-item label="签订地点" prop="signingAddress">
          <el-input
            v-model.trim="ruleForm.signingAddress"
            placeholder="请输入签订地点"
            :maxlength="50"
            clearable
            :disabled="isLook || isExtendLook"
            @change="(val) => {handlerChange({type: 'input', formName: 'signingAddress', value: val, name: '签订地点'})}"
          />
        </el-form-item>
        <el-form-item label="结构类型">
          <el-select
            v-model="ruleForm.structureType"
            clearable
            :disabled="isLook || isExtendLook"
            placeholder="请选择结构类型"
            @change="(val) => {handlerChange({type: 'select', formName: 'structureType', value: val, name: '结构类型',
                                              selectOptions: {code: 'code', name: 'name'},
                                              selectData:'structureTypeList'})}"
          >
            <el-option
              v-for="item in structureTypeList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="建筑面积" prop="buildArea">
          <el-input
            v-model.trim="ruleForm.buildArea"
            :disabled="isLook || isExtendLook"
            clearable
            :maxlength="4"
            placeholder="请输入建筑面积"
            @change="(val) => {handlerChange({type: 'input', formName: 'buildArea', value: val, name: '建筑面积',selectOptions:{ suf:'m²' }})}"
          >
            <template slot="append">m²</template>
          </el-input>
        </el-form-item>
        <el-form-item label="绝对工期" class="residue-row" prop="absolutePeriod">
          <el-input
            v-model="ruleForm.absolutePeriod"
            placeholder="请输入绝对工期"
            class="half"
            :maxlength="4"
            clearable
            :disabled="isLook || isExtendLook"
            @change="(val) => {handlerChange({type: 'input', formName: 'absolutePeriod', value: val, name: '绝对工期',selectOptions:{suf:'天'}})}"
          >
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="协议概况" class="fill-in-row row-label">
          <el-input
            v-model.trim="ruleForm.jobContent"
            placeholder="请输入协议概况"
            type="textarea"
            :rows="3"
            :disabled="isLook || isExtendLook"
            :maxlength="255"
            clearable
            @change="(val) => {handlerChange({type: 'input', formName: 'jobContent', value: val, name: '协议概况'})}"
          />
        </el-form-item>
        <el-form-item label="协议范围" class="fill-in-row row-label">
          <el-input
            v-model.trim="ruleForm.subScope"
            type="textarea"
            placeholder="请输入协议范围"
            :rows="3"
            :maxlength="255"
            :disabled="isLook || isExtendLook"
            clearable
            @change="(val) => {handlerChange({type: 'input', formName: 'subScope', value: val, name: '协议范围'})}"
          />
        </el-form-item>

        <el-form-item label="协议" class="fill-in-row">
          <el-upload
            :file-list="contractList"
            :action="actionUrl"
            :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'contractList', {name: '协议',formName:'content', record: true })}"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'contractList', {name: '协议', record: true, formName: 'content' })}"
            :before-upload="beforeUpload50M"
            :disabled="isLook || isExtendLook"
            :on-error="fileError"
            :on-progress="uploadProgress"
            :on-preview="previewFile"
          >
            <el-button type="primary" :disabled="isLook || isExtendLook" @click="handleUploadEngFile('agree')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" class="fill-in-row row-label">
          <el-input
            v-model="ruleForm.remark"
            type="textarea"
            placeholder="请输入备注"
            :rows="3"
            :disabled="isLook || isExtendLook"
            :maxlength="255"
            clearable
            @change="(val) => {handlerChange({type: 'input', formName: 'remark', value: val, name: '备注'})}"
          />
        </el-form-item>
        <el-form-item label="经办组织" prop="handlingOrgId">
          <el-cascader
            v-model="ruleForm.handlingOrgId"
            placeholder="请选择经办组织"
            clearable
            :disabled="isLook || isExtendLook"
            filterable
            :options="handleOrgList"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'orgName', children: 'children',checkStrictly: true }"
            @change="(val) => { fetchHandlingOrgPersonId(val) }"
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
            placeholder="请选择经办日期"
            :disabled="isLook || isExtendLook"
            clearable
            @change="(val) => {handlerChange({type: 'date', formName: 'handlingDate', value: val, name: '经办日期'})}"
          />
        </el-form-item>
        <el-form-item label="经办人" prop="handlingPersonId">
          <el-select
            v-model="ruleForm.handlingPersonId"
            clearable
            :disabled="isLook || isExtendLook || ruleForm.handlingOrgId.length === 0"
            placeholder="请选择经办人"
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

        <!-- 新增不展示  修改 查看 版本查看都展示 -->
        <template v-if="!isNew">
          <el-form-item label="录入人">
            <el-input v-model="ruleForm.createUserName" clearable :disabled="true" />
          </el-form-item>

          <el-form-item label="录入时间">
            <el-date-picker
              v-model="ruleForm.createDate"
              type="datetime"
              :disabled="true"
              placeholder="请选择录入时间"
              clearable
            />
          </el-form-item>

          <template v-if="isEdit && isShowContent && !isContractEntry && !isSettlementBookList">
            <el-form-item label="修改原因" prop="reason">
              <el-input
                v-model="ruleForm.reason"
                :maxlength="20"
                clearable
              />
            </el-form-item>
            <el-form-item label="修改内容" class="fill-in-row">
              <update-context :update-data="ruleForm.content" />
            </el-form-item>
          </template>
        </template>
        <template v-if="(isExtendLook || (isEdit && isShowContent) || isContractRevise) && !isSettlementBookList">
          <el-form-item label="修改记录" class="fill-in-row">
            <history-record :is-current="true" :data="currentContent" />
          </el-form-item>
          <el-form-item class="fill-in-row">
            <history-record v-if="!disabled && isShowHistory" :data="content" />
          </el-form-item>
        </template>
        <template v-if="isNew || isExtendLook">
          <el-form-item class="fill-in-row" :label="processLabel">
            <flow-chart :id="processId" :is-new="isNew" :label.sync="processLabel" />
          </el-form-item>
        </template>

      </el-form>
      <!-- 补充协议跳进来的时候显示 -->

      <!-- 查看不展示 版本查看进入也不显示 -->
      <div v-if="!isLook && !isExtendLook && disabled" class="btn">
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button class="cancel-btn" @click="onCancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { validateLength, validateOnlyCode, validateLandline, validateInteger, toDecimal, validateDecimal, validatePriceZero } from '@core/utils/validate'
import { supplytSave, supplyUpdate, getSupplyDetails, getSupplyVersionDetails, validateUniqueSupply
} from '@core/api/contractManage/contractmanager'
import upload from '@core/mixins/upload'
import { getSessionStorage } from '@core/utils/auth'
import { mapActions, mapGetters } from 'vuex'
import formUpdateContext from '@core/mixins/formUpdateContext'
import UpdateContext from '@framesDash/components/UpdateContext'
import formatterConent from '../../../mixins/formatterContent'
import editGeneratorNo from '../../../mixins/editGeneratorNo'

export default {
  name: 'EnginnerExtendInfo',
  components: {
    flowChart: () => import('../../../components/FlowChart'),
    HistoryRecord: () => import('../../../components/HistoryRecord'),
    UpdateContext
  },
  mixins: [upload, formUpdateContext, formatterConent, editGeneratorNo],
  props: {
    options: {
      type: Object,
      default: () => null
    },
    // 新增/修改/查看
    infoType: {
      type: String,
      default: 'add'
    },
    breezeInfo: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const validPhone = (rule, value, callback) => {
      if (!validateLandline(value) && value !== '') {
        callback(new Error('请输入正确的手机号码或者座机'))
      } else {
        callback()
      }
    }
    const validateContractInteger = (rule, value, callback) => {
      if (!value || validateInteger(value)) {
        callback()
      } else {
        callback(new Error('只能输入大于0的整数'))
      }
    }
    const validateArea = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('建筑面积不能为空'))
      } else {
        if (!validateDecimal(value)) {
          callback(new Error('只能输入大于0的数(允许两位小数)'))
        } else {
          callback()
        }
      }
    }
    return {
      processLabel: '',
      loading: false,
      deepRuleForm: {},
      ruleForm: {
        approvalNo: '', // 审批单号
        startOrgId: '', // 发起组织
        effectiveState: '', // 生效状态
        contractNumber: '', // 协议编号
        name: '', // 协议名称
        amount: '', // 协议金额
        state: '', // 协议状态
        filingDate: '', // 归档日期
        buildCompany: '', // 建设单位 后台不用
        // sessionStorage.getItem("key");
        contactPersonName: '', // 联系人
        contactTelephone: '', // 联系电话
        signDate: '', // 签订日期
        signingAddress: '', // 签订地点
        structureType: '', // 结构类型
        buildArea: '', // 建筑面积
        absolutePeriod: '', // 绝对工期
        jobContent: '', // 协议概况
        subScope: '', // 协议范围
        remark: '', // 备注
        handlingOrgId: '', // 经办组织
        handlingDate: '', // 经办日期
        handlingPersonId: '', // 经办人
        reason: '', // 修改原因
        content: [], // 修改内容
        createUserName: '', // 录入人
        createDate: '' // 录入时间
      },
      contractList: [],
      deepContractList: [],
      rules: {
        absolutePeriod: [
          { validator: validateContractInteger, trigger: 'blur' }
        ],
        contactTelephone: [
          { validator: validPhone, trigger: 'blur' }
        ],
        signingAddress: [
          validateLength(0, 50)
        ],
        approvalNo: [
          { required: true, message: '请输入审批单号', trigger: 'blur' },
          validateLength(0, 18)
        ],
        startOrgId: [
          { required: true, message: '请选择发起组织', trigger: 'change' }
        ],
        contractNumber: [
          { required: true, message: '请输入协议编号', trigger: 'blur' },
          { required: true, validator: (rule, value, callback) => { validateOnlyCode(rule, value, callback, validateUniqueSupply({ contractNumber: value, id: this.isNew ? undefined : this.currentId }), '04') }, trigger: 'blur' },
          validateLength(0, 20)
        ],
        name: [
          { required: true, message: '请输入协议名称', trigger: 'blur' },
          validateLength(0, 100)
        ],
        amount: [
          { required: true, message: '请输入协议金额', trigger: 'blur' },
          { required: true, validator: this.validtorZeroMon, trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择协议状态', trigger: 'change' }
        ],
        handlingDate: [
          { required: true, message: '请选择经办日期', trigger: 'change' }
        ],
        buildArea: [
          { required: true, message: '请输入建筑面积', trigger: 'blur' },
          { validator: validateArea, trigger: 'blur' }

        ],
        handlingOrgId: [
          { required: true, message: '请选择经办组织', trigger: 'change' }
        ],
        signDate: [
          { required: true, message: '请选择签订日期', trigger: 'change' }
        ],
        handlingPersonId: [
          { required: true, message: '请选择经办人', trigger: 'change' }
        ],
        reason: [
          { required: true, message: '清输入修改原因', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['constant', 'tabComponentState', 'commonCommpany']),

    constructionUnit() {
      return sessionStorage.getItem('constructionUnit')
    },
    isNew() {
      return this.infoType === 'add'
    },
    processId() {
      if (this.isNew) {
        return this.ruleForm.startOrgId
      } else {
        return this.ruleForm.approvalProcessId
      }
    },
    isEdit() {
      return this.options?.type ? this.options.type === 'edit' : this.infoType === 'edit'
    },
    // 补充协议直接进入
    isLook() {
      return this.options?.type ? this.options.type !== 'edit' : this.infoType === 'detail'
    },
    // 版本查看进入查看
    isExtendLook() {
      return this.infoType === 'versionLook'
    },
    // 当前补充协议Id
    currentId() {
      return Object.prototype.hasOwnProperty.call(this.options, 'row') ? this.options.row.id : this.options?.id
    },
    // 当前版本号
    currentVersion() {
      return this.options?.revisionNumber
    },
    // 结构类型List
    structureTypeList() {
      return this.constant.StructureType
    },
    // 生效状态
    effectiveStateList() {
      return this.constant.EffectiveState
    },
    // 协议状态
    statusList() {
      return this.constant.contractState
    },
    // 发起组织List
    startOrgIdList() {
      return this.constant.userOrganization.map(i => {
        return {
          code: i.id,
          name: i.orgName
        }
      })
    },
    // 审批单号
    approvalNo() {
      return this.constant.generateNo
    },
    // 经办人List
    handleManList() {
      return this.constant?.orgPersonList?.map(i => ({ code: i.id, name: i.name }))
    },
    // 经办组织 orgList
    handleOrgList() {
      return this.constant.orgList
    },
    // 协议归属合同ID
    contractId() {
      return this.$route.query.id
    },
    disabledSignDate() {
      // 未回 无合同 不可编辑
      return this.ruleForm.state === '01' || this.ruleForm.state === '03' || !this.ruleForm.state
    }
  },
  created() {
    const fetchList = [this.initPublicDictionaries]
    if (!this.isNew) {
      this.loading = true
      if (this.isEdit || this.isLook) {
        fetchList.push(this.fetchEditData)
      } else if (this.isExtendLook) {
        fetchList.push(this.fetchVersionData)
      }
    } else {
      // 新建初始化经办人 经办组织
      this.initDefaultFiled()
    }
    Promise.all(fetchList.map(func => (func()))).then(async(res) => {
      if (!this.isNew) {
        const responseData = res[1]
        // 回填数据
        await this.returnFormData(responseData)
        // 处理文件上传回填
        this.returnFileList(responseData)
        this.loading = false
      }
    })
  },
  methods: {
    ...mapActions(['getConstant']),
    // 大于等于0
    validtorZeroMon(rule, value, callback) {
      if (!validatePriceZero(rule, value, callback)) {
        callback(new Error('只能输入大于等于0的金额'))
      } else {
        callback()
      }
    },
    amountInputBlur(key) {
      if (this.ruleForm[key]) {
        this.ruleForm[key] = toDecimal(this.ruleForm[key], 2)
      }
    },
    // 回填经办人经办组织
    async initDefaultFiled() {
      const { handlingPersonId = '', handlingOrgId = '' } = JSON.parse(getSessionStorage('contactFormData'))
      this.ruleForm.handlingOrgId = handlingOrgId
      // 请求资源
      await this.fetchHandlingOrgPersonId(handlingOrgId, false)
      this.ruleForm.handlingPersonId = handlingPersonId
    },
    // 协议状态改变
    handlerStateChange(val) {
      // 清空归档日期
      this.ruleForm.filingDate = null
      this.$refs.ruleForm.clearValidate('filingDate')
      this.handlerChange({ type: 'select', formName: 'state', selectData: 'statusList', selectOptions: { code: 'code', name: 'name' }, value: val, name: '协议状态' })
      this.handlerChange({ type: 'date', formName: 'filingDate', value: '', name: '归档日期' })
    },
    // 上传
    handleUploadEngFile(type) {
      this.uploadData.businessDataId = this.ruleForm.approvalNo
      this.uploadData.typeCode = type
    },
    handlerChange(val) {
      const row = this.formUpdateContext(val)
      this.getChangeUploadContext(row, 'content')
    },
    // 处理返回File
    async returnFileList(responseData) {
      const approvalNo = this.ruleForm.approvalNo
      this.uploadData.typeCode = 'agree'
      this.uploadData.businessDataId = approvalNo
      const data = await this.getFileLoad()
      this.contractList = data.map(item => {
        item.name = item.fileName
        item.url = item.fileUrl
        return item
      })
      this.deepContractList = data.map(item => {
        item.name = item.fileName
        item.url = item.fileUrl
        return item
      })
      if (this.isEdit) {
        // 如果是编辑 那么就审批
        this.editGeneratorNo(this.ruleForm.approvalStatus, 'supply')
      }
    },
    returnLookData(responseData) {
      let handlingOrgId = ''
      const { data } = responseData
      if (data.handlingOrgId) {
        // 必填项 一定要存在的
        handlingOrgId = data.handlingOrgId.split(',')
      }
      this.ruleForm = { ...data, handlingOrgId, content: [] }
      this.deepRuleForm = JSON.parse(JSON.stringify(data))
    },
    async returnVersionData(responseData) {
      const { data } = responseData
      await this.formatterResponseConent(data)
    },
    // 返回数据
    async returnFormData(responseData) {
      // if (this.isExtendLook) {
      // 详情查看
      await this.returnVersionData(responseData)
      // } else {
      // 普通查看
      // this.returnLookData(responseData)
      // }
    },
    // 补充协议直接查看
    async fetchEditData() {
      const data = await getSupplyDetails(this.currentId)
      return data
    },
    // 补充协议版本查看详情逻辑
    async fetchVersionData() {
      const data = await getSupplyVersionDetails(this.currentId, this.currentVersion)
      return data
    },
    // 初始化数据字典
    async initPublicDictionaries() {
      const dictionares = [
        'generateNo', // 审批单号
        'contractState', // 协议状态
        'EffectiveState', // 生效状态
        'StructureType', // 结构类型
        'userOrganization', // 发起组织
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
        }
      ]
      this.getConstant(dictionares).then(() => {
        this.ruleForm.approvalNo = this.approvalNo
        this.ruleForm.startOrgId = getSessionStorage('rootOrgId')
        this.ruleForm.effectiveState = '01'
        this.ruleForm.handlingDate = new Date()
      })
    },
    onBack() {
      this.$emit('onBack')
    },
    handleSuccess() {},
    beforeAvatarUpload() {},
    onSave() {
      this.$refs['ruleForm'].validate(boolean => {
        if (boolean) {
          this.fetchFormData('save')
        }
      })
    },
    onSubmit() {
      this.$refs['ruleForm'].validate(boolean => {
        if (boolean) {
          this.fetchFormData('submit')
        }
      })
    },
    formatParams(params) {
      params['Loading'] = true
      // 补充协议挂在合同Id
      params['contractId'] = this.contractId
      // 01主合同 02内部合同
      params['mainType'] = '01'
      // 处理编辑修改原因 修改内容参数
      if (this.isEdit) {
        params['subModificationRecord'] = this.formatterRequestConent()
      }

      params['handlingOrgId'] = params['handlingOrgId'].toString()
    },
    async fetchFormData(type) {
      const params = this.ruleForm
      this.formatParams(params)
      const map = {
        add: supplytSave,
        edit: supplyUpdate
      }
      // 保存/提交
      type = type === 'save' ? 0 : 1
      const methodsName = map[this.infoType]
      await methodsName(params, type)
      this.$emit('onBack')
    },
    onCancel() {
      this.$emit('onBack')
    }
  }
}
</script>

<style lang="less" scoped>
.enginner-contract-extend-info {
  .top {
    display: flex;
    height: 32px;
    line-height: 32px;
    margin: 10px;
    .extend-name {
      flex: 1;
      text-align: center;
    }
  }
  .container {
    .constrack-ruleForm {
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
          width: calc(50% - 50px);
        }
      }
    }
  }
  .btn {
    width: 200px;
    margin: 10px auto;
  }
}
</style>
<style lang="less">
.enginner-contract-extend-info {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-cascader{
    width: 100%;
  }
}
</style>
