<template>
  <div class="engineer-info-office">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      class="constrack-ruleForm"
      label-width="140px"
    >
      <el-form-item class="fill-in-row" label="合同名称" prop="name">
        <el-input
          v-model.trim="ruleForm.name"
          :disabled="isLook"
          clearable
          :placeholder="getPlaceHolder('合同名称',)"
          :maxlength="100"
          @change="(val) => {handlerChange({type: 'input', formName: 'name', value: val, name: '合同名称'})}"
        />
      </el-form-item>

      <el-form-item label="收支类型" prop="balanceType">
        <el-select
          v-model="ruleForm.balanceType"
          :disabled="isLook"
          clearable
          :placeholder="getPlaceHolder('收支类型', 1)"
          @change="(val) => {handlerChange({type: 'select', formName: 'balanceType', selectData: 'collectTypeList',selectOptions: {code: 'code', name: 'name'}, value: val, name: '收支类型'})}"
        >
          <el-option
            v-for="item in collectTypeList"
            :key="item.code"
            :value="item.code"
            :label="item.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="合同金额" prop="amount">
        <amount-input
          v-model="ruleForm.amount"
          :disabled="isLook"
          :placeholder="getPlaceHolder('合同金额')"
          @blur="amountInputBlur('amount')"
          @change="(val) => {handlerChange({type: 'input', formName: 'amount', value: val, name: '合同金额',selectOptions:{suf:'元'}})}"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="结算金额" prop="settlementAmount">
        <amount-input
          v-model="ruleForm.settlementAmount"
          :disabled="true"
          :placeholder="getPlaceHolder('结算金额')"
          @blur="amountInputBlur('settlementAmount')"
          @change="(val) => {handlerChange({type: 'input', formName: 'settlementAmount', value: val, name: '结算金额'})}"
        >
          >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>
      <el-form-item label="签订单位" prop="signUnitName">
        <el-input
          v-model.trim="ruleForm.signUnitName"
          :disabled="isLook"
          :maxlength="50"
          clearable
          :placeholder="getPlaceHolder('签订单位')"
          @change="(val) => {handlerChange({type: 'input', formName: 'signUnitName', value: val, name: '签订单位'})}"
        />
      </el-form-item>

      <el-form-item label="联系人" prop="contactPerson">
        <el-input
          v-model="ruleForm.contactPerson"
          :disabled="isLook"
          clearable
          :maxlength="20"
          :placeholder="getPlaceHolder('联系人')"
          @change="(val) => {handlerChange({type: 'input', formName: 'contactPerson', value: val, name: '联系人'})}"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="contactPersonTel">
        <el-input
          v-model="ruleForm.contactPersonTel"
          :disabled="isLook"
          clearable
          :placeholder="getPlaceHolder('联系电话')"
          @change="(val) => {handlerChange({type: 'input', formName: 'contactPersonTel', value: val, name: '联系电话'})}"
        />
      </el-form-item>

      <el-form-item label="合同状态" prop="state">
        <el-select
          v-model="ruleForm.state"
          :disabled="isLook"
          clearable
          :placeholder="getPlaceHolder('合同状态', 1)"
          @change="handleChangeState(val)"
        >
          <el-option
            v-for="item in contractStatusList"
            :key="item.code"
            :value="item.code"
            :label="item.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="归档日期" prop="filingDate">
        <el-date-picker
          v-model="ruleForm.filingDate"
          :disabled="disabledFilingDate || isLook"
          clearable
          type="date"
          :placeholder="getPlaceHolder('归档日期', 1)"
          @change="(val) => {handlerChange({type: 'date', formName: 'filingDate', value: val, name: '归档日期'})}"
        />
      </el-form-item>

      <el-form-item label="签订地点" prop="signPlace">
        <el-input
          v-model="ruleForm.signPlace"
          :disabled="isLook"
          clearable
          :maxlength="50"
          :placeholder="getPlaceHolder('签订地点')"
          @change="(val) => {handlerChange({type: 'input', formName: 'signPlace', value: val, name: '签订地点'})}"
        />
      </el-form-item>

      <el-form-item label="起始日期" prop="startDate">
        <el-date-picker
          v-model="ruleForm.startDate"
          :disabled="isLook"
          clearable
          type="date"
          :picker-options="pickerBeginDateBefore"
          :placeholder="getPlaceHolder('起始日期', 1)"
          @change="(val) => { handleUpdateStartDate(val,true)}"
        />
      </el-form-item>
      <el-form-item label="到期日期" prop="endDate">
        <el-date-picker
          v-model="ruleForm.endDate"
          :disabled="isLook"
          clearable
          type="date"
          :picker-options="pickerBeginDateAfter"
          :placeholder="getPlaceHolder('到期日期', 1)"
          @change="(val) => { handleUpdateEndDate(val,true)}"
        />
      </el-form-item>

      <el-form-item label="有效期限" prop="validityTerm">
        <el-input
          v-model="ruleForm.validityTerm"
          :disabled="isLook"
          clearable
          :maxlength="4"
          :placeholder="getPlaceHolder('有效期限')"
          @change="(val) => {handlerChange({type: 'input', formName: 'validityTerm', value: val, name: '有效期限',selectOptions: { suf: '年'}})}"
        >
          <template slot="append">年</template>
        </el-input>
      </el-form-item>

      <el-form-item label="业务类型" prop="businessType">
        <el-select
          v-model="ruleForm.businessType"
          :disabled="isLook"
          clearable
          :placeholder="getPlaceHolder('业务类型', 1)"
          @change="(val) => {handlerChange({type: 'select', formName: 'businessType', selectData: 'professionalTypeList',selectOptions: {code: 'code', name: 'name'}, value: val, name: '业务类型'})}"
        >
          <el-option
            v-for="item in professionalTypeList"
            :key="item.code"
            :value="item.code"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="支付类别" prop="paymentCategory">
        <el-select
          v-model="ruleForm.paymentCategory"
          :disabled="isLook"
          clearable
          :placeholder="getPlaceHolder('支付类别', 1)"
          @change="(val) => {handlerChange({type: 'select', formName: 'paymentCategory', selectData: 'payTypeList',selectOptions: {code: 'code', name: 'name'}, value: val, name: '支付类别'})}"
        >
          <el-option
            v-for="item in payTypeList"
            :key="item.code"
            :value="item.code"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="押金金额" prop="depositAmount">
        <amount-input
          v-model="ruleForm.depositAmount"
          :disabled="isLook"
          :placeholder="getPlaceHolder('押金金额')"
          @blur="amountInputBlur('depositAmount')"
          @change="(val) => {handlerChange({type: 'input', formName: 'depositAmount', value: val, name: '押金金额',selectOptions:{suf:'元'}})}"
        />
      </el-form-item>

      <el-form-item label="合同" prop="file">

        <el-upload
          :file-list="contractList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'contractList', {name: '合同', record: true, children:true,formName: 'content' })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'contractList', {name: '合同', record: true, children: true, formName: 'content' })}"
          :before-upload="beforeUpload50M"
          :disabled="isLook"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="isLook" @click="handleUploadEngFile('contract')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="isLook" label="结算书" prop="file">
        <el-upload
          :file-list="settlementBookList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'settlementBookList', {name: '结算书', record: true })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'settlementBookList', {name: '结算书', record: true, children: true, formName: 'content' })}"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
          :disabled="isLook"
        >
          <el-button type="primary" :disabled="isLook" @click="handleUploadEngFile('settlementBook')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item
        class="fill-in-row row-label"
        label="合同备注"
        prop="remark"
      >
        <el-input
          v-model="ruleForm.remark"
          type="textarea"
          :rows="3"
          :maxlength="255"
          clearable
          :disabled="isLook"
          :placeholder="getPlaceHolder('合同备注')"
          @change="(val) => {handlerChange({type: 'input', formName: 'remark', value: val, name: '工程备注'})}"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateLength, validatePhone, validatePeriod, validateLandline } from '@core/utils/validate'
