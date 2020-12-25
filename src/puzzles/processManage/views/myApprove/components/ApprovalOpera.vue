<template>
  <div class="approval-opera">
    <el-button-group v-if="actionInfo.type !== 'start'">
      <el-button type="primary" @click="operating('ok')">{{ actionInfo.type === 'approve'?'同意':'确认' }}</el-button>
      <el-button v-if="actionInfo.type === 'approve'" type="danger" @click="operating('no')">拒绝</el-button>
    </el-button-group>
    <el-button-group v-if="actionInfo.type !== 'start'">
      <el-button v-if="actionInfo.goBackTargets.length !== 0" type="primary" @click="operating('return')">退回</el-button>
      <el-button type="primary" @click="operating('forward')">转交</el-button>
    </el-button-group>
    <el-button v-if="actionInfo.type !== 'start'" type="primary" @click="operating('cc')">抄送</el-button>
    <el-button v-if="actionInfo.type !== 'start'" type="primary" @click="operating('comment')">评论</el-button>
    <el-button v-if="actionInfo.type === 'start'" type="primary" @click="operating('approve')">提交审批</el-button>
    <el-button @click="operating('cancel')">取消</el-button>
    <drag-dialog ref="dialog" :title="operaTitle" :append="true" width="50%">
      <el-form ref="ruleForm" :model="ruleForm" label-width="130px" :rules="formRules" class="ruleForm">
        <el-form-item v-if="operaTitle === '同意' && actionInfo.nextEventIsImpromptuAssign" label="提交给" prop="impromptu">
          <el-select v-model="ruleForm.impromptu" multiple clearable placeholder="请选择流程提交给谁？多选">
            <el-option
              v-for="item in option"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="operaTitle === '退回'" label="退回至" prop="returnTo">
          <el-select v-model="ruleForm.returnTo" :disabled="actionInfo.goBackTargets.length === 1" clearable placeholder="请选择退回至哪个环节">
            <el-option
              v-for="item in actionInfo.goBackTargets"
              :key="item.templateId"
              :label="item.name"
              :value="item.templateId"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="operaTitle === '转交'" label="转交给" prop="transferUserId">
          <el-select v-model="ruleForm.transferUserId" clearable placeholder="请选择流程转交给谁？多选">
            <el-option
              v-for="item in personalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="operaTitle === '抄送'" label="抄送给" prop="cc">
          <el-select v-model="ruleForm.cc" multiple clearable placeholder="请选择流程抄送给谁？多选">
            <el-option
              v-for="item in personalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select><br>
          <span style="color:#999999">抄送人只能看到当前环节应该看到的内容，只能查看</span>
        </el-form-item>
        <el-form-item v-if="operaTitle === '提交审批'" label="是否发起自由流程" prop="isFree">
          <el-switch v-model="ruleForm.isFree" /><br>
          <span style="color:#999999">若发起自由流程，则每个环节都要指定下个环节的审批人，若不指定则流程提交后流程状态即为完成。每个环节均为审批环节，且均使用默认审批表单。</span>
        </el-form-item>
        <el-form-item v-if="actionInfo.isCustomize ||ruleForm.isFree " label="下环节审批人" prop="approver">
          <el-select v-model="ruleForm.approver" multiple clearable placeholder="请选择流程提交给谁？多选">
            <el-option
              v-for="item in option"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select><br>
          <span style="color:#999999">可多选，若不选人时，流程提交即完成</span>
        </el-form-item>
        <el-form-item v-if="actionInfo.isCustomize ||ruleForm.isFree" label="下环节审批类型" prop="approverType">
          <el-radio-group v-model="ruleForm.approverType">
            <el-radio label="1">非会签</el-radio><span style="color:#999999">所有人中只须一人完成审批，即可进入下一环节，其他人无须完成审批</span><br>
            <el-radio label="2">会签</el-radio><span style="color:#999999">所有人都必须完成审批，才能进入下一环节</span>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="operaTitle !== '提交审批'" :label="texTitle" class="full-width row-label" prop="comment">
          <el-input v-model="ruleForm.comment" type="textarea" :rows="3" :maxlength="255" clearable />
          <div>
            <span>常用语</span>
            <span style="color:#999999">（可在“设置”“个人常用语”中设置属于自己的常用语）</span>
            <div class="tag">
              <div v-for="(tag, index) in tagsList" :key="index">
                <el-tag effect="plain" @click="selectTag(tag.content)"> {{ tag.content }}</el-tag>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="agreeSubmit">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>
