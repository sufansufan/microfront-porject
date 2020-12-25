<template>
  <div class="project-statistics">
    <div class="right">
      <div class="search">
        <div class="select">
          <div>
            <span>完成日期</span>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
          <div>
            <span>项目归属</span>
            <el-select
              v-model="value"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="value"
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
          <div>
            <span>项目名称</span>
            <el-select
              v-model="value"
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
          <div style="margin-right:0;">
            <el-button
              type="primary"
              icon="el-icon-search"
            >查询</el-button>
          </div>
        </div>
      </div>
      <div class="tab-public">
        <el-table
          :data="tableData"
          row-key="id"
          border
          default-expand-all
        >

          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50"
          />
          <el-table-column
            prop="organization"
            label="项目名称"
            align="center"
            header-align="center"
          />
          <el-table-column
            prop="organization"
            label="项目归属"
            align="center"
            header-align="center"
          />
          <el-table-column
            label="借款统计"
            header-align="center"
          >
            <el-table-column
              prop="loanAmount"
              label="借款金额"
              align="right"
              header-align="center"
            />
            <el-table-column
              prop="loanReimbursedAmount"
              label="借款已报销金额"
              header-align="center"
              align="right"
            />
            <el-table-column
              prop="repaymentAmountLoan"
              label="借款已还现金额"
              header-align="center"
              align="right"
            />
            <el-table-column
              prop="outstandingAmountLoan"
              label="借款未还金额"
              header-align="center"
              align="right"
            />
          </el-table-column>
          <el-table-column
            prop="reimbursementAmount"
            header-align="center"
            label="报销金额"
            align="right"
          >
            <template slot-scope="scope">
              <div

                @click="taskJump(scope.row)"
              >{{ scope.row.reimbursementAmount }}</div>
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
      <div class="search" style="margin-top:30px;">
        <div class="select">
          <div>
            <span>借款金额合计</span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
            />
          </div>
          <div>
            <span>借款已报销金额合计</span>
            <el-select
              v-model="value"
              placeholder="请选择"
            >
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
              />
            </el-select>
          </div>
          <div>
            <span>借款已还现金额合计</span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
            />
          </div>
          <div>
            <span>借款未还金额合计</span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
            />
          </div>
          <div>
            <span>报销金额合计</span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
import { formatMoney } from '../../../../../core/utils/'
export default {
  mixins: [pagination],
  data() {
    return {
      count: 30,
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      tableData: [
        {
          id: 1,
          organization: '工程部',
          loanAmount: formatMoney(5000),
          loanReimbursedAmount: formatMoney(6900),
          repaymentAmountLoan: formatMoney(7800),
          outstandingAmountLoan: formatMoney(9000),
          reimbursementAmount: formatMoney(8000)
        },
        {
          id: 1,
          organization: '工程部子部门1',
          loanAmount: formatMoney(5000),
          loanReimbursedAmount: formatMoney(6900),
          repaymentAmountLoan: formatMoney(7800),
          outstandingAmountLoan: formatMoney(9000),
          reimbursementAmount: formatMoney(8000)
        }
      ]
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    changeTab(status) {
      this.$emit('changeTabConent', 'system', status)
    },
    taskJump(val) {
      this.$emit('changeTabConent', 'system', 'config')
    }
  }
}
</script>

<style lang="less" scoped>
.project-statistics {
  padding: 0 20px;
  .link-a {
    color: #0a4c8a;
    cursor: pointer;
  }
  .zhi{
    min-width: 33px;
    margin-right: 0;
  }
  .select {
    div{
      align-items: center;
    }
  }
}
</style>
