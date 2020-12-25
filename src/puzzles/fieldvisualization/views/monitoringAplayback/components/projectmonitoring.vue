<template>
  <div class="project-monitoring">
    <div>
      <el-button type="primary">跨项目监控</el-button>
    </div>
    <!-- <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="loannumber" label="合同编号" width="180" align="center" />
        <el-table-column prop="borrower" align="center" label="工程名称" />
        <el-table-column prop="borrower" align="center" label="归属单位" sortable />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button size="small" @click="detele(scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div> -->
    <div class="search">
      <div class="select">
        <div>
          <span>监控状态</span>
          <el-radio-group v-model="radio" style="padding-top:7px;">
            <el-radio :label="3">全部</el-radio>
            <el-radio :label="6">已安装</el-radio>
            <el-radio :label="9">已拆除</el-radio>
            <el-radio :label="9">未安装</el-radio>

          </el-radio-group>
        </div>
        <div>
          <span>项目名称</span>
          <el-select v-model="value" placeholder="请选择项目">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <span>项目编号</span>
          <el-input v-model="input" placeholder="请输入项目编号" />
        </div>
        <div>
          <span>项目归属</span>
          <el-select v-model="value" placeholder="请选择项目">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="value" placeholder="请选择项目">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </div>
      </div>

    </div>
    <div>

      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="序号" width="50" align="center" fixed="left" />
        <el-table-column prop="loannumber" label="合同编号" sortable width="180" align="center" />
        <el-table-column prop="borrower" align="center" label="工程名称" sortable>
          <template slot-scope="scope">
            <div class="table-click-color" @click="addClick">{{ scope.row.borrower }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="borrower" align="center" label="归属单位" sortable />
        <el-table-column prop="borrower" align="center" label="工程状态" sortable />
        <el-table-column prop="borrower" align="center" label="工程地点" sortable />
        <el-table-column prop="borrower" align="center" label="建设单位" sortable />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button size="small" @click="join(scope.row)">加入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
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
      showTable: false,
      count: 3,
      radio: 3,
      value1: '',
      tableData: [{
        index: '1',
        loannumber: '1234567890987654321',
        borrower: '小李',
        organization: '工程部',
        typesofloans: '备用金',
        borrowers: '公司内部',
        dateofpayment: '20119-10-30',
        repaymentdate: '2019-08-30',
        paymentmethod: '现金',
        applicationtime: '2019-08-11 09:20:25',
        usageofloan: '购买电脑,及设备',
        entryname: '项目xxx',
        vestingunit: '北横装',
        state: '草稿'
      }]
    }
  },
  methods: {
    addClick() {
      this.$router.push({ name: 'singleprojectmonitoring' })
    },
    join() {}

  }
}
</script>

<style>

</style>
