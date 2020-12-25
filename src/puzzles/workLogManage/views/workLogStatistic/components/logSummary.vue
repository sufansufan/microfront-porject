<template>
  <div class="log-summary">
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
          <span>组织</span>
          <el-select
            v-model="value"
            placeholder="请选择组织名称"
            class="fill-name"
            style="width: 560px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
          label="组织"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="level"
          label="人数"
          header-align="center"
          align="center"
          sortable
          width="120"
        />
        <el-table-column
          prop="date"
          label="应提交"
          header-align="center"
          align="center"
          sortable
          width="120"
        />
        <el-table-column
          prop="type"
          label="已提交"
          header-align="center"
          align="center"
          width="120"
        />
        <el-table-column
          prop="submitter"
          label="完成率"
          header-align="center"
          align="center"
          width="120"
        />
        <el-table-column
          prop="time"
          label="未读"
          header-align="center"
          align="center"
          sortable
          width="120"
        />
        <el-table-column
          prop="state"
          label="已读"
          header-align="center"
          align="center"
          width="120"
        />
        <el-table-column
          prop="state"
          label="延期阅读"
          header-align="center"
          align="center"
          width="120"
        />
        <el-table-column
          prop="project"
          label="超期未读"
          header-align="center"
          align="center"
          sortable
        />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogSummary',
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
