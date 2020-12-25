<template>
  <div class="attendance-center">
    <div>
      <el-table
        v-if="isShow"
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          prop="date"
          label="考勤时间"
          header-align="center"
          width="160"
        />
        <el-table-column
          prop="date"
          label="打卡时间"
          header-align="center"
          width="160"
        />
        <el-table-column
          prop="result"
          label="打卡结果"
          header-align="center"
          width="100"
        />
        <el-table-column
          prop="name"
          label="打卡地址"
          header-align="center"
          width="320"
        />
        <el-table-column
          prop="name"
          label="备注"
          header-align="center"
          width="320"
        />
        <el-table-column
          prop="operation"
          label="操作"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >{{ scope.row.operation }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <card-application v-else @hasShaw="isChange" />
    </div>

  </div>
</template>

<script>
import CardApplication from './CardApplication'
export default {
  components: {
    CardApplication
  },
  data() {
    return {
      value: '',
      isShow: true,
      tableData: [
        {
          id: 1,
          result: '12',
          date: '2016-05-02',
          name: '王小虎',
          address: '',
          taskType: 'Journal',
          operation: '补卡申请'
        },
        {
          id: 2,
          result: '12',
          date: '2016-05-04',
          name: '王小虎',
          address: '',
          taskType: 'PatchCard',
          operation: '补卡申请'
        },
        {
          id: 3,
          result: '12',
          date: '2016-05-01',
          name: '王小虎',
          address: '',
          taskType: 'PatchCard',
          operation: '补卡申请'
        },
        {
          id: 4,
          result: '12',
          date: '2016-05-03',
          name: '王小虎',
          address: '',
          taskType: 'Journal',
          operation: '补卡申请'
        }
      ]
    }
  },
  methods: {
    handleClick(val) {
      if (val.operation === '补卡申请') {
        this.isShow = false
      }
    },
    isChange(val) {
      this.isShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.el-table td div {
  text-align: center;
}
.search > .select > div > span {
  background-color: #f5f5f5;
  padding-right: 12px;
  text-align: right;
  margin-right: 0;
  width: 96px;
}
.search > .select > div {
  margin-right: 0;
}
.el-button--primary {
  margin-left: 4px;
}
.el-button span {
  color: #0a4c8a;
}
</style>
