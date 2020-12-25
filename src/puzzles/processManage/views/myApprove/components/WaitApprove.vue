<template>
  <div class="wait-approve">
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
          prop: 'taskStartTime',
          order: 'descending'
        }"
        max-height="calc(100vh - 350px)"
        @sort-change="sortTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" width="48" label="序号" align="center" />
        <el-table-column prop="definitionId" label="审批类型" sortable="custom" align="center" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.definitionName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="summary" label="摘要" align="center" show-overflow-tooltip sortable="custom">
          <template slot-scope="scope">
            <span class="table-click-color" @click="abstractClick('add', scope.row)"> {{ scope.row.summary }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="activityName" label="环节名称" align="center" sortable="custom" show-overflow-tooltip />
        <el-table-column prop="activityType" label="环节类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.activityTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="taskStartTime" label="到达时间" align="center" sortable="custom" show-overflow-tooltip />
        <el-table-column prop="requestUserName" label="申请人" align="center" sortable="custom" show-overflow-tooltip />
        <el-table-column prop="requestTime" label="申请时间" align="center" sortable="custom" show-overflow-tooltip />
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
import { getWaitApprove } from '@core/api/processManage/workflowmanager'
import { handlerSearchBar } from '@core/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'WaitApprove',
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
          value: 'startUserName',
          searchType: 'input',
          name: '申请人'
        },
        {
          value: 'startTime',
          searchType: 'pickerDate',
          name: '申请日期'
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
            { name: '审批', power: 'waitapprove:approve', on: () => { this.abstractClick('add') }, icon: 'icon-xinzeng1-copy' }
          ]
        }
      ],
      tableData: [],
      loading: false,
      processData: [],
      pageType: ''
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
          // this.selectList[0].selectData = val
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['taskType'])
  },
  methods: {
    fetchData(type) {
      this.multipleSelection = []
      this.loading = true
      this.queryCopy(type)
      const { page, size, sortData } = this
      const params = {
        page: page - 1,
        size,
        propertyName: 'taskStartTime',
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

      getWaitApprove(params).then(({ data }) => {
        this.loading = false
        const { content, total } = data
        this.tableData = content
        this.count = total
        this.tableData.map(item => {
          this.constant.taskType.forEach(e => {
            if (item.activityType === e.code) {
              item.activityTypeName = e.name
            }
          })
        })
      })
    }
  }
}
</script>
<style lang="less">
.wait-approve {
  .el-table__body-wrapper {
    max-height: calc(100vh - 400px);
  }
}
</style>