<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import { languageList } from '@core/api/personelSet'
import { getPersonnelsByOrgId } from '@core/api/personnel'
import { getSessionStorage } from '@core/utils/auth'
import { validateLength } from '@core/utils/validate'
import { getOperaInfo, btnAgree, btnConfirm, btnRefuse, btnReturn, btnForward, btnCC, btnComment, btnSubmit } from '@core/api/processManage/workflowmanager'
export default {
  components: {
    DragDialog
  },
  data() {
    return {
      operaTitle: '同意',
      texTitle: '意见',
      ruleForm: {
        comment: '',
        impromptu: [],
        approver: '',
        approverType: '1',
        returnTo: '',
        transferUserId: '',
        cc: []
      },
      formRules: {
        comment: validateLength(0, 255),
        impromptu: [{ required: true, message: '请选择流程提交给', trigger: 'change' }],
        returnTo: [{ required: true, message: '请选择退回至哪个环节', trigger: 'change' }],
        transferUserId: [{ required: true, message: '请选择流程转交给', trigger: 'change' }],
        cc: [{ required: true, message: '请选择流程抄送给', trigger: 'change' }]
      },
      tagsList: [],
      option: [
        {
          code: '2',
          name: 'name'
        }
      ],
      actionInfo: { goBackTargets: [] },
      operatingType: '',
      personalList: [],
      returnToList: []
    }
  },
  created() {
    this.getlanguageList()
    this.getBtn()
    // 获取当前归属单位全体员工
    this.getPersonnel()
  },
  methods: {
    operating(type) {
      this.operatingType = type
      switch (type) {
        case 'ok':
          this.operaTitle = '同意'
          this.texTitle = '意见'
          break
        case 'no':
          this.operaTitle = '拒绝'
          this.texTitle = '意见'
          break
        case 'return':
          this.operaTitle = '退回'
          this.texTitle = '意见'
          break
        case 'forward':
          this.operaTitle = '转交'
          this.texTitle = '意见'
          break
        case 'cc':
          this.operaTitle = '抄送'
          this.texTitle = '说明'
          break
        case 'comment':
          this.operaTitle = '评论'
          this.texTitle = '评论'
          break
        case 'approve':
          this.operaTitle = '提交审批'
          this.$emit('submitApproval')
          if (!this.actionInfo.isCustomize) return
          break
        case 'cancel':
          this.$router.go(-1)
          break
        default:
          break
      }
      this.$refs.dialog.show = true
    },
    agreeSubmit() {
      switch (this.operatingType) {
        case 'ok':
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              this.agreeOperat()
            }
          })
          break
        case 'no':
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              this.refuseOperat()
            }
          })

          break
        case 'return':
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              this.returnOperat()
            }
          })
          break
        case 'forward':
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              this.transferOperat()
            }
          })

          break
        case 'cc':
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              this.ccOperat()
            }
          })

          break
        case 'comment':
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              this.commentOperat()
            }
          })

          break
        case 'approve':
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              this.confirmOperat()
            }
          })

          break
      }
    },
    // 同意
    agreeOperat() {
      if (this.actionInfo.type === 'approve') {
        const params = {
          Loading: true,
          taskId: this.$route.query.taskId,
          comment: this.ruleForm.comment
        }
        if (this.actionInfo.isCustomize) {
          params.freeFlow = {
            approveType: this.ruleForm.approverType,
            users: this.ruleForm.approver
          }
        }
        btnAgree(params).then(({ data }) => {
          this.$refs.dialog.show = false
          this.$message.success('同意成功')
          this.$router.go(-1)
        })
      } else {
        btnConfirm().then(({ data }) => {
          this.$refs.dialog.show = false
          this.$message.success('确认成功')
          this.$router.go(-1)
        })
      }
    },
    // 拒绝
    refuseOperat() {
      const params = {
        Loading: true,
        taskId: this.$route.query.taskId,
        comment: this.ruleForm.comment
      }
      btnRefuse(params).then(({ data }) => {
        this.$refs.dialog.show = false
        this.$message.success('拒绝成功')
        this.$router.go(-1)
      })
    },
    // 退回
    returnOperat() {
      const params = {
        Loading: true,
        taskId: this.$route.query.taskId,
        goBackTargetTemplateId: this.ruleForm.returnTo,
        comment: this.ruleForm.comment
      }
      btnReturn(params).then(({ data }) => {
        this.$refs.dialog.show = false
        this.$message.success('退回成功')
        this.$router.go(-1)
      })
    },
    // 转交
    transferOperat() {
      const { transferUserId, comment } = this.ruleForm
      const params = {
        Loading: true,
        transferUserId,
        taskId: this.$route.query.taskId,
        processId: this.$route.query.processId,
        comment
      }
      btnForward(params).then(({ data }) => {
        this.$refs.dialog.show = false
        this.$message.success('转交成功')
        this.$router.go(-1)
      })
    },
    // 抄送
    ccOperat() {
      const params = {
        Loading: true,
        ccUsers: this.ruleForm.cc,
        processId: this.$route.query.processId,
        comment: this.ruleForm.comment
      }
      btnCC(params).then(({ data }) => {
        this.$refs.dialog.show = false
        this.$message.success('抄送成功')
        this.$router.go(-1)
      })
    },
    // 评论
    commentOperat() {
      const params = {
        Loading: true,
        processId: this.$route.query.processId,
        comment: this.ruleForm.comment
      }
      btnComment(params).then(({ data }) => {
        this.$refs.dialog.show = false
        this.$message.success('评论成功')
        this.$router.go(-1)
      })
    },
    // 提交审批
    confirmOperat() {
      const params = {
        Loading: true,
        processId: this.$route.query.processId,
        comment: this.ruleForm.comment
      }
      btnSubmit(params).then(({ data }) => {
        this.$refs.dialog.show = false
        this.$message.success('提交审批成功')
      })
    },
    // 获取常用语
    getlanguageList() {
      languageList().then(({ data }) => {
        this.tagsList = data
      })
    },
    selectTag(content) {
      this.ruleForm.comment += content
    },
    getBtn() {
      const param = {
        taskId: this.$route.query.taskId
      }
      getOperaInfo(param).then(({ data }) => {
        this.actionInfo = data
        if (this.actionInfo.goBackTargets.length === 1) {
          this.ruleForm.returnTo = this.actionInfo.goBackTargets[0].templateId
        }
        if (data.taskStatus === 'interrupt') {
          this.$message.warning('该待审批的任务已被其他审批人处理完成，您可以接着处理其他任务。')
        }
        this.$emit('getBtnStatus', data.type)
      })
    },
    getPersonnel() {
      getPersonnelsByOrgId(getSessionStorage('orgId')).then(({ data }) => {
        this.personalList = data
      })
    }
  }
}
</script>
<style lang="less" scoped>
.approval-opera {
  display: flex;
  justify-content: center;
  .el-button-group {
    margin-right: 10px;
  }

}
.tag {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  & > div {
    margin-right: 20px;
    margin-top: 10px;
  }
  .el-tag {
    background-color: #fff;
    border-color: @primary;
    color: @primary;
    cursor: pointer;
  }
  .el-tag--small {
    line-height: 26px;
    height: 26px;
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
}
</style>
