<template>
  <div class="attendance-equipment">
    <div class="search">
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="changeTab('add')">新增</el-button>
            <el-button type="primary" @click="changeTab('add')">修改</el-button>
            <el-button type="primary" @click="changeTab('usagerecords')">使用记录</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" @click="changeTab('install')">安装</el-button>
            <el-button type="primary" @click="changeTab('disassemble')">拆卸</el-button>
          </el-button-group>
        </div>
      </div>
      <div class="select">
        <div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="content" placeholder="请输入" />
        </div>
        <div style="margin-right:0;">
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" label="序号" align="center" />
        <el-table-column prop="name" label="考勤机编号" header-align="center">
          <template slot-scope="scope">
            <span class="table-click-color">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="考勤机型号" align="center" />
        <el-table-column prop="name" label="功能" align="center" />
        <el-table-column prop="name" label="当前位置" align="center" />
        <el-table-column prop="name" label="当前使用对象" align="center" />
        <el-table-column prop="name" label="开始使用对象" align="center" />
        <el-table-column prop="name" label="状态" align="center" />
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
  methods: {
    changeTab(status) {
      this.$emit('changeTabConent', 'equipment', status)
    }
  }
}
</script>

<style lang="less">
.attendance-equipment {
  padding: 10px;
  .search {
    display: flex;
    justify-content: space-between;
  }
}
</style>
