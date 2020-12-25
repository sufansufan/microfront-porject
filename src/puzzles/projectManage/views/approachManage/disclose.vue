<template>
  <div class="disclose">
    <jdy-title-name :title="getTitle" />
    <search-bar :btn-list="btnList" :search="search" :select-list="selectList" @changeSearch="changeSearch" />
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
import disclose from './searchTableData/disclose'
import search from '@core/mixins/search'
import { discloseList, discloseDelete, discloseDownload, discloseExplore, disclosePerson } from '@core/api/projectManage/projectmanager'
import { exportExcel, handlerSearchBar } from '@core/utils'
import { getSessionStorage } from '@core/utils/auth'
import { fileLoad } from '@core/api/accessoryFile'
export default {
  name: 'Disclose',
  mixins: [disclose, search],
  data() {
    return {
      search: {},
      tableData: [],
      total: 0,
      loading: false,
      params: {}
    }
  },
  computed: {
    getTitle() {
      return getSessionStorage('belongOrgName')
    }
  },
  created() {
    this.fetchData()
    this.getDisclosePerson()
  },
  methods: {
    handlerDiscloseBtn(type) {
      const { projectId } = this.$route.query
      if (type === 'add') {
        this.$router.push({ name: 'discloseAdd', query: { type, projectId }})
      }
      if (type === 'edit') {
        const { onlyOneData, multipleSelection } = this.$refs.commTable
        if (!onlyOneData()) return
        this.$router.push({ name: 'discloseAdd', query: { type, projectId, id: multipleSelection[0].id }})
      }
      if (type === 'delete') {
        const { onlyOneData, multipleSelection } = this.$refs.commTable
        if (!onlyOneData()) return
        this.deleteRow(multipleSelection[0].id)
      }
    },
    fetchData() {
      const defaultSort = {
        propertyName: 'number',
        ascending: true
      }
      this.loading = true
      const { projectId } = this.$route.query
      const { uploadDate } = this.search
      this.params = {
        ...this.search,
        ...defaultSort,
        ...this.sortData,
        uploadDate: {
          after: uploadDate.length ? uploadDate[0] : null,
          before: uploadDate.length ? uploadDate[1] : null
        },
        page: this.page ? this.page - 1 : 0,
        size: this.size || 10,
        projectId
      }
      discloseList(this.params).then(({ data: { content, total }}) => {
        this.tableData = content.map(item => {
          fileLoad(item.id, 'safeTechnologyBook').then(({ data }) => {
            item.tableData = data
          })
          item.renderTableTitleStatus = true
          return item
        })
        this.total = total
        this.loading = false
      })
    },
    deleteRow(id) {
      this.$confirm('此操作将删除选中数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        discloseDelete(id).then(() => {
          this.$message.success('删除成功')
          this.fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    handlerEducationBtn(type) {
      if (type === 'explore') {
        discloseExplore(this.params).then(res => {
          exportExcel(res, '')
        })
      } else if (type === 'download') {
        discloseDownload(this.params).then(res => {
          exportExcel(res, '')
        })
      }
    },
    getDisclosePerson() {
      const { projectId } = this.$route.query
      disclosePerson(projectId).then(({ data }) => {
        this.selectList = handlerSearchBar(this.selectList, [1], [data])
      })
    }
  }
}
</script>

<style lang="less" scoped>
.disclose {
  padding: 10px;
}
</style>
