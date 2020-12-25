<template>
  <div class="reimbursement-apply">
    <div class="search">
      <div class="select">
        <div>
          <span>申请日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div>
          <span>所属组织</span>
          <el-select
            v-model="value1"
            placeholder="请选择行政部"
            style="width: 430px"
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
          <span>报销人</span>
          <el-input v-model="value1" placeholder="请输入报销人" />
        </div>
        <div>
          <span>状态</span>
          <el-select
            v-model="value1"
            placeholder="请选择状态"
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
          <span>报销对象</span>
          <el-select
            v-model="value1"
            placeholder="请选择报销对象"
            style="width: 350px"
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
          <span>项目归属</span>
          <el-select
            v-model="value1"
            placeholder="请选择项目归属"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="value1"
            placeholder="请选择归属单位"
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
          <span>项目名称</span>
          <el-select
            v-model="value1"
            placeholder="请选择项目名词"
            style="width: 200px"
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
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="addClick"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
            <el-button type="primary"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button type="primary">删除</el-button>
            <el-button type="primary">撤销</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <el-table
      :data="tableData"
      row-key="id"
      border
    >
      <el-table-column
        type="selection"
        width="40"
      />
      <el-table-column
        type="index"
        label="序号"
        width="50"
      />
      <el-table-column
        label="报销单号"
        header-align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span class="table-click-color" @click="addClick('detail')">
            {{ scope.row.date }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="报销人"
        header-align="center"
      />
      <el-table-column
        prop="address"
        header-align="center"
        label="所属组织"
        width="200"
      />
      <el-table-column
        prop="name"
        label="报销总金额"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="报销对象"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="申请时间"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="项目名称"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="归属单位"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="状态"
        header-align="center"
      />
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
</template>

<script>
import pagination from '@core/mixins/pagination'
export default {
  name: 'ReimbursementApply',
  mixins: [pagination],
  data() {
    return {
      count: 30,
      value1: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      tableData: [{
        id: 1,
        date: 'JDY20181210-001',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: 'JDY20181210-001',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }]
    }
  },
  methods: {
    addClick(type) {
      if (type === 'detail') {
        this.$router.push({ name: 'detail' })
      } else {
        this.$router.push({ name: 'reimbursementAdd' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.reimbursement-apply {
  padding: 20px;
}
</style>
