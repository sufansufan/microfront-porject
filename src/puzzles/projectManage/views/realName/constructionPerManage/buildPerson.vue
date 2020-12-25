<template>
  <div class="build-person">
    <split-pane :min-percent="10" :default-percent="12" split="vertical">
      <template slot="paneL">
        <div v-loading="treeLoading" class="left">
          <el-tree ref="treeRef" :data="treeData" :expand-on-click-node="false" node-key="id" default-expand-all="true" :props="defaultProps" :highlight-current="highLight" @node-click="handleNodeClick" />
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <search-bar :select-list="selectList" :btn-list="btnList" :show-text="true" :statistics-date="statisticsDate" :search="search" @changeSearch="changeSearch" />
          <comm-table ref="commTable" v-loading="loading" :single-selected="true" :table-options="tableOptions" :columns="columns" :data="tableData" :count="total" />
          <drag-dialog ref="updatePhoto" title="更新照片" width="45%">
            <el-form ref="ruleForm" :key="key" :model="ruleForm" :rules="rules" label-width="80px" class="ruleForm">
              <el-form-item label="姓名">
                <el-input v-model.trim="ruleForm.name" disabled="true" placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input v-model.trim="ruleForm.idNumber" disabled="true" placeholder="请输入身份证号" />
              </el-form-item>
              <el-form-item label="考勤编号">
                <el-input v-model.trim="ruleForm.attendanceNumber" disabled="true" placeholder="请输入考勤编号" />
              </el-form-item>
              <el-form-item style="width:100%">
                <span slot="label"><span class="custom-form-label">*</span>照片</span>
                <div class="upload-frame">
                  <el-upload
                    ref="upload"
                    class="avatar-uploader"
                    :action="actionUrl"
                    :show-file-list="false"
                    :data="uploadData"
                    :headers="uploadHeaders"
                    :on-success="uploadSuccess"
                    :before-upload="beforeUploadM"
                    :disabled="disabled"
                  >
                    <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar" @click="uploadbefore('photo')">
                    <i v-else class="el-icon-plus avatar-uploader-icon" @click="uploadbefore('photo')" />
                    <div slot="tip" class="tip-color">请上传大小在20KB~750KB范围内的JPG格式照片</div>
                  </el-upload>
                </div>
              </el-form-item>
              <el-form-item>
                <el-checkbox @change="checkBox">我确认该照片确实为该施工人员近照</el-checkbox>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button type="primary" @click="submitPhoto">确定</el-button>
            </div>
          </drag-dialog>
          <drag-dialog ref="updateReport" title="更新体检报告" width="45%">
            <el-form ref="reportRuleForm" :key="key" :model="reportRuleForm" :rules="rules" label-width="80px" class="ruleForm">
              <el-form-item label="姓名">
                <el-input v-model.trim="reportRuleForm.name" disabled="true" placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input v-model.trim="reportRuleForm.idNumber" disabled="true" placeholder="请输入身份证号" />
              </el-form-item>
              <el-form-item label="考勤编号">
                <el-input v-model.trim="reportRuleForm.attendanceNumber" disabled="true" placeholder="请输入考勤编号" />
              </el-form-item>
              <el-form-item style="width:100%">
                <span slot="label"><span class="custom-form-label">*</span>体检报告</span>
                <el-form-item>
                  <el-upload
                    :file-list="medicalReportList"
                    :action="actionUrl"
                    :on-success="fileMedicalSuccess"
                    :data="uploadData"
                    :headers="uploadHeaders"
                    :on-remove="handleRemove"
                    :disabled="disabled"
                    :before-upload="beforeUpload50M"
                    :on-error="fileError"
                    :on-preview="previewFile"
                  >
                    <el-button type="primary" :disabled="disabled" @click="uploadbefore('medicalReport')">点击上传</el-button>
                    <div slot="tip" class="tip-color">单个附件请不超过50M</div>
                  </el-upload>
                </el-form-item>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button type="primary" @click="submitReport">确定</el-button>
            </div>
          </drag-dialog>
          <drag-dialog ref="updateCard" title="更新银行卡号" width="45%">
            <el-form ref="cardRuleForm" :key="key" :model="cardRuleForm" :rules="rules" label-width="100px" class="ruleForm">
              <el-form-item label="姓名">
                <el-input v-model.trim="cardRuleForm.name" disabled="true" placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input v-model.trim="cardRuleForm.idNumber" disabled="true" placeholder="请输入身份证号" />
              </el-form-item>
              <el-form-item label="考勤编号">
                <el-input v-model.trim="cardRuleForm.attendanceNumber" disabled="true" placeholder="请输入考勤编号" />
              </el-form-item>
              <el-form-item label="银行卡号" prop="bankNumber">
                <el-input v-model.trim="cardRuleForm.bankNumber" placeholder="请输入银行卡号" :maxlength="19" />
              </el-form-item>
              <el-form-item label="开户行" prop="accountBank">
                <el-input v-model.trim="cardRuleForm.accountBank" placeholder="请输入开户行" :maxlength="20" />
              </el-form-item>
              <el-form-item label="开户行地址" prop="bankAddress" style="width:100%">
                <el-input v-model.trim="cardRuleForm.bankAddress" :maxlength="50" placeholder="请输入开户行地址" />
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button type="primary" @click="submitBank">确定</el-button>
            </div>
          </drag-dialog>
          <drag-dialog ref="goback" title="离场" width="45%">
            <el-form ref="gobackRuleForm" :key="key" :model="gobackRuleForm" :rules="gobackRules" label-width="80px" class="ruleForm">
              <el-form-item label="离场日期" prop="recordDate" class="full-width">
                <el-date-picker
                  v-model="gobackRuleForm.recordDate"
                  clearable
                  :disabled="disabled"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择离场日期"
                  :picker-options="pickerOptions"
                />
                <p style="color:#ccc">项目所在天数不含离场当天</p>
              </el-form-item>
              <el-form-item label="离场说明" prop="description" class="full-width">
                <el-input v-model="gobackRuleForm.description" type="textarea" :rows="3" :maxlength="255" placeholder="请输入离场说明" />
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button type="primary" @click="saveGoback">确定</el-button>
            </div>
          </drag-dialog>
          <drag-dialog ref="comeback" title="返场" width="45%">
            <el-form ref="comebackRuleForm" :key="key" :model="comebackRuleForm" :rules="comebackRules" label-width="80px" class="ruleForm">
              <el-form-item label="返场日期" prop="recordDate" class="full-width">
                <el-date-picker
                  v-model="comebackRuleForm.recordDate"
                  clearable
                  :disabled="disabled"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择返场日期"
                  :picker-options="pickerOptions"
                />
                <p style="color:#ccc">项目所在天数含返场当天 </p>
              </el-form-item>
              <el-form-item label="返场说明" prop="description" class="full-width">
                <el-input v-model="comebackRuleForm.description" type="textarea" :rows="3" :maxlength="255" placeholder="请输入返场说明" />
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button v-power="'return:confirm'" type="primary" @click="saveBack('save')">确定</el-button>
              <el-button v-power="'return:submit'" type="primary" @click="saveBack('submit')">提交</el-button>
            </div>
          </drag-dialog>
        </div>
      </template>
    </split-pane>
  </div>