import childrenMixins from './mixins/children.js'
import formUpdateContext from '@core/mixins/formUpdateContext'
import upload from '@core/mixins/upload'
export default {
  name: 'OfficeInfo',
  mixins: [childrenMixins, formUpdateContext, upload],
  data() {
    const validPhone = (rule, value, callback) => {
      if (value === '') callback()
      if (validateLandline(value)) {
        callback()
      } else if (validatePhone(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号码或者座机'))
      }
    }

    const integer = (rule, value, callback) => {
      // if (value === '' || value === null) callback()
      if (value && !validatePeriod(value)) {
        callback(new Error('只能输入大于0的整数'))
      } else {
        callback()
      }
    }

    return {
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          const beginDateVal = this.ruleForm.endDate
          if (beginDateVal) {
            return time.getTime() > beginDateVal
          }
        }
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          const beginDateVal = this.ruleForm.startDate
          if (beginDateVal) {
            return time.getTime() < beginDateVal
          }
        }
      },
      contractList: [], // 合同
      settlementBookList: [], // 结算书
      deepContractList: [],
      deepSettlementBookList: [],
      deepRuleForm: {},
      ruleForm: {
        name: '', // 合同名称
        balanceType: '', // 收支类型
        amount: '', // 合同金额
        settlementAmount: '', // 结算金额
        signUnitName: '', // 签订单位
        contactPerson: '', // 联系人
        contactPersonTel: '', // 联系电话
        state: '', // 合同状态
        filingDate: '', // 归档日期
        signPlace: '', // 签订地点
        startDate: '', // 起始日期
        endDate: '', // 到期日期
        validityTerm: '', // 有效期限
        businessType: '', // 业务类型
        paymentCategory: '', // 支付类别
        depositAmount: '', // 押金金额
        content: [] // 修改内容
      },
      rules: {
        amount: [
          { required: true, message: '请输入合同金额', trigger: 'blur' },
          { required: true, validator: this.validtorMoney, trigger: 'blur' }
        ],
        settlementAmount: [
          { validator: this.validtorMoney, trigger: 'blur' }
        ],
        paymentCategory: [
          { required: true, message: '请选择支付类别', trigger: 'change' }
        ],
        validityTerm: [
          { validator: integer, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入合同名称', trigger: 'blur' },
          validateLength(0, 100)
        ],
        balanceType: [
          { required: true, message: '请选择收支类型', trigger: 'change' }
        ],
        signUnitName: [
          { required: true, message: '请输入签订单位', trigger: 'change' },
          validateLength(0, 50)
        ],
        signPlace: [
          validateLength(0, 50)
        ],
        state: [
          { required: true, message: '请选择合同状态', trigger: 'change' }
        ],
        contactPerson: [validateLength(0, 20)],
        contactPersonTel: [{ validator: validPhone, trigger: 'blur' }],
        remark: [validateLength(0, 255)],
        depositAmount: [
          { validator: this.validtorMoneyZero, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    professionalTypeList() {
      return this.constant.ContractBusinessType
    },
    payTypeList() {
      return this.constant.PaymentClass
    }
  },
  methods: {
    async initPraviteDictionares() {
      await this.getConstant(this.officeDictionares)
      this.ruleForm.state = '01'
    },
    handlerChange(val) {
      const row = this.formUpdateContext(val)
      this.$emit('getChangeUploadContext', row, 'content')
    }
  }
}
</script>
<style lang="less" scoped>
.engineer-info-office {
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
}
</style>
<style lang="less">
.engineer-info-office {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-cascader .el-input .el-input__inner {
    width: 100%;
  }
}
</style>
