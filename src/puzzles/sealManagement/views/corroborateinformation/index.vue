<template>
  <div class="corroborate-information">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>编号</span>
          <el-input v-model="input" class="fill-line" placeholder="请输入编号" />
        </div>
        <div class="fill-name">
          <span>印证名称</span>
          <el-input v-model="input" class="fill-line" placeholder="请输入印证名称" />
        </div>
        <div class="fill-name">
          <span>能否借出</span>
          <el-select v-model="value" class="fill-line" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>所属组织</span>
          <el-select v-model="value" class="fill-line" placeholder="请选择组织名称">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>保管人</span>
          <el-input v-model="input" class="fill-line" placeholder="请输入保管人" />
        </div>
        <div class="fill-name">
          <span>状态</span>
          <el-select v-model="value" placeholder="请选择状态" class="fill-line">
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
        <el-table-column prop="index" label="编号" sortable align="center" />
        <el-table-column prop="type" label="印证名称" align="center" sortable>
          <template slot-scope="scope">
            <div class="table-click-color" @click="view(scope.row)">{{ scope.row.type }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="type" align="center" label="所属组织" sortable />

        <el-table-column prop="category" label="保管人" align="center" />
        <el-table-column prop="downtime" label="能否借出" sortable align="center" />
        <el-table-column prop="rate" label="有效期" sortable align="center" />
        <el-table-column prop="vestingunit" label="状态" align="center" sortable />
        <el-table-column prop="downtime" label="使用情况" sortable align="center" />
        <el-table-column prop="rate" label="录入人" align="center" />
        <el-table-column prop="vestingunit" label="录入时间" align="center" />
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

  </div>

</template>

<script>
import pagination from '@core/mixins/pagination'
export default {
  mixins: [pagination],
  data() {
    return {
      count: 30,
      value1: '',
      tableData: [{
        index: '1',
        number: '借款申请',
        type: '借款审批',
        approvalType: 'reimbursementApproval',
        category: '定时',
        downtime: '提前1月',
        rate: '一次',
        task: '否',
        vestingunit: '第一分公司',
        receiver: '行政专员，办公室主任',
        available: '是',
        name: '资质（资质编号）将于有效期到期，请处理相关事宜！',
        deploy: '是',
        updatetime: '2020.01.01'
      }],
      options: [{
        value: 1,
        label: '借款申请'
      },
      {
        value: 2,
        label: '还款申请'
      },
      {
        value: 3,
        label: '报销申请'
      },
      {
        value: 4,
        label: '扣款申请'
      }
      ]
    }
  },
  methods: {
    view(val) {
      if (val.type === '借款审批') {
        this.$router.push({
          name: 'viewverification'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
	.corroborate-information {
		padding: 10px;
		height: calc(100vh - 120px);
		overflow-y: scroll;

		.search>.select>.fill-name {
			width: 29%;

			.fill-line {
				width: 100%;
			}

		}
	}
</style>
