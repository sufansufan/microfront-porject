<template>
  <div class="organization-collection-statistics">
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
          <span>组织</span>
          <el-input v-model="input" placeholder="请输入组织" class="fill-name" />
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
      <span style="float:right">单位:元</span>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="loannumber" label="组织" sortable width="180" align="center" />
        <el-table-column prop="borrower" align="center" label="合计" />
      </el-table>
    </div>

  </div>
</template>

<script>

export default {
  components: {

  },

  data() {
    return {
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
	.organization-collection-statistics {
		.search>.select>div {
			margin-right: 0;
			width: 25%;
		}
		.fill-name {
			width: 100%;
		}
	}
</style>
