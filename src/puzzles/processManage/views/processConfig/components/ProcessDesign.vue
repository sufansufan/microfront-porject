<template>
  <div class="process-design">
    <div class="fd-nav-content">
      <div class="dingflow-design">
        <div id="box-scale" class="box-scale" :style="'transform: scale('+nowVal/100+'); transform-origin: 50% 0px 0px;'">
          <node-wrap
            ref="nodeWrap"
            :node-config.sync="nodeConfig"
            :flow-permission.sync="flowPermission"
            :is-tried.sync="isTried"
            :director-max-level="directorMaxLevel"
            :table-id="tableId"
          />
          <div class="end-node">
            <div class="end-node-circle" />
            <div class="end-node-text">流程结束</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NodeWrap from './NodeWrap'
import { mapGetters } from 'vuex'
import { getUuid } from '@core/utils'
import { saveConfigProcess, releaseDefault, validateFlow, getParamListNo, releaseCustom } from '@core/api/processManage/workflowmanager'
export default {
  name: 'ProcessDesign',
  components: {
    NodeWrap
  },
  props: {
    processDesignData: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      isTried: false,
      tipList: [],
      tipVisible: false,
      nowVal: 100,
      processConfig: {},
      nodeConfig: {},
      workFlowDef: {},
      flowPermission: [],
      directorMaxLevel: 0,
      dialogVisible: true,
      tableId: '',
      sequenceFlow: [], // 线 -- 分支
      userTask: [], // 点   --- 环节
      indexLevel: 0,
      startPoint: getUuid(),
      endPoint: getUuid(),
      canRetuenData: [],
      branchParamList: []
    }
  },
  computed: {
    ...mapGetters(['configBaseInfo'])
  },
  watch: {
    processConfig: {
      handler(val) {
        this.$store.commit('SET_PROCESSDATA', val.nodeConfig)
      },
      immediate: true,
      deep: true
    },
    processDesignData: {
      handler(val) {
        if (JSON.stringify(val) !== '{}') {
          // this.getReturnData(val.nodeConfig.childNode)
        }
      },
      immediate: true,
      deep: true
    }
  },

  created() {
    const data = {
      'tableId': 1,
      'workFlowVersionId': '',
      'directorMaxLevel': 0,
      'flowPermission': [],
      'nodeConfig': {
        'pkId': 'startEvent',
        'nodeName': '发起申请',
        'nodeCode': '',
        'nodeContent': '发起人',
        'id': this.startPoint,
        'type': 0,
        'priorityLevel': '',
        'settype': '',
        'selectMode': '',
        'selectRange': '',
        'examineRoleId': '',
        'directorLevel': '',
        'replaceByUp': '',
        'examineMode': '',
        'noHanderAction': '',
        'examineEndType': '',
        'examineEndRoleId': '',
        'examineEndDirectorLevel': '',
        'ccSelfSelectFlag': '',
        'conditionList': [],
        'nodeUserList': [],
        'childNode': null,
        'conditionNodes': [],
        'endId': this.endPoint,
        'parentId': this.startPoint,
        'sponsorForm': ''
      }
    }
    this.processConfig = data
    if (this.$route.query.type !== 'add') {
      if (JSON.stringify(this.processDesignData) === '{}') {
        this.processConfig = data
      } else {
        this.processConfig = this.processDesignData
      }
    }
    this.nodeConfig = this.processConfig.nodeConfig
    this.flowPermission = this.processConfig.flowPermission
    this.directorMaxLevel = this.processConfig.directorMaxLevel
    this.tableId = this.processConfig.tableId
    this.getProcessParam()
  },
  methods: {

    saveRelease(type) {
      this.sequenceFlow = []
      this.userTask = []
      if (this.nodeConfig.childNode) {
        this.dataSplice(this.nodeConfig.childNode, this.processConfig.nodeConfig.id)
      }
      this.lineRepeat()
      this.pointRepeat()
      var data = {
        no: 'myProcess',
        name: '流程',
        event: [
          {
            eventType: 'startEvent',
            id: this.nodeConfig.id,
            name: this.nodeConfig.nodeName,
            carbonCopyPersonType: this.$refs.nodeWrap.sponsorForm.CCUserType,
            carbonCopyPersons: this.$refs.nodeWrap.sponsorForm.CCUser.join(),
            ccGroup: getUuid(),
            formId: this.$refs.nodeWrap.sponsorForm.formId
          },
          {
            eventType: 'endEvent',
            id: this.processConfig.nodeConfig.endId
          },
          ...this.sequenceFlow,
          ...this.userTask
        ]
      }
      this.processConfig.nodeConfig.sponsorForm = this.$refs.nodeWrap.sponsorForm
      const params = {
        Loading: true,
        flow: JSON.stringify(data),
        flowConfigId: this.configBaseInfo.id,
        originFlow: JSON.stringify(this.processConfig),
        type: 'json'
      }
      // console.log(JSON.stringify(this.processConfig))
      if (type === 'save') {
        saveConfigProcess(params).then(({ data }) => {
          this.$message.success('保存成功')
        })
      } else if (type === 'release') {
        if (this.$route.query.type === 'customize') {
          releaseCustom(params).then(({ data }) => {
            if (data) {
              const { errorMessage, warnMessage } = data
              if (errorMessage) {
                this.$message.error(errorMessage)
              } else {
                if (warnMessage) {
                  this.$message.warning(warnMessage)
                } else {
                  this.$message.success('自定义配置发布成功')
                }
              }
            } else {
              this.$message.success('自定义配置发布成功')
            }
          })
        } else {
          releaseDefault(params).then(({ data }) => {
            if (data) {
              const { errorMessage, warnMessage } = data
              if (errorMessage) {
                this.$message.error(errorMessage)
              } else {
                if (warnMessage) {
                  this.$message.warning(warnMessage)
                } else {
                  this.$message.success('发布成功')
                }
              }
            } else {
              this.$message.success('发布成功')
            }
          })
        }
      } else if (type === 'validate') {
        validateFlow(params).then(({ data }) => {
          const { errorMessage, warnMessage } = data
          if (errorMessage) {
            this.$message.error(errorMessage)
          } else {
            if (warnMessage) {
              this.$message.warning(warnMessage)
            } else {
              this.$message.success('校验成功')
            }
          }
        })
      }
    },
    // 线去重
    lineRepeat() {
      for (var i = 0; i < this.sequenceFlow.length; i++) {
        for (var j = i + 1; j < this.sequenceFlow.length;) {
          if (this.sequenceFlow[i].sourceRef === this.sequenceFlow[j].sourceRef && this.sequenceFlow[i].targetRef === this.sequenceFlow[j].targetRef) {
            this.sequenceFlow.splice(j, 1)
          } else j++
        }
      }
    },
    // 点去重
    pointRepeat() {
      for (var i = 0; i < this.userTask.length; i++) {
        for (var j = i + 1; j < this.userTask.length;) {
          if (this.userTask[i].id === this.userTask[j].id) {
            this.userTask.splice(j, 1)
          } else j++
        }
      }
    },
    // 数据处理
    dataSplice(data, id) {
      if (data.nodeName === '') {
        var gateway = {
          eventType: 'gateway',
          id: data.id
        }
        this.userTask.push(gateway)
        // 开始回调
        if (data.childNode) {
          if (data.childNode.nodeName === '') {
            this.dataSplice(data.childNode, data.childNode.id)
          } else {
            this.dataSplice(data.childNode, data.id)
          }
        }
        if (id === this.startPoint) {
          var startLine = {
            eventType: 'sequenceFlow',
            index: this.indexLevel,
            id: getUuid(),
            name: '',
            sourceRef: id,
            targetRef: data.id,
            type: '',
            params: []
          }
          this.sequenceFlow.push(startLine)
        }
        // 分支的开始结束的线
        data.conditionNodes.forEach(item => {
          var branchGateway = {
            eventType: 'gateway',
            id: item.id
          }
          this.userTask.push(branchGateway)
          if (item.childNode) {
            this.dataSplice(item.childNode, item.id)
          }
          // 分支的开始线 id - item.id (有条件的)
          this.indexLevel += 1
          var branchData = {
            eventType: 'sequenceFlow',
            index: this.indexLevel,
            id: getUuid(),
            name: item.nodeName,
            sourceRef: data.id,
            targetRef: item.id,
            type: item.branchForm.branchType,
            params: []
          }
          item.branchForm.condition.forEach(e => {
            const paramsData = {
              paramId: e.branchParam,
              key: '',
              type: e.branchRelation,
              value: e.branchNumber
            }
            this.branchParamList.forEach(ep => {
              if (ep.id === e.branchParam) {
                paramsData.key = ep.param
              }
            })
            branchData.params.push(paramsData)
          })
          this.sequenceFlow.push(branchData)
          // 结束的线 item.id - (item.childNode.id 或者 data.childNode.id(data.childNode存在) 否则就是 endPoint)
          var nodeBranchData = {
            eventType: 'sequenceFlow',
            index: this.indexLevel,
            id: getUuid(),
            name: '',
            sourceRef: '',
            targetRef: '',
            type: '',
            params: []
          }
          if (item.childNode) {
            nodeBranchData.sourceRef = item.id
            nodeBranchData.targetRef = item.childNode.id
            if (item.childNode.nodeName !== '') {
              var nodeLinkLine = {
                eventType: 'sequenceFlow',
                index: this.indexLevel,
                id: getUuid(),
                name: '',
                sourceRef: '',
                targetRef: '',
                type: '',
                params: []
              }
              if (item.childNode.childNode) {
                nodeLinkLine.sourceRef = item.childNode.id
                nodeLinkLine.targetRef = item.childNode.childNode.id
              } else {
                if (data.childNode) {
                  nodeLinkLine.sourceRef = item.childNode.id
                  nodeLinkLine.targetRef = data.childNode.id
                } else {
                  nodeLinkLine.sourceRef = item.childNode.id
                  nodeLinkLine.targetRef = this.processConfig.nodeConfig.endId
                }
              }
              this.sequenceFlow.push(nodeLinkLine)
            }
          } else {
            if (data.childNode) {
              nodeBranchData.sourceRef = item.id
              nodeBranchData.targetRef = data.childNode.id
            } else {
              nodeBranchData.sourceRef = item.id
              nodeBranchData.targetRef = this.processConfig.nodeConfig.endId
            }
          }
          this.sequenceFlow.push(nodeBranchData)
        })
      } else {
        const { taskType, approverType, approvers, executiveType, carbonCopyPersonType, carbonCopyPersons, approveType, formId, skip, goBack, selectRange, goBackTarget } = data.linkForm
        this.userTask.push({
          eventType: 'userTask',
          id: data.id,
          name: data.nodeName,
          taskType,
          approverType,
          approvers: approvers === '' ? '' : approvers.join(','),
          executiveType,
          selectRange,
          carbonCopyPersonType,
          carbonCopyPersons: carbonCopyPersons.join(','),
          approverGroup: getUuid(),
          ccGroup: getUuid(),
          approveType,
          formId,
          skip,
          goBack,
          goBackTarget: goBackTarget.join(','),
          parentId: data.parentId,
          upperLayerId: data.upperLayerId
        })
        // 环节开始线
        var startLinkLine = {
          eventType: 'sequenceFlow',
          index: this.indexLevel,
          id: getUuid(),
          name: '',
          sourceRef: id,
          targetRef: data.id,
          type: '',
          params: []
        }
        this.sequenceFlow.push(startLinkLine)
        // 环节的结束线 当id ！== this.startPoint时则不划线
        var endLinkLine = {
          eventType: 'sequenceFlow',
          index: this.indexLevel,
          id: getUuid(),
          name: '',
          sourceRef: '',
          targetRef: '',
          type: '',
          params: []
        }
        if (id === this.startPoint) {
          if (data.childNode) {
            endLinkLine.sourceRef = data.id
            endLinkLine.targetRef = data.childNode.id
          } else {
            endLinkLine.sourceRef = data.id
            endLinkLine.targetRef = this.processConfig.nodeConfig.endId
          }
        } else {
          if (data.childNode) {
            endLinkLine.sourceRef = data.id
            endLinkLine.targetRef = data.childNode.id
          } else {
            if (data.conditionNodes.length === 0) {
              endLinkLine.sourceRef = data.id
              endLinkLine.targetRef = this.processConfig.nodeConfig.endId
            }
          }
        }
        if (endLinkLine.sourceRef) {
          this.sequenceFlow.push(endLinkLine)
        }
      }
      if (data.childNode) {
        if (data.childNode.nodeName === '') {
          this.dataSplice(data.childNode, data.childNode.id)
        } else {
          this.dataSplice(data.childNode, data.id)
        }
      }
    },
    getProcessParam() {
      this.branchParamList = []
      const param = {
        definitionId: this.configBaseInfo.registerId
      }
      getParamListNo(param).then(({ data }) => {
        this.branchParamList = data
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../css/workflow.css";
.error-modal-list {
	width: 455px;
}
</style>
