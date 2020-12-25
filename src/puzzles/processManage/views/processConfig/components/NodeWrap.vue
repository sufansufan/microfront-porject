<template>
  <div class="nodeWrap">
    <div v-if="nodeConfig.type!=4" class="node-wrap">
      <!-- 环节 -->
      <div class="node-wrap-box" :class="(nodeConfig.type==0?'start-node ':'')">
        <div>
          <span>
            <i v-if="nodeConfig.nodeCode === ''" id="pointIcon" class="iconfont icon-lujing" />
            <i v-if="nodeConfig.nodeCode === 'link'" id="pointIcon" class="iconfont icon-huanjie" style="font-size:40px" />
            <i v-if="nodeConfig.type!=0" id="pointIconColse" class="iconfont el-icon-circle-close" @click="delNode()" />
          </span>
          <div class="title" style="text-align: center;">
            <span :title="nodeConfig.nodeName" :class="nodeConfig.type === 0 ? '':'editable-title'" @click="setPerson(nodeConfig)">{{ nodeConfig.nodeName }}</span>
          </div>
          <div class="content" @click="setPerson(nodeConfig)">
            <div class="text" :title="nodeConfig.nodeContent">{{ nodeConfig.nodeContent }}</div>
          </div>
        </div>
      </div>
      <addNode
        ref="addNodeRef"
        :return-data="nodeConfig"
        :child-node-p.sync="nodeConfig.childNode"
        @delNode="delNode"
      />
    </div>
    <!-- 分支 -->
    <div v-if="nodeConfig.type==4" class="branch-wrap">
      <div class="branch-box-wrap">
        <div class="branch-box">
          <div v-for="(item,index) in nodeConfig.conditionNodes" :key="index" class="col-box">
            <div class="condition-node">
              <div class="condition-node-box">
                <div class="auto-judge">
                  <div class="branchIcon">
                    <i class="iconfont icon-fenzhi" />
                    <span class="priority-title">
                      <i class="el-icon-circle-plus-outline" @click="addTerm(index)" />
                      <i v-if="index!=0" class="iconfont icon-zuoyi1" @click="arrTransfer(index,-1)" />
                      <i v-if="index!=nodeConfig.conditionNodes.length-1" class="iconfont icon-youyi1" @click="arrTransfer(index)" />
                      <i class="el-icon-circle-close" style="color:red" @click="delTerm(index)" />
                    </span>
                  </div>
                  <div class="title-wrapper">
                    <span class="editable-title" :title="item.nodeName" @click="setPerson(item)">{{ item.nodeName }}</span>
                  </div>
                  <div class="content" :title="item.nodeContent" @click="setPerson(item)">
                    <span v-for="(element,indexE) in item.nodeContent" :key="indexE">{{ element.name }}</span>
                  </div>

                </div>
                <addNode
                  ref="addNodeRef"
                  :return-data="item"
                  :child-node-p.sync="item.childNode"
                  @delNode="delNode"
                />
              </div>
            </div>
            <nodeWrap
              v-if="item.childNode && item.childNode"
              :node-config.sync="item.childNode"
              :table-id="tableId"
              :is-tried.sync="isTried"
              :director-max-level="directorMaxLevel"
            />
            <div v-if="index==0" class="top-left-cover-line" />
            <div v-if="index==0" class="bottom-left-cover-line" />
            <div v-if="index==nodeConfig.conditionNodes.length-1" class="top-right-cover-line" />
            <div v-if="index==nodeConfig.conditionNodes.length-1" class="bottom-right-cover-line" />
          </div>
        </div>
        <addNode
          ref="addNodeRef"
          :return-data="nodeConfig"
          :child-node-p.sync="nodeConfig.childNode"
          @delNode="delNode"
        />
      </div>
    </div>
    <!-- 发起人 -->
    <drag-dialog ref="promoterDrawer" title="发起申请" :append="true" width="50%">
      <el-form ref="sponsorForm" :model="sponsorForm" label-width="130px" :rules="sponsorRules" class="sponsorForm">
        <el-form-item label="是否需要抄送" prop="isCC">
          <el-switch v-model="sponsorForm.isCC" /> <span style="color:#ccc;font-size:12px;">环节提交后将抄送到给抄送人</span>
        </el-form-item>
        <el-form-item label="审批表单" prop="formId">
          <el-select v-model="sponsorForm.formId" filterable clearable placeholder="请选择审批表单">
            <el-option
              v-for="item in linkFormList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="sponsorForm.isCC" label="抄送人类型" prop="CCUserType">
          <el-select v-model="sponsorForm.CCUserType" filterable clearable placeholder="请选择抄送人类型" @change="changeApproverType">
            <el-option
              v-for="item in constant.ccType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="sponsorForm.isCC && sponsorForm.CCUserType !==''" label="抄送人" prop="CCUser">
          <el-select v-model="sponsorForm.CCUser" filterable multiple clearable placeholder="请选择抄送人">
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
        <el-button type="primary" @click="promoterDrawerSub">确 定</el-button>
      </div>
    </drag-dialog>
    <!-- 添加分支 -->
    <drag-dialog ref="addBranchDialog" :title="addBranchTitle" :append="true" width="50%">
      <div class="brancheName">
        <span class="required-mark"> * </span>
        <span>分支名称:</span>
        <el-input v-model="appendBranch.name" />
        <el-button v-if="appendBranch.condition.length === 0" @click="childCondition('add',index)">添加条件</el-button>
        <el-button v-if="appendBranch.condition.length > 0" @click="childCondition('clear',index)">清除条件</el-button>
      </div>
      <div v-if="appendBranch.condition.length >= 2" class="condition">
        <span>符合</span>
        <el-select v-model="appendBranch.branchType" filterable clearable placeholder="请选择">
          <el-option
            v-for="e in branchTypeList"
            :key="e.value"
            :label="e.name"
            :value="e.value"
          />
        </el-select>
        <span>以下条件：</span>
      </div>
      <ul class="conditionList">
        <li v-for="(item,index) in appendBranch.condition" :key="index">
          <span>条件 {{ index + 1 }} :</span>
          <el-select v-model="item.branchParam" filterable clearable placeholder="请选择流程参数" @change="changeBranch(item.branchParam,index)">
            <el-option
              v-for="element in branchParamList"
              :key="element.id"
              :label="element.name"
              :value="element.id"
            />
          </el-select>
          <el-select v-model="item.branchRelation" filterable clearable placeholder="请选择关系">
            <el-option
              v-for="element in constant.relationship"
              :key="element.code"
              :label="element.name"
              :value="element.code"
            />
          </el-select>
          <el-select v-if="item.status" v-model="item.branchNumber" filterable multiple clearable placehol-der="请选择">
            <el-option
              v-for="element in dictionaryList"
              :key="element.id"
              :label="element.name"
              :value="element.id"
            />
          </el-select>
          <el-input v-else v-model="item.branchNumber" />
          <el-button icon="el-icon-plus" @click="childCondition('add',index)" />
          <el-button icon="el-icon-minus" @click="childCondition('del',index)" />
        </li>
      </ul>
      <div slot="footer">
        <el-button type="primary" @click="appendBranchSub">确 定</el-button>
      </div>
    </drag-dialog>
    <node-wrap
      v-if="nodeConfig.childNode && nodeConfig.childNode"
      :node-config.sync="nodeConfig.childNode"
      :table-id="tableId"
      :is-tried.sync="isTried"
      :director-max-level="directorMaxLevel"
    />
  </div>
