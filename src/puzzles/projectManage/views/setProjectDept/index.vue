<template>
  <div class="project-manage">
    <search-bar
      :select-list="selectList"
      :btn-list="btnList"
      :search="search"
      @changeSearch="changeSearch"
    >
      <div slot="searchBar4" class="external">
        <span>合同归属</span>
        <jdy-select
          v-model="search.attribution"
          holder="项目归属"
          :select-data="attributionList"
          style="width: 190px"
          @change="attributionChange"
        />
        <jdy-select
          v-model="search.company"
          holder="归属单位"
          :select-data="companyList"
          :select-options="{value: 'id', label: 'orgName'}"
        />
      </div>
    </search-bar>
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
import searchTableData from './searchTableData'
import search from '@core/mixins/search'
import { parseTime, handlerSearchBar, filterListData, codeChangeName } from '@core/utils'
import { getSessionStorage } from '@core/utils/auth'
import { getProjectDeptList, createProjectDept, projectOrgType, getProjectDeptNopage } from '@core/api/projectManage/projectmanager'
import { getOrganizationByBelongList } from '@core/api/organization'
import { mapGetters, mapActions } from 'vuex'

export default {
  mixins: [searchTableData, search],
  data() {
    return {
      total: 0,
      loading: false,
      tableData: [],
      projectNameList: [],
      attributionList: [],
      companyList: [],
      search: {
        attribution: '',
        belongOrgId: ''
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    Promise.all([this.fetchDataNopage(), this.getConstant(['nativePlace', 'EngineeringStatus'])]).then(() => {
      const { nativePlace, EngineeringStatus } = this.constant
      this.selectList = handlerSearchBar(this.selectList, [1, 2, 5], [this.projectNameList, nativePlace, EngineeringStatus])
    })
    this.getprojectOrgType()
    this.fetchData()
  },
  methods: {
    ...mapActions(['getConstant']),
    handleAddProject(type, row) {
      const { onlyOneData, multipleSelection } = this.$refs.commTable
      if (type === 'add') {
        if (!onlyOneData()) return
        const id = multipleSelection[0].id
        this.createProject(id).then(projectId => {
          this.goProjectDept({ type, projectId, contactId: id })
        })
      } else {
        const { projectId, id: contactId } = row
        this.goProjectDept({ type, projectId, contactId })
      }
    },
    goProjectDept({ type, projectId, contactId }) {
      this.$router.push({ name: 'projectDept', query: { type, projectId, contactId }})
    },
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const params = {
        ...this.search,
        projectSite: this.search.projectSite.toString(),
        page: this.page ? this.page - 1 : 0,
        size: this.size || 10,
        ...this.sortData
      }
      getProjectDeptList(params).then(({ data: { content, total }}) => {
        this.tableData = content.map(item => {
          item.startDate = parseTime(item.startDate, 'y-m-d')
          item.endDate = parseTime(item.endDate, 'y-m-d')
          item.projectStateName = codeChangeName(this.constant.EngineeringStatus, item.projectState)
          return item
        })
        this.loading = false
        this.total = total
      })
    },
    createProject(id) {
      return new Promise((resolve, reject) => {
        createProjectDept(id).then(({ data: { projectId }}) => {
          resolve(projectId)
        })
      })
    },
    getprojectOrgType() {
      projectOrgType().then(({ data }) => {
        const mainBusiness = JSON.parse(getSessionStorage('navInfo')).mainBusiness
        if (mainBusiness === 'JZZS') {
          this.attributionList = data
        } else {
          this.attributionList = filterListData(data, 'ProjectDepartment')
        }
      })
    },
    attributionChange(val) {
      if (val) {
        getOrganizationByBelongList(val, { componentBusinessCode: '210005' }).then(({ data }) => {
          this.companyList = data
        })
      } else {
        this.companyList = []
      }
      this.$set(this.search, 'company', '')
    },
    fetchDataNopage() {
      return new Promise((resolve, reject) => {
        return getProjectDeptNopage().then(({ data }) => {
          this.projectNameList = data
          resolve()
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.project-manage {
  padding: 10px;
}
</style>
<style lang="less">
.project-manage {
  .el-table__body-wrapper {
    max-height: calc(100vh - 400px);
  }
}
</style>
