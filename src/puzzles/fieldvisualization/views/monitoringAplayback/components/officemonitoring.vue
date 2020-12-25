<template>
  <div class="office-monitoring">
    <div class="search">
      <div class="select">

        <div>
          <span>组织编号</span>
          <el-input v-model="input" placeholder="请输入组织编号" class="fill-name" />
        </div>
        <div>
          <span>组织名称</span>
          <el-input v-model="input" placeholder="请输入组织名称" class="fill-name" />
        </div>
        <div>
          <span>组织类型</span>
          <el-select v-model="value" placeholder="请选择组织类型" class="fill-name">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <span>负责人</span>
          <el-input v-model="input" placeholder="请输入负责人" class="fill-name" />
        </div>

        <div>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </div>
      </div>

    </div>
    <div>

      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="loannumber" label="组织编号" width="180" align="center" />
        <el-table-column prop="borrower" align="center" label="组织名称">
          <template slot-scope="scope">
            <div class="table-click-color" @click="addClick">{{ scope.row.borrower }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="borrower" align="center" label="简称" />
        <el-table-column prop="borrower" align="center" label="组织类型" />
        <el-table-column prop="borrower" align="center" label="负责人" />
        <el-table-column prop="borrower" align="center" label="联系电话" />
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
    }
  }
}
</script>

<style lang="less" scoped>
	.office-monitoring{
		.search>.select>div {
			margin-right: 0;
			width: 25%;
		}
		.fill-name {
			width: 100%;
		}
	}
</style>
