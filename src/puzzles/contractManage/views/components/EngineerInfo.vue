<template>
  <div class="engineer-info">
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
          :disabled="disabled"
          @change="(val) => {handlerChange({type: 'input', formName: 'approvalNo', value: val, name: '审批单号'})}"
        />
      </el-form-item>

      <el-form-item label="发起组织" prop="startOrgId">
        <el-select
          v-model="ruleForm.startOrgId"
          clearable
          :disabled="disabled"
          :placeholder="getPlaceHolder('发起组织',1)"
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'startOrgId',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'startOrgIdList',
              value: val,
              name: '发起组织'
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
          :placeholder="getPlaceHolder('生效状态',1)"
          :disabled="disabled"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'effectiveState',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'statusList',
              value: val,
              name: '生效状态'
            })
          }"
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
          v-model="ruleForm.contractNumber"
          :maxlength="18"
          clearable
          :placeholder="getPlaceHolder('合同编号')"
          :disabled="disabled"
          @change="(val) => {handlerChange({type: 'input', formName: 'contractNumber', value: val, name: '审批单号'})}"
        />
      </el-form-item>

      <el-form-item label="合同归属" prop="attribution">
        <el-select
          v-model="ruleForm.attribution"
          clearable
          :placeholder="getPlaceHolder('合同归属',1)"
          :disabled="disabled"
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'attribution',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'ContractAttributionList',
              value: val,
              name: '合同归属'
            })
          }"
        >
          <el-option
            v-for="item in ContractAttributionList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="归属单位">
        <el-select
          v-model="ruleForm.belongOrgId"
          :placeholder="getPlaceHolder('归属单位',1)"
          :disabled="disabled"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'belongOrgId',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'companyList',
              value: val,
              name: '归属单位'
            })
          }"
        >
          <el-option
            v-for="item in companyList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="合同类型">
        <el-select
          v-model="ruleForm.type"
          clearable
          :placeholder="getPlaceHolder('合同类型',1)"
          :disabled="true"
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'type',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'typeList',
              value: val,
              name: '合同类型'
            })
          }"
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
          :placeholder="getPlaceHolder('合同类别',1)"
          clearable
          :disabled="true"
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'category',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'categoryList',
              value: val,
              name: '合同类别'
            })
          }"
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
          v-model="ruleForm.signDate"
          :disabled="disabled"
          clearable
          :placeholder="getPlaceHolder('签订日期',1)"
          type="date"
          @change="(val) => {
            handlerChange({
              type: 'date',
              formName: 'signDate',
              value: val,
              name: '签订日期'
            })
          }"
        />
      </el-form-item>
      <el-form-item label="工程名称" class="fill-in-row" prop="name">
        <el-input
          v-model="ruleForm.name"
          :disabled="disabled"
          :placeholder="getPlaceHolder('工程名称')"
          :maxlength="100"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'name',
              value: val,
              name: '工程名称'
            })
          }"
        />
      </el-form-item>
      <el-form-item label="收支类型">
        <el-select
          v-model="ruleForm.balanceType"
          :placeholder="getPlaceHolder('收支类型',1)"
          :disabled="disabled"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'balanceType',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'collectTypeList',
              value: val,
              name: '收支类型'
            })
          }"
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
          @blur="amountInputBlur('amount')"
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'amount',
              selectOptions: {suf: '元'},
              value: val,
              name: '合同金额'
            })
          }"
        />
      </el-form-item>

      <el-form-item label="结算金额" prop="settlementAmount">
        <amount-input
          v-model.trim="ruleForm.settlementAmount"
          :disabled="settleDisabled"
          :placeholder="getPlaceHolder('结算金额')"
          @blur="amountInputBlur('settlementAmount')"
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'settlementAmount',
              selectOptions: {suf: '元'},
              value: val,
              name: '结算金额'
            })
          }"
        />
      </el-form-item>

      <el-form-item label="工程地点" prop="projectSite">
        <!-- 工程地点 -->
        <el-cascader
          v-model="ruleForm.projectSite"
          :disabled="disabled"
          :props="{
            expandTrigger: 'hover',
            value: 'id',
            label: 'zh',
            children: 'children'
          }"
          :placeholder="getPlaceHolder('工程地点',1)"
          :options="projectPlaceOptions"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'cascader',
              formName: 'projectSite',
              selectOptions: {code: 'id', name: 'zh'},
              selectData: 'projectPlaceOptions',
              value: val,
              name: '工程地点'
            })
          }"
        />
      </el-form-item>

      <el-form-item class="residue-row" label="详细地址" prop="projectAddress">
        <el-input
          v-model="ruleForm.projectAddress"
          :placeholder="getPlaceHolder('详细地址')"
          clearable
          :maxlength="50"
          :disabled="disabled"
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'projectAddress',
              value: val,
              name: '详细地址'
            })
          }"
        />
      </el-form-item>

      <el-form-item label="建设单位" prop="constructionUnit">
        <el-input
          v-model="ruleForm.constructionUnit"
          :placeholder="getPlaceHolder('建设单位')"
          :maxlength="20"
          clearable
          :disabled="disabled"
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'constructionUnit',
              value: val,
              name: '建设单位'
            })
          }"
        />
      </el-form-item>

      <el-form-item label="建设单位联系人" prop="contactPerson">
        <el-input
          v-model.trim="ruleForm.contactPerson"
          :maxlength="20"
          :placeholder="getPlaceHolder('建设单位联系人')"
          :disabled="disabled"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'contactPerson',
              value: val,
              name: '建设单位联系人'
            })
          }"
        />
      </el-form-item>

      <el-form-item label="建设单位联系电话" prop="contactPersonTel">
        <el-input
          v-model.trim="ruleForm.contactPersonTel"
          :maxlength="11"
          :placeholder="getPlaceHolder('建设单位联系电话')"
          :disabled="disabled"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'contactPersonTel',
              value: val,
              name: '建设单位联系电话'
            })
          }"
        />
      </el-form-item>

      <el-form-item label="设计单位" prop="designUnit">
        <el-input
          v-model.trim="ruleForm.designUnit"
          :placeholder="getPlaceHolder('设计单位')"
          :maxlength="20"
          :disabled="disabled"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'designUnit',
              value: val,
              name: '设计单位'
            })
          }"
        />
      </el-form-item>

      <el-form-item label="监理单位" prop="controlUnit">
        <el-input
          v-model.trim="ruleForm.controlUnit"
          :placeholder="getPlaceHolder('监理单位')"
          :disabled="disabled"
          :maxlength="20"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'controlUnit',
              value: val,
              name: '监理单位'
            })
          }"
        />
      </el-form-item>

      <el-form-item label="工程规模" prop="projectScale">
        <el-cascader
          v-model="ruleForm.projectScale"
          :disabled="disabled"
          :placeholder="getPlaceHolder('工程规模',1)"
          :options="projectScaleOptions"
          :props="{ checkStrictly: true,checkStrictly: true, value: 'code', label: 'name' }"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'projectScale',
              value: val,
              name: '工程规模'
            })
          }"
        />
      </el-form-item>

      <el-form-item label="合同状态" prop="state">
        <el-select
          v-model="ruleForm.state"
          :disabled="disabled"
          :placeholder="getPlaceHolder('合同状态',1)"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'state',
              value: val,
              name: '合同状态'
            })
          }"
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
        label="归档日期"
        prop="filingDate"
        :rules="[
          { required: ruleForm.state === '02', message: '请选择归档日期', trigger: 'change' }
        ]"
      >
        <el-date-picker
          v-model="ruleForm.filingDate"
          :placeholder="getPlaceHolder('归档日期',1)"
          type="date"
          value-format="yyyy-MM-dd"
          :disabled="disabled"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'date',
              formName: 'filingDate',
              value: val,
              name: '归档日期'
            })
          }"
        />
      </el-form-item>

      <el-form-item label="工程状态" prop="projectState">
        <el-select
          v-model="ruleForm.projectState"
          :placeholder="getPlaceHolder('工程状态',1)"
          clearable
          :disabled="disabled"
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'projectState',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'constant.EngineeringStatus',
              value: val,
              name: '工程状态'
            })
          }"
        >
          <el-option
            v-for="item in constant.EngineeringStatus"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="开工日期" prop="startDate">
        <el-date-picker
          v-model="ruleForm.startDate"
          :placeholder="getPlaceHolder('开工日期',1)"
          type="date"
          value-format="yyyy-MM-dd"
          clearable
          :disabled="disabled"
          @change="(val) => {
            handlerChange({
              type: 'date',
              formName: 'startDate',
              value: val,
              name: '开工日期'
            })
          }"
        />
      </el-form-item>

      <el-form-item label="竣工日期" prop="endDate">
        <el-date-picker
          v-model="ruleForm.endDate"
          value-format="yyyy-MM-dd"
          :placeholder="getPlaceHolder('竣工日期',1)"
          type="date"
          clearable
          :disabled="disabled"
          @change="(val) => {
            handlerChange({
              type: 'date',
              formName: 'endDate',
              value: val,
              name: '竣工日期'
            })
          }"
        />
      </el-form-item>

      <el-form-item label="绝对工期" prop="absolutePeriod">
        <el-input
          v-model.trim="ruleForm.absolutePeriod"
          :placeholder="getPlaceHolder('绝对工期')"
          clearable
          :disabled="disabled"
          maxlength="4"
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'absolutePeriod',
              value: val,
              name: '绝对工期'
            })
          }"
        >
          <template slot="append">天</template>
        </el-input>
      </el-form-item>

      <el-form-item label="工程建造师" prop="engineeringPersonId">
        <el-select
          v-model.trim="ruleForm.engineeringPersonId"
          :placeholder="getPlaceHolder('工程建造师')"
          clearable
          :disabled="disabled"
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'engineeringPersonId',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'buildMasterList',
              value: val,
              name: '工程建造师'
            })
          }"
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
          :placeholder="getPlaceHolder('是否注册建造师',1)"
          :disabled="disabled"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'isRegisteredBuilder',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'switchList',
              value: val,
              name: '是否注册建造师'
            })
          }"
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
          :placeholder="getPlaceHolder('变更建造师',1)"
          :disabled="disabled"
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'changeEngineeringId',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'changeEngineeringId',
              value: val,
              name: '变更建造师'
            })
          }"
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
          :placeholder="getPlaceHolder('建筑用途')"
          clearable
          :disabled="disabled"
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'buildingUse',
              value: val,
              name: '建筑用途'
            })
          }"
        />
      </el-form-item>

      <el-form-item label="结构类型" prop="structureType">
        <el-select
          v-model="ruleForm.structureType"
          :disabled="disabled"
          :placeholder="getPlaceHolder('结构类型',1)"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'structureType',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'structureType',
              value: val,
              name: '工程地点'
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
          :placeholder="getPlaceHolder('建筑面积')"
          :disabled="disabled"
          clearable
          :maxlength="4"
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'buildArea',
              value: val,
              name: '建筑面积'
            })
          }"
        >
          <template slot="append">m²</template>
        </el-input>
      </el-form-item>

      <el-form-item label="是否备案" prop="isRecord">
        <el-select
          v-model="ruleForm.isRecord"
          :placeholder="getPlaceHolder('是否备案',1)"
          :disabled="disabled"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'isRecord',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'switchList',
              value: val,
              name: '是否备案'
            })
          }"
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
          :placeholder="getPlaceHolder('是否有施工许可证',1)"
          :disabled="disabled"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'isConstructionPermit',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'switchList',
              value: val,
              name: '是否有施工许可证'
            })
          }"
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
          :placeholder="getPlaceHolder('是否有中标通知书',1)"
          :disabled="disabled"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'isBidNotice',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'switchList',
              value: val,
              name: '是否有中标通知书'
            })
          }"
        >
          <el-option
            v-for="item in switchList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="isShowRecord"
        label="合同备案号"
        prop="recordNumber"
      >
        <el-input
          v-model.trim="ruleForm.recordNumber"
          clearable
          :placeholder="getPlaceHolder('合同备案号')"
          :disabled="disabled"
          :maxlength="20"
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'recordNumber',
              value: val,
              name: '合同备案号'
            })
          }"
        />
      </el-form-item>

      <el-form-item
        v-if="isShowConstructPermit"
        label="施工许可证号"
        prop="constructionPermitNo"
        class="residue-row"
      >
        <el-input
          v-model="ruleForm.constructionPermitNo"
          :placeholder="getPlaceHolder('施工许可证号')"
          :disabled="disabled"
          class="half"
          :maxlength="20"
          clearable
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'constructionPermitNo',
              value: val,
              name: '施工许可证号'
            })
          }"
        />
      </el-form-item>

      <!-- over -->
      <el-form-item label="合同">
        <el-upload
          :file-list="contractList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'contractList', {name: '合同', record: true,formName: 'content' })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'contractList', {name: '合同', record: true, formName: 'content' })}"
          :before-upload="beforeUpload50M"
          :disabled="disabled"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button
            type="primary"
            :disabled="disabled"
            @click="uploadbefore('contract')"
          ><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>

        </el-upload>
      </el-form-item>
      <el-form-item label="施工许可证">
        <el-upload
          :file-list="constructionPermitList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'constructionPermitList', {name: '施工许可证', record: true,formName: 'content' })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'constructionPermitList', {name: '施工许可证', record: true, formName: 'content' })}"
          :before-upload="beforeUpload50M"
          :disabled="disabled"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button
            type="primary"
            :disabled="disabled"
            @click="uploadbefore('constructionPermit')"
          ><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="中标通知书">
        <el-upload
          :file-list="winBidBookList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'winBidBookList', {name: '中标通知书', record: true,formName: 'content' })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'winBidBookList', {name: '施工许可证', record: true, formName: 'content' })}"
          :before-upload="beforeUpload50M"
          :disabled="disabled"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button
            type="primary"
            :disabled="disabled"
            @click="uploadbefore('winBidBook')"
          ><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>

        </el-upload>
      </el-form-item>
      <el-form-item label="结算书">
        <el-upload
          :file-list="settlementBookList"
          :action="actionUrl"
          :on-success="(response, file, fileList) => {uploadMoreSuccess(fileList, 'settlementBookList', {name: '结算书', record: true,formName: 'content' })}"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'settlementBookList', {name: '结算书', record: true, formName: 'content' })}"
          :before-upload="beforeUpload50M"
          :disabled="settleDisabled"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="settleDisabled" @click="uploadbefore('idCard')"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item
        label="工程概况"
        class="fill-in-row row-label"
        prop="projectOverview"
      >
        <el-input
          v-model.trim="ruleForm.projectOverview"
          :rows="3"
          :placeholder="getPlaceHolder('工程概况')"
          :disabled="disabled"
          :maxlength="200"
          type="textarea"
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'projectOverview',
              value: val,
              name: '工程概况'
            })
          }"
        />
      </el-form-item>

      <el-form-item
        label="工程范围"
        class="fill-in-row row-label"
        prop="projectScope"
      >
        <el-input
          v-model="ruleForm.projectScope"
          :placeholder="getPlaceHolder('工程范围')"
          type="textarea"
          :maxlength="200"
          :disabled="disabled"
          :rows="3"
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'projectScope',
              value: val,
              name: '工程范围'
            })
          }"
        />
      </el-form-item>
      <el-form-item
        label="合同备注"
        class="fill-in-row row-label"
        prop="remark"
      >
        <el-input
          v-model="ruleForm.remark"
          type="textarea"
          :maxlength="200"
          :placeholder="getPlaceHolder('合同备注')"
          :disabled="disabled"
          :rows="3"
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'remark',
              value: val,
              name: '合同备注'
            })
          }"
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
          :props="{ expandTrigger: 'hover', value: 'id', label: 'orgName', children: 'children',checkStrictly: true }"
          @change="(val) => {
            handlerChange({
              type: 'cascader',
              formName: 'handlingOrgId',
              selectOptions: {code: 'id', name: 'orgName'},
              selectData: 'handleOrgList',
              value: val,
              name: '经办组织'
            })
          }"
        />
      </el-form-item>
      <el-form-item label="经办日期" prop="handlingDate">
        <el-date-picker
          v-model="ruleForm.handlingDate"
          value-format="yyyy-MM-dd"
          type="date"
          :disabled="disabled"
          :placeholder="getPlaceHolder('经办日期', 1)"
          clearable
          @change="(val) => {handlerChange({type: 'date', formName: 'handlingDate', value: val, name: '经办日期'})}"
        />
      </el-form-item>
      <el-form-item label="经办人" prop="handlingPersonId">
        <el-select
          v-model="ruleForm.handlingPersonId"
          :placeholder="getPlaceHolder('经办人',1)"
          :maxlength="20"
          :disabled="disabled"
          @change="(val) => {
            handlerChange({
              type: 'select',
              formName: 'handlingPersonId',
              selectOptions: {code: 'code', name: 'name'},
              selectData: 'handleManList',
              value: val,
              name: '经办人'
            })
          }"
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
        <el-input
          v-model="ruleForm.createUserName"
          :disabled="disabled"
          @change="(val) => {
            handlerChange({
              type: 'input',
              formName: 'createUserName',
              value: val,
              name: '工程地点'
            })
          }"
        />
      </el-form-item>
      <el-form-item label="录入时间" prop="createDate">
        <el-date-picker
          v-model="ruleForm.createDate"
          :disabled="disabled"
          type="datetime"
          @change="(val) => {
            handlerChange({
              type: 'date',
              formName: 'createDate',
              value: val,
              name: '录入时间'
            })
          }"
        />
      </el-form-item>
      <template v-if="!recordDisabled">
        <el-form-item
          label="修改记录"
          class="fill-in-row"
        >
          <history-record v-if="disabled" :is-current="true" :data="currentContent" />
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
import { getPersonnelsByOrgId } from '@core/api/personnel'
import { getSessionStorage } from '@core/utils/auth'
import { mapGetters, mapActions } from 'vuex'
import { editMainEngContract } from '@core/api/contractManage/contractmanager'
import uploadMixns from '../mixins/upload'
import { getOrganizationByBelongList } from '@core/api/organization'
import formUpdateContext from '@core/mixins/formUpdateContext'
import historyRecord from './HistoryRecord'
export default {
  name: 'EnginnerInfo',
  components: {
    historyRecord
  },
  mixins: [uploadMixns, formUpdateContext],
  props: {
    options: {
      type: Object,
      required: true
    },
    disabled: {
      default: true,
      type: Boolean
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
      contractList: [],
      constructionPermitList: [], // 施工许可证
      winBidBookList: [], // 中标通知书
      settlementBookList: [], // 结算书
      ruleForm: {
        approvalNo: '',
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
        remark: '', // 工程备注
        handlingOrgId: [], // 经办组织
        handlingDate: '', // 经办日期
        handlingPersonId: '', // 经办人
        createUserName: '', // 录入人
        createDate: '', // 录入时间
        editReason: '', // 修改原因
        content: [],
        reason: ''
      },
      deepRuleForm: {},
      companyList: [],
      // 工程建造师List
      buildMasterList: [],
      // 工程状态
      projecteffectiveStateList: [],
      // 经办人
      handleOrgManList: [],
      rules: {
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
        effectiveState: [
          {
            required: true,
            message: this.getPlaceHolder('生效状态', 1),
            trigger: 'change'
          }
        ],
        contractNumber: [
          {
            required: true,
            message: this.getPlaceHolder('合同编号'),
            trigger: 'change'
          },
          validateLength(0, 18)
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
        date: [
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
            trigger: 'blur'
          }
        ],
        amount: [
          {
            required: true,
            message: this.getPlaceHolder('合同金额'),
            trigger: 'blur'
          }
        ],
        projectSite: [
          {
            required: true,
            message: this.getPlaceHolder('工程地点'),
            trigger: 'blur'
          }
        ],
        projectAddress: [validateLength(0, 50)],
        contactPerson: [validateLength(0, 20)],
        contactPersonTel: [validateLength(0, 11)],

        constructionUnit: [
          {
            required: true,
            message: this.getPlaceHolder('建设单位'),
            trigger: 'blur'
          }
        ],

        state: [
          {
            required: true,
            message: this.getPlaceHolder('合同状态', 1),
            trigger: 'change'
          }
        ],

        engineeringPersonId: [
          {
            required: true,
            message: this.getPlaceHolder('工程建造师'),
            trigger: 'blur'
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
          },
          validateLength(0, 20)
        ],
        licence: [
          {
            required: true,
            message: this.getPlaceHolder('施工许可证'),
            trigger: 'blur'
          },
          validateLength(0, 20)
        ],
        projectOverview: [validateLength(0, 200)],
        projectScope: [validateLength(0, 200)],
        remark: [validateLength(0, 200)],
        handlingOrgId: [
          {
            required: true,
            message: this.getPlaceHolder('经办组织', 1),
            trigger: 'blur'
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
        ],
        reason: [
          {
            required: true,
            message: this.getPlaceHolder('修改原因'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
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
    // 合同归属
    ContractAttributionList() {
      return this.constant.ContractAttribution
    },
    // 合同类型
    typeList() {
      return this.constant.MainContractType
    },
    // 合同类别
    categoryList() {
      return this.constant.ContractCategory
    },
    // 生效状态
    statusList() {
      return this.constant.EffectiveState
    },
    // 工程规模List
    projectScaleOptions() {
      return this.constant.ProjectScale
    },
    // 收支类型
    collectTypeList() {
      return this.constant.BalanceType
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
    // 工程地点
    projectPlaceOptions() {
      return this.constant.nativePlace
    },
    // 合同状态
    contractStatusList() {
      return this.constant.contractState
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
    },
    // 当前合同id
    currentId() {
      return this.$route.query.id || this.options.row.id
    }
  },
  created() {
    this.loading = true
    Promise.all([
      this.initDictionaries(), // 初始化数据字典
      this.initSessionStorage(), // 初始化经办组织
      this.fetchFormData()
    ]).then(async res => {
      const responseData = res[2]
      const { data } = responseData
      await this.initSelectData(data)
      this.returnFileList(data)
      this.formatterReturnData(data)
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
    formatterReturnData(data) {
      this.ruleForm = {
        ...data,
        content: []
      }
      this.deepRuleForm = JSON.parse(JSON.stringify(data))
      this.ruleForm['projectSite'] = this.ruleForm['projectSite'].split(',')
      this.ruleForm['handlingOrgId'] = this.ruleForm['handlingOrgId'].split(',')
      this.ruleForm['projectScale'] = this.ruleForm['projectScale'].split(',')
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
    async fetchFormData() {
      // 请求数据
      const data = await editMainEngContract(this.currentId)
      return data
    },

    initSelectData(data) {
      const { attribution, belongOrgId } = data
      return Promise.all([getOrganizationByBelongList(attribution), getPersonnelsByOrgId(belongOrgId)])
        .then(res => {
          this.companyList = res[0].data.map(i => ({ code: i.id, name: i.orgName }))// 归属单位List
          // 工程建造师List
          this.buildMasterList = res[1].data.map(i => ({ code: i.id, name: i.name })) // 工程建造师List
        })
    },
    async initSessionStorage() {
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
        'contractState', // 合同状态
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
    },
    handlerChange(val) {
      const row = this.formUpdateContext(val)
      this.getChangeUploadContext(row, 'content')
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
  .el-cascader {
    width: 100%;
  }
}
</style>
