<template>
  <div class="design-other-extend-info">
    <div v-if="!isAdd && options.type !== 'details' && processOtions.btnStatus" class="top">
      <el-button
        v-if="!isEdit"
        class="back-btn"
        @click="onBack"
      ><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      <div class="extend-name">
        {{ currentName }}
      </div>
    </div>
    <!-- 补充协议info页面 -->
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
          clearable
          placeholder="请输入审批单号"
          :maxlength="20"
        />
      </el-form-item>

      <el-form-item label="发起组织" prop="startOrgId">
        <el-select
          v-model="ruleForm.startOrgId"
          :disabled="disabled"
          clearable
          placeholder="请选择发起组织"
          @change="(val) => {handlerChange({type: 'select', formName: 'startOrgId', value: val, name: '发起组织',
                                            selectOptions:{ code:'code',name:'name' },
                                            selectData:'startOrgIdList'})}"
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
          :disabled="true"
          placeholder="请输入生效状态"
          clearable
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

      <el-form-item label="协议名称" prop="name" class="residue-row">
        <el-input
          v-model.trim="ruleForm.name"
          :disabled="disabled"
          placeholder="请输入协议名称"
          :maxlength="100"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'name', value: val, name: '协议名称'})}"
        />
      </el-form-item>

      <el-form-item label="协议金额" prop="amount">
        <amount-input
          v-model="ruleForm.amount"
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
          placeholder="请输入协议状态"
          :disabled="disabled"
          clearable
          @change="(val) => {handlerChange({type: 'select', formName: 'state', selectData: 'statusList',selectOptions: {code: 'code', name: 'name'}, value: val, name: '协议状态'})}"
        >
          <el-option
            v-for="item in stateList"
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
          type="date"
          placeholder="请选择归档日期"
          clearable
          @change="(val) => {handlerChange({type: 'date', formName: 'filingDate', value: val, name: '归档日期'})}"
        />
      </el-form-item>

      <el-form-item label="签订单位" prop="signUnitName">
        <el-input
          v-model.trim="ruleForm.signUnitName"
          :disabled="true"
          clearable
          placeholder="请输入签订单位"
          :maxlength="20"
        />
      </el-form-item>

      <el-form-item label="联系人" prop="contactPersonName">
        <el-input
          v-model.trim="ruleForm.contactPersonName"
          :disabled="disabled"
          clearable
          placeholder="请输入联系人"
          :maxlength="20"
          @change="(val) => {handlerChange({type: 'input', formName: 'contactPersonName', value: val, name: '联系人'})}"
        />
      </el-form-item>

      <el-form-item label="联系电话" prop="contactTelephone">
        <el-input
          v-model.trim="ruleForm.contactTelephone"
          :disabled="disabled"
          clearable
          placeholder="请输入联系电话"
          :maxlength="11"
          @change="(val) => {handlerChange({type: 'input', formName: 'contactTelephone', value: val, name: '联系电话'})}"
        />
      </el-form-item>

      <el-form-item label="签订日期" prop="signDate">
        <el-date-picker
          v-model="ruleForm.signDate"
          :disabled="disabled"
          placeholder="请选择签订日期"
          type="date"
          @change="(val) => {handlerChange({type: 'date', formName: 'signDate', value: val, name: '签订日期'})}"
        />
      </el-form-item>

      <el-form-item label="签订地点" prop="signingAddress" class="residue-row">
        <el-input
          v-model.trim="ruleForm.signingAddress"
          :disabled="disabled"
          class="half"
          clearable
          placeholder="请输入签订单位"
          :maxlength="50"
          @change="(val) => {handlerChange({type: 'input', formName: 'signingAddress', value: val, name: '签订地点'})}"
        />
      </el-form-item>

      <el-form-item label="协议" prop="file">
        <el-upload
          :file-list="contractList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'contractList', {name: '协议', record: true ,forName:'content'})}"
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

      <el-form-item label="备注" prop="remark" class="fill-in-row row-label">
        <el-input
          v-model.trim="ruleForm.remark"
          :disabled="disabled"
          clearable
          :maxlength="255"
          placeholder="请输入备注"
          :rows="3"
          type="textarea"
          @change="(val) => {handlerChange({type: 'input', formName: 'remark', value: val, name: '备注'})}"
        />
      </el-form-item>

      <el-form-item label="经办组织" prop="handlingOrgId">
        <el-cascader
          v-model="ruleForm.handlingOrgId"
          placeholder="请选择经办组织"
          clearable
          :disabled="disabled"
          filterable
          :options="handleOrgList"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'orgName', children: 'children',checkStrictly: true }"
          @change="(val) => { fetchHandlingOrgPersonId(val) }"
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
          :disabled="disabled"
          type="date"
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

      <!-- 新增不显示 -->
      <template v-if="!isAdd">
        <el-form-item label="录入人" prop="createUserName">
          <el-input v-model="ruleForm.createUserName" :disabled="true" />
        </el-form-item>
        <el-form-item label="录入时间" prop="createDate">
          <el-input v-model="ruleForm.createDate" :disabled="true" />
        </el-form-item>

        <template v-if="isEdit && isShowContent && !isContractEntry && !isSettlementBookList">
          <el-form-item label="修改原因" prop="reason">
            <el-input v-model="ruleForm.reason" />
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

      <!-- 修改记录和 历史修改记录 只有在版本查看显示  修改时候也会条件显示  -->

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
      <!-- 新增和版本查看都显示流程图 -->
      <template v-if="isAdd || isDetailVersion">
        <el-form-item class="fill-in-row" :label="processLabel">
          <flow-chart :id="processId" :is-new="isAdd" :label.sync="processLabel" />
        </el-form-item>
      </template>

      <!-- 非新增和修改不显示button -->
      <template v-if="(isAdd || isEdit) && processOtions.btnStatus">
        <div class="btn">
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button class="cancel-btn" @click="onCancel">取消</el-button>
        </div>
      </template>
    </el-form>
  </div>
