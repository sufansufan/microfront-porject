<template>
  <div class="personnel-collection-statistics">
    <div class="search">
      <div class="select">
        <div>
          <span>日期</span>
          <el-date-picker
            v-model="value1"
            style="width:100%"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div>
          <span>员工编号</span>
          <el-input v-model="input" placeholder="请输入员工编号" class="fill-name" />
        </div>
        <div>
          <span>性别</span>
          <el-input v-model="input" placeholder="请输入员工性别" class="fill-name" />
        </div>
        <div>
          <span>类型</span>
          <el-select v-model="value" placeholder="请选择产品类型" class="fill-name">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <span>用品名称</span>
          <el-input v-model="input" placeholder="请输入用品名称" class="fill-name" />
        </div>
        <div>
          <span>用品编号</span>
          <el-input v-model="input" placeholder="请输入用品编号" class="fill-name" />
        </div>
        <div>
          <span>领用单号</span>
          <el-input v-model="input" placeholder="请输入领用单号" class="fill-name" />
        </div>
        <div>
          <span>组织</span>
          <el-input v-model="input" placeholder="请输入组织名称" class="fill-name" />
        </div>

        <div>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="primary" icon="el-icon-search"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </el-button-group>
        </div>
      </div>

    </div>
    <div>
      <p>总金额合计:<span>479</span><span style="float:right">单位:元</span></p>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="loannumber" label="员工编号" sortable width="180" align="center" />
        <el-table-column prop="borrower" align="center" label="姓名" sortable />
        <el-table-column prop="borrower" align="center" label="组织" sortable />
        <el-table-column prop="borrower" align="center" label="类型" sortable />
        <el-table-column prop="borrower" align="center" label="物品编号" />
        <el-table-column prop="borrower" align="center" label="物品名称" />
        <el-table-column prop="borrower" align="center" label="规格" />
        <el-table-column prop="borrower" align="center" label="单位" />
        <el-table-column prop="borrower" align="center" label="领用数量" />
        <el-table-column prop="borrower" align="center" label="总金额" />
        <el-table-column prop="borrower" align="center" label="领用单号" />
        <el-table-column prop="borrower" align="center" label="发放时间" />
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
      count: 3,
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
  }
}
</script>

<style lang="less" scoped>
	.personnel-collection-statistics {
		.search>.select>div {
			margin-right: 0;
			width: 25%;
		}
		.fill-name {
			width: 100%;
		}
	}
</style>
