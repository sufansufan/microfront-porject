<template>
  <div class="approach-manage">
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
          holder="合同归属"
          :select-data="attributionList"
          style="width: 190px"
          @change="attributionChange"
        />
        <jdy-select
          v-model="search.company"
          holder="合同归属"
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
import { approachListPage, approachOrgType, approachAllList } from '@core/api/projectManage/projectmanager'
import { getOrganizationByBelongList } from '@core/api/organization'
import { mapGetters, mapActions } from 'vuex'
import { handlerSearchBar } from '@core/utils'
import { setSessionStorage } from '@core/utils/auth'
export default {
  name: 'SetProjectDept',
  mixins: [searchTableData, search],
  data() {
    return {
      loading: false,
      search: {},
      tableData: [],
      total: 0,
      attributionList: [],
      companyList: [],
      projectNameList: []
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
    this.fetchData()
    this.fetchOrgType()
  },
  methods: {
    ...mapActions(['getConstant']),
    handleApproachBtn(type) {
      const { onlyOneData, multipleSelection } = this.$refs.commTable
      if (!onlyOneData()) return
      const { projectId, name } = multipleSelection[0]
      setSessionStorage('belongOrgName', name)
      this.$store.commit('SET_APPROACHPROJECTINFO', multipleSelection[0])
      if (type === 'safeAgree') {
        this.$router.push({ name: 'safeAgree', query: { projectId }})
      } else if (type === 'safeEducation') {
        this.$router.push({ name: 'safeEducation', query: { projectId }})
      } else if (type === 'disclose') {
        this.$router.push({ name: 'disclose', query: { projectId }})
      }
    },
    fetchData() {
      this.loading = true
      const params = {
        ...this.search,
        ...this.sortData,
        projectSite: this.search.projectSite.toString(),
        page: this.page ? this.page - 1 : 0,
        size: this.size || 10
      }
      approachListPage(params).then(({ data: { content, total }}) => {
        this.loading = false
        this.total = total
        this.tableData = content
      })
    },
    fetchOrgType() {
      approachOrgType().then(({ data }) => {
        this.attributionList = data
      })
    },
    attributionChange(val) {
      if (val) {
        getOrganizationByBelongList(val, { componentBusinessCode: '210031' }).then(({ data }) => {
          this.companyList = data
        })
      } else {
        this.companyList = []
      }
      this.$set(this.search, 'company', '')
    },
    fetchDataNopage() {
      return new Promise((resolve, reject) => {
        return approachAllList({}).then(({ data }) => {
          this.projectNameList = data
          resolve()
        })
      })
    },

    handleAddProject(type, row) {
      this.$router.push({ path: '/projectManage/setProjectDept/projectDept', query: {
        type,
        projectId: row.projectId,
        contactId: row.id,
        name: 'EngineerInfo'
      }})
    }
  }

}
</script>

<style lang="less" scoped>
.approach-manage {
  padding: 10px;
  .el-table__body-wrapper {
    max-height: calc(100vh - 400px);
  }
}
</style>
