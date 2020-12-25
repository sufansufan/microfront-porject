<template>
  <div class="applicationfor-money">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>单据编号</span>
          <el-input v-model="value1" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>收款单位</span>
          <el-input v-model="value1" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>计划用款日期</span>
          <el-date-picker
            v-model="value1"
            class="fill-line"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="fill-name">
          <span>财务类别</span>
          <el-select v-model="value" class="fill-line" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>用款类别</span>
          <el-select v-model="value" class="fill-line" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>用款说明</span>
          <el-input v-model="value1" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>支付方式</span>
          <el-select placeholder="请选择" style="width: 100%">
            <el-option v-for="item in subjectList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>领款人</span>
          <el-input v-model="value1" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>合同编号</span>
          <el-input v-model="value1" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>工程名称</span>
          <el-input v-model="value1" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>归属单位</span>
          <el-select v-model="value" class="fill-line" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>备注</span>
          <el-input v-model="value1" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>录入人</span>
          <el-input v-model="value1" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>部门</span>
          <el-input v-model="value1" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>录入日期</span>
          <el-date-picker
            v-model="value1"
            class="fill-line"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="fill-name">
          <span>状态</span>
          <el-select v-model="value" class="fill-line" placeholder="请选择">
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
            <el-button type="primary" @click="changeTab()"> <i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
            <el-button type="primary"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
            <el-button type="primary">撤销</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" />
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="type" align="center" label="单据编号" width="200">
          <template slot-scope="scope">
            <div class="table-click-color" @click="view(scope.row)">{{ scope.row.type }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="收款单位" align="center" />
        <el-table-column prop="number" label="财务类别" align="center" />
        <el-table-column prop="number" label="用款金额" align="center" />
        <el-table-column prop="number" label="用款日期" align="center" />
        <el-table-column prop="number" label="用款类别" align="center" />
        <el-table-column prop="number" label="合同类型" align="center" />
        <el-table-column prop="number" label="合同编号" align="center" />
        <el-table-column prop="number" label="合同名称" align="center" />
        <el-table-column prop="number" label="用款说明" align="center" />
        <el-table-column prop="number" label="支付方式" align="center" />
        <el-table-column prop="number" label="领款人" align="center" />
        <el-table-column prop="number" label="合同编号" align="center" />
        <el-table-column prop="vestingunit" label="工程名称" align="center" width="150" />
        <el-table-column prop="number" label="归属单位" align="center" />
        <el-table-column prop="number" label="备注" align="center" />
        <el-table-column prop="number" label="录入人" align="center" />
        <el-table-column prop="vestingunit" label="录入时间" align="center" width="150" />
        <el-table-column prop="vestingunit" label="部门" align="center" width="150" />
        <el-table-column prop="vestingunit" label="状态" align="center" fixed="right">
          <template slot-scope="scope">
            <div>{{ scope.row.type }}</div>
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
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
export default {
  components: {},
  mixins: [pagination],
  data() {
    return {
      count: 30,
      value1: '',
      tableData: [{
        index: '1',
        number: '02',
        type: '浏览',
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
      },
      {
        index: '1',
        number: '02',
        type: '审批中金额明细',
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
      },
      {
        index: '1',
        number: '02',
        type: '公司资质即将到期',
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
      },
      {
        index: '1',
        number: '02',
        type: '公司资质即将到期',
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
      if (val.type === '审批中金额明细') {
        this.$router.push({ name: 'detailsofamount' })
      } else if (val.type === '浏览') {
        this.$router.push({ name: 'browselist' })
      }
    },
    changeTab() {
      this.$router.push({ name: 'addapplications' })
    }
  }
}
</script>
<style lang="less" scoped>
	.applicationfor-money {
		height: calc(100vh - 160px);
		overflow-y: auto;
		padding: 20px;

		.search>.select>.fill-name {
			width: 22%;
			margin-right: 5px;

			.fill-line {
				width: 100%;
			}

			span {
				min-width: 85px;
				text-align: right;

			}
		}
	}
</style>
