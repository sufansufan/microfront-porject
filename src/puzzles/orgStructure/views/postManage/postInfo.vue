<template>
  <div class="post-info">
    <el-form ref="ruleForm" :key="key" :model="ruleForm" :rules="rules" label-width="100px" class="ruleForm">
      <el-form-item label="岗位编号" prop="postNumber">
        <el-input v-model="ruleForm.postNumber" :maxlength="20" :disabled="disabled" placeholder="请输入岗位编号" clearable />
      </el-form-item>
      <el-form-item label="岗位名称" prop="postName">
        <el-input v-model="ruleForm.postName" :maxlength="20" :disabled="disabled" placeholder="请输入岗位名称" clearable />
      </el-form-item>
      <el-form-item label="岗位类型" prop="postType">
        <el-select v-model="ruleForm.postType" :disabled="disabled || postTypeStatus" placeholder="请选择岗位类型" clearable @change="postCome">
          <el-option v-for="item in constant.OM_PM_PostType" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="岗位归属" prop="jobAttribution">
        <el-select v-model="ruleForm.jobAttribution" :disabled="disabled " placeholder="请选择岗位归属" clearable @change="ascription">
          <el-option v-for="item in OM_PM_JobAttribution" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="this.$route.query.type !== 'details' && this.$route.query.post !== 'noPost' "
        label="归属单位"
        prop="orgId"
        :rules="[
          { required: post, message: '请选择归属单位 ', trigger: 'change' }
        ]"
      >
        <el-select v-model="ruleForm.orgId" :disabled="disabled" placeholder="请选择归属单位" clearable>
          <el-option v-for="item in unitList" :key="item.id" :label="item.orgName" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="岗位类别" prop="postClassify">
        <el-select v-model="ruleForm.postClassify" :disabled="disabled || disJpostType " placeholder="请选择岗位类别" clearable>
          <el-option v-for="item in jpostType" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="岗位级别" prop="postLevel">
        <el-input v-model="ruleForm.postLevel" :disabled="disabled" placeholder="请输入岗位级别" clearable />
      </el-form-item>
      <el-form-item label="上级岗位">
        <el-cascader
          v-model="ruleForm.parentId"
          :disabled="disabled"
          placeholder="请选择上级岗位"
          clearable
          :options="superiorPost"
          :props="{label: 'postName', value: 'id', checkStrictly: true}"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item v-show="unit && disabled" label="状态" prop="state">
        <el-select v-model="ruleForm.postState" :disabled="disabled" placeholder="请选择状态" clearable>
          <el-option v-for="item in constant.postState" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="技术要求" class="full-width row-label" prop="specifications">
        <el-input v-model="ruleForm.specifications" type="textarea" :rows="3" :disabled="disabled" placeholder="请输入技术要求" clearable :maxlength="255" />
      </el-form-item>
      <el-form-item label="岗位职责" class="full-width row-label" prop="responsibility">
        <el-input v-model="ruleForm.responsibility" type="textarea" :rows="3" :disabled="disabled" placeholder="请输入岗位职责" clearable :maxlength="255" />
      </el-form-item>
      <el-form-item label="附件" class="full-width">
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
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled">上传附件</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过50M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" class="full-width row-label" prop="remark">
        <el-input v-model="ruleForm.remark" type="textarea" :rows="3" :disabled="disabled" placeholder="请输入备注" clearable :maxlength="255" />
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button v-show="disabled" type="primary" @click="ViewPower">查看权限</el-button>
      <el-button v-show="save" type="primary" @click="submit">保存</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import { addPost, updatePost, getprePost, getDetails, verificationPost } from '@core/api/post'
