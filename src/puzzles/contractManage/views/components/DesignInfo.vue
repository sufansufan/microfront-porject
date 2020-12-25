<template>
  <div class="sign-info">
    <el-form
      ref="ruleForm"
      v-loading="loading"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
      class="constrack-ruleForm"
    >
      <el-form-item label="审批单号" prop="approvalNo">
        <el-input
          v-model="ruleForm.approvalNo"
          readonly
          :disabled="disabled"
          :maxlength="18"
        />
      </el-form-item>

      <el-form-item label="发起组织" prop="startOrgId">
        <el-select
          v-model="ruleForm.startOrgId"
          :placeholder="getPlaceHolder('发起组织', 1)"
          :disabled="disabled"
          clearable
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
          :placeholder="getPlaceHolder('生效状态', 1)"
          :disabled="disabled"
          clearable
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
          :placeholder="getPlaceHolder('合同编号')"
          :maxlength="20"
          clearable
        />
      </el-form-item>

      <el-form-item label="合同归属" prop="attribution">
        <el-select
          v-model="ruleForm.attribution"
          :placeholder="getPlaceHolder('合同归属', 1)"
          :disabled="disabled"
          clearable
        >
          <el-option
            v-for="item in ContractAttributionList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="归属单位" prop="belongOrgId">
        <el-select
          v-model="ruleForm.belongOrgId"
          :placeholder="getPlaceHolder('归属单位', 1)"
          :disabled="disabled"
          clearable
        >
          <el-option
            v-for="item in companyList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="合同类型" prop="type">
        <el-select
          v-model="ruleForm.type"
          :disabled="disabled"
          :placeholder="getPlaceHolder('合同类型', 1)"
          clearable
        >
          <el-option
            v-for="item in typeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="合同类别" prop="category">
        <el-select
          v-model="ruleForm.category"
          :placeholder="getPlaceHolder('合同类别', 1)"
          :disabled="disabled"
          clearable
        >
          <el-option
            v-for="item in categoryList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="签订日期" prop="signDate">
        <el-date-picker
          v-model.trim="ruleForm.signDate"
          :placeholder="getPlaceHolder('签订日期', 1)"
          :disabled="disabled"
          type="date"
          clearable
        />
      </el-form-item>

      <el-form-item label="工程名称" class="fill-in-row" prop="name">
        <el-input
          v-model.trim="ruleForm.name"
          :placeholder="getPlaceHolder('工程名称')"
          :disabled="disabled"
          :maxlength="100"
          clearable
        />
      </el-form-item>

      <el-form-item label="收支类型" prop="balanceType">
        <el-select
          v-model="ruleForm.balanceType"
          :placeholder="getPlaceHolder('收支类型', 1)"
          clearable
          :disabled="disabled"
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
          v-model.trim="ruleForm.amount"
          :disabled="disabled"
          :placeholder="getPlaceHolder('合同金额')"
          clearable
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="结算金额" prop="settlementAmount">
        <amount-input
          v-model.trim="ruleForm.settlementAmount"
          :disabled="settleDisabled"
          :placeholder="getPlaceHolder('结算金额')"
          clearable
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="工程地点" prop="projectSite">
        <!-- 工程地点 -->
        <el-cascader
          v-model="ruleForm.projectSite"
          :disabled="disabled"
          :options="projectPlaceOptions"
          :props="{
            expandTrigger: 'hover',
            value: 'id',
            label: 'zh',
            children: 'children'
          }"
          :placeholder="getPlaceHolder('工程地点', 1)"
          clearable
        />
      </el-form-item>

      <el-form-item class="residue-row" label="详细地址" prop="projectAddress">
        <el-input
          v-model.trim="ruleForm.projectAddress"
          :maxlength="50"
          :placeholder="getPlaceHolder('详细地址')"
          :disabled="disabled"
          clearable
        />
      </el-form-item>

      <el-form-item label="建设单位" prop="constructionUnit">
        <el-input
          v-model.trim="ruleForm.constructionUnit"
          :placeholder="getPlaceHolder('建设单位')"
          :maxlength="20"
          :disabled="disabled"
          clearable
        />
      </el-form-item>

      <el-form-item label="建设单位联系人" prop="contactPerson">
        <el-input
          v-model.trim="ruleForm.contactPerson"
          :placeholder="getPlaceHolder('建设单位联系人')"
          :disabled="disabled"
          clearable
          :maxlength="20"
        />
      </el-form-item>

      <el-form-item label="建设单位联系电话" prop="contactPersonTel">
        <el-input
          v-model.trim="ruleForm.contactPersonTel"
          :placeholder="getPlaceHolder('建设单位联系电话')"
          :disabled="disabled"
          :maxlength="11"
          clearable
        />
      </el-form-item>

      <el-form-item label="设计单位" prop="designUnit">
        <el-input
          v-model.trim="ruleForm.designUnit"
          :placeholder="getPlaceHolder('设计单位')"
          :maxlength="20"
          :disabled="disabled"
          clearable
        />
      </el-form-item>

      <el-form-item label="监理单位" prop="controlUnit">
        <el-input
          v-model="ruleForm.controlUnit"
          :placeholder="getPlaceHolder('监理单位')"
          :maxlength="20"
          :disabled="disabled"
          clearable
        />
      </el-form-item>

      <el-form-item label="工程规模" prop="projectScale">
        <el-cascader
          v-model="ruleForm.projectScale"
          :placeholder="getPlaceHolder('工程规模', 1)"
          :disabled="disabled"
          :options="projectScaleOptions"
          :props="{ checkStrictly: true, value: 'code', label: 'name' }"
          clearable
        />
      </el-form-item>

      <el-form-item label="合同状态" prop="state">
        <el-select
          v-model="ruleForm.state"
          :placeholder="getPlaceHolder('合同状态', 1)"
          clearable
          :disabled="disabled"
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
          :placeholder="getPlaceHolder('归档日期', 1)"
          :disabled="disabled"
        />
      </el-form-item>

      <el-form-item label="工程状态" prop="projectState">
        <el-select
          v-model="ruleForm.projectState"
          :placeholder="getPlaceHolder('工程状态', 1)"
          :disabled="disabled"
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
          :placeholder="getPlaceHolder('开工日期', 1)"
          type="date"
          :disabled="disabled"
          clearable
        />
      </el-form-item>

      <el-form-item label="竣工日期" prop="endDate">
        <el-date-picker
          v-model="ruleForm.endDate"
          :placeholder="getPlaceHolder('竣工日期', 1)"
          type="date"
          :disabled="disabled"
          clearable
        />
      </el-form-item>

      <el-form-item label="绝对工期" prop="absolutePeriod">
        <el-input
          v-model="ruleForm.absolutePeriod"
          :placeholder="getPlaceHolder('绝对工期')"
          :disabled="disabled"
          clearable
          :maxlength="4"
        >
          <template slot="append">天</template>
        </el-input>
      </el-form-item>

      <el-form-item label="建筑用途" prop="buildingUse">
        <el-input
          v-model="ruleForm.buildingUse"
          :placeholder="getPlaceHolder('建筑用途')"
          :maxlength="20"
          :disabled="disabled"
          clearable
        />
      </el-form-item>

      <el-form-item label="结构类型" prop="structureType">
        <el-select
          v-model="ruleForm.structureType"
          :placeholder="getPlaceHolder('结构类型', 1)"
          :disabled="disabled"
          clearable
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
          v-model="ruleForm.buildArea"
          :placeholder="getPlaceHolder('建筑面积')"
          :disabled="disabled"
          clearable
          :maxlength="4"
        >
          <template slot="append">m²</template>
        </el-input>
      </el-form-item>

      <el-form-item label="是否备案" prop="isRecord">
        <el-select
          v-model="ruleForm.isRecord"
          :placeholder="getPlaceHolder('是否备案', 1)"
          :disabled="disabled"
          clearable
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
          :placeholder="getPlaceHolder('是否有施工许可证', 1)"
          :disabled="disabled"
          clearable
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
          :placeholder="getPlaceHolder('是否有中标通知书', 1)"
          :disabled="disabled"
          clearable
        >
          <el-option
            v-for="item in switchList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <div class="fill-in-row-extend">
        <el-form-item
          v-if="isShowRecord"
          label="合同备案号"
          prop="recordNumber"
        >
          <el-input
            v-model="ruleForm.recordNumber"
            :disabled="disabled"
            :maxlength="20"
            clearable
            :placeholder="getPlaceHolder('合同备案号')"
          />
        </el-form-item>

        <el-form-item
          v-if="isShowConstructPermit"
          label="施工许可证号"
          prop="constructionPermitNo"
          class="residue-row"
          :rules="[
            { required: ruleForm.isConstructionPermit === 1, message: '请输入许可证号', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="ruleForm.constructionPermitNo"
            :maxlength="20"
            :disabled="disabled"
            clearable
            :placeholder="getPlaceHolder('施工许可证号')"
          />
        </el-form-item>
      </div>
      <!-- over -->
      <el-form-item label="合同">
        <el-upload
          :file-list="contractList"
          :action="actionUrl"
          :disabled="disabled"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'contractList', {name: '合同', record: true, formName: 'content' })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'contractList', {name: '合同', record: true, children: true, formName: 'content' })}"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="handleUploadEngFile('contract')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="施工许可证">
        <el-upload
          :file-list="constructionPermitList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'constructionPermitList', {name: '施工许可证', record: true, children: true, formName: 'editContent' })}"
          :data="uploadData"
          :disabled="disabled"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'constructionPermitList', {name: '施工许可证', record: true, children: true, formName: 'editContent' })}"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="handleUploadEngFile('constructionPermit')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="中标通知书">
        <el-upload
          :file-list="winBidBookList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'winBidBookList', {name: '中标通知书', record: true, children: true, formName: 'editContent' })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'winBidBookList', {name: '中标通知书', record: true, children: true, formName: 'editContent' })}"
          :disabled="disabled"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="handleUploadEngFile('winBidBook')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="结算书">
        <el-upload
          :file-list="settlementBookList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'settlementBookList', {name: '结算书', record: true, children: true, formName: 'editContent' })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'settlementBookList', {name: '结算书', record: true, children: true, formName: 'editContent' })}"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
          :disabled="settleDisabled"
        >
          <el-button type="primary" :disabled="settleDisabled" @click="handleUploadEngFile('settlementBook')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item
        label="工程概况"
        class="fill-in-row row-label"
        prop="projectOverview"
      >
        <el-input
          v-model="ruleForm.projectOverview"
          clearable
          :rows="3"
          :placeholder="getPlaceHolder('工程概况')"
          :maxlength="255"
          :disabled="disabled"
          type="textarea"
        />
      </el-form-item>

      <el-form-item
        label="工程范围"
        class="fill-in-row row-label"
        prop="projectScope"
      >
        <el-input
          v-model="ruleForm.projectScope"
          clearable
          :rows="3"
          :placeholder="getPlaceHolder('工程范围')"
          :maxlength="255"
          :disabled="disabled"
          type="textarea"
        />
      </el-form-item>

      <el-form-item
        label="合同备注"
        class="fill-in-row row-label"
        prop="remark"
      >
        <el-input
          v-model="ruleForm.remark"
          clearable
          :rows="3"
          :placeholder="getPlaceHolder('合同备注')"
          :maxlength="255"
          :disabled="disabled"
          type="textarea"
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
          :props="{ expandTrigger: 'hover', value: 'id', label: 'orgName', children: 'children', checkStrictly: true }"
        />
      </el-form-item>
      <el-form-item label="经办日期" prop="handlingDate">
        <el-date-picker
          v-model="ruleForm.handlingDate"
          type="date"
          :disabled="disabled"
          :placeholder="getPlaceHolder('经办日期')"
          clearable
        />
      </el-form-item>
      <el-form-item label="经办人" prop="handlingPersonId">
        <el-select
          v-model="ruleForm.handlingPersonId"
          clearable
          :disabled="disabled"
          :placeholder="getPlaceHolder('经办人', 1)"
        >
          <el-option
            v-for="item in handleManList"
            :key="item.code"
            :value="item.code"
            :label="item.name"
          />
        </el-select>
      </el-form-item>

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

      <template v-if="!recordDisabled">
        <el-form-item
          label="修改记录"
          class="fill-in-row"
        >
          <history-record :is-current="true" :data="currentContent" />
        </el-form-item>
        <el-form-item class="fill-in-row">
          <history-record v-if="!disabled && content.length > 0" :data="content" />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import { validateLength } from '@core/utils/validate'
