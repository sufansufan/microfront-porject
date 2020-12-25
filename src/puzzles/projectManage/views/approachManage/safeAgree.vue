<template>
  <div class="safe-agree">
    <jdy-title-name :title="getTitle" />
    <search-bar :btn-list="btnList" :show-select="false" />
    <!-- <comm-table
      ref="commTable"
      v-loading="loading"
      :single-selected="true"
      :columns="columns"
      :table-options="tableOptions"
      :data="tableData"
      :count="total"
    /> -->
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      row-key="id"
      border
      max-height="calc(100vh -300px)"
      :default-sort=" {
        prop: 'code',
        order: 'ascending'
      }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" width="48" label="序号" align="center" />
      <el-table-column prop="code" label="施工队编号" align="center" sortable="custom" />
      <el-table-column prop="name" label="施工队名称" align="center" />
      <el-table-column prop="chargePersonName" label="施工队负责人" align="center" width="150" />
      <el-table-column prop="cooperativeUnitName" label="所属公司" align="center" />
      <el-table-column prop="name" label="安全协议" align="center">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.uploadUserName"
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
            <span slot="reference" class="table-click-color" @click="lookFile(scope.row)"> <i class="iconfont icon-fujia" /> 安全协议</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="uploadUserName" label="上传人" align="center" />
      <el-table-column prop="uploadDate" label="上传日期" align="center" sortable="custom">
        <template slot-scope="scope">
          <span>{{ getTiem(scope.uploadDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.uploadUserName" v-power="'safeAgree:upload'" type="primary" @click="handlerOperate('add', scope.row)">上传</el-button>
          <template v-else>
            <el-button v-power="'safeAgree:edit'" type="primary" @click="handlerOperate('edit', scope.row)">修改</el-button>
            <el-button v-power="'safeAgree:empty'" type="danger" @click="handlerOperate('clear', scope.row)">清空</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-show="total"
        :page-sizes="pageSizes"
        :page-size="size"
        :total="total"
        :current-page="page"
        :layout="pageLayout"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <drag-dialog ref="dialog" :title="title">
      <el-form
        ref="ruleForm"
        :key="key"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="rule-form-flex"
      >
        <el-form-item label="施工队名称" class="one-width">
          <el-input
            v-model="ruleFormAttach.name"
            placeholder="请输入编号"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="所属公司" class="one-width">
          <el-input
            v-model="ruleFormAttach.cooperativeUnitName"
            placeholder="请输入所属公司"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item class="one-width">
          <span slot="label"><span class="custom-form-label">*</span>安全协议</span>
          <jdy-upload ref="jdyUpload" type-code="safeAgree" :business-data-id="ruleForm.id" :disabled="disabled" :is-add="dialogType === 'add' ? true : false" @changeBindRuleFormId="changeBindRuleFormId" />
        </el-form-item>
        <el-form-item label="上传人" class="one-width">
          <el-input
            v-model="ruleForm.uploadUserName"
            placeholder="请输入编号"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="上传日期" prop="uploadDate" class="one-width">
          <el-date-picker
            v-model="ruleForm.uploadDate"
            type="date"
            placeholder="请选择上传日期"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="dialogSubmit">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import search from '@core/mixins/search'
import safeAgree from './searchTableData/safeAgree'
import table from '@core/mixins/table'
import pagination from '@core/mixins/pagination'
import { safeAgreeListPage, safeAgreeLoad, safeAgreeAdd, safeAgreeUpdate, safeAgreeDalete } from '@core/api/projectManage/projectmanager'
import { exportExcel } from '@core/utils'
import { getSessionStorage } from '@core/utils/auth'
import { fileLoad, downLoadFile } from '@core/api/accessoryFile'
import { parseTime } from '@core/utils'
export default {
  name: 'SafeAgree',
  mixins: [safeAgree, search, table, pagination],
  data() {
    return {
      tableData: [],
      loading: false,
      total: 0,
      key: 0,
      dialogType: '',
      fileListLoading: false,
      fileList: [],
      ruleForm: {
        id: '',
        uploadDate: new Date(),
        uploadUserId: getSessionStorage('userId'),
        uploadUserName: getSessionStorage('userName'),
        teamId: ''
      },
      ruleFormAttach: {
        name: '',
        cooperativeUnitName: ''
      },
      rules: {
        uploadDate: [{ required: true, message: '请选择上传日期', trigger: 'change' }]
      }
    }
  },
  computed: {
    getTitle() {
      return getSessionStorage('belongOrgName')
    },
    getTiem() {
      return (val) => {
        return parseTime(val, 'y-m-d')
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const { projectId } = this.$route.query
      const defaultSort = {
        propertyName: 'code',
        ascending: true
      }
      const params = {
        ...this.search,
        ...defaultSort,
        ...this.sortData,
        projectId,
        page: this.page ? this.page - 1 : 0,
        size: this.size || 10
      }
      safeAgreeListPage(params).then(({ data: { content, total }}) => {
        this.loading = false
        this.tableData = content
        this.total = total
      })
    },
    handlerOperate(type, row) {
      const { name, cooperativeUnitName, id, securityContractId, uploadDate } = row
      this.ruleFormAttach = {
        name,
        cooperativeUnitName
      }
      this.ruleForm.teamId = id
      this.key += 1
      this.dialogType = type
      if (type === 'add') {
        this.ruleForm.uploadDate = new Date(),
        this.$refs.dialog.show = true
      } else if (type === 'edit') {
        this.ruleForm.id = securityContractId
        this.ruleForm.uploadDate = uploadDate
        this.$refs.dialog.show = true
      } else if (type === 'clear') {
        this.clearSubmit(securityContractId)
      }
    },
    filesDownload() {
      const { projectId } = this.$route.query
      // const { multipleSelection } = this.$refs.commTable
      var idList = []
      if (this.multipleSelection.length) {
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
      } else {
        idList = null
      }
      safeAgreeLoad({ idList: idList, projectId }).then(res => {
        exportExcel(res, '')
      })
    },
    dialogSubmit() {
      if (!this.$refs.jdyUpload.fileLists.length) {
        this.$message.warning('请选择安全协议')
        return
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const params = {
            Loading: true,
            ...this.ruleForm
          }
          if (this.dialogType === 'add') {
            safeAgreeAdd(params).then(() => {
              this.$message.success('上传成功')
              this.$refs.dialog.show = false
              this.fetchData()
            })
          } else if (this.dialogType === 'edit') {
            safeAgreeUpdate(params).then(() => {
              this.$message.success('修改成功')
              this.$refs.dialog.show = false
              this.fetchData()
            })
          }
        } else {
          return false
        }
      })
    },
    clearSubmit(id) {
      safeAgreeDalete(id).then(() => {
        this.$message.success('清空成功')
        this.fetchData()
      })
    },
    changeBindRuleFormId(id) {
      this.ruleForm.id = id
    },
    downLoadFile(row) {
      downLoadFile(row.id).then(res => {
        exportExcel(res, row.fileName)
      })
    },
    lookFile(row) {
      const { securityContractId } = row
      this.fileListLoading = true
      fileLoad(securityContractId, 'safeAgree').then(({ data }) => {
        this.fileList = data
        this.fileListLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.safe-agree {
  padding: 10px;
}
</style>
<style lang="less">
.safe-agree {
  .el-table__body-wrapper {
    max-height: calc(100vh - 350px);
  }
}
</style>
