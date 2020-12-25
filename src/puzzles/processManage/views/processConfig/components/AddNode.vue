<template>
  <div class="add-node-btn-box">
    <div class="add-node-btn">
      <el-popover v-model="visible" placement="right-start">
        <div class="add-node-popover-body">
          <a class="add-node-popover-item notifier" @click="addType(2)">
            <div class="item-wrapper">
              <i class="iconfont icon-tianjiahuanjie" />
            </div>
            <p>添加环节</p>
          </a>
          <a class="add-node-popover-item condition" @click="addType(4)">
            <div class="item-wrapper">
              <i class="iconfont icon-tianjiafenzhi" />
            </div>
            <p>添加分支</p>
          </a>
        </div>
        <button slot="reference" class="btn" type="button">
          <span>
            <i class="iconfont icon-add" />
          </span>
        </button>

      </el-popover>
    </div>
    <!--环节-->
    <drag-dialog ref="copyerDrawer" :title="copyerDrawerTitle" :append="true" width="50%">
      <el-form ref="linkForm" :model="linkForm" label-width="130px" :rules="linkRules" class="ruleForm">
        <el-form-item label="环节名称" prop="name">
          <el-input v-model="linkForm.name" :maxlength="20" clearable placeholder="建议输入完整环节名称，如部门经理审批" />
        </el-form-item>
        <el-form-item label="环节类型" prop="taskType">
          <el-radio-group v-model="linkForm.taskType" @change="changeTaskType">
            <el-radio label="approve">审批</el-radio>
            <el-radio label="handle">办理</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审批人类型" prop="approverType">
          <el-select v-model="linkForm.approverType" filterable clearable placeholder="请选择审批人类型" @change="changeApproverType('approverType')">
            <el-option
              v-for="item in constant.approverType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="linkForm.approverType === '07'" label="选择范围" prop="selectRange">
          <el-select v-model="linkForm.selectRange" filterable clearable placeholder="请选择选择范围" @change="changeApproverType('selectRange')">
            <el-option
              v-for="item in constant.impromptuAssignRange"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="linkForm.approverType === '02'||linkForm.approverType === '03' || linkForm.approverType === '06'||linkForm.selectRange === '03'||linkForm.selectRange === '04'||linkForm.selectRange === '05'" label="审批人" prop="approvers">
          <el-select
            v-model="linkForm.approvers"
            filterable
            :multiple="linkForm.approverType === '02'|| linkForm.approverType === '03'||linkForm.selectRange === '03'||linkForm.selectRange === '04'"
            clearable
            placeholder="请选择审批人"
          >
            <el-option
              v-for="item in approverList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="linkForm.approverType === '04'" label="主管类别" prop="executiveType">
          <el-select v-model="linkForm.executiveType" filterable clearable placeholder="请选择主管类别">
            <el-option
              v-for="item in constant.managerType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="审批方式" prop="approveType">
          <el-radio-group v-model="linkForm.approveType">
            <el-radio label="01">非会签： <span style="color:#999">所有人中只须一人完成审批，即可进入下一环节，其他人无须完成审批</span></el-radio><br>
            <el-radio v-if="linkForm.approverType === '03'" label="02">岗位会签： <span style="color:#999">每个岗位中只须一人完成审批，就可进入下一环节，其他人无须完成审批</span></el-radio><br>
            <el-radio label="03">会签： <span style="color:#999">所有人都必须完成审批，才能进入下一环节</span></el-radio><br>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审批表单" prop="formId">
          <el-select v-model="linkForm.formId" filterable clearable placeholder="请选择审批表单">
            <el-option
              v-for="item in linkFormList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否跳过本环节" class="isWidth">
          <el-switch v-model="linkForm.skip" />
        </el-form-item>
        <el-form-item label="是否设置退回" class="isWidth">
          <el-switch v-model="linkForm.goBack" />
        </el-form-item>
        <el-form-item v-if="linkForm.goBack" label="可退回环节" prop="goBackTarget">
          <el-select v-model="linkForm.goBackTarget" filterable multiple clearable placeholder="请选择可退回环节">
            <el-option
              v-for="item in returnList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否需要抄送" class="isWidth">
          <el-switch v-model="linkForm.isCC" />
          <span style="color:#999">环节提交后抄送给抄送人</span>
        </el-form-item>
        <el-form-item v-if="linkForm.isCC" label="抄送人类型" prop="carbonCopyPersonType" class="isWidth">
          <el-select v-model="linkForm.carbonCopyPersonType" filterable clearable placeholder="请选择抄送人类型" @change="changeApproverType('carbonCopyPersonType')">
            <el-option
              v-for="item in constant.ccType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="linkForm.carbonCopyPersonType && linkForm.isCC" label="抄送人" prop="carbonCopyPersons">
          <el-select v-model="linkForm.carbonCopyPersons" filterable multiple clearable placeholder="请选择抄送人">
            <el-option
              v-for="item in CCList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button v-if="copyerDrawerTitle === '编辑环节'" type="danger" @click="copyerDrawer = false">删 除</el-button>
        <el-button type="primary" @click="updataType(2)">确 定</el-button>
      </div>
    </drag-dialog>
    <!-- 条件 -->
    <drag-dialog ref="conditionDrawer" :title="conditionDrawerTitle" :append="true" width="50%">
      <div class="addBranch">
        <el-button type="primary" @click="conditionBranch('add','')">添加分支</el-button>
        <ul>
          <li v-for="(item,index) in branchForm" :key="index">
            <div class="branchName">
              <el-row :gutter="10">
                <el-col :span="4">
                  <span>{{ item.branchName }}</span>
                  <span>分支名称 </span>
                  <span class="required-mark"> * </span>
                </el-col>
                <el-col :span="12">
                  <el-input v-model="item.name" :maxlength="20" />
                </el-col>
                <el-col :span="8">
                  <el-button v-if="item.condition.length === 0" @click="childCondition('add',index,'')">添加条件</el-button>
                  <el-button v-if="item.condition.length > 0" @click="childCondition('clear',index,'')">清除条件</el-button>
                  <el-button :disabled="index === 0" @click="branchMove(index,'on')">上移</el-button>
                  <el-button :disabled="index === branchForm.length - 1" @click="branchMove(index,'up')">下移</el-button>
                  <el-button :disabled="branchForm.length <=2" type="danger" @click="conditionBranch('del',index)">删除</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="branchCondition">
              <div v-if="item.condition.length >= 2" class="meets">
                <span>符合</span>
                <el-select v-model="item.branchType" filterable clearable placeholder="请选择">
                  <el-option
                    v-for="e in branchTypeList"
                    :key="e.value"
                    :label="e.name"
                    :value="e.value"
                  />
                </el-select>
                <span>以下条件：</span>
              </div>
              <div class="condition">
                <div v-for="(e,i) in item.condition" :key="i">
                  <el-row>
                    <el-col :span="2">
                      <span>条件 {{ i + 1 }} :</span>
                    </el-col>
                    <el-col :span="19">
                      <el-select v-model="e.branchParam" filterable clearable placeholder="请选择流程参数" @change="changeBranch(e.branchParam,i,index)">
                        <el-option
                          v-for="element in branchParamList"
                          :key="element.id"
                          :label="element.name"
                          :value="element.id"
                        />
                      </el-select>
                      <el-select v-model="e.branchRelation" filterable clearable placeholder="请选择关系">
                        <el-option
                          v-for="element in constant.relationship"
                          :key="element.code"
                          :label="element.name"
                          :value="element.code"
                        />
                      </el-select>
                      <el-select v-if="e.status" v-model="e.branchNumber" filterable multiple clearable placehol-der="请选择">
                        <el-option
                          v-for="element in dictionaryList"
                          :key="element.id"
                          :label="element.name"
                          :value="element.id"
                        />
                      </el-select>
                      <el-input v-else v-model="e.branchNumber" />
                    </el-col>
                    <el-col :span="3">
                      <el-button icon="el-icon-plus" @click="childCondition('add',index,'')" />
                      <el-button icon="el-icon-minus" @click="childCondition('del',index,i)" />
                    </el-col>
                  </el-row>

                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer">
        <el-button v-if="copyerDrawerTitle === '修改分支'" type="danger" @click="conditionDrawer = false">删 除</el-button>
        <el-button type="primary" @click="updataType(4)">确 定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>