import { getSessionStorage } from '@core/utils/auth'
import { mapGetters, mapActions } from 'vuex'
import { editMainDesignContract
} from '@core/api/contractManage/contractmanager'
import { getOrganizationByBelongList } from '@core/api/organization'
import uploadMixns from '../mixins/upload'
import historyRecord from './HistoryRecord'

export default {
  name: 'EnginnerInfo',
  components: {
    historyRecord
  },
  mixins: [uploadMixns],
  props: {
    disabled: {
      type: Boolean,
      default: true
    },
    settleDisabled: {
      default: true,
      type: Boolean
    },
    recordDisabled: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      currentContent: [],
      content: [],
      contractList: [],
      constructionPermitList: [], // 施工许可证
      winBidBookList: [], // 中标通知书
      settlementBookList: [], // 结算书
      ruleForm: {
        approvalNo: '', // 审批单号
        startOrgId: '',
        effectiveState: '',
        contractNumber: '',
        attribution: '',
        belongOrgId: '',
        type: '',
        category: '',
        signDate: '',
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
        structureType: '', // 结构类型
        buildArea: '', // 建筑面积
        isRecord: '', // 是否备案
        isConstructionPermit: '', // 是否有施工许可证
        isBidNotice: '', // 是否有中标通知书
        recordNumber: '', // 合同备案号
        constructionPermitNo: '', // 施工许可证
        projectOverview: '', // 工程概况
        projectScope: '', // 工程范围
        remark: '', // 工程备注
        handlingOrgId: '', // 经办组织
        handlingDate: '', // 经办日期
        handlingPersonId: '', // 经办人
        createUserName: '', // 录入人
        createDate: ''
      },
      companyList: [],
      rules: {
        effectiveState: [
          {
            required: true,
            message: this.getPlaceHolder('生效状态', 1),
            trigger: 'change'
          }
        ],
        projectSite: [
          { required: true, message: '请选择工程地点', trigger: 'change' }
        ],
        approvalNo: [
          {
            required: true,
            message: this.getPlaceHolder('审批单号'),
            trigger: 'blue'
          }
        ],
        startOrgId: [
          {
            required: true,
            message: this.getPlaceHolder('发起组织', 1),
            trigger: 'change'
          }
        ],
        constructionUnit: [
          {
            required: true,
            message: '请选择建设单位',
            trigger: 'change'
          },
          validateLength(0, 50)
        ],
        contractNumber: [
          {
            required: true,
            message: this.getPlaceHolder('合同编号'),
            trigger: 'change'
          },
          validateLength(0, 20)
        ],
        attribution: [
          {
            required: true,
            message: this.getPlaceHolder('合同归属', 1),
            trigger: 'change'
          }
        ],
        belongOrgId: [
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
        signDate: [
          {
            required: true,
            message: this.getPlaceHolder('签订日期', 1),
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: this.getPlaceHolder('合同名称', 1),
            trigger: 'change'
          },
          validateLength(0, 100)
        ],
        balanceType: [
          {
            required: true,
            message: this.getPlaceHolder('收支类型', 1),
            trigger: 'change'
          }
        ],
        amount: [
          {
            required: true,
            message: this.getPlaceHolder('合同金额'),
            trigger: 'blur'
          }
        ],
        projectAddress: [validateLength(0, 50)],
        contactPerson: [validateLength(0, 20)],
        contactPersonTel: [validateLength(0, 11)],
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
            message: this.getPlaceHolder('备案', 1),
            trigger: 'change'
          }
        ],
        isConstructionPermit: [
          {
            required: true,
            message: this.getPlaceHolder('施工许可证', 1),
            trigger: 'change'
          }
        ],
        isBidNotice: [
          {
            required: true,
            message: this.getPlaceHolder('中标通知书', 1),
            trigger: 'change'
          }
        ],
        recordNumber: [
          {
            required: true,
            message: this.getPlaceHolder('合同备案号'),
            trigger: 'blur'
          }
        ],
        licence: [
          {
            required: true,
            message: this.getPlaceHolder('施工许可证'),
            trigger: 'blur'
          }
        ],
        projectOverview: [validateLength(0, 255)],
        projectScope: [validateLength(0, 255)],
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
            trigger: 'blur'
          }
        ],
        handlingPersonId: [
          {
            required: true,
            message: this.getPlaceHolder('经办人'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    // 归档日期
    'ruleForm.state': {
      handler(n) {
        this.validateFilingDate(n === '02')
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    currentId() {
      return this.$route.query.id
    },
    // 是否显示合同备案号
    isShowRecord() {
      return this.ruleForm.isRecord === 1
    },
    // 是否显示施工许可证号
    isShowConstructPermit() {
      return this.ruleForm.isConstructionPermit === 1
    },
    switchList() {
      const list = [
        { code: 1, name: '是' },
        { code: 0, name: '否' }
      ]
      return list
    },
    // 合同类别
    categoryList() {
      return this.constant.ContractCategory
    },
    // 生效状态
    statusList() {
      return this.constant.EffectiveState
    },
    // 合同归属
    ContractAttributionList() {
      return this.constant.ContractAttribution
    },
    // 合同类型
    typeList() {
      return this.constant.MainContractType
    },
    // 收支类型
    collectTypeList() {
      return this.constant.BalanceType
    },
    // 工程地点
    projectPlaceOptions() {
      return this.constant.nativePlace
    },
    // 工程规模List
    projectScaleOptions() {
      return this.constant.ProjectScale
    },
    // 合同状态
    contractStatusList() {
      return this.constant.contractState
    },
    // 工程状态
    projectStatusList() {
      return this.constant.EngineeringStatus
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
    // 结构类型List
    structureTypeList() {
      return this.constant.StructureType
    },
    // 经办组织 orgList
    handleOrgList() {
      return this.constant.orgList
    },
    // 经办人List
    handleManList() {
      return this.constant.orgPersonList.map(i => ({ code: i.id, name: i.name }))
    }
  },
  created() {
    this.loading = true
    Promise.all([
      this.initDictionaries(), // 初始化数据字典
      this.fetchFormData()
    ]).then(async res => {
      const responseData = res[1]
      const { data } = responseData
      await this.initSelectData(data)
      // 处理级联数据
      this.formatterResponse(data)
      this.ruleForm = data
      this.returnFileList(data)
      this.loading = false
      // 暂时放入sessionStorage
      sessionStorage.setItem('contactFormData', JSON.stringify({
        handlingPersonId: this.ruleForm.handlingPersonId,
        handlingOrgId: this.ruleForm.handlingOrgId
      }))
    })
  },
  methods: {
    ...mapActions(['getConstant']),
    validateFilingDate(boolean) {
      if (boolean) {
        const validateInfo = [{
          required: true,
          trigger: 'change',
          message: '请输入归档日期'
        }]
        this.$set(this.rules, 'filingDate', validateInfo)
      } else {
        this.$set(this.rules, 'filingDate', {})
      }
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    async returnFileList(data) {
      const { approvalNo } = data
      const fileList = ['contract', 'constructionPermit',
        'winBidBook', 'settlementBook'
      ]
      const resFileList = await this.fetchFormFileList(fileList, approvalNo)
      for (const [key, value] of resFileList.entries()) {
        this[`${fileList[key]}List`] = value
      }
    },
    formatterResponse(data) {
      data['handlingOrgId'] = data['handlingOrgId'].split(',')
      data['projectSite'] = data['projectSite'].split(',')
      data['projectScale'] = data['projectScale'].split(',')
      // 处理记录
      this.initContent(data)
    },
    initContent(data) {
      this.currentContent = data.modificationRecordList.map(i => {
        return {
          content: JSON.parse(i.content),
          reason: i.reason,
          date: i.operationDate,
          name: i.operationPersonName
        }
      })
      this.content = data.modificationRecordHistoryList.map(i => {
        return {
          content: JSON.parse(i.content),
          reason: i.reason,
          date: i.operationDate,
          name: i.operationPersonName
        }
      })
    },
    async initSelectData(data) {
      const { attribution } = data
      const response = await getOrganizationByBelongList(attribution)
      this.companyList = response.data.map(i => ({ code: i.id, name: i.orgName }))
    },
    async fetchFormData() {
      // 请求数据
      const data = await editMainDesignContract(this.currentId)
      return data
    },
    async initDictionaries() {
      const dictionariesList = [
        'EffectiveState', // 生效状态
        'MainContractType', // 合同类型
        'ContractCategory', // 合同类别
        'ContractAttribution', // 合同归属
        'ProjectScale', // 工程规模 设计和工程有,
        'EngineeringStatus', // 工程状态 设计和工程,
        'StructureType', // 结构类型 工程设计存在
        'nativePlace', // 工程地点
        'BalanceType', // 收支类型
        'userOrganization', // 发起组织
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
      this.getConstant(dictionariesList)
    },
    getPlaceHolder(title, type = 0) {
      const typeMap = ['请输入', '请选择']
      return `${typeMap[type]}${title}`
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
    .fill-in-row-extend{
      display: flex;
      width:100%;
      .el-form-item{
        width:33%;
      }
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
.sign-info {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
}
</style>
