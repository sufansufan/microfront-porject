<template>
  <div class="me-initiate">
    <div class="search">
      <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch" />
    </div>
    <div class="table">
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        row-key="id"
        border
        :default-sort="{
          prop: 'requestTime',
          order: 'descending'
        }"
        max-height="calc(100vh - 350px)"
        @sort-change="sortTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" width="48" label="序号" align="center" />
        <el-table-column prop="processStatus" label="状态" align="center" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.processStatusName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="definitionId" label="审批类型" sortable="custom" align="center" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.definitionName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="summary" label="摘要" align="center" show-overflow-tooltip sortable="custom">
          <template slot-scope="{row}">
            <span class="table-click-color" @click="abstractClick('details', row)"> {{ row.summary }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="requestTime" label="申请时间" align="center" sortable="custom" show-overflow-tooltip />
        <el-table-column prop="processEndTime" label="完成时间" align="center" sortable="custom" show-overflow-tooltip />
      </el-table>
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
  </div>
</template>
<script>
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import search from '@core/mixins/search'
import SearchBar from '@frames/dashboard/components/SearchBar'
import abstract from '@puzzlesDash/processManage/mixins/abstract'
import { handlerSearchBar } from '@core/utils'
import { getStartByMe, previewCancel } from '@core/api/processManage/workflowmanager'
import { mapGetters } from 'vuex'
export default {
  name: 'MeInitiate',
  components: {
    SearchBar
  },
  mixins: [pagination, table, search, abstract],
  props: {
    approveType: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      selectList: [
        {
          value: 'definitionId',
          searchType: 'cascader',
          name: '审批类型',
          selectData: [],
          selectOption: {
            value: 'id',
            label: 'name',
            children: 'businessFlowRegisters',
            expandTrigger: 'hover'
          }
        },
        {
          value: 'startTime',
          searchType: 'pickerDate',
          name: '申请日期'
        },

        {
          value: 'status',
          searchType: 'select',
          name: '状态',
          selectData: [],
          selectOption: {
            value: 'code',
            label: 'name'
          }
        },

        {
          value: 'endTime',
          searchType: 'pickerDate',
          name: '完成日期'
        },
        {
          value: 'summary',
          searchType: 'input',
          name: '摘要'
        }
      ],
      btnList: [
        {
          children: [
            { name: '撤销', power: 'meinitiate:revoke', on: () => { this.revoke() }, icon: 'icon-xinzeng1-copy' }
          ]
        }
      ],
      tableData: [],
      count: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    approveType: {
      handler(val) {
        if (val.length !== 0) {
          this.selectList = handlerSearchBar(this.selectList, [0], [val])
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['taskType', 'processStatus']).then(() => {
      this.selectList = handlerSearchBar(this.selectList, [2], [this.constant.processStatus])
    })
  },
  methods: {
    revoke() {
      if (this.multipleSelection.length === 1) {
        const param = {
          processId: this.multipleSelection[0].processId
        }
        previewCancel(param).then(({ data }) => {
          this.$message.success('撤销成功')
          this.fetchData()
        })
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    fetchData(type) {
      this.multipleSelection = []
      this.loading = true
      this.queryCopy(type)
      const { page, size, sortData } = this
      const params = {
        page: page - 1,
        size,
        propertyName: 'requestTime',
        ascending: false,
        ...this.search,
        ...sortData
      }

      params.definitionId = params.definitionId[1]
      if (this.search.startTime) {
        if (this.search.startTime.length === 0) {
          params.startTime = {
            after: '',
            before: ''
          }
        } else {
          params.startTime = {
            after: params.startTime[0],
            before: params.startTime[1]
          }
        }
      } else {
        params.startTime = {
          after: '',
          before: ''
        }
      }
      if (this.search.startTime) {
        if (this.search.endTime.length === 0) {
          params.endTime = {
            after: '',
            before: ''
          }
        } else {
          params.endTime = {
            after: params.endTime[0],
            before: params.endTime[1]
          }
        }
      } else {
        params.endTime = {
          after: '',
          before: ''
        }
      }

      getStartByMe(params).then(({ data }) => {
        this.loading = false
        const { content, total } = data
        this.tableData = content
        this.count = total
      })
    }
  }
}
</script>
<style lang='less'>
.me-initiate {
  .el-table__body-wrapper {
    max-height: calc(100vh - 400px);
  }
}
</style>
