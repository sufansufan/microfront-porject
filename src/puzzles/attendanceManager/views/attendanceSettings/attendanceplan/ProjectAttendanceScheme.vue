<template>
  <div class="project-attendance-scheme">
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" label="序号" align="center" />
        <el-table-column prop="name" label="方案名称" header-align="center">
          <template slot-scope="scope">
            <span
              class="table-click-color"
              @click="$emit('changeTabConent', 'companyplan', 'details')"
            >{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="项目名称" align="center" />
        <el-table-column prop="name" label="工作日" align="center" />
        <el-table-column prop="name" label="班次" align="center" />
        <el-table-column prop="name" label="生效人员" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import table from '@core/mixins/table'
export default {
  components: {},
  mixins: [table],
  data() {
    return {
      value: '',
      count: 30,
      options: [
        {
          label: '总公司',
          value: 1
        },
        {
          label: '分公司',
          value: 2
        },
        {
          label: '项目公司',
          value: 3
        }
      ],
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.project-attendance-scheme {
  padding: 10px;
}
</style>
