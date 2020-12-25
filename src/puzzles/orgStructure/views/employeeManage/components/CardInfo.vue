<template>
  <div class="card-info">
    <div v-if="!disabled">
      <el-button type="primary" @click="updateData('add')">添加</el-button>
    </div>
    <el-table ref="multipleTable" v-loading="loading" :data="tableData" row-key="id" border>
      <el-table-column type="index" width="48" label="序号" align="center" />
      <el-table-column prop="typeName" label="证书类别" align="center" />
      <el-table-column prop="number" label="证书编号" align="center" />
      <el-table-column prop="name1" label="名称" align="center" width="150" />
      <el-table-column prop="name2" label="专业" align="center" />
      <el-table-column prop="sealNumber" label="执业印章号" align="center" width="200" />
      <el-table-column prop="registEmployment" label="注册/聘用单位" align="center" />
      <el-table-column prop="unitName" label="发证机关" align="center" />
      <el-table-column prop="startDate" label="发证日期" align="center" sortable width="120" />
      <el-table-column prop="endDate" label="有效期" align="center" sortable width="120" />
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
    <drag-dialog ref="dialog" :title="title" width="50%">
      <el-form ref="ruleForm" :key="key" v-loading="dialogLoading" :rules="rules" :model="ruleForm" label-width="110px" class="ruleForm">
        <el-form-item label="证书类别" prop="type">
          <el-select v-model="ruleForm.type" clearable :disabled="disabled" placeholder="请选择证书类别" @change="ruleForm.name = ''">
            <el-option
              v-for="item in constant.personnelCertType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="证书编号" prop="number">
          <el-input v-model="ruleForm.number" clearable :disabled="disabled" placeholder="请输入证书编号" :maxlength="20" />
        </el-form-item>
        <el-form-item
          v-if="ruleForm.type === 'TitleCert' || ruleForm.type === 'JobCert' || ruleForm.type === 'SafetyCert' || ruleForm.type === 'OtherCert'"
          prop="name"
          label="证书名称"
          :rules="[
            { required: ruleForm.type === 'TitleCert' || ruleForm.type === 'JobCert' || ruleForm.type === 'SafetyCert' || ruleForm.type === 'OtherCert', message: '请输入证书名称', trigger: 'blur' },
            { min: 0, max: 50, message: '最大长度 50 个字符', trigger: 'blur'}
          ]"
        >
          <el-input v-model="ruleForm.name" clearable :disabled="disabled" placeholder="请输入证书名称" style="width: 100%" :maxlength="20" />
        </el-form-item>
        <el-form-item
          v-if="ruleForm.type === 'RegistrationCert'"
          prop="name"
          label="证书名称"
          :rules="[
            { required: ruleForm.type === 'RegistrationCert', message: '请选择证书名称', trigger: 'change' }
          ]"
        >
          <el-cascader
            v-model="ruleForm.name"
            clearable
            placeholder="请选择行业证书/注册类别/专业"
            :options="constant.qualifications"
            :props="{ expandTrigger: 'hover', value: 'code', label: 'name', children: 'childs' }"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item v-if="ruleForm.type === 'BuildingSpecialOperationCert'" prop="name" label="证书名称">
          <el-select v-model="ruleForm.name" clearable :disabled="disabled" placeholder="请选择操作类别">
            <el-option
              v-for="item in constant.OperatorType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.type === 'SpecialOperationCert'" prop="name" label="证书名称">
          <el-cascader
            v-model="ruleForm.name"
            clearable
            placeholder="请选择作业类别/准操项目"
            :options="constant.WorkTypeAndOperationProject"
            :props="{ expandTrigger: 'hover', value: 'code', label: 'name', children: 'childs' }"
          />
        </el-form-item>
        <el-form-item v-if="ruleForm.type === 'SpecialEquipmentCert'" prop="name" label="证书名称">
          <el-cascader
            v-model="ruleForm.name"
            placeholder="请选择作业类别+项目"
            clearable
            :options="constant.WorkTypeAndProject"
            :props="{ expandTrigger: 'hover', value: 'code', label: 'name', children: 'childs' }"
          />
        </el-form-item>
        <el-form-item label="发证机关" prop="unitName">
          <el-input v-model="ruleForm.unitName" clearable :disabled="disabled" placeholder="请输入发证机关" :maxlength="20" />
        </el-form-item>
        <el-form-item
          v-show="ruleForm.type === 'RegistrationCert'"
          label="执业印章号"
          prop="sealNumber"
          :rules="[
            { required: ruleForm.type === 'RegistrationCert', message: '请输入执业印章号', trigger: 'blur' },
            { min: 0, max: 20, message: '最大长度 20 个字符', trigger: 'blur'}
          ]"
        >
          <el-input v-model="ruleForm.sealNumber" clearable :disabled="disabled" placeholder="请输入执业印章号" :maxlength="20" />
        </el-form-item>
        <el-form-item
          v-show="ruleForm.type === 'RegistrationCert'"
          label="注册单位"
          prop="registerUnit"
          :rules="[
            { required: ruleForm.type === 'RegistrationCert', message: '请输入注册单位', trigger: 'blur' },
            { min: 0, max: 50, message: '最大长度 50 个字符', trigger: 'blur'}
          ]"
        >
          <el-input v-model="ruleForm.registerUnit" clearable :disabled="disabled" placeholder="请输入注册单位" :maxlength="50" />
        </el-form-item>
        <el-form-item label="发证日期" prop="startDate">
          <el-date-picker
            v-model="ruleForm.startDate"
            type="date"
            clearable
            placeholder="请选择发证日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item
          label="有效截止日期"
          prop="endDate"
          :rules="[
            { required: ruleForm.type !== 'JobCert' && ruleForm.type !== 'OtherCert', message: '请选择有效截止日期', trigger: 'change' }
          ]"
        >
          <el-date-picker
            v-model="ruleForm.endDate"
            :disabled="ruleForm.type === 'OtherCert'"
            type="date"
            clearable
            placeholder="请选择有效截止日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item
          v-show="ruleForm.type === 'TitleCert' || ruleForm.type === 'JobCert'"
          prop="level"
          label="证书等级"
          :rules="[
            { required: ruleForm.type === 'TitleCert', message: '请输入证书等级', trigger: 'blur' }
          ]"
        >
          <el-select v-model="ruleForm.level" clearable :disabled="disabled" placeholder="请选保证书等级">
            <el-option
              v-for="item in constant.grade"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-show="ruleForm.type === 'TitleCert' || ruleForm.type === 'JobCert'"
          prop="employUnit"
          label="聘用单位"
          :rules="[
            { required: ruleForm.type === 'TitleCert', message: '请输入聘用单位', trigger: 'blur' },
            { min: 0, max: 50, message: '最大长度 50 个字符', trigger: 'blur'}
          ]"
        >
          <el-input v-model="ruleForm.employUnit" clearable :disabled="ruleForm.type === 'JobCert'" placeholder="请输入聘用单位" :maxlength="50" />
        </el-form-item>
        <el-form-item label="年检频率" prop="annualSurvey">
          <el-select v-model="ruleForm.annualSurvey" :disabled="disabled" placeholder="请选择年检评率">
            <el-option
              v-for="item in constant.inspectionFrequency"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="年检月份"
          prop="annualSurveyMonth"
          :rules="[
            { required: ruleForm.annualSurvey !== 'Never', message: '请选择年检月份', trigger: 'change' }
          ]"
        >
          <el-select v-model="ruleForm.annualSurveyMonth" clearable :disabled="disabled" placeholder="请选择年检月份">
            <el-option
              v-for="item in monthOptions"
              :key="item.code"
              :disabled="ruleForm.annualSurvey === 'Never'"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="初领日期"
          prop="firstDate"
          :rules="[
            { required: ruleForm.type === 'BuildingSpecialOperationCert' || ruleForm.type === 'SpecialOperationCert', message: '请输入初领日期', trigger: 'blur' }
          ]"
        >
          <el-date-picker
            v-model="ruleForm.firstDate"
            clearable
            :disabled="ruleForm.type !== 'BuildingSpecialOperationCert' && ruleForm.type !== 'SpecialOperationCert'"
            type="date"
            placeholder="请输入初领日期"
            style="width: 100%"
          />
          <!--          <el-input v-model="ruleForm.firstDate" :disabled="ruleForm.type !== 'BuildingSpecialOperationCert' && ruleForm.type !== 'SpecialOperationCert'" placeholder="请输入初领日期" />-->
        </el-form-item>
        <el-form-item label="保管类型" prop="saveType">
          <el-select v-model="ruleForm.saveType" clearable :disabled="disabled" placeholder="请选保管类型">
            <el-option
              v-for="item in constant.saveType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="保管人" prop="saveUserId">
          <el-select v-model="ruleForm.saveUserId" filterable clearable :disabled="disabled" placeholder="请选择保管人">
            <el-option
              v-for="item in personnelListData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <div style="width: 100%" />
        <el-form-item ref="fileForm">
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
            :on-preview="previewFile"
          >
            <el-button type="primary" :disabled="disabled">点击上传</el-button>
            <div slot="tip" class="tip-color">单个附件请不超过50M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" style="width: 100%" prop="remark">
          <el-input v-model="ruleForm.remark" type="textarea" show-word-limit :rows="3" clearable :disabled="disabled" placeholder="请输入备注" :maxlength="255" />
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
import { mapGetters } from 'vuex'
import { getListByUserId, saveCertificate, updateCertificate, deleteCertificate } from '@core/api/certificate'
import { getCustodian } from '@core/api/personnel'
import table from '@core/mixins/table'
import upload from '@core/mixins/upload'
import { queryParent, getUuid, exportExcel } from '@core/utils'
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
    return {
      title: '',
      monthOptions: [{
        code: '01',
        name: '一月份'
      }, {
        code: '02',
        name: '二月份'
      }, {
        code: '03',
        name: '三月份'
      }, {
        code: '04',
        name: '四月份'
      }, {
        code: '05',
        name: '五月份'
      }, {
        code: '06',
        name: '六月份'
      }, {
        code: '07',
        name: '七月份'
      }, {
        code: '08',
        name: '八月份'
      }, {
        code: '09',
        name: '九月份'
      }, {
        code: '10',
        name: '十月份'
      }, {
        code: '11',
        name: '十一月份'
      }, {
        code: '12',
        name: '十二月份'
      }],
      tableData: [],
      personnelListData: [],
      loading: true,
      fileListLoading: false,
      dialogLoading: true,
      ruleForm: {
        id: '',
        type: '',
        number: '',
        name: '',
        unitName: '',
        sealNumber: '',
        registerUnit: '',
        startDate: '',
        endDate: '',
        level: '',
        employUnit: '',
        annualSurvey: '',
        annualSurveyMonth: '',
        firstDate: '',
        saveType: 'copy',
        saveUserId: '',
        userId: '',
        remark: ''
      },
      rules: {
        type: [{ required: true, message: '请选择证书类别', trigger: 'change' }],
        number: [{ required: true, message: '请输入证书编号', trigger: 'blur' }, validateLength(0, 20)],
        unitName: [{ required: true, message: '请输入发证机关', trigger: 'blur' }, validateLength(0, 50)],
        startDate: [{ required: true, message: '请选择发证日期', trigger: 'change' }],
        annualSurvey: [{ required: true, message: '请选择年检频率', trigger: 'change' }],
        saveType: [{ required: true, message: '请选保管类型', trigger: 'change' }],
        saveUserId: [{ required: true, message: '请选择保管人', trigger: 'change' }],
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
    this.$store.dispatch('getConstant', ['personnelCertType', 'PersonnelCertificate', 'orgCertType', 'inspectionFrequency', 'OperatorType', 'WorkTypeAndOperationProject', 'WorkTypeAndProject', 'specialty', 'qualifications', 'grade', 'saveType']).then(() => {
      this.getPersonnelListData()
      if (this.personnelId) {
        this.fetchData()
      }
    })
    this.uploadData.typeCode = 'cardInfo'
  },
  methods: {
    // 查看附件
    lookFile(row) {
      const { id } = row
      this.fileListLoading = true
      this.getFileLoad(id, 'cardInfo').then(data => {
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
      getListByUserId(this.personnelId).then(({ data }) => {
        this.tableData = data
        this.loading = false
        this.tableData.map(item => {
          item.typeName = this.constant.personnelCertType.filter(v => v.code === item.type)[0].name
          if (item.type === 'RegistrationCert') {
            item['registEmployment'] = item.registerUnit
            // 注册证书==注册类别 + 专业   当类别为“注册证书”时，行业证书+注册类别+专业；数据字典；其中有的注册类别没有专业  没有专业的时候数组只有2个元素
            if (item.name.length === 3) {
              const names = queryParent(this.constant.qualifications, item.name.split(',')[2], 'code', 'childs', 'name')
              item.name1 = names[1]
              item.name2 = names[2]
            } else {
              const names = queryParent(this.constant.qualifications, item.name.split(',')[1], 'code', 'childs', 'name')
              item.name1 = names[0]
              item.name2 = names[1]
            }
            item.name = item.name.split(',')
          } else if (item.type === 'BuildingSpecialOperationCert') {
            // 建筑施工特种作业操作资格证==操作类别
            item.name1 = this.constant.OperatorType.filter(v => v.code === item.name)[0].name
            // const names = queryParent(this.constant.qualifications, item.name.split(',')[0], 'code', 'childs', 'name')
            // item.name1 = names[0]
          } else if (item.type === 'SpecialOperationCert') {
            // 特种作业操作证==操作类别 + 准操项目
            const names = queryParent(this.constant.WorkTypeAndOperationProject, item.name.split(',')[1], 'code', 'childs', 'name')
            item.name1 = names[0]
            item.name2 = names[1]
            item.name = item.name.split(',')
          } else if (item.type === 'SpecialEquipmentCert') {
            // 特种设备作业人员证==作业类别 + 项目
            const names = queryParent(this.constant.WorkTypeAndProject, item.name.split(',')[1], 'code', 'childs', 'name')
            item.name1 = names[0]
            item.name2 = names[1]
            item.name = item.name.split(',')
          } else if (item.type === 'TitleCert') {
            item['registEmployment'] = item.employUnit
          } else {
            item.name1 = item.name
          }
          return item
        })
      })
    },
    getPersonnelListData() {
      getCustodian().then(({ data }) => {
        this.personnelListData = data
      })
    },
    saveOrUpdateData() {
      return new Promise((resolve, inject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (!this.fileList.length) {
              this.$message.warning('请上传附件')
              return
            }
            const params = {
              Loading: true,
              ...this.ruleForm,
              userId: this.personnelId,
              id: this.uploadData.businessDataId
            }
            // 根据证书类别拼接name属性
            if (params.type === 'RegistrationCert' || params.type === 'BuildingSpecialOperationCert' || params.type === 'SpecialOperationCert' || params.type === 'SpecialEquipmentCert') {
              params.name = params.name.toString()
            }
            if (this.addOrEditType === 'add') {
              saveCertificate(params).then(({ code, message }) => {
                this.$message.success('添加成功!')
                this.$refs.dialog.show = false
                this.fetchData()
              })
            } else {
              updateCertificate(params).then(({ code, message }) => {
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
        deleteCertificate(id).then(res => {
          this.$message.success('删除成功!')
          this.fetchData()
        })
      }).catch(() => {})
    },
    updateData(type, row) {
      this.addOrEditType = type
      if (type === 'edit') {
        this.title = '修改持证信息'
        this.dialogLoading = true
        const { id, type, number, name, unitName, sealNumber, registerUnit, startDate, endDate, level, employUnit, annualSurvey, annualSurveyMonth, firstDate, saveType, saveUserId, userId, remark } = JSON.parse(JSON.stringify(row))
        this.uploadData.businessDataId = id
        this.ruleForm = {
          id,
          type,
          number,
          name,
          unitName,
          sealNumber,
          registerUnit,
          startDate,
          endDate,
          level,
          employUnit,
          annualSurvey,
          annualSurveyMonth,
          firstDate,
          saveType,
          saveUserId,
          userId,
          remark
        }
        this.$refs.dialog.show = true
        this.getFileLoad(id).then(data => {
          this.dialogLoading = false
          this.fileList = data
          this.fileList.map(item => {
            item.name = item.fileName
            item.url = item.fileUrl
            return item
          })
        })
        this.editPostId = row.id
      } else {
        this.title = '添加持证信息'
        this.dialogLoading = false
        this.uploadData.businessDataId = getUuid()
        this.ruleForm = { ...this.deepRuleForm }
        this.fileList = []
        this.$refs.dialog.show = true
        this.key += 1
      }
    },
    // 上传成功
    fileSuccess(response, file, fileList) {
      this.fileList = fileList
      this.uploadLoading.close()
    }

  }
}
</script>

<style lang="less" scoped>
.card-info {
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
