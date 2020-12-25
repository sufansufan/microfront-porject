<template>
  <div class="bank-account">
    <div class="title">{{ orgName }}</div>
    <div v-if="!disabled">
      <el-button type="primary" style="margin-bottom: 10px" @click="updateData('add')"><i class="iconfont icon-xinzeng1-copy" />添加</el-button>
    </div>
    <el-table ref="tableRef" v-loading="loading" :data="tableData" row-key="id" border :default-sort="{prop: 'state', order: 'descending'}" @selection-change="handleSelectionChange" @sort-change="sortTable">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" width="48" label="序号" align="center" />
      <el-table-column prop="bankAccountName" label="账户名称" align="left" header-align="center" />
      <el-table-column prop="bankAccount" label="银行账号" align="center" width="160" />
      <el-table-column prop="bankName" label="开户行" align="center" width="180" :show-overflow-tooltip="true" />
      <el-table-column prop="bankAddress" label="开户行地址" align="center" width="320" :show-overflow-tooltip="true" />
      <el-table-column prop="accountType" label="账户类型" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.accountType == 'basicAccount'?'基本账户':(scope.row.accountType=='generalAccount'?'一般账户':(scope.row.accountType=='specialAccount'?'专用账户':'临时账户')) }}</span>

        </template>
      </el-table-column>
      <el-table-column label="开户许可证" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="300"
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
            <el-button slot="reference" type="text" size="small" @click="handleClick(scope.row,'idCard')">{{
              scope.row.hasLicence ? '查看':'' }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="账号变更说明" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="300"
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
            <el-button slot="reference" type="text" size="small" @click="handleClick(scope.row,'degreeCard')">{{
              scope.row.hasAccountChange ? '查看':'' }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" sortable="custom" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.state==='0' ? '正常' : '停用' }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="!disabled" prop="name" label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button @click="updateData('edit', scope.row)">修改</el-button>
          <el-button type="danger" @click="deleteData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <drag-dialog ref="dialog" :title="title" width="50%" top="50px">
      <el-form ref="ruleForm" :key="key" :rules="rules" :model="ruleForm" label-width="110px" class="ruleForm">
        <el-form-item label="账户名称" prop="bankAccountName">
          <el-input v-model.trim="ruleForm.bankAccountName" maxlength="50" show-word-limit clearable :disabled="disableds" placeholder="请输入账户名称" />
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input v-model.trim="ruleForm.bankAccount" clearable maxlength="20" show-word-limit :disabled="disableds" placeholder="请输入银行账号" />
        </el-form-item>
        <el-form-item label="开户行" prop="bankName">
          <el-input v-model.trim="ruleForm.bankName" clearable maxlength="50" show-word-limit :disabled="disableds" placeholder="请输入开户行" />
        </el-form-item>
        <el-form-item label="开户行地址" prop="bankAddress">
          <el-input v-model.trim="ruleForm.bankAddress" clearable maxlength="50" show-word-limit :disabled="disableds" placeholder="请输入开户行地址" />
        </el-form-item>
        <el-form-item label="账户类型" prop="accountType">
          <el-select v-model="ruleForm.accountType" clearable :disabled="disableds" placeholder="请选择账户类型">
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
            :on-remove="handleRemove"
            :disabled="disabled"
            :before-upload="beforeUpload50M"
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
            :on-remove="handleRemove"
            :disabled="disabled"
            :before-upload="beforeUpload50M"
            :on-preview="previewFile"
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
import { provideunitbank, listByOperateinfoId, getProvide, editProvide, deleteProvide, saveList } from '@core/api/cooperativeEnterprise/provideunitbank'
import { validateNumber } from '@core/utils/validate'
import upload from '@core/mixins/upload'
import { exportExcel } from '@core/utils'
import { fileLoadNot, copyFile, exportFile } from '@core/api/accessoryFile'
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
      showohide: true,
      disableds: false,
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
        accountType: [{ required: true, message: '请选择账户类型' }]
      },
      tableData: [],
      addOrEditType: '',
      editId: '',
      title: '',
      editBankId: '',
      newsId: this.$route.query.newsId,
      serviceId: this.$route.query.serviceId,
      noticeId: this.$route.query.noticeId,
      accountchange: false,
      idCardList: [],
      degreeList: [],
      loading: false,
      degreeCardData: [],
      idCardData: []
    }
  },

  computed: {
    ...mapGetters(['constant'])
  },
  watch: {

    'ruleForm.accountType'(v) {
      if (v !== 'basicAccount') {
        this.showohide = false
      } else {
        this.showohide = true
      }
    }
  },
  created() {
    this.actionUrl = this.actionUrl.replace('platform', 'cooperativeunit')
    this.$store.dispatch('getConstant', ['orgBusinessType', 'orgQualifications', 'inspectionFrequency', 'businessScope', 'orgCertType', 'bankAccountType'])
    this.fetchData('title')
  },
  methods: {
    getDetails() {
      getProvide(this.editBankId).then(({ data }) => {
        this.ruleForm = data
        const { id } = this.ruleForm
        this.uploadData.businessDataId = id
        this.fetchFileList(id, 'idCard')
        this.fetchFileList(id, 'degreeCard')
      })
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
    updateData(type, row) {
      this.addOrEditType = type
      if (type === 'edit') {
        this.title = '修改银行账号'
        this.editBankId = row.id
        this.getDetails()
        this.accountchange = true
      } else if (type === 'add') {
        this.title = '添加银行账号'
        this.accountchange = false
        this.uploadData.businessDataId = getUuid()
        this.ruleForm.accountType = 'basicAccount'
        this.ruleForm = { ...this.deepRuleForm }
        this.idCardList = []
        this.degreeList = []
      }
      this.key += 1
      this.$refs.dialog.show = true
      this.ruleForm.accountType = 'basicAccount'
    },
    fetchData(sortData) {
      if (!sortData) return
      var word = ''
      var flag = ''
      if (sortData === 'title') {
        word = 'createDate'
        flag = true
      } else {
        const { propertyName, ascending } = sortData
        word = propertyName
        flag = ascending
      }
      this.loading = true
      if (this.newsId || this.noticeId) {
        listByOperateinfoId(this.newsId || this.noticeId, word, flag).then(({ data }) => {
          this.loading = false
          if (data.length !== 0 && (this.$route.query.title === '更新信息' || this.$route.query.title === '完善信息')) {
            this.reconstruction(data)
          } else {
            this.tableData = data || []
          }
        })
      } else if (this.serviceId) {
        listByOperateinfoId(this.serviceId, word, flag).then(({
          data
        }) => {
          this.loading = false
          if (data.length !== 0 && this.$route.query.title === '更新信息') {
            this.reconstruction(data)
          } else {
            this.tableData = data || []
          }
        })
      } else {
        listByOperateinfoId(this.$route.query.operaId, word, flag).then(({
          data
        }) => {
          this.loading = false
          this.tableData = data || []
        })
      }
    },
    updateFetchData(sortData) {
      var word = ''
      var flag = ''
      if (sortData === undefined) {
        word = 'createDate'
        flag = true
      } else {
        const { propertyName, ascending } = sortData
        word = propertyName
        flag = ascending
      }
      this.loading = true
      var id = ''
      if (this.$route.query.title === '更新信息') {
        id = this.$route.query.operaId
      } else if (this.$route.query.title === '完善信息') {
        id = this.serviceId || this.newsId
      }
      listByOperateinfoId(id, word, flag).then(({ data }) => {
        this.loading = false
        this.tableData = data || []
      })
    },
    deleteData(id) {
      this.$confirm('确认要删除选中的银行账号？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProvide(id).then(res => {
          this.$message.success('删除成功!')
          this.updateFetchData()
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    saveOrUpdateData() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.serviceId) {
            var params = {
              Loading: true,
              ...this.ruleForm,
              id: this.uploadData.businessDataId,
              operateinfoId: this.serviceId
            }
            if (this.addOrEditType === 'add') {
              provideunitbank(params).then(res => {
                this.$refs.dialog.show = false
                this.updateFetchData()
                this.$message.success('新增银行账号成功')
              })
            } else if (this.addOrEditType === 'edit') {
              params = {
                ...params,
                id: this.editBankId
              }
              editProvide(params).then(res => {
                this.$refs.dialog.show = false
                this.updateFetchData()
                this.$message.success('修改银行账号成功')
              })
            }
          } else if (this.newsId) {
            var param = {
              Loading: true,
              ...this.ruleForm,
              id: this.uploadData.businessDataId,
              operateinfoId: this.newsId
            }
            if (this.$route.query.title === '更新信息') {
              param.operateinfoId = this.$route.query.operaId
            }
            if (this.addOrEditType === 'add') {
              provideunitbank(param).then(res => {
                this.$refs.dialog.show = false
                this.updateFetchData()
                this.$message.success('新增银行账号成功')
              })
            } else if (this.addOrEditType === 'edit') {
              params = {
                ...param,
                id: this.editBankId
              }
              editProvide(params).then(res => {
                this.$refs.dialog.show = false
                this.updateFetchData()
                this.$message.success('修改银行账号成功')
              })
            }
          } else {
            var paramse = {
              Loading: true,
              ...this.ruleForm,
              id: this.uploadData.businessDataId,
              operateinfoId: this.$route.query.operaId
            }
            if (this.addOrEditType === 'add') {
              provideunitbank(paramse).then(res => {
                this.$refs.dialog.show = false
                this.fetchData('title')
                this.$message.success('新增银行账号成功')
              })
            } else if (this.addOrEditType === 'edit') {
              params = {
                ...paramse,
                id: this.editBankId
              }
              editProvide(params).then(res => {
                this.$refs.dialog.show = false
                this.fetchData('title')
                this.$message.success('修改银行账号成功')
              })
            }
          }
        } else {
          return
        }
      })
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
    // 保存当前银行列表到当前操作记录id中
    async reconstruction(data) {
      var fileFlag = true
      var id = ''
      if (this.$route.query.title === '完善信息' && this.newsId) {
        id = this.serviceId
      } else if (this.$route.query.operaId) {
        id = this.$route.query.operaId
      } else {
        id = this.serviceId
      }
      var dataList = []
      var fileList = []
      await data.forEach(async(item) => {
        const businessId = getUuid()
        const { accountType, bankAccount, bankAccountName, bankAddress, bankName } = item
        const params = {
          accountType,
          bankAccount,
          bankAccountName,
          bankAddress,
          bankName,
          operateinfoId: id,
          id: businessId
        }
        dataList.push(params)
        await fileLoadNot(item.id).then(({ data }) => {
          data.map(e => {
            e.businessDataId = businessId
            delete e.id
            fileList.push(e)
            return e
          })
          if (fileList.length === 0) {
            fileFlag = false
          }
        })
      })
      const t = setInterval(() => {
        if (fileList.length !== 0 && fileFlag) {
          copyFile(fileList).then(({ data }) => {
            this.idCardList = data
            if (data) {
              this.idCardList.map(item => {
                item.name = item.fileName
                item.url = item.fileUrl
                return item
              })
            }
            saveList(dataList).then(({ data }) => {
              this.updateFetchData()
            })
          })
          clearInterval(t)
        } else {
          saveList(dataList).then(({ data }) => {
            this.updateFetchData()
          })
          clearInterval(t)
        }
      }, 10)
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
