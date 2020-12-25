<template>
  <div class="contrack-info" :class="disabled ? 'active' : ''">
    <div v-if="!isNew && disabled" class="look-wapper">
      <el-button v-if="isLook" class="back-btn" @click="$router.go(-1)">
        返回
      </el-button>
      <div class="title">
        {{ currentName }}
      </div>
    </div>
    <el-form
      ref="ruleForm"
      v-loading="loading"
      :model="ruleForm"
      :rules="rules"
      :label-width="currentLabelWidth"
      class="constrack-ruleForm"
    >
      <el-form-item label="审批单号" prop="approvalNo">
        <el-input
          v-model="ruleForm.approvalNo"
          readonly
          :placeholder="getPlaceHolder('审批单号')"
          :disabled="true"
          clearable
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'approvalNo',
                value: val,
                name: '审批单号',
              });
            }
          "
        />
      </el-form-item>
      <el-form-item label="发起组织" prop="startOrgId">
        <el-select
          v-model="ruleForm.startOrgId"
          clearable
          :disabled="isLook"
          :placeholder="getPlaceHolder('发起组织', 1)"
          @change="handleChangeStartOrgList"
        >
          <el-option
            v-for="item in startOrgList"
            :key="item.code"
            :value="item.code"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="生效状态" prop="effectiveState">
        <el-select
          v-model="ruleForm.effectiveState"
          clearable
          :disabled="true"
          :placeholder="getPlaceHolder('生效状态', 1)"
          @change="
            (val) => {
              handlerChange({
                type: 'select',
                formName: 'effectiveState',
                value: val,
                name: '生效状态',
                selectOptions: { code: 'code', name: 'name' },
                selectData: 'statusList',
              });
            }
          "
        >
          <el-option
            v-for="item in statusList"
            :key="item.code"
            :value="item.code"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="合同编号" prop="contractNumber">
        <el-input
          v-model.trim="ruleForm.contractNumber"
          :disabled="isLook"
          :maxlength="20"
          clearable
          :placeholder="getPlaceHolder('合同编号')"
          @change="
            (val) => {
              handlerChange({
                type: 'input',
                formName: 'contractNumber',
                value: val,
                name: '合同编号',
              });
            }
          "
        />
      </el-form-item>
      <el-form-item label="合同归属" prop="attribution">
        <el-select
          v-model="ruleForm.attribution"
          :disabled="isLook || disabledEditField"
          clearable
          :placeholder="getPlaceHolder('合同归属', 1)"
          @change="(val) => changeAttribution(val, true)"
        >
          <el-option
            v-for="item in ContractAttributionList"
            :key="item.code"
            :value="item.code"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="归属单位" prop="belongOrgId">
        <el-select
          v-model="ruleForm.belongOrgId"
          :disabled="isLook || ruleForm.attribution === 'Company' || disabledEditField || ruleForm.attribution ===''"
          clearable
          :placeholder="getPlaceHolder('归属单位', 1)"
          @change="
            (val) => {
              changeBelongOrg(val, true);
            }
          "
        >
          <el-option
            v-for="item in companyList"
            :key="item.code"
            :value="item.code"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="合同类型" prop="type">
        <el-select
          v-model="ruleForm.type"
          :disabled="isLook || disabledEditField"
          :placeholder="getPlaceHolder('合同类型', 1)"
          clearable
          @change="(val) => {handleChangeType(val)}"
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
          clearable
          :disabled="isOtherContract || isLook"
          :placeholder="getPlaceHolder('合同类别', 1)"
          @change="
            (val) => {
              handlerChange({
                type: 'select',
                formName: 'category',
                value: val,
                name: '合同类别',
                selectOptions: { code: 'code', name: 'name' },
                selectData: 'categoryList',
              });
            }
          "
        >
          <el-option
            v-for="item in categoryList"
            :key="item.code"
            :value="item.code"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="签订日期" prop="signDate">
        <el-date-picker
          v-model="ruleForm.signDate"
          :disabled="isLook"
          type="date"
          clearable
          :placeholder="getPlaceHolder('签订日期', 1)"
          @change="
            (val) => {
              handlerChange({
                type: 'date',
                formName: 'signDate',
                value: val,
                name: '签订日期',
              });
            }
          "
        />
      </el-form-item>
      <component
        :is="currentComponent.component"
        :key="currentComponent.key"
        ref="childrenruleForm"
        :current-info="currentInfo"
        :is-look="isLook"
        :is-new="isNew"
        @getChangeUploadContext="getChangeUploadContext"
      />

      <template v-if="currentComponent.component !== ''">
        <el-form-item label="经办组织" prop="handlingOrgId">
          <el-cascader
            v-model="ruleForm.handlingOrgId"
            :placeholder="getPlaceHolder('经办组织', 1)"
            clearable
            :disabled="isLook"
            filterable
            :options="handleOrgList"
            :props="{
              expandTrigger: 'hover',
              value: 'id',
              label: 'orgName',
              children: 'children',
              checkStrictly: true
            }"
            @change="
              (val) => {
                initHandlingPersionId(val, true);
              }
            "
          />
        </el-form-item>
        <el-form-item label="经办日期" prop="handlingDate">
          <el-date-picker
            v-model="ruleForm.handlingDate"
            type="date"
            :disabled="isLook"
            :placeholder="getPlaceHolder('经办日期', 1)"
            clearable
            @change="
              (val) => {
                handlerChange({
                  type: 'date',
                  formName: 'handlingDate',
                  value: val,
                  name: '经办日期',
                });
              }
            "
          />
        </el-form-item>
        <el-form-item label="经办人" prop="handlingPersonId">
          <el-select
            v-model="ruleForm.handlingPersonId"
            clearable
            :disabled="isLook || ruleForm.handlingOrgId.length === 0"
            :placeholder="getPlaceHolder('经办人', 1)"
            @change="
              (val) => {
                handlerChange({
                  type: 'select',
                  formName: 'handlingPersonId',
                  selectData: 'handleManList',
                  selectOptions: { code: 'code', name: 'name' },
                  value: val,
                  name: '经办人',
                });
              }
            "
          >
            <el-option
              v-for="item in handleManList"
              :key="item.code"
              :value="item.code"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
      </template>

      <template v-if="!isNew">
        <el-form-item label="录入人" prop="createUserName">
          <el-input
            v-model="ruleForm.createUserName"
            :placeholder="getPlaceHolder('录入人')"
            :disabled="true"
          />
        </el-form-item>

        <el-form-item label="录入时间" prop="createDate">
          <el-date-picker
            v-model="ruleForm.createDate"
            type="datetime"
            :placeholder="getPlaceHolder('录入时间', 1)"
            :disabled="true"
          />
        </el-form-item>

        <template v-if="isEdit && hasApprovedVersion && !isContractEntry && !isSettlementBookList">
          <el-form-item label="修改原因" prop="reason">
            <el-input
              v-model="ruleForm.reason"
              :maxlength="20"
              :placeholder="getPlaceHolder('修改原因')"
            />
          </el-form-item>
          <el-form-item
            label="修改内容"
            class="fill-in-row"
          >
            <update-context :update-data="ruleForm.content" />
          </el-form-item>
        </template>
        <template v-if="(isLook && !isContractEntry) || (isEdit && hasApprovedVersion && !isContractEntry)">
          <el-form-item label="修改记录" class="fill-in-row">
            <history-record :is-current="true" :data="currentContent" />
          </el-form-item>
          <el-form-item class="fill-in-row">
            <history-record v-if="content.length > 0" :data="content" />
          </el-form-item>
        </template>
      </template>
      <template v-if="(isNew || isLook || isEdit) && !isContractRevise && !isContractEntry">
        <el-form-item class="fill-in-row" :label="processLabel">
          <flow-chart
            :id="processId"
            :is-new="perviewOrRecord"
            :label.sync="processLabel"
          />
        </el-form-item>
      </template>
      <el-form-item class="fill-in-row">
        <div v-if="!isLook && disabled" class="btn">
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
import HistoryRecord from '../../components/HistoryRecord'
import engineerContract from './engineerContract'
import signContarct from './signContarct'
import officeContract from './officeContract'
import otherContract from './otherContract'
import { getPersonnelsByOrgId } from '@core/api/personnel'
import { getSessionStorage } from '@core/utils/auth'
import { mapActions, mapGetters } from 'vuex'
import formUpdateContext from '@core/mixins/formUpdateContext'
import UpdateContext from '@framesDash/components/UpdateContext'
import { getOrganizationByBelongList } from '@core/api/organization'
import { filterListData, formatMoney } from '@core/utils'
import {
  editMainEngContract,
  editMainDesignContract,
  editMainOfficeContract,
  editMainOtherContract,
  detailVersionEngContract,
  detailVersionSignContract,
  detailVersionOfficeContract,
  detailVersionOtherContract,
  validateMainUnique,
  getMainConstarctType
} from '@core/api/contractManage/contractmanager'