</template>

<script>
import HistoryRecord from '../../../../components/HistoryRecord'
import componentType from '../../../../mixins/componentType'
import { validateLength, validateOnlyCode } from '@core/utils/validate'
import { getSessionStorage } from '@core/utils/auth'
import { supplytSave, supplyUpdate, getSupplyDetails, getSupplyVersionDetails, validateUniqueSupply
} from '@core/api/contractManage/contractmanager'
import { mapActions, mapGetters } from 'vuex'
import extendUpload from '../../../../mixins/upload'
import formatterConent from '../../../../mixins/formatterContent'
import editGeneratorNo from '../../../../mixins/editGeneratorNo'

export default {
  name: 'Info',
  components: {
    HistoryRecord,
    flowChart: () => import('../../../../components/FlowChart')
  },
  mixins: [extendUpload, componentType, formatterConent, editGeneratorNo],
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
        name: '', // 协议名称
        amount: '', // 协议金额
        state: '', // 协议状态
        filingDate: '', // 归档日期
        signUnitName: '', // 签订单位
        contactTelephone: '', // 联系电话
        signDate: '', // 签订日期
        signingAddress: '', // 签订地点
        remark: '', // 备注
        handlingOrgId: '', // 经办组织
        handlingDate: '', // 经办日期
        handlingPersonId: '', // 经办人
        content: []
      },
      rules: {
        contactTelephone: [
          { validator: this.validPhone(), trigger: 'blur' },
          validateLength(0, 11)
        ],
        approvalNo: [
          { required: true, message: '请输入审批单号', trigger: 'blur' },
          validateLength(0, 20)
        ],
        startOrgId: [
          { required: true, message: '请选择发起组织', trigger: 'change' }
        ],
        effectiveState: [
          { required: true, message: '请选择生效状态', trigger: 'change' }
        ],
        contractNumber: [
          { required: true, message: '请输入协议编号', trigger: 'blur' },
          { validator: (rule, value, callback) => { validateOnlyCode(rule, value, callback, validateUniqueSupply({ contractNumber: value, id: this.isAdd ? undefined : this.currentId }), '04') }, trigger: 'blur' }, validateLength(0, 20)
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
          { required: true, message: '请选择经办人', trigger: 'blur' }
        ]

      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    // 协议Id
    currentName() {
      return this.options?.row.name
    },
    // 编辑详情 Id
    currentId() {
      return this.options?.row?.id
    },
    // 补充协议依赖合同Id
    contractId() {
      return this.breezeInfo?.row.id
    },
    // 审批单号
    generateNo() {
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
    effectiveStateList() {
      return this.constant.EffectiveState
    },
    // 协议状态
    stateList() {
      return this.constant.contractState
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
    const fetchList = [this.initDictionaries]
    if (!this.isAdd) {
      this.loading = true
      if (this.isEdit || this.isDetail) {
        // 如果是普通查看
        fetchList.push(this.fetchEditData)
      } else if (this.isDetailVersion) {
        // 如果是详情查看
        fetchList.push(this.fetchVersionData)
      }
    } else {
      this.initDefaultFiled()
    }

    Promise.all(fetchList.map(func => (func()))).then(async res => {
      this.ruleForm.approvalNo = this.generateNo
      this.ruleForm.startOrgId = getSessionStorage('orgId')
      this.ruleForm.effectiveState = '01'
      // this.ruleForm.state = '01'
      this.ruleForm.handlingDate = new Date()
      if (!this.isAdd) {
        this.loading = false
        const responseData = res[1]
        await this.returnFormData(responseData)
        this.returnFileList(responseData)
      }
      this.ruleForm.signUnitName = getSessionStorage('constructionUnit')
    })
  },
  methods: {
    ...mapActions(['getConstant']),
    async returnFileList(responseData) {
      const approvalNo = this.ruleForm.approvalNo
      const data = await this.fetchFormFileList(['agree'], approvalNo)
      this.contractList = data[0]
      this.deepContractList = data[0]
      if (this.isEdit) {
        this.editGeneratorNo(this.ruleForm.approvalStatus, 'supply')
      }
    },
    async returnFormData(data) {
      // if (this.isDetailVersion) {
      // 版本详情
      await this.formatterResponseConent(data)
      // } else {
      // 普通查看
      // data['handlingOrgId'] = data['handlingOrgId'].split(',')
      // this.ruleForm = { ...data, content: [] }
      // }
    },
    // 版本查看
    async fetchVersionData() {
      // 需要当前版本号 以及 当前查看版本id
      const { data } = await getSupplyVersionDetails(this.currentId, this.currentVersion)
      return data
    },
    // 普通查看
    async fetchEditData() {
      // 当前行信息
      const { data } = await getSupplyDetails(this.currentId)
      return data
    },
    async initDictionaries() {
      const dictionaires = [
        'generateNo', // 审批单号
        'userOrganization', // 发起组织
        'EffectiveState', // 生效状态
        'contractState', // 协议状态
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
        } // 经办组织
      ]
      await this.getConstant(dictionaires)
    },
    getParams() {
      const params = JSON.parse(JSON.stringify(this.ruleForm))
      params['contractId'] = this.secondLevelContractId
      params['subType'] = '06'
      params['mainType'] = '02'
      params['handlingOrgId'] = params['handlingOrgId'].toString()
      params['Loading'] = true
      if (this.isEdit) {
        params['subModificationRecord'] = this.formatterRequestConent()
      }
      return params
    },
    async fetchFormData(type) {
      const params = this.getParams()
      const methodsList = {
        add: supplytSave,
        edit: supplyUpdate
      }
      const submitType = type === 'save' ? 0 : 1
      const currentType = this.isAdd ? 'add' : 'edit'

      const method = methodsList[currentType]
      await method(params, submitType)
      this.onCancel()
    },
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
          this.fetchFormData('summit')
        }
      })
    },
    onCancel() {
      this.$emit('changeState', 'otherExtendMain')
    },
    onBack() {
      this.$emit('changeState', 'otherExtendMain')
    }
  }
}
</script>

<style lang="less" scoped>
.design-other-extend-info {
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
    width: 100%;
    text-align: center;
    padding-top: 30px;
  }
}
</style>
<style lang="less">
.design-other-extend-info {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-cascader  {
    width: 100%;
  }
}
</style>
