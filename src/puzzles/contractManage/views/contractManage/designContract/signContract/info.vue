<template>
  <div class="sign-contract-extend-info">
    <div v-if="!isNew && options.type !== 'details'" class="top">
      <el-button
        v-if="!isEdit"
        class="back-btn"
        @click="onBack"
      ><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      <!-- 新增不存再名称显示 -->
      <div class="extend-name">{{ options.name }}</div>
    </div>
    <div class="container">
      <el-form
        ref="ruleForm"
        v-loading="loading"
        :model="ruleForm"
        :rules="rules"
        label-width="130px"
        class="constrack-ruleForm"
      >
        <el-form-item label="审批单号" prop="approvalNo">
          <el-input
            v-model="ruleForm.approvalNo"
            :disabled="true"
            :maxlength="18"
            placeholder="请输入审批单号"
          />
        </el-form-item>

        <el-form-item label="发起组织" prop="startOrgId">
          <el-select
            v-model="ruleForm.startOrgId"
            clearable
            :disabled="isLook || isExtendLook"
            placeholder="请选择发起组织"
            @change="(val) => {handlerChange({type: 'select', formName: 'startOrgId', value: val, name: '发起组织', selectOptions: { code: 'code', name: 'name' },selectData:'startOrgIdList'})}"
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
            :disabled=" true ||isLook || isExtendLook"
            placeholder="请选择生效状态"
            @change="(val) => {handlerChange({type: 'select', formName: 'effectiveState', value: val, name: '生效状态',
                                              selectOptions:{ code:'code',name:'name' },selectData:'statusList'})}"
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
            v-model="ruleForm.contractNumber"
            :maxlength="20"
            :disabled="isLook || isExtendLook"
            placeholder="请输入协议编号"
            clearable
            @change="(val) => {handlerChange({type: 'input', formName: 'contractNumber', value: val, name: '协议编号'})}"
          />
        </el-form-item>

        <el-form-item label="协议名称" prop="name" class="residue-row">
          <el-input
            v-model="ruleForm.name"
            :maxlength="100"
            :disabled="isLook || isExtendLook"
            placeholder="请输入协议名称"
            clearable
            @change="(val) => {handlerChange({type: 'input', formName: 'name', value: val, name: '协议名称'})}"
          />

        </el-form-item>
        <el-form-item label="协议金额" prop="amount">
          <amount-input
            v-model.trim="ruleForm.amount"
            :disabled="isLook || isExtendLook"
            placeholder="请输入协议金额"
            @blur="amountInputBlur('amount')"
            @change="(val) => {handlerChange({type: 'input', formName: 'amount', value: val, name: '协议金额',selectOptions:{ suf:'元' }})}"
          >
            <template slot="append">元</template>
          </amount-input>
        </el-form-item>
        <el-form-item label="协议状态" prop="state">
          <el-select
            v-model="ruleForm.state"
            clearable
            :disabled="isLook || isExtendLook"
            placeholder="请选择协议状态"
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
        >
          <el-date-picker
            v-model="ruleForm.filingDate"
            type="date"
            placeholder="请选择归档日期"
            :disabled="disabledSignDate|| isLook || isExtendLook "
            clearable
            @change="(val) => {handlerChange({type: 'date', formName: 'filingDate', value: val, name: '归档日期'})}"
          />
        </el-form-item>

        <el-form-item label="建设单位" prop="buildCompany">
          <el-input
            v-model="ruleForm.buildCompany"
            clearable
            placeholder="请输入建设单位"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input
            v-model="ruleForm.contactPersonName"
            :maxlength="20"
            placeholder="请输入联系人"
            clearable
            :disabled="isLook || isExtendLook"
            @change="(val) => {handlerChange({type: 'input', formName: 'contactPersonName', value: val, name: '联系人'})}"
          />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactTelephone">
          <el-input
            v-model="ruleForm.contactTelephone"
            clearable
            :disabled="isLook || isExtendLook"
            placeholder="请输入联系电话"
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

        <el-form-item label="签订地点">
          <el-input
            v-model="ruleForm.signingAddress"
            placeholder="请输入签订地点"
            :maxlength="50"
            :disabled="isLook || isExtendLook"
            clearable
            @change="(val) => {handlerChange({type: 'input', formName: 'signingAddress', value: val, name: '签订地点'})}"
          />
        </el-form-item>
        <el-form-item label="结构类型">
          <el-select
            v-model="ruleForm.structureType"
            clearable
            :disabled="isLook || isExtendLook"
            placeholder="请选择结构类型"
            @change="(val) => {handlerChange({type: 'select', formName: 'structureType', selectOptions: { code: 'code', name: 'name' },value: val, name: '结构类型',
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

        <el-form-item label="开工日期" prop="startDate">
          <el-date-picker
            v-model="ruleForm.startDate"
            type="date"
            :disabled="isLook || isExtendLook"
            placeholder="请输入开工日期"
            clearable
            @change="(val) => { handleUpdateStartDate(val,true)}"
          />
        </el-form-item>

        <el-form-item label="竣工日期" prop="finishDate">
          <el-date-picker
            v-model="ruleForm.finishDate"
            :disabled="isLook || isExtendLook"
            type="date"
            placeholder="请输入竣工日期"
            clearable
            @change="(val) => { handleUpdateEndDate(val,true)}"
          />
        </el-form-item>

        <el-form-item label="绝对工期" class="residue-row" prop="absolutePeriod">
          <el-input
            v-model.trim="ruleForm.absolutePeriod"
            class="half"
            :disabled="isLook || isExtendLook"
            placeholder="请输入绝对工期"
            :maxlength="4"
            clearable
            @change="(val) => {handlerChange({type: 'input', formName: 'absolutePeriod',selectOptions:{ suf:'天' },value: val, name: '绝对工期'})}"
          >
            <template slot="append">天</template>
          </el-input>
        </el-form-item>

        <el-form-item label="协议" class="fill-in-row">
          <el-upload
            :file-list="contractList"
            :action="actionUrl"
            :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'contractList', {name: '协议', record: true,formName:'content' })}"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'contractList', {name: '协议', record: true, formName: 'content' })}"
            :before-upload="beforeUpload50M"
            :disabled="isLook || isExtendLook"
            :on-error="fileError"
            :on-progress="uploadProgress"
            :on-preview="previewFile"
          >
            <el-button type="primary" :disabled="isLook || isExtendLook" @click="uploadBusinessId(ruleForm.approvalNo,'agree')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="备注" class="fill-in-row row-label">
          <el-input
            v-model="ruleForm.remark"
            type="textarea"
            :disabled="isLook || isExtendLook"
            :maxlength="255"
            placeholder="请输入备注"
            :rows="3"
            clearable
            @change="(val) => {handlerChange({type: 'input', formName: 'remark', value: val, name: '备注'})}"
          />
        </el-form-item>
        <el-form-item label="经办组织" prop="handlingOrgId">
          <el-cascader
            v-model="ruleForm.handlingOrgId"
            clearable
            :disabled="isLook || isExtendLook"
            filterable
            placeholder="请选择经办组织"
            :options="handleOrgList"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'orgName', children: 'children',checkStrictly: true }"
            @change="(val) => fetchHandlingOrgPersonId(val)"
          />
        </el-form-item>
        <el-form-item label="经办日期" prop="handlingDate">
          <el-date-picker
            v-model="ruleForm.handlingDate"
            type="date"
            :disabled="isLook || isExtendLook"
            placeholder="请选择经办日期"
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

        <!-- 新增不存在 -->
        <template v-if="!isNew">
          <el-form-item label="录入人">
            <el-input v-model="ruleForm.createUserName" :disabled="true" />
          </el-form-item>

          <el-form-item label="录入时间">
            <el-date-picker
              v-model.trim="ruleForm.createDate"
              :disabled="true"
              type="datetime"
              clearable
            />
          </el-form-item>

          <template v-if="isEdit && isShowContent && !isContractEntry && !isSettlementBookList">
            <el-form-item label="修改原因" prop="reason">
              <el-input v-model="ruleForm.reason" placeholder="请输入修改原因" :disabled="isLook" />
            </el-form-item>

            <el-form-item label="修改内容" class="fill-in-row">
              <update-context :update-data="ruleForm.content" />
            </el-form-item>
          </template>

        </template>
        <template v-if="(isExtendLook || (isEdit && isShowContent) || isContractRevise) && !isSettlementBookList">
          <!-- 当前版本修改记录 -->
          <el-form-item class="fill-in-row" label="修改记录">
            <history-record :is-current="true" :data="currentContent" />
          </el-form-item>
          <!-- 历史修改记录 -->
          <el-form-item class="fill-in-row">
            <history-record v-if="!disabled && isShowHistory" :data="content" />
          </el-form-item>
        </template>

        <template v-if="isNew || isExtendLook">
          <el-form-item class="fill-in-row" :label="processLabel">
            <flow-chart :id="processId" :is-new="isNew" :label.sync="processLabel" />
          </el-form-item>
        </template>

        <el-form-item v-if="!isLook && !isExtendLook && disabled" class="fill-in-row">
          <div class="btn">
            <el-button type="primary" @click="onSave">保存</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button class="cancel-btn" @click="onCancel">取消</el-button>
          </div>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import { validateLength, validateOnlyCode, toDecimal, validateDecimal, validateLandline, validatePriceZero } from '@core/utils/validate'
