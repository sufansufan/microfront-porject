<template>
  <div class="subject-statistics">
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
            <span>报销科目</span>
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
            <span>组织</span>
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
            <span>员工</span>
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
          <div>
            <span>统计对象</span>
            <el-radio v-model="radio" label="1">全部科目</el-radio>
            <el-radio v-model="radio" label="2">一级科目</el-radio>
            <el-radio v-model="radio" label="3">二级科目</el-radio>
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
            label="报销科目"
            align="center"
            header-align="center"
          />
          <el-table-column
            prop="organization"
            label="报销金额"
            align="right"
            header-align="center"
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
      radio: '1',
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
.subject-statistics {
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
