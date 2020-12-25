<template>
  <div class="procurementof-supplies">
    <div class="search">
      <div class="select">
        <div>
          <span>编号</span>
          <el-input v-model="input" placeholder="请输入采购编号" class="fill-name" />
        </div>
        <div>
          <span>采购部门</span>
          <el-input v-model="input" placeholder="请输入采购部门" class="fill-name" />
        </div>
        <div>
          <span>采购人</span>
          <el-input v-model="input" placeholder="请输入采购人名称" class="fill-name" />
        </div>

        <div style="width:50%;">
          <span>采购时间</span>
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
          <span>状态</span>
          <el-select v-model="value" placeholder="请选择单据状态" class="fill-name">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>

        <div>
          <div>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
      </div>

    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" />
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="loannumber" label="采购单号" sortable width="180" align="center">
          <template slot-scope="scope">
            <div class="table-click-color" @click="addClick">{{ scope.row.loannumber }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="borrower" align="center" label="采购部门" />
        <el-table-column prop="organization" label="采购人" align="center" />
        <el-table-column prop="loanamount" label="采购时间" sortable align="center" />
        <el-table-column prop="amountpaid" label="采购说明" align="center" />
        <el-table-column prop="typesofloans" label="状态" sortable align="center">
          <template slot-scope="scope">
            <div class="state" @click="changeTab(scope.row)">{{ scope.row.typesofloans }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <!-- <drag-dialog ref="dialog" title="审批步骤" width="50%" height="80%">
      <approval-procedures />
    </drag-dialog> -->

  </div>
</template>

<script>
// import DragDialog from '@frames/dashboard/components/Dialog'
// import ApprovalProcedures from './components/approvalprocedures'
import pagination from '@core/mixins/pagination'
import {
  formatMoney
} from '../../../../core/utils/'
export default {
  components: {
    // DragDialog,
    // ApprovalProcedures
  },
  mixins: [pagination],
  data() {
    return {
      value1: '',
      tableData: [{
        index: '1',
        loannumber: '1234567890987654321',
        borrower: '小李',
        organization: '工程部',
        loanamount: formatMoney(3000),
        amountpaid: formatMoney(1000),
        unpaidamount: formatMoney(2000),
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
    changeTab(row) {
      this.$refs.dialog.show = true
    },
    addClick() {
      this.$router.push({
        name: 'viewdetails'
      })
    }
  }
}
</script>

<style lang="less" scoped>
	.procurementof-supplies {
		padding: 20px;

		.search>.select>div {
			margin-right: 0;
			width: 25%;
		}

		.fill-name {
			width: 100%;
		}

		.state {
			cursor: pointer;
		}

	}
</style>
