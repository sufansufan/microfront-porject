<template>
  <div class="other-contract">
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-width="180px"
      class="constrack-ruleForm"
    >
      <el-form-item label="合同名称" prop="name" class="fill-in-row">
        <el-input
          v-model.trim="ruleForm.name"
          :disabled="isLook"
          clearable
          :maxlength="100"
          :placeholder="getPlaceHolder('合同名称')"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'name',
                value: val,
                name: '合同名称',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item label="收支类型" prop="balanceType">
        <el-select
          v-model="ruleForm.balanceType"
          clearable
          :disabled="isLook"
          :placeholder="getPlaceHolder('收支类型', 1)"
          @change="
            (val) => {
              handlerChange({
                type: 'select',
                formName: 'balanceType',
                selectData: 'collectTypeList',
                selectOptions: { code: 'code', name: 'name' },
                value: val,
                name: '收支类型',
              });
            }
          "
        >
          <el-option
            v-for="item in collectTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="合同金额" prop="amount">
        <amount-input
          v-model="ruleForm.amount"
          :disabled="isLook"
          :placeholder="getPlaceHolder('合同金额')"
          @blur="amountInputBlur('amount')"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'amount',
                value: val,
                name: '合同金额',
                selectOptions:{suf:'元'}
              });
            }
          "
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
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'settlementAmount',
                value: val,
                name: '结算金额',
              });
            }
          "
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="签订单位" prop="signUnitName">
        <el-input
          v-model.trim="ruleForm.signUnitName"
          clearable
          :maxlength="50"
          :disabled="isLook"
          :placeholder="getPlaceHolder('签订单位')"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'signUnitName',
                value: val,
                name: '签订单位',
              });
            }
          "
        />
      </el-form-item>
      <el-form-item label="联系人" prop="contactPerson">
        <el-input
          v-model.trim="ruleForm.contactPerson"
          clearable
          :disabled="isLook"
          :placeholder="getPlaceHolder('联系人')"
          :maxlength="20"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'contactPerson',
                value: val,
                name: '联系人',
              });
            }
          "
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="contactPersonTel">
        <el-input
          v-model.trim="ruleForm.contactPersonTel"
          clearable
          :disabled="isLook"
          :placeholder="getPlaceHolder('联系电话')"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'contactPersonTel',
                value: val,
                name: '联系电话',
              });
            }
          "
        />
      </el-form-item>
      <el-form-item
        label="关联合同编号"
        prop="relationContractNo"
        class="relationContract-id"
      >
        <el-input
          v-model.trim="ruleForm.relationContractNo"
          clearable
          :disabled="true"
          :placeholder="getPlaceHolder('关联合同编号')"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'relationContractNo',
                value: val,
                name: '关联合同编号',
              });
            }
          "
        >
          <template slot="append">
            <span
              class="el-icon-search relation-contract"
              @click="openRelationDialog"
            />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="关联合同名称" prop="relationContractName">
        <el-input
          v-model.trim="ruleForm.relationContractName"
          clearable
          :disabled="true"
          :maxlength="100"
          :placeholder="getPlaceHolder('关联合同名称')"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'relationContractName',
                value: val,
                name: '关联合同名称',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item label="关联合同金额" prop="relationContractAmount">
        <amount-input
          v-model.trim="ruleForm.relationContractAmount"
          :disabled="true"
          :placeholder="getPlaceHolder('关联合同金额')"
          @blur="amountInputBlur"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'relationContractAmount',
                value: val,
                name: '关联合同金额',
                selectOptions: {
                  suf: '元'
                }
              });
            }
          "
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="联系地址" prop="contactAddress" class="residue-row">
        <el-input
          v-model.trim="ruleForm.contactAddress"
          :maxlength="50"
          class="half"
          :disabled="isLook"
          :placeholder="getPlaceHolder('联系地址')"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'contactAddress',
                value: val,
                name: '联系地址',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item label="协议期限" prop="agreementTerm">
        <el-input
          v-model.trim="ruleForm.agreementTerm"
          clearable
          :disabled="isLook"
          :maxlength="4"
          :placeholder="getPlaceHolder('协议期限')"
          @change="(val) => {handlerChange({type: 'input', formName: 'agreementTerm', value: val, name: '协议期限',selectOptions:{suf:'月'}})}"
        >
          <tempalte slot="append">月</tempalte>
        </el-input>
      </el-form-item>

      <el-form-item label="合同状态" prop="state">
        <el-select
          v-model="ruleForm.state"
          clearable
          :disabled="isLook"
          :placeholder="getPlaceHolder('合同状态',1)"
          @change="handleChangeState"
        >
          <el-option
            v-for="item in contractStatusList"
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
          :disabled="disabledFilingDate || isLook"
          :placeholder="getPlaceHolder('归档日期', 1)"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'date',
                formName: 'filingDate',
                value: val,
                name: '归档日期',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item label="签订地点" prop="signPlace">
        <el-input
          v-model.trim="ruleForm.signPlace"
          :maxlength="50"
          :disabled="isLook"
          :placeholder="getPlaceHolder('签订地点')"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'signPlace',
                value: val,
                name: '签订地点',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item
        label="合作内容(技术、资源等)"
        class="fill-in-row row-label"
        prop="cooperationContent"
      >
        <el-input
          v-model.trim="ruleForm.cooperationContent"
          type="textarea"
          :disabled="isLook"
          :placeholder="getPlaceHolder('合作内容(技术、资源等)')"
          :maxlength="255"
          :rows="3"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'cooperationContent',
                value: val,
                name: '合作内容',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item label="合同">
        <el-upload
          :file-list="contractList"
          :action="actionUrl"
          :on-success="
            (response, file, fileList) => {
              uploadMoreSuccess(fileList, 'contractList', {
                name: '合同',
                record: true,
                children: true,
                formName: 'content',
              });
            }
          "
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="
            (file, fileList) => {
              handleRemove(file, fileList, 'contractList', {
                name: '合同',
                record: true,
                children: true,
                formName: 'content',
              });
            }
          "
          :before-upload="beforeUpload50M"
          :disabled="isLook"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button
            type="primary"
            :disabled="isLook"
            @click="handleUploadEngFile('contract')"
          ><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>
      <!-- && settlementBookList.length > 0 -->
      <el-form-item
        v-if="isLook"
        label="结算书"
      >
        <el-upload
          :file-list="settlementBookList"
          :action="actionUrl"
          :on-success="
            (response, file, fileList) => {
              uploadMoreSuccess(fileList, 'settlementBookList', {
                name: '结算书',
                record: true,
              });
            }
          "
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="
            (file, fileList) => {
              handleRemove(file, fileList, 'settlementBookList', {
                name: '结算书',
                record: true,
                children: true,
                formName: 'content',
              });
            }
          "
          :before-upload="beforeUpload50M"
          :disabled="isLook"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button
            type="primary"
            :disabled="isLook"
            @click="handleUploadEngFile('settlementBook')"
          ><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item
        label="合同备注"
        prop="remark"
        class="fill-in-row row-label"
      >
        <el-input
          v-model.trim="ruleForm.remark"
          :disabled="isLook"
          :placeholder="getPlaceHolder('合同备注')"
          type="textarea"
          :maxlength="255"
          :rows="3"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'remark',
                value: val,
                name: '工程备注',
              });
            }
          "
        />
      </el-form-item>
    </el-form>

    <relation-dialog
      v-if="isShowDialog"
      :show.sync="isShowDialog"
      @referRelationContract="referRelationContract"
    />
  </div>
