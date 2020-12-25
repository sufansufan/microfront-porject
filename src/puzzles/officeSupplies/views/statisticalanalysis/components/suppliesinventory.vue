<template>
  <div class="supplies-inventory">
    <div class="search">
      <div class="select">
        <div>
          <span>名称</span>
          <el-input v-model="input" placeholder="请输入用品名称" class="fill-name" />
        </div>
        <div>
          <span>编号</span>
          <el-input v-model="input" placeholder="请输入用品编号" class="fill-name" />
        </div>
        <div>
          <span>类型</span>
          <el-select v-model="value" placeholder="请选择用户类型" class="fill-name">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <span>状态</span>
          <el-select v-model="value" placeholder="请选择用品状态" class="fill-name">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <span>规格</span>
          <el-input v-model="input" placeholder="请输入用品规格" class="fill-name" />
        </div>
        <div>
          <span>单位</span>
          <el-input v-model="input" placeholder="请输入用品单位" class="fill-name" />
        </div>
        <div>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="primary"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </el-button-group>
        </div>
      </div>

    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="loannumber" label="物品编号" sortable width="180" align="center" />
        <el-table-column prop="borrower" align="center" label="物品名称" sortable />
        <el-table-column prop="organization" label="类型" sortable align="center" />
        <el-table-column prop="loanamount" label="规格" align="center" />
        <el-table-column prop="amountpaid" label="单位" align="center" />
        <el-table-column prop="typesofloans" label="单价" align="center" />
        <el-table-column prop="loanamount" label="库存数量" align="center" />
        <el-table-column prop="amountpaid" label="状态" align="center" />
        <el-table-column prop="typesofloans" label="备注" align="center" />
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
  components: {},
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
	.supplies-inventory {
		.search>.select>div {
			margin-right: 0;
			width:30%;
		}
		.fill-name {
			width: 100%;
		}
	}
</style>
