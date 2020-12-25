<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="150px"
    class="rule-form-flex"
  >
    <el-form-item label="工程名称" prop="name" class="one-width">
      <el-input
        v-model="ruleForm.name"
        :placeholder="getPlaceHolder('工程名称')"
        :disabled="true"
        clearable
      />
    </el-form-item>
    <el-form-item label="工程地点">
      <jdy-select
        v-model="ruleForm.projectSite"
        :is-cascader="true"
        :select-data="constant.nativePlace"
        holder="工程地点"
        :disabled="true"
        :select-options="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children',checkStrictly: true }"
      />
    </el-form-item>
    <el-form-item label="详细地址" prop="projectAddress" class="two-width">
      <el-input
        v-model="ruleForm.projectAddress"
        :placeholder="getPlaceHolder('详细地址')"
        clearable
        :disabled="disabled"
        maxlength="50"
      />
    </el-form-item>
    <el-form-item
      label="建设单位"
      prop="constructionUnit"
    >
      <el-input
        v-model="ruleForm.constructionUnit"
        :placeholder="getPlaceHolder('建设单位')"
        :disabled="true"
        :maxlength="20"
        clearable
      />
    </el-form-item>
    <el-form-item label="建设单位联系人" prop="contactPerson">
      <el-input
        v-model.trim="ruleForm.contactPerson"
        :maxlength="20"
        :disabled="disabled"
        :placeholder="getPlaceHolder('建设单位联系人')"
        clearable
      />
    </el-form-item>
    <el-form-item
      label="建设单位联系电话"
      prop="contactPersonTel"
    >
      <el-input
        v-model.trim="ruleForm.contactPersonTel"
        :maxlength="11"
        :disabled="disabled"
        :placeholder="getPlaceHolder('建设单位联系电话')"
        clearable
      />
    </el-form-item>
    <el-form-item label="设计单位" prop="designUnit">
      <el-input
        v-model.trim="ruleForm.designUnit"
        :disabled="true"
        :placeholder="getPlaceHolder('设计单位')"
        :maxlength="20"
        clearable
      />
    </el-form-item>
    <el-form-item label="监理单位" prop="controlUnit">
      <el-input
        v-model.trim="ruleForm.controlUnit"
        :disabled="true"
        :maxlength="18"
        :placeholder="getPlaceHolder('监理单位')"
        clearable
      />
    </el-form-item>
    <el-form-item label="工程规模" prop="projectScale">
      <el-cascader
        v-model="ruleForm.projectScale"
        :disabled="true"
        :placeholder="getPlaceHolder('工程规模', 1)"
        :options="projectScaleOptions"
        :props="{ checkStrictly: true, value: 'code', label: 'name' }"
        clearable
      />
    </el-form-item>
    <el-form-item label="开工日期" prop="startDate">
      <el-date-picker
        v-model="ruleForm.startDate"
        :disabled="true"
        :placeholder="getPlaceHolder('开工日期', 1)"
        type="date"
        clearable
      />
    </el-form-item>
    <el-form-item label="竣工日期" prop="endDate">
      <el-date-picker
        v-model="ruleForm.endDate"
        :placeholder="getPlaceHolder('竣工日期', 1)"
        type="date"
        :disabled="true"
      />
    </el-form-item>
    <el-form-item label="绝对工期" prop="absolutePeriod">
      <el-input
        v-model.trim="ruleForm.absolutePeriod"
        clearable
        :disabled="true"
        :maxlength="4"
        :placeholder="getPlaceHolder('绝对工期')"
      />
    </el-form-item>
    <el-form-item label="实际开工日期" prop="realStartDate">
      <el-date-picker
        v-model="ruleForm.realStartDate"
        :disabled="disabled"
        :placeholder="getPlaceHolder('实际开工日期', 1)"
        type="date"
        clearable
        :picker-options="startPickerDateTime"
        @change="(start) => {timePickerChange(start, ruleForm.realEndDate, 'start')}"
      />
    </el-form-item>
    <el-form-item label="实际竣工日期" prop="realEndDate">
      <el-date-picker
        v-model="ruleForm.realEndDate"
        :disabled="disabled"
        :placeholder="getPlaceHolder('实际竣工日期', 1)"
        type="date"
        :picker-options="endPickerDateTime"
        @change="(end) => {timePickerChange(ruleForm.realStartDate, end, 'end')}"
      />
    </el-form-item>
    <el-form-item label="实际工期" prop="realTime">
      <el-input
        v-model.trim="ruleForm.realTime"
        :disabled="true"
        clearable
        :placeholder="getPlaceHolder('实际工期')"
      />
    </el-form-item>
    <el-form-item
      label="工程建造师"
      prop="engineeringPersonId"
    >
      <jdy-select
        v-model="ruleForm.engineeringPersonId"
        :disabled="true"
        holder="工程建造师"
        :select-data="engineeringPersonList"
        :select-options="{label: 'name', value: 'id'}"
      />
    </el-form-item>
    <el-form-item label="是否注册建造师" prop="isRegisteredBuilder">
      <jdy-select
        v-model="ruleForm.isRegisteredBuilder"
        :disabled="true"
        holder="是否注册建造师"
        :select-data="constant.trueAndFalse"
      />
    </el-form-item>
    <el-form-item label="延期时间" prop="delayTime">
      <el-input
        v-model.trim="ruleForm.delayTime"
        clearable
        :disabled="true"
        :placeholder="getPlaceHolder('延期时间')"
      />
    </el-form-item>
    <el-form-item label="建筑用途" prop="buildingUse">
      <el-input
        v-model.trim="ruleForm.buildingUse"
        :maxlength="20"
        :disabled="disabled"
        clearable
        :placeholder="getPlaceHolder('建筑用途')"
      />
    </el-form-item>
    <el-form-item label="结构类型" prop="structureType">
      <jdy-select
        v-model="ruleForm.structureType"
        holder="结构类型"
        :disabled="disabled"
        :select-data="constant.StructureType"
      />
    </el-form-item>
    <el-form-item label="变更建造师" prop="changeEngineeringId">
      <jdy-select
        v-model="ruleForm.changeEngineeringId"
        :disabled="true"
        holder="工程建造师"
        :select-data="engineeringPersonList"
        :select-options="{label: 'name', value: 'id'}"
      />
    </el-form-item>
    <el-form-item label="是否有施工许可证" prop="isConstructionPermit">
      <jdy-select
        v-model="ruleForm.isConstructionPermit"
        :disabled="true"
        holder="是否有施工许可证"
        :select-data="constant.trueAndFalse"
      />
    </el-form-item>
    <el-form-item label="建筑面积" prop="buildArea">
      <jdy-int
        v-model.trim="ruleForm.buildArea"
        :disabled="disabled"
        holder="建筑面积"
      >
        <template slot="append">m²</template>
      </jdy-int>
    </el-form-item>
    <el-form-item label="工程状态" prop="projectState">
      <jdy-select
        v-model="ruleForm.projectState"
        holder="工程状态"
        :disabled="true"
        :select-data="constant.EngineeringStatus"
      />
    </el-form-item>
    <el-form-item label="施工许可证号" prop="constructionPermitNo">
      <el-input
        v-model="ruleForm.constructionPermitNo"
        :maxlength="20"
        :disabled="true"
        clearable
        :placeholder="getPlaceHolder('施工许可证号')"
      />
    </el-form-item>
    <el-form-item label="是否有中标通知书" prop="isBidNotice">
      <jdy-select
        v-model="ruleForm.isBidNotice"
        :disabled="true"
        holder="是否有中标通知书"
        :select-data="constant.trueAndFalse"
      />
    </el-form-item>
    <el-form-item />
    <el-form-item v-if="ruleForm.isConstructionPermit" label="施工许可证">
      <jdy-upload type-code="constructionPermit" :business-data-id="ruleForm.approvalNo" :disabled="true" />
    </el-form-item>
    <el-form-item v-if="ruleForm.isBidNotice" label="中标通知书">
      <jdy-upload type-code="winBidBook" :business-data-id="ruleForm.approvalNo" :disabled="true" />
    </el-form-item>
    <el-form-item label="工程概况" class="one-width row-label">
      <el-input
        v-model="ruleForm.projectOverview"
        :disabled="disabled"
        :placeholder="getPlaceHolder('工程概况')"
        clearable
        type="textarea"
        maxlength="255"
        :rows="3"
      />
    </el-form-item>
    <el-form-item label="工程范围" class="one-width row-label">
      <el-input
        v-model="ruleForm.projectScope"
        :placeholder="getPlaceHolder('工程范围')"
        clearable
        :disabled="disabled"
        type="textarea"
        maxlength="255"
        :rows="3"
      />
    </el-form-item>
    <el-form-item label="工程备注" class="one-width row-label">
      <el-input
        v-model="ruleForm.projectRemark"
        :disabled="disabled"
        :placeholder="getPlaceHolder('工程备注')"
        clearable
        type="textarea"
        maxlength="255"
        :rows="3"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { getPersonnelsByOrgId } from '@core/api/personnel'