import { supplytSave, supplyUpdate, getSupplyDetails, getSupplyVersionDetails, validateUniqueSupply
} from '@core/api/contractManage/contractmanager'
import { getSessionStorage } from '@core/utils/auth'
import { mapActions, mapGetters } from 'vuex'
import UpdateContext from '@framesDash/components/UpdateContext'
import formatUpload from '../../../mixins/upload'
import formatterConent from '../../../mixins/formatterContent'
import dateMixins from '../../../mixins/date'
import editGeneratorNo from '../../../mixins/editGeneratorNo'
export default {
  name: 'SignInfo',
  components: {
    UpdateContext,
    flowChart: () => import('../../../components/FlowChart'),
    HistoryRecord: () => import('../../../components/HistoryRecord')
  },
  mixins: [formatUpload, formatterConent, dateMixins, editGeneratorNo],
  props: {
    // 当前行信息
    options: {
      type: Object,
      default: () => {}
    },
    // 新增/修改/查看
    infoType: {
      type: String,
      default: 'add'
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const validateBuildArea = (rule, value, callback) => {
      if (!validateDecimal(value) && value !== '') {
        callback(new Error('只能输入大于0的数(允许两位小数)'))
      } else {
        callback()
      }
    }
    return {
      processLabel: '',
      loading: false,
      contractList: [],
      deepContractList: [],
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
        buildCompany: '', // 建设单位
        contactPersonName: '', // 联系人
        contactTelephone: '', // 联系电话
        signDate: '', // 签订日期
        signingAddress: '', // 签订地点
        structureType: '', // 结构类型
        buildArea: '', // 建筑面积
        startDate: '', // 开工日期
        finishDate: '', // 竣工日期
        absolutePeriod: '', // 绝对工期
        remark: '', // 备注
        handlingOrgId: '', // 经办组织
        handlingDate: '', // 经办日期
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
        absolutePeriod: [
          { validator: this.validateAbsolutePeriodFunc(), trigger: 'blur' }
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
        effectiveState: [
          { required: true, message: '请选择生效状态', trigger: 'change' }
        ],
        contractNumber: [
          { required: true, message: '请输入协议编号', trigger: 'blur' },
          { required: true, validator: (rule, value, callback) => { validateOnlyCode(rule, value, callback, validateUniqueSupply({ contractNumber: value, id: this.isNew ? undefined : this.currentId }), '04') }, trigger: 'blur' },
          validateLength(0, 20)
        ],
        buildArea: [
          {
            validator: validateBuildArea, trigger: 'blur'
          },
          validateLength(0, 20)

        ],
        contactTelephone: [
          {
            validator: this.validPhoneorMob(),
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '请输入协议名称', trigger: 'blur' },
          validateLength(0, 100)
        ],
        amount: [
          { required: true, message: '请输入协议金额', trigger: 'blur' },
          { validator: this.validtorZeroMon, trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择协议状态', trigger: 'change' }
        ],
        signDate: [
          { required: true, message: '请选择签订日期', trigger: 'change' }
        ],
        handlingOrgId: [
          { required: true, message: '请选择经办组织', trigger: 'blur' }
        ],
        handlingDate: [
          { required: true, message: '请选择经办日期', trigger: 'blur' }
        ],
        handlingPersonId: [
          { required: true, message: '请选择经办人', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    disabledSignDate() {
      // 未回 无合同 不可编辑
      return this.ruleForm.state === '01' || this.ruleForm.state === '03' || !this.ruleForm.state
    },
    constructionUnit() {
      return sessionStorage.getItem('constructionUnit')
    },
    processId() {
      if (this.isNew) {
        return this.ruleForm.startOrgId
      } else {
        return this.ruleForm.approvalProcessId
      }
    },
    // 当前协议归属合同Id
    contractId() {
      return this.$route.query.id
    },
    isNew() {
      return this.infoType === 'add'
    },
    isEdit() {
      return this.options?.type ? this.options.type === 'edit' : this.infoType === 'edit'
    },
    // 点击列表查看进入
    isLook() {
      return this.options?.type ? this.options.type !== 'edit' : this.infoType === 'detail'
    },
    // 点击版本查看列表进入
    isExtendLook() {
      return this.infoType === 'versionLook'
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
      return this.constant?.orgPersonList.map(i => ({ code: i.id, name: i.name }))
    },
    // 经办组织 orgList
    handleOrgList() {
      return this.constant.orgList
    },
    // 当前行(补充协议ID)
    currentId() {
      return Object.prototype.hasOwnProperty.call(this.options, 'row') ? this.options.row.id : this.options?.id
    },
    // 版本查看详情 列表当前行具体版本号
    versionNumber() {
      return this.options?.revisionNumber
    }
  },
  created() {
    const fetchList = [this.initPublicDictionaries]
    if (!this.isNew) { this.loading = true } else {
      // 新建初始化经办人 经办组织
      this.initDefaultFiled()
    }
    if (this.isEdit || this.isLook) {
      fetchList.push(this.fetchEditData)
    } else if (this.isExtendLook) {
      fetchList.push(this.fetchVersionData)
    }
    Promise.all(fetchList.map(func => (func()))).then(async(res) => {
      if (!this.isNew) {
        const responseData = res[1]
        // 回填数据
        await this.returnFormData(responseData)
        // 处理文件回填上传
        this.returnFileList(responseData)
        this.loading = false
      } else {
        this.ruleForm.startOrgId = getSessionStorage('rootOrgId')
        this.ruleForm.effectiveState = '01'
        this.ruleForm.handlingDate = new Date()
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
    validPhoneorMob() {
      var funMob = (rule, value, callback) => {
        if (!validateLandline(value) && value !== '') {
          callback(new Error('请输入正确的手机号码或者座机'))
        } else {
          callback()
        }
      }
      return funMob
    },
    handlerStateChange(val) {
      this.ruleForm.filingDate = null
      this.handlerChange({ type: 'select', formName: 'state', selectData: 'statusList', selectOptions: { code: 'code', name: 'name' }, value: val, name: '协议状态' })
    },
    amountInputBlur(key) {
      if (this.ruleForm[key]) {
        this.ruleForm[key] = toDecimal(this.ruleForm[key], 2)
      }
    },
    // 回填经办人经办组织
    async initDefaultFiled() {
      const { handlingPersonId = '', handlingOrgId = '' } = JSON.parse(getSessionStorage('contactFormData'))
      await this.fetchHandlingOrgPersonId(handlingOrgId, false)
      this.ruleForm.handlingPersonId = handlingPersonId
      this.ruleForm.handlingOrgId = handlingOrgId
    },
    handlerChange(val) {
      const row = this.formUpdateContext(val)
      this.getChangeUploadContext(row, 'content')
    },
    // 请求编辑查看接口
    async fetchEditData() {
      const data = await getSupplyDetails(this.currentId)
      return data
    },
    // 请求查看接口this.versionNumber
    async fetchVersionData() {
      // 第一 处理date 第二需要的是版本号
      const data = await getSupplyVersionDetails(this.currentId, this.versionNumber)
      return data
    },
    // 回填文件列表
    async returnFileList(responseData) {
      // const { data: { approvalNo }} = responseData
      const approvalNo = this.ruleForm.approvalNo
      const array = ['agree']
      const data = await this.fetchFormFileList(array, approvalNo)
      this.contractList = data[0]
      this.deepContractList = data[0]
      if (this.isEdit) {
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
    // 回填数据
    async returnFormData(responseData) {
      // if (this.isExtendLook) {
      await this.returnVersionData(responseData)
      // } else {
      // this.returnLookData(responseData)
      // }
    },
    // 请求数据字典
    initPublicDictionaries() {
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
      })
    },
    // 保存
    onSave() {
      // 保存合同
      this.$refs['ruleForm'].validate(boolean => {
        if (boolean) {
          this.fetchFormData('save')
        }
      })
    },
    // 提交
    onSubmit() {
      // 提交合同
      this.$refs['ruleForm'].validate(boolean => {
        if (boolean) {
          this.fetchFormData('submit')
        }
      })
    },
    formatParams(params) {
      params['Loading'] = true
      // 补充协议挂载合同Id  设计合同中补充协议contractId直接用query取
      params['contractId'] = this.contractId
      // 01 内部合同 02主合同
      params['mainType'] = '01'
      // 如果当前是修改 还需传递一个Id 代表补充协议Id
      if (this.isEdit) {
        // params['id'] = this.currentId
        console.log('编辑查看')
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
    // 取消
    onCancel() {
      this.$emit('onBack')
    },
    onBack() {
      this.$emit('onBack')
    }
  }
}
</script>

<style lang="less" scoped>
.sign-contract-extend-info {
  // height: calc(100vh - 220px);
  // overflow: auto;
  .top {
    padding: 10px;
    display: flex;
    .extend-name {
      line-height: 32px;
      text-align: center;
      flex: 1;
    }
  }
  .constrack-ruleForm {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 33.33%;
      .el-select {
        width: 100%;
      }
    }
    .residue-row {
      width: 66.6%;
      .half {
        width: calc(50% - 65px);
      }
    }
    .fill-in-row {
      width: 100%;
    }
    .flow {
      .el-form-item__content {
        margin-left: 0;
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
.sign-contract-extend-info {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
}
</style>
