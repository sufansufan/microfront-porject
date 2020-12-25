<template>
  <div class="certificate-info">
    <div v-if="!disabled">
      <el-button type="primary" @click="updateData()">添加</el-button>
    </div>
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      row-key="id"
      :default-sort="{prop: 'issueDate', order: 'descending'}"
      border
      @sort-change="sortTable"
    >
      <el-table-column type="index" width="48" label="序号" align="center" />
      <el-table-column prop="code" label="证书编号" align="center" show-overflow-tooltip />
      <el-table-column prop="name" label="证书名称" align="center" show-overflow-tooltip />
      <el-table-column prop="issueAuthority" label="发证机关" align="center" show-overflow-tooltip />
      <el-table-column prop="issueDate" label="发证日期" align="center" sortable show-overflow-tooltip />
      <el-table-column prop="validDate" label="有效期" align="center" sortable show-overflow-tooltip />
      <el-table-column prop="name" label="附件" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            width="300"
            trigger="click"
          >
            <el-table v-loading="fileListLoading" :data="fileList" border>
              <el-table-column prop="fileName" label="文件名称" header-align="center" align="left" show-overflow-tooltip>
                <template slot-scope="{row}">
                  <span class="table-click-color" @click="downLoadFile(row)">{{ row.fileName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="fileSize" label="文件大小" align="center" width="100">
                <template slot-scope="{row}">
                  <span>{{ row.fileSize }}KB</span>
                </template>
              </el-table-column>
            </el-table>
            <span slot="reference" class="table-click-color" @click="lookFile(scope.row)"> <i class="iconfont icon-fujia" /> 查看附件</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-if="!disabled" prop="name" label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <drag-dialog ref="dialog" :title="title" width="50%">
      <el-form ref="ruleForm" :key="key" v-loading="formLoading" :rules="rules" :model="ruleForm" label-width="110px" class="ruleForm">
        <el-form-item label="证书编号" prop="code">
          <el-input v-model="ruleForm.code" clearable :disabled="disabled" placeholder="请输入证书编号" :maxlength="20" />
        </el-form-item>
        <el-form-item label="证书名称" prop="name">
          <el-input v-model="ruleForm.name" clearable :disabled="disabled" placeholder="请输入证书名称" style="width: 100%" :maxlength="20" />
        </el-form-item>
        <el-form-item label="发证机关" prop="issueAuthority">
          <el-input v-model="ruleForm.issueAuthority" clearable :disabled="disabled" placeholder="请输入发证机关" :maxlength="20" />
        </el-form-item>
        <el-form-item label="发证日期" prop="issueDate">
          <el-date-picker v-model="ruleForm.issueDate" type="date" clearable placeholder="请选择发证日期" style="width: 100%" :picker-options="startPickerDateTime" />
        </el-form-item>
        <el-form-item label="有效期" prop="validDate">
          <el-date-picker v-model="ruleForm.validDate" :disabled="disabled" type="date" clearable placeholder="请选择有效期" :picker-options="endPickerDateTime" style="width: 100%" />
        </el-form-item>
        <el-form-item ref="fileForm" style="width: 100%">
          <span slot="label"><span class="custom-form-label">*</span>证书</span>
          <el-upload
            :file-list="fileList"
            :action="actionUrl"
            :on-success="fileSuccess"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-remove="handleRemove"
            :before-upload="beforeUpload50M"
            :disabled="disabled"
            :on-preview="previewFile"
          >
            <el-button type="primary" :disabled="disabled">点击上传</el-button>
            <div slot="tip" class="tip-color">单个附件请不超过50M</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="saveOrUpdateData()">确定</el-button>
      </template>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import table from '@core/mixins/table'
import upload from '@core/mixins/upload'
import { validateLength } from '@core/utils/validate'
import { getCertificateList, addCertificate, deleteCertificate } from '@core/api/projectManage/projectmanager'
import { parseTime } from '@core/utils'
import { downLoadFile } from '@core/api/accessoryFile'
import { exportExcel, getUuid } from '@core/utils'
import { startPickerDate, endPickerDate } from '@core/utils'
export default {
  name: 'PostInfo',
  components: {
    DragDialog
  },
  mixins: [table, upload],
  props: {
    disabled: {
      default: false,
      type: Boolean
    },
    baseinfoId: {
      default: '',
      type: String
    },
    personnelId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      title: '',
      tableData: [],
      loading: false,
      fileListLoading: false,
      formLoading: true,
      ruleForm: {
        code: '',
        name: '',
        issueAuthority: '',
        issueDate: '',
        validDate: ''
      },
      rules: {
        code: [{ required: true, message: '请输入证书编号', trigger: 'blur' }, validateLength(0, 20)],
        name: [{ required: true, message: '请输入证书名称', trigger: 'blur' }, validateLength(0, 20)],
        issueAuthority: [{ required: true, message: '请输入发证机关', trigger: 'blur' }, validateLength(0, 20)],
        issueDate: [{ required: true, message: '请选择发证日期', trigger: 'change' }],
        validDate: [{ required: true, message: '请选择有效期', trigger: 'change' }]
      },
      fileList: []
    }
  },
  computed: {
    startPickerDateTime() {
      return startPickerDate(this.ruleForm.validDate, false)
    },
    endPickerDateTime() {
      return endPickerDate(this.ruleForm.issueDate, false)
    }
  },
  created() {
    this.uploadData.typeCode = 'workerCertificate'
    this.fetchData()
  },
  methods: {
    updateData(type, row) {
      this.formLoading = false
      this.title = '添加证书'
      this.ruleForm = { ...this.deepRuleForm }
      this.fileList = []
      this.key += 1
      this.$refs.dialog.show = true
      this.uploadData.businessDataId = getUuid()
    },
    // 上传成功
    fileSuccess(response, file, fileList) {
      this.fileList = fileList
      this.uploadLoading.close()
    },
    getFile() {
      this.getFileLoad().then(data => {
        this.fileList = data
        this.formLoading = false
        this.fileList.map(item => {
          item.name = item.fileName
          item.url = item.fileUrl
          return item
        })
      })
    },
    // 查看附件
    lookFile(row) {
      const { id } = row
      this.fileListLoading = true
      this.getFileLoad(id, 'workerCertificate').then(data => {
        this.fileList = data
        this.fileListLoading = false
      })
    },
    downLoadFile(row) {
      downLoadFile(row.id).then(res => {
        exportExcel(res, row.fileName)
      })
    },
    fetchData(sortData) {
      this.loading = true
      // const { propertyName, ascending } = sortData || {}
      const params = {
        propertyName: 'issueDate',
        ascending: false,
        ...this.sortData,
        memberId: this.baseinfoId || this.personnelId
      }
      getCertificateList(params).then(({ data }) => {
        this.loading = false
        this.tableData = data.map(item => {
          item.issueDate = parseTime(item.issueDate, 'y-m-d')
          item.validDate = parseTime(item.validDate, 'y-m-d')
          return item
        })
        this.$emit('certificateData', this.tableData)
      })
    },
    deleteData(id) {
      this.$confirm('确定要删除该条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCertificate(id).then(res => {
          this.$message.success('删除成功!')
          this.fetchData()
        })
      }).catch(() => {})
    },
    saveOrUpdateData() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.fileList.length) {
            this.$message.warning('请上传附件')
            return
          }
          const params = {
            Loading: true,
            ...this.ruleForm,
            memberId: this.baseinfoId || this.personnelId,
            id: this.uploadData.businessDataId
          }
          addCertificate(params).then(({ code, message }) => {
            this.$message.success('添加成功!')
            this.$refs.dialog.show = false
            this.fetchData()
          })
        } else {
          return false
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.certificate-info {
  width: 100%;
  & > div {
    &:first-child {
      margin-bottom: 10px;
    }
  }
  .ruleForm {
    display: flex;
    flex-wrap: wrap;
    & > .el-form-item {
      width: 50%;
    }
    .el-select {
      width: 100%;
    }
  }
}
</style>
