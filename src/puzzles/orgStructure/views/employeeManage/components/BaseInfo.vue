<template>
  <div class="base-info">
    <el-form ref="ruleForm" v-loading="loading" :model="ruleForm" :rules="rules" label-width="120px" class="ruleForm">
      <div class="companyType">
        <div>
          <el-form-item label="工号" prop="jobNumber">
            <el-input v-model="ruleForm.jobNumber" :maxlength="8" clearable :disabled="disabled" placeholder="请输入工号" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" clearable :disabled="disabled" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="身份证号" prop="idNumber">
            <el-input v-model="ruleForm.idNumber" :maxlength="18" clearable :disabled="disabled" placeholder="请输入身份证号" />
          </el-form-item>
          <el-form-item label="手机" prop="telephone">
            <el-input v-model="ruleForm.telephone" clearable :maxlength="11" :disabled="disabled" placeholder="请输入手机" />
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
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="ruleForm.birthday"
              clearable
              :disabled="disabled"
              type="date"
              placeholder="选择出生日期"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </div>
        <div class="upload-frame">
          <!-- photo-box  -->
          <!-- <div>
            <div class="photo" @click="photoClickqq">
              <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar">
              <i v-else class="el-icon-plus" />
            </div>
            <div>建议上传200X200px的图片，大小不能超过2M</div>
          </div> -->
          <el-upload
            ref="upload"
            class="avatar-uploader"
            :action="actionUrl"
            :show-file-list="false"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload2M"
            :disabled="disabled"
          >
            <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar" @click="uploadbefore('photo')">
            <i v-else class="el-icon-plus avatar-uploader-icon" @click="uploadbefore('photo')" />
            <div slot="tip" class="tip-color">建议上传200X200px的图片，大小不能超过2M</div>
          </el-upload>
        </div>
      </div>
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
      <el-form-item label="政治面貌" prop="politicalStatus">
        <el-select v-model="ruleForm.politicalStatus" clearable :disabled="disabled" placeholder="请选择政治面貌">
          <el-option
            v-for="item in constant.politicalStatus"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="毕业院校" prop="graduateInstitutions">
        <el-input v-model="ruleForm.graduateInstitutions" clearable :disabled="disabled" placeholder="请输入毕业院校" :maxlength="20" />
      </el-form-item>
      <el-form-item label="专业" prop="profession">
        <el-input v-model="ruleForm.profession" :maxlength="20" clearable :disabled="disabled" placeholder="请输入专业" />
      </el-form-item>
      <el-form-item label="毕业时间">
        <el-date-picker
          v-model="ruleForm.graduationDate"
          :disabled="disabled"
          clearable
          type="date"
          placeholder="请选择毕业时间"
        />
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="ruleForm.education" clearable :disabled="disabled" placeholder="请选择学历">
          <el-option
            v-for="item in constant.Education"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学位">
        <el-select v-model="ruleForm.degree" clearable :disabled="disabled" placeholder="请选择学位">
          <el-option
            v-for="item in constant.Degree"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="外语语种" prop="foreignLanguage">
        <el-input v-model="ruleForm.foreignLanguage" clearable :disabled="disabled" placeholder="请输入外语语种" :maxlength="20" />
      </el-form-item>
      <el-form-item label="外语水平" prop="languageLevel">
        <el-input v-model="ruleForm.languageLevel" clearable :disabled="disabled" placeholder="请输入英语水平" :maxlength="20" />
      </el-form-item>
      <el-form-item label="婚姻状况" prop="maritalStatus">
        <el-select v-model="ruleForm.maritalStatus" clearable :disabled="disabled" placeholder="请选择婚姻状况">
          <el-option
            v-for="item in constant.Marriage"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="子女状况" prop="childStatus">
        <el-select v-model="ruleForm.childStatus" clearable :disabled="disabled" placeholder="请选择子女状况">
          <el-option
            v-for="item in constant.Children"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="疾病/手术史" prop="disease">
        <el-select v-model="ruleForm.disease" clearable :disabled="disabled" placeholder="请选择疾病/手术史">
          <el-option
            v-for="item in constant.HasOrNot"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="疾病/手术说明"
        class="two-width"
        prop="diseaseInfo"
        :rules="[
          { required: ruleForm.disease === 'Has', message: '请填写疾病/手术说明', trigger: 'blur' }
        ]"
      >
        <el-input v-model="ruleForm.diseaseInfo" clearable :disabled="disabled || ruleForm.disease === 'Not'" placeholder="请输入疾病/手术说明" :maxlength="20" />
      </el-form-item>
      <el-form-item label="户口所在地" prop="residencePlace">
        <el-cascader
          v-model="ruleForm.residencePlace"
          placeholder="请选择户口所在地"
          clearable
          :disabled="disabled"
          :options="constant.nativePlace"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children' }"
        />
      </el-form-item>
      <el-form-item label="户口地址" prop="residenceAddress">
        <el-input v-model="ruleForm.residenceAddress" clearable :disabled="disabled" placeholder="请输入户口地址" :maxlength="50" />
      </el-form-item>
      <el-form-item label="户口所在邮编" prop="residencePostcode">
        <el-input v-model="ruleForm.residencePostcode" clearable :disabled="disabled" placeholder="请输入户口所在邮编" :maxlength="20" />
      </el-form-item>
      <el-form-item label="现住址" prop="currentPlace">
        <el-cascader
          v-model="ruleForm.currentPlace"
          placeholder="请选择现住址"
          clearable
          :disabled="disabled"
          :options="constant.nativePlace"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children' }"
        />
      </el-form-item>
      <el-form-item label="详细地址" prop="currentAddress">
        <el-input v-model="ruleForm.currentAddress" clearable :disabled="disabled" placeholder="请输入详细地址" :maxlength="50" />
      </el-form-item>
      <el-form-item label="现居住地邮编" prop="currentPostcode">
        <el-input v-model="ruleForm.currentPostcode" clearable :disabled="disabled" placeholder="请输入现居住地邮编" :maxlength="20" />
      </el-form-item>
      <el-form-item label="户口性质" prop="residenceNature">
        <el-select v-model="ruleForm.residenceNature" clearable :disabled="disabled" placeholder="请选择户口性质">
          <el-option
            v-for="item in constant.residenceNature"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="家庭电话" prop="homePhone">
        <el-input v-model="ruleForm.homePhone" clearable :disabled="disabled" placeholder="请输入家庭联系电话" :maxlength="20" />
      </el-form-item>
      <el-form-item label="E-mail" prop="email">
        <el-input v-model="ruleForm.email" clearable :disabled="disabled" placeholder="请输入E-mail" />
      </el-form-item>
      <el-form-item label="紧急联系人" prop="emergencyContact">
        <el-input v-model="ruleForm.emergencyContact" clearable :disabled="disabled" placeholder="请输入紧急联系人" :maxlength="20" />
      </el-form-item>
      <el-form-item label="紧急联系人电话" prop="contactTelephone">
        <el-input v-model="ruleForm.contactTelephone" clearable :disabled="disabled" placeholder="请输入联系人电话" :maxlength="20" />
      </el-form-item>
      <el-form-item label="职称等级">
        <el-select v-model="ruleForm.jobLevel" clearable :disabled="disabled" placeholder="请选择职称等级">
          <el-option
            v-for="item in constant.JobLevel"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="员工类型" prop="employeeType">
        <el-select v-model="ruleForm.employeeType" clearable :disabled="disabled" placeholder="请选择员工类型">
          <el-option
            v-for="item in constant.employeeType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="入职日期" prop="joinDate">
        <el-date-picker
          v-model="ruleForm.joinDate"
          clearable
          :disabled="disabled"
          type="date"
          placeholder="请选择入职日期"
        />
      </el-form-item>
      <el-form-item label="办公电话" prop="officeTelephone">
        <el-input v-model="ruleForm.officeTelephone" clearable :disabled="disabled" placeholder="请输入办公电话" :maxlength="20" />
      </el-form-item>
      <el-form-item label="状态" prop="employeeStatus">
        <el-select v-model="ruleForm.employeeStatus" clearable :disabled="disabled" placeholder="请选择状态" @change="changeStatus">
          <el-option
            v-for="item in constant.employeeStatus"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="statusVisitable" label="申请离职日期" prop="applyLeaveDate">
        <el-date-picker
          v-model="ruleForm.applyLeaveDate"
          clearable
          :disabled="disabled"
          type="date"
          placeholder="请选择入职日期"
        />
      </el-form-item>
      <el-form-item v-if="statusVisitable" label="实际离职日期" prop="actualLeaveDate">
        <el-date-picker
          v-model="ruleForm.actualLeaveDate"
          clearable
          :disabled="disabled"
          type="date"
          placeholder="请选择入职日期"
        />
      </el-form-item>
      <el-form-item v-if="statusVisitable" label="离职类型" prop="leaveType">
        <el-select v-model="ruleForm.leaveType" clearable :disabled="disabled" placeholder="请选择离职类型">
          <el-option
            v-for="item in constant.leaveType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="statusVisitable" label="离职原因" prop="leaveReason">
        <el-select v-model="ruleForm.leaveReason" clearable :disabled="disabled" placeholder="请选择状态" @change="changeLeaveReason">
          <el-option
            v-for="item in constant.leaveReason"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="leaveReasonVisitable" label="其他原因说明" prop="otherReason">
        <el-input v-model="ruleForm.otherReason" type="textarea" :rows="3" :disabled="disabled" placeholder="请输入其他原因" :maxlength="255" />
      </el-form-item>
      <div class="full-width" />
      <el-form-item>
        <span slot="label"><span class="custom-form-label">*</span>身份证</span>
        <el-upload
          :file-list="idCardList"
          :action="actionUrl"
          :on-success="fileIdCardSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemove"
          :disabled="disabled"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="uploadbefore('idCard')">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="学历证"
        :rules="[{ required:ruleForm.education === 'University' || ruleForm.education === 'PostGraduate'}]"
      >
        <el-upload
          :file-list="degreeList"
          :action="actionUrl"
          :on-success="fileDegreeSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemove"
          :disabled="disabled"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="uploadbefore('degreeCard')">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="学位证"
        :rules="[
          { required:ruleForm.degree !== 'None' && ruleForm.degree !== ''}
        ]"
      >
        <el-upload
          :file-list="educationList"
          :action="actionUrl"
          :on-success="fileEducationSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemove"
          :disabled="disabled"
          :before-upload="beforeUpload50M"
          :on-error="fileError"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="uploadbefore('educationCard')">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" class="full-width" prop="remark">
        <el-input v-model="ruleForm.remark" type="textarea" :rows="3" :disabled="disabled" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>
    </el-form>
    <!-- <drag-dialog ref="dialog" title="编辑头像" width="40%">
      <cropper ref="cropperBox" :head-img="uploadImgUrl" :personnel-id="ruleForm.id" @closeDialog="closeDialog" />
    </drag-dialog> -->
  </div>
