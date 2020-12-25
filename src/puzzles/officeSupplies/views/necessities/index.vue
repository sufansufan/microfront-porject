<template>
  <div class="necessities">
    <div class="search">
      <div class="select">
        <div>
          <span>编号</span>
          <el-input v-model="input" placeholder="请输入领用编号" class="fill-name" />
        </div>
        <div>
          <span>领用部门</span>
          <el-input v-model="input" placeholder="请输入领用部门" class="fill-name" />
        </div>
        <div>
          <span>领用人</span>
          <el-input v-model="input" placeholder="请输入领用人名称" class="fill-name" />
        </div>

        <div style="width:50%;">
          <span>领用时间</span>
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
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="tabClick('add')"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
            <el-button type="primary"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
          </el-button-group>
        </div>

      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" />
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="loannumber" label="编号" sortable width="180" align="center">
          <template slot-scope="scope">
            <div class="table-click-color" @click="tabClick('detail')">{{ scope.row.loannumber }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="borrower" align="center" label="领用部门" sortable />
        <el-table-column prop="organization" label="领用人" sortable align="center" />
        <el-table-column prop="loanamount" label="领用时间" sortable align="center" />
        <el-table-column prop="amountpaid" label="领用说明" align="center" />
        <el-table-column prop="unpaidamount" label="状态" sortable align="center">
          <template slot-scope="scope">
            <div class="table-click-color state" @click="tabClick('state')">{{ scope.row.unpaidamount }}</div>
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
      count: 3,
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
    // changeTab(row) {
    //   this.$refs.dialog.show = true
    // },
    tabClick(type) {
      if (type === 'add') {
        this.$router.push({
          name: 'newsupplies'
        })
      } else {
        this.$router.push({
          name: 'viewingsupplies'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
	.necessities {
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
