<template>
  <div class="real-name">
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
          v-model="search.belongOrgId"
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
import { mapGetters, mapActions } from 'vuex'
import { handlerSearchBar, parseTime, codeChangeName, filterListData } from '@core/utils'
import { getSessionStorage } from '@core/utils/auth'
import { getOrganizationByBelongList } from '@core/api/organization'
import { getRealNameList, getProjectDeptNopage, projectOrgType } from '@core/api/projectManage/projectmanager'
export default {
  name: 'RealName',
  mixins: [searchTableData, search],
  data() {
    return {
      total: 0,
      loading: true,
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
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const params = {
        ...this.search,
        projectSite: this.search.projectSite.toString(),
        page: this.page ? this.page - 1 : 0,
        size: this.size || 10,
        propertyName: 'contractNumber',
        ascending: false,
        ...this.sortData
      }
      getRealNameList(params).then(({ data: { content, total }}) => {
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

    // 获得单选元素
    getMultipleSelection() {
      return this.$refs['commTable'].multipleSelection[0]
    },
    checkOnofTableData() {
      return this.$refs.commTable.onlyOneData()
    },
    handleAddProject(type, row) {
      switch (type) {
        case 'setTeam': {
          if (!this.checkOnofTableData()) return
          const { projectId, name, startDate, realStartDate } = this.getMultipleSelection()
          this.$router.push({ name: 'setConstructionTeam', query: { type: 'add', projectId, projectName: name, startDate, realStartDate }})
          break
        }
        case 'personManage': {
          if (!this.checkOnofTableData()) return
          const { projectId, name } = this.getMultipleSelection()
          this.$router.push({ name: 'constructionPerManage', query: { type: 'edit', projectId, projectName: name }})
          break
        }
        case 'details':
          this.$router.push({ path: '/projectManage/setProjectDept/projectDept', query: {
            type,
            projectId: row.projectId,
            contactId: row.id
          }})
          break
        default:
          break
      }
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
.real-name {
  padding: 10px;
}
</style>
