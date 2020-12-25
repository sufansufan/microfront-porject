<template>
  <div class="base-info">
    <el-form ref="ruleForm" v-loading="loading" :model="ruleForm" :rules="rules" label-width="130px" class="ruleForm">
      <div class="companyType">
        <div>
          <el-form-item label="身份证号" prop="idNumber">
            <el-input v-model="ruleForm.idNumber" :maxlength="18" clearable :disabled="disabled" placeholder="请输入身份证号" @blur="handeleIdNumber" />
          </el-form-item>
          <el-form-item label="考勤编号" prop="attendanceNumber">
            <el-input v-model="ruleForm.attendanceNumber" clearable :disabled="disabled || isAdd" :maxlength="6" placeholder="请输入考勤编号" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" :maxlength="20" clearable :disabled="disabled" placeholder="请输入姓名" @blur="handleInfoName" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="ruleForm.gender" clearable :disabled="disabled" placeholder="请选择性别">
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
              :disabled="disabled"
              :options="constant.nativePlace"
              :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children' }"
            />
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="ruleForm.birthday"
              clearable
              :disabled="disabled"
              type="date"
              placeholder="请选择出生日期"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </div>
        <div class="upload-frame">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            :action="actionUrl"
            :file-list="photoList"
            :show-file-list="false"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-success="uploadSuccess"
            :before-upload="beforeUploadM"
            :disabled="disabled"
          >
            <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar" @click="uploadbefore('photo')">
            <i v-else class="el-icon-plus avatar-uploader-icon" @click="uploadbefore('photo')" />
            <div slot="tip" class="tip-color">请上传大小在20KB~750KB范围内的JPG格式照片</div>
          </el-upload>
        </div>
      </div>
      <el-form-item label="手机" prop="telephone">
        <el-input v-model="ruleForm.telephone" :maxlength="11" clearable :disabled="disabled" placeholder="请输入手机" />
      </el-form-item>
      <el-form-item label="民族" prop="nation">
        <el-select v-model="ruleForm.nation" clearable :disabled="disabled" placeholder="请选择民族">
          <el-option
            v-for="item in constant.nation"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文化程度" prop="education">
        <el-select v-model="ruleForm.education" clearable :disabled="disabled" placeholder="请选择文化程度">
          <el-option
            v-for="item in constant.pmEducation"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="政治面貌" prop="politicalStatus">
        <el-select v-model="ruleForm.politicalStatus" clearable :disabled="disabled" placeholder="请选择政治面貌">
          <el-option
            v-for="item in constant.pmPoliticalStatus"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="家庭住址" prop="homeAddress" class="two-width">
        <el-input v-model="ruleForm.homeAddress" :maxlength="50" clearable :disabled="disabled" placeholder="请输入家庭住址" />
      </el-form-item>
      <el-form-item label="参加工作日期" prop="workDate">
        <el-date-picker
          v-model="ruleForm.workDates"
          clearable
          :disabled="disabled"
          type="date"
          placeholder="请选择参加工作日期"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item label="银行卡号" prop="bankNumber">
        <el-input v-model="ruleForm.bankNumber" :maxlength="19" clearable :disabled="disabled" placeholder="请输入银行卡号" />
      </el-form-item>
      <el-form-item label="开户行" prop="accountBank">
        <el-input v-model="ruleForm.accountBank" :maxlength="20" clearable :disabled="disabled" placeholder="请输入开户行" />
      </el-form-item>
      <el-form-item label="开户行地址" prop="bankAddress" class="two-width">
        <el-input v-model="ruleForm.bankAddress" :maxlength="50" clearable :disabled="disabled" placeholder="请输入开户行地址" />
      </el-form-item>
      <el-form-item label="所属公司" prop="cooperativeUnitId">
        <jdy-select
          v-model="cooperativeUnitId"
          :is-cascader="true"
          :is-model-name="true"
          :select-data="cooperativeUnitList"
          holder="所属公司"
          :disabled="disabled || isAdd"
          :select-options="{ expandTrigger: 'hover', value: 'cooperativeUnitId', label: 'cooperativeUnitName', children: 'list',checkStrictly: true }"
          :model-name.sync="cooperativeUnitName"
        />
      </el-form-item>
      <el-form-item label="工种" prop="workType">
        <el-select v-model="ruleForm.workType" clearable :disabled="disabled" placeholder="请选择工种" @change="handleWorkType">
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
          :disabled="disabled"
          :select-options="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'childArr',checkStrictly: true }"
          :model-name.sync="ruleForm.constructionTeamName"
        />
      </el-form-item>
      <el-form-item label="劳动合同编号" prop="contractNumber">
        <el-input v-model="ruleForm.contractNumber" :maxlength="20" clearable :disabled="disabled" placeholder="请输入劳动合同编号" />
      </el-form-item>

      <el-form-item label="身份证">
        <el-upload
          :file-list="idCardList"
          :action="actionUrl"
          :on-success="fileIdCardSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemove"
          :disabled="disabled"
          :limit="2"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="uploadbefore('idCard')">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="劳动合同"
      >
        <el-upload
          :file-list="labourContractList"
          :action="actionUrl"
          :on-success="fileLabourSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemove"
          :disabled="disabled"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="uploadbefore('labourContract')">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="体检报告"
      >
        <el-upload
          :file-list="medicalReportList"
          :action="actionUrl"
          :on-success="fileMedicalSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemove"
          :disabled="disabled"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="uploadbefore('medicalReport')">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="备注" class="full-width" prop="remark">
        <el-input v-model="ruleForm.remark" type="textarea" :rows="3" :disabled="disabled" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import upload from '@core/mixins/upload'
