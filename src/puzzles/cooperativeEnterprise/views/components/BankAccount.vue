<template>
  <div class="bank-account">
    <!-- <div class="title">{{ orgName }}</div> -->
    <div v-if="!disabled">
      <el-button type="primary" @click="updateData('add')"><i class="iconfont icon-xinzeng1-copy" />添加</el-button>
      <el-button-group style="margin-left:5px">
        <el-button type="primary" @click="updateData('stop','')"><i class="iconfont icon-tingyong-copy" /> 停用</el-button>
        <el-button type="primary" @click="returnBank"><i class="iconfont icon-huifu" />恢复</el-button>
      </el-button-group>
      <el-button type="primary" style="margin-left:5px" @click="BankExport"><i class="iconfont icon-daochu-copy" />  导出</el-button>

    </div>
    <el-table ref="tableRef" v-loading="loading" :header-cell-class-name="cellClass" :data="tableData" row-key="id" border @selection-change="handleSelectionChange" @sort-change="sortTable">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" width="48" label="序号" align="center" />
      <el-table-column prop="bankAccountName" label="账户名称" align="left" header-align="center" width="320" :show-overflow-tooltip="true" />
      <el-table-column prop="bankAccount" label="银行账号" align="center" width="160" />
      <el-table-column prop="bankName" label="开户行" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="bankAddress" label="开户行地址" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="accountType" label="账户类型" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.accountType == 'basicAccount'?'基本账户':(scope.row.accountType=='generalAccount'?'一般账户':(scope.row.accountType=='specialAccount'?'专用账户':'临时账户')) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开户许可证" align="center" width="100">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="400"
            trigger="click"
          >
            <el-table :data="idCardData" border>
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
            <el-button v-if="scope.row.hasLicence" slot="reference" type="text" @click="handleClick(scope.row,'idCard')">查看</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="账号变更说明" align="center" width="100">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="400"
            trigger="click"
          >
            <el-table :data="degreeCardData" border>
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
            <el-button v-if="scope.row.hasAccountChange" slot="reference" type="text" @click="handleClick(scope.row,'degreeCard')">查看</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.state==='0' ? '正常' : '停用' }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="!disabled" prop="name" label="操作" align="center" width="170">
        <template slot-scope="scope">
          <el-button @click="updateData('edit', scope.row)">修改</el-button>
          <el-button type="danger" @click="deleteData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <drag-dialog ref="dialog" :title="title" width="50%" top="50px">
      <el-form ref="ruleForm" :key="key" v-loading="dialogLoading" :rules="rules" :model="ruleForm" label-width="110px" class="ruleForm">
        <el-form-item label="账户名称" prop="bankAccountName">
          <el-input v-model.trim="ruleForm.bankAccountName" maxlength="50" show-word-limit clearable :disabled="disableds" placeholder="请输入账户名称" />
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input v-model.trim="ruleForm.bankAccount" maxlength="20" show-word-limit clearable :disabled="disableds" placeholder="请输入银行账号" />
        </el-form-item>
        <el-form-item label="开户行" prop="bankName">
          <el-input v-model.trim="ruleForm.bankName" clearable maxlength="50" show-word-limit :disabled="disableds" placeholder="请输入开户行" />
        </el-form-item>
        <el-form-item label="开户行地址" prop="bankAddress">
          <el-input v-model.trim="ruleForm.bankAddress" maxlength="50" show-word-limit clearable :disabled="disableds" placeholder="请输入开户行地址" />
        </el-form-item>
        <el-form-item label="账户类型" prop="accountType">
          <el-select v-model="ruleForm.accountType" :disabled="disableds" clearable placeholder="请选择账户类型">
            <el-option v-for="item in constant.bankAccountType" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="showohide" label="用户许可证" class="full-width">
          <el-upload
            :file-list="idCardList"
            :action="actionUrl"
            :on-success="fileIdCardSuccess"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-remove="handleRemoveIdCard"
            :disabled="disabled"
            :before-upload="beforeUpload50M"
            :on-preview="previewFile"
          >
            <el-button type="primary" :disabled="disabled" @click="uploadbefore('idCard')">点击上传</el-button>
            <div slot="tip" class="tip-color">单个附件请不超过50M</div>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="accountchange" label="账户变更说明" class="full-width">
          <el-upload
            :file-list="degreeList"
            :action="actionUrl"
            :on-success="fileDegreeSuccess"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-remove="handleRemoveDegree"
            :disabled="disabled"
            :before-upload="beforeUpload50M"
          >
            <el-button type="primary" :disabled="disabled" @click="uploadbefore('degreeCard')">点击上传</el-button>
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
import { mapGetters } from 'vuex'
import { getUuid } from '@core/utils/index'
import { getBankList, deleteBank, returnBank, saveBank, updateBank, stopBank, seeBank } from '@core/api/cooperativeEnterprise/bankaccount'
import { provideunitbank, listByOperateinfoId } from '@core/api/cooperativeEnterprise/provideunitbank'
import { exportBank } from '@core/api/cooperativeEnterprise/export'
import { exportExcel } from '@core/utils'
import { validateNumber } from '@core/utils/validate'
import upload from '@core/mixins/upload'
import { deleteFileCoop, exportFile } from '@core/api/accessoryFile'
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
    var validNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('银行账号不能为空'))
      } else {
        if (!validateNumber(value)) {
          callback(new Error('请输入正确的银行账号，只能是数字'))
        } else {
          callback()
        }
      }
    }
    return {
      loading: false,
      showohide: false,
      disableds: false,
      accountchange: false,
      ruleForm: {
        bankAccountName: '',
        bankAccount: '',
        bankName: '',
        bankAddress: '',
        accountType: ''
      },
      rules: {
        bankAccountName: [{ required: true, message: '请输入账号名称' }],
        bankAccount: [{ required: true, validator: validNumber, trigger: 'blur' }],
        bankName: [{ required: true, message: '请输入开户行名称' }],
        accountType: [{ required: true, message: '请选择账户类型' }]
      },
      tableData: [],
      addOrEditType: '',
      editId: '',
      title: '',
      editBankId: '',
      idCardList: [],
      degreeList: [],
      isExistId: this.$route.query.isExistId,
      dialogLoading: false,
      isDeactivate: '0', // / 0为正常 1为停用
      degreeCardData: [],
      idCardData: []
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
    },
    'ruleForm.accountType'(v) {
      if (v !== 'basicAccount') {
        this.showohide = false
      } else {
        if (this.title === '停用银行账号') {
          this.showohide = false
        } else {
          this.showohide = true
        }
      }
    }
  },
  created() {
    this.actionUrl = this.actionUrl.replace('platform', 'cooperativeunit')
    if (this.isExistId) {
      this.fetchData()
    }
    this.$store.dispatch('getConstant', ['orgBusinessType', 'orgQualifications', 'inspectionFrequency', 'businessScope', 'orgCertType', 'bankAccountType'])
  },
  methods: {
    cellClass(row) {
      if (row.columnIndex === 0) {
        return 'disabledCheck'
      }
    },
    fetchFileList(id, type) {
      this.getFileLoad(id, type).then(data => {
        switch (type) {
          case 'idCard':
            this.idCardList = data
            this.idCardList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            break
          case 'degreeCard':
            this.degreeList = data
            this.degreeList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            break
          default:
            break
        }
        this.dialogLoading = false
      })
    },
    fileIdCardSuccess(response, file, fileList) {
      this.idCardList = fileList
      this.uploadLoading.close()
    },
    fileDegreeSuccess(response, file, fileList) {
      this.degreeList = fileList
      this.uploadLoading.close()
    },
    uploadbefore(type) {
      switch (type) {
        case 'idCard':
          this.uploadData.typeCode = 'idCard'
          break
        case 'degreeCard':
          this.uploadData.typeCode = 'degreeCard'
          break
        default:
          break
      }
    },
    BankExport() {
      exportBank(this.enterpriseId).then(res => {
        exportExcel(res, `${this.orgName}_银行信息.xls`)
      })
    },
    returnBank() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        if (this.multipleSelection.length !== 1) {
          this.$message.warning('请选择一条银行信息')
          return
        }
        this.multipleSelection.forEach(item => {
          const state = item.state
          if (state === '1') {
            this.$confirm('此操作将恢复选中银行信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              returnBank(this.multipleSelection[0]['id']).then(res => {
                this.$message.success('恢复成功!')
                this.fetchData()
              })
            }).catch(() => {
              this.$message.info('已取消恢复')
            })
          } else {
            this.$message.warning('请选择状态停用的银行')
          }
        })
      } else {
        this.$message.warning('请选择银行信息')
      }
    },
    getDetails() {
      seeBank(this.editBankId).then(({ data }) => {
        this.ruleForm = data
      })
    },
    updateData(type, row) {
      this.addOrEditType = type
      if (type === 'edit') {
        this.$refs.dialog.show = true
        this.title = '修改银行账号'
        this.disableds = false
        this.accountchange = true
        this.dialogLoading = true
        this.editBankId = row.id
        this.uploadData.businessDataId = row.id
        this.fetchFileList(row.id, 'idCard')
        this.fetchFileList(row.id, 'degreeCard')
        this.getDetails()
        this.isDeactivate = row.state
      } else if (type === 'add') {
        this.$refs.dialog.show = true
        this.showohide = true
        this.accountchange = false
        this.disableds = false
        this.dialogLoading = false
        this.title = '添加银行账号'
        this.idCardList = []
        this.ruleForm = { ...this.deepRuleForm }
        this.uploadData.businessDataId = getUuid()
      } else {
        if (this.multipleSelection && this.multipleSelection.length > 0) {
          if (this.multipleSelection.length !== 1) {
            this.$message.warning('请选择一条银行信息')
            return
          }
          this.editBankId = this.multipleSelection[0].id
          this.multipleSelection.forEach(item => {
            const type = item.state
            if (type === '0') {
              this.$refs.dialog.show = true
              this.getDetails()
              this.degreeList = []
              this.disableds = true
              this.accountchange = true
              this.showohide = false
              this.title = '停用银行账号'
              this.fetchFileList(item.id, 'degreeCard')
            } else {
              this.$message.warning('请选择状态正常的银行信息')
            }
          })
        } else {
          this.$message.warning('请选择一条银行信息')
        }
      }
      this.key += 1
      this.ruleForm.accountType = 'basicAccount'
    },
    fetchData(sortData) {
      var word = ''
      var ascendName = ''
      if (sortData === undefined) {
        word = 'createDate'
        ascendName = true
      } else {
        const { propertyName, ascending } = sortData
        word = propertyName
        ascendName = ascending
      }
      if (this.serviceId) {
        this.loading = true
        getBankList(this.serviceId, word, ascendName).then(({ data }) => {
          this.loading = false
          this.tableData = data || []
        })
      } else if (this.updateId) {
        this.loading = true
        listByOperateinfoId(this.updateId, word, ascendName).then(({ data }) => {
          this.loading = false
          this.tableData = data || []
        })
      } else if (this.isExistId) {
        this.loading = true
        getBankList(this.isExistId, word, ascendName).then(({ data }) => {
          this.loading = false
          this.tableData = data || []
        })
      } else {
        this.loading = true
        getBankList(this.enterpriseId, word, ascendName).then(({ data }) => {
          this.loading = false
          this.tableData = data || []
        })
      }
    },
    deleteData(id) {
      this.$confirm('确认要删除选中的银行账号？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBank(id).then(res => {
          this.$message.success('删除成功!')
          this.fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    saveOrUpdateData() {
      if (this.handleId) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            var params = {
              Loading: true,
              ...this.ruleForm,
              id: getUuid(),
              operateinfoId: this.handleId
            }
            if (this.addOrEditType === 'add') {
              provideunitbank(params).then(res => {
                this.$refs.dialog.show = false
                this.fetchData()
                this.$message.success('新增银行账号成功')
              })
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
              id: this.uploadData.businessDataId,
              operateinfoId: this.serviceId

            }
            if (this.addOrEditType === 'add') {
              provideunitbank(params).then(res => {
                this.$refs.dialog.show = false
                this.fetchData()
                this.$message.success('新增银行账号成功')
              })
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
              id: this.uploadData.businessDataId,
              state: 0,
              unitId: this.enterpriseId
            }
            if (this.addOrEditType === 'add') {
              saveBank(params).then(res => {
                this.$refs.dialog.show = false
                this.fetchData()
                this.$message.success('新增银行账号成功')
              })
            } else if (this.addOrEditType === 'edit') {
              delete params.id
              params = {
                ...params,
                id: this.editBankId
              }
              params.state = this.isDeactivate
              updateBank(params).then(res => {
                this.$refs.dialog.show = false
                this.fetchData()
                this.$message.success('修改银行账号成功')
              })
            } else {
              stopBank(this.multipleSelection[0]['id']).then(res => {
                this.$refs.dialog.show = false
                this.$message.success('停用银行账号成功')
                this.fetchData()
              })
            }
          } else {
            return
          }
        })
      }
    },
    // 查看附件
    handleClick(row, type) {
      const { id } = row
      this.getFileLoad(id, type).then(data => {
        if (type === 'degreeCard') {
          this.degreeCardData = data
        } else {
          this.idCardData = data
        }
      })
    },
    // 下载附件
    downFile(row) {
      exportFile(row.id).then(res => {
        exportExcel(res, row.fileName)
      })
    },
    handleRemoveIdCard(file, fileList) {
      var id = ''
      if (file.response) {
        id = file.response.data[0].id
      } else {
        id = file.id
      }
      deleteFileCoop(id).then(res => {
        this.idCardList = fileList
      })
    },
    handleRemoveDegree(file, fileList) {
      var id = ''
      if (file.response) {
        id = file.response.data[0].id
      } else {
        id = file.id
      }
      deleteFileCoop(id).then(res => {
        this.degreeList = fileList
      })
    }
  }
}
</script>

<style lang="less" scoped>
	.bank-account {
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

	}
</style>
<style lang="less">
	.bank-account {
   /* 去掉全选按钮 */
    .el-table .disabledCheck .cell .el-checkbox__inner{
        display: none !important;
    }
  }

</style>
