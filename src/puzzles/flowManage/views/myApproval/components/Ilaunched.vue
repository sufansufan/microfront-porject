<template>
  <div class="Ilaunched">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>申请时间</span>
          <el-date-picker
            v-model="value1"
            class="fill-line"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="fill-name">
          <span>状态</span>
          <el-select
            v-model="value"
            class="fill-line"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>申请类型</span>
          <el-select
            v-model="value"
            class="fill-line"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>完成时间</span>
          <el-date-picker
            v-model="value1"
            class="fill-line"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="fill-name">
          <span>结果</span>
          <el-select
            v-model="value"
            class="fill-line"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <div>
            <el-button
              type="primary"
              icon="el-icon-search"
            >查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button
            type="primary"
          >撤销</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          type="selection"
          width="40"
        />
        <el-table-column
          prop="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="state"
          label="状态"
          align="center"
          sortable
        />
        <el-table-column
          prop="type"
          label="申请类型"
          align="center"
          sortable
        />
        <el-table-column
          prop="abstract"
          align="center"
          label="摘要"
          width="200"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="view(scope.row)"
            >{{ scope.row.type }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="updatetime"
          label="申请日期"
          align="center"
          width="150"
          sortable
        />
        <el-table-column
          prop="finishtime"
          label="完成时间"
          align="center"
          sortable
          width="150"
        />
        <el-table-column
          prop="result"
          label="结果"
          sortable
          align="center"
        />
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
export default {
  components: {

  },
  mixins: [pagination],
  data() {
    return {
      count: 30,
      value1: '',
      tableData: [
        {
          index: '1',
          state: '已撤销',
          type: '采购申请',
          abstract: '清合同（归属公司）项目采购申请',
          updatetime: '2019-11-21 21:12:23',
          finishtime: '2019-11-21 21:12:23',
          result: '同意'
        },
        {
          index: '1',
          state: '已审核',
          type: '采购申请',
          abstract: '清合同（归属公司）项目采购申请',
          updatetime: '2019-11-21 21:12:23',
          finishtime: '2019-11-21 21:12:23',
          result: '同意'
        },
        {
          index: '1',
          state: '审核中',
          type: '采购申请',
          abstract: '清合同（归属公司）项目采购申请',
          updatetime: '2019-11-21 21:12:23',
          finishtime: '2019-11-21 21:12:23',
          result: '同意'
        }

      ],
      options: [
        {
          value: 1,
          label: '借款申请'
        },
        {
          value: 2,
          label: '还款申请'
        },
        {
          value: 3,
          label: '报销申请'
        },
        {
          value: 4,
          label: '扣款申请'
        }
      ]
    }
  },
  methods: {
    view(row) {
      if (row.state === '已撤销' || row.state === '已审核') {
        this.$router.push({ name: 'viewrevoked' })
      } else {
        this.$router.push({ name: 'viewapproved' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.Ilaunched{
  height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 20px;
 .search>.select>.fill-name{
    width:30%;
    .fill-line{
      width:100%;
    }

  }
}
</style>
