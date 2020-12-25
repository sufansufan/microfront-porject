<template>
  <div class="certification">
    <div v-if="!disabled">
      <el-button type="primary" @click="updateData('add','')"><i class="iconfont icon-xinzeng1-copy" />添加</el-button>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      default-expand-all
      :data="tableData"
      row-key="id"
      border
      :default-sort="{prop: 'startDate', order: 'ascending'}"
      @sort-change="sortTable"
    >
      <el-table-column type="index" width="48" label="序号" align="center" />
      <el-table-column prop="type" sortable="custom" label="分类" align="center" width="100" />
      <el-table-column prop="qualificationTypeName" label="类别" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.qualificationTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="证书编号" align="center" width="160" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div class="table-click-color one-ellipsis" @click="updateData('details',scope.row)">{{ scope.row.number }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="manageRange" label="名称/范围" align="center" width="120" :show-overflow-tooltip="true" />
      <el-table-column prop="startDate" label="发证日期" width="120" align="center" sortable="custom" />

      <el-table-column prop="endDate" label="有效截止日期" width="120" align="center" sortable="custom" />
      <el-table-column prop="unitName" label="发证机关" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="lastEndDate" label="上次有效截止日期" sortable="custom" align="center" width="160" />
      <el-table-column prop="status" label="证书状态" width="100" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status ==='0' ? '正常' : '失效' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="附件" align="center" width="100">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="400"
            trigger="click"
          >
            <el-table :data="fileData" border>
              <el-table-column property="fileName" label="文件名称" header-align="center" align="left" show-overflow-tooltip>
                <template slot-scope="scoperty">
                  <span class="table-click-color" @click="downFile(scoperty.row)">{{ scoperty.row.fileName }}</span>
                </template>
              </el-table-column>
              <el-table-column width="100" property="fileSize" label="文件大小" align="center">
                <template slot-scope="scoperty">
                  <span>{{ scoperty.row.fileSize }} KB</span>
                </template>
              </el-table-column>
            </el-table>
            <span slot="reference" class="table-click-color" @click="lookFile(scope.row)">查看附件</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-if="!disabled" prop="name" label="操作" align="center" width="170">
        <template slot-scope="scope">
          <el-button type="primary" @click="updateData('edit', scope.row)">修改</el-button>
          <el-button type="danger" @click="deleteData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <drag-dialog ref="dialog" :title="title" width="50%">
      <el-form ref="ruleForm" :key="key" v-loading="dialogLoading" :rules="rules" :model="ruleForm" label-width="140px" class="ruleForm">
        <el-form-item label="分类" prop="type">
          <el-select v-model="ruleForm.type" clearable :disabled="disableds || addOrEditType === 'details'" placeholder="请选择分类" @change="typeChange">
            <el-option v-for="item in constant.orgBusinessType" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="证书编号" prop="number">
          <el-input v-model.trim="ruleForm.number" clearable maxlength="20" show-word-limit :disabled="disableds || addOrEditType === 'details'" placeholder="请输入证书编号" />
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
                :disabled="disableds || addOrEditType === 'details'"
                style="width:100%"
                :options="constant.orgQualifications"
                :props="{ expandTrigger: 'hover', value: 'code', label: 'name', children: 'childs' }"
              />
              <div v-if="addOrEditType !== 'details'" class="qualify-add" @click="addQualify">
                <i class="el-icon-plus" />
              </div>
              <div v-if="addOrEditType !== 'details'" class="qualify-add" @click="reduceQualify(index)">
                <i class="el-icon-minus" />
              </div>
            </div>
          </el-form-item>
        </template>
        <template v-if="ruleForm.type == 'org_certificate'">
          <el-form-item label="经营范围" prop="manageRange">
            <el-select v-model="ruleForm.manageRange" clearable :disabled="disableds || addOrEditType === 'details'" placeholder="请选择经营范围">
              <el-option v-for="item in constant.businessScope" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item label="证书" prop="certificateType">
            <el-select v-model="ruleForm.certificateType" clearable :disabled="disableds || addOrEditType === 'details'" placeholder="请选择证书">
              <el-option v-for="item in constant.orgCertType" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item label="上次有效开始日期" prop="lastStartDate">
            <el-date-picker v-model="ruleForm.lastStartDate" clearable type="date" :disabled="disableds || addOrEditType === 'details'" placeholder="请选择上次有效开始日期" :picker-options="lastStartDateOptions" @change="lastStartDateChange" />
          </el-form-item>
          <el-form-item label="上次有效截止日期" prop="lastEndDate">
            <el-date-picker v-model="ruleForm.lastEndDate" type="date" clearable :disabled="disableds || addOrEditType === 'details'" placeholder="请选择上次有效截止日期" :picker-options="pickerOptionsLast" @change="lastEndDateChange" />
          </el-form-item>
        </template>
        <el-form-item label="发证日期" prop="startDate">
          <el-date-picker
            v-model="ruleForm.startDate"
            clearable
            type="date"
            :disabled="disableds || addOrEditType === 'details'"
            placeholder="请选择发证日期"
            :picker-options="startDateOptions"
            @change="startDateChange"
          />
        </el-form-item>
        <el-form-item label="有效截止日期" prop="endDate">
          <el-date-picker v-model="ruleForm.endDate" clearable type="date" :disabled="disableds || addOrEditType === 'details'" placeholder="请选择有效截止日期" :picker-options="pickerOptionsClose" @change="endDateChange" />
        </el-form-item>
        <el-form-item label="发证机关" prop="unitName">
          <el-input v-model.trim="ruleForm.unitName" clearable maxlength="50" show-word-limit :disabled="disableds || addOrEditType === 'details'" placeholder="请输入发证机关" />
        </el-form-item>
        <el-form-item label="年检频率" prop="annualSurvey">
          <el-select v-model="ruleForm.annualSurvey" clearable :disabled="disableds || addOrEditType === 'details'" placeholder="请选择年检频率">
            <el-option v-for="item in constant.inspectionFrequency" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.annualSurvey !== 'Never'" label="年检月份" prop="annualSurveyMonth">
          <el-select v-model="ruleForm.annualSurveyMonth" clearable :disabled="disableds || addOrEditType === 'details'" placeholder="请选择年检月份">
            <el-option
              v-for="item in 12"
              :key="item"
              :label="item +'月'"
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
            :disabled="disabled || addOrEditType === 'details'"
            :before-upload="beforeUpload50M"
            :on-preview="previewFile"
          >
            <el-button type="primary" :disabled="disabled || addOrEditType === 'details'">点击上传</el-button>
            <div slot="tip" class="tip-color">单个附件请不超过50M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" style="width: 100%" prop="remark" class="row-label">
          <el-input v-model.trim="ruleForm.remark" type="textarea" :rows="3" :disabled="disableds || addOrEditType === 'details' " placeholder="请输入备注" maxlength="200" show-word-limit />
        </el-form-item>
      </el-form>
      <template v-if="define || addOrEditType !== 'details'" slot="footer">
        <el-button type="primary" @click="saveOrUpdateData()">确定</el-button>
      </template>
    </drag-dialog>
  </div>
</template>

<script>
import upload from '@core/mixins/upload'
import DragDialog from '@frames/dashboard/components/Dialog'
import table from '@core/mixins/table'
import { mapGetters } from 'vuex'
import { addCertificate, addQualifications, updateOgCertificate, updateQualification, getQuaCerC,
  delQualification, getQualification } from '@core/api/cooperativeEnterprise/qualification'
import { codeChangeName, exportExcel, getUuid, queryParent } from '@core/utils'
import { exportFile } from '@core/api/accessoryFile'
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
    enterpriseId: {
      default: '',
      type: String
    },
    orgName: {
      default: '',
      type: String
    },
    serviceId: {
      default: '',
      type: String
    },
    handleId: {
      default: '',
      type: String
    },
    code: {
      default: '',
      type: String
    },
    type: {
      default: '',
      type: String
    },
    latelyId: {
      default: '',
      type: String
    },
    updateId: {
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
        lastStartDate: '',
        lastEndDate: '',
        startDate: '',
        endDate: '',
        unitName: '',
        annualSurvey: '',
        annualSurveyMonth: '',
        remark: '',
        qualificationType: ''
      },
      rules: {
        type: [{ required: true, message: '请选择分类' }],
        number: [{ required: true, message: '请输入证书编号' },
          { min: 0, max: 20, message: '长度不能大于20 个字符', trigger: 'blur' }],
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
      qualifyData: [{ qualify: [] }],
      isExistId: this.$route.query.isExistId,
      dialogLoading: false,
      loading: false,
      fileData: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    enterpriseId: {
      handler(v) {
        if (v) {
          this.fetchData()
        }
      },
      immediate: true,
      deep: true
    },
    serviceId(v) {
      if (v) {
        this.fetchData()
      }
    },
    updateId: {
      handler(v) {
        if (v) {
          this.fetchData()
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.actionUrl = this.actionUrl.replace('platform', 'cooperativeunit')
    if (this.isExistId) this.fetchData()
    this.$store.dispatch('getConstant', ['orgBusinessType', 'orgQualifications', 'inspectionFrequency', 'businessScope', 'orgCertType'])
    this.uploadData.typeCode = 'organManageQualify'
  },
  methods: {
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
    getDetails() {
      getQualification(this.rowId).then(({ data }) => {
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
    getFile() {
      this.getFileLoad().then(data => {
        this.dialogLoading = false
        this.fileList = data
        this.formLoading = false
        this.fileList.map(item => {
          item.name = item.fileName
          item.url = item.fileUrl
          return item
        })
      })
    },
    updateData(type, row) {
      this.addOrEditType = type
      this.rowId = row.id
      if (type === 'edit') {
        this.dialogLoading = true
        this.disableds = false
        this.title = '修改资质'
        this.getDetails()
        this.define = true
      } else if (type === 'add') {
        this.dialogLoading = false
        this.uploadData.businessDataId = getUuid()
        this.disableds = false
        this.title = '新增资质'
        this.ruleForm = { ...this.deepRuleForm }
        this.define = true
        this.fileList = []
        this.qualifyData = [{ qualify: [] }]
      } else {
        this.dialogLoading = true
        this.disableds = true
        this.title = '查看证书信息'
        this.getDetails()
        this.define = false
      }
      this.key += 1
      this.$refs.dialog.show = true
    },
    fetchData(sortData) {
      this.loading = true
      const { propertyName, ascending } = sortData || {}
      const params = {
        propertyName,
        ascending
      }
      if (typeof sortData === 'number' || JSON.stringify(sortData) === '{}') {
        params.propertyName = 'startDate'
      }
      if (this.serviceId) {
        getQuaCerC(params, this.serviceId).then(({ data }) => {
          this.loading = false
          this.tableData = data || []
          this.tableData.map(item => {
            item.type = codeChangeName(this.constant.orgBusinessType, item.type)
            item.manageRangemanageRange = codeChangeName(this.constant.businessScope, item.manageRange)
            return item
          })
        })
      } else if (this.updateId) {
        getQuaCerC(params, this.updateId).then(({ data }) => {
          this.loading = false
          this.tableData = data || []
          this.tableData.map(item => {
            item.type = codeChangeName(this.constant.orgBusinessType, item.type)
            item.manageRange = codeChangeName(this.constant.businessScope, item.manageRange)
            return item
          })
        })
      } else if (this.isExistId) {
        getQuaCerC(params, this.isExistId).then(({ data }) => {
          this.loading = false
          this.tableData = data || []
          this.tableData.map(item => {
            item.type = codeChangeName(this.constant.orgBusinessType, item.type)
            item.manageRange = codeChangeName(this.constant.businessScope, item.manageRange)
            return item
          })
        })
      } else {
        getQuaCerC(params, this.enterpriseId).then(({ data }) => {
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
    deleteData(id) {
      this.$confirm('确认要删除选中的资质/证书？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delQualification(id).then(res => {
          this.$message.success('删除成功!')
          this.fetchData()
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
      if (this.handleId) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            var params = {
              Loading: true,
              ...this.ruleForm,
              qualificationType: this.ruleForm.qualificationType ? this.ruleForm.qualificationType : this.ruleForm.certificateType,
              organizationId: this.handleId,
              qualificationTypeName: qualificationTypeName,
              id: getUuid()
            }
            delete params.certificateType
            if (this.addOrEditType === 'add') {
              if (this.ruleForm.type === 'org_certificate') {
                addCertificate(params).then(res => {
                  this.$refs.dialog.show = false
                  this.fetchData()
                  this.$message.success('新增证书成功')
                })
              } else if (this.ruleForm.type === 'org_qualification') {
                addQualifications(params).then(res => {
                  this.$refs.dialog.show = false
                  this.fetchData()
                  this.$message.success('新增资质成功')
                })
              }
            } else {
              return
            }
          } else {
            return
          }
        })
      } else if (this.serviceId) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            var params = {
              Loading: true,
              ...this.ruleForm,
              qualificationType: this.ruleForm.qualificationType ? this.ruleForm.qualificationType : this.ruleForm.certificateType,
              organizationId: this.serviceId,
              qualificationTypeName: qualificationTypeName,
              id: getUuid()
            }
            delete params.certificateType

            if (this.addOrEditType === 'add') {
              if (this.ruleForm.type === 'org_certificate') {
                addCertificate(params).then(res => {
                  this.$refs.dialog.show = false
                  this.fetchData()
                  this.$message.success('新增证书成功')
                })
              } else if (this.ruleForm.type === 'org_qualification') {
                addQualifications(params).then(res => {
                  this.$refs.dialog.show = false
                  this.fetchData()
                  this.$message.success('新增资质成功')
                })
              }
            } else {
              return
            }
          } else {
            return
          }
        })
      } else {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            var params = {
              Loading: true,
              ...this.ruleForm,
              qualificationType: this.ruleForm.qualificationType ? this.ruleForm.qualificationType : this.ruleForm.certificateType,
              organizationId: this.enterpriseId,
              qualificationTypeName: qualificationTypeName,
              id: this.uploadData.businessDataId
            }
            delete params.certificateType
            if (this.addOrEditType === 'add') {
              if (this.ruleForm.type === 'org_certificate') {
                addCertificate(params).then(res => {
                  this.$refs.dialog.show = false
                  this.fetchData()
                  this.$message.success('新增证书成功')
                })
              } else if (this.ruleForm.type === 'org_qualification') {
                addQualifications(params).then(res => {
                  this.$refs.dialog.show = false
                  this.fetchData()
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
                  this.fetchData()
                  this.$message.success('修改证书成功')
                })
              } else if (this.ruleForm.type === 'org_qualification') {
                updateQualification(params).then(res => {
                  this.$refs.dialog.show = false
                  this.fetchData()
                  this.$message.success('修改资质成功')
                })
              }
            }
          } else {
            return
          }
        })
      }
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
</style>
