<template>
  <div class="team-info">
    <div style="padding:10px">
      <el-button v-if="isDetails" class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-form ref="ruleForm" v-loading="loading" :rules="rules" :model="ruleForm" label-width="110px" class="rule-form-flex">
      <el-form-item label="编号" prop="code">
        <el-input
          v-model.trim="ruleForm.code"
          clearable
          placeholder="请输入编号"
          :maxlength="6"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model.trim="ruleForm.name"
          clearable
          placeholder="请输入名称"
          :maxlength="20"
          :disabled="isDetails"
          @blur="handleName"
        />
      </el-form-item>

      <el-form-item label="级别" prop="level">
        <jdy-select
          v-model="ruleForm.level"
          :disabled="isDetails || addTeam || addGroup || isEdit"
          holder="级别"
          :select-data="constant.teamLevel"
        />
      </el-form-item>
      <el-form-item v-if="addGroup || editGroup" label="所属施工队" prop="parentId">
        <jdy-select
          v-model="ruleForm.parentId"
          :disabled="isDetails || addTeam || addGroup || isEdit"
          holder="所属施工队"
          :select-data="parentIdList"
          :select-options="{label: 'parentName', value: 'parentId'}"
        />
      </el-form-item>
      <el-form-item v-if="addTeam || editTeam" label="所属公司" prop="cooperativeUnitId">
        <jdy-select
          v-model="ruleForm.cooperativeUnitId"
          :is-cascader="true"
          :is-model-name="true"
          :select-data="cooperatunitsList"
          holder="所属公司"
          :disabled="isDetails || isEdit"
          :select-options="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'list',checkStrictly: true }"
          :model-name.sync="ruleForm.cooperativeUnitName"
        />

      </el-form-item>
      <template v-if="editTeam || editGroup">
        <el-form-item label="负责人" prop="chargePersonId">
          <jdy-select
            v-model="ruleForm.chargePersonId"
            :disabled="isDetails"
            holder="负责人"
            :select-data="chargePersonList"
            :select-options="{label: 'name', value: 'id'}"
            :model-name.sync="chargePersonName"
            @change="handleChargePerson"
          />

        </el-form-item>
        <el-form-item label="负责人联系电话" prop="chargePersonTel">
          <el-input
            v-model.trim="ruleForm.chargePersonTel"
            clearable
            placeholder="请输入负责人联系电话"
            :maxlength="11"
            :disabled="isDetails || isEdit"
          />
        </el-form-item>
      </template>
      <template v-if="editTeam">
        <el-form-item label="代班" prop="agentPersonId">
          <jdy-select
            v-model="ruleForm.agentPersonId"
            :disabled="isDetails"
            holder="代班"
            :select-data="chargePersonList"
            :model-name.sync="agentPersonName"
            :select-options="{label: 'name', value: 'id'}"
            @change="handleAgentPerson"
          />
        </el-form-item>
        <el-form-item label="代班联系电话" prop="agentPersonTel">
          <el-input
            v-model.trim="ruleForm.agentPersonTel"
            :maxlength="11"
            clearable
            placeholder="请输入代班联系电话"
            :disabled="isDetails ||isEdit"
          />
        </el-form-item>
      </template>
      <el-form-item label="进场日期" prop="approachDate">
        <el-date-picker
          v-model="ruleForm.approachDate"
          type="date"
          placeholder="请选择进场日期"
          clearable
          :disabled="isDetails"
          :picker-options="startPickerDateTime"
        />
      </el-form-item>
      <el-form-item label="退场日期" prop="exitDate">
        <el-date-picker
          v-model="ruleForm.exitDate"
          type="date"
          placeholder="请选择退场日期"
          clearable
          :disabled="isDetails"
        />
      </el-form-item>
      <el-form-item label="简介" class="one-width" prop="introduction">
        <el-input v-model.trim="ruleForm.introduction" type="textarea" :maxlength="255" :rows="3" :disabled="isDetails" placeholder="请输入简介" />
      </el-form-item>
      <el-form-item label="备注" class="one-width" prop="remark">
        <el-input v-model.trim="ruleForm.remark" type="textarea" :maxlength="255" :rows="3" :disabled="isDetails" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <div v-if="isEdit" class="rule-form-btn-box">
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import { validateLength, validateOnlyCode } from '@core/utils/validate'
import { mapGetters } from 'vuex'
import { getGenerateCode, getmyCooperatunits, validateUnique, addTeamoGroup, editTeamoGroup, getTeamoGroup, getPersonList } from '@core/api/projectManage/projectmanager'
import { getSessionStorage } from '@core/utils/auth'
import { treeChildrenEmpty } from '@core/utils'
import { endPickerDate } from '@core/utils'
export default {
  props: {
    resData: {
      type: Object,
      default: () => {}
    },
    teamogroupId: {
      type: String,
      default: ''
    }
  },
  data() {
    const validatePersonId = (rule, value, callback) => {
      if (this.ruleForm.agentPersonId !== '') {
        if (this.ruleForm.chargePersonId === this.ruleForm.agentPersonId) {
          callback(new Error('代班不能与负责人相同'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    /**
     chargePersonTel 负责人联系电话
     agentPersonTel 代班
     projectId 项目id
    */
    const { teamId, typePage } = this.$route.query
    return {
      loading: false,
      ruleForm: {
        code: '', // 编号
        name: '', // 名称
        level: this.$route.query.typePage === 'team' ? '01' : '02', // 级别
        cooperativeUnitId: [], // 所属公司
        cooperativeUnitName: [], // 所属公司名称
        parentId: '', // 所属施工队
        parentName: '',
        approachDate: '', // 进场日期
        exitDate: '', // 退场日期
        chargePersonId: '', // 负责人
        chargePersonName: '',
        chargePersonTel: '', // 负责人联系电话
        agentPersonId: '', // 代班
        agentPersonName: '',
        agentPersonTel: '', // 代班联系电话
        introduction: '', // 简介
        remark: '', // 备注
        optimisticLock: ''
      },
      rules: {
        code: [{ required: true, validator: (rule, value, callback) => { validateOnlyCode(rule, value, callback, validateUnique({ code: value, id: typePage ? this.resData.id : teamId }), '06') }, trigger: 'blur' }, validateLength(0, 6)],
        chargePersonTel: [validateLength(0, 11)],
        agentPersonTel: [validateLength(0, 11)],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }, { required: true, validator: (rule, value, callback) => { validateOnlyCode(rule, value, callback, validateUnique({ name: value, id: typePage ? this.resData.id : teamId }), '07') }, trigger: 'blur' }, validateLength(0, 20)],
        level: [{ required: true, message: '请选择级别', trigger: 'change' }],
        cooperativeUnitId: [{ required: true, message: '请选择所属公司', trigger: 'change' }],
        approachDate: [{ required: true, message: '请选择进场日期', trigger: 'change' }],
        exitDate: [{ required: true, message: '请选择退场日期', trigger: 'change' }],
        introduction: [validateLength(0, 255)],
        remark: [validateLength(0, 255)],
        chargePersonId: [{ required: true, message: '请选择负责人', trigger: 'change' }, { validator: validatePersonId, tirgger: 'change' }],
        agentPersonId: [{ validator: validatePersonId, tirgger: 'change' }]
      },
      chargePersonList: [],
      parentIdList: [],
      cooperatunitsList: []
    }
  },
  computed: {
    ...mapGetters(['constant']),
    addTeam() {
      return this.$route.query.typePage === 'team'
    },
    editTeam() {
      return this.$route.query?.level === '01'
    },
    addGroup() {
      return this.$route.query.typePage === 'group'
    },
    editGroup() {
      return this.$route.query?.level === '02'
    },
    isDetails() {
      return this.$route.query.type === 'details'
    },
    isEdit() {
      return this.$route.query.type === 'edit'
    },
    startPickerDateTime() {
      const { startDate, realStartDate } = this.$route.query
      const startDateTime = new Date(startDate).getTime()
      const realStartDateTime = new Date(realStartDate).getTime()
      var disabledDate = ''
      if (!startDateTime && realStartDateTime) {
        disabledDate = realStartDateTime
      } else if (startDateTime && !realStartDateTime) {
        disabledDate = realStartDateTime
      } else if (startDateTime && realStartDateTime) {
        if (startDateTime < realStartDateTime) {
          disabledDate = startDateTime
        } else {
          disabledDate = realStartDateTime
        }
      }
      return endPickerDate(disabledDate)
    }

  },
  watch: {
    teamogroupId: {
      handler(v) {
        if (v) {
          this.getTeamoGroupMes()
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    console.log(this.teamRow, 'teamRow')
    const { typePage, teamId, type, teamRow } = this.$route.query
    this.$store.dispatch('getConstant', ['teamLevel']).then(() => {})
    if (typePage === 'group') {
      this.parentIdList.push(teamRow)
      this.parentIdList.map((item) => {
        item.parentId = item.id
        item.parentName = item.name
        return item
      })
      this.ruleForm.parentId = teamId
    }
    this.getCooperatunitList()
    if (type === 'edit' || type === 'details') this.getPersonelList()
    if (typePage) this.getTeamcode()
    if ((type === 'edit' || type === 'details') && teamId) this.getTeamoGroupMes()
  },
  methods: {
    // 获取详情
    getTeamoGroupMes() {
      this.loading = true
      const { teamId } = this.$route.query
      getTeamoGroup(this.teamogroupId || teamId).then(({ data }) => {
        this.parentIdList.push(data)
        this.loading = false
        const { cooperativeUnitId } = data
        this.ruleForm = {
          ...data,
          cooperativeUnitId: cooperativeUnitId ? cooperativeUnitId.split(',') : []
        }
      })
    },
    handleChargePerson(value) {
      if (this.chargePersonList && this.chargePersonList.length > 0) {
        this.chargePersonList.forEach(item => {
          if (item.id === value) {
            this.ruleForm.chargePersonTel = item.telephone
            this.ruleForm.chargePersonName = item.name
          }
        })
      }
    },
    handleAgentPerson(value) {
      if (this.chargePersonList && this.chargePersonList.length > 0) {
        this.chargePersonList.forEach(item => {
          if (item.id === value) {
            this.ruleForm.agentPersonTel = item.telephone
            this.ruleForm.agentPersonName = item.name
          }
        })
      }
    },
    // 获取编号
    getTeamcode() {
      const { typePage, teamId } = this.$route.query
      const params = {
        level: typePage === 'team' ? '01' : '02',
        id: typePage === 'team' ? null : teamId
      }
      getGenerateCode(params).then(({ data }) => {
        this.ruleForm.code = data
      })
    },
    // 获取负责人
    getPersonelList() {
      const { teamId, level } = this.$route.query
      const params = {
        constructionTeamId: level === '01' ? teamId : null,
        constructionTeamIdLike: level === '01' ? null : teamId,
        stateNotEquals: '03'
      }
      getPersonList(params).then(({ data }) => {
        this.chargePersonList = data
      })
    },
    // 获取所属公司
    getCooperatunitList() {
      getmyCooperatunits(getSessionStorage('rootOrgId')).then(({ data }) => {
        this.cooperatunitsList = treeChildrenEmpty(data, 'list')
      })
    },
    handleName() {
      this.$emit('childEvent', this.ruleForm.name)
    },
    addOrEditTeamInfo() {
      return new Promise((resolve, inject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const { projectId, projectName, typePage, teamName } = this.$route.query
            const { parentId, cooperativeUnitId, cooperativeUnitName, optimisticLock } = this.ruleForm
            const { optimisticLock: optimisticLockName } = this.resData
            var params = {
              Loading: true,
              ...this.ruleForm,
              cooperativeUnitId: typePage === 'team' ? cooperativeUnitId.toString() : null,
              cooperativeUnitName: typePage === 'team' ? cooperativeUnitName.toString() : null,
              projectId: projectId,
              projectName: projectName,
              parentId: typePage === 'team' ? null : parentId, // 施工队id
              parentName: typePage === 'team' ? null : teamName, // 施工队名称
              parentPath: typePage === 'team' ? null : parentId, // 施工队id 施工班组id
              optimisticLock: optimisticLock || optimisticLockName
            }
            if (this.teamogroupId) {
              editTeamoGroup(params, this.teamogroupId).then(({ data }) => {
                this.$message.success('修改成功')
                resolve(data)
              })
            } else {
              delete params.optimisticLock
              addTeamoGroup(params).then(({ data }) => {
                this.$message.success('保存成功!')
                resolve(data)
              })
            }
          } else {
            inject()
            return false
          }
        })
      })
    },
    submit() {
      const { projectId, projectName, level, teamId } = this.$route.query
      const { cooperativeUnitId, parentId, parentName, cooperativeUnitName } = this.ruleForm
      var params = {
        Loading: true,
        ...this.ruleForm,
        cooperativeUnitId: level === '01' ? cooperativeUnitId.toString() : null,
        cooperativeUnitName: level === '01' ? cooperativeUnitName : null,
        projectId: projectId,
        projectName: projectName,
        parentId: level === '01' ? null : parentId, // 施工队id
        parentName: level === '01' ? null : parentName, // 施工队名称
        parentPath: level === '01' ? null : parentId // 施工队id 施工班组id

      }
      editTeamoGroup(params, teamId).then(({ data }) => {
        this.$message.success('修改成功')
        this.$router.go(-1)
      })
    }

  }
}
</script>

<style lang="less" scoped>
.team-info {
  .rule-form-flex {
    display: flex;
    flex-wrap: wrap;
    & > .el-form-item {
      width: 50%;
    }
  }
}
</style>
