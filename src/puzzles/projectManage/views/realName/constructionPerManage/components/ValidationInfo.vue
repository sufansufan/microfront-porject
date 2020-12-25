<template>
  <div class="validation-info">
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
          <el-form-item label="身份证号" prop="idNumber">
            <el-input v-model="ruleForm.idNumber" :maxlength="18" clearable :disabled="true" placeholder="请输入身份证号" @blur="handeleIdNumber" />
          </el-form-item>
          <el-form-item label="考勤编号" prop="attendanceNumber">
            <el-input v-model="ruleForm.attendanceNumber" clearable :disabled="true" :maxlength="6" placeholder="请输入考勤编号" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" :maxlength="20" clearable :disabled="true" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="ruleForm.gender" clearable :disabled="true" placeholder="请选择性别">
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
              :disabled="true"
              :options="constant.nativePlace"
              :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children' }"
            />
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="ruleForm.birthday"
              clearable
              :disabled="true"
              type="date"
              placeholder="请选择出生日期"
            />
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
            :disabled="true"
          >
            <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar" @click="uploadbefore('photo')">
            <i v-else class="el-icon-plus avatar-uploader-icon" @click="uploadbefore('photo')" />
            <div slot="tip" class="tip-color">请上传大小在20KB~750KB范围内的JPG格式照片</div>
          </el-upload>
        </div>
      </div>
      <el-form-item label="手机" prop="telephone">
        <el-input v-model="ruleForm.telephone" :maxlength="11" clearable :disabled="true" placeholder="请输入手机" />
      </el-form-item>
      <el-form-item label="民族" prop="nation">
        <el-select v-model="ruleForm.nation" clearable :disabled="true" placeholder="请选择民族">
          <el-option
            v-for="item in constant.nation"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文化程度" prop="education">
        <el-select v-model="ruleForm.education" clearable :disabled="true" placeholder="请选择文化程度">
          <el-option
            v-for="item in constant.pmEducation"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="政治面貌" prop="politicalStatus">
        <el-select v-model="ruleForm.politicalStatus" clearable :disabled="true" placeholder="请选择政治面貌">
          <el-option
            v-for="item in constant.pmPoliticalStatus"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="家庭住址" prop="homeAddress" class="two-width">
        <el-input v-model="ruleForm.homeAddress" :maxlength="50" clearable :disabled="true" placeholder="请输入家庭住址" />
      </el-form-item>
      <el-form-item label="参加工作日期" prop="workDate">
        <el-date-picker
          v-model="ruleForm.workDate"
          clearable
          :disabled="true"
          type="date"
          placeholder="请选择参加工作日期"
        />
      </el-form-item>
      <el-form-item label="银行卡号" prop="bankNumber">
        <el-input v-model="ruleForm.bankNumber" :maxlength="19" clearable :disabled="true" placeholder="请输入银行卡号" />
      </el-form-item>
      <el-form-item label="开户行" prop="accountBank">
        <el-input v-model="ruleForm.accountBank" :maxlength="20" clearable :disabled="true" placeholder="请输入开户行" />
      </el-form-item>
      <el-form-item label="开户行地址" prop="bankAddress" class="two-width">
        <el-input v-model="ruleForm.bankAddress" :maxlength="50" clearable :disabled="true" placeholder="请输入开户行地址" />
      </el-form-item>
      <el-form-item label="所属公司" prop="cooperativeUnitId">
        <jdy-select
          v-model="cooperativeUnitId"
          :is-cascader="true"
          :is-model-name="true"
          :select-data="cooperativeUnitList"
          holder="所属公司"
          :disabled="true"
          :select-options="{ expandTrigger: 'hover', value: 'cooperativeUnitId', label: 'cooperativeUnitName', children: 'list',checkStrictly: true }"
          :model-name.sync="cooperativeUnitName"
        />
      </el-form-item>
      <el-form-item label="工种" prop="workType">
        <el-select v-model="ruleForm.workType" clearable :disabled="true" placeholder="请选择工种">
          <el-option
            v-for="item in constant.workType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所在施工队/班组" prop="constructionTeamId">
        <jdy-select
          v-model="ruleForm.constructionTeamId"
          :is-cascader="true"
          :is-model-name="true"
          :select-data="constructionTeamList"
          holder="所在施工队/班组"
          :disabled="true"
          :select-options="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'child',checkStrictly: true }"
          :model-name.sync="ruleForm.constructionTeamName"
        />
      </el-form-item>
      <el-form-item label="任命" prop="appointment">
        <el-select v-model="ruleForm.appointment" clearable :disabled="true" placeholder="请选择任命">
          <el-option
            v-for="item in constant.memberAppointment"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <div v-if="isDetails" class="full-width">
        <el-form-item label="状态" prop="verificationState" style="width:33.33%">
          <el-select v-model="ruleForm.verificationState" clearable :disabled="true" placeholder="请选择状态">
            <el-option
              v-for="item in constant.memberVerificationSt"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="身份证">
        <el-upload
          :file-list="workerCardList"
          :action="actionUrl"
          :on-success="fileIdCardSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemove"
          :disabled="true"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="true" @click="uploadbefore('workerCard')">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="持证信息" class="full-width">
        <el-table :data="tableData" row-key="id" border default-expand-all style="width: 78%">
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
        </el-table>
      </el-form-item>
    </el-form>
    <div v-if="!isDetails" class="btn">
      <el-button type="primary" @click="submit('pass')">通过</el-button>
      <el-button type="danger" @click="submit('back')">退回</el-button>
      <el-button class="cancel-btn" @click="onCancle">取消</el-button>
    </div>
  </div>
