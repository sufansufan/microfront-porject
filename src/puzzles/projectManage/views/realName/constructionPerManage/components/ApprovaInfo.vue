<template>
  <div class="approval-info">
    <div class="details-title">
      <div>
        <el-button v-if="isDetails" class="back-btn" @click="onCancle"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      </div>
      <jdy-title-name :title="getTitle" />
      <div />
    </div>
    <el-form ref="ruleForm" v-loading="loading" :model="ruleForm" :rules="rules" label-width="130px" class="ruleForm">
      <div class="companyType">
        <div>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" :maxlength="20" clearable :disabled="isDetails" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="ruleForm.gender" clearable :disabled="isDetails" placeholder="请选择性别">
              <el-option
                v-for="item in constant.gender"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="籍贯" prop="nativePlace">
            <el-cascader
              v-model="ruleForm.nativePlace"
              placeholder="请选择籍贯"
              clearable
              :disabled="isDetails"
              :options="constant.nativePlace"
              :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children' }"
            />
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="ruleForm.birthday"
              clearable
              :disabled="isDetails"
              type="date"
              placeholder="请选择出生日期"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="手机" prop="telephone">
            <el-input v-model="ruleForm.telephone" :maxlength="11" clearable :disabled="isDetails" placeholder="请输入手机" />
          </el-form-item>
          <el-form-item label="民族" prop="nation">
            <el-select v-model="ruleForm.nation" clearable :disabled="isDetails" placeholder="请选择民族">
              <el-option
                v-for="item in constant.nation"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="upload-frame">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            :action="actionUrl"
            :show-file-list="false"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload2M"
            :disabled="isDetails"
          >
            <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar" @click="uploadbefore('photo')">
            <i v-else class="el-icon-plus avatar-uploader-icon" @click="uploadbefore('photo')" />
            <div slot="tip" class="tip-color">请上传大小在20KB~750KB范围内的JPG格式照片</div>
          </el-upload>
        </div>
      </div>

      <el-form-item label="文化程度" prop="education">
        <el-select v-model="ruleForm.education" clearable :disabled="isDetails" placeholder="请选择文化程度">
          <el-option
            v-for="item in constant.pmEducation "
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="政治面貌" prop="politicalStatus">
        <el-select v-model="ruleForm.politicalStatus" clearable :disabled="isDetails" placeholder="请选择政治面貌">
          <el-option
            v-for="item in constant.pmPoliticalStatus"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="参加工作日期" prop="workDate">
        <el-date-picker
          v-model="ruleForm.workDate"
          clearable
          :disabled="isDetails"
          type="date"
          placeholder="请选择参加工作日期"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item label="家庭住址" prop="homeAddress" class="two-width">
        <el-input v-model="ruleForm.homeAddress" :maxlength="50" clearable :disabled="isDetails" placeholder="请输入家庭住址" />
      </el-form-item>

      <el-form-item label="银行卡号" prop="bankNumber">
        <el-input v-model="ruleForm.bankNumber" :maxlength="19" clearable :disabled="isDetails" placeholder="请输入银行卡号" />
      </el-form-item>
      <el-form-item label="开户行" prop="accountBank">
        <el-input v-model="ruleForm.accountBank" :maxlength="20" clearable :disabled="isDetails" placeholder="请输入开户行" />
      </el-form-item>
      <el-form-item label="开户行地址" prop="bankAddress" class="two-width">
        <el-input v-model="ruleForm.bankAddress" :maxlength="50" clearable :disabled="isDetails" placeholder="请输入开户行地址" />
      </el-form-item>
      <el-form-item label="身份证" class="full-width">
        <el-upload
          :file-list="workerCardList"
          :action="actionUrl"
          :on-success="fileIdCardSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemove"
          :disabled="isDetails"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="isDetails" @click="uploadbefore('workerCard')">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="施工队/班组" prop="constructionTeamId">
        <jdy-select
          v-model="ruleForm.constructionTeamId"
          :is-cascader="true"
          :is-model-name="true"
          :select-data="constructionTeamList"
          holder="所在施工队/班组"
          :disabled="isDetails"
          :select-options="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'child',checkStrictly: true }"
          :model-name.sync="ruleForm.constructionTeamName"
          @change="changeTeam"
        />
      </el-form-item>
      <el-form-item label="任命" prop="appointment">
        <el-select v-model="ruleForm.appointment" clearable :disabled="isDetails" placeholder="请选择任命">
          <el-option
            v-for="item in constant.memberAppointment"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="isDetails" label="状态" prop="verificationState">
        <el-select v-model="ruleForm.verificationState" clearable :disabled="isDetails" placeholder="请选择状态">
          <el-option
            v-for="item in constant.memberVerificationSt"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="full-width">
        <span slot="label"><span class="custom-form-label">*</span>工种</span>
        <div class="text">请选择列表中的选择框为该施工人员选择将要从事的工种，只能选择一个</div>
        <el-table :data="tableData" row-key="id" border default-expand-all style="width: 38%">
          <el-table-column prop="workTypeName" label="工种" align="center" />
          <el-table-column prop="workTime" label="从业年限" align="center" />
          <el-table-column prop="degreeName" label="熟练程度" align="center" />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-radio v-model="radio" :label="scope.$index" :disabled="isDetails" @change.native="getCurrentRow(scope.row)">{{ '' }}</el-radio>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="证书" class="full-width">
        <div class="text">请选择列表中的选择框为该施工人员选择要提交的证书资料，特殊工种时必须有相关证书</div>
        <el-table :data="certificate" row-key="id" border default-expand-all style="width: 78%">
          <el-table-column prop="code" label="证书编号" align="center" />
          <el-table-column prop="name" label="证书名称" align="center" />
          <el-table-column prop="issueAuthority" label="发证机关" align="center" />
          <el-table-column prop="issueDate" label="发证日期" align="center" />
          <el-table-column prop="validDate" label="有效期" align="center" />
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
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="checked" :disabled="isDetails" @change="checkCertificateBox(scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div v-if="!isDetails" class="btn">
      <el-button type="primary" @click="submit('save')">提交</el-button>
      <el-button type="danger" @click="submit('back')">退回</el-button>
      <el-button class="cancel-btn" @click="onCancle">取消</el-button>
    </div>
  </div>
