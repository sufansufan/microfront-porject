<template>
  <div class="work-log">
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
            style="width: 360px"
          />
        </div>
        <div>
          <span>重要程度</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-name"
            style="width: 360px"
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
          <span>组织</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-name"
            style="width: 360px"
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
          <span>项目</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-name"
            style="width: 360px"
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
          <span>员工</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-name"
            style="width: 360px"
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
          <span>岗位</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-name"
            style="width: 360px"
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
          <span>状态</span>
          <div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="未读" />
              <el-checkbox label="已读" />
              <el-checkbox label="延期阅读" />
            </el-checkbox-group>
          </div>
        </div>
        <div style="margin-right:0;">
          <el-button
            type="primary"
            icon="el-icon-search"
          >查询</el-button>
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
          prop="state"
          label="阅读状态"
          header-align="center"
          align="center"
          width="120"
        />
        <el-table-column
          prop="level"
          label="重要程度"
          header-align="center"
          align="center"
          sortable
          width="120"
        />
        <el-table-column
          prop="department"
          label="部门"
          header-align="center"
          align="center"
          sortable
          width="200"
        />
        <el-table-column
          prop="staff"
          label="员工"
          header-align="center"
          align="center"
          sortable
          width="120"
        />
        <el-table-column
          prop="date"
          label="日期"
          header-align="center"
          align="center"
          sortable
          width="120"
        />
        <el-table-column
          prop="Completed"
          label="已完成工作"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="unfinished"
          label="未完成工作"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="appendix"
          label="附件"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="time"
          label="提交时间"
          header-align="center"
          align="center"
          sortable
          width="120"
        />
        <el-table-column
          prop="state"
          label="提交状态"
          header-align="center"
          align="center"
          width="120"
        />
        <el-table-column
          prop="state"
          label="阅读记录"
          header-align="center"
          align="center"
          width="120"
        />
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
  name: 'WorkLog',
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

  }
}
</script>

<style scoped>

</style>