</template>
<script>
import upload from '@core/mixins/upload'
import { mapGetters } from 'vuex'
import { validateLength } from '@core/utils/validate'
import { getBuildPerson, getTeamoGroupTree, applyVerification, applyGoback } from '@core/api/projectManage/projectmanager'
import { filterListData, exportExcel, parseTime, treeChildrenEmpty } from '@core/utils'
import { downLoadFile } from '@core/api/accessoryFile'
export default {
  components: {
  },
  mixins: [upload],
  props: {
    typePage: {
      type: String,
      default: ''
    },
    rowDate: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableData: [],
      loading: false,
      ruleForm: {
        id: '',
        idNumber: '', // 身份证号
        attendanceNumber: '', // 考勤编号
        name: '', // 姓名
        gender: '', // 性别
        nativePlace: [], // 籍贯
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
        cooperativeUnitId: [], // 所属公司
        workType: '', // 工种
        appointment: '', // 任命
        verificationState: '', // 状态
        constructionTeamId: [], // 所在施工队/班组
        constructionTeamName: [] // 所属施工队名称
      },
      rules: {
        idNumber: [{ required: true, message: '请输入身份证号', trigger: 'blur' }, validateLength(0, 18)],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }, validateLength(0, 20)],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        nativePlace: [{ required: true, message: '请选择籍贯', trigger: 'change' }],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
        telephone: [{ required: true, message: '请输入手机', trigger: 'blur' }, validateLength(0, 11)],
        nation: [{ required: true, message: '请选择民族', trigger: 'change' }],
        education: [{ required: true, message: '请选择文化程度', trigger: 'change' }],
        politicalStatus: [{ required: true, message: '请选择政治面貌', trigger: 'change' }],
        homeAddress: [{ required: true, message: '请输入家庭住址', trigger: 'blur' }, validateLength(0, 50)],
        workType: [{ required: true, message: '请选择工种', trigger: 'change' }],
        constructionTeamId: [{ required: true, message: '请选择所在施工队/班组', trigger: 'change' }],
        appointment: [{ required: true, message: '请选择任命', trigger: 'change' }],
        bankNumber: [validateLength(0, 19)],
        accountBank: [validateLength(0, 20)],
        bankAddress: [validateLength(0, 50)]

      },
      workerCardList: [],
      photoList: [],
      cooperativeUnitList: [], // 所属劳务公司
      constructionTeamList: []
    }
  },
  computed: {
    ...mapGetters(['constant']),
    isDetails() {
      return this.typePage === 'dataDetails'
    },
    getTitle() {
      return this.rowDate.name + '(' + this.rowDate.idNumber + ')'
    }
  },

  created() {
    this.$store.dispatch('getConstant', ['gender', 'nativePlace', 'pmEducation', 'workType', 'nation', 'pmPoliticalStatus', 'memberVerificationSt', 'memberAppointment']).then(() => {
      this.constant.memberVerificationSt = filterListData(this.constant.memberVerificationSt, '01')
    })
    if (this.rowDate.id) {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      getBuildPerson(this.rowDate.id).then(({ data }) => {
        const { nativePlace, certificateAllList, constructionTeamId } = data
        this.loading = false
        this.ruleForm = {
          ...data,
          nativePlace: nativePlace ? nativePlace.split(',') : []
        }
        this.getTree(constructionTeamId)
        if (certificateAllList) {
          this.tableData = certificateAllList
          this.tableData.map(item => {
            item.issueDate = parseTime(item.issueDate, 'y-m-d')
            item.validDate = parseTime(item.validDate, 'y-m-d')
            return item
          })
        }
        const { id } = data
        this.uploadData.businessDataId = id
        this.fetchFileList(id, 'workerPhoto')
        this.fetchFileList(id, 'workerCard')
      })
    },
    getTree(id) {
      const { projectId } = this.$route.query
      getTeamoGroupTree({ parentPath: id, projectId: projectId }).then(({ data }) => {
        this.constructionTeamList = treeChildrenEmpty(data, 'child')
      })
    },
    submit(type) {
      if (type === 'pass') {
        applyVerification(this.ruleForm.id).then(({ data }) => {
          this.$message.success('通过成功')
          this.$emit('changeTabConent', 'dataValidation')
        })
      } else {
        applyGoback(this.ruleForm.id).then(({ data }) => {
          this.$message.success('退回成功')
          this.$emit('changeTabConent', 'dataValidation')
        })
      }
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
          case 'labourContract':
          default:
            break
        }
      })
    },
    fileIdCardSuccess(response, file, fileList) {
      this.workerCardList = fileList
      this.uploadLoading.close()
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
      this.$emit('changeTabConent', 'dataValidation')
    }
  }
}
</script>
<style lang="less" scoped>
.validation-info {
  .details-title {
     padding: 7px 0 10px 0;
     display: flex;
     justify-content: space-between;
  }
  .btn {
    width: 100%;
    text-align: center;
    padding-top:30px;
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
}
</style>
<style lang="less">
.validation-info {
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
