<template>
  <div class="design-sub-extend-info">
    <div v-if="!isAdd && options.type !== 'details' && processOtions.btnStatus" class="top">
      <el-button
        v-if="!isEdit"
        class="back-btn"
        @click="onBack"
      ><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      <!-- 新增不存再名称显示 -->
      <div class="extend-name">{{ contractName }}</div>
    </div>
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
          v-model.trim="ruleForm.approvalNo"
          :disabled="true"
        />
      </el-form-item>

      <el-form-item label="发起组织" prop="startOrgId">
        <el-select
          v-model="ruleForm.startOrgId"
          placeholder="请选择发起组织"
          :disabled="disabled"
          clearable
          @change="(val) => {handlerChange({type: 'select', formName: 'startOrgId', value: val, name: '发起组织',
                                            selectOptions:{ code:'code',name:'name' },
                                            selectData:'startOrgIdList'})}"
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
          :disabled="true"
          clearable
          placeholder="请选择生效状态"
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
          :disabled="disabled"
          placeholder="请输入协议编号"
          :maxlength="20"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'contractNumber', value: val, name: '协议编号'})}"
        />
      </el-form-item>

      <el-form-item label="协议名称" class="residue-row" prop="name">
        <el-input
          v-model.trim="ruleForm.name"
          :disabled="disabled"
          :maxlength="100"
          placeholder="请输入协议名称"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'name', value: val, name: '协议名称'})}"
        />
      </el-form-item>

      <el-form-item label="协议金额" prop="amount">
        <amount-input
          v-model.trim="ruleForm.amount"
          :disabled="disabled"
          placeholder="请输入协议金额"
          @blur="amountInputBlur('amount')"
          @change="(val) => {handlerChange({type: 'input', formName: 'amount', value: val, name: '协议金额'})}"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="协议状态" prop="state">
        <el-select
          v-model="ruleForm.state"
          :disabled="disabled"
          clearable
          placeholder="请选择协议状态"
          @change="(val) => {handlerChange({type: 'select', formName: 'state', selectData: 'statusList',selectOptions: {code: 'code', name: 'name'}, value: val, name: '协议状态'})}"
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
        prop="filingDate"
        :rules="[
          { required: ruleForm.state === '02', message: '请选择归档日期', trigger: 'change' }
        ]"
      >
        <el-date-picker
          v-model="ruleForm.filingDate"
          type="date"
          placeholder="请选择归档日期"
          :disabled="disabled || disabledFillingDate"
          @change="(val) => {handlerChange({type: 'date', formName: 'filingDate', value: val, name: '归档日期'})}"
        />
      </el-form-item>

      <el-form-item label="分包公司" prop="cooperateUnitId">
        <el-cascader
          v-model="ruleForm.cooperateUnitId"
          placeholder="请选择分包公司"
          clearable
          :disabled="true"
          filterable
          :options="constant.cooperatunitsList"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'list' }"
          @change="(val) => {handlerChange({type: 'cascader', formName: 'cooperateUnitId', selectData: 'constant.cooperatunitsList',selectOptions: {code: 'id', name: 'name'}, value: val, name: '分包公司'})}"
        />
      </el-form-item>

      <el-form-item label="分包方代表" prop="contactPersonName">
        <el-input
          v-model.trim="ruleForm.contactPersonName"
          :disabled="disabled"
          clearable
          :maxlength="20"
          placeholder="请输入分包方代表"
          @change="(val) => {handlerChange({type: 'input', formName: 'contactPersonName', value: val, name: '分包方代表'})}"
        />
      </el-form-item>

      <el-form-item label="联系电话" prop="contactTelephone">
        <el-input
          v-model.trim="ruleForm.contactTelephone"
          :disabled="disabled"
          clearable
          :maxlength="11"
          placeholder="请输入联系电话"
          @change="(val) => {handlerChange({type: 'input', formName: 'contactTelephone', value: val, name: '联系电话'})}"
        />
      </el-form-item>

      <el-form-item label="签订日期" prop="signDate">
        <el-date-picker
          v-model="ruleForm.signDate"
          :disabled="disabled"
          type="date"
          clearable
          placeholder="请选择签订日期"
          @change="(val) => {handlerChange({type: 'date', formName: 'signDate', value: val, name: '签订日期'})}"
        />
      </el-form-item>

      <el-form-item label="签订地点" prop="signingAddress">
        <el-input
          v-model.trim="ruleForm.signingAddress"
          :disabled="disabled"
          :maxlength="50"
          clearable
          placeholder="请输入签订地点"
          @change="(val) => {handlerChange({type: 'input', formName: 'signingAddress', value: val, name: '签订地点'})}"
        />
      </el-form-item>

      <el-form-item label="支付方式" prop="paymentMethod">
        <el-select v-model="ruleForm.paymentMethod" placeholder="请选择支付方式" clearable :disabled="disabled">
          <el-option
            v-for="item in PaymentClassList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            @change="(val) => {handlerChange({type: 'select', formName: 'paymentMethod', value: val, name: '支付方式',selectData:'PaymentClassList'})}"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="协议" prop="file">
        <el-upload
          :file-list="contractList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'contractList', {name: '协议', record: true ,formName:'content'})}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'contractList', {name: '协议', record: true, formName: 'content' })}"
          :before-upload="beforeUpload50M"
          :disabled="disabled"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="uploadBusinessId(ruleForm.approvalNo,'agree')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="备注" class="fill-in-row row-label" prop="remark">
        <el-input
          v-model.trim="ruleForm.remark"
          type="textarea"
          :disabled="disabled"
          :rows="3"
          clearable
          :maxlength="255"
          placeholder="请输入备注"
          @change="(val) => {handlerChange({type: 'input', formName: 'remark', value: val, name: '备注'})}"
        />
      </el-form-item>

      <el-form-item label="经办组织" prop="handlingOrgId">
        <el-cascader
          v-model="ruleForm.handlingOrgId"
          clearable
          :disabled="disabled"
          filterable
          placeholder="请选择经办组织"
          :options="handleOrgList"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'orgName', children: 'children',checkStrictly: true }"
          @change="(val) => fetchHandlingOrgPersonId(val)"
        />
        <!--

           @change="(val) => {handlerChange({type: 'cascader', formName: 'handlingOrgId',
                                            selectOptions: {code: 'code', name: 'name'},
                                            selectData: 'handleOrgList', value: val, name: '经办组织'})}"

         -->
      </el-form-item>
      <el-form-item label="经办日期" prop="handlingDate">
        <el-date-picker
          v-model="ruleForm.handlingDate"
          type="date"
          :disabled="disabled"
          placeholder="请选择经办日期"
          clearable
          @change="(val) => {handlerChange({type: 'date', formName: 'handlingDate', value: val, name: '经办日期'})}"
        />
      </el-form-item>
      <el-form-item label="经办人" prop="handlingPersonId">
        <el-select
          v-model="ruleForm.handlingPersonId"
          clearable
          :disabled="disabled || ruleForm.handlingOrgId.length===0"
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

      <!-- 新家不显示 -->
      <template v-if="!isAdd">
        <el-form-item label="录入人" prop="createUserName">
          <el-input v-model="ruleForm.createUserName" :disabled="true" />
        </el-form-item>
        <el-form-item label="录入时间" prop="createDate">
          <el-input v-model="ruleForm.createDate" :disabled="true" />
        </el-form-item>

        <template v-if="isEdit && isShowContent">
          <el-form-item label="修改原因" prop="reason">
            <el-input v-model="ruleForm.reason" />
          </el-form-item>

          <el-form-item label="修改内容" class="fill-in-row">
            <update-context :update-data="ruleForm.content" />
          </el-form-item>
        </template>
      </template>

      <template v-if="(isDetailVersion || (isEdit && isShowContent) || isContractRevise) && !isSettlementBookList">

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
      <!-- 审批流程 新增和版本查看都显示 -->
      <template v-if="isAdd || isDetailVersion ">
        <el-form-item class="fill-in-row" :label="processLabel">
          <flow-chart :id="processId" :is-new="isAdd" :label.sync="processLabel" />
        </el-form-item>
      </template>

    </el-form>

    <div v-if="(isAdd || isEdit) && processOtions.btnStatus " class="btn">
      <el-button type="primary" @click="onSave">保存</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button class="cancel-btn" @click="onCancle">取消</el-button>
    </div>
  </div>
