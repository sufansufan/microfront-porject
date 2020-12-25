<template>
  <div class="engineer-info">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
      class="constrack-ruleForm"
    >
      <el-form-item label="工程名称" class="fill-in-row" prop="name">
        <el-input
          v-model="ruleForm.name"
          :disabled="isLook"
          :maxlength="100"
          :placeholder="getPlaceHolder('工程名称')"
          clearable
        />
      </el-form-item>

      <el-form-item label="收支类型" prop="balanceType">
        <el-select
          v-model="ruleForm.balanceType"
          :disabled="isLook"
          :placeholder="getPlaceHolder('收支类型', 1)"
          clearable
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
                selectOptions: { suf: '元' },
                formName: 'amount',
                value: val,
                name: '合同金额',
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
                selectOptions: { suf: '元' },
                value: val,
                name: '结算金额',
              });
            }
          "
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>

      <el-form-item label="工程地点" prop="projectSite">
        <el-cascader
          v-model="ruleForm.projectSite"
          :disabled="isLook"
          :placeholder="getPlaceHolder('工程地点', 1)"
          :options="projectPlaceOptions"
          :props="{
            expandTrigger: 'hover',
            value: 'id',
            label: 'zh',
            children: 'children',
          }"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'cascader',
                formName: 'projectSite',
                selectOptions: { code: 'id', name: 'zh' },
                selectData: 'projectPlaceOptions',
                value: val,
                name: '工程地点',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item class="residue-row" label="详细地址" prop="projectAddress">
        <el-input
          v-model="ruleForm.projectAddress"
          :disabled="isLook"
          :placeholder="getPlaceHolder('详细地址')"
          clearable
          :maxlength="50"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'projectAddress',
                value: val,
                name: '详细地址',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item label="建设单位" prop="constructionUnit">
        <el-input
          v-model="ruleForm.constructionUnit"
          :disabled="isLook"
          :placeholder="getPlaceHolder('建设单位')"
          :maxlength="50"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'constructionUnit',
                value: val,
                name: '建设单位',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item label="建设单位联系人" prop="contactPerson">
        <el-input
          v-model.trim="ruleForm.contactPerson"
          :disabled="isLook"
          :maxlength="20"
          :placeholder="getPlaceHolder('建设单位联系人')"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'contactPerson',
                value: val,
                name: '建设单位联系人',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item label="建设单位联系电话" prop="contactPersonTel">
        <el-input
          v-model.trim="ruleForm.contactPersonTel"
          :disabled="isLook"
          :placeholder="getPlaceHolder('建设单位联系电话')"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'contactPersonTel',
                value: val,
                name: '建设单位联系电话',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item label="设计单位" prop="designUnit">
        <el-input
          v-model.trim="ruleForm.designUnit"
          :disabled="isLook"
          :placeholder="getPlaceHolder('设计单位')"
          :maxlength="50"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'designUnit',
                value: val,
                name: '设计单位',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item label="监理单位" prop="controlUnit">
        <el-input
          v-model.trim="ruleForm.controlUnit"
          :disabled="isLook"
          :maxlength="50"
          :placeholder="getPlaceHolder('监理单位')"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'controlUnit',
                value: val,
                name: '监理单位',
              });
            }
          "
        />
      </el-form-item>
      <el-form-item label="工程规模" prop="projectScale">
        <el-select
          v-model="ruleForm.projectScale"
          clearable
          :disabled="isLook"
          filterable
          :placeholder="getPlaceHolder('工程规模', 1)"
          @change="handleChangeState"
        >
          <el-option
            v-for="item in projectScaleOptions"
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
          :disabled="isLook"
          :placeholder="getPlaceHolder('合同状态', 1)"
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
          :placeholder="getPlaceHolder('归档日期', 1)"
          clearable
          :disabled="disabledFilingDate || isLook"
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

      <el-form-item label="工程状态" prop="projectState">
        <el-select
          v-model="ruleForm.projectState"
          :disabled="true"
          :placeholder="getPlaceHolder('工程状态', 1)"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'select',
                formName: 'projectState',
                selectData: 'projectStatusList',
                selectOptions: { code: 'code', name: 'name' },
                value: val,
                name: '工程状态',
              });
            }
          "
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
          clearable
          :picker-options="pickerDateBefore"
          :disabled="isLook"
          @change="
            (val) => {
              handleUpdateStartDate(val, true);
            }
          "
        />
      </el-form-item>

      <el-form-item label="竣工日期" prop="endDate">
        <el-date-picker
          v-model="ruleForm.endDate"
          :placeholder="getPlaceHolder('竣工日期', 1)"
          type="date"
          :picker-options="pickerDateAfter"
          :disabled="isLook"
          @change="
            (val) => {
              handleUpdateEndDate(val, true);
            }
          "
        />
      </el-form-item>

      <el-form-item label="绝对工期" prop="absolutePeriod">
        <el-input
          v-model.trim="ruleForm.absolutePeriod"
          clearable
          :disabled="isLook"
          :placeholder="getPlaceHolder('绝对工期')"
          :maxlength="4"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'absolutePeriod',
                value: val,
                name: '绝对工期',
                selectOptions: { suf: '天' },
              });
            }
          "
        />
      </el-form-item>

      <el-form-item label="工程建造师" prop="engineeringPersonId">
        <el-select
          v-model.trim="ruleForm.engineeringPersonId"
          clearable
          :disabled="isLook"
          filterable
          :placeholder="getPlaceHolder('工程建造师', 1)"
          @change="
            (val) => {
              handlerChange({
                type: 'select',
                formName: 'engineeringPersonId',
                selectData: 'buildMasterList',
                selectOptions: { code: 'code', name: 'name' },
                value: val,
                name: '工程建造师',
              });
            }
          "
        >
          <el-option
            v-for="item in buildMasterList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="是否注册建造师" prop="isRegisteredBuilder">
        <el-select
          v-model="ruleForm.isRegisteredBuilder"
          :disabled="isLook"
          :placeholder="getPlaceHolder('是否注册建造师', 1)"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'select',
                formName: 'isRegisteredBuilder',
                selectData: 'switchList',
                selectOptions: { code: 'code', name: 'name' },
                value: val,
                name: '是否注册建造师',
              });
            }
          "
        >
          <el-option
            v-for="item in switchList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="变更建造师" prop="changeEngineeringId">
        <el-select
          v-model="ruleForm.changeEngineeringId"
          clearable
          :disabled="isLook"
          filterable
          :placeholder="getPlaceHolder('变更建造师', 1)"
          @change="
            (val) => {
              handlerChange({
                type: 'select',
                formName: 'changeEngineeringId',
                selectData: 'buildMasterList',
                selectOptions: { code: 'code', name: 'name' },
                value: val,
                name: '变更建造师',
              });
            }
          "
        >
          <el-option
            v-for="item in buildMasterList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="建筑用途" prop="buildingUse">
        <el-input
          v-model.trim="ruleForm.buildingUse"
          :disabled="isLook"
          :maxlength="20"
          clearable
          :placeholder="getPlaceHolder('建筑用途')"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'buildingUse',
                value: val,
                name: '建筑用途',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item label="结构类型" prop="structureType">
        <el-select
          v-model="ruleForm.structureType"
          :disabled="isLook"
          :placeholder="getPlaceHolder('结构类型', 1)"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'select',
                selectOptions: { code: 'code', name: 'name' },
                formName: 'structureType',
                value: val,
                name: '结构类型',
                selectData: 'structureTypeList',
              });
            }
          "
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
          clearable
          :maxlength="4"
          :placeholder="getPlaceHolder('建筑面积')"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'buildArea',
                value: val,
                name: '建筑面积',
                selectOptions: { suf: 'm²' },
              });
            }
          "
        >
          <template slot="append">m²</template>
        </el-input>
      </el-form-item>

      <el-form-item label="是否备案" prop="isRecord">
        <el-select
          v-model="ruleForm.isRecord"
          :disabled="isLook"
          :placeholder="getPlaceHolder('是否备案', 1)"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'select',
                selectOptions: { code: 'code', name: 'name' },
                formName: 'isRecord',
                value: val,
                name: '是否备案',
                selectData: 'switchList',
              });
            }
          "
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
          clearable
          :placeholder="getPlaceHolder('是否有施工许可证', 1)"
          @change="
            (val) => {
              handlerChange({
                type: 'select',
                formName: 'isConstructionPermit',
                value: val,
                name: '是否有施工许可证',
                selectOptions: { code: 'code', name: 'name' },
                selectData: 'switchList',
              });
            }
          "
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
          clearable
          :disabled="isLook"
          :placeholder="getPlaceHolder('是否有中标通知书', 1)"
          @change="
            (val) => {
              handlerChange({
                type: 'select',
                formName: 'isBidNotice',
                value: val,
                selectOptions: { code: 'code', name: 'name' },
                name: '是否有中标通知书',
                selectData: 'switchList',
              });
            }
          "
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
          v-if="contractIsLaw"
          label="合同备案号"
          prop="recordNumber"
        >
          <el-input
            v-model.trim="ruleForm.recordNumber"
            :disabled="isLook"
            :maxlength="20"
            clearable
            :placeholder="getPlaceHolder('合同备案号')"
            @change="
              (val) => {
                handlerChange({
                  type: 'input',
                  formName: 'recordNumber',
                  value: val,
                  name: '合同备案号',
                });
              }
            "
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
            :maxlength="20"
            clearable
            :placeholder="getPlaceHolder('施工许可证号')"
            @change="
              (val) => {
                handlerChange({
                  type: 'input',
                  formName: 'constructionPermitNo',
                  value: val,
                  name: '施工许可证号',
                });
              }
            "
          />
        </el-form-item>
      </div>

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

      <el-form-item label="施工许可证">
        <el-upload
          :file-list="constructionPermitList"
          :action="actionUrl"
          :on-success="
            (response, file, fileList) => {
              uploadMoreSuccess(fileList, 'constructionPermitList', {
                name: '施工许可证',
                record: true,
                children: true,
                formName: 'content',
              });
            }
          "
          :data="uploadData"
          :headers="uploadHeaders"
          :disabled="isLook"
          :on-remove="
            (file, fileList) => {
              handleRemove(file, fileList, 'constructionPermitList', {
                name: '施工许可证',
                record: true,
                children: true,
                formName: 'content',
              });
            }
          "
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button
            type="primary"
            :disabled="isLook"
            @click="handleUploadEngFile('constructionPermit')"
          ><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="中标通知书">
        <el-upload
          :file-list="winBidBookList"
          :action="actionUrl"
          :on-success="
            (response, file, fileList) => {
              uploadMoreSuccess(fileList, 'winBidBookList', {
                name: '中标通知书',
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
              handleRemove(file, fileList, 'winBidBookList', {
                name: '中标通知书',
                record: true,
                children: true,
                formName: 'content',
              });
            }
          "
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :disabled="isLook"
          :on-preview="previewFile"
        >
          <el-button
            type="primary"
            :disabled="isLook"
            @click="handleUploadEngFile('winBidBook')"
          ><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item v-if="isLook && isShowSettlementBookList" label="结算书">
        <el-upload
          :file-list="settlementBookList"
          :action="actionUrl"
          :on-success="
            (response, file, fileList) => {
              uploadMoreSuccess(fileList, 'settlementBookList', {
                name: '结算书',
                children: true,
                record: true,
                formName: 'content',
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
          :disabled="true"
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

      <el-form-item label="工程概况" class="fill-in-row row-label">
        <el-input
          v-model="ruleForm.projectOverview"
          :rows="3"
          :disabled="isLook"
          :placeholder="getPlaceHolder('工程概况')"
          clearable
          type="textarea"
          :maxlength="255"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'projectOverview',
                value: val,
                name: '工程概况',
              });
            }
          "
        />
      </el-form-item>
      <el-form-item label="工程范围" class="fill-in-row row-label">
        <el-input
          v-model="ruleForm.projectScope"
          type="textarea"
          :disabled="isLook"
          :placeholder="getPlaceHolder('工程范围')"
          clearable
          :rows="3"
          :maxlength="255"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'projectScope',
                value: val,
                name: '工程范围',
              });
            }
          "
        />
      </el-form-item>

      <el-form-item label="合同备注" class="fill-in-row row-label">
        <el-input
          v-model="ruleForm.remark"
          :disabled="isLook"
          :placeholder="getPlaceHolder('合同备注')"
          clearable
          type="textarea"
          :maxlength="255"
          :rows="3"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'remark',
                value: val,
                name: '合同备注',
              });
            }
          "
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateLength, validateLandline } from '@core/utils/validate'
import childrenMixins from './mixins/children.js'
import formUpdateContext from '@core/mixins/formUpdateContext'