</template>
<script>
import AddNode from './AddNode'
import { getUuid } from '@core/utils'
import { getByCondition } from '@core/api/post'
import { getApproverList } from '@core/api/personnel'
import { mapGetters } from 'vuex'
import DragDialog from '@frames/dashboard/components/Dialog'
import { getParamListNo, getProcessFormList } from '@core/api/processManage/workflowmanager'
import { getTypeCode } from '@core/api/dictionary'
export default {
  name: 'NodeWrap',
  components: {
    AddNode,
    DragDialog
  },
  props: {
    nodeConfig: {
      default: () => {},
      type: Object
    },
    flowPermission: {
      default: () => [],
      type: Array
    },
    directorMaxLevel: {
      default: () => 0,
      type: Number
    },
    isTried: {
      default: () => false,
      type: Boolean
    },
    tableId: {
      default: () => '',
      type: String
    }
  },
  data() {
    return {
      returnData: {},
      flowPermission1: this.flowPermission,
      approverDrawer: false,
      approverVisible: false,
      approverRoleVisible: false,
      approverConfig: {},
      approverEmplyessList: [],
      approverSearchName: '',
      roles: [],
      roleList: [],
      approverRoleSearchName: '',
      copyerVisible: false,
      copyerSearchName: '',
      activeName: '1',
      copyerEmployessList: [],
      copyerRoleList: [],
      ccSelfSelectFlag: [],
      conditionDrawer: false,
      conditionVisible: false,
      conditionConfig: {},
      conditionsConfig: {
        conditionNodes: []
      },
      bPriorityLevel: '',
      conditions: [],
      conditionList: [],
      conditionRoleVisible: false,
      conditionRoleSearchName: '',
      conditionDepartmentList: [],
      conditionEmployessList: [],
      conditionRoleList: [],
      // 发起申请
      sponsorForm: {
        isCC: false,
        CCUserType: '',
        CCUser: [],
        formId: ''
      },
      sponsorRules: {
        CCUserType: [{ required: true, message: '请选择抄送人类型', trigger: 'change' }],
        CCUser: [{ required: true, message: '请选择抄送人', trigger: 'change' }],
        formId: [{ required: true, message: '请选择审批表单', trigger: 'change' }]
      },
      CCList: [],
      appendBranch: {
        name: '',
        branchType: '',
        condition: []
      },
      branchTypeList: [
        { value: 'all', name: '全部' },
        { value: 'any', name: '任意' }
      ],
      appendBranchIndex: 0,
      branchParamList: [],
      addBranchTitle: '追加分支',
      appendBranchItem: {},
      linkFormList: [],
      canRetuenData: []
    }
  },
  computed: {
    ...mapGetters(['constant', 'configBaseInfo', 'processData'])
  },
  created() {
    this.$store.dispatch('getConstant', ['relationship', 'useRange'])
    this.getProcessParam()
    this.getProcessForm()
  },
  mounted() {

  },
  methods: {
    // 获取流程表单
    getProcessForm() {
      this.linkFormList = []
      const param = {
        definitionId: this.configBaseInfo.registerId
      }
      getProcessFormList(param).then(({ data }) => {
        data.map(item => {
          if (item.type === 'approve') {
            this.linkFormList.push(item)
          }
        })
      })
    },
    // 删除环节
    delNode() {
      if (this.$route.query.type === 'view') return
      this.$emit('update:nodeConfig', this.nodeConfig.childNode)
    },
    // 添加分支
    addTerm(index) {
      this.addBranchTitle = '追加分支'
      this.appendBranch = {
        name: '',
        branchType: '',
        condition: []
      }
      this.appendBranchIndex = index
      this.$refs.addBranchDialog.show = true
      const len = this.nodeConfig.conditionNodes.length + 1
      this.appendBranch.name = '条件' + len
    },
    appendBranchSub() {
      if (this.judgAppendBranch()) {
        this.$message.warning(this.judgAppendBranch())
        return
      }

      if (this.addBranchTitle === '编辑分支') {
        this.nodeConfig.conditionNodes.map(item => {
          if (item.id === this.appendBranchItem.id) {
            item.nodeName = this.appendBranch.name
            item.branchForm = this.appendBranch
            item.nodeContent = this.dealBranchName()
          }
        })
      } else {
        const len = this.nodeConfig.conditionNodes.length + 1
        const data = {
          'nodeName': this.appendBranch.name,
          'nodeCode': 'branch',
          'nodeContent': [],
          'id': getUuid(),
          'type': 3,
          'priorityLevel': len,
          'conditionList': [],
          'nodeUserList': [],
          'childNode': null,
          'branchForm': this.appendBranch
        }
        data.nodeContent = this.dealBranchName()
        this.nodeConfig.conditionNodes.splice(this.appendBranchIndex + 1, 0, data)
      }
      this.$emit('update:nodeConfig', this.nodeConfig)
      this.$refs.addBranchDialog.show = false
    },
    // 判断当前分支条件是否为空
    judgAppendBranch() {
      var warnData = ''
      if (this.appendBranch.name === '') {
        warnData = '分支名称不可为空'
      }
      if (this.appendBranch.condition.length >= 2) {
        if (this.appendBranch.branchType === '') {
          warnData = '符合条件不可为空'
        }
      }
      this.appendBranch.condition.forEach(item => {
        if (item.branchParam === '' || !('branchParam' in item)) {
          warnData = '条件参数不可为空'
        } else if (item.branchRelation === '' || !('branchRelation' in item)) {
          warnData = '条件关系不可为空'
        } else if (item.branchNumber === '' || !('branchNumber' in item)) {
          warnData = '条件参数值不可为空'
        }
      })
      return warnData
    },
    // 编辑分支内容
    dealBranchName() {
      if (this.appendBranch.condition.length === 0) {
        return ''
      } else {
        var content = []
        this.appendBranch.condition.forEach(item => {
          var contentStr = ''
          this.branchParamList.forEach(element => {
            if (item.branchParam === element.id) {
              contentStr += element.name
            }
          })
          switch (item.branchRelation) {
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
          if (item.branchNumber instanceof Array) {
            item.branchNumber.forEach(e => {
              this.dictionaryList.forEach(es => {
                if (e === es.id) {
                  contentStr += es.name + '||'
                }
              })
            })
            contentStr = contentStr.substring(0, contentStr.length - 2)
          } else {
            contentStr += item.branchNumber
          }
          content.push({ name: contentStr })
        })
        if (this.appendBranch.condition >= 2) {
          if (this.appendBranch.branchType === 'all') {
            content.forEach((e, i) => {
              if (i !== content.length - 1) {
                e.name = e.name + ' 并且'
              }
            })
          } else {
            content.forEach((e, i) => {
              if (i !== content.length - 1) {
                e.name = e.name + '或'
              }
            })
          }
        }
        return content
      }
    },
    // 删除分支
    delTerm(index) {
      if (this.$route.query.type === 'view') return
      this.nodeConfig.conditionNodes.splice(index, 1)
      this.$emit('update:nodeConfig', this.nodeConfig)
      if (this.nodeConfig.conditionNodes.length === 1) {
        if (this.nodeConfig.childNode) {
          if (this.nodeConfig.conditionNodes[0].childNode) {
            this.reData(this.nodeConfig.conditionNodes[0].childNode, this.nodeConfig.childNode)
          } else {
            this.nodeConfig.conditionNodes[0].childNode = this.nodeConfig.childNode
          }
        }
        this.$emit('update:nodeConfig', this.nodeConfig.conditionNodes[0].childNode)
      }
    },
    reData(data, addData) {
      if (!data.childNode) {
        data.childNode = addData
      } else {
        this.reData(data.childNode, addData)
      }
    },
    // 点击环节内容
    setPerson(item) {
      if (this.$route.query.type === 'view') return
      var { type } = this.nodeConfig
      if (type === 0) {
        // 发起人
        this.sponsorForm = {
          isCC: false,
          CCUserType: '',
          CCUser: [],
          formId: ''
        }
        this.sponsorForm = {
          ...this.nodeConfig.sponsorForm
        }
        console.log(this.nodeConfig.sponsorForm)
        this.$refs.promoterDrawer.show = true
      } else if (type === 2) {
        this.$refs.addNodeRef.editLink(this.nodeConfig)
      } else {
        // 点击分支
        this.addBranchTitle = '编辑分支'
        this.appendBranch = {
          name: '',
          branchType: '',
          condition: []
        }
        item.branchForm.condition.map(element => {
          this.branchParamList.forEach(e => {
            if (element.branchParam === e.id) {
              if (e.type === 'dictionary') {
                this.getDictionaryType(e.dictionaryTypeId)
              }
            }
          })
        })
        this.appendBranch = JSON.parse(JSON.stringify(item.branchForm))
        this.$refs.addBranchDialog.show = true
        this.appendBranchItem = JSON.parse(JSON.stringify(item))
        console.log(item)
      }
    },
    // 编辑环节确定
    editLinkSub(data) {
      console.log(data)
      this.nodeConfig.childNode = data
      this.$emit('update:nodeConfig', this.nodeConfig.childNode)
    },
    // 移动分支位置
    arrTransfer(index, type = 1) { // 向左-1,向右1
      if (this.$route.query.type === 'view') return
      this.nodeConfig.conditionNodes[index] = this.nodeConfig.conditionNodes.splice(index + type, 1, this.nodeConfig.conditionNodes[index])[0]
      this.nodeConfig.conditionNodes.map((item, index) => {
        item.priorityLevel = index + 1
      })
      this.$emit('update:nodeConfig', this.nodeConfig)
    },
    // 获取抄送人
    changeApproverType() {
      const params = {
        orgId: this.configBaseInfo.organizationId,
        orgTypeList: this.configBaseInfo.isCommonUse ? [] : this.configBaseInfo.useRange.split(',')
      }

      this.sponsorForm.CCUser = []
      this.CCList = []
      if (this.sponsorForm.CCUserType === '01') {
        getApproverList(params).then(({ data }) => {
          if (data) {
            var listData = []
            data.forEach(item => {
              listData.push({ name: item.name, id: item.id })
            })
            this.CCList = listData
          }
        })
      } else {
        getByCondition(params).then(({ data }) => {
          if (data) {
            var listData = []
            data.forEach(item => {
              listData.push({ name: item.postName, id: item.id })
            })
            this.CCList = listData
          }
        })
      }
    },
    // 发起申请修改
    promoterDrawerSub() {
      this.$refs.sponsorForm.validate(valid => {
        if (valid) {
          this.$refs.promoterDrawer.show = false
          this.nodeConfig.sponsorForm = this.sponsorForm
          console.log(this.nodeConfig)
        }
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
    changeBranch(id, index) {
      this.branchParamList.map(item => {
        if (id === item.id) {
          if (item.type === 'dictionary') {
            this.appendBranch.condition[index].status = true
            this.getDictionaryType(item.dictionaryTypeId)
          } else {
            this.appendBranch.condition[index].status = false
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
    // 添加分支条件
    childCondition(type, index) {
      if (type === 'add') {
        this.appendBranch.condition.push({})
      } else if (type === 'clear') {
        this.appendBranch.condition = []
      } else {
        this.appendBranch.condition.splice(index, 1)
      }
    }

  }
}
</script>
<style lang="less" scoped>
.nodeWrap {
  box-sizing: border-box;
  .node-wrap {
    box-sizing: border-box;
  }
}
.brancheName {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  span {
    width: 80px;
    font-size: 12px;
  }
  span:nth-of-type(1){
    width: 10px;
  }
  .el-input {
    margin-right: 10px;
  }
  .required-mark {
    color: red;
    font-size: 12px;
  }
}
.conditionList {
  margin: 10px 0;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      width: 140px;
      font-size: 12px;
    }
    .el-select {
      width: 300px;
      margin-right: 10px;
    }
    .el-input {
      margin-right: 10px;
    }
  }
}
</style>
<style>

.add-node-popover-body {
    display: flex;
}
.promoter_content {
    padding: 0 20px;
}
.condition_content .el-button,
.copyer_content .el-button,
.approver_self_select .el-button,
.promoter_content .el-button,
.approver_content .el-button {
    margin-bottom: 20px;
}
.promoter_content p {
    padding: 18px 0;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
}
.promoter_person .el-dialog__body {
    padding: 10px 20px 14px 20px;
}
.person_body {
    border: 1px solid #f5f5f5;
    height: 500px;
}
.person_tree {
    padding: 10px 12px 0 8px;
    width: 280px;
    height: 100%;
    border-right: 1px solid #f5f5f5;
}
.person_tree input {
    padding-left: 22px;
    width: 210px;
    height: 30px;
    font-size: 12px;
    border-radius: 2px;
    border: 1px solid #d5dadf;
    /* background: url(~@/assets/images/list_search.png) no-repeat 10px center; */
    background-size: 14px 14px;
    margin-bottom: 14px;
}
.tree_nav span {
    display: inline-block;
    padding-right: 10px;
    margin-right: 5px;
    max-width: 6em;
    color: #38adff;
    font-size: 12px;
    cursor: pointer;
    /* background: url(~@/assets/images/jiaojiao.png) no-repeat right center; */
}
.tree_nav span:last-of-type {
    background: none;
}
.person_tree ul,
.has_selected ul {
    height: 420px;
    overflow-y: auto;
}
.person_tree li {
    padding: 5px 0;
}
.person_tree li i {
    float: right;
    padding-left: 24px;
    padding-right: 10px;
    color: #3195f8;
    font-size: 12px;
    cursor: pointer;
    /* background: url(~@/assets/images/next_level_active.png) no-repeat 10px */
        /* center; */
    border-left: 1px solid rgb(238, 238, 238);
}
.person_tree li a.active + i {
    color: rgb(197, 197, 197);
    /* background-image: url(~@/assets/images/next_level.png); */
    pointer-events: none;
}
.person_tree img {
    width: 14px;
    vertical-align: middle;
    margin-right: 5px;
}
.has_selected {
    width: 276px;
    height: 100%;
    font-size: 12px;
}
.has_selected ul {
    height: 460px;
}
.has_selected p {
    padding-left: 19px;
    padding-right: 20px;
    line-height: 37px;
    border-bottom: 1px solid #f2f2f2;
}
.has_selected p a {
    float: right;
}
.has_selected ul li {
    margin: 11px 26px 13px 19px;
    line-height: 17px;
}
.has_selected li span {
    vertical-align: middle;
}
.has_selected li img:first-of-type {
    width: 14px;
    vertical-align: middle;
    margin-right: 5px;
}
.has_selected li img:last-of-type {
    float: right;
    margin-top: 2px;
    width: 14px;
}
el-radio-group {
    padding: 20px 0;
}
.approver_content {
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f2f2;
}
.approver_content .el-radio,
.approver_some .el-radio,
.approver_self_select .el-radio {
    width: 27%;
    margin-bottom: 20px;
}
.copyer_content .el-checkbox {
    margin-bottom: 20px;
}
.el-checkbox__label {
    font-size: 12px;
}
.condition_content,
.copyer_content,
.approver_self_select,
.approver_manager,
.approver_content,
.approver_some {
    padding: 20px 20px 0;
}
.approver_manager p:first-of-type,
.approver_some p {
    line-height: 19px;
    font-size: 14px;
    margin-bottom: 14px;
}

.approver_manager p {
    line-height: 32px;
}
.approver_manager select {
    width: 420px;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
}
.approver_manager p.tip {
    margin: 10px 0 22px 0;
    font-size: 12px;
    line-height: 16px;
    color: #f8642d;
}
.approver_self {
    padding: 28px 20px;
}
.selected_list {
    margin-bottom: 20px;
    line-height: 30px;
}
.selected_list span {
    margin-right: 10px;
    padding: 3px 6px 3px 9px;
    line-height: 12px;
    white-space: nowrap;
    border-radius: 2px;
    border: 1px solid rgba(220, 220, 220, 1);
}
.selected_list img {
    margin-left: 5px;
    width: 7px;
    height: 7px;
    cursor: pointer;
}
.approver_self_select h3 {
    margin: 5px 0 20px;
    font-size: 14px;
    font-weight: bold;
    line-height: 19px;
}
.condition_copyer .el-drawer__body select {
    position: absolute;
    top: 11px;
    right: 30px;
    width: 100px;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
}
.condition_content p.tip {
    margin: 20px 0;
    width: 510px;
    text-indent: 17px;
    line-height: 45px;
    background: rgba(241, 249, 255, 1);
    border: 1px solid rgba(64, 163, 247, 1);
    color: #46a6fe;
    font-size: 14px;
}
.condition_content ul {
    max-height: 500px;
    overflow-y: scroll;
    margin-bottom: 20px;
}
.condition_content li > span {
    float: left;
    margin-right: 8px;
    width: 70px;
    line-height: 32px;
    text-align: right;
}
.condition_content li > div {
    display: inline-block;
    width: 370px;
}
.condition_content li:not(:last-child) > div > p {
    margin-bottom: 20px;
}
.condition_content li > div > p:not(:last-child) {
    margin-bottom: 10px;
}
.condition_content li > a {
    float: right;
    margin-right: 10px;
    margin-top: 7px;
}
.condition_content li select,
.condition_content li input {
    width: 100%;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
}
.condition_content li select + input {
    width: 260px;
}
.condition_content li select {
    margin-right: 10px;
    width: 100px;
}
.condition_content li p.selected_list {
    padding-left: 10px;
    border-radius: 4px;
    min-height: 32px;
    border: 1px solid rgba(217, 217, 217, 1);
}
.condition_content li p.check_box {
    line-height: 32px;
}
.condition_list .el-dialog__body {
    padding: 16px 26px;
}
.condition_list p {
    color: #666666;
    margin-bottom: 10px;
}
.condition_list p.check_box {
    margin-bottom: 0;
    line-height: 36px;
}
</style>
