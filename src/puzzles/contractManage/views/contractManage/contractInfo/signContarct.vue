<template>
  <div class="sign-info">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
      class="constrack-ruleForm"
    >
      <el-form-item label="工程名称" class="fill-in-row" prop="name">
        <el-input
          v-model.trim="ruleForm.name"
          :placeholder="getPlaceHolder('工程名称')"
          :maxlength="100"
          :disabled="isLook"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'name', value: val, name: '工程名称'})}"
        />
      </el-form-item>

      <el-form-item label="收支类型" prop="balanceType">
        <el-select
          v-model="ruleForm.balanceType"
          :disabled="isLook"
          :placeholder="getPlaceHolder('收支类型', 1)"
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

      <el-form-item label="合同金额" prop="amount">
        <amount-input
          v-model="ruleForm.amount"
          :disabled="isLook"
          clearable
          :placeholder="getPlaceHolder('合同金额')"
          @blur="amountInputBlur('amount')"
          @change="(val) => {handlerChange({type: 'input', formName: 'amount', value: val, name: '合同金额', selectOptions: {suf: '元'} })}"
        />
      </el-form-item>

      <el-form-item label="结算金额" prop="settlementAmount">
        <amount-input
          v-model="ruleForm.settlementAmount"
          :disabled="true"
          :placeholder="getPlaceHolder('结算金额')"
          clearable
          @blur="amountInputBlur('settlementAmount')"
          @change="(val) => {handlerChange({type: 'input', formName: 'settlementAmount', value: val, name: '结算金额', selectOptions: {suf: '元'}})}"
        />
      </el-form-item>

      <el-form-item label="工程地点" prop="projectSite">
        <el-cascader
          v-model="ruleForm.projectSite"
          :options="projectPlaceOptions"
          :disabled="isLook"
          :props="{
            expandTrigger: 'hover',
            value: 'id',
            label: 'zh',
            children: 'children'
          }"
          :placeholder="getPlaceHolder('工程地点', 1)"
          clearable
          @change="(val) => {handlerChange({type: 'cascader', formName: 'projectSite',
                                            selectOptions: {code: 'id', name: 'zh'},
                                            selectData: 'projectPlaceOptions', value: val, name: '工程地点'})}"
        />
      </el-form-item>

      <el-form-item class="residue-row" label="详细地址" prop="projectAddress">
        <el-input
          v-model="ruleForm.projectAddress"
          :disabled="isLook"
          :placeholder="getPlaceHolder('详细地址')"
          clearable
          :maxlength="50"
          @change="(val) => {handlerChange({type: 'input', formName: 'projectAddress', value: val, name: '详细地址'})}"
        />
      </el-form-item>

      <el-form-item label="建设单位" prop="constructionUnit">
        <el-input
          v-model.trim="ruleForm.constructionUnit"
          :disabled="isLook"
          :maxlength="20"
          :placeholder="getPlaceHolder('建设单位')"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'constructionUnit', value: val, name: '建设单位'})}"
        />
      </el-form-item>

      <el-form-item label="建设单位联系人" prop="contactPerson">
        <el-input
          v-model.trim="ruleForm.contactPerson"
          :disabled="isLook"
          :placeholder="getPlaceHolder('建设单位联系人')"
          :maxlength="20"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'contactPerson', value: val, name: '建设单位联系人'})}"
        />
      </el-form-item>

      <el-form-item label="建设单位联系电话" prop="contactPersonTel">
        <el-input
          v-model.trim="ruleForm.contactPersonTel"
          :disabled="isLook"
          :placeholder="getPlaceHolder('建设单位联系电话')"
          :maxlength="11"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'contactPersonTel', value: val, name: '建设单位联系电话'})}"
        />
      </el-form-item>

      <el-form-item label="设计单位" prop="designUnit">
        <el-input
          v-model.trim="ruleForm.designUnit"
          :disabled="isLook"
          :maxlength="20"
          :placeholder="getPlaceHolder('设计单位')"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'designUnit', value: val, name: '设计单位'})}"
        />
      </el-form-item>

      <el-form-item label="监理单位" prop="controlUnit">
        <el-input
          v-model.trim="ruleForm.controlUnit"
          :disabled="isLook"
          :placeholder="getPlaceHolder('监理单位')"
          :maxlength="50"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'controlUnit', value: val, name: '监理单位'})}"
        />
      </el-form-item>

      <el-form-item label="工程规模" prop="projectScale">
        <el-cascader
          v-model="ruleForm.projectScale"
          :disabled="isLook"
          :placeholder="getPlaceHolder('工程规模', 1)"
          :options="projectScaleOptions"
          :props="{ checkStrictly: true, value: 'code', label: 'name' }"
          clearable
          @change="(val) => {handlerChange({type: 'cascader', formName: 'projectScale',
                                            selectOptions: {code: 'code', name: 'name'},
                                            selectData: 'projectScaleOptions', value: val, name: '工程规模'})}"
        />
      </el-form-item>

      <el-form-item label="合同状态" prop="state">
        <el-select
          v-model="ruleForm.state"
          :disabled="isLook"
          :placeholder="getPlaceHolder('合同状态', 1)"
          clearable
          @change="handleChangeState(val)"
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
          :placeholder="getPlaceHolder('归档日期', 1)"
          type="date"
          :disabled="disabledFilingDate || isLook"
          clearable
          @change="(val) => {handlerChange({type: 'date', formName: 'filingDate', value: val, name: '归档日期'})}"
        />
      </el-form-item>

      <el-form-item label="工程状态" prop="projectState">
        <el-select
          v-model="ruleForm.projectState"
          clearable
          :placeholder="getPlaceHolder('工程状态', 1)"
          :disabled="true"
          @change="(val) => {handlerChange({type: 'select', formName: 'projectState', selectData: 'projectStatusList',selectOptions: {code: 'code', name: 'name'}, value: val, name: '工程状态'})}"
        >
          <el-option
            v-for="item in projectStatusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="开工日期" prop="startDate">
        <el-date-picker
          v-model="ruleForm.startDate"
          clearable
          type="date"
          :picker-options="pickerDateBefore"
          :placeholder="getPlaceHolder('开工日期', 1)"
          :disabled="isLook"
          @change="(val) => { handleUpdateStartDate(val,true)}"
        />
      </el-form-item>

      <el-form-item label="竣工日期" prop="endDate">
        <el-date-picker
          v-model="ruleForm.endDate"
          clearable
          :picker-options="pickerDateAfter"
          type="date"
          :placeholder="getPlaceHolder('竣工日期', 1)"
          :disabled="isLook"
          @change="(val) => { handleUpdateEndDate(val,true)}"
        />
      </el-form-item>

      <el-form-item label="绝对工期" prop="absolutePeriod">
        <el-input
          v-model.trim="ruleForm.absolutePeriod"
          :disabled="isLook"
          :maxlength="4"
          :placeholder="getPlaceHolder('绝对工期')"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'absolutePeriod', value: val, name: '绝对工期',selectOptions:{suf:'天'}})}"
        />
      </el-form-item>

      <el-form-item label="建筑用途" prop="buildingUse">
        <el-input
          v-model.trim="ruleForm.buildingUse"
          :disabled="isLook"
          :placeholder="getPlaceHolder('建筑用途')"
          :maxlength="20"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'buildingUse', selectOptions: {code: 'code', name: 'name'}, value: val, name: '建筑用途'})}"
        />
      </el-form-item>

      <el-form-item label="结构类型" prop="structureType">
        <el-select
          v-model="ruleForm.structureType"
          :disabled="isLook"
          :placeholder="getPlaceHolder('结构类型', 1)"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'structureType',
              value: val,
              name: '结构类型',
              selectOptions: {code: 'code', name: 'name'},
              selectData:'structureTypeList'
            })
          }"
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
          :disabled="isLook"
          :maxlength="4"
          :placeholder="getPlaceHolder('建筑面积')"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'buildArea', value: val, name: '建筑面积',selectOptions:{suf:'m²'}})}"
        >
          <template slot="append">m²</template>
        </el-input>
      </el-form-item>

      <el-form-item label="是否备案" prop="isRecord">
        <el-select
          v-model.trim="ruleForm.isRecord"
          :disabled="isLook"
          :placeholder="getPlaceHolder('是否备案', 1)"
          clearable
          @change="(val) => {handlerChange({type: 'select', formName: 'isRecord', value: val, selectOptions: {code: 'code', name: 'name'}, name: '是否备案',selectData:'switchList'})}"
        >
          <el-option
            v-for="item in switchList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="是否有施工许可证" prop="isConstructionPermit">
        <el-select
          v-model="ruleForm.isConstructionPermit"
          :disabled="isLook"
          :placeholder="getPlaceHolder('是否有施工许可证', 1)"
          clearable
          @change="(val) => {handlerChange({type: 'select', formName: 'isConstructionPermit', selectOptions: {code: 'code', name: 'name'}, value: val, name: '是否有施工许可证',selectData:'switchList'})}"
        >
          <el-option
            v-for="item in switchList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="是否有中标通知书" prop="isBidNotice">
        <el-select
          v-model="ruleForm.isBidNotice"
          :disabled="isLook"
          :placeholder="getPlaceHolder('是否有中标通知书', 1)"
          clearable
          @change="(val) => {handlerChange({type: 'select', formName: 'isBidNotice', selectOptions: {code: 'code', name: 'name'}, value: val, name: '是否有中标通知书',selectData:'switchList'})}"
        >
          <el-option
            v-for="item in switchList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item v-if="contractIsLaw" label="合同备案号" prop="recordNumber">
        <el-input
          v-model="ruleForm.recordNumber"
          :maxlength="20"
          :disabled="isLook"
          :placeholder="getPlaceHolder('合同备案号')"
          clearable
          @change="(val) => {handlerChange({type: 'input', formName: 'recordNumber', value: val, name: '合同备案号'})}"
        />
      </el-form-item>

      <el-form-item
        v-if="contractIsLicence"
        label="施工许可证号"
        prop="constructionPermitNo"
        class="residue-row"
      >
        <el-input
          v-model="ruleForm.constructionPermitNo"
          :disabled="isLook"
          :placeholder="getPlaceHolder('施工许可证号')"
          :maxlength="20"
          clearable
          class="half"
          @change="(val) => {handlerChange({type: 'input', formName: 'constructionPermitNo', value: val, name: '施工许可证号'})}"
        />
      </el-form-item>

      <el-form-item label="合同">
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

      <el-form-item label="施工许可证">
        <el-upload
          :file-list="constructionPermitList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'constructionPermitList', {name: '施工许可证', record: true, children: true, formName: 'content' })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'constructionPermitList', {name: '施工许可证', record: true, children: true, formName: 'content' })}"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
          :disabled="isLook"
        >
          <el-button type="primary" :disabled="isLook" @click="handleUploadEngFile('constructionPermit')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="中标通知书">
        <el-upload
          :file-list="winBidBookList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'winBidBookList', {name: '中标通知书', record: true, children: true, formName: 'content' })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'winBidBookList', {name: '中标通知书', record: true, children: true, formName: 'content' })}"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :disabled="isLook"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="isLook" @click="handleUploadEngFile('winBidBook')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="isLook" label="结算书">
        <el-upload
          :file-list="settlementBookList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'settlementBookList', {name: '结算书', record: true, children: true, formName: 'content' })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'settlementBookList', {name: '结算书', record: true, children: true, formName: 'content' })}"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :disabled="isLook"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="isLook" @click="handleUploadEngFile('settlementBook')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="工程概况" class="fill-in-row row-label">
        <el-input
          v-model.trim="ruleForm.projectOverview"
          type="textarea"
          :rows="3"
          :placeholder="getPlaceHolder('工程概况')"
          :disabled="isLook"
          clearable
          :maxlength="255"
          @change="(val) => {handlerChange({type: 'input', formName: 'projectOverview', value: val, name: '工程概况'})}"
        />
      </el-form-item>

      <el-form-item label="工程范围" class="fill-in-row row-label">
        <el-input
          v-model.trim="ruleForm.projectScope"
          type="textarea"
          :rows="3"
          :placeholder="getPlaceHolder('工程范围')"
          :disabled="isLook"
          clearable
          :maxlength="255"
          @change="(val) => {handlerChange({type: 'input', formName: 'projectScope', value: val, name: '工程范围'})}"
        />
      </el-form-item>

      <el-form-item label="合同备注" class="fill-in-row row-label">
        <el-input
          v-model.trim="ruleForm.remark"
          type="textarea"
          :rows="3"
          :placeholder="getPlaceHolder('合同备注')"
          :disabled="isLook"
          clearable
          :maxlength="255"
          @change="(val) => {handlerChange({type: 'input', formName: 'remark', value: val, name: '合同备注'})}"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateLength, validatePhone, validateLandline } from '@core/utils/validate'
