<template>
  <div class="return-confirmation">
    <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch" />
    <comm-table ref="commTable" v-loading="loading" :single-selected="true" :table-options="tableOptions" :columns="columns" :data="tableData" :count="total" />
  </div>
</template>
<script>

import returnConfirmation from '../searchTableData/returnConfirmation'
import search from '@core/mixins/search'
import { mapGetters } from 'vuex'
import searchBar from '../searchTableData/searchBar'
import { handlerSearchBar, codeChangeName, parseTime } from '@core/utils'
import { getreturnPage, refuseReturn, agreeReturn, deleteReturn } from '@core/api/projectManage/projectmanager'
export default {
  mixins: [search, searchBar, returnConfirmation],
  data() {
    return {
      loading: true,
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['workType', 'returnRecordState']).then(() => {
      const { workType, returnRecordState } = this.constant
      this.selectList = handlerSearchBar(this.selectList, [1, 2], [workType, returnRecordState])
    })
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      const { projectId } = this.$route.query
      this.loading = true
      this.queryCopy(type)
      const { sortData } = this
      this.params = {
        page: this.page ? this.page - 1 : 0,
        size: this.size || 10,
        propertyName: 'submitDate',
        ascending: false,
        ...sortData,
        ...this.search,
        projectId: projectId
      }
      getreturnPage(this.params).then(({ data: { content, total }}) => {
        this.tableData = content.map(item => {
          item.workTypeName = codeChangeName(this.constant.workType, item.workType)
          item.stateName = codeChangeName(this.constant.returnRecordState, item.state)
          item.submitDate = parseTime(item.submitDate, 'y-m-d')
          item.recordDate = parseTime(item.recordDate, 'y-m-d')
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
    // 同意
    handleAgree() {
      if (this.getMultipleSelection()) {
        const { id } = this.getMultipleSelection()
        if (this.getMultipleSelection().state === '01') {
          agreeReturn(id).then(res => {
            this.$message.success('同意成功!')
            this.fetchData()
          })
        } else {
          this.$message.warning('只能操作待确认的记录')
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    // 拒绝
    handleRefuse() {
      if (this.getMultipleSelection()) {
        const { id } = this.getMultipleSelection()
        if (this.getMultipleSelection().state === '01') {
          refuseReturn(id).then(res => {
            this.$message.success('拒绝成功!')
            this.fetchData()
          })
        } else {
          this.$message.warning('只能操作待确认的记录')
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    // 删除
    handleDelete() {
      if (this.getMultipleSelection()) {
        const { id, recordDate } = this.getMultipleSelection()
        // 需要判断返场日期晚于当前日期的数据02
        if (this.getMultipleSelection().state === '01' || this.getMultipleSelection().state === '02' && recordDate > parseTime(new Date().getTime())) {
          this.$confirm('确定要删除该条记录吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteReturn(id).then(res => {
              this.$message.success('删除成功!')
              this.fetchData('query')
            })
          })
        } else {
          this.$message.warning('只能操作待确认或已同意且返场日期晚于当前日期的记录')
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    jumpState(typePage, row) {
      this.$emit('changeTabConent', 'buildpersonDetails', typePage, row)
    }

  }
}
</script>

<style lang="less">
.return-confirmation {
  padding:10px 0;
  .el-table__body-wrapper {
    max-height: calc(100vh - 330px);
  }
}
</style>
