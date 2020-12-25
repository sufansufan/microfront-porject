<template>
  <div class="refueling-management">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>车牌号码</span>
          <el-input
            v-model="input"
            class="fill-line"
            placeholder="请输入"
          />
        </div>
        <div class="fill-name">
          <span>所属组织</span>
          <el-select
            v-model="value"
            class="fill-line"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>支付方式</span>
          <el-select
            v-model="value"
            class="fill-line"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>加油卡号</span>
          <el-input
            v-model="input"
            class="fill-line"
            placeholder="请输入"
          />
        </div>
        <div class="fill-name">
          <span>经手人</span>
          <el-input
            v-model="input"
            class="fill-line"
            placeholder="请输入"
          />
        </div>
        <div class="fill-name">
          <span>加油日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div>
          <div>
            <el-button
              type="primary"
              icon="el-icon-search"
            >查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          type="selection"
          width="40"
          fixed
        />
        <el-table-column
          prop="index"
          label="序号"
          width="50"
          fixed
          align="center"
        />
        <el-table-column
          prop="applicationtype"
          label="车牌号码"
          align="center"
          sortable
          width="150"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="view(scope.row)"
            >{{ scope.row.type }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="type"
          align="center"
          label="所属组织"
        />

        <el-table-column
          prop="category"
          label="支付方式"
          align="center"
          sortable
          width="150"
        />
        <el-table-column
          prop="downtime"
          label="加油卡号"
          sortable
          width="150"
          align="center"
        />
        <el-table-column
          prop="rate"
          label="加油日期"
          align="center"
        />
        <el-table-column
          prop="task"
          label="油类型"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="加油量（升）"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="单价（元）"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="金额（元）"
          align="center"
          sortable
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="经手人"
          align="center"
          sortable
        />
        <el-table-column
          prop="vestingunit"
          label="录入人"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="录入时间"
          align="center"
        />
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
      tableData: [
        {
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
        }
      ],
      options: [
        {
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
        this.$router.push({ name: 'licenseplateinformation' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.refueling-management{
   padding:20px;
  height: calc(100vh - 120px);
  overflow-y: scroll;
   .search>.select>.fill-name{
    width:29%;
    .fill-line{
      width:100%;
    }

  }
}
</style>