import childrenMixins from './mixins/children.js'
import formUpdateContext from '@core/mixins/formUpdateContext'
import upload from '@core/mixins/upload'
export default {
  name: 'SignInfo',
  mixins: [upload, formUpdateContext, childrenMixins],
  props: {
    isLook: Boolean
  },
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
      contractList: [], // 合同List
      constructionPermitList: [], // 施工许可证
      noticeList: [], // 中标通知书
      settlementBookList: [], // 结算书
      deepContractList: [],
      deepConstructionPermitList: [],
      deepNoticeList: [],
      deepSettlementBookList: [],
      deepRuleForm: {},
      ruleForm: {
        name: '', // 工程名称 工程合同独有
        balanceType: '',
        amount: '', // 合同金额
        settlementAmount: '', // 结算金额
        projectSite: '', // 工程合同独有 工程地点
        projectAddress: '', // 工程合同独有 详细地址
        constructionUnit: '', // 建设单位
        contactPerson: '', // 建设单位联系人
        contactPersonTel: '', // 建设单位联系电话
        designUnit: '', // 设计单位
        controlUnit: '', // 监理单位
        projectScale: '', // 工程规模
        state: '', // 合同状态
        filingDate: '', // 归档日期
        projectState: '', // 工程状态
        startDate: '', // 开工日期
        endDate: '', // 结束工期
        absolutePeriod: '', // 绝对工期
        buildingUse: '', // 建筑用途
        structureType: '', // 结构类型
        buildArea: '', // 建筑面积
        isRecord: '', // 是否备案
        isConstructionPermit: '', // 是否有施工许可证
        isBidNotice: '', // 是否有中标通知书
        recordNumber: '', // 合同Id
        constructionPermitNo: '', // 施工许可证
        projectOverview: '', // 工程概况
        projectScope: '', // 工程范围
        remark: '' // 工程备注
      },
      statusList: [
        { label: '未生效', value: 0 },
        { label: '已生效', value: 1 },
        { label: '已生效', value: 3 }
      ],
      belongList: [],
      companyList: [],
      typeList: [{ value: 0, label: '设计合同' }],
      categoryList: [
        {
          label: '新增',
          value: 0
        },
        {
          label: '变更',
          value: 1
        },
        {
          label: '续签',
          value: 2
        },
        {
          label: '终止',
          value: 3
        }
      ],
      rules: {
        balanceType: [
          {
            required: true,
            message: this.getPlaceHolder('收支类型', 1),
            trigger: 'change'
          }
        ],
        projectSite: [
          {
            required: true,
            message: this.getPlaceHolder('工程地点', 1),
            trigger: 'change'
          }
        ],
        constructionUnit: [
          {
            required: true,
            message: this.getPlaceHolder('建设单位'),
            trigger: 'blur'
          }
        ],
        approveId: [
          {
            required: true,
            message: this.getPlaceHolder('审批单号'),
            trigger: 'blue'
          }
        ],
        startOrg: [
          {
            required: true,
            message: this.getPlaceHolder('发起组织', 1),
            trigger: 'change'
          }
        ],
        id: [
          {
            required: true,
            message: this.getPlaceHolder('合同编号'),
            trigger: 'change'
          }
        ],
        belong: [
          {
            required: true,
            message: this.getPlaceHolder('合同归属', 1),
            trigger: 'change'
          }
        ],
        absolutePeriod: [
          { validator: this.validateAbsolutePeriodFunc(), trigger: 'blur' }
        ],
        company: [
          {
            required: true,
            message: this.getPlaceHolder('归属单位', 1),
            trigger: 'change'
          }
        ],
        type: [
          {
            required: true,
            message: this.getPlaceHolder('合同类型', 1),
            trigger: 'change'
          }
        ],
        category: [
          {
            required: true,
            message: this.getPlaceHolder('合同类别', 1),
            trigger: 'change'
          }
        ],
        date: [
          {
            required: true,
            message: this.getPlaceHolder('签订日期', 1),
            trigger: 'change'
          }
        ],
        buildArea: [
          {
            validator: this.validateAreaNo,
            trigger: 'blur'

          },
          validateLength(0, 20)
        ],
        name: [
          {
            required: true,
            message: this.getPlaceHolder('工程名称'),
            trigger: 'change'
          },
          validateLength(0, 100)
        ],
        projectAddress: [validateLength(0, 50)],
        amount: [
          {
            required: true,
            message: this.getPlaceHolder('合同金额'),
            trigger: 'blur'
          },
          { required: true, validator: this.validtorMoney, trigger: 'blur' }
        ],
        settlementAmount: [
          { validator: this.validtorMoneyZero, trigger: 'blur' }
        ],
        state: [
          {
            required: true,
            message: this.getPlaceHolder('合同状态', 1),
            trigger: 'change'
          }
        ],
        isRecord: [
          {
            required: true,
            message: '请选择是否备案',
            trigger: 'change'
          }
        ],
        isConstructionPermit: [
          {
            required: true,
            message: '请选择是否有施工许可证',
            trigger: 'change'
          }
        ],
        isBidNotice: [
          {
            required: true,
            message: '请选择是否有中标通知书',
            trigger: 'change'
          }
        ],
        recordNumber: [
          { required: true, message: '请输入合同备案号', trigger: 'blur' },
          validateLength(0, 20)
        ],
        constructionPermitNo: [
          { required: true, message: '请输入施工许可证号', trigger: 'blur' },
          validateLength(0, 20)
        ],
        contactPerson: [validateLength(0, 20)],
        contactPersonTel: [validateLength(0, 11), { validator: validPhone, trigger: 'blur' }],
        controlUnit: [validateLength(0, 50)],

        projectOverview: [validateLength(0, 100)],
        projectScope: [validateLength(0, 100)],
        remark: [validateLength(0, 100)]
      }
    }
  },
  methods: {
    async initPraviteDictionares() {
      await this.getConstant(this.engineerDesignDictionares)
    }

  }
}
</script>

<style scoped lang="less">
.sign-info {
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
        width: calc(50% - 70px);
      }
    }
  }
  .btn {
    width: 200px;
    margin: 10px auto;
  }
}
</style>
