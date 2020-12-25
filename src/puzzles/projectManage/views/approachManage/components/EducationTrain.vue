<template>
  <div class="education-train">
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
import educationTrain from '../searchTableData/educationTrain'
import search from '@core/mixins/search'
import { safeEducationList, safeEducationDelete, safeEducationDownload } from '@core/api/projectManage/projectmanager'
import { exportExcel } from '@core/utils'
import { mapGetters } from 'vuex'
import { handlerSearchBar } from '@core/utils'
import { fileLoad } from '@core/api/accessoryFile'
export default {
  mixins: [educationTrain, search],
  data() {
    return {
      search: {},
      tableData: [],
      total: 0,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['approachProjectInfo', 'constant'])
  },
  created() {
    this.fetchData()
    this.$store.dispatch('getConstant', [{ type: 'orgPersonList', params: this.approachProjectInfo.belongOrgId }]).then(() => {
      const { orgPersonList } = this.constant
      this.selectList = handlerSearchBar(this.selectList, [2], [orgPersonList])
    })
  },
  methods: {
    handlerEducationBtn(type) {
      var obj = {
        name: 'EducationTrainAdd',
        type
      }
      const { onlyOneData, multipleSelection } = this.$refs.commTable
      if (type === 'edit' || type === 'delete') {
        if (!onlyOneData()) return
        obj.rowData = multipleSelection[0]
        if (type === 'delete') {
          this.deleteSafeEducation(obj.rowData.id)
          return
        }
      }
      if (type === 'download') {
        var idList = []
        if (multipleSelection.length) {
          multipleSelection.forEach(item => {
            idList.push(item.id)
          })
        }
        const { projectId } = this.$route.query
        safeEducationDownload({ ...this.search, projectId, idList: idList.length ? idList : null }).then(res => {
          exportExcel(res, '')
        })
        return
      }
      this.$emit('changeTabCom', obj)
    },
    fetchData() {
      const defaultSort = {
        propertyName: 'number',
        ascending: true
      }
      this.loading = true
      const { projectId } = this.$route.query
      const parmas = {
        ...this.search,
        defaultSort,
        ...this.sortData,
        page: this.page ? this.page - 1 : 0,
        size: this.size || 10,
        projectId
      }
      safeEducationList(parmas).then(({ data: { content, total }}) => {
        this.loading = false
        this.tableData = content.map((item) => {
          fileLoad(item.securityContractId, 'safeAgree').then(({ data }) => {
            item.tableData = data
          })
          item.renderTableTitleStatus = true
          return item
        })
        this.total = total
      })
    },
    deleteSafeEducation(id) {
      this.$confirm('此操作将删除选中数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        safeEducationDelete(id).then(() => {
          this.$message.success('删除成功')
          this.fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    }
  }
}
</script>

<style lang="less">
.education-train {
  .el-table__body-wrapper {
    max-height: calc(100vh - 400px);
  }
}
</style>
