<template>
  <div class="enginner-contract-extend-info">
    <div class="back-button">
      <div v-if="processOtions.btnStatus && disabled" class="top">
        <el-button class="back-btn" @click="onBack"> <i class="iconfont icon-fanhui-copy" /> 返回</el-button>
        <div v-if="!isNew" class="extend-name">{{ ruleForm.name }}</div>
      </div>

      <div class="container">
        <el-form
          ref="ruleForm"
          v-loading="loading"
          :model="ruleForm"
          :rules="rules"
          label-width="130px"
          class="constrack-form"
        >
          <el-form-item label="审批单号" :maxlength="18" prop="approvalNo">
            <el-input
              v-model="ruleForm.approvalNo"
              :disabled="true"
              placeholder="请输入审批单号"
              :clearable="false"
              @change="(val) => {handlerChange({type: 'input', formName: 'approvalNo', value: val, name: '审批单号'})}"
            />
          </el-form-item>

          <el-form-item label="发起组织" prop="startOrgId">
            <el-select
              v-model="ruleForm.startOrgId"
              :disabled="disabled || isDetail"
              placeholder="请选择发起组织"
              clearable
              @change="(val) => {handlerChange({type: 'select', formName: 'startOrgId', selectData: constant.userOrganization,selectOptions: {code: 'id', name: 'orgName'}, value: val, name: '发起组织'})}"
            >
              <el-option
                v-for="item in constant.userOrganization"
                :key="item.id"
                :label="item.orgName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="生效状态" prop="effectiveState">
            <el-select
              v-model="ruleForm.effectiveState"
              :disabled="true"
              placeholder="请选择生效状态"
              clearable
              @change="(val) => {handlerChange({type: 'select', formName: 'effectiveState', selectData: constant.EffectiveState,selectOptions: {code: 'code', name: 'name'}, value: val, name: '生效状态'})}"
            >
              <el-option
                v-for="item in constant.EffectiveState"
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
              :disabled="disabled || isDetail"
              placeholder="请输入协议编号"
              clearable
              @change="(val) => {handlerChange({type: 'input', formName: 'contractNumber', value: val, name: '协议编号'})}"
            />
          </el-form-item>

          <el-form-item label="协议名称" prop="name" class="residue-row">
            <el-input
              v-model="ruleForm.name"
              :maxlength="100"
              placeholder="请输入协议名称"
              :disabled="disabled || isDetail"
              clearable
              @change="(val) => {handlerChange({type: 'input', formName: 'name', value: val, name: '协议名称'})}"
            />
          </el-form-item>

          <el-form-item label="协议金额" prop="amount">
            <amount-input
              v-model.trim="ruleForm.amount"
              :disabled="disabled || isDetail"
              :maxlength="20"
              placeholder="请输入协议金额"
              @blur="amountInputBlur('amount')"
              @change="(val) => {handlerChange({type: 'input', formName: 'amount', value: val, name: '协议金额', selectOptions: {suf: '元'}})}"
            >
              <template slot="append">元</template>
            </amount-input>
          </el-form-item>
          <el-form-item label="协议状态" prop="state">
            <el-select
              v-model="ruleForm.state"
              :disabled="disabled || isDetail"
              placeholder="请选择协议状态"
              clearable
              @change="(val) => {handlerChange({type: 'select', formName: 'state', selectData: constant.contractState,selectOptions: {code: 'code', name: 'name'}, value: val, name: '协议状态'})}"
            >
              <el-option
                v-for="item in constant.contractState"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="归档日期" prop="filingDate">
            <el-date-picker
              v-model="ruleForm.filingDate"
              type="date"
              placeholder="请选择归档日期"
              :disabled="disabled || isDetail || ruleForm.state =='01'||ruleForm.state =='03'|| ruleForm.state ==''"
              clearable
              @change="(val) => {handlerChange({type: 'date', formName: 'filingDate', value: val, name: '归档日期'})}"
            />
          </el-form-item>
          <el-form-item label="签订单位" prop="signUnitName">
            <el-input
              v-model="ruleForm.signUnitName"
              :disabled="true"
              placeholder="请输入签订单位"
              clearable
              @change="(val) => {handlerChange({type: 'input', formName: 'signUnitName', value: val, name: '签订单位'})}"
            />
          </el-form-item>
          <el-form-item label="联系人" prop="contactPersonName">
            <el-input
              v-model="ruleForm.contactPersonName"
              :maxlength="20"
              placeholder="请输入联系人"
              :disabled="disabled || isDetail"
              clearable
              @change="(val) => {handlerChange({type: 'input', formName: 'contactPersonName', value: val, name: '联系人'})}"
            />
          </el-form-item>
          <el-form-item label="联系电话" prop="contactTelephone">
            <el-input
              v-model="ruleForm.contactTelephone"
              placeholder="请输入联系电话"
              :disabled="disabled || isDetail"
              clearable
              @change="(val) => {handlerChange({type: 'input', formName: 'contactTelephone', value: val, name: '联系电话'})}"
            />
          </el-form-item>
          <el-form-item label="签订日期" prop="signDate">
            <el-date-picker
              v-model="ruleForm.signDate"
              type="date"
              placeholder="请选择签订日期"
              :disabled="disabled || isDetail"
              clearable
              @change="(val) => {handlerChange({type: 'date', formName: 'signDate', value: val, name: '签订日期'})}"
            />
          </el-form-item>

          <el-form-item label="签订地点" prop="signingAddress">
            <el-input
              v-model="ruleForm.signingAddress"
              placeholder="请输入签订地点"
              :maxlength="50"
              :disabled="disabled || isDetail"
              clearable
              @change="(val) => {handlerChange({type: 'input', formName: 'signingAddress', value: val, name: '签订地点'})}"
            />
          </el-form-item>

          <el-form-item v-if="uploadData.typeCode === 'officeAgree'" label="押金金额" prop="depositAmount">
            <amount-input
              v-model.trim="ruleForm.depositAmount"
              :disabled="disabled || isDetail"
              :maxlength="20"
              placeholder="请输入押金金额"
              @blur="amountInputBlur('depositAmount')"
              @change="(val) => {handlerChange({type: 'input', formName: 'depositAmount', value: val, name: '押金金额', selectOptions: {suf: '元'}})}"
            >
              <template slot="append">元</template>
            </amount-input>
          </el-form-item>
          <el-form-item v-if="uploadData.typeCode === 'officeAgree'" label="起始日期" prop="startDate">
            <el-date-picker
              v-model="ruleForm.startDate"
              type="date"
              placeholder="请选择起始日期"
              :disabled="disabled || isDetail"
              clearable
              :picker-options="startPickerDateTime"
              @change="(val) => {handlerChange({type: 'date', formName: 'startDate', value: val, name: '起始日期'})}"
            />
          </el-form-item>
          <el-form-item v-if="uploadData.typeCode === 'officeAgree'" label="到期日期" prop="finishDate">
            <el-date-picker
              v-model="ruleForm.finishDate"
              type="date"
              placeholder="请选择到期日期"
              :disabled="disabled"
              clearable
              :picker-options="endPickerDateTime"
              @change="(val) => {handlerChange({type: 'date', formName: 'finishDate', value: val, name: '到期日期'})}"
            />
          </el-form-item>

          <el-form-item v-if="uploadData.typeCode === 'officeAgree'" label="有效期限" prop="absolutePeriod">
            <el-input
              v-model="ruleForm.absolutePeriod"
              :disabled="disabled || isDetail"
              clearable
              :maxlength="4"
              placeholder="请输入有效期限"
              @change="(val) => {handlerChange({type: 'input', formName: 'absolutePeriod', value: val, name: '有效期限', selectOptions:{suf:'月'}})}"
            >
              <template slot="append">月</template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="uploadData.typeCode === 'otherAgree'" />
          <el-form-item label="协议">
            <el-upload
              :data="uploadData"
              :file-list="fileList"
              :on-success="(response, file, fileLists) => {uploadMoreSuccess(fileLists, 'fileList', {name: '协议', record: true, children: false, formName: ruleForm.subModificationRecord.content })}"
              :action="actionUrl"
              :headers="uploadHeaders"
              :on-remove="(file, fileLists) => {handleRemove(file, fileLists, 'fileList', {name: '协议', record: true, children: false, formName: ruleForm.subModificationRecord.content })}"
              :before-upload="beforeUpload50M"
              :on-error="fileError"
              :on-progress="uploadProgress"
              :on-preview="previewFile"
              :disabled="disabled || isDetail"
            >
              <el-button size="small" type="primary" :disabled="disabled || isDetail">
                <i class="iconfont icon-chexiao" /> 上传附件
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注" prop="remark" class="fill-in-row row-label">
            <el-input
              v-model="ruleForm.remark"
              placeholder="请输入备注"
              type="textarea"
              :maxlength="255"
              :disabled="disabled || isDetail"
              clearable
              :rows="3"
              @change="(val) => {handlerChange({type: 'input', formName: 'remark', value: val, name: '备注'})}"
            />
          </el-form-item>

          <el-form-item label="经办组织" prop="handlingOrgId">
            <el-cascader
              v-model="ruleForm.handlingOrgId"
              placeholder="请选择经办组织"
              clearable
              :disabled="disabled || isDetail"
              style="width:100%"
              filterable
              :options="constant.orgList"
              :props="{ expandTrigger: 'hover', value: 'id', label: 'orgName', children: 'children',checkStrictly: true }"
              @change="(val) => {handlerChange({type: 'cascader', formName: 'handlingOrgId', selectData: constant.orgList,selectOptions: {code: 'id', name: 'orgName'}, value: val, name: '经办组织'})}"
            />

          </el-form-item>
          <el-form-item label="经办日期" prop="handlingDate">
            <el-date-picker

              v-model="ruleForm.handlingDate"
              placeholder="请选择经办日期"
              type="date"
              :disabled="disabled || isDetail"
              clearable
              @change="(val) => {handlerChange({type: 'date', formName: 'handlingDate', value: val, name: '经办日期'})}"
            />
          </el-form-item>
          <el-form-item label="经办人" prop="handlingPersonId">
            <el-select
              v-model="ruleForm.handlingPersonId"
              placeholder="请选择经办人"
              :disabled="disabled || isDetail || ruleForm.handlingOrgId.length===0"
              clearable
              @change="(val) => {handlerChange({type: 'select', formName: 'handlingPersonId', selectData: constant.orgPersonList,selectOptions: {code: 'id', name: 'name'}, value: val, name: '经办人'})}"
            >
              <el-option
                v-for="item in constant.orgPersonList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <!-- 新增不展示 -->
          <template v-if="!isNew">
            <el-form-item label="录入人" prop="operationPersonName">
              <el-input
                v-model="ruleForm.createUserName"
                :disabled="true"
                placeholder="请输入录入人"
                clearable
                @change="(val) => {handlerChange({type: 'input', formName: 'createUserName', value: val, name: '录入人'})}"
              />
            </el-form-item>
            <el-form-item label="录入时间" prop="operationDate">
              <el-input
                v-model="ruleForm.createDate"
                :disabled="true"
                placeholder="请选择录入时间"
                clearable
                @change="(val) => {handlerChange({type: 'input', formName: 'createDate', value: val, name: '录入时间'})}"
              />
            </el-form-item>
            <template v-if="isEdit && isShowContent && !isContractEntry && !isSettlementBookList">
              <el-form-item label="修改原因" prop="subModificationRecord.reason">
                <el-input
                  v-model="ruleForm.subModificationRecord.reason"
                  placeholder="请输入修改原因"
                  :disabled="disabled || isDetail"
                  :maxlength="20"
                  clearable
                />
              </el-form-item>
              <el-form-item label="修改内容" prop="subModificationRecord.content" class="fill-in-row">
                <update-context :update-data="ruleForm.subModificationRecord.content" />
              </el-form-item>
            </template>
          </template>
          <template v-if="(isVersion || ( isEdit && isShowContent) || isContractRevise) && !isSettlementBookList" class="fill-in-row">
            <el-form-item label="修改记录" class="fill-in-row">
              <history-record v-if="ruleForm.currentEditNotes ? ruleForm.currentEditNotes.length:''" :is-current="true" :data="ruleForm.currentEditNotes" />
              <history-record v-if="processTypeStatus === 'start' && ruleForm.historyEditNotes.length" :data="ruleForm.historyEditNotes" />
            </el-form-item>
          </template>

          <template v-if="isNew || isVersion">
            <el-form-item :label="processLabel" class="fill-in-row">
              <flow-chart :id="processId" :is-new="isNew" :label.sync="processLabel" />
            </el-form-item>
          </template>
        </el-form>

        <!-- 查看不展示 -->
        <div v-if="isNew || isEdit && processOtions.btnStatus " class="btn">
          <el-button type="primary" @click="onSave(0)">保存</el-button>
          <el-button type="primary" @click="onSave(1)">提交</el-button>
          <el-button class="cancel-btn" @click="onCancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HistoryRecord from '../../../components/HistoryRecord'