import { validateLength } from '@core/utils/validate'
import { getSessionStorage } from '@core/utils/auth'
import { startAndEndValue, startPickerDate, endPickerDate } from '@core/utils'
import { mapGetters, mapActions } from 'vuex'
export default {
  inject: ['getRuleForm'],
  data() {
    return {
      constructionPermitList: [],
      winBidBookList: [],
      ruleForm: {
        name: '',
        projectSite: [],
        projectAddress: '',
        constructionUnit: '',
        contactPerson: '',
        contactPersonTel: '',
        designUnit: '',
        controlUnit: '',
        projectScale: '',
        startDate: '',
        endDate: '',
        absolutePeriod: '',
        realStartDate: '',
        realEndDate: '',
        realTime: '',
        engineeringPersonId: '',
        isRegisteredBuilder: '',
        delayTime: '',
        buildingUse: '',
        structureType: '',
        changeEngineeringId: '',
        isConstructionPermit: '',
        buildArea: '',
        projectState: '',
        constructionPermitNo: '',
        isBidNotice: '',
        projectOverview: '',
        projectScope: '',
        projectRemark: ''
      },
      engineeringPersonList: [],
      rules: {
        projectAddress: [validateLength(0, 200)],
        buildArea: [{ required: true, message: '请输入建筑面积', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    disabled() {
      return this.$route.query.type === 'details'
    },
    startPickerDateTime() {
      return startPickerDate(this.ruleForm.realEndDate, false)
    },
    endPickerDateTime() {
      return endPickerDate(this.ruleForm.realStartDate, false)
    }
  },
  async created() {
    await this.getConstant(['nativePlace', 'ContractAttribution', 'ContractCategory', 'StructureType', 'EngineeringStatus'])
    const { projectSite } = await this.getRuleForm()
    this.fetchEngineerPerson()
    this.ruleForm = {
      ...await this.getRuleForm(),
      projectSite: projectSite ? projectSite.split(',') : ''
    }
  },
  methods: {
    ...mapActions(['getConstant']),
    getPlaceHolder(title, type = 0) {
      const typeMap = ['请输入', '请选择']
      return `${typeMap[type]}${title}`
    },
    fetchEngineerPerson() {
      const orgId = getSessionStorage('orgId')
      getPersonnelsByOrgId(orgId).then(({ data }) => {
        this.engineeringPersonList = data
      })
    },
    validateRuleForm() {
      const { realStartDate, realEndDate } = this.ruleForm
      if (realStartDate && !realEndDate) {
        this.$message.warning('请选择实际竣工日期')
        return
      }
      if (realEndDate && !realStartDate) {
        this.$message.warning('请选择实际开工日期')
        return
      }
      var flag = false
      this.$refs.ruleForm.validate((valid) => {
        flag = valid
      })
      return flag
    },
    timePickerChange(start, end, type) {
      this.ruleForm.realTime = startAndEndValue(start, end)
      this.ruleForm.delayTime = start && end ? startAndEndValue(start, end) - this.ruleForm.absolutePeriod : ''
      if (!this.ruleForm.realEndDate && type === 'start') {
        this.ruleForm.realEndDate = this.ruleForm.realStartDate
      }
    }
  }
}
</script>

<style lang='less'>

</style>