</template>

<script>
import upload from '@core/mixins/upload'
import { mapGetters } from 'vuex'
import { employeeDetail, editEmployee, saveEmployee, validateTeleUnique, validateIdNumber, validateJobNumber } from '@core/api/personnel'
import { validateNumber, validateID, validatePhone, validateLength, validateJobNum } from '@core/utils/validate'
// import Cropper from '@frames/dashboard/components/Cropper'
// import DragDialog from '@frames/dashboard/components/Dialog'
// import { getIdHeadImg } from '@core/api/personelSet'
import { parseTime } from '@core/utils'
export default {
  components: {
    // Cropper,
    // DragDialog
  },
  mixins: [upload],
  props: {
    disabled: {
      default: true,
      type: Boolean
    },
    companyType: {
      default: '',
      type: String
    },
    personnelId: {
      default: '',
      type: String
    },
    actionIndex: {
      default: 0,
      type: Number
    }
  },
  data() {
    var validPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        if (!validatePhone(value)) {
          callback(new Error('请输入正确的电话'))
        } else {
          validateTeleUnique(value, { id: this.personnelId }).then(({ data }) => {
            data === 0 ? callback() : callback('该手机号已被使用,请重新输入!')
          })
        }
      }
    }
    var validJobNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('工号不能为空'))
      } else {
        if (!validateJobNum(value)) {
          callback(new Error('工号长度只能为3-8位，且不能以0开头'))
        } else {
          callback()
        }
      }
    }
    const validID = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号码不能为空'))
      } else {
        if (!validateID(value)) {
          callback(new Error('身份证号码不正确'))
        } else {
          validateIdNumber(value, { id: this.personnelId }).then(({ data }) => {
            data === 0 ? callback() : callback('该身份证已被使用,请重新输入!')
          })
        }
      }
    }

    const validNumber = (rule, value, callback) => {
      if (!validateNumber(value)) {
        callback(new Error('请输入数字'))
      } else {
        validateJobNumber(value, { id: this.personnelId }).then(({ data }) => {
          data === 0 ? callback() : callback('工号已存在')
        })
      }
    }
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      loading: false,
      ruleForm: {
        jobNumber: '',
        name: '',
        idNumber: '',
        telephone: '',
        gender: '',
        birthday: '',
        nativePlace: '',
        nation: '',
        politicalStatus: '',
        graduateInstitutions: '',
        profession: '',
        graduationDate: '',
        education: '',
        degree: '',
        foreignLanguage: '',
        languageLevel: '',
        maritalStatus: '',
        childStatus: '',
        disease: '',
        diseaseInfo: '',
        residencePlace: '',
        residenceAddress: '',
        residencePostcode: '',
        currentPlace: '',
        currentAddress: '',
        currentPostcode: '',
        residenceNature: '',
        homePhone: '',
        email: '',
        emergencyContact: '',
        contactTelephone: '',
        jobLevel: '',
        employeeType: '',
        joinDate: '',
        officeTelephone: '',
        employeeStatus: '',
        applyLeaveDate: '',
        actualLeaveDate: '',
        leaveType: '',
        leaveReason: '',
        otherReason: '',
        mainPostId: '',
        password: '',
        remark: ''
      },
      rules: {
        jobNumber: [{ required: true, validator: validJobNum, trigger: 'blur' },
          { validator: validNumber, trigger: 'blur' }],
        name: [{ required: true, message: '请填写姓名', trigger: 'blur' }, validateLength(0, 20)],
        idNumber: [{ required: true, validator: validID, trigger: 'blur' }],
        telephone: [{ required: true, validator: validPhone, trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
        nativePlace: [{ required: true, message: '请选择籍贯', trigger: 'change' }],
        nation: [{ required: true, message: '请选择民族', trigger: 'change' }],
        politicalStatus: [{ required: true, message: '请选择政治面貌', trigger: 'change' }],
        maritalStatus: [{ required: true, message: '请选择婚姻状况', trigger: 'change' }],
        childStatus: [{ required: true, message: '请选择子女状况', trigger: 'change' }],
        disease: [{ required: true, message: '请选择是否有疾病/手术史', trigger: 'change' }],
        residencePlace: [{ required: true, message: '请选择户口所在地', trigger: 'change' }],
        residenceNature: [{ required: true, message: '请选择户口性质', trigger: 'change' }],
        currentPlace: [{ required: true, message: '请选择现居住地', trigger: 'change' }],
        employeeType: [{ required: true, message: '请选择员工类型', trigger: 'change' }],
        joinDate: [{ required: true, message: '请选择入职日期', trigger: 'change' }],
        employeeStatus: [{ required: true, message: '请选择现员工状态', trigger: 'change' }],
        applyLeaveDate: [{ required: true, message: '请选择申请离职日期', trigger: 'change' }],
        actualLeaveDate: [{ required: true, message: '请选择实际离职日期', trigger: 'change' }],
        leaveType: [{ required: true, message: '请选择离职类型', trigger: 'change' }],
        leaveReason: [{ required: true, message: '请选择离职原因', trigger: 'change' }],
        otherReason: [{ required: true, message: '请输入其他原因说明', trigger: 'blur' }, validateLength(0, 255)],
        email: [
          { required: false, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        remark: [validateLength(0, 255)],
        graduateInstitutions: [validateLength(0, 50)],
        profession: [validateLength(0, 20)],
        foreignLanguage: [validateLength(0, 20)],
        languageLevel: [validateLength(0, 20)],
        residenceAddress: [validateLength(0, 50)],
        residencePostcode: [validateLength(0, 20)],
        currentAddress: [validateLength(0, 50)],
        currentPostcode: [validateLength(0, 20)],
        homePhone: [validateLength(0, 20)],
        emergencyContact: [validateLength(0, 20)],
        contactTelephone: [validateLength(0, 20)],
        officeTelephone: [validateLength(0, 20)]
      },
      statusVisitable: false, // 状态为离职时显示字段
      leaveReasonVisitable: false, // 离职原因为其他时显示字段
      idCardList: [],
      degreeList: [],
      educationList: [],
      photoList: [],
      optimisticLock: ''
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    // 当婚姻状况为“未婚”的时候，默认显示无子女
    'ruleForm.maritalStatus'() {
      if (this.ruleForm.maritalStatus === 'Unmarried') this.ruleForm.childStatus = 'None'
    },
    // personnelId: {
    //   handler(v) {
    //     if (v) {
    //       this.fetchData()
    //     }
    //   },
    //   immediate: true,
    //   deep: true
    // },
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
    this.$store.dispatch('getConstant', ['gender', 'nativePlace', 'nation', 'politicalStatus', 'Education', 'Degree', 'Marriage', 'Children', 'HasOrNot', 'residenceNature', 'JobLevel', 'employeeType', 'employeeStatus', 'postType', 'leaveType', 'leaveReason'])
    this.fetchData()
  },
  activated() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.personnelId) {
        this.loading = true
        employeeDetail(this.personnelId).then(({ data }) => {
          this.optimisticLock = data.optimisticLock
          this.ruleForm = data
          this.loading = false
          // 拼接籍贯，户口所在地，现住址
          this.ruleForm.nativePlace = data.nativePlace.split(',')
          this.ruleForm.residencePlace = data.residencePlace.split(',')
          this.ruleForm.currentPlace = data.currentPlace.split(',')
          // 离职等一系列字段
          if (this.ruleForm.employeeStatus === 'Leave') {
            this.statusVisitable = true
            if (this.ruleForm.leaveType === 'Other') {
              this.leaveReasonVisitable = true
            }
          }
          const { id } = this.ruleForm
          this.uploadData.businessDataId = id
          this.fetchFileList(id, 'baseInfo')
          this.fetchFileList(id, 'idCard')
          this.fetchFileList(id, 'degreeCard')
          this.fetchFileList(id, 'educationCard')
          // this.getImg(id)
        })
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
          case 'degreeCard':
            this.degreeList = data
            this.degreeList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            break
          case 'educationCard':
            this.educationList = data
            this.educationList.map(item => {
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
    addOrEdit() {
      const { employeeStatus } = this.ruleForm
      return new Promise((resolve, reject) => {
        if (employeeStatus === 'Leave') {
          this.$confirm('该员工已卸任，其任职岗位将被卸任，是否继续!', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.addOrEditApi().then(data => {
              resolve(data)
            })
          }).catch(() => {})
        } else {
          this.addOrEditApi().then(data => {
            resolve(data)
          })
        }
      })
    },
    addOrEditApi() {
      return new Promise((resolve, inject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (!this.idCardList.length) {
              this.$message.warning('请上传身份证')
              return
            }
            const { education, degree } = this.ruleForm
            if (education === 'University' || education === 'PostGraduate') {
              if (!this.degreeList.length) {
                this.$message.warning('请上传学历证')
                return
              }
            }
            if (degree === 'Bachelor' || degree === 'Master' || degree === 'Doctor') {
              if (!this.educationList.length) {
                this.$message.warning('请上传学位证')
                return
              }
            }
            const { nativePlace, residencePlace, currentPlace } = this.ruleForm
            const params = {
              Loading: true,
              ...this.ruleForm,
              id: this.uploadData.businessDataId,
              nativePlace: nativePlace.toString(),
              residencePlace: residencePlace.toString(),
              currentPlace: currentPlace.toString(),
              optimisticLock: this.optimisticLock
            }
            if (typeof params.birthday === 'string' && params.birthday.indexOf('-') === -1) {
              params.birthday = params.birthday.slice(0, 4) + '-' + params.birthday.slice(4, 6) + '-' + params.birthday.slice(6, 8)
            }
            if (typeof params.birthday === 'object') {
              params.birthday = parseTime(params.birthday, 'y-m-d')
            }
            if (this.personnelId) {
              editEmployee(params, this.personnelId).then(({ data: { id, optimisticLock }}) => {
                this.$message.success('修改成功!')
                this.optimisticLock = optimisticLock
                if (this.$route.query.type === 'edit') {
                  this.fetchData()
                }
                resolve(id)
              })
            } else {
              saveEmployee(params).then(({ data: { id }}) => {
                this.$message.success('保存成功!')
                resolve(id)
              })
            }
          } else {
            return false
          }
        })
      })
    },
    // 状态改变
    changeStatus(val) {
      const self = this.ruleForm
      if (val === 'Leave') {
        this.statusVisitable = true
        self.applyLeaveDate = ''
        self.actualLeaveDate = ''
        self.leaveType = ''
        self.leaveReason = ''
        self.otherReason = ''
      } else {
        this.leaveReasonVisitable = false
        this.statusVisitable = false
      }
    },
    // 改变离职原因
    changeLeaveReason(val) {
      if (val === 'Other') {
        this.leaveReasonVisitable = true
      } else {
        this.leaveReasonVisitable = false
      }
    },
    uploadbefore(type) {
      switch (type) {
        case 'photo':
          this.uploadData.typeCode = 'baseInfo'
          break
        case 'idCard':
          this.uploadData.typeCode = 'idCard'
          break
        case 'degreeCard':
          this.uploadData.typeCode = 'degreeCard'
          break
        case 'educationCard':
          this.uploadData.typeCode = 'educationCard'
          break
        default:
          break
      }
    },
    fileIdCardSuccess(response, file, fileList) {
      this.idCardList = fileList
      this.uploadLoading.close()
    },
    fileDegreeSuccess(response, file, fileList) {
      this.degreeList = fileList
      this.uploadLoading.close()
    },
    fileEducationSuccess(response, file, fileList) {
      this.educationList = fileList
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
    // 员工头像裁剪
    // photoClickqq() {
    //   this.$refs.dialog.show = true
    //   this.$nextTick(() => {
    //     this.$refs.cropperBox.option = {
    //       img: '',
    //       size: null,
    //       outputType: '',
    //       autoCrop: true,
    //       autoCropWidth: 130,
    //       autoCropHeight: 130,
    //       centerBox: true,
    //       fixedBox: true
    //     }
    //   })
    // },
    // getImg(id) {
    //   getIdHeadImg([id]).then(({ data }) => {
    //     if (data !== null) {
    //       this.uploadImgUrl = data[0].headImg
    //     }
    //   })
    // },
    closeDialog(type, data) {
      this.uploadImgUrl = data
      this.$refs.dialog.show = false
    }

  }
}
</script>

<style lang="less" scoped>
.base-info {
  .ruleForm {
    display: flex;
    flex-wrap: wrap;
    & > .el-form-item {
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
