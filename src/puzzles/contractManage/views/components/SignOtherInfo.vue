<template>
  <div class="sign-other-info">
    <div v-if="isDetail" class="title">
      {{ ruleForm.name }}
    </div>
    <el-form
      ref="ruleForm"
      v-loading="loading"
      :rules="rules"
      :model="ruleForm"
      label-width="100px"
      class="constrack-ruleForm"
    >
      <el-form-item label="审批单号" prop="approvalNo">
        <el-input
          v-model.trim="ruleForm.approvalNo"
          clearable
          placeholder="请输入审批单号"
          :maxlength="18"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item label="发起组织" prop="startOrgId">
        <el-select
          v-model="ruleForm.startOrgId"
          clearable
          placeholder="请选择发起组织"
          :disabled="disabled"
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'startOrgId',
              selectOptions:{ code:'code',name:'name' },
              value: val, name: '发起组织',selectData:'startOrgIdList'
            })
          }"
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
          v-model.trim="ruleForm.contractNumber"
          :disabled="disabled"
          clearable
          placeholder="请输入合同编号"
          :maxlength="20"
          @change="(val) => {handlerChange({type: 'input',selectOptions:{ code:'code',name:'name' }, formName: 'contractNumber', value: val, name: '合同编号'})}"
        />
      </el-form-item>

      <el-form-item label="合同名称" class="residue-row" prop="name">
        <el-input
          v-model.trim="ruleForm.name"
          :disabled="disabled"
          clearable
          placeholder="请输入合同名称"
          :maxlength="20"
          @change="(val) => {handlerChange({type: 'input', formName: 'name',
                                            selectOptions:{ code:'code',name:'name' },
                                            value: val, name: '合同名称'})}"
        />
      </el-form-item>

      <el-form-item label="合同类别" prop="category">
        <el-select
          v-model="ruleForm.category"
          :disabled="true"
          placeholder="请输入合同类别"
          clearable
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
          placeholder="请输入合同金额"
          @blur="amountInputBlur('amount')"
          @change="(val) => {handlerChange({type: 'input',selectOptions: {suf:'元'}, formName: 'amount', value: val, name: '合同金额'})}"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="结算金额" prop="settlementAmount">
        <amount-input
          v-model.trim="ruleForm.settlementAmount"
          :disabled="settleDisabled"
          placeholder="请输入合同金额"
          @change="(val) => {handlerChange({type: 'input',selectOptions: {suf:'元'}, formName: 'settlementAmount', value: val, name: '结算金额'})}"
          @blur="amountInputBlur('settlementAmount')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="收支类型" prop="balanceType">
        <el-select
          v-model="ruleForm.balanceType"
          placeholder="请选择收支类型"
          :disabled="disabled"
          clearable
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
          clearable
          :disabled="disabled"
          placeholder="请选择合同状态"
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
        label="归档日期1"
        prop="filingDate"
        :rules="[
          { required: ruleForm.state === '02', message: '请选择归档日期', trigger: 'change' }
        ]"
      >
        <el-date-picker
          v-model="ruleForm.filingDate"
          placeholder="请选择归档日期"
          :disabled="disabled || disabledFillingDate"
          type="date"
          clearable
          @change="(val) => {handlerChange({type: 'date', formName: 'filingDate',value: val, name: '归档日期'})}"
        />
      </el-form-item>

      <el-form-item label="签订单位" prop="signUnitName">
        <el-input
          v-model.trim="ruleForm.signUnitName"
          class="half"
          :disabled="disabled"
          :maxlength="50"
          placeholder="请输入签订单位"
          clearable
          @change="(val) => {handlerChange({type: 'input',selectOptions:{ code:'code',name:'name' }, formName: 'signUnitName', value: val, name: '签订单位'})}"
        />
      </el-form-item>

      <el-form-item label="联系人" prop="contactPerson">
        <el-input
          v-model.trim="ruleForm.contactPersonName"
          clearable
          :disabled="disabled"
          placeholder="请输入联系人"
          :maxlength="20"
          @change="(val) => {handlerChange({type: 'input',selectOptions:{ code:'code',name:'name' }, formName: 'contactPerson', value: val, name: '联系人'})}"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="contactTelephone">
        <el-input
          v-model.trim="ruleForm.contactTelephone"
          clearable
          :disabled="disabled"
          placeholder="请输入联系电话"
          :maxlength="11"
          @change="(val) => {handlerChange({type: 'input',selectOptions:{ code:'code',name:'name' }, formName: 'contactTelephone', value: val, name: '联系电话'})}"
        />
      </el-form-item>

      <el-form-item label="签订日期" prop="signDate">
        <el-date-picker
          v-model="ruleForm.signDate"
          placeholder="请选择签订日期"
          :disabled="disabled"
          type="date"
          clearable
          @change="(val) => {handlerChange({type: 'date', formName: 'signDate', value: val, name: '签订日期'})}"
        />
      </el-form-item>

      <el-form-item label="签订地点" prop="signingAddress">
        <el-input
          v-model.trim="ruleForm.signingAddress"
          class="half"
          :disabled="disabled"
          :maxlength="50"
          placeholder="请输入签订地点"
          clearable
          @change="(val) => {handlerChange({type: 'input',selectOptions:{ code:'code',name:'name' }, formName: 'signingAddress', value: val, name: '签订地点'})}"
        />
      </el-form-item>

      <div class="fill-in-row">
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
        <el-form-item v-if="(isDetail || isDetailVersion || isSettlementBookList)" label="结算书">
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
      </div>

      <el-form-item
        label="备注"
        prop="remark"
        class="fill-in-row row-label"
      >
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
          filterable
          :options="handleOrgList"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'orgName', children: 'children' ,checkStrictly: true}"
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
          :disabled="disabled || disabledHandlingPersonId"
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

      <template v-if="!isAdd">
        <el-form-item label="录入人" prop="createUserName">
          <el-input v-model="ruleForm.createUserName" :disabled="true" />
        </el-form-item>
        <el-form-item label="录入时间" prop="createDate">
          <el-date-picker
            v-model="ruleForm.createDate"
            :disabled="true"
            type="datetime"
          />
        </el-form-item>

        <template v-if="isEdit && isShowContent && !isContractEntry && !isSettlementBookList">
          <el-form-item label="修改原因" prop="reason">
            <el-input v-model="ruleForm.reason" :maxlength="20" placeholder="请输入修改原因" />
          </el-form-item>

          <el-form-item
            label="修改内容"
            class="fill-in-row"
          >
            <update-context :update-data="ruleForm.content" />
          </el-form-item>

        </template>
      </template>
      <template v-if="((isDetailVersion || (isEdit && isShowContent)) || isContractRevise) && !isSettlementBookList">
        <el-form-item label="修改记录" class="fill-in-row">
          <history-record :is-current="true" :data="currentContent" />
        </el-form-item>

        <!-- <el-form-item class="fill-in-row">
          <history-record v-if="processTypeStatus === 'start' && content.length > 0" :data="content" />
        </el-form-item> -->

        <el-form-item v-if="isShowHistory || processTypeStatus === 'start' && content.length > 0" class="fill-in-row">
          <history-record :data="content" />
        </el-form-item>
      </template>
      <template v-if="isAdd || isDetailVersion">
        <el-form-item class="fill-in-row" :label="processLabel">
          <flow-chart :id="processId" :is-new="isAdd" :label.sync="processLabel" />
        </el-form-item>
      </template>
      <el-form-item v-if="(isAdd || isEdit)" class="fill-in-row">
        <div class="btn">
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button class="cancel-btn" @click="onCancel">取消</el-button>
        </div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { validateLength, validateOnlyCode } from '@core/utils/validate'