</template>

<script>
import HistoryRecord from '../../../../components/HistoryRecord'
import componentType from '../../../../mixins/componentType'
import { getSessionStorage } from '@core/utils/auth'
import { validateLength, validateOnlyCode } from '@core/utils/validate'
import { supplytSave, supplyUpdate, getSupplyDetails, getSupplyVersionDetails, validateUniqueSupply
} from '@core/api/contractManage/contractmanager'
// import upload from '@core/mixins/upload'
import { mapActions, mapGetters } from 'vuex'
import extendUpload from '../../../../mixins/upload'
import formatterConent from '../../../../mixins/formatterContent'
import editGeneratorNo from '../../../../mixins/editGeneratorNo'

export default {
  name: 'SubExtendInfo',
  components: {
    HistoryRecord,
    flowChart: () => import('../../../../components/FlowChart')
  },
  mixins: [componentType, extendUpload, formatterConent, editGeneratorNo],
  props: {
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
    return {
      loading: false,
      contractList: [],
      deepContractList: [],
      deepRuleForm: {},
      ruleForm: {
        approvalNo: '', // 审批单号
        startOrgId: '', // 发起组织
        effectiveState: '', // 生效状态
        contractNumber: '', // 编号
        name: '', // 名称
        amount: '', // 金额
        state: '', // 协议状态
        filingDate: '', // 归档日期
        cooperateUnitId: getSessionStorage('constructionUnit'), // 分包公司
        contactPersonName: '', // 分包方代表
        contactTelephone: '', // 联系电话
        signDate: '', // 签订日期
        signingAddress: '', // 签订地点
        paymentMethod: '', //  支付方式
        remark: '', // 标注
        handlingOrgId: '', // 经办组织
        handlingDate: '', // 经办日期
        handlingPersonId: '', // 经办人
        createUserName: '', // 录入人
        createDate: '', // 录入时间
        reason: '', // 修改原因
        content: [] // 修改内容
      },

      rules: {
        contactTelephone: [
          { validator: this.validPhone(), trigger: 'blur' },
          validateLength(0, 11)
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
          { required: true, validator: (rule, value, callback) => { validateOnlyCode(rule, value, callback, validateUniqueSupply({ contractNumber: value, id: this.isAdd ? undefined : this.currentId }), '04') }, trigger: 'blur' },
          { required: true, message: '请输入协议编号', trigger: 'blur' },
          validateLength(0, 20)
        ],
        name: [
          { required: true, message: '请输入协议名称', trigger: 'blur' },
          validateLength(0, 100)
        ],
        state: [
          { required: true, message: '请选择协议状态', trigger: 'change' }
        ],
        amount: [
          { required: true, message: '请输入协议金额', trigger: 'blur' },
          { required: true, validator: this.validtorZeroMon, trigger: 'blur' }
        ],
        signDate: [
          { required: true, message: '请选择签订日期', trigger: 'change' }
        ],
        handlingOrgId: [
          { required: true, message: '请选择经办组织', trigger: 'change' }
        ],
        handlingDate: [
          { required: true, message: '请选择经办日期', trigger: 'change' }
        ],
        handlingPersonId: [
          { required: true, message: '请选择经办人', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    // 审批单号
    generateNo() {
      return this.constant.generateNo
    },
    // 协议状态
    statusList() {
      return this.constant.contractState
    },
    // 生效状态
    effectiveStateList() {
      return this.constant.EffectiveState
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
    // 支付方式List
    PaymentClassList() {
      return this.constant.PaymentMode.map(i => ({ name: i.name, code: i.code }))
    },
    // 经办人List
    handleManList() {
      return this.constant.orgPersonList.map(i => ({ code: i.id, name: i.name }))
    },
    // 经办组织 orgList
    handleOrgList() {
      return this.constant.orgList
    }
  },
  created() {
    const fetchList = [this.initPublicDictionaries]
    if (!this.isAdd) {
      this.loading = true
      if (this.isEdit || this.isDetail) {
        fetchList.push(this.fetchEditDetail)
      } else {
        fetchList.push(this.fetchDetailVersion)
      }
    }
    Promise.all(fetchList.map(func => (func())))
      .then(async res => {
        this.ruleForm.approvalNo = this.generateNo
        this.ruleForm.startOrgId = getSessionStorage('orgId')
        this.ruleForm.effectiveState = '01'
        this.ruleForm.category = '01'
        this.ruleForm.handlingDate = new Date()
        this.initDefaultFiled()
        if (!this.isAdd) {
          this.loading = false
          const responseData = res[1]
          await this.returnFormData(responseData)
          this.returnFileList(responseData)
        }
      })
  },
  methods: {
    ...mapActions(['getConstant']),
    // 请求数据字典
    async initPublicDictionaries() {
      const dictionares = [
        'generateNo', // 审批单号
        'contractState', // 协议状态
        'EffectiveState', // 生效状态
        'userOrganization', // 发起组织
        'PaymentMode', // 支付方式
        // 'cooperatunitsList', // 分包公司
        {
          type: 'orgPersonList',
          params: getSessionStorage('orgId')
        }, // 经办人
        {
          type: 'orgList',
          params: {
            parentPath: getSessionStorage('orgId'),
            del: '0',
            state: 'ok'
          }
        } // 经办组织
      ]
      await this.getConstant(dictionares)
    },
    async returnFileList(responseData) {
      // const { data: { approvalNo }} = responseData
      const approvalNo = this.ruleForm.approvalNo
      const data = await this.fetchFormFileList(['agree'], approvalNo)
      this.contractList = data[0]
      this.deepContractList = data[0]
      if (this.isEdit) {
        this.editGeneratorNo(this.ruleForm.approvalStatus, 'supply')
      }
    },
    async returnFormData(responseData) {
      // if (this.isDetailVersion) {
      const { data } = responseData
      await this.formatterResponseConent(data)
      if (this.isEdit) {
        this.editGeneratorNo(this.ruleForm.approvalStatus, 'supply')
      }
      // } else {
      // 普通查看数据 不带有流程图
      // const { data } = responseData
      // data['handlingOrgId'] = data['handlingOrgId'].split(',')
      // this.ruleForm = { ...data, content: [] }
      // }
    },
    async fetchEditDetail() {
      // 补充协议修改 当前补充协议Id
      const data = await getSupplyDetails(this.currentId)
      return data
    },
    // 查看所有
    async fetchDetailVersion() {
      const data = await getSupplyVersionDetails(this.currentId, this.currentVersion)
      return data
    },
    onBack() {
      this.$emit('changeState', 'subExtendMain')
    },
    formatParams() {
      const data = JSON.parse(JSON.stringify(this.ruleForm))
      // 处理级联
      data['Loading'] = true
      data['handlingOrgId'] = data['handlingOrgId'].toString()
      // 处理归属合同Id - 上一级归属合同id
      data['contractId'] = this.secondLevelContractId
      // 处理类型 -归属内部合同
      data['mainType'] = '02'
      // 处理编辑修改原因 修改内容参数
      if (this.isEdit) {
        data['subModificationRecord'] = this.formatterRequestConent()
      }
      return data
    },
    async onSaveFormData(params, type) {
      const map = {
        add: supplytSave,
        edit: supplyUpdate
      }
      const saveType = type === 'save' ? 0 : 1
      const methodType = this.isAdd ? 'add' : 'edit'
      await map[methodType](params, saveType)
      this.onCancle()
    },
    fetchSaveForm(type) {
      const params = this.formatParams()
      this.onSaveFormData(params, type)
    },
    onSave() {
      this.$refs['ruleForm'].validate(boolean => {
        if (boolean) {
          this.fetchSaveForm('save')
        }
      })
    },
    onSubmit() {
      this.$refs['ruleForm'].validate(boolean => {
        if (boolean) {
          this.fetchSaveForm('submit')
        }
      })
    },
    onCancle() {
      this.$emit('changeState', 'subExtendMain')
    }
  }
}
</script>

<style lang="less" scoped>
.design-sub-extend-info {
  .top {
    display: flex;
    flex-direction: row;
    height: 32px;
    padding: 10px;
    // box-sizing: border-box;
    line-height: 32px;
    .extend-name {
      flex: 1;
      text-align: center;
    }
  }
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
<style lang="less">
.design-sub-extend-info {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
}
</style>