</template>

<script>
import search from '@core/mixins/search'
import { getTeamoGroupTree, getPersonPage, deleteBuildPerson, statistics, updateInfo, downMedicalReport, leaveAndBack, backConfirm, exportTeamorGroup } from '@core/api/projectManage/projectmanager'
import { handlerSearchBar, codeChangeName, parseTime, exportExcel } from '@core/utils'
import buildPerson from '../searchTableData/buildPerson'
import DragDialog from '@frames/dashboard/components/Dialog'
import { mapGetters } from 'vuex'
import { validateLength } from '@core/utils/validate'
import upload from '@core/mixins/upload'
import { fileLoad } from '@core/api/accessoryFile'
export default {
  components: {
    DragDialog
  },
  mixins: [search, buildPerson, upload],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      loading: true,
      treeLoading: false,
      highLight: false,
      treeData: [],
      ruleForm: {
        name: '',
        idNumber: '',
        attendanceNumber: ''
      },
      reportRuleForm: {
        name: '',
        idNumber: '',
        attendanceNumber: ''
      },
      cardRuleForm: {
        name: '',
        idNumber: '',
        attendanceNumber: '',
        bankNumber: '',
        accountBank: '',
        bankAddress: ''
      },
      gobackRuleForm: {
        recordDate: '',
        description: ''
      },
      comebackRuleForm: {
        recordDate: '',
        description: ''
      },
      rules: {
        bankNumber: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }],
        accountBank: [{ required: true, message: '请输入开户行', trigger: 'blur' }, validateLength(0, 20)],
        bankAddress: [{ required: true, message: '请输入开户行地址', trigger: 'blur' }, validateLength(0, 50)]
      },
      gobackRules: {
        recordDate: [{ required: true, message: '请选择离场日期', trigger: 'change' }],
        description: [{ required: true, message: '请输入离场说明', trigger: 'blur' }, validateLength(0, 255)]
      },
      comebackRules: {
        recordDate: [{ required: true, message: '请选择返场日期', trigger: 'change' }],
        description: [{ required: true, message: '请输入返场说明', trigger: 'blur' }, validateLength(0, 255)]
      },
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      tableData: [],
      nodeTreeData: {},
      search: {
        constructionTeamIdLike: ''
      },

      photoList: [],
      medicalReportList: [],
      checkState: false,
      statisticsDate: {},
      contractProjectId: ''
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['workType', 'memberState', 'teamLevel', 'gender', 'entryRecordType']).then(() => {
      const { workType, memberState } = this.constant
      this.selectList = handlerSearchBar(this.selectList, [2, 3], [workType, memberState])
    })
    this.getTree()
    this.fetchData()
    this.getStatistics()
  },

  methods: {
    getStatistics() {
      const { projectId } = this.$route.query
      var params = {
        // verificationState: '03',
        projectId: projectId
      }
      statistics(params).then(({ data }) => {
        this.statisticsDate = data
      })
    },
    checkBox() {
      this.checkState = event.target.checked
    },
    // 照片
    submitPhoto() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.uploadImgUrl) {
            this.$message.warning('请上传照片')
            return
          }
          if (!this.checkState) {
            this.$message.warning('请确认该照片确实为该施工人员近照，并勾选复选框')
            return
          }
          const params = {
            Loading: true,
            type: '01',
            constructionMemberId: this.getDoubleMultipleSelection()[0].id
          }
          updateInfo(params).then(res => {
            this.$message.success('更新照片成功!')
            this.$refs.updatePhoto.show = false
            this.checkState = false
            this.fetchData('query')
            this.getTree()
          })
        } else {
          return
        }
      })
    },
    // 返场
    saveBack(type) {
      this.$refs.comebackRuleForm.validate((valid) => {
        if (valid) {
          const params = {
            Loading: true,
            ...this.comebackRuleForm,
            constructionMemberId: this.getDoubleMultipleSelection()[0].id,
            type: '03'
          }
          if (type === 'save') {
            leaveAndBack(params).then(res => {
              this.$message.success('返场成功!')
              this.$refs.comeback.show = false
              this.fetchData('query')
              this.getTree()
            })
          } else {
            backConfirm(params).then(res => {
              this.$message.success('返场成功!')
              this.$refs.comeback.show = false
              this.fetchData('query')
              this.getTree()
            })
          }
        } else {
          return
        }
      })
    },
    // 离场
    saveGoback() {
      this.$refs.gobackRuleForm.validate((valid) => {
        if (valid) {
          const params = {
            Loading: true,
            ...this.gobackRuleForm,
            constructionMemberId: this.getDoubleMultipleSelection()[0].id,
            type: '02'
          }
          leaveAndBack(params).then(res => {
            this.$message.success('离场成功!')
            this.$refs.goback.show = false
            this.fetchData('query')
            this.getTree()
          })
        } else {
          return
        }
      })
    },
    // 导出
    handleExportTeam() {
      const { projectId } = this.$route.query
      if (this.nodeTreeData && this.nodeTreeData.id) {
        if (this.nodeTreeData.level === '01') {
          const { id } = this.nodeTreeData
          const params = {
            Loading: true,
            id: id,
            projectId: projectId
          }
          exportTeamorGroup(params).then(res => {
            exportExcel(res, ``)
          })
        } else if (this.nodeTreeData.level === '02') {
          this.$message.warning('请选择左侧树列表上的工程或者施工队节点后导出工程下所有施工队或者某个施工队的花名册')
        } else if (this.nodeTreeData.level === '') {
          const { id } = this.nodeTreeData
          const params = {
            Loading: true,
            projectId: id
          }
          exportTeamorGroup(params).then(res => {
            exportExcel(res, ``)
          })
        }
      } else {
        const params = {
          Loading: true,
          projectId: projectId
        }
        exportTeamorGroup(params).then(res => {
          exportExcel(res, ``)
        })
      }
    },
    // 删除
    handleDelete() {
      if (this.getDoubleMultipleSelection() && this.getDoubleMultipleSelection().length > 0) {
        var deleteStatus = this.getDoubleMultipleSelection().every(item => {
          return item.state === '01'
        })
        if (!deleteStatus) {
          this.$message.warning('只能操作未进场的记录')
        } else {
          this.$confirm('确定要删除选中的记录吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const params = {
              id: (this.getDoubleMultipleSelection().map(v => v.id)).toString()
            }
            deleteBuildPerson(params).then(res => {
              this.$message.success('删除成功!')
              this.fetchData('query')
              this.getTree()
            })
          })
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    // 下载体检报告
    handleReport() {
      const { projectId } = this.$route.query
      if (this.getDoubleMultipleSelection() && this.getDoubleMultipleSelection().length > 0) {
        const params = {
          Loading: true,
          constructionMemberIds: (this.getDoubleMultipleSelection().map(v => v.id)).toString(),
          projectId: projectId
        }
        downMedicalReport(params).then(res => {
          exportExcel(res, '')
        })
      } else {
        const params = {
          Loading: true,
          projectId: projectId
        }
        downMedicalReport(params).then(res => {
          exportExcel(res, '')
        })
      }
    },
    // 获得单选元素
    getMultipleSelection() {
      return this.$refs['commTable'].multipleSelection[0]
    },
    getDoubleMultipleSelection() {
      return this.$refs['commTable'].multipleSelection
    },
    checkOnofTableData() {
      return this.$refs.commTable.onlyOneData()
    },
    // 离场/返场弹框
    handleGoAndCome(type) {
      switch (type) {
        case 'goback':
          if (this.getDoubleMultipleSelection() && this.getDoubleMultipleSelection().length > 0) {
            if (this.getDoubleMultipleSelection().length !== 1) {
              this.$message.warning('只能选择单条记录')
              return
            }
            const { state } = this.getDoubleMultipleSelection()[0]
            if (state === '02' || state === '04') {
              this.$refs.goback.show = true
              this.gobackRuleForm = { ...this.deepRuleForm }
              this.key += 1
            } else {
              this.$message.warning('只能选择状态为已进场或已返场的人员')
            }
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        case 'comeback': {
          if (this.getDoubleMultipleSelection() && this.getDoubleMultipleSelection().length > 0) {
            if (this.getDoubleMultipleSelection().length !== 1) {
              this.$message.warning('只能选择单条记录')
              return
            }
            const { state } = this.getDoubleMultipleSelection()[0]
            if (state !== '03') {
              this.$message.warning('只能选择状态为已离场的人员')
              return
            }
            this.$refs.comeback.show = true
            this.comebackRuleForm = { ...this.deepRuleForm } // 返场说明不能一直输
            this.key += 1
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        }
        default:
          break
      }
    },
    jumpState(typePage, row) {
      switch (typePage) {
        case 'add': {
          if (this.nodeTreeData && this.nodeTreeData.id) {
            this.$emit('changeTabConent', 'buildpersonAdd', typePage, this.nodeTreeData)
          } else {
            this.$message.warning('请先选择一个施工队或施工班组')
          }
          break
        }
        case 'edit': {
          if (this.getDoubleMultipleSelection() && this.getDoubleMultipleSelection().length > 0) {
            if (this.getDoubleMultipleSelection().length !== 1) {
              this.$message.warning('只能选择单条记录')
              return
            }
            if (this.getDoubleMultipleSelection()[0].state === '01') {
              this.$emit('changeTabConent', 'buildpersonEdit', typePage, this.getDoubleMultipleSelection()[0])
            } else {
              this.$message.warning('只能操作未进场的记录')
            }
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        }
        case 'personDetails':
          this.$emit('changeTabConent', 'buildpersonDetails', typePage, row)
          break
        default:
          break
      }
    },
    // 更新资料弹框
    handleCommand(type) {
      if (this.getDoubleMultipleSelection() && this.getDoubleMultipleSelection().length > 0) {
        if (this.getDoubleMultipleSelection().length !== 1) {
          this.$message.warning('只能选择单条记录')
          return
        }
        const { state } = this.getDoubleMultipleSelection()[0]
        if (state === '03') {
          this.$message.warning('只能选择状态为非已离场的人员')
          return
        }
        const { name, idNumber, attendanceNumber, id, bankNumber, accountBank, bankAddress } = this.getDoubleMultipleSelection()[0]
        if (type === 'photo') {
          this.ruleForm = {
            name: name,
            idNumber: idNumber,
            attendanceNumber: attendanceNumber
          }
          this.uploadData.businessDataId = id
          this.uploadImgUrl = ''
          this.key += 1
          this.$refs.updatePhoto.show = true
        } else if (type === 'report') {
          this.reportRuleForm = {
            name: name,
            idNumber: idNumber,
            attendanceNumber: attendanceNumber
          }
          this.uploadData.businessDataId = id
          this.fetchFileList(id, 'medicalReport')
          this.$refs.updateReport.show = true
        } else if (type === 'bankCard') {
          this.cardRuleForm = {
            name: name,
            idNumber: idNumber,
            attendanceNumber: attendanceNumber,
            bankNumber: bankNumber,
            accountBank: accountBank,
            bankAddress: bankAddress
          }
          this.$refs.updateCard.show = true
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    // 体检报告
    submitReport() {
      this.$refs.reportRuleForm.validate((valid) => {
        if (valid) {
          if (!this.medicalReportList.length) {
            this.$message.warning('请上传体检报告')
            return
          }
          const params = {
            type: '02',
            constructionMemberId: this.getDoubleMultipleSelection()[0].id,
            uploadReport: 1
          }
          updateInfo(params).then(res => {
            this.$message.success('更新体检报告成功!')
            this.$refs.updateReport.show = false
            this.fetchData('query')
            this.getTree()
          })
        } else {
          return
        }
      })
    },
    // 银行卡号
    submitBank() {
      this.$refs.cardRuleForm.validate((valid) => {
        if (valid) {
          const params = {
            ...this.cardRuleForm,
            type: '03',
            constructionMemberId: this.getDoubleMultipleSelection()[0].id
          }
          delete params.name
          delete params.idNumber
          delete params.attendanceNumber
          updateInfo(params).then(res => {
            this.$message.success('更新银行卡号成功!')
            this.$refs.updateCard.show = false
            this.fetchData('query')
            this.getTree()
          })
        } else {
          return
        }
      })
    },
    fileMedicalSuccess(response, file, fileList) {
      this.medicalReportList = fileList
      this.uploadLoading.close()
    },
    uploadbefore(type) {
      switch (type) {
        case 'photo':
          this.uploadData.typeCode = 'workerPhoto'
          break
        case 'medicalReport':
          this.uploadData.typeCode = 'medicalReport'
          break
        default:
          break
      }
    },
    fetchFileList(id, type) {
      this.getFileLoad(id, type).then(data => {
        switch (type) {
          case 'workerPhoto':
            this.uploadImgUrl = data ? data[0].fileUrl : ''
            this.photoList = data
            break
          case 'medicalReport':
            this.medicalReportList = data
            this.medicalReportList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            break
          default:
            break
        }
      })
    },
    fetchData(type) {
      const { projectId, projectName } = this.$route.query
      this.loading = true
      this.queryCopy(type)
      const params = {
        ...this.search,
        constructionTeamIdLike: this.contractProjectId !== '' ? this.search.constructionTeamIdLike : null,
        propertyName: 'attendanceNumber',
        ascending: false,
        projectId: projectId,
        projectName: projectName,
        verificationState: '03',
        ...this.sortData,
        page: this.page ? this.page - 1 : 0,
        size: this.size || 10
      }
      getPersonPage(params).then(({ data: { content, total }}) => {
        this.tableData = content.map(item => {
          item.workTypeName = codeChangeName(this.constant.workType, item.workType)
          item.genderName = codeChangeName(this.constant.gender, item.gender)
          item.stateName = codeChangeName(this.constant.memberState, item.state)
          item.firstEntryDate = parseTime(item.firstEntryDate, 'y-m-d')
          item.leaveDate = parseTime(item.leaveDate, 'y-m-d')
          fileLoad(item.id, 'medicalReport').then(({ data }) => {
            item.tableData = data
          })
          item.renderTableTitleStatus = true
          item.dataTableData = item.entryRecordDtoList.map(ele => {
            ele.recordDate = parseTime(ele.recordDate, 'y-m-d')
            ele.typeName = codeChangeName(this.constant.entryRecordType, ele.type)
            if (ele.type === '01' || ele.type === '03') { // 进场/返场
              ele.days === ''
            }
            return ele
          })
          return item
        })
        this.loading = false
        this.total = total
      })
    },

    // 获取左树 默认展开所有节点
    getTree() {
      this.treeLoading = true
      const { projectId } = this.$route.query
      getTeamoGroupTree({ isRoot: true, projectId: projectId }).then(({ data }) => {
        this.treeData = data
        this.treeLoading = false
      })
    },
    // 点击树
    handleNodeClick(data) {
      this.contractProjectId = data.projectId
      if (this.search.constructionTeamIdLike === data.id) {
        this.highLight = !this.highLight
        this.nodeTreeData = data
        this.search.constructionTeamIdLike = ''
      } else {
        this.highLight = true
        this.nodeTreeData = data
        this.search.constructionTeamIdLike = data.id
        this.fetchData('query')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.build-person {
  padding: 10px 0px 10px 10px;
  height: calc(100vh - 140px);
  .left {
    margin-right: 5px;
    height: 100%;
    overflow-y: auto;
  }
  .right {
    margin-left: 10px;
    padding-right: 10px;
    height: 100%;
    overflow-y: auto;
    .btn-box{
      display:flex;
      justify-content: space-between;
    }
  }
  .text{
    color:#999;
    font-size:12px;
  }
  .ruleForm{
     display: flex;
    flex-wrap: wrap;
    & > .el-form-item  {
      width: 50%;
    }
    .el-select, .el-input, .el-cascader, .el-date-editor{
      width: 100%;
    }
     .full-width {
      width: 100%;
    }
  }
}
</style>
<style lang="less">
.build-person {
  .el-table__body-wrapper {
    max-height: calc(100vh - 330px);
  }
  .upload-frame {
    .avatar-uploader .el-upload {
      width: 100px !important;
      height: 100px !important;
      margin:0 0;
    }
    .avatar-uploader-icon {
      width: 100px !important;
      height: 100px !important;
      line-height: 100px;
    }
    .avatar {
      width: auto !important;
      height: 100% !important;
      // display: block;
      background-size: contain;
    }
  }
}
</style>