</template>

<script>
import { validateLength, validateLandline, validatePeriod } from '@core/utils/validate'
import upload from '@core/mixins/upload'
import childrenMixins from './mixins/children.js'
import formUpdateContext from '@core/mixins/formUpdateContext'
import RelationDialog from './components/RelationDialog'

export default {
  name: 'OtherInfo',
  components: {
    RelationDialog
  },
  mixins: [childrenMixins, upload, formUpdateContext],
  data() {
    const validPhone = (rule, value, callback) => {
      if (!validateLandline(value) && value !== '') {
        callback(new Error('请输入正确的手机号码或者座机'))
      } else {
        callback()
      }
    }
    const integer = (rule, value, callback) => {
      if (value === '' || value === null) callback()
      if (!validatePeriod(value)) {
        callback(new Error('只能输入大于0的整数'))
      } else {
        callback()
      }
    }
    // const validateTerm = (rule, value, callback) => {
    //   if (!validateInteger(value) && value !== '') {
    //     callback(new Error('请输入大于0的整数'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      isShowDialog: false, // 是否显示关联合同dialog
      ruleForm: {
        name: '', // 合同名称
        balanceType: '', // 收支类型
        amount: '', // 合同金额
        settlementAmount: '', // 结算金额
        signUnitName: '', // 签订单位
        contactPerson: '', // 联系人
        contactPersonTel: '', // 联系电话
        agreementTerm: '', // 协议期限
        relationContractId: '', // 关联合同编号
        relationContractName: '', // 关联合同名称
        relationContractNo: '', // 关联合同编号
        relationContractAmount: '', // 关联合同金额
        contactAddress: '', // ；联系地址
        state: '', // 合同状态
        filingDate: '', // 归档日期
        signPlace: '', // 签订地点
        cooperationContent: '', // 合同内容
        remark: '' // 备注
      },
      rules: {
        agreementTerm: [
          { validator: integer, trigger: 'blur' }
        ],
        signPlace: [validateLength(0, 50)],
        name: [
          {
            required: true,
            message: '请输入合同名称',
            trigger: 'blur'
          },
          validateLength(0, 100)
        ],
        balanceType: [
          {
            required: true,
            message: '请选择收支类型',
            trigger: 'change'
          }
        ],
        contactPerson: [validateLength(0, 20)],
        contactPersonTel: [
          { validator: validPhone, trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请输入合同金额', trigger: 'blur' },
          { validator: this.validtorMoney, trigger: 'blur' }
        ],
        settlementAmount: [
          { validator: this.validtorMoney, trigger: 'blur' }
        ],
        signUnitName: [
          { required: true, message: '请输入签订单位', trigger: 'blur' },
          validateLength(0, 50)
        ],
        // relationContractId: [
        //   { required: true, message: "请输入关联合同编号", trigger: "blur" },
        // ],
        relationContractName: [validateLength(0, 100)],
        contactAddress: [validateLength(0, 50)],
        state: [
          { required: true, message: '请选择合同状态', trigger: 'change' }
        ],
        cooperationContent: [validateLength(0, 255)],
        remark: [validateLength(0, 255)]
      },
      contractList: [],
      settlementBookList: [],
      deepSettlementBookList: [],
      deepContractFileList: []
    }
  },
  created() {
    this.deepRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
  },
  methods: {
    // 获取信息
    referRelationContract(row) {
      const { contractNumber, revisionNumber, name, amount, id } = row
      this.ruleForm.relationContractId = id
      this.ruleForm.relationContractNo = contractNumber
      this.ruleForm.relationContractVer = revisionNumber
      this.ruleForm.relationContractName = name
      this.ruleForm.relationContractAmount = amount
      this.handlerChange({
        type: 'input',
        formName: 'relationContractNo',
        value: contractNumber,
        name: '关联合同编号'
      })
      this.handlerChange({
        type: 'input',
        formName: 'relationContractName',
        value: name,
        name: '关联合同名称'
      })
      this.handlerChange({
        type: 'input',
        formName: 'relationContractAmount',
        value: amount,
        name: '关联合同金额',
        selectOptions: {
          suf: '元'
        }
      })
    },
    // 打开其他合同查询dialog
    openRelationDialog() {
      if (this.isLook) return
      this.isShowDialog = true
    },
    initPraviteDictionares() {
      // do nothing
    }
  }
}
</script>

<style scoped lang="less">
.other-contract {
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
        width: 100%;
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
.other-contract {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-cascader .el-input .el-input__inner {
    width: 100%;
  }
  .relationContract-id {
    .el-input-group__append {
      background: #0a4c8a;
      color:#fff;
    }
  }
}
</style>
