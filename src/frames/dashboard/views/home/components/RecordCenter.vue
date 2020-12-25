<template>
  <div class="record-center">
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          type="index"
          label="序号"
          width="48"
          header-align="center"
        />
        <el-table-column
          prop="date"
          label="打卡时间"
          header-align="center"
          width="160"
        />
        <el-table-column
          prop="name"
          label="打卡地点"
          header-align="center"
        />
      </el-table>
    </div>
    <!-- <div class="pagination">
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
    </div> -->
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
export default {
  mixins: [pagination],
  data() {
    return {
      task: '',
      value: '',
      count: 30,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      tableData: [
        {
          id: 1,
          task: '有2名下属的日志您已超过1天未阅读！请及时阅读！',
          date: '2016-05-02',
          name: '王小虎',
          address: '',
          taskType: 'Journal'
        },
        {
          id: 2,
          task: '您【01月03日】忘记打卡了，点击补卡！',
          date: '2016-05-04',
          name: '王小虎',
          address: '',
          taskType: 'PatchCard'
        },
        {
          id: 3,
          task: '您【01月03日】忘记打卡了，点击补卡！',
          date: '2016-05-01',
          name: '王小虎',
          address: '',
          taskType: 'PatchCard'
        },
        {
          id: 4,
          task: '有2名下属的日志您已超过1天未阅读！请及时阅读！',
          date: '2016-05-03',
          name: '王小虎',
          address: '',
          taskType: 'Journal'
        }
      ]
    }
  },
  methods: {
    taskJump(val) {
      // const a = val
      if (val.taskType === 'PatchCard') {
        this.$router.push({ path: '/patchrecord' })
      }
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
.link-a{
  color: #0a4c8a;
}
.el-button span{
  color: #0a4c8a;
}
</style>
