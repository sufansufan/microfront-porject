<template>
  <div class="set-construction-team">
    <jdy-title-name :title="getTitle" />
    <search-bar
      :select-list="selectList"
      :btn-list="btnList"
      :search="search"
      @changeSearch="changeSearch"
    />
    <comm-table
      ref="commTable"
      v-loading="loading"
      :single-selected="true"
      :columns="columns"
      :table-options="tableOptions"
      :data="tableData"
      :count="total"
    />
  </div>
</template>

<script>
import setConstructionTeam from './searchTableData/setConstructionTeam'
import search from '@core/mixins/search'
import { getTeamoGroupTree, deleteTeamoGroup, exportTeamorGroup } from '@core/api/projectManage/projectmanager'
import { treeChildrenEmpty, exportExcel, handlerSearchBar, parseTime, codeChangeName } from '@core/utils'
import { mapGetters } from 'vuex'
export default {
  mixins: [setConstructionTeam, search],
  data() {
    return {
      loading: true,
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['constant']),
    getTitle() {
      return this.$route.query.projectName
    }

  },
  created() {
    this.$store.dispatch('getConstant', ['teamLevel']).then(() => {
      const { teamLevel } = this.constant
      this.selectList = handlerSearchBar(this.selectList, [2], [teamLevel])
    })
    this.fetchData()
  },
  methods: {
    // 导出花名册
    handleExportTeam() {
      const { projectId } = this.$route.query
      // 如果选了某行数据
      if (this.getMultipleSelection()) {
        if (this.getMultipleSelection().level === '02') {
          this.$message.warning('只能导出工程下所有施工队或某个施工队的花名册')
        } else if (this.getMultipleSelection().level === '01') {
          const { id } = this.getMultipleSelection()
          const params = {
            Loading: true,
            id: id,
            projectId: projectId
          }
          exportTeamorGroup(params).then(res => {
            exportExcel(res, ``)
          })
        }
      } else {
        const params = {
          Loading: true,
          projectId: projectId
        }
        exportTeamorGroup(params).then(res => {
          exportExcel(res, ``)
        })
      }
    },
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const params = {
        ...this.search,
        propertyName: 'code',
        projectId: this.$route.query.projectId,
        ascending: true,
        ...this.sortData,
        isRoot: false
      }
      getTeamoGroupTree(params).then(({ data }) => {
        if (data) {
          this.tableData = this.getTreeName(treeChildrenEmpty(data, 'child'))
        } else {
          this.tableData = []
        }
        this.loading = false
      })
    },
    getTreeName(data) {
      data.map(ele => {
        ele.levelName = codeChangeName(this.constant.teamLevel, ele.level)
        ele.approachDate = parseTime(ele.approachDate, 'y-m-d')
        ele.exitDate = parseTime(ele.exitDate, 'y-m-d')
        if (ele.child && ele.child.length > 0) {
          this.getTreeName(ele.child)
        }
        return ele
      })
      return data
    },
    // 获得单选元素
    getMultipleSelection() {
      return this.$refs['commTable'].multipleSelection[0]
    },
    checkOnofTableData() {
      return this.$refs.commTable.onlyOneData()
    },
    handleAddTeam(type, row) {
      const { projectId, projectName, startDate, realStartDate } = this.$route.query
      switch (type) {
        case 'team':
          this.$router.push({ name: 'buildAdd', query: { type: 'add', typePage: 'team', projectId, projectName, startDate, realStartDate }})
          break
        case 'group':
          if (this.getMultipleSelection() && this.getMultipleSelection().level === '01') {
            const row = this.getMultipleSelection()
            const { id, name } = row
            this.$router.push({ name: 'buildAdd', query: { type: 'add', typePage: 'group', projectId, projectName, teamId: id, teamName: name, teamRow: row }})
          } else {
            this.$message.warning('请选择一个施工队')
          }
          break
        case 'edit': {
          if (!this.checkOnofTableData()) return
          const { level, id, chargePersonTel, name, agentPersonTel } = this.getMultipleSelection()
          this.$router.push({ name: 'buildEdit', query: { type: 'edit', projectId, projectName, level, teamId: id, teamName: name, chargePersonTel, agentPersonTel }})
          break
        }
        case 'details': {
          const { level, id, chargePersonTel, agentPersonTel, name } = row
          this.$router.push({ name: 'buildEdit', query: { type: 'details', projectId, projectName, level, teamId: id, chargePersonTel, teamName: name, agentPersonTel }})
          break
        }

        default:
          break
      }
    },

    // 删除
    handleDeleteTeam() {
      if (this.getMultipleSelection()) {
        const { id } = this.getMultipleSelection()
        // 施工队
        if (this.getMultipleSelection().level === '01') {
          this.$confirm('确定要删除该施工队吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteTeamoGroup(id).then(res => {
              this.$message.success('删除成功!')
              this.fetchData('query')
            })
          })
        } else if (this.getMultipleSelection().level === '02') {
          this.$confirm('确定要删除该施工班组吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteTeamoGroup(id).then(res => {
              this.$message.success('删除成功!')
              this.fetchData('query')
            })
          })
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.set-construction-team {
  padding:10px;
}
</style>
<style lang="less">
.set-construction-team {
 .el-table__body-wrapper {
    max-height: calc(100vh - 255px);
  }
}
</style>
