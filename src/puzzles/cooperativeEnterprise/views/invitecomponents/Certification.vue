<template>
  <div class="certification">
    <div class="title">{{ orgName }}</div>
    <div v-if="!disabled" style="margin-bottom: 10px">
      <el-button type="primary" @click="updateData('add','')"><i class="iconfont icon-xinzeng1-copy" />添加</el-button>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      default-expand-all
      :data="tableData"
      row-key="id"
      border
      :default-sort="{prop: 'startDate', order: 'descending'}"
      @sort-change="sortTable"
    >
      <el-table-column type="index" width="48" label="序号" align="center" />
      <el-table-column prop="type" sortable="custom" label="分类" align="center" />
      <el-table-column label="类别" align="center" width="160" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div v-html="scope.row.qualificationTypeName" />
        </template>
      </el-table-column>
      <el-table-column prop="number" label="证书编号" align="center" width="160">
        <template slot-scope="scope">
          <div class="table-click-color" @click="updateData('details',scope.row)">{{ scope.row.number }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="manageRange" label="名称/范围" align="center" width="320" :show-overflow-tooltip="true" />
      <el-table-column prop="startDate" label="发证日期" width="120" align="center" sortable="custom" />
      <el-table-column prop="endDate" label="有效截止日期" width="120" align="center" sortable="custom" />
      <el-table-column prop="unitName" label="发证机关" align="center" width="320" :show-overflow-tooltip="true" />
      <el-table-column prop="lastEndDate" label="上次有效截止日期" sortable="custom" align="center" width="160" />
      <el-table-column prop="status" label="证书状态" width="120" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status ==='0' ? '正常' : '失效' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="附件" align="center" width="100">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="300"
            trigger="click"
          >
            <el-table :data="fileData" border>
              <el-table-column property="fileName" label="文件名称" header-align="center" align="left" show-overflow-tooltip>
                <template slot-scope="scoperty">
                  <span class="table-click-color" @click="downFile(scoperty.row)">{{ scoperty.row.fileName }}</span>
                </template>
              </el-table-column>
              <el-table-column width="100" property="fileSize" align="center" label="文件大小">
                <template slot-scope="scoperty">
                  <span>{{ scoperty.row.fileSize }} KB</span>
                </template>
              </el-table-column>
            </el-table>
            <span slot="reference" class="table-click-color" @click="lookFile(scope.row)">查看附件</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-if="!disabled" prop="name" label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="updateData('edit', scope.row)">修改</el-button>
          <el-button type="danger" @click="deleteData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <drag-dialog ref="dialog" :title="title" width="50%">
      <el-form ref="ruleForm" :key="key" v-loading="dialogLoading" :rules="rules" :model="ruleForm" label-width="140px" class="ruleForm">
        <el-form-item label="分类" prop="type">
          <el-select v-model="ruleForm.type" clearable :disabled="disableds" placeholder="请选择分类" @change="typeChange">
            <el-option v-for="item in constant.orgBusinessType" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="证书编号" prop="number">
          <el-input v-model.trim="ruleForm.number" clearable :disabled="disableds" placeholder="请输入证书编号" />
        </el-form-item>
        <template v-if="ruleForm.type == 'org_qualification'">
          <el-form-item
            style="width: 100%"
            prop="qualificationType"
          >
            <span slot="label"> <span class="custom-form-label">*</span>资质</span>
            <div v-for="(item, index) in qualifyData" :key="index" class="qualify-box">
              <el-cascader
                v-model="item.qualify"
                placeholder="请选择资质"
                clearable
                :disabled="disableds"
                style="width:100%"
                :options="constant.orgQualifications"
                :props="{ expandTrigger: 'hover', value: 'code', label: 'name', children: 'childs' }"
              />
              <div v-if="!disableds" class="qualify-add" @click="addQualify">
                <i class="el-icon-plus" />
              </div>
              <div v-if="!disableds" class="qualify-add" @click="reduceQualify(index)">
                <i class="el-icon-minus" />
              </div>
            </div>
          </el-form-item>
        </template>
        <template v-if="ruleForm.type == 'org_certificate'">
          <el-form-item label="经营范围" prop="manageRange">
            <el-select v-model="ruleForm.manageRange" clearable :disabled="disableds" placeholder="请选择经营范围">
              <el-option v-for="item in constant.businessScope" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item label="证书" prop="certificateType">
            <el-select v-model="ruleForm.certificateType" clearable :disabled="disableds" placeholder="请选择证书">
              <el-option v-for="item in constant.orgCertType" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item label="上次有效开始日期" prop="lastStartDate">
            <el-date-picker v-model="ruleForm.lastStartDate" clearable type="date" :disabled="disableds" placeholder="请选择上次有效开始日期" :picker-options="lastStartDateOptions" @change="lastStartDateChange" />
          </el-form-item>
          <el-form-item label="上次有效截止日期" prop="lastEndDate">
            <el-date-picker v-model="ruleForm.lastEndDate" clearable type="date" :disabled="disableds" placeholder="请选择上次有效截止日期" :picker-options="pickerOptionsLast" @change="lastEndDateChange" />
          </el-form-item>
        </template>
        <el-form-item label="发证日期" prop="startDate">
          <el-date-picker
            v-model="ruleForm.startDate"
            clearable
            type="date"
            :disabled="disableds"
            placeholder="请选择发证日期"
            :picker-options="startDateOptions"
            @change="startDateChange"
          />
        </el-form-item>
        <el-form-item label="有效截止日期" prop="endDate">
          <el-date-picker v-model="ruleForm.endDate" clearable type="date" :disabled="disableds" placeholder="请选择有效截止日期" :picker-options="pickerOptionsClose" @change="endDateChange" />
        </el-form-item>
        <el-form-item label="发证机关" prop="unitName">
          <el-input v-model.trim="ruleForm.unitName" clearable maxlength="50" show-word-limit :disabled="disableds" placeholder="请输入发证机关" />
        </el-form-item>
        <el-form-item label="年检频率" prop="annualSurvey">
          <el-select v-model="ruleForm.annualSurvey" clearable :disabled="disableds" placeholder="请选择年检频率">
            <el-option v-for="item in constant.inspectionFrequency" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.annualSurvey !== 'Never'" label="年检月份" prop="annualSurveyMonth">
          <el-select v-model="ruleForm.annualSurveyMonth" clearable :disabled="disableds" placeholder="请选择年检月份">
            <el-option
              v-for="item in 12"
              :key="item"
              :label="item+'月'"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item ref="fileForm" style="width: 100%" class="row-label">
          <span slot="label"> <span class="custom-form-label">*</span>附件</span>
          <el-upload
            :file-list="fileList"
            :action="actionUrl"
            :on-success="fileSuccess"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-remove="handleRemove"
            :disabled="disabled ||title==='查看证书信息'"
            :before-upload="beforeUpload50M"
            :on-preview="previewFile"
          >
            <el-button type="primary" :disabled="disabled || title==='查看证书信息'">点击上传</el-button>
            <div slot="tip" class="tip-color">单个附件请不超过50M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" style="width: 100%" prop="remark" class="row-label">
          <el-input v-model.trim="ruleForm.remark" type="textarea" :rows="3" :disabled="disableds" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template v-if="define" slot="footer">
        <el-button type="primary" @click="saveOrUpdateData()">确定</el-button>
      </template>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import table from '@core/mixins/table'
import upload from '@core/mixins/upload'
import { mapGetters } from 'vuex'
import { addCertificate, addQualifications, updateOgCertificate, updateQualification, getQuaCerC,
  delQualification, getQualification, saveQualificationList } from '@core/api/cooperativeEnterprise/qualification'
import { getQuaCer } from '@core/api/qualification'
import { codeChangeName, getUuid, queryParent, exportExcel } from '@core/utils'
import { fileLoad, copyFile, fileLoadCoop, exportFile } from '@core/api/accessoryFile'
import { getSessionStorage } from '@core/utils/auth'
export default {
  name: 'Qualifications',
  components: {
    DragDialog
  },
  mixins: [table, upload],
  props: {
    disabled: {
      default: true,
      type: Boolean
    },
    orgName: {
      default: '',
      type: String
    },
    updateId: {
      default: '',
      type: String
    },
    operateinfoId: {
      default: '',
      type: String
    },
    updateuId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      lastStartDateOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      pickerOptionsLast: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      startDateOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      pickerOptionsClose: {
        disabledDate(time) {
          return time.getTime()
        }
      },
      define: true,
      disableds: true,
      ruleForm: {
        type: '',
        number: '',
        manageRange: '',
        qualificationType: [],
        lastStartDate: '',
        lastEndDate: '',
        startDate: '',
        endDate: '',
        unitName: '',
        annualSurvey: '',
        annualSurveyMonth: '',
        remark: ''
      },
      rules: {
        type: [{ required: true, message: '请选择分类' }],
        number: [{ required: true, message: '请输入证书编号' }],
        certificateType: [{ required: true, message: '请选择证书', trigger: 'change' }],
        manageRange: [{ required: true, message: '请选择经营范围' }],
        startDate: [{ required: true, message: '请选择发证日期' }],
        endDate: [{ required: true, message: '请选择有效截止日期' }],
        annualSurvey: [{ required: true, message: '请选择年检频率' }],
        annualSurveyMonth: [{ required: true, message: '请选择年检月份' }]
      },
      tableData: [],
      addOrEditType: '',
      editId: '',
      title: '',
      rowId: '',
      newsId: this.$route.query.newsId,
      serviceId: this.$route.query.serviceId,
      noticeId: this.$route.query.noticeId,
      qualifyData: [{ qualify: [] }],
      dialogLoading: false,
      loading: false,
      fileData: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {

  },
  created() {
    this.actionUrl = this.actionUrl.replace('platform', 'cooperativeunit')
    const title = this.$route.query.title
    if (title === '完善信息' || title === '更新信息') {
      if (this.newsId) {
        this.fetchData('title')
      } else {
        this.fetchOrgInfo()
      }
    } else if (title === '查看企业最新信息' || title === '历史记录') {
      this.fetchData('title')
    }

    this.$store
      .dispatch('getConstant', ['orgBusinessType', 'orgQualifications', 'inspectionFrequency',
        'businessScope', 'orgCertType'
      ])
    this.uploadData.typeCode = 'organManageQualify'
  },
  methods: {
    lastStartDateChange(value) {
      if (value) {
        this.pickerOptionsLast = {
          disabledDate(time) {
            return time.getTime() < value.getTime()
          }
        }
      }
    },
    lastEndDateChange(value) {
      if (value) {
        this.lastStartDateOptions = {
          disabledDate(time) {
            if (value.getTime() > Date.now()) {
              return time.getTime() > Date.now()
            }
            return value ? time.getTime() > value.getTime() : time.getTime() > Date.now()
          }
        }
        this.pickerOptionsClose = {
          disabledDate(time) {
            return time.getTime() < (value.getTime() + 360000 * 24)
          }
        }
        if (this.ruleForm.endDate) {
          this.ruleForm.endDate = ''
        }
      }
      this.key += 1
    },
    startDateChange(value) {
      if (value) {
        const lastEndDate = this.ruleForm.lastEndDate
        if (lastEndDate && lastEndDate.getTime() >= value.getTime()) {
          this.pickerOptionsClose = {
            disabledDate(time) {
              return time.getTime() < (lastEndDate.getTime() + 360000 * 24)
            }
          }
        } else {
          this.pickerOptionsClose = {
            disabledDate(time) {
              return time.getTime() < value.getTime()
            }
          }
        }
      }
    },
    endDateChange(value) {
      if (value) {
        this.startDateOptions = {
          disabledDate(time) {
            if (value.getTime() > Date.now()) {
              return time.getTime() > Date.now()
            }
            return value ? time.getTime() > value.getTime() : time.getTime() > Date.now()
          }
        }
      }
    },
    typeChange(value) {
      this.ruleForm = {}
      this.key += 1
      this.ruleForm.type = value
      this.qualifyData = [{ qualify: [] }]
    },
    addQualify() {
      this.qualifyData.push({ qualify: [] })
    },
    reduceQualify(index) {
      if (this.qualifyData.length === 1) {
        this.$message.warning('至少保留一条数据')
        return
      }
      this.qualifyData.splice(index, 1)
    },
    getFile() {
      this.getFileLoad().then(data => {
        this.fileList = data
        this.dialogLoading = false
        this.fileList.map(item => {
          item.name = item.fileName
          item.url = item.fileUrl
          return item
        })
      })
    },
    getDetails() {
      getQualification(this.rowId).then(({ data }) => {
        // this.editId = data.id
        const { type, number, manageRange, qualificationType, lastStartDate, lastEndDate, startDate,
          endDate, unitName, annualSurvey, annualSurveyMonth, remark, id } = data
        this.ruleForm = {
          type,
          number,
          manageRange,
          qualificationType,
          lastStartDate: lastStartDate && new Date(lastStartDate),
          lastEndDate: lastEndDate && new Date(lastEndDate),
          startDate: startDate && new Date(startDate),
          endDate: startDate && new Date(endDate),
          unitName,
          annualSurvey,
          annualSurveyMonth: annualSurveyMonth + '月',
          remark,
          id
        }
        this.uploadData.businessDataId = id
        this.getFile(id)
        if (type !== 'org_certificate') {
          this.qualifyData = []
          qualificationType.split('/').forEach(item => {
            this.qualifyData.push({ qualify: item.split(',') })
          })
        }
        if (this.ruleForm.type === 'org_certificate') {
          this.ruleForm.certificateType = this.ruleForm.qualificationType
        }
      })
    },
    updateData(type, row) {
      this.addOrEditType = type
      if (type === 'edit') {
        this.disableds = false
        this.title = '修改资质'
        this.rowId = row.id
        this.getDetails()
        this.define = true
        this.dialogLoading = true
      } else if (type === 'add') {
        this.uploadData.businessDataId = getUuid()
        this.disableds = false
        this.title = '新增资质'
        this.fileList = []
        this.ruleForm = { ...this.deepRuleForm }
        this.qualifyData = [{ qualify: [] }]
        this.define = true
        this.dialogLoading = false
      } else {
        this.disableds = true
        this.title = '查看证书信息'
        this.rowId = row.id
        this.getDetails()
        this.define = false
        this.dialogLoading = true
      }
      this.key += 1
      this.$refs.dialog.show = true
    },
    fetchData(sortData) {
      if (!sortData) return
      this.tableData = []
      const { propertyName, ascending } = sortData || {}
      const params = {
        propertyName,
        ascending
      }
      if (typeof sortData === 'number' || JSON.stringify(sortData) === '{}') {
        params.propertyName = 'startDate'
      }
      this.loading = true
      var getQuaCerCId = ''
      if (this.$route.query.title === '更新信息') {
        getQuaCerCId = this.$route.query.operaId
      } else if (this.$route.query.title === '完善信息' || this.$route.query.title === '查看企业最新信息') {
        getQuaCerCId = this.serviceId
      }
      if (this.newsId || this.noticeId) {
        if (!this.serviceId) {
          getQuaCerCId = this.newsId
        }
        if (this.$route.query.title === '历史记录') {
          getQuaCerCId = this.noticeId
        }
        if (this.$route.query.title === '完善信息' && this.serviceId) {
          getQuaCerCId = this.newsId
        }

        getQuaCerC(params, getQuaCerCId).then(({ data }) => {
          this.loading = false
          if (this.$route.query.title === '更新信息' || this.$route.query.title === '完善信息') {
            this.reconstruction(data)
          } else {
            this.tableData = data || []
            this.tableData.map(item => {
              item.type = codeChangeName(this.constant.orgBusinessType, item.type)
              item.manageRange = codeChangeName(this.constant.businessScope, item.manageRange)
              return item
            })
          }
        })
      } else if (this.serviceId) {
        getQuaCerC(params, getQuaCerCId).then(({
          data
        }) => {
          this.loading = false
          this.tableData = data || []
          this.tableData.map(item => {
            item.type = codeChangeName(this.constant.orgBusinessType, item.type)
            item.manageRange = codeChangeName(this.constant.businessScope, item.manageRange)
            return item
          })
        })
      } else {
        getQuaCerC(params, this.$route.query.operaId).then(({
          data
        }) => {
          this.loading = false
          this.tableData = data || []
          this.tableData.map(item => {
            item.type = codeChangeName(this.constant.orgBusinessType, item.type)
            item.manageRange = codeChangeName(this.constant.businessScope, item.manageRange)
            return item
          })
        })
      }
    },
    updatfetchData(sortData) {
      const { propertyName, ascending } = sortData || {}
      const params = {
        propertyName,
        ascending
      }
      this.loading = true
      var id = ''
      if (this.newsId) {
        id = this.newsId
      } else if (this.serviceId) {
        id = this.serviceId
      }
      if (this.newsId && this.serviceId) {
        id = this.serviceId
      }
      if (this.$route.query.operaId) {
        id = this.$route.query.operaId
      }
      getQuaCerC(params, id).then(({
        data
      }) => {
        this.tableData = []
        this.loading = false
        this.tableData = data || []
        this.tableData.map(item => {
          item.type = codeChangeName(this.constant.orgBusinessType, item.type)
          item.manageRange = codeChangeName(this.constant.businessScope, item.manageRange)
          return item
        })
      })
    },
    // 上传成功
    fileSuccess(response, file, fileList) {
      this.fileList = fileList
      this.uploadLoading.close()
    },
    // 查看附件
    lookFile(row) {
      const { id } = row
      this.getFileLoad(id, 'organManageQualify').then(data => {
        this.fileData = data
      })
    },
    // 下载附件
    downFile(row) {
      exportFile(row.id).then(res => {
        exportExcel(res, row.fileName)
      })
    },
    deleteData(id) {
      this.$confirm('确认要删除选中的资质/证书？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delQualification(id).then(res => {
          this.$message.success('删除成功!')
          this.updatfetchData()
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    saveOrUpdateData() {
      if (!this.fileList.length) {
        this.$message.warning('请上传附件')
        return
      }
      this.ruleForm.qualificationType = ''
      var qualificationTypeName = ''
      if (this.ruleForm.type !== 'org_certificate') {
        const status = this.qualifyData.some(item => item.qualify.length)
        if (status) {
          for (let i = 0; i < this.qualifyData.length; i++) {
            if (this.qualifyData[i].qualify.length) {
              const lastName = this.qualifyData[i].qualify[this.qualifyData[i].qualify.length - 1]
              qualificationTypeName += queryParent(this.constant.orgQualifications, lastName, 'code', 'childs', 'name') + '/'
              this.ruleForm.qualificationType += this.qualifyData[i].qualify.toString() + (this.qualifyData.length - 1 === i ? '' : '/')
            }
          }
          const { qualificationType } = this.ruleForm
          qualificationTypeName = qualificationTypeName.substring(0, qualificationTypeName.length - 1)
          qualificationTypeName = this.category(qualificationTypeName)
          if (qualificationType[qualificationType.length - 1] === '/') this.ruleForm.qualificationType = qualificationType.slice(0, -1)
        } else {
          this.$message.warning(`资质不能为空`)
          return
        }
      } else {
        this.constant.orgCertType.forEach(item => {
          if (this.ruleForm.certificateType === item.code) {
            qualificationTypeName = item.name
          }
        })
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.serviceId) {
            var params = {
              Loading: true,
              ...this.ruleForm,
              qualificationType: this.ruleForm.qualificationType ? this.ruleForm.qualificationType : this.ruleForm.certificateType,
              organizationId: this.serviceId,
              qualificationTypeName: qualificationTypeName,
              id: this.uploadData.businessDataId
            }
            delete params.certificateType
            if (this.addOrEditType === 'add') {
              if (this.ruleForm.type === 'org_certificate') {
                addCertificate(params).then(res => {
                  this.$refs.dialog.show = false
                  this.updatfetchData()
                  this.$message.success('新增证书成功')
                })
              } else if (this.ruleForm.type === 'org_qualification') {
                addQualifications(params).then(res => {
                  this.$refs.dialog.show = false
                  this.updatfetchData()
                  this.$message.success('新增资质成功')
                })
              }
            } else {
              params = {
                ...params,
                id: this.rowId
              }
              if (this.ruleForm.type === 'org_certificate') {
                updateOgCertificate(params).then(res => {
                  this.$refs.dialog.show = false
                  this.fetchData('title')
                  this.$message.success('修改证书成功')
                })
              } else if (this.ruleForm.type === 'org_qualification') {
                updateQualification(params).then(res => {
                  this.$refs.dialog.show = false
                  this.fetchData('title')
                  this.$message.success('修改资质成功')
                })
              }
            }
          } else if (this.newsId) {
            var param = {
              Loading: true,
              ...this.ruleForm,
              qualificationType: this.ruleForm.qualificationType ? this.ruleForm.qualificationType : this.ruleForm.certificateType,
              organizationId: this.newsId,
              qualificationTypeName: qualificationTypeName,
              id: this.uploadData.businessDataId
            }
            if (this.$route.query.title === '更新信息') {
              param.organizationId = this.$route.query.operaId
            }
            if (this.addOrEditType === 'add') {
              if (this.ruleForm.type === 'org_certificate') {
                addCertificate(param).then(res => {
                  this.$refs.dialog.show = false
                  this.updatfetchData()
                  this.$message.success('新增证书成功')
                })
              } else if (this.ruleForm.type === 'org_qualification') {
                addQualifications(param).then(res => {
                  this.$refs.dialog.show = false
                  this.updatfetchData()
                  this.$message.success('新增资质成功')
                })
              }
            } else {
              param = {
                ...param,
                id: this.rowId
              }
              if (this.ruleForm.type === 'org_certificate') {
                updateOgCertificate(param).then(res => {
                  this.$refs.dialog.show = false
                  this.updatfetchData()
                  this.$message.success('修改证书成功')
                })
              } else if (this.ruleForm.type === 'org_qualification') {
                updateQualification(param).then(res => {
                  this.$refs.dialog.show = false
                  this.updatfetchData()
                  this.$message.success('修改资质成功')
                })
              }
            }
          } else {
            var paramsa = {
              Loading: true,
              ...this.ruleForm,
              qualificationType: this.ruleForm.qualificationType ? this.ruleForm.qualificationType : this.ruleForm.certificateType,
              organizationId: this.$route.query.operaId,
              qualificationTypeName: qualificationTypeName,
              id: this.uploadData.businessDataId
            }
            if (this.addOrEditType === 'add') {
              if (this.ruleForm.type === 'org_certificate') {
                addCertificate(paramsa).then(res => {
                  this.$refs.dialog.show = false
                  this.fetchData('title')
                  this.$message.success('新增证书成功')
                })
              } else if (this.ruleForm.type === 'org_qualification') {
                addQualifications(paramsa).then(res => {
                  this.$refs.dialog.show = false
                  this.fetchData('title')
                  this.$message.success('新增资质成功')
                })
              }
            } else {
              param = {
                ...paramsa,
                id: this.rowId
              }
              if (this.ruleForm.type === 'org_certificate') {
                updateOgCertificate(param).then(res => {
                  this.$refs.dialog.show = false
                  this.fetchData('title')
                  this.$message.success('修改证书成功')
                })
              } else if (this.ruleForm.type === 'org_qualification') {
                updateQualification(param).then(res => {
                  this.$refs.dialog.show = false
                  this.fetchData('title')
                  this.$message.success('修改资质成功')
                })
              }
            }
          }
        } else {
          return
        }
      })
    },
    fetchOrgInfo(sortData) {
      const self = this
      const id = getSessionStorage('orgId')
      const { propertyName, ascending } = sortData || {}
      const params = {
        propertyName,
        ascending
      }
      this.loading = true
      getQuaCer(params, id).then(({
        data
      }) => {
        self.reconstruction(data)
        this.loading = false
      })
    },
    // 将列表信息重新保存
    async reconstruction(data) {
      var dataList = []
      var fileList = []
      await data.forEach(async(item) => {
        const id = getUuid()
        const { annualSurvey, endDate, number, qualificationType, remark, startDate, annualSurveyMonth, type, unitName, qualificationTypeName, lastEndDate, lastStartDate, manageRange } = item
        var param = {
          annualSurvey,
          endDate,
          number,
          remark,
          startDate,
          qualificationType,
          annualSurveyMonth,
          qualificationTypeName,
          type,
          unitName,
          lastEndDate,
          lastStartDate,
          manageRange
        }
        param.id = id
        param.organizationId = this.serviceId ? this.serviceId : this.$route.query.operaId
        dataList.push(param)
        // 将组织架构的附件保存到当前操作记录id的下面
        if ((this.$route.query.operaId && this.newsId) || (this.$route.query.title === '完善信息' && this.newsId)) {
          await fileLoadCoop(item.id, 'organManageQualify').then(({ data }) => {
            if (data.length !== 0) {
              data.map(e => {
                e.businessDataId = id
                delete e.id
                fileList.push(e)
                return e
              })
            }
          })
        } else {
          await fileLoad(item.id, 'organManageQualify').then(({ data }) => {
            if (data) {
              data.map(e => {
                e.businessDataId = id
                delete e.id
                fileList.push(e)
                return e
              })
            }
          })
        }
      })
      const t = setInterval(() => {
        if (fileList.length !== 0) {
          copyFile(fileList).then(({ data }) => {
            this.fileList = data
            this.dialogLoading = false
            this.fileList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            saveQualificationList(dataList).then(res => {
              this.updatfetchData()
            })
          })
          clearInterval(t)
        }
      }, 10)
    },
    // 类别名称调整
    category(name) {
      const nameArray = name.split(',')
      var nameStr = ''
      nameArray.forEach(item => {
        item = item.replace('/', ',')
        nameStr += item + '/'
      })
      nameStr = nameStr.substring(0, nameStr.length - 1)
      return nameStr
    }
  }
}
</script>

<style lang="less" scoped>
.certification {
	&>div {
		&:first-child {
			margin-bottom: 10px;
		}
  }
   .title{
    text-align: center;
    font-size:16px;
    font-weight: 700;
    color:#000;
    font-style: normal;
  }
		.ruleForm {
			display: flex;
			flex-wrap: wrap;

			&>.el-form-item {
				width: 50%;
			}

			.el-date-editor.el-input,
			.el-date-editor.el-input__inner,
			.el-select {
				width: 100%;
      }
      .qualify-box {
      width: 100%;
      display: flex;
      margin-bottom: 1px;
      .qualify-add {
          width: 30px;
          height: 30px;
          color: #fff;
          background: @primary;
          line-height: 30px;
          text-align: center;
          font-size: 20px;
          margin-left: 10px;
          border-radius: 4px;
          cursor: pointer;
        }
      }
		}
	}
</style>