import { getAllUnit } from '@core/api/organization'
import { mapGetters } from 'vuex'
import { getSessionStorage } from '@core/utils/auth'
import upload from '@core/mixins/upload'
import { validateInteger, validateLength } from '@core/utils/validate'
// import { filterListData } from '@core/utils'
export default {
  name: 'PostInfo',
  mixins: [upload],
  data() {
    var validInteger = (rule, value, callback) => {
      if (!validateInteger(value)) {
        callback(new Error('请输入正整数'))
      } else if (value.length > 1) {
        callback('岗位级别不能大于9')
      } else {
        callback()
      }
    }
    var validatePostNumber = (rule, value, callback) => {
      var params = {
        postNumber: this.ruleForm.postNumber,
        id: this.$route.query.id
      }
      verificationPost(params).then(res => {
        if (res && res.data === true) {
          callback()
        } else if (res && res.data === false) {
          callback('岗位编号已存在，请重新输入')
        }
      })
    }
    var validatePostName = (rule, value, callback) => {
      var params = {
        postName: this.ruleForm.postName,
        id: this.$route.query.id
      }
      verificationPost(params).then(res => {
        if (res && res.data === true) {
          callback()
        } else if (res && res.data === false) {
          callback('岗位名称已存在，请重新输入')
        }
      })
    }
    return {
      disabled: true,
      disJpostType: false,
      save: true,
      post: true,
      unit: true,
      ruleForm: {
        postNumber: '',
        postName: '',
        postType: '',
        jobAttribution: '',
        orgId: '',
        postClassify: '',
        postLevel: '',
        parentId: [],
        cascadeParentId: '',
        specifications: '',
        responsibility: '',
        remark: '',
        postState: '',
        orgType: ''
      },
      postClassify: [], // 岗位类别
      rules: {
        postNumber: [{ required: true, message: '请输入岗位编号', trigger: 'blur' }, { required: true, validator: validatePostNumber, trigger: 'blur' }, validateLength(0, 20)],
        postName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }, { required: true, validator: validatePostName, trigger: 'blur' }, validateLength(0, 50)],
        postType: [{ required: true, message: '请选择岗位类型', trigger: 'change' }],
        jobAttribution: [{ required: true, message: '请选择岗位归属', trigger: 'change' }],
        parentId: [{ required: true, message: '请选择上级岗位', trigger: 'change' }],
        postClassify: [{ required: true, message: '请选择岗位类别', trigger: 'change' }],
        postLevel: [{ required: true, message: '请输入岗位级别', trigger: 'change' }, { required: true, validator: validInteger, trigger: 'blur' }],
        responsibility: [{ required: true, message: '请输入岗位职责', trigger: 'blur' }, validateLength(0, 255)],
        specifications: [validateLength(0, 255)],
        remark: [validateLength(0, 255)]
      },
      superiorPost: [],
      unitList: [],
      options: [],
      powerList: {},
      jobAttribution: [],
      userInfoList: {},
      OM_PM_JobAttribution: [],
      jpostType: [],
      key: 0,
      postTypeStatus: false,
      isPostNumber: false
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    'ruleForm.jobAttribution'(newV) {
      if (newV) {
        this.findAllPost()
      }
    },
    'ruleForm.orgId'(newV) {
      if (newV) {
        this.findAllPost()
      }
    }
  },
  created() {
    this.search = this.$route.query.search
    const { mainBusiness } = JSON.parse(getSessionStorage('navInfo'))
    this.$store.dispatch('getConstant', ['postType', 'postState', 'OM_PM_PostType', 'OM_PM_JobAttribution']).then(() => {
      // this.findAllPost()
      this.getUnit()
      const { type, post } = this.$route.query
      if (type === 'add') {
        this.disabled = false
      } else if (type === 'edit') {
        this.disabled = false
        this.getDetails()
      } else {
        this.disabled = true
        this.save = false
        this.getDetails()
      }
      this.post = post === 'post'
      this.unit = post === 'post'
      if (mainBusiness !== 'JZZS') {
        this.constant.OM_PM_PostType = this.constant.OM_PM_PostType.filter(item => item.code === 'constructionTeamPost')
        this.ruleForm.postType = 'constructionTeamPost'
        this.postCome('constructionTeamPost')
        this.ascription('positionOfSubCompany')
        this.postTypeStatus = true
      }
      // if (post === 'noPost') {
      //   this.ruleForm.jobAttribution = 'jobAttribution'
      // }
      this.uploadData.typeCode = 'postManageFile'
    })
  },
  methods: {
    postCome(o) {
      this.ruleForm.jobAttribution = ''
      this.ruleForm.postClassify = ''
      // this.key += 1
      if (o === 'constructionTeamPost') { // 内部岗位
        const { mainBusiness } = JSON.parse(getSessionStorage('navInfo'))
        if (mainBusiness !== 'JZZS') {
          // this.constant.OM_PM_JobAttribution.filter(item => (item.code !== 'projectPost' && item.code !== 'positionOfBranchCompany'))
          this.OM_PM_JobAttribution = this.constant.OM_PM_JobAttribution.filter(item => (item.code !== 'projectPost' && item.code !== 'positionOfBranchCompany'))
          this.ruleForm.jobAttribution = 'companyPost'
          this.findAllPost()
        } else {
          // this.ruleForm.jobAttribution = 'companyPost'
          this.OM_PM_JobAttribution = this.constant.OM_PM_JobAttribution.filter(item => item.code !== 'positionOfSubCompany')
        }
      } else if (o === 'externalContactsPost') { // 外部
        this.OM_PM_JobAttribution = this.constant.OM_PM_JobAttribution.filter((val, index) => index === 1)
        this.ruleForm.postClassify = 'Common'
        this.disJpostType = true
        this.jpostType = this.constant.postType.filter((val, index) => index === 0)
      } else if (o === 'constructionPost') { // 施工队
        this.ruleForm.postClassify = 'Common'
        this.disJpostType = true
        this.OM_PM_JobAttribution = this.constant.OM_PM_JobAttribution.filter((val, index) => index === 1)
      }
    },
    ascription(e) {
      const { post } = this.$route.query
      if (e === 'projectPost') {
        if (post === 'noPost') {
          this.jpostType = this.constant.postType.filter((val, index) => index !== 2)
        } else {
          if (this.ruleForm.postType === 'constructionPost') { // 施工队
          // 岗位类别
            this.jpostType = this.constant.postType.filter((val, index) => index === 1)
          } else {
            this.jpostType = this.constant.postType.filter((val, index) => index === 0)
          }
        }
      } else if (e === 'positionOfBranchCompany' || e === 'companyPost' || e === 'positionOfSubCompany') {
        this.disJpostType = false
        this.jpostType = this.constant.postType
      }
    },

    getDetails() {
      getDetails(this.$route.query.id).then(({ data }) => {
        this.powerList = data
        const { postNumber, postName, postType, jobAttribution, orgId, postClassify, postLevel,
          specifications, responsibility, remark, cascadeParentId, id, state } = data
        this.postCome(postType)
        this.uploadData.businessDataId = id
        this.getFile()
        this.ruleForm = {
          postNumber,
          postName,
          postType,
          jobAttribution,
          orgId,
          postClassify,
          postLevel,
          parentId: cascadeParentId && cascadeParentId.split(',') || [],
          specifications,
          responsibility,
          remark,
          postState: state
        }
        this.ascription(jobAttribution)
      })
    },
    findAllPost() {
      const params = {
        jobAttribution: this.ruleForm.jobAttribution,
        orgId: this.ruleForm.orgId ? this.ruleForm.orgId : null
      }
      getprePost(params).then(res => {
        const handlerPost = (list) => {
          return list.map(item => {
            if (item.id === this.$route.query.id) {
              item.disabled = true
              return item
            } else if (item.children && item.children.length) {
              handlerPost(item.children)
            }
            return item
          })
        }
        this.superiorPost = handlerPost(res.data)
      })
    },
    ViewPower() {
      const { postName, postNumber, id } = this.powerList
      this.$router.push({ name: 'seePostAuthority', query: { postName, postNumber, id }})
    },
    getUnit() {
      this.post = true
      getAllUnit().then(res => {
        this.unitList = res.data
      })
    },
    submit() {
      const { mainBusiness } = JSON.parse(getSessionStorage('navInfo'))
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { parentId, jobAttribution, orgId } = this.ruleForm
          var params = {
            Loading: true,
            ...this.ruleForm,
            orgType: mainBusiness,
            jobAttribution: jobAttribution,
            parentId: parentId[parentId.length - 1],
            cascadeParentId: parentId.toString(),
            id: this.uploadData.businessDataId
          }
          const { post, type, id } = this.$route.query
          if (type === 'add') {
            if (post !== 'post') delete params.orgId
            addPost(params).then(res => {
              this.$message.success('新增成功')
              this.$router.go(-1)
            })
          } else {
            params = {
              ...params,
              orgType: mainBusiness,
              orgId: orgId || null
            }
            updatePost(params, id).then(res => {
              this.$message.success('修改成功')
              this.$router.go(-1)
            })
          }
        } else {
          return
        }
      })
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
    }
  }
}
</script>

<style lang="less" scoped>
	.post-info {
		padding: 10px;
		height: calc(100vh - 140px);
		overflow-y: auto;

		.ruleForm {
			display: flex;
			flex-wrap: wrap;

			&>.el-form-item {
				width: 50%;
			}

			.el-select,
			.el-input {
				width: 100%;
			}

			.full-width {
				width: 100%;
			}
		}

		.btn {
			display: flex;
			justify-content: center;
			margin: 30px 0px;
		}
	}
</style>