export default {
  name: 'ConstractInfo',
  components: {
    HistoryRecord,
    engineerContract,
    signContarct,
    officeContract,
    otherContract,
    UpdateContext,
    flowChart: () => import('../../components/FlowChart'),
    ApprovalRecord: () => import('@frames/dashboard/components/ApprovalRecord')
  },
  mixins: [formUpdateContext],
  props: {
    disabled: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      getParentParamsData: this.getParentParams,
      getChildResponseData: this.getChildResponseData,
      getBuildMasterList: this.getBuildMasterList
    }
  },
  data() {
    return {
      processLabel: '',
      processData: [],
      loading: false,
      ruleForm: {
        approvalNo: '', // 只读 审批单号
        startOrgId: getSessionStorage('rootOrgId'), // 发起组织
        effectiveState: '', // 生效状态
        contractNumber: '', // 合同编号
        attribution: '', // 合同归属
        belongOrgId: '', // 归属单位
        type: '', // 合同类型
        category: '', // 合同类别 默认新增
        signDate: '', // 签订日期
        handlingOrgId: [], // 经手组织
        handlingDate: '', // 经手日期
        handlingPersonId: '', // 经办人,
        createUserName: '', // 录入人
        createDate: '', // 录入时间
        reason: '', // 修改原因
        content: [] // 修改内容
      },
      content: [], // 历史修改记录
      typeList: [], // 合同类型
      deepRuleForm: {},
      // 工程建造师List
      buildMasterList: [],
      // 当前表单字段
      parentParams: {},
      // 归属单位List 需要拉接口
      companyList: [],
      // 级联选择框配置
      uploadContext: [],
      // 子组件回填数据
      childResponseData: {},
      processId: '',
      perviewOrRecord: false,
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
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              validateOnlyCode(
                rule,
                value,
                callback,
                validateMainUnique({
                  contractNumber: value,
                  id: this.isNew ? undefined : this.currentId
                }),
                '04'
              )
            },
            trigger: 'blur'
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
            trigger: 'change'
          }
        ],
        handlingPersonId: [
          {
            required: true,
            message: this.getPlaceHolder('经办人', 1),
            trigger: 'change'
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
    isContractEntry() {
      const { processType } = this.$route.query
      if (!processType) {
        return false
      } else {
        if (processType === 'P_ContractEntry') {
          return true
        } else {
          return false
        }
      }
    },
    // 是否是流程修改
    isContractRevise() {
      const { processType } = this.$route.query
      if (!processType) {
        return false
      } else {
        if (processType === 'P_ContractRevise') {
          return true
        } else {
          return false
        }
      }
    },
    isNew() {
      return Number(this.$route.query.id) === 0
    },
    // 合同是否存在审批通过的记录
    hasApprovedVersion() {
      return this.$route.query?.hasApprovedVersion
    },
    // 合同存在补充协议或者存在内部合同时
    hasSubcontract() {
      return this.$route.query?.hasSubcontract
    },
    // 修改时 是否禁用
    disabledEditField() {
      if (!this.isEdit) {
        return false
      } else {
        return this.hasApprovedVersion || this.hasSubcontract
      }
    },
    // 流程Id
    // processId() {
    //   if (this.isNew) {
    //     return this.ruleForm.startOrgId
    //   } else {
    //     return this.ruleForm.approvalProcessId
    //   }
    // },
    // 是否是版本查看进入的查看
    isLook() {
      // 字段等整理
      return this.$route.query.look
    },
    // 是否编辑
    isEdit() {
      return Number(this.$route.query.id) !== 0 && !this.isLook
    },
    currentName() {
      return this.$route.query.name
    },
    // 当前查看ID
    currentId() {
      return this.$route.query.id
    },
    // 当前版本ID
    currentVersionId() {
      return this.$route.query.versionId
    },
    // 当前组件名称
    currentComponent() {
      const map = new Map([
        ['', 'officeContract'],
        ['01', 'engineerContract'],
        ['02', 'signContarct'],
        ['03', 'officeContract'],
        ['04', 'otherContract']
      ])
      const key = this.ruleForm.type
      return { component: map.get(key), key }
    },
    currentInfo() {
      if (this.isNew) {
        return 'add'
      } else if (this.isLook) {
        return 'look'
      } else if (this.isEdit) {
        return 'edit'
      } else {
        throw new Error('主合同类型不正确(仅存在新增，编辑，版本查看详情)。')
      }
    },
    currentLabelWidth() {
      if (this.currentComponent.component === 'otherContract') return `180px`
      else return `140px`
    },
    // 是否是其他合同
    isOtherContract() {
      return this.currentComponent.component !== 'otherContract'
    },
    // 合同归属
    ContractAttributionList() {
      const mainBusiness = JSON.parse(getSessionStorage('navInfo')).mainBusiness
      if (mainBusiness === 'JZZS') {
        return this.constant.contractAttributionList
      } else {
        return filterListData(this.constant.contractAttributionList, 'ProjectDepartment')
      }
    },
    // 合同类别
    categoryList() {
      return this.constant.ContractCategory
    },
    // 生效状态
    statusList() {
      return this.constant.EffectiveState
    },
    // 发起组织List
    startOrgList() {
      return this.constant.userOrganization.map((i) => {
        return {
          code: i.id,
          name: i.orgName
        }
      })
    },
    // 经办组织 orgList
    handleOrgList() {
      return this.constant.orgList
    },
    // 经办人List
    handleManList() {
      return this.constant.orgPersonList?.map((i) => ({
        code: i.id,
        name: i.name
      }))
    },
    // 审批单号
    approvalNo() {
      return this.constant.generateNo
    }
  },

  async created() {
    if (!this.isNew) {
      this.loading = true
    }
    Promise.all([this.initSessionStorage(), this.initDictionaries()]).then(
      () => {
        this.ruleForm.approvalNo = this.approvalNo
        this.ruleForm.category = '01'
        this.ruleForm.startOrgId = getSessionStorage('rootOrgId')
        this.ruleForm.effectiveState = '01'
        this.ruleForm.handlingDate = new Date()
        if (this.isEdit || this.isLook) {
          this.fetchFormData()
        }
        this.initEditFlowChart()
        this.deepRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
      }
    )
  },
  methods: {
    ...mapActions(['getConstant']),
    initEditFlowChart() {
      if (this.ruleForm.approvalProcessId) {
        this.processId = this.ruleForm.approvalProcessId
        this.perviewOrRecord = false
      } else {
        this.processId = this.ruleForm.startOrgId
        this.perviewOrRecord = true
      }
    },
    handleChangeType(val) {
      this.ruleForm.category = '01'
      this.handlerChange({
        type: 'select',
        formName: 'type',
        value: val,
        name: '合同类型',
        selectOptions: { code: 'code', name: 'name' },
        selectData: 'typeList'
      })
    },
    async initSessionStorage() {
      const id = getSessionStorage('orgId')
      const { data } = await getPersonnelsByOrgId(id)
      const { data: mainTypeList } = await getMainConstarctType()
      this.typeList = mainTypeList
      this.handleOrgList = data.map((i) => ({ name: i.name, code: i.id }))
    },
    // 根据经办组织拉经办人
    async initHandlingPersionId(val, trigger = false, clear = true) {
      // 级联处理
      if (!val || !val.length) return
      const orgList = [
        {
          type: 'orgPersonList',
          params: val.slice(-1)[0]
        } // 经办人
      ]
      this.getConstant(orgList)
      if (trigger) {
        this.ruleForm.handlingPersonId = ''
        this.handlerChange({
          type: 'cascader',
          formName: 'handlingOrgId',
          selectOptions: { code: 'id', name: 'orgName' },
          selectData: 'handleOrgList',
          value: val,
          name: '经办组织'
        })
        this.handlerChange({
          type: 'select',
          formName: 'handlingPersonId',
          selectData: 'handleManList',
          selectOptions: { code: 'code', name: 'name' },
          value: '',
          name: '经办人'
        })
      }
    },
    // 初始化数据字典
    async initDictionaries() {
      const dictionariesList = [
        'generateNo', // 审批单号
        'EffectiveState', // 生效状态
        'ContractCategory', // 合同类别
        'userOrganization', // 发起组织
        'contractAttributionList', // 合同归属
        {
          type: 'orgList',
          params: {
            parentPath: getSessionStorage('orgId'),
            del: '0',
            state: 'ok',
            componentBusinessCode: '190010'
          }
        } // 经办组织
      ]
      await this.getConstant(dictionariesList)
    },
    // 发起组织发生改变
    handleChangeStartOrgList(val) {
      this.handlerChange({
        type: 'select',
        formName: 'startOrgId',
        value: val,
        name: '发起组织',
        selectOptions: {
          code: 'code', name: 'name'
        },
        selectData: 'startOrgList'
      })
    },
    // 合同归属发生改变
    async changeAttribution(val, trigger = false) {
      if (this.isEdit && trigger) {
        this.handlerChange({
          type: 'select',
          formName: 'attribution',
          value: val,
          name: '合同归属',
          selectOptions: { code: 'code', name: 'name' },
          selectData: 'ContractAttributionList'
        })
      }
      // 清空
      this.ruleForm.belongOrgId = ''
      this.buildMasterList = []
      if (this.currentComponent.key === '01') {
        this.$refs['childrenruleForm'].clearBuilder()
      }
      if (!val) {
        this.companyList = []
        return
      }
      const { data } = await getOrganizationByBelongList(val)
      this.companyList = data.map((i) => ({ code: i.id, name: i.orgName }))
      if (val === 'Company') {
        this.ruleForm.belongOrgId = this.companyList[0].code
        this.changeBelongOrg(this.ruleForm.belongOrgId)
      }
    },
    // 归属单位改变
    async changeBelongOrg(val, trigger = false) {
      if (this.isEdit && trigger) {
        this.handlerChange({
          type: 'select',
          formName: 'belongOrgId',
          value: val,
          name: '归属单位',
          selectOptions: { code: 'code', name: 'name' },
          selectData: 'companyList'
        })
      }
      if (this.currentComponent.key === '01') {
        this.$refs['childrenruleForm'].clearBuilder()
        this.buildMasterList = []
      }
      if (!val) return
      const { data } = await getPersonnelsByOrgId(val)
      this.buildMasterList = data.map((i) => ({ name: i.name, code: i.id }))
    },
    getPlaceHolder(title, type = 0) {
      const typeMap = ['请输入', '请选择']
      return `${typeMap[type]}${title}`
    },
    getBuildMasterList() {
      return this.buildMasterList
    },
    getChildResponseData() {
      return this.childResponseData
    },
    getParentParams() {
      return this.ruleForm
    },
    onSave() {
      const childrenValidate = this.$refs[
        'childrenruleForm'
      ].validateCurrentForm()
      this.$refs['ruleForm'].validate((boolean) => {
        if (boolean && childrenValidate) {
          this.$refs['childrenruleForm'].onSave()
        }
      })
    },
    onSubmit() {
      const childrenValidate = this.$refs[
        'childrenruleForm'
      ].validateCurrentForm()
      this.$refs['ruleForm'].validate((boolean) => {
        if (boolean && childrenValidate) {
          this.$refs['childrenruleForm'].onSubmit()
        }
      })
    },
    onCancel() {
      this.$router.go(-1)
    },
    async returnSelectList(data) {
      const { attribution, belongOrgId, handlingOrgId } = data

      // 同时需要拉经办人
      const formatHandlingOrgId = handlingOrgId.split(',') // 一定存在 必填项 不判非空
      return Promise.all([
        this.changeAttribution(attribution),
        this.changeBelongOrg(belongOrgId),
        this.initHandlingPersionId(formatHandlingOrgId, false, true)
      ])
    },
    // 回填父组件
    returnParent(data) {
      const parentResponseData = JSON.parse(JSON.stringify(data))
      this.ruleForm = {
        ...parentResponseData,
        handlingOrgId: parentResponseData['handlingOrgId'].split(','),
        content: []
      }
      this.deepRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
      if (this.isLook || this.isEdit) {
        this.currentContent = data.modificationRecordList.map((i) => {
          return {
            content: JSON.parse(i.content),
            reason: i.reason,
            date: i.operationDate,
            name: i.operationPersonName
          }
        })
        this.content = data.modificationRecordHistoryList.map((i) => {
          return {
            content: JSON.parse(i.content),
            reason: i.reason,
            date: i.operationDate,
            name: i.operationPersonName
          }
        })
      }
    },
    // 回填子数据
    returnChild(data) {
      const { type } = data
      if (type === '01' || type === '02') {
        data['projectSite'] = data['projectSite'].split(',')
        // data['projectScale'] = data['projectScale'].split(',')
      }
      const childResponseData = JSON.parse(JSON.stringify(data))
      // 同时应该删除多余数据key
      const parentMap = [
        'approvalNo',
        'startOrgId',
        'effectiveState',
        'contractNumber',
        'attribution',
        'belongOrgId',
        'type',
        'category',
        'signDate',
        'handlingOrgId',
        'handlingDate',
        'handlingPersonId'
      ]
      Object.keys(childResponseData).forEach((key) => {
        if (parentMap.includes(key)) delete childResponseData[key]
      })
      this.childResponseData = childResponseData
      // 更新子组件值
      this.$refs['childrenruleForm'].initReponseData(childResponseData)
    },
    // 更改审批单号 编辑
    handleApprovalNo(val) {
      this.ruleForm.approvalNo = val
    },
    // 编辑逻辑
    async fetchFormData() {
      this.loading = true
      const methodList = {
        edit: {
          '02': editMainDesignContract,
          '01': editMainEngContract,
          '03': editMainOfficeContract,
          '04': editMainOtherContract
        },
        look: {
          '01': detailVersionEngContract,
          '02': detailVersionSignContract,
          '03': detailVersionOfficeContract,
          '04': detailVersionOtherContract
        }
      }
      const currentType = this.$route.query.category
      this.ruleForm.type = currentType
      const prefix = this.isLook ? 'look' : 'edit'
      const revisionNumber = this.currentVersionId || null
      const { data } = await methodList[prefix][currentType](
        this.currentId,
        revisionNumber
      )
      // data是数据
      await this.returnSelectList(data)
      this.returnParent(data)
      this.returnChild(data)
      this.$refs['childrenruleForm'].initResponseFileList()
      this.loading = false
    },
    handlerChange(val) {
      const row = this.formUpdateContext(val)
      this.getChangeUploadContext(row, 'content')
    }
  }
}
</script>

<style lang="less" scoped>
.contrack-info {
  &.active {
    padding: 10px;
    height: calc(100vh - 140px);
    overflow: auto;
  }
  .look-wapper {
    display: flex;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin: 0 10px 10px 0px;
    .title {
      flex: 1;
      font-size: 16px;
      text-align: center;
      padding: 10px 0;
      font-weight: bolder;
    }
  }

  .constrack-ruleForm {
    display: flex;
    flex-wrap: wrap;

    // justify-content: space-between;
    .el-form-item {
      width: 33.33%;

      .el-select {
        width: 100%;
      }
    }

    .fill-in-row {
      width: 100%;
    }

    .flow {
      .el-form-item__content {
        margin-left: 0;
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
.contrack-info {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }

  .el-cascader {
    width: 100%;
  }
}
</style>
