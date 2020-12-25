<template>
  <div v-loading="loading" class="project-info">
    <project-title-info ref="projectTitle" :disabled="isDetail">
      <div v-if="isAdd" class="btn">
        <el-button type="primary" class="btn" @click="onSave">保存</el-button>
      </div>
    </project-title-info>
  </div>
</template>

<script>
import { getProjectInfo, updateProjectInfo } from '@core/api/projectManage/projectmanager'
export default {
  components: {
    ProjectTitleInfo: () => import('./ProjectTitleInfo')
  },
  provide() {
    return {
      getRuleForm: this.getRuleForm
    }
  },
  data() {
    return {
      ruleForm: {},
      loading: false
    }
  },
  computed: {
    isAdd() {
      return this.$route.query.type === 'add'
    },
    isDetail() {
      return this.$route.query.type === 'details'
    }
  },
  created() {
    this.fetchContactInfo()
  },
  methods: {
    fetchContactInfo() {
      const { contactId } = this.$route.query
      this.loading = true
      getProjectInfo(contactId).then(({ data: { contractDTO, projectDTO }}) => {
        const { delayTime, projectRemark, realEndDate, realStartDate, realTime } = projectDTO
        this.ruleForm = {
          ...contractDTO,
          delayTime,
          projectRemark,
          realEndDate,
          realStartDate,
          realTime
        }
        this.$emit('getTitleName', contractDTO.name)
        this.loading = false
        this.getRuleForm()
        this.$store.commit('SET_PROJECTINFO', this.ruleForm)
      })
    },
    getRuleForm() {
      return Promise.resolve(this.ruleForm)
    },
    onSave() {
      // 校验逻辑
      const data = this.$refs.projectTitle.submit()
      if (Object.keys(data).length > 0) {
        const { projectSite } = data
        const params = {
          Loading: true,
          ...data,
          projectSite: projectSite.toString()
        }
        updateProjectInfo(params).then(() => {
          this.$message.success('修改成功')
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.project-info {
  .btn {
    width: 60px;
    margin: 10px auto;
  }
}
</style>