</template>

<script>
import upload from '@core/mixins/upload'
import { mapGetters } from 'vuex'
import { validateID, validateLength } from '@core/utils/validate'
import { getBuildPerson, selectAppointment, getTeamoGroupTree, applySubmit, applyGoback } from '@core/api/projectManage/projectmanager'
import { treeChildrenEmpty, parseTime, codeChangeName, exportExcel } from '@core/utils'
import { downLoadFile } from '@core/api/accessoryFile'
export default {
  components: {
  },
  mixins: [upload],
  props: {
    rowDate: {
      type: Object,
      default: () => {}
    },
    typePage: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      fileListLoading: false,
      fileList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      tableData: [],
      certificate: [],
      disabled: false,
      loading: false,
      ruleForm: {
        id: '',
        name: '', // 姓名
        gender: '', // 性别
        nativePlace: '', // 籍贯
        birthday: '', // 出生日期
        telephone: '', // 手机
        nation: '', // 民族
        education: '', // 文化程度
        politicalStatus: '', // 政治面貌
        homeAddress: '', // 家庭住址
        workDate: '', // 参加工作日期
        bankNumber: '', // 银行卡号
        accountBank: '', // 开户行
        bankAddress: '', // 开户行地址
        appointment: '', // 任命
        constructionTeamId: [], // 施工队/班组
        verificationState: '', // 状态
        constructionTeamName: [] // 所属施工队名称
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }, validateLength(0, 20)],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        nativePlace: [{ required: true, message: '请选择籍贯', trigger: 'change' }],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
        telephone: [{ required: true, message: '请输入手机', trigger: 'blur' }, validateLength(0, 11)],
        nation: [{ required: true, message: '请选择民族', trigger: 'change' }],
        education: [{ required: true, message: '请选择文化程度', trigger: 'change' }],
        politicalStatus: [{ required: true, message: '请选择政治面貌', trigger: 'change' }],
        homeAddress: [{ required: true, message: '请输入家庭住址', trigger: 'blur' }, validateLength(0, 50)],
        constructionTeamId: [{ required: true, message: '请选择所在施工队/班组', trigger: 'change' }],
        appointment: [{ required: true, message: '请选择任命', trigger: 'change' }],
        bankNumber: [validateLength(0, 19)],
        accountBank: [validateLength(0, 20)],
        bankAddress: [validateLength(0, 50)]
      },
      constructionTeamList: [],
      workerCardList: [],
      photoList: [],
      certificateList: [],
      workTypeState: '',
      isDisabled: true,
      radio: '',
      radioWorktype: '',
      checked: false
    }
  },
  computed: {
    ...mapGetters(['constant']),
    isDetails() {
      return this.typePage === 'details'
    },
    getTitle() {
      return this.rowDate.name + '(' + this.rowDate.idNumber + ')'
    }
  },
  watch: {
    'ruleForm.idNumber'(value) {
      if (validateID(value)) {
        this.ruleForm.birthday = value.substring(6, 10) + '-' + value.substring(10, 12) + '-' + value.substring(12, 14)
        this.ruleForm.gender = value.slice(16, 17) % 2 === 0 ? '2' : '1'
      } else {
        this.ruleForm.birthday = ''
        this.ruleForm.gender = ''
      }
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['gender', 'nativePlace', 'workType', 'nation', 'pmEducation', 'pmPoliticalStatus', 'Proficiency', 'memberAppointment', 'memberVerificationSt'])
    if (this.rowDate.id) {
      this.fetchData()
      this.isDisabled = false
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      getBuildPerson(this.rowDate.id).then(({ data }) => {
        const { nativePlace, constructionTeamId, workTypeJson, certificateAllList } = data
        this.loading = false
        this.ruleForm = {
          ...data,
          appointment: '00',
          nativePlace: nativePlace ? nativePlace.split(',') : []
        }
        if (workTypeJson) {
          this.tableData = JSON.parse(workTypeJson)
          this.tableData.map(item => {
            this.workTypeState = item.workType
            item.workTypeName = codeChangeName(this.constant.workType, item.workType)
            item.degreeName = codeChangeName(this.constant.Proficiency, item.degree)
            return item
          })
        }
        if (certificateAllList) {
          this.certificate = certificateAllList
          this.certificate.map(item => {
            item.issueDate = parseTime(item.issueDate, 'y-m-d')
            item.validDate = parseTime(item.validDate, 'y-m-d')
            if (this.isDetails && item.effective === 1) { // 正常返回0现在是null 因为是造的数据
              this.checked = true
            }
            return item
          })
        }
        this.getTree(constructionTeamId)
        this.getSelectAppointment(constructionTeamId)
        const { id } = data
        this.uploadData.businessDataId = id
        this.fetchFileList(id, 'workerPhoto')
        this.fetchFileList(id, 'workerCard')
      })
    },
    getCurrentRow(row) {
      this.radioWorktype = row.workType
    },
    checkCertificateBox(row) {
      this.certificateList.push(row)
      this.certificateList.map(item => {
        item.effective = 1
        return item
      })
    },
    submit(type) {
      if (type === 'save') {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const { nativePlace } = this.ruleForm
            if (this.radioWorktype === '') {
              this.$message.warning('请选择工种')
              return
            }
            if (this.radioWorktype[0] === 's') {
              this.$message.warning('请选择证书')
              return
            }
            var params = {
              Loading: true,
              ...this.ruleForm,
              nativePlace: nativePlace.toString(),
              workType: this.radioWorktype,
              certificateList: this.certificateList
            }
            delete this.certificateAllList
            applySubmit(params).then(({ data }) => {
              this.$message.success('提交成功!')
              this.$emit('changeTabConent', 'joinApply')
            })
          } else {
            return
          }
        })
      } else {
        applyGoback(this.ruleForm.id).then(({ data }) => {
          this.$message.success('退回成功')
          this.$emit('changeTabConent', 'joinApply')
        })
      }
    },
    getTree(id) {
      const { projectId } = this.$route.query
      getTeamoGroupTree({ parentPath: id, projectId: projectId }).then(({ data }) => {
        this.constructionTeamList = treeChildrenEmpty(data, 'child')
      })
    },
    getSelectAppointment(id) {
      selectAppointment(id).then(({ data }) => {
        this.constant.memberAppointment = data
      })
    },
    changeTeam(val) {
      this.getSelectAppointment(val[val.length - 1])
    },
    uploadbefore(type) {
      switch (type) {
        case 'photo':
          this.uploadData.typeCode = 'workerPhoto'
          break
        case 'workerCard':
          this.uploadData.typeCode = 'workerCard'
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
          case 'workerCard':
            this.workerCardList = data
            this.workerCardList.map(item => {
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
    uploadSuccess(response, file, fileList) {
      this.uploadLoading.close()
      const { data } = response
      const row = data[0]
      this.uploadImgUrl = row.fileUrl
      this.photoList.forEach(item => {
        if (item.id !== row.id) {
          this.handleRemove(item)
        }
      })
    },
    fileIdCardSuccess(response, file, fileList) {
      this.workerCardList = fileList
      this.uploadLoading.close()
    },
    // 查看附件
    lookFile(row) {
      const { id } = row
      this.fileListLoading = true
      this.getFileLoad(id, 'organManageQualify').then(data => {
        this.fileList = data
        this.fileListLoading = false
      })
    },
    downLoadFile(row) {
      downLoadFile(row.id).then(res => {
        exportExcel(res, row.fileName)
      })
    },

    onCancle() {
      this.$emit('changeTabConent', 'joinApply')
    }
  }
}
</script>
<style lang="less" scoped>
.approval-info {
   .details-title {
     padding: 7px 0 10px 0;
     display: flex;
     justify-content: space-between;
  }
  .ruleForm {
    display: flex;
    flex-wrap: wrap;
    & > .el-form-item  {
      width: 33.33%;
    }
    .companyType {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      & > div {
        &:first-child {
          width: 66.66%;
          display: flex;
          flex-wrap: wrap;
          .el-form-item  {
            width: 50%;
          }
        }
        &:last-child {
          width: 33.33%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .el-select, .el-input, .el-cascader {
      width: 100%;
    }
    .full-width {
      width: 100%;
    }
    .two-width {
      width: 66.66%;
    }
    .text {
      display: block;
      color: #ccc;
    }

    .photo-box {
      width: 100%;
      text-align: center;
      color: #8c939d;
      .photo {
        width: 100px;
        height: 100px;
        border-radius: 2px;
        margin: 0 auto;
        border: 1px #d4d5d6 dashed;
        cursor: pointer;
        .el-icon-plus {
          font-size: 22px;
          line-height: 100px;
        }
      }
      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 2px;
      }
    }
  }
   .btn {
    width: 100%;
    text-align: center;
    padding-top:30px;
  }
}
</style>
<style lang="less">
.approval-info {
  .upload-frame {
    .avatar-uploader .el-upload {
      width: 100px !important;
      height: 100px !important;
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
