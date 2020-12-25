<template>
  <div class="application-commission">
    <div class="search">
      <div class="select">
        <div>
          <span>申请单号</span>
          <el-input v-model="input" placeholder="请输入申请单号" class="fill-name" />
        </div>
        <div>
          <span>申请人</span>
          <el-input v-model="input" placeholder="请输入申请人" class="fill-name" />
        </div>

        <div style="width:50%;">
          <span>申请时间</span>
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
          <span>申请部门</span>
          <el-select v-model="value" placeholder="请选择申请部门" class="fill-name">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <span>文件字号</span>
          <el-input v-model="input" placeholder="请输入文件字号" class="fill-name" />
        </div>
        <div>
          <span>类型</span>
          <el-select v-model="value" placeholder="请选择" class="fill-name">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <span>状态</span>
          <el-select v-model="value" placeholder="请选择" class="fill-name">
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
            <el-button type="primary" @click="addClick('add')"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
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
        <el-table-column prop="loannumber" label="申请单号" width="180" align="center">
          <template slot-scope="scope">
            <div class="table-click-color" @click="addClick('detail')">{{ scope.row.loannumber }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="borrower" align="center" label="申请人" />
        <el-table-column prop="organization" label="申请部门" align="center" />
        <el-table-column prop="loanamount" label="联系电话" align="center" />
        <el-table-column prop="amountpaid" label="类型" align="center" />
        <el-table-column prop="unpaidamount" label="文件字号" align="center" />
        <el-table-column prop="typesofloans" label="开具单位" align="center" />
        <el-table-column prop="borrowers" label="申请时间" align="center" width="180" />

        <el-table-column prop="dateofpayment" label="状态" align="center" sortable>
          <template slot-scope="scope">
            <div class="state" @click="changeTab(scope.row)">{{ scope.row.dateofpayment }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="repaymentdate" label="审批结果" align="center" width="180" />

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
    <drag-dialog ref="dialog" title="审批步骤" width="50%" height="80%">
      <approval-procedures />
    </drag-dialog>

  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import ApprovalProcedures from './components/approvalprocedures'
import pagination from '@core/mixins/pagination'
import {
  formatMoney
} from '../../../../core/utils/'
export default {
  components: {
    DragDialog,
    ApprovalProcedures
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
    addClick(type) {
      if (type === 'detail') {
        this.$router.push({
          name: 'viewapplication'
        })
      } else {
        this.$router.push({
          name: 'newapplications'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
	.application-commission {
		padding: 10px;

		.search>.select>div {
			margin-right: 0;
			width: 24%;
		}

		.fill-name {
			width: 100%;
		}

		.state {
			cursor: pointer;
		}

	}
</style>