<script>
import { getUuid } from '@core/utils'
import { validateLength } from '@core/utils/validate'
import { mapGetters } from 'vuex'
import DragDialog from '@frames/dashboard/components/Dialog'
import { getByCondition } from '@core/api/post'
import { getProcessFormList, getApproverLists, getParamListNo } from '@core/api/processManage/workflowmanager'
import { getApproverList } from '@core/api/personnel'
// import { dictionaryNopage } from '@core/api/dictionary'
import { getTypeCode } from '@core/api/dictionary'
export default {
  components: {
    DragDialog
  },
  props: {
    childNodeP: {
      default: () => {},
      type: Object
    },
    returnData: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      visible: false,
      // 环节
      copyerDrawerTitle: '添加环节',
      approverList: [],
      linkFormList: [],
      CCList: [],
      linkForm: {
        name: '',
        taskType: '',
        approverType: '',
        approvers: [],
        executiveType: '',
        approveType: '',
        formId: '',
        skip: false,
        goBack: false,
        goBackTarget: [],
        isCC: false,
        carbonCopyPersonType: '',
        carbonCopyPersons: [],
        selectRange: ''
      },
      linkRules: {
        name: [
          { required: true, message: '请输入环节名称', trigger: 'blur' },
          validateLength(0, 20)
        ],
        taskType: [{ required: true, message: '请选择环节类型', trigger: 'change' }],
        approverType: [{ required: true, message: '请选择审批人类型', trigger: 'change' }],
        approveType: [{ required: true, message: '请选择审批方式', trigger: 'change' }],
        formId: [{ required: true, message: '请选择审批表单', trigger: 'change' }],
        approvers: [{ required: true, message: '请选择审批人', trigger: 'change' }],
        executiveType: [{ required: true, message: '请选择主管类别', trigger: 'change' }],
        selectRange: [{ required: true, message: '请选择选择范围', trigger: 'change' }],
        carbonCopyPersonType: [{ required: true, message: '请选择抄送人类型', trigger: 'change' }],
        carbonCopyPersons: [{ required: true, message: '请选择抄送人', trigger: 'change' }],
        goBackTarget: [{ required: true, message: '请选择可退回环节', trigger: 'change' }]
      },
      options: [],
      // 分支
      branchIndex: 0,
      conditionDrawerTitle: '添加分支',
      branchForm: [
        { condition: [], branchName: '', name: '' },
        { condition: [], branchName: '', name: '' }
      ],
      branchTypeList: [
        { value: 'all', name: '全部' },
        { value: 'any', name: '任意' }
      ],
      branchParamList: [],
      dictionaryList: [],
      branchFormError: '',
      linkEditData: '',
      returnList: [],
      linkList: [],
      processForm: []
    }
  },
  computed: {
    ...mapGetters(['constant', 'configBaseInfo', 'processData', 'linkData'])
  },
  watch: {
    processData: {
      handler(val) {
        if (this.$route.query.type === 'edit') {
          if (val.childNode) {
            this.getReturnData(val.childNode)
          }
        }
      }
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['approverType', 'managerType', 'ccType', 'impromptuAssignRange', 'relationship', 'useRange'])
    this.getProcessForm() // 获取流程表单
    this.getProcessParam() // 获取流程参数
    this.branchNameInit() // 初始化分支名称
  },
  methods: {
    addType(type) {
      if (this.$route.query.type === 'view') return
      if (type === 2) {
        this.changeTaskType('approve')
        this.$refs.copyerDrawer.show = true
        this.$nextTick(() => {
          this.$refs.linkForm.resetFields()
        })
        this.copyerDrawerTitle = '添加环节'
        if (this.returnData.nodeCode === 'branch') {
          this.returnList = []
        } else {
          this.returnFun(this.returnData.id)
        }
        if (this.returnList.length > 0) {
          if (this.returnList[0].parentId === this.processData.id) {
            this.returnList.push({
              id: this.processData.id,
              name: '发起人',
              parentId: this.processData.id,
              upperLayerId: this.processData.id
            })
          }
        }
        if (this.returnData.id === this.processData.id) {
          this.returnList.push({
            id: this.processData.id,
            name: '发起人',
            parentId: this.processData.id,
            upperLayerId: this.processData.id
          })
        }
        this.returnFunRepeat()
      } else {
        this.branchForm = [
          { condition: [], branchName: '', name: '' },
          { condition: [], branchName: '', name: '' }
        ]
        this.$refs.conditionDrawer.show = true
      }
    },
    // 回去可退回环节
    getReturnData(data) {
      if (data.nodeName === '') {
        data.conditionNodes.forEach(item => {
          if (item.childNode) {
            this.getReturnData(item.childNode)
          }
        })
      } else {
        if (data.childNode) {
          this.getReturnData(data.childNode)
        }
        this.linkData.push({
          id: data.id,
          name: data.nodeName,
          parentId: data.parentId,
          upperLayerId: data.upperLayerId
        })
      }
    },
    // 添加分支或环节
    updataType(type) {
      this.visible = false
      if (type === 2) {
        this.$refs.linkForm.validate(valid => {
          if (valid) {
            var data = {
              'id': getUuid(),
              'nodeName': this.linkForm.name,
              'nodeCode': 'link',
              'nodeContent': '',
              'type': 2,
              'childNode': this.childNodeP,
              'nodeUserList': [],
              'linkForm': this.linkForm,
              'conditionNodes': [],
              'parentId': '',
              'upperLayerId': this.returnData.id
            }
            if (this.returnData.nodeCode === 'branch') {
              data.parentId = this.returnData.id
            } else {
              data.parentId = this.returnData.parentId
            }
            if (this.copyerDrawerTitle === '编辑环节') {
              this.linkEditData.nodeName = this.linkForm.name
              this.linkEditData.linkForm = this.linkForm
              console.log(this.linkEditData, '111111111111')
              this.linkEditData = this.linkApprover(this.linkEditData)
              this.$emit('update:nodeConfig', this.linkEditData)
            } else {
              this.linkApprover(data)
              this.$emit('update:childNodeP', data)
              const list = {
                id: data.id,
                name: data.nodeName,
                parentId: data.parentId,
                upperLayerId: this.returnData.id
              }
              this.$store.commit('SET_LINKDATA', list)
            }
            this.$refs.copyerDrawer.show = false
          }
        })
      } else {
        // 判断当前分支条件是否全部填写
        this.branchFormError = ''
        this.judgIsTrim()
        if (this.branchFormError !== '') {
          this.$message.warning(this.branchFormError)
          return
        }
        var data = {
          'nodeName': '',
          'id': getUuid(),
          'type': 4,
          'childNode': this.childNodeP,
          'conditionNodes': [],
          'parentId': '',
          'upperLayerId': this.returnData.id
        }
        if (this.returnData.nodeCode === 'branch') {
          data.parentId = this.returnData.id
        } else {
          data.parentId = this.returnData.parentId
        }
        this.branchForm.forEach((item, index) => {
          data.conditionNodes.push({
            nodeName: item.name,
            nodeCode: 'branch',
            nodeContent: [],
            id: getUuid(),
            type: 3,
            priorityLevel: index,
            conditionList: [],
            nodeUserList: [],
            childNode: null,
            branchForm: item
          })
          if (item.condition.length > 0) {
            item.condition.forEach(element => {
              var contentStr = ''
              this.branchParamList.forEach(e => {
                if (e.id === element.branchParam) {
                  contentStr += e.name
                }
              })
              switch (element.branchRelation) {
                case 'equal':
                  contentStr += '='
                  break
                case 'lessThan':
                  contentStr += '<'
                  break
                case 'lessThanEqual':
                  contentStr += '<='
                  break
                case 'greaterorThan':
                  contentStr += '>'
                  break
                case 'greaterorThanEqual':
                  contentStr += '>='
                  break
                default:
                  break
              }
              if (element.branchNumber instanceof Array) {
                element.branchNumber.forEach(e => {
                  this.dictionaryList.forEach(es => {
                    if (e === es.id) {
                      contentStr += es.name + '||'
                    }
                  })
                })
                contentStr = contentStr.substring(0, contentStr.length - 2)
              } else {
                contentStr += element.branchNumber
              }
              data.conditionNodes[index].nodeContent.push({ name: contentStr })
            })
          }
          if (item.condition.length >= 2) {
            if (item.branchType === 'all') {
              data.conditionNodes[index].nodeContent.forEach((e, i) => {
                if (i !== data.conditionNodes[index].nodeContent.length - 1) {
                  e.name = e.name + ' 并且'
                }
              })
            } else {
              data.conditionNodes[index].nodeContent.forEach((e, i) => {
                if (i !== data.conditionNodes[index].nodeContent.length - 1) {
                  e.name = e.name + ' 或'
                }
              })
            }
          }
        })
        this.$emit('update:childNodeP', data)
        this.$refs.conditionDrawer.show = false
        this.branchForm = [
          { condition: [], branchName: '', name: '' },
          { condition: [], branchName: '', name: '' }
        ]
        this.branchIndex = this.branchIndex + 2
        this.branchNameInit()
      }
    },
    // 编辑环节
    editLink(data) {
      console.log(data)
      this.returnFun(data.upperLayerId)
      this.returnList.push({
        id: this.processData.id,
        name: '发起人',
        parentId: this.processData.id,
        upperLayerId: this.processData.id
      })
      this.returnFunRepeat()
      this.linkEditData = data
      this.changeTaskType(data.linkForm.taskType)
      this.linkForm = {
        ...data.linkForm
      }
      this.changeApproverType('approverType')
      if (data.approveType === '07') {
        this.changeApproverType('selectRange')
      }
      if (this.linkForm.isCC) {
        this.changeApproverType('carbonCopyPersonType')
      }
      this.linkForm = {
        ...data.linkForm
      }
      this.copyerDrawerTitle = '编辑环节'
      this.$refs.copyerDrawer.show = true
    },
    // 分支弹窗 添加/删除分支
    conditionBranch(type, index) {
      if (type === 'add') {
        this.branchIndex += 1
        this.branchForm.push({ condition: [], branchName: '分支' + parseInt(this.branchIndex + 2), name: '分支' + parseInt(this.branchIndex + 2) })
      } else {
        this.branchForm.splice(index, 1)
      }
    },
    // 分支弹窗 分支名称
    branchNameInit() {
      this.branchForm.map((item, index) => {
        item.branchName = '分支' + parseInt(this.branchIndex + index + 1)
        item.name = item.branchName
        return item
      })
    },
    // 分支弹窗  添加/清空 条件
    // type 操作类型 index branchForm下标 i 为  branchForm.condition下标
    childCondition(type, index, i) {
      if (type === 'add') {
        this.branchForm[index].condition.push({})
      } else if (type === 'clear') {
        this.branchForm[index].condition = []
      } else {
        this.branchForm[index].condition.splice(i, 1)
      }
    },
    // 分支弹窗  上移/下移
    branchMove(index, type) {
      const position = type === 'up' ? index + 1 : index - 1
      const up = this.branchForm[position]
      this.$set(this.branchForm, position, this.branchForm[index])
      this.$set(this.branchForm, index, up)
    },
    // 获取审批人信息 this.configBaseInfo.isCommonUse
    changeApproverType(type) {
      const params = {
        orgId: this.configBaseInfo.organizationId,
        orgTypeList: this.configBaseInfo.isCommonUse ? [] : this.configBaseInfo.useRange.split(',')
      }
      this.linkForm.approvers = []
      this.approverList = []

      if (this.linkForm.approverType === '02' || (this.linkForm.selectRange === '04' && type === 'selectRange') || (this.linkForm.carbonCopyPersonType === '01' && type === 'carbonCopyPersonType')) {
        getApproverList(params).then(({ data }) => {
          if (data) {
            var listData = []
            data.forEach(item => {
              listData.push({ name: item.name, id: item.id })
            })
            if (type === 'approverType' || type === 'selectRange') {
              this.approverList = []
              this.approverList = listData
            } else if (type === 'carbonCopyPersonType') {
              this.CCList = []
              this.CCList = listData
            }
          }
        })
      } else if (this.linkForm.approverType === '03' || (this.linkForm.selectRange === '03' && type === 'selectRange') || (this.linkForm.carbonCopyPersonType === '02' && type === 'carbonCopyPersonType')) {
        getByCondition(params).then(({ data }) => {
          if (data) {
            var listData = []
            data.forEach(item => {
              listData.push({ name: item.postName, id: item.id })
            })
            if (type === 'approverType' || type === 'selectRange') {
              this.approverList = []
              this.approverList = listData
            } else if (type === 'carbonCopyPersonType') {
              this.CCList = []
              this.CCList = listData
            }
          }
        })
      } else if (this.linkForm.approverType === '06') {
        getApproverLists({ registerId: this.configBaseInfo.registerId }).then(({ data }) => {
          this.approverList = []
          if (data) {
            data.forEach(item => {
              this.approverList.push({ id: item.id, name: item.approverName })
            })
          }
        })
      }
    },
    // 获取流程表单
    getProcessForm() {
      this.processForm = []
      const param = {
        definitionId: this.configBaseInfo.registerId
      }
      getProcessFormList(param).then(({ data }) => {
        this.processForm = data
      })
    },
    // 获取流程参数
    getProcessParam() {
      this.branchParamList = []
      const param = {
        definitionId: this.configBaseInfo.registerId
      }
      getParamListNo(param).then(({ data }) => {
        this.branchParamList = data
      })
    },
    // 判断该当前流程参数为数据字典还是整数;
    changeBranch(id, x, y) {
      this.branchParamList.map(item => {
        if (id === item.id) {
          if (item.type === 'dictionary') {
            this.branchForm[y].condition[x].status = true
            this.getDictionaryType(item.dictionaryTypeId)
          } else {
            this.branchForm[y].condition[x].status = false
          }
        }
      })
    },
    // 获取数据字典项
    getDictionaryType(id) {
      const param = {
        typeCode: id
      }
      getTypeCode(param).then(({ data }) => {
        this.dictionaryList = data
      })
    },
    // 环节审批人修改 --nodeContent
    linkApprover(data) {
      if (this.linkForm.approverType === '01' || this.linkForm.approverType === '05') {
        this.constant.approverType.forEach(item => {
          if (this.linkForm.approverType === item.code) {
            data.nodeContent = item.name
          }
        })
      } else if (this.linkForm.approverType === '02' || this.linkForm.approverType === '03' || this.linkForm.approverType === '06') {
        this.approverList.forEach(item => {
          if (this.linkForm.approverType === '06') {
            if (this.linkForm.approvers === item.id) {
              data.nodeContent = item.name
            }
          } else {
            this.linkForm.approvers.forEach(e => {
              if (e === item.id) {
                data.nodeContent += item.name + '/'
              }
            })
          }
        })
        if (this.linkForm.approverType !== '06') {
          data.nodeContent = data.nodeContent.substr(0, data.nodeContent.length - 1)
        }
      } else if (this.linkForm.approverType === '04') {
        this.constant.managerType.forEach(item => {
          if (this.linkForm.executiveType === item.code) {
            data.nodeContent = '发起人的' + item.name
          }
        })
      } else {
        if (this.linkForm.selectRange === '01' || this.linkForm.selectRange === '02') {
          this.constant.impromptuAssignRange.forEach(item => {
            if (this.linkForm.selectRange === item.code) {
              data.nodeContent = item.name
            }
          })
        } else {
          this.approverList.forEach(item => {
            if (this.linkForm.approvers instanceof Array) {
              this.linkForm.approvers.forEach(e => {
                if (e === item.id) {
                  data.nodeContent += item.name + '/'
                }
              })
            } else {
              if (this.linkForm.approvers === item.id) {
                data.nodeContent = item.name
              }
            }
          })
          data.nodeContent = data.nodeContent.substr(0, data.nodeContent.length - 1)
        }
      }
      return data
    },
    // 判断当前分支条件是否全部填写
    judgIsTrim() {
      this.branchForm.forEach(item => {
        if (item.name === '') {
          this.branchFormError = '分支名不可为空'
        }
        item.condition.forEach(element => {
          if (element.branchParam === '' || !('branchParam' in element)) {
            this.branchFormError = '条件参数不可为空'
          } else if (element.branchRelation === '' || !('branchRelation' in element)) {
            this.branchFormError = '条件关系不可为空'
          } else if (element.branchNumber === '' || !('branchNumber' in element)) {
            this.branchFormError = '条件参数值不可为空'
          }
        })
        if (item.condition.length >= 2) {
          if (item.branchType === '' || !('branchType' in item)) {
            this.branchFormError = '符合条件不可为空'
          }
        }
      })
    },
    // 获取当前环节可退回的环节
    returnFun(id) {
      this.linkData.forEach(item => {
        if (item.id === id) {
          this.returnList.push(item)
          this.returnFun(item.upperLayerId)
        }
      })
    },
    // 可退回环节的去重
    returnFunRepeat() {
      for (var i = 0; i < this.returnList.length; i++) {
        for (var j = i + 1; j < this.returnList.length;) {
          if (this.returnList[i].id === this.returnList[j].id) {
            this.returnList.splice(j, 1)
          } else j++
        }
      }
    },
    // 筛选流程表单
    changeTaskType(value) {
      this.linkFormList = []
      this.processForm.map(item => {
        if (item.type === value) {
          this.linkFormList.push(item)
        }
      })
    }

  }
}
</script>
<style lang="less" scoped>
.addBranch {
  ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    li {
      margin-top: 10px;
      .branchName {
        span {
          float: right;
          font-size: 12px;
        }
        span:nth-of-type(1) {
          float: left;
        }
        .el-input {
          margin-right: 10px;
        }
        .required-mark {
          color: red;
          font-size: 12px;
        }
      }
      .branchCondition {
        margin-left: 56px;
        margin-top: 10px;
        .meets {
          font-size: 12px;
          .el-select {
            width: 100px;
          }
        }
        .condition {
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 5px;
            span {
              font-size: 12px;
              width: 150px;
            }
            .el-select {
              margin-right: 5px;
            }
            .el-row {
              .el-col:nth-of-type(3){
                display: flex;
                justify-content: flex-end;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
}
.ruleForm {
    display: flex;
    flex-wrap: wrap;
    &>.el-form-item {
      width: 100%;
      .el-select {
        width: 100%;
      }

    }
    &>.el-form-item:nth-of-type(1),
    &>.el-form-item:nth-of-type(2)
      {
      width: 50%;
    }
    &>.isWidth{
      width: 50%;
    }
}
.sponsorForm {
    display: flex;
    flex-wrap: wrap;
    &>.el-form-item {
      width: 50%;
      .el-select {
        width: 100%;
      }
    }
    &>.el-form-item:nth-of-type(3) {
      width: 100%;
    }
}
</style>