import upload from '@core/mixins/upload'
import { toDecimal, validateLandline, validateLength, validatePeriod } from '@core/utils/validate'
import formUpdateContext from '@core/mixins/formUpdateContext'
import { addSupplementalagreement, updateSupplementalagreement, getSupplyVersionDetails, getSupplyDetails, validateUniqueSupply } from '@core/api/contractManage/contractmanager'
import { getSessionStorage } from '@core/utils/auth'
import UpdateContext from '@framesDash/components/UpdateContext'
import { mapGetters, mapActions } from 'vuex'
import editGeneratorNo from '../../../mixins/editGeneratorNo'
import componentType from '../../../mixins/componentType'
import formatterContent from '../../../mixins/formatterContent'
import { startPickerDate, endPickerDate } from '@core/utils'
export default {
  name: 'SupplementaryAgreementOfficeForm',
  components: {
    HistoryRecord,
    UpdateContext,
    flowChart: () => import('../../../components/FlowChart')
  },
  mixins: [upload, formUpdateContext, editGeneratorNo, componentType, formatterContent],
  props: {
    info: {
      type: Object,
      default: () => null
    },
    options: {
      type: Object,
      default: () => {}
    },
    // 新增/修改/查看
    infoType: {
      type: String,
      default: 'add'
    },
    processOtions: {
      default: () => {
        return {
          btnStatus: true
        }
      },
      type: Object
    },
    processTypeStatus: {
      default: 'start',
      type: String
    }
  },
  data() {
    var validInteger = (rule, value, callback) => {
      if (Number(value) < 0) {
        callback(new Error('只能输入大于等于0的金额'))
      } else if (Number(value) > 9999999999.99) {
        callback(new Error('只能输入小于等于9999999999.99的金额'))
      } else {
        callback()
      }
    }
    const integer = (rule, value, callback) => {
      if (value && !validatePeriod(value)) {
        callback(new Error('只能输入大于0的整数'))
      } else {
        callback()
      }
    }

    var validateUniqueRule = (rule, value, callback) => {
      // contractNumber
      validateUniqueSupply({ contractNumber: value, id: this.ruleForm.id }).then(({ data }) => {
        if (!data) {
          callback(new Error('协议编号不能重复'))
        } else {
          callback()
        }
      })
    }
    var validPhone = (rule, value, callback) => {
      if (!validateLandline(value) && value !== '') {
        callback(new Error('请输入正确的手机号码或者座机'))
      } else {
        callback()
      }
    }
    return {
      processLabel: '',
      processId: '',
      loading: false,
      deepRuleForm: {},
      ruleForm: {
        amount: '', // 合同金额
        depositAmount: '',
        approvalNo: '', // 审批单号
        contactPersonName: '', // 联系人/分包方代表
        contactTelephone: '', // 联系电话
        contractId: '', // 协议归属合同id
        contractNumber: '', // 协议编号
        effectiveState: '01', // 生效状态
        filingDate: '', // 归档日期
        handlingDate: new Date(), // 经办日期
        handlingOrgId: '', // 经办组织Id
        handlingPersonId: '', // 经办人Id
        handlingPersonName: '', // 经办人名称
        remark: '',
        name: '', // 合同名称
        signDate: '', // 签订日期
        signUnitName: '', // 保险人/签订单位
        signingAddress: '', // 签订地点
        startOrgId: getSessionStorage('rootOrgId'), // 发起组织Id
        state: '', // 合同状态
        createDate: '',
        createUserName: '',
        subModificationRecord: {
          reason: '',
          content: []
        },
        currentEditNotes: [],
        historyEditNotes: [],
        content: [],
        reason: ''
      },
      subModificationRecord: {
        content: [], // 修改内容
        reason: '' // 修改原因
      },
      fileList: [],
      deepFileList: [],
      rules: {
        absolutePeriod: [
          { validator: integer, trigger: 'blur' }
        ],
        signingAddress: [validateLength(0, 50)],
        approvalNo: [{ required: true, message: '请输入审批单号', trigger: 'blur' }, validateLength(0, 18)],
        startOrgId: [{ required: true, message: '请选择发起组织', trigger: 'change' }],
        effectiveState: [{ required: true, message: '请选择生效状态', trigger: 'change' }],
        contractNumber: [{ required: true, message: '请输入协议编号', trigger: 'blur' }, validateLength(0, 20), { required: true, validator: validateUniqueRule, trigger: 'blur' }],
        name: [{ required: true, message: '请输入协议名称', trigger: 'blur' }, validateLength(0, 100)],
        amount: [{ required: true, message: '请输入协议金额', trigger: 'blur' }, { required: true, validator: validInteger, trigger: 'blur' }],
        depositAmount: [{ required: false, validator: validInteger, trigger: 'blur' }],
        state: [{ required: true, message: '请选择协议状态', trigger: 'change' }],
        filingDate: [{ required: false, message: '请选择归档日期', trigger: 'change' }],
        signDate: [{ required: true, message: '请选择签订日期', trigger: 'change' }],
        handlingOrgId: [{ required: true, message: '请选择经办组织', trigger: 'change' }],
        handlingDate: [{ required: true, message: '请选择经办日期', trigger: 'change' }],
        handlingPersonId: [{ required: true, message: '请选择经办人', trigger: 'change' }],
        contactTelephone: [{ validator: validPhone, trigger: 'blur' }, validateLength(0, 11)],
        'subModificationRecord.reason': [{ required: true, message: '请输入修改原因', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    isNew() {
      return this.infoType === 'add'
    },
    isEdit() {
      return this.infoType === 'edit'
    },
    isDetail() {
      return this.infoType === 'details'
    },
    isVersion() {
      return this.infoType === 'versionLook'
    },
    disabled() {
      return this.isDetail || this.isVersion
    },
    startPickerDateTime() {
      return startPickerDate(this.ruleForm.finishDate)
    },
    endPickerDateTime() {
      return endPickerDate(this.ruleForm.startDate)
    }
  },
  watch: {
    'ruleForm.subModificationRecord.reason'(val) {
      this.ruleForm.reason = val
    },
    options: {
      handler() {
        if (this.options.row && this.options?.row.toString() !== '{}') {
          this.$store.dispatch('getConstant', 'generateNo').then(() => {
            this.updateCreate(this.options.row)
          })
        }
      },
      immediate: true,
      deep: true
    }
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
      { type: 'orgList', params: orgListParams },
      { type: 'orgPersonList', params: getSessionStorage('orgId') }
    ])
    if (RegExp(/officeDetail/).exec(this.$route.path)) {
      // 办公类合同补充协议 的附件typCode
      this.uploadData.typeCode = 'officeAgree'
    } else {
      // 其它类合同补充协议 的附件typCode
      this.uploadData.typeCode = 'otherAgree'
    }

    if (this.isNew) {
      this.ruleForm.handlingOrgId = JSON.parse(getSessionStorage('contractFormData')).handlingOrgId
      this.ruleForm.handlingPersonId = JSON.parse(getSessionStorage('contractFormData')).handlingPersonId
      this.ruleForm.signUnitName = JSON.parse(getSessionStorage('contractFormData')).signUnitName

      const list = [{ type: 'orgPersonList', params: this.ruleForm.handlingOrgId.slice(-1)[0] }] // 经办人
      this.getConstant(list)
      // this.ruleForm.handlingPersonId = ''
    }
  },
  methods: {
    ...mapActions(['getConstant']),
    onBack() {
      this.$emit('onBack')
    },
    onSave(operateType) {
      this.ruleForm.handlingOrgId = this.ruleForm.handlingOrgId.toString()
      this.ruleForm.contractId = this.$route.query.id
      this.ruleForm.mainType = '01'
      this.ruleForm.Loading = true
      if (this.isNew) {
        this.$refs['ruleForm'].validate((valid) => {
          if (!valid) {
            return false
          } else {
            addSupplementalagreement(this.ruleForm, operateType).then(({ data }) => {
              this.$emit('onBack')
            })
          }
        })
      } else if (this.isEdit) {
        this.$refs['ruleForm'].validate((valid) => {
          if (!valid) {
            return false
          } else {
            const newRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
            newRuleForm.subModificationRecord.content = JSON.stringify(this.ruleForm.subModificationRecord.content)
            updateSupplementalagreement(newRuleForm, operateType).then(({ data }) => {
              this.$emit('onBack')
            })
          }
        })
      }
    },
    onCancel() {
      this.$emit('onBack')
    },

    // 获取附件
    fetchFileList(id, type) {
      this.getFileLoad(id, type).then(data => {
        this.fileList = data
        this.fileList.map(item => {
          item.name = item.fileName
          item.url = item.fileUrl
          return item
        })
        this.deepFileList = this.fileList
      })
    },
    addCreate() {
      this.ruleForm.approvalNo = this.constant.generateNo
      this.uploadData.businessDataId = this.ruleForm.approvalNo
      this.processId = getSessionStorage('rootOrgId')
    },
    // 补充协议详情（1，点击协议名称 查看详情  2，版本查看页面的 详情查看）
    lookCreate(row) {
      this.loading = true
      getSupplyVersionDetails(row.id, row.revisionNumber).then(({ data }) => {
        this.loading = false
        this.ruleForm = data.supplementalAgreementDTO
        data.currentEditNotes.map(item => {
          item.content = JSON.parse(item.content)
          item.name = item.operationPersonName
          item.date = item.operationDate
        })
        //  处理历史记录
        this.handlerRecordContent(data)

        this.ruleForm.handlingOrgId = this.ruleForm.handlingOrgId.split(',')
        this.ruleForm.signUnitName = JSON.parse(getSessionStorage('contractFormData')).signUnitName
        this.uploadData.businessDataId = this.ruleForm.approvalNo

        this.processId = this.ruleForm.approvalProcessId
        this.ruleForm.state === '02' ? this.rules['filingDate'][0].required = true : this.rules['filingDate'][0].required = false
        this.fetchFileList(this.ruleForm.approvalNo, this.uploadData.typeCode)
      })
    },
    // 修改
    updateCreate(row) {
      this.loading = true
      getSupplyDetails(row.id).then(({ data }) => {
        this.loading = false
        this.ruleForm = data.supplementalAgreementDTO
        this.ruleForm.optimisticLock = data.supplementalAgreementDTO.optimisticLock
        this.ruleForm.subModificationRecord = this.subModificationRecord
        this.ruleForm.handlingOrgId = this.ruleForm.handlingOrgId.split(',')
        //  处理历史记录
        this.handlerRecordContent(data)
        const list = [{ type: 'orgPersonList', params: this.ruleForm.handlingOrgId.slice(-1)[0] }] // 经办人
        this.getConstant(list)

        this.amountInputBlur('amount')
        this.amountInputBlur('depositAmount')
        this.editGeneratorNo(this.ruleForm.approvalStatus, 'supply')

        this.ruleForm.signUnitName = data.supplementalAgreementDTO.contractDTO.signUnitName
        this.uploadData.businessDataId = this.ruleForm.approvalNo
        this.processId = this.ruleForm.approvalProcessId
        this.deepRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
        this.ruleForm.state === '02' ? this.rules['filingDate'][0].required = true : this.rules['filingDate'][0].required = false
        this.fetchFileList(this.ruleForm.approvalNo, this.uploadData.typeCode)
      })
    },
    amountInputBlur(value) {
      if (this.ruleForm[`${value}`]) {
        this.ruleForm[`${value}`] = toDecimal(this.ruleForm[value], 2)
      }
    },
    handlerChange(val) {
      if (val.formName === 'state') {
        if (val.value === '01' || val.value === '03' || val.value === '') {
          this.ruleForm.filingDate = ''
        }
        val.value === '02' ? this.rules['filingDate'][0].required = true : this.rules['filingDate'][0].required = false
      }
      if (val.formName === 'handlingOrgId') {
        const list = [{ type: 'orgPersonList', params: val.value.slice(-1)[0] }] // 经办人
        this.getConstant(list)
        this.ruleForm.handlingPersonId = ''
      }
      if (!this.isEdit) return
      const row = this.formUpdateContext(val)
      this.ruleForm.subModificationRecord.content = this.getChangeUploadContext2(row, this.ruleForm.subModificationRecord.content)
      this.ruleForm.content = this.ruleForm.subModificationRecord.content
    },
    handlerRecordContent(data) {
      this.ruleForm.currentEditNotes = data.currentEditNotes.map(i => {
        return {
          name: i.operationPersonName,
          date: i.operationDate,
          content: i.content ? JSON.parse(i.content) : [],
          reason: i.reason
        }
      })
      this.ruleForm.historyEditNotes = data.historyEditNotes.map(i => {
        return {
          name: i.operationPersonName,
          date: i.operationDate,
          content: i.content ? JSON.parse(i.content) : [],
          reason: i.reason
        }
      })
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
    .extend-name {
      flex: 1;
      text-align: center;
    }
  }
  .container {
    padding-top: 10px;
    .constrack-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .el-form-item {
        width: 33.33%;
        .el-select {
          width: 100%;
        }
        .el-date-editor {
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
    width: 200px;
    margin: 10px auto;
  }
}
</style>