import { mapGetters } from 'vuex'
import { validateID, validateLength, validateNumPhone } from '@core/utils/validate'
import { saveTeamLeader, getTeamoGroupTree, getTeamLeader, updateTeamLeader, findByIdNumber, perValidateUnique } from '@core/api/projectManage/projectmanager'
export default {
  components: {
  },
  mixins: [upload],
  props: {
    disabled: {
      default: true,
      type: Boolean
    },
    resData: {
      type: Object,
      default: () => {}
    },
    baseinfoId: {
      type: String,
      default: ''
    },
    optimisticLock: {
      type: String,
      default: ''
    },
    typeName: {
      type: String,
      default: ''
    }
  },
  data() {
    const { id } = this.resData
    const validID = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号不能为空'))
      } else {
        if (!validateID(value)) {
          callback(new Error('身份证号不正确'))
        } else {
          const { name, constructionTeamId, workType } = this.ruleForm
          const { projectId } = this.$route.query
          var params = {
            idNumber: value,
            name: name,
            constructionTeamId: constructionTeamId,
            workType: workType,
            projectId: projectId,
            id: this.typePage === 'add' ? id || this.baseinfoId : this.baseinfoId
          }
          perValidateUnique(params).then(({ data }) => {
            data === true ? callback() : callback('身份证号不能重复')
          })
        }
      }
    }
    const validName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      } else {
        const { idNumber, constructionTeamId, workType } = this.ruleForm
        const { projectId } = this.$route.query
        var params = {
          idNumber: idNumber,
          name: value,
          constructionTeamId: constructionTeamId,
          workType: workType,
          projectId: projectId,
          id: this.typePage === 'add' ? id || this.baseinfoId : this.baseinfoId
        }
        perValidateUnique(params).then(({ data }) => {
          data === true ? callback() : callback('姓名不能重复')
        })
      }
    }
    const validTelephone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      } else {
        if (!validateNumPhone(value)) {
          callback(new Error('请输入11位数字'))
        } else {
          const { idNumber } = this.ruleForm
          const { projectId } = this.$route.query
          var params = {
            idNumber: idNumber,
            telephone: value,
            projectId: projectId,
            id: this.typePage === 'add' ? id || this.baseinfoId : this.baseinfoId
          }
          perValidateUnique(params).then(({ data }) => {
            data === true ? callback() : callback('手机号码不能重复')
          })
        }
      }
    }
    const validWorkType = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('工种不能为空'))
      } else {
        const { idNumber, name, constructionTeamId } = this.ruleForm
        const { projectId } = this.$route.query
        var params = {
          idNumber: idNumber,
          name: name,
          constructionTeamId: constructionTeamId,
          workType: value,
          projectId: projectId,
          id: this.typePage === 'add' ? id || this.baseinfoId : this.baseinfoId
        }
        perValidateUnique(params).then(({ data }) => {
          data === true ? callback() : callback('工种不能重复')
        })
      }
    }

    const validConstructionTeam = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('所在施工队/班组不能为空'))
      } else {
        const { idNumber, name, workType } = this.ruleForm
        const { projectId } = this.$route.query
        var params = {
          idNumber: idNumber,
          name: name,
          constructionTeamId: value,
          workType: workType,
          projectId: projectId,
          id: this.typePage === 'add' ? id || this.baseinfoId : this.baseinfoId
        }
        perValidateUnique(params).then(({ data }) => {
          data === true ? callback() : callback('所在施工队/班组不能重复')
        })
      }
    }
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 24 * 60 * 60 * 1000
        }
      },
      loading: false,
      ruleForm: {
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
        workType: '', // 工种
        constructionTeamId: [], // 所在施工队/班组
        constructionTeamName: [], // 所属施工队名称
        contractNumber: '', // 劳动合同编号
        remark: '',
        optimisticLock: ''

      },
      rules: {
        idNumber: [{ required: true, message: '请输入身份证号', trigger: 'blur' }, { required: true, validator: validID, trigger: 'blur' }, validateLength(0, 18)],
        attendanceNumber: [validateLength(0, 6)],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }, { required: true, validator: validName, trigger: 'blur' }, validateLength(0, 20)],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        nativePlace: [{ required: true, message: '请选择籍贯', trigger: 'change' }],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
        telephone: [{ required: true, message: '请输入手机', trigger: 'blur' }, { required: true, validator: validTelephone, trigger: 'blur' }, validateLength(0, 11)],
        nation: [{ required: true, message: '请选择民族', trigger: 'change' }],
        education: [{ required: true, message: '请选择文化程度', trigger: 'change' }],
        politicalStatus: [{ required: true, message: '请选择政治面貌', trigger: 'change' }],
        homeAddress: [{ required: true, message: '请输入家庭住址', trigger: 'blur' }, validateLength(0, 50)],
        workType: [{ required: true, message: '请选择工种', trigger: 'change' }, { required: true, validator: validWorkType, trigger: 'change' }],
        constructionTeamId: [{ required: true, message: '请选择所在施工队/班组', trigger: 'change' }, { required: true, validator: validConstructionTeam, trigger: 'change' }],
        contractNumber: [validateLength(0, 20)],
        // bankNumber: [validateLength(0, 19)],
        accountBank: [validateLength(0, 20)],
        bankAddress: [validateLength(0, 50)],
        remark: [validateLength(0, 255)]
      },
      typeStep: 'finish',
      idCardList: [],
      labourContractList: [],
      medicalReportList: [],
      photoList: [],
      cooperativeUnitList: [],
      constructionTeamList: [],
      workTypeName: '',
      cooperativeUnitId: this.resData.cooperativeUnitId
    }
  },
  computed: {
    ...mapGetters(['constant']),
    isAdd() {
      return this.$route.query.type === 'add'
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
    },
    baseinfoId: {
      handler(v) {
        if (v) {
          this.getTeamLeaderMes()
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['gender', 'nativePlace', 'pmEducation', 'workType', 'nation', 'pmPoliticalStatus'])
    const { typePage, teamRow } = this.$route.query
    const { id: groupId, name } = this.resData
    if (typePage === 'team' || typePage === 'group') {
      this.cooperativeUnitList.push(this.resData)
      this.cooperativeUnitList.map(item => {
        item.cooperativeUnitName = item.cooperativeUnitName.replace(/,/g, '/')
        return item
      })
    }
    if (typePage === 'group') this.cooperativeUnitList.push(teamRow)
    this.ruleForm.constructionTeamId = groupId
    this.ruleForm.constructionTeamName = name
    if (typePage === 'team') this.constructionTeamList.push(this.resData)
    if (typePage === 'group') this.getTree()
  },
  methods: {

    getTree() {
      const { parentId, id } = this.resData
      const { projectId } = this.$route.query
      getTeamoGroupTree({ parentPath: parentId, projectId: projectId }).then(({ data }) => {
        if (data[0].child && data[0].child.length > 0) {
          data[0].childArr = data[0].child.filter((item) => {
            if (item.id === id) {
              return item
            }
          })
        }
        this.constructionTeamList = data
      })
    },
    handeleIdNumber() {
      const { id: groupId, name } = this.resData
      findByIdNumber(this.ruleForm.idNumber).then(({ data }) => {
        if (data) {
          const { id } = data
          this.ruleForm = {
            ...data,
            nativePlace: [],
            name: '',
            constructionTeamId: groupId,
            constructionTeamName: name
          }
          // this.uploadData.businessDataId = id
          this.fetchFileList(id, 'baseInfo')
          this.fetchFileList(id, 'idCard')
        }
      })
    },
    getTeamLeaderMes() {
      getTeamLeader(this.baseinfoId).then(({ data }) => {
        const { nativePlace } = data
        this.ruleForm = {
          ...data,
          nativePlace: nativePlace ? nativePlace.split(',') : []
        }
        const { id } = this.ruleForm
        this.uploadData.businessDataId = id
        this.fetchFileList(id, 'baseInfo')
        this.fetchFileList(id, 'idCard')
        this.fetchFileList(id, 'labourContract')
        this.fetchFileList(id, 'medicalReport')
      })
    },
    addOrEditBaseInfo() {
      return new Promise((resolve, inject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (!this.uploadImgUrl) {
              this.$message.warning('请上传照片')
              return
            }
            const { projectId, projectName, typePage, teamId, teamName } = this.$route.query
            const { nativePlace, optimisticLock } = this.ruleForm
            const { id: groupId, name } = this.resData
            var params = {
              Loading: true,
              ...this.ruleForm,
              projectId: projectId,
              projectName: projectName,
              nativePlace: nativePlace.toString(),
              constructionTeamId: typePage === 'team' ? groupId : `${groupId}`, // 所属施工队/班组Id
              constructionTeamName: typePage === 'team' ? name : `${teamName},${name}`, // 所属施工队/班组名称
              constructionTeamPath: typePage === 'team' ? groupId : `${teamId},${groupId}`, // 所属施工队/班组路径
              id: this.uploadData.businessDataId,
              optimisticLock: this.optimisticLock || optimisticLock,
              uploadReport: this.fileList.length !== 0 || this.medicalReportList.length !== 0 ? 1 : 0
            }
            if (this.workTypeName[0] === 's') {
              if (this.baseinfoId) {
                updateTeamLeader(params).then(({ data }) => {
                  this.$message.success('修改成功!')
                  resolve(data)
                })
              } else {
                delete params.optimisticLock
                saveTeamLeader(params).then(({ data }) => {
                  this.$message.success('保存成功!')
                  resolve(data)
                })
              }
            } else {
              if (this.baseinfoId) {
                updateTeamLeader(params).then(({ data }) => {
                  this.$message.success('修改成功!')
                  if (this.typeName === 'finish') {
                    this.$router.go(-1)
                  }
                  resolve(data)
                })
              } else {
                delete params.optimisticLock
                saveTeamLeader(params).then(({ data }) => {
                  this.$message.success('保存成功!')
                  if (this.typeName === 'finish') {
                    this.$router.go(-1)
                  }
                  resolve(data)
                })
              }
            }
          } else {
            inject()
            return false
          }
        })
      })
    },

    handleInfoName() {
      this.$emit('childInfo', this.ruleForm.name)
    },
    handleWorkType(e) {
      this.workTypeName = e
      this.$emit('childWork', e)
    },
    uploadbefore(type) {
      switch (type) {
        case 'photo':
          this.uploadData.typeCode = 'baseInfo'
          break
        case 'idCard':
          this.uploadData.typeCode = 'idCard'
          break
        case 'labourContract':
          this.uploadData.typeCode = 'labourContract'
          break
        case 'medicalReport':
          this.uploadData.typeCode = 'medicalReport'
          break
        default:
          break
      }
    },
    fetchFileList(id, type) {
      this.getFileLoad(id, type).then(data => {
        switch (type) {
          case 'baseInfo':
            this.uploadImgUrl = data ? data[0].fileUrl : ''
            this.photoList = data
            break
          case 'idCard':
            this.idCardList = data
            this.idCardList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            break
          case 'labourContract':
            this.labourContractList = data
            this.labourContractList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            break
          case 'medicalReport':
            this.medicalReportList = data
            this.medicalReportList.map(item => {
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
    fileLabourSuccess(response, file, fileList) {
      this.labourContractList = fileList
      this.uploadLoading.close()
    },
    fileMedicalSuccess(response, file, fileList) {
      this.medicalReportList = fileList
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
    }

  }
}
</script>
<style lang="less" scoped>
.base-info {
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
.base-info {
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
