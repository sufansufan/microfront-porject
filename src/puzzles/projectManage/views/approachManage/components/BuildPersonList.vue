<template>
  <div class="build-person-list">
    <search-bar :btn-list="btnList" :select-list="selectList" :search="search" @changeSearch="changeSearch" />
    <comm-table
      ref="commTable"
      v-loading="loading"
      :single-selected="true"
      :columns="columns"
      :table-options="tableOptions"
      :data="tableData"
      :count="total"
    />
    <drag-dialog
      ref="dialog"
      title="确认进场"
      height="80%"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="150px"
        class="rule-form-flex"
      >
        <el-form-item label="进场日期" prop="date" class="one-width">
          <el-date-picker
            v-model="ruleForm.date"
            type="date"
            placeholder="请选择进场日期"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit"> 确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import buildPersonList from '../searchTableData/buildPersonList'
import search from '@core/mixins/search'
import { buildPersonTableList, configApproach, buildPersonDownload, buildPersonMember, buildPersonEducation, buildPersonWorkType } from '@core/api/projectManage/projectmanager'
import { getSessionStorage } from '@core/utils/auth'
import { exportExcel, codeChangeName } from '@core/utils'
import { mapGetters, mapActions } from 'vuex'
import { fileLoad } from '@core/api/accessoryFile'
import { handlerSearchBar } from '@core/utils'
export default {
  mixins: [buildPersonList, search],
  data() {
    return {
      search: {},
      tableData: [],
      total: 0,
      loading: false,
      ruleForm: {
        date: ''
      },
      rules: {
        date: [{ required: true, message: '请选择进场时间', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.getConstant(['workType', 'gender', 'memberState']).then(() => {
      const { workType, memberState } = this.constant
      this.fetchData()
      this.selectList = handlerSearchBar(this.selectList, [2, 3], [workType, memberState])
    })
  },
  methods: {
    ...mapActions(['getConstant']),
    handlePersonBtn(type) {
      const { onlyOneData, multipleSelection } = this.$refs.commTable
      if (type === 'addInfo') {
        if (!onlyOneData()) return
        this.$emit('buildTabCom', { name: 'BuildPersonInfo', rowData: multipleSelection[0] })
      } else if (type === 'confirmInto') {
        if (multipleSelection.length) {
          this.$refs.dialog.show = true
        } else {
          this.$message.warning('请选择数据')
        }
      }
    },
    handleAddProject(type, row) {
      this.$emit('buildTabCom', { name: 'BuildPersonInfo', rowData: row, type })
    },
    fetchData() {
      this.loading = true
      const { projectId } = this.$route.query
      const params = {
        projectId,
        ...this.search,
        ...this.sortData,
        page: this.page ? this.page - 1 : 0,
        size: this.size || 10
      }
      buildPersonTableList(params).then(({ data: { content, total }}) => {
        this.loading = false
        this.tableData = content.map(item => {
          if (item.id) {
            fileLoad(item.id, 'safeEducationCard').then(({ data }) => {
              item.safeTableData = data
            })
            fileLoad(item.id, 'papers').then(({ data }) => {
              item.poperTableData = data
            })
            fileLoad(item.id, 'safeTaskBook').then(({ data }) => {
              item.bookTableData = data
            })
            item.renderTableTitleStatus = true
          }
          item.workTypeName = codeChangeName(this.constant.workType, item.workType)
          item.stateName = codeChangeName(this.constant.memberState, item.state)
          item.genderName = codeChangeName(this.constant.memberState, item.gender)
          return item
        })
        this.total = total
      })
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        const { multipleSelection } = this.$refs.commTable
        if (!multipleSelection[0].userId) {
          this.$message.warning('平台中未发现该人员三级安全教育信息,不允许进场,请确认是否为该人员录入信息')
          return
        }

        if (valid) {
          const { projectId } = this.$route.query
          const params = {
            Loading: true,
            ...this.ruleForm,
            projectId,
            userId: multipleSelection[0].userId
          }
          configApproach(params).then(() => {
            this.$refs.dialog.show = false
          })
        } else {
          return false
        }
      })
    },
    handleApproachBtn(type) {
      const { projectId } = this.$route.query
      const params = {
        projectId,
        ...this.search
      }
      if (type === 'load') {
        buildPersonDownload(params).then(res => {
          exportExcel(res, '')
        })
      } else if (type === 'table') {
        buildPersonMember(params).then(res => {
          exportExcel(res, '')
        })
      } else if (type === 'roster') {
        buildPersonEducation(params).then(res => {
          exportExcel(res, '')
        })
      } else if (type === 'specialRoster') {
        buildPersonWorkType(params).then(res => {
          exportExcel(res, '')
        })
      }
    }
  }
}
</script>

<style lang="less">
.build-person-list {
  .el-table__body-wrapper {
    max-height: calc(100vh - 500px);
  }
}
</style>
