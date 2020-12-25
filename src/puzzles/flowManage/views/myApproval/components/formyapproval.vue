<template>
  <div class="for-myapproval">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>申请时间</span>
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
          <span>申请类型</span>
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
          <span>申请人</span>
          <el-input
            v-model="input"
            class="fill-line"
            placeholder="请输入"
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
      <div class="btn">
        <div>
          <el-button type="primary">审批</el-button>
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
        />
        <el-table-column
          prop="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="number"
          label="申请类型"
          align="center"
          sortable
        />

        <el-table-column
          prop="type"
          align="center"
          label="摘要"
          width="200"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="view(scope.row)"
            >{{ scope.row.type }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="category"
          label="环节名称"
          align="center"
        />
        <el-table-column
          prop="downtime"
          label="环节类型"
          sortable
          align="center"
        />
        <el-table-column
          prop="rate"
          label="到达时间"
          sortable
          align="center"
          width="150"
        />
        <el-table-column
          prop="task"
          label="申请人"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="申请时间"
          sortable
          align="center"
          width="150"
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
  components: {
  },
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
        },
        {
          index: '1',
          number: '报销申请',
          type: '报销申请',
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
        },
        {
          index: '2',
          number: '02',
          type: '报销审批（录票后）',
          approvalType: 'costAccountingRecording',
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
          index: '2',
          number: '02',
          type: '出纳借款确认',
          approvalType: 'costAccountingRecording',
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
          type: '报销审批（录票前）',
          approvalType: 'costAccountingRecording',
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
          index: '3',
          number: '03',
          type: '出纳确认报销界面',
          approvalType: 'cashierConfirmsReimbursement',
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
          index: '4',
          number: '04',
          type: '报销审批（录票前）',
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
        },
        {
          index: '5',
          number: '05',
          type: '成本会计录票环节',
          approvalType: 'costAccountingRecording',
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
        this.$router.push({ name: 'loanapproval' })
      } else if (val.type === '报销申请') {
        this.$router.push({ name: 'reimbursementApproval' })
      } else if (val.type === '报销审批（录票后）') {
        this.$router.push({ name: 'approvalafter' })
      } else if (val.type === '出纳借款确认') {
        this.$router.push({ name: 'confirmationofloan' })
      } else if (val.approvalType === 'reimbursementApproval') {
        this.$router.push({ name: 'loanapproval' })
      } else if (val.type === '报销审批（录票前）') {
        this.$router.push({ name: 'reimbursementApproval' })
      } else if (val.type === '成本会计录票环节') {
        this.$router.push({ name: 'costAccounting' })
      } else if (val.type === '出纳确认报销界面') {
        this.$router.push({ name: 'cashierReimbursement' })
      }
    }
  }
}
</script>
 <style lang="less" scoped>
.for-myapproval{
 .search>.select>.fill-name{
    width:30%;
    .fill-line{
      width:100%;
    }

  }
}

</style>
