<template>
  <div class="issue-problem">
    <div class="search">
      <div class="select">
        <div>
          <span>问题编号</span>
          <el-input v-model="input" placeholder="请输入问题编号" class="fill-name" />
        </div>
        <div>
          <span>问题级别</span>
          <el-select v-model="value" placeholder="请选择问题级别" class="fill-name">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <span>项目归属</span>
          <el-select v-model="value" placeholder="请选择问题级别" style="width:30%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="value" placeholder="请选择问题级别" class="fill-name">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <span>项目名称</span>
          <el-input v-model="input" placeholder="请输入项目名称" class="fill-name" />
        </div>
        <div>
          <span>录入日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>

        <div>

          <el-button type="primary">查询</el-button>
          <div class="btn">
            <slot name="button" />
          </div>
        </div>
      </div>

    </div>
    <div>

      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="loannumber" label="问题编号" sortable width="180" align="center" />
        <el-table-column prop="borrower" align="center" label="问题级别" sortable />
        <el-table-column prop="borrower" align="center" label="项目名称" sortable />
        <el-table-column prop="borrower" align="center" label="归属单位" sortable />
        <el-table-column prop="borrower" align="center" label="问题描述" />
        <el-table-column prop="borrower" align="center" label="接收人" />
        <el-table-column prop="borrower" align="center" label="录入人" sortable />
        <el-table-column prop="borrower" align="center" label="录入时间" sortable />
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
    addClick() {
      this.$router.push({ name: 'organizationalmonitoring' })
    },
    details(pageType) {
      if (this.onlyOneData()) this.$router.push({ name: 'laborDetails', query: { type: 'project', pageType }})
    }
  }
}
</script>

<style lang="less" scoped>
	.issue-problem{
		.search>.select>div {
			margin-right: 0;
			width: 25%;
		}
		.fill-name {
			width: 100%;
		}
	}
</style>
