<template>
  <div class="task-center">
    <div class="search">
      <div class="select">
        <div>
          <span>任务</span>
          <el-input
            v-model="task"
            placeholder="请输入任务"
          />
        </div>
        <div>
          <span>任务类型</span>
          <el-select
            v-model="value"
            placeholder="请选择任务类型"
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
    </div>
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
          header-align="center"
        />
        <el-table-column
          prop="task"
          label="任务"
          header-align="center"
        >
          <template slot-scope="scope">
            <div class="table-click-color" href="#" @click="taskJump(scope.row.taskType)">{{ scope.row.task }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="是否置顶"
          header-align="center"
          width="100"
        />
        <el-table-column
          prop="address"
          header-align="center"
          label="任务类型"
          width="150"
        />
        <el-table-column
          prop="name"
          label="下派人"
          header-align="center"
          width="150"
        />
        <el-table-column
          prop="date"
          sortable
          label="下派时间"
          header-align="center"
          width="180"
        />
        <el-table-column
          prop="name"
          label="操作"
          header-align="center"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >已处理</el-button>
            <el-button
              type="text"
              size="small"
            >置顶</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-show="count"
        :page-sizes="pageSizes"
        :page-size="limit"
        :total="count"
        :current-page="page"
        :layout="pageLayout"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <!-- 任务中心 -->
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
      if (val === 'PatchCard') {
        this.$router.push({ path: '/patchrecord' })
      }
    }
  }
}
</script>

<style lang="less" scoped>

// .search > .select > div > span {
//   background-color: #f5f5f5;
//   padding-right: 12px;
//   text-align: right;
//   margin-right: 0;
//   width: 96px;
// }
// .search > .select > div {
//   margin-right: 0;
// }
// .el-button--primary {
//   margin-left: 4px;
// }

.el-button span{
  color: #0a4c8a;
}
</style>
