<template>
  <div class="contract-info">
    <div v-if="!disabled">
      <el-button type="primary" @click="updateData('add')">添加</el-button>
    </div>
    <el-table ref="multipleTable" v-loading="loading" :data="tableData" row-key="id" border>
      <el-table-column type="index" width="48" label="序号" align="center" />
      <el-table-column prop="contractNumber" label="合同编号" align="center" />
      <el-table-column prop="typeName" label="合同类型" align="center" />
      <el-table-column prop="contractPeriodName" label="合同期限" align="center" width="150" />
      <el-table-column prop="signingModeName" label="签订方式" align="center" />
      <el-table-column prop="renewalsNumber" label="续签次数" align="center" width="200" />
      <el-table-column prop="signingDate" label="合同签订日期" align="center" width="120" />
      <el-table-column prop="startDate" label="合同起始日期" align="center" width="120" />
      <el-table-column prop="endDate" label="合同结束日期" align="center" width="120" />
      <el-table-column prop="stateName" label="合同状态" align="center" />
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
    <drag-dialog ref="dialog" width="50%">
      <el-form ref="ruleForm" :key="key" v-loading="formLoading" :rules="rules" :model="ruleForm" label-width="110px" class="ruleForm">
        <el-form-item label="合同编号" prop="contractNumber">
          <el-input v-model="ruleForm.contractNumber" :maxlength="20" clearable :disabled="disabled" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="合同类型" prop="type">
          <el-select v-model="ruleForm.type" clearable :disabled="disabled" placeholder="请选择合同类型">
            <el-option
              v-for="item in constant.laborContractType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合同期限" prop="contractPeriod">
          <el-select v-model="ruleForm.contractPeriod" clearable :disabled="disabled" placeholder="请选择合同期限" @change="changeContractPeriod">
            <el-option
              v-for="item in constant.laborContractPeriod"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="签订方式" prop="signingMode">
          <el-select v-model="ruleForm.signingMode" clearable :disabled="disabled" placeholder="请选择签订方式">
            <el-option
              v-for="item in constant.signingMode"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="续签次数" prop="renewalsNumber">
          <el-select v-model="ruleForm.renewalsNumber" clearable :disabled="disabled" placeholder="请选择续签次数">
            <el-option
              v-for="item in 10"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合同签订日期" prop="signingDate">
          <el-date-picker
            v-model="ruleForm.signingDate"
            clearable
            type="date"
            placeholder="请选择合同签订日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="合同起始日期" prop="startDate">
          <el-date-picker
            v-model="ruleForm.startDate"
            clearable
            type="date"
            placeholder="请选择合同起始日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="合同结束日期" prop="endDate">
          <el-date-picker
            v-model="ruleForm.endDate"
            clearable
            type="date"
            placeholder="请选择合同结束日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="合同状态" prop="state">
          <el-select v-model="ruleForm.state" clearable :disabled="disabled" placeholder="请选择合同状态">
            <el-option
              v-for="item in constant.laborContractState"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <div style="width: 100%" />
        <el-form-item>
          <span slot="label"><span class="custom-form-label">*</span>附件</span>
          <el-upload
            :file-list="fileList"
            :action="actionUrl"
            :on-success="fileSuccess"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-remove="handleRemove"
            :before-upload="beforeUpload50M"
            :disabled="disabled"
            :on-error="fileError"
            :on-preview="previewFile"
          >
            <el-button type="primary" :disabled="disabled">点击上传</el-button>
            <div slot="tip" class="tip-color">单个附件请不超过50M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" style="width: 100%" prop="remark">
          <el-input v-model="ruleForm.remark" type="textarea" :rows="3" clearable :disabled="disabled" placeholder="请输入备注" :maxlength="255" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="saveOrUpdateData">确定</el-button>
      </template>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import { mapGetters } from 'vuex'