import HistoryRecord from './HistoryRecord'
import editGeneratorNo from '../mixins/editGeneratorNo.js'
import { getSessionStorage } from '@core/utils/auth'
import { mapActions, mapGetters } from 'vuex'
import { otherContractSave, otherContractEdit, otherContractDetails, sonContractVersionDetails, validateUnique

} from '@core/api/contractManage/contractmanager'
import uploadExtend from '../mixins/upload'
import formatterContent from '../mixins/formatterContent'
import componentType from '../mixins/componentType'

export default {
  label: 'SignOtherInfo',
  components: {
    HistoryRecord,
    flowChart: () => import('./FlowChart')
  },
  mixins: [uploadExtend, formatterContent, componentType, editGeneratorNo],
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
        approvalNo: '', // 审批单号
        startOrgId: '', // 发起组织
        effectiveState: '', // 生效状态
        contractNumber: '', // 合同编号
        name: '', // 合同名称
        category: '', // 合同类别
        amount: '', // 合同金额
        settlementAmount: '', // 结算金额
        balanceType: '', // 收支类型
        state: '', // 合同状态
        filingDate: '', // 归档日期
        signUnitName: '', // 签订单位
        contactPerson: '', // 联系人
        contactTelephone: '', // 联系电话
        signDate: '', // 签订日期
        signingAddress: '', // 签订地点
        remark: '', // 备注
        handlingOrgId: '', // 经办组织
        handlingDate: '', // 经办日期
        handlingPersonId: '', // 经办人
        content: []
      },
      companyList: [],
      rules: {
        reason: [
          { required: true, message: '请输入修改原因', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择合同类别', trigger: 'blur' }
        ],
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
          {
            required: true,
            message: '请输入合同编号',
            trigger: 'blur'
          },
          { validator: (rule, value, callback) => { validateOnlyCode(rule, value, callback, validateUnique({ contractNumber: value, id: this.isNew ? undefined : this.currentId }), '04') }, trigger: 'blur' },
          validateLength(0, 20)
        ],
        name: [
          { required: true, message: '请输入合同名称', trigger: 'blur' },
          validateLength(0, 100)
        ],
        type: [
          { required: true, message: '请选择合同类别', trigger: 'change' }
        ],
        amount: [{ required: true, message: '请输入合同金额', trigger: 'blur' }, { required: true, validator: this.validtorZeroMon, trigger: 'blur' }],
        balanceType: [
          { required: true, message: '请选择收支类型', trigger: 'change' }
        ],
        state: [
          { required: true, message: '请选择合同状态', trigger: 'change' }
        ],
        signUnitName: [
          { required: true, message: '请输入签订单位', trigger: 'blur' }
        ],
        signDate: [
          { required: true, message: '请选择签订日期', trigger: 'change' }
        ],
        handlingOrgId: [
          {
            required: true,
            message: '请选择经办组织',
            trigger: 'change'
          }
        ],
        handlingDate: [
          {
            required: true,
            message: '请选择经办日期',
            trigger: 'change'
          }
        ],
        handlingPersonId: [
          {
            required: true,
            message: '请选择经办人',
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
    // 合同归属
    ContractAttributionList() {
      return this.constant.ContractAttribution
    },
    // 合同类型
    typeList() {
      return this.constant.MainContractType
    },
    // 发起组织
    startOrgIdList() {
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
    // 审批单号
    approvalNo() {
      return this.constant.generateNo
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
    const fetchList = [this.initDictionaries]
    if (!this.isAdd) {
      this.loading = true
      if (this.isDetail || this.isEdit) {
        fetchList.push(this.fetchDetail)
      } else if (this.isDetailVersion) {
        fetchList.push(this.fetchVersionDetail)
      }
    }
    Promise.all(fetchList.map(func => (func()))).then(async(res) => {
      this.ruleForm.approvalNo = this.approvalNo
      this.ruleForm.startOrgId = getSessionStorage('rootOrgId')
      this.ruleForm.effectiveState = '01'
      this.ruleForm.category = '01'
      this.$set(this.ruleForm, 'handlingDate', new Date())
      if (!this.isAdd) {
        const responseData = res[1]
        await this.returnReponseData(responseData)
        this.returnFileList(responseData)
        this.loading = false
      }
    })
  },
  methods: {
    ...mapActions(['getConstant']),
    async returnFileList(responseData) {
      const { approvalNo } = this.ruleForm
      const data = await this.fetchFormFileList(['contract', 'settlementBook'], approvalNo)
      this.contractList = data[0]
      this.deepContractList = data[0]
      this.settlementBookList = data[1]
      this.deepSettlementBookList = data[1]
      if (this.isEdit) {
        this.editGeneratorNo(this.ruleForm.approvalStatus, 'state')
      }
    },
    async returnReponseData(responseData) {
      await this.formatterResponseConent(responseData, 'contract')
      // 暂时放入sessionStorage
      sessionStorage.setItem('constructionUnit', this.ruleForm.signUnitName)
      sessionStorage.setItem('contactFormData', JSON.stringify({
        handlingPersonId: this.ruleForm.handlingPersonId,
        handlingOrgId: this.ruleForm.handlingOrgId
      }))
    },
    async fetchVersionDetail() {
      const { data } = await sonContractVersionDetails(this.currentRow.id, this.currentRow.revisionNumber
      )
      return data
    },
    async fetchDetail() {
      const { data: data } = await otherContractDetails(this.currentRow.id)
      return data
    },
    // 请求数据字典
    async initDictionaries() {
      const dictionariesList = [
        'generateNo', // 审批单号
        'EffectiveState', // 生效状态
        'userOrganization', // 发起组织
        'ContractCategory', // 合同类别
        'BalanceType', // 收支类型
        'contractState', // 合同状态
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
      await this.getConstant(dictionariesList)
    },
    getParams() {
      const params = {
        ...this.ruleForm,
        contractId: this.contractId,
        subType: '06',
        Loading: true
      }
      params['handlingOrgId'] = params['handlingOrgId'].toString()
      if (this.isEdit) {
        params['subModificationRecordDTO'] = this.formatterRequestConent()
      }
      return params
    },
    async onSaveFormData(type) {
      const params = this.getParams()
      const map = {
        add: otherContractSave,
        edit: otherContractEdit
      }
      const pageType = this.isAdd ? 'add' : 'edit'
      const saveType = type === 'save' ? 0 : 1
      const methodName = map[pageType]
      await methodName(params, saveType)
      this.onCancel()
    },
    onSave() {
      this.$refs['ruleForm'].validate(boolean => {
        if (boolean) {
          this.onSaveFormData('save')
        }
      })
    },
    onSubmit() {
      this.$refs['ruleForm'].validate(boolean => {
        if (boolean) {
          this.onSaveFormData('submit')
        }
      })
    },
    onCancel() {
      this.$emit('changeState', 'otherMainList')
    }
  }
}
</script>

<style lang="less" scoped>
.sign-other-info {
   .title{
    text-align: center;
    margin:10px 0;
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
.sign-other-info {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
}
</style>
