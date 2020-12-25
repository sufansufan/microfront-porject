<template>
  <div class="my-work-log">
    <div class="search">
      <div class="select">
        <div>
          <span>日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="请选择起始日期"
            end-placeholder="请选择截止日期日期"
            class="fill-name"
            style="width: 560px"
          />
        </div>
        <div>
          <span>状态</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-name"
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
          <span>日志类型</span>
          <el-select
            v-model="value"
            placeholder="请选择工程"
            class="fill-name"
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
          <span>提交时间</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="请选择起始日期"
            end-placeholder="请选择截止日期日期"
            class="fill-name"
            style="width: 560px"
          />
        </div>
        <div>
          <span>项目</span>
          <el-input
            v-model="input"
            placeholder="请输入建设单位"
            class="fill-name"
            style="width: 660px"
          />
        </div>
        <div style="margin-right:0;">
          <el-button
            type="primary"
            icon="el-icon-search"
          >查询</el-button>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary"@click="addClick('add')"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
            <el-button type="primary" @click="addClick('edit')"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
            <el-button type="primary"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </el-button-group>
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
          type="state"
          label="状态"
          header-align="center"
          align="center"
          width="100"
          sortable
        />
        <el-table-column
          prop="level"
          label="重要程度"
          header-align="center"
          align="center"
          sortable
          width="200"
        />
        <el-table-column
          prop="date"
          label="日期"
          header-align="center"
          align="center"
          sortable
          width="200"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="addClick('detail')"
            >{{ scope.row.date }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="日志类型"
          header-align="center"
          align="center"
          sortable
          width="200"
        />
        <el-table-column
          prop="submitter"
          label="提交人"
          header-align="center"
          align="center"
          sortable
          width="200"
        />
        <el-table-column
          prop="time"
          label="提交时间"
          header-align="center"
          align="center"
          sortable
          width="260"
        />
        <el-table-column
          prop="record"
          label="阅读记录"
          header-align="center"
          align="center"
          sortable
          width="200"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="recordClick('detail')"
            >{{ scope.row.record }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="project"
          label="项目"
          header-align="center"
          align="center"
          sortable
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
  name: 'Index',
  mixins: [pagination],
  data() {
    return {
      count: 30,
      tableData: [
        {
          id: 1,
          state: '未提交',
          level: '一般',
          date: '2019-10-17',
          type: '工作日志',
          submitter: '王麻子',
          time: '2019-10-17',
          record: '3',
          project: 'xxxxx项目'
        },
        {
          id: 2,
          state: '未提交',
          level: '重要',
          date: '2019-10-16',
          type: '工作日志',
          submitter: '王麻子',
          time: '2019-10-16',
          record: '4',
          project: 'xxxxx项目'
        },
        {
          id: 3,
          state: '未提交',
          level: '一般',
          date: '2019-10-15',
          type: '工作日志',
          submitter: '王麻子',
          time: '2019-10-15',
          record: '6',
          project: 'xxxxx项目'
        }
      ]
    }
  },
  methods: {
    addClick(type) {
      if (type === 'detail') {
        this.$router.push({ name: 'workLogDetail' })
      } else if (type === 'add') {
        this.$router.push({ name: 'workLogDetail' })
      } else if (type === 'edit') {
        this.$router.push({ name: 'workLogDetail' })
      }
    },
    recordClick(type) {
      this.$router.push({ name: 'recordDetail' })
    }
  }
}
</script>

<style lang="less" scoped>
  .my-work-log {
    padding: 20px;
    .fill-name {
      width: 285px;
    }
    .ascription {
      margin-right: 2px;
    }
  }
</style>