// import upload from '@core/mixins/upload'

export default {
  name: 'EnginnerInfo',
  mixins: [formUpdateContext, childrenMixins],
  data() {
    const validatePersonId = (rule, value, callback) => {
      if (this.ruleForm.changeEngineeringId !== '') {
        if (this.ruleForm.engineeringPersonId === this.ruleForm.changeEngineeringId) {
          callback(new Error('工程建造师不能和变更建造师为同一人'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validPhone = (rule, value, callback) => {
      if (!validateLandline(value) && value !== '') {
        callback(new Error('请输入正确的手机号码或者座机'))
      } else {
        callback()
      }
    }
    // 部分校验在mixins 其他有时间抽

    return {
      contractList: [], // 合同上传
      constructionPermitList: [], // 施工许可证
      winBidBookList: [], // 中标通知书
      settlementBookList: [], // 结算书
      deepContractList: [],
      deepConstructionPermitList: [],
      deepWinBidBookList: [],
      deepSettlementBookList: [], // 结算书
      // rules 找机会抽成mixins
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
        engineeringPersonId: '', // 工程建造师
        isRegisteredBuilder: '', // 是否注册建造师
        changeEngineeringId: '', // 变更建造师
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
        remark: '' // 合同备注
      },
      refreshMasterList: [],
      rules: {
        projectOverview: [validateLength(0, 255)],
        projectScope: [validateLength(0, 255)],
        remark: [validateLength(0, 255)],
        controlUnit: [validateLength(0, 50)],
        // 金额校验
        amount: [
          { required: true, message: '请输入合同金额', trigger: 'blur' },
          { required: true, validator: this.validtorMoney, trigger: 'blur' }
        ],
        settlementAmount: [
          { validator: this.validtorMoney, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入工程名称', trigger: 'blur' },
          validateLength(0, 100)
        ],
        absolutePeriod: [
          { validator: this.validateAbsolutePeriodFunc(), trigger: 'change' }
        ],
        balanceType: [
          { required: true, message: '请选择收支类型', trigger: 'change' }
        ],
        projectSite: [
          { required: true, message: '请选择工程地点', trigger: 'change' }
        ],
        projectAddress: [validateLength(0, 200)],
        constructionUnit: [
          {
            required: true,
            message: '请输入建设单位',
            trigger: 'blur'
          },
          validateLength(0, 50)
        ],
        designUnit: [validateLength(0, 50)],
        state: [
          {
            required: true,
            message: '请选择合同状态',
            trigger: 'change'
          }
        ],
        engineeringPersonId: [
          {
            required: true,
            message: '请选择工程建造师',
            trigger: 'change'
          },
          {
            validator: validatePersonId,
            tirgger: 'change'
          }
        ],
        changeEngineeringId: [
          {
            validator: validatePersonId,
            tirgger: 'change'
          }
        ],
        buildArea: [{ required: true, message: '请输入建筑面积', trigger: 'blur' }, { required: true, validator: this.validateArea, trigger: 'blur' }, validateLength(0, 20)],
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
        // 联系人电话
        contactPersonTel: [{ validator: validPhone, trigger: 'blur' }],
        recordNumber: [
          { required: true, message: '请输入合同备案号', trigger: 'blur' },
          validateLength(0, 20)
        ],
        constructionPermitNo: [
          { required: true, message: '请输入施工许可证号', trigger: 'blur' },
          validateLength(0, 20)
        ]
      }
    }
  },
  watch: {
    'ruleForm.engineeringPersonId': {
      handler(n) {
        if (n !== this.ruleForm.changeEngineeringId) {
          // 清除校验
          this.$refs['ruleForm'].clearValidate('engineeringPersonId')
          this.$refs['ruleForm'].clearValidate('changeEngineeringId')
        }
      }
    },
    'ruleForm.changeEngineeringId': {
      handler(n) {
        if (n === this.ruleForm.changeEngineeringId) {
          // 清除校验
          this.$refs['ruleForm'].clearValidate('engineeringPersonId')
          this.$refs['ruleForm'].clearValidate('changeEngineeringId')
        }
      }
    }

  },
  created() {
    this.deepRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
    // this.fetchFileList()
  },
  methods: {
    async initPraviteDictionares() {
      await this.getConstant(this.engineerDesignDictionares)
    },
    handlerChange(val) {
      const row = this.formUpdateContext(val)
      this.$emit('getChangeUploadContext', row, 'content')
    }
  }
}
</script>

<style scoped lang="less">
.engineer-info {
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
    .fill-in-row-extend {
      display: flex;
      width: 100%;
      .el-form-item {
        width: 33.33%;
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
<style lang="less">
.engineer-info {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-cascader .el-input .el-input__inner {
    width: 100%;
  }
}
</style>
