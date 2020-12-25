<template>
  <div class="secret-content">
    <div class="search">
      <div class="select">
        <div>
          <span>企业名称</span>
          <el-input v-model.trim="search.enterpriseName" placeholder="请输入企业名称" clearable />
        </div>
        <div>
          <div>
            <el-button type="primary" icon="el-icon-search" @click="fetchData('query')">查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button v-power="'secret:add'" type="primary" @click="addClick()"> <i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
            <el-button v-power="'secret:delete'" type="primary" @click="deleteData"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        row-key="id"
        border
        default-expand-all
        :default-sort="{prop: 'createDate', order: 'descending'}"
        max-height="cacl(100vh - 250px)"
        @sort-change="sortTable"
        @select="handleSelectionSingleChange"
      >
        <el-table-column type="selection" width="40" label-class-name="table-selection" />
        <el-table-column type="index" label="序号" width="48" align="center" />
        <el-table-column prop="enterpriseId" label="企业ID" width="200" align="left" header-align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="enterpriseName" label="企业名称" width="200" align="left" header-align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="secretHash" label="密钥Hash" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="createDate" label="创建时间" align="center" sortable="custom" width="160" />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-show="count"
        :page-sizes="pageSizes"
        :page-size="size"
        :total="count"
        :current-page="page"
        :layout="pageLayout"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
import { getTableList, deleteSecret } from '@core/api/auditManageSys/accessSecret'
import table from '@core/mixins/table'
export default {
  components: {
  },
  mixins: [pagination, table],
  inject: ['pageType'],
  data() {
    return {
      search: {
        enterpriseName: ''
      },
      tableData: [],
      loading: true
    }
  },
  computed: {
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionSingleChange(selection, row) {
      if (this.multipleSelection.length && this.multipleSelection[0].id === row.id) {
        this.$refs.tableRef.clearSelection()
        this.multipleSelection = []
      } else {
        this.$refs.tableRef.clearSelection()
        this.$refs.tableRef.toggleRowSelection(row, true)
        this.multipleSelection = [row]
      }
    },
    addClick() {
      this.$router.push({ name: 'secretAdd', query: {}})
    },
    fetchData(sortData) {
      this.loading = true
      if (typeof sortData === 'string') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      const { enterpriseName } = this.search

      const { propertyName, ascending } = sortData || {}

      const params = {
        size: this.size,
        page: this.page - 1,
        enterpriseName: enterpriseName,
        propertyName,
        ascending
      }

      if (!params.enterpriseName) {
        delete params.enterpriseName
      }

      getTableList(params).then(({ data: { content, total }}) => {
        this.tableData = content
        this.count = total
        this.loading = false
      })
    },
    deleteData() {
      if (this.onlyOneData()) {
        const row = this.multipleSelection[0]
        this.$confirm('此操作将会删除该数据', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSecret(row.id).then(() => {
            this.fetchData('query')
            this.$message.success('删除成功')
          })
        }).catch(action => {})
      }
    }
  }
}
</script>

<style lang="less">
  .secret-content {
    width: calc(100% - 20px);
    height: calc(100vh - 140px);
    overflow-y: auto;
    padding: 10px;

    .el-table__body-wrapper {
      max-height: calc(100vh - 300px);
    }
  }
</style>