import { contractList, saveContract, updateContract, deleteContract, verificationlaborcontract } from '@core/api/laborcontract'
import table from '@core/mixins/table'
import upload from '@core/mixins/upload'
import { getUuid, exportExcel } from '@core/utils'
import { downLoadFile } from '@core/api/accessoryFile'
import { validateLength } from '@core/utils/validate'
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
    personnelId: {
      default: '',
      type: String
    }
  },

  data() {
    var verificationLab = (rule, value, callback) => {
      var params = {
        contractNumber: this.ruleForm.contractNumber,
        id: this.editPostId
      }
      verificationlaborcontract(params).then(res => {
        if (res && res.data === true) {
          callback()
        } else if (res && res.data === false) {
          callback('合同编号已存在，请重新输入')
        }
      })
    }
    return {
      loading: false,
      fileListLoading: false,
      formLoading: false,
      tableData: [],
      ruleForm: {
        personnelId: '',
        contractNumber: '',
        type: '',
        contractPeriod: '',
        signingMode: 'New',
        renewalsNumber: '0',
        signingDate: '',
        startDate: '',
        endDate: '',
        state: 'Ok',
        remark: ''
      },
      rules: {
        contractNumber: [{ required: true, message: '请输入合同编号', trigger: 'blur' },
          { required: true, validator: verificationLab, trigger: 'blur' },
          validateLength(0, 20)],
        type: [{ required: true, message: '请选择合同类型', trigger: 'blur' }],
        contractPeriod: [{ required: true, message: '请选择合同期限', trigger: 'change' }],
        signingMode: [{ required: true, message: '请选择签订方式', trigger: 'change' }],
        renewalsNumber: [{ required: true, message: '请选择续签次数', trigger: 'change' }],
        signingDate: [{ required: true, message: '请选择合同签订日期', trigger: 'change' }],
        startDate: [{ required: true, message: '请选择合同开始日期', trigger: 'change' }],
        state: [{ required: true, message: '请选择合同状态', trigger: 'change' }],
        endDate: [{ required: false, message: '请选择合同结束日期', trigger: 'change' }],
        remark: validateLength(0, 255)
      },
      addOrEditType: '',
      editPostId: '',
      fileList: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['laborContractType', 'laborContractPeriod', 'signingMode', 'laborContractState']).then(() => {
      if (this.personnelId) {
        this.fetchData()
      }
    })
    this.uploadData.typeCode = 'contractInfo'
  },
  methods: {
    changeContractPeriod(val) {
      if (val === '1') {
        this.rules.endDate[0].required = true
      } else {
        this.rules.endDate[0].required = false
      }
    },
    // 查看附件
    lookFile(row) {
      const { id } = row
      this.fileListLoading = true
      this.getFileLoad(id, 'contractInfo').then(data => {
        this.fileList = data
        this.fileListLoading = false
      })
    },
    downLoadFile(row) {
      downLoadFile(row.id).then(res => {
        exportExcel(res, row.fileName)
      })
    },
    fetchData() {
      this.loading = true
      contractList(this.personnelId).then(({ data }) => {
        this.tableData = data
        this.loading = false
      })
    },
    saveOrUpdateData() {
      return new Promise((resolve, inject) => {
        this.$refs.ruleForm.validate((valid, obj) => {
          if (valid) {
            if (!this.fileList.length) {
              this.$message.warning('请上传附件')
              return
            }
            const params = {
              Loading: true,
              ...this.ruleForm,
              personnelId: this.personnelId,
              id: this.uploadData.businessDataId
            }
            if (this.addOrEditType === 'add') {
              saveContract(params).then(({ code, message }) => {
                this.$message.success('添加成功!')
                this.$refs.dialog.show = false
                this.fetchData()
              })
            } else {
              updateContract(params, this.editPostId).then(({ code, message }) => {
                this.$message.success('修改成功!')
                this.$refs.dialog.show = false
                this.fetchData()
              })
            }
          } else {
            return false
          }
        })
      })
    },
    deleteData(id) {
      this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteContract(id).then(res => {
          this.$message.success('删除成功!')
          this.fetchData()
        })
      }).catch(() => {})
    },
    updateData(type, row) {
      this.addOrEditType = type
      if (type === 'edit') {
        this.formLoading = true
        const { id, personnelId, contractNumber, type, contractPeriod, signingMode, renewalsNumber, signingDate, startDate, endDate, state, remark, stateName } = JSON.parse(JSON.stringify(row))
        this.uploadData.businessDataId = id
        this.ruleForm = {
          personnelId,
          contractNumber,
          type,
          contractPeriod,
          signingMode,
          renewalsNumber,
          signingDate,
          startDate,
          endDate,
          state,
          remark,
          stateName
        }
        this.getFileLoad(id).then(data => {
          this.formLoading = false
          this.$refs.dialog.show = true
          this.fileList = data
          this.fileList.map(item => {
            item.name = item.fileName
            item.url = item.fileUrl
            return item
          })
        })
        this.editPostId = row.id
        this.$refs.dialog.oTitle = '修改合同信息'
      } else {
        this.uploadData.businessDataId = getUuid()
        this.ruleForm = { ...this.deepRuleForm }
        this.fileList = []
        this.key += 1
        this.$refs.dialog.oTitle = '添加合同信息'
      }
      this.$refs.dialog.show = true
    },
    // 文件上传成功
    fileSuccess(response, file, fileList) {
      this.fileList = fileList
      this.uploadLoading.close()
      // this.$message.success('附件上传成功')
    }
  }
}
</script>

<style lang="less" scoped>
.contract-info {
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
