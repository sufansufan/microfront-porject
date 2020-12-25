<template>
  <div class="main-content">
    <div class="search">
      <div class="select">
        <div>
          <span>申请日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="fill-name"
          />
        </div>
        <div>
          <span>所属组织</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-name"
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
          <span>借款人</span>
          <el-input
            v-model="input"
            placeholder="请输入"
            class="fill-name"
          />
        </div>
        <div>
          <span>状态</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-name"
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
          <span>借款类型</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-name"
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
          <span>借款对象</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-name"
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
          <span>支付方式</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-name"
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
            class="fill-text ascription"
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
            class="fill-text"
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
          <el-input
            v-model="input"
            placeholder="请输入"
            class="fill-name"
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
          <el-button-group>
            <el-button type="primary" @click="addClick"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
            <el-button type="primary"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
            <el-button type="primary">撤销</el-button>
            <el-button type="primary" @click="addClick('repayment')">还款</el-button>
          </el-button-group>
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
          prop="loannumber"
          label="借款单号"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="addClick('detail')"
            >{{ scope.row.loannumber }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="borrower"
          align="center"
          label="借款人"
        />
        <el-table-column
          prop="organization"
          label="所属组织"
          align="center"
        />
        <el-table-column
          prop="loanamount"
          label="借款金额"
          align="center"
        />
        <el-table-column
          prop="amountpaid"
          label="已还金额"
          align="center"
        />
        <el-table-column
          prop="unpaidamount"
          label="未还金额"
          align="center"
        />
        <el-table-column
          prop="typesofloans"
          label="借款类型"
          align="center"
        />
        <el-table-column
          prop="borrowers"
          label="借款对象"
          align="center"
          width="180"
        />
        <el-table-column
          prop="dateofpayment"
          label="用款日期"
          align="center"
          width="180"
        />
        <el-table-column
          prop="repaymentdate"
          label="预计还款日期"
          align="center"
          width="180"
        />
        <el-table-column
          prop="paymentmethod"
          label="支付方式"
          align="center"
          width="180"
        />
        <el-table-column
          prop="applicationtime"
          label="申请时间"
          align="center"
          width="180"
        />
        <el-table-column
          prop="usageofloan"
          label="借款用途"
          align="center"
          width="180"
        />
        <el-table-column
          prop="entryname"
          label="项目名称"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="归属单位"
          align="center"
        />
        <el-table-column
          prop="state"
          label="状态"
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
import { formatMoney } from '../../../../core/utils/'
export default {
  mixins: [pagination],
  data() {
    return {
      value1: '',
      tableData: [
        {
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
        }
      ]
    }
  },
  methods: {
    addClick(type) {
      if (type === 'detail') {
        this.$router.push({ name: 'loandetail' })
      } else if (type === 'repayment') {
        this.$router.push({ name: 'repayment' })
      } else {
        this.$router.push({ name: 'addLoan' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main-content {
  padding: 20px;
  .search > .select > div {
    margin-right: 0;
    width: 25%;
  }
  .fill-name {
    width: 380px;
  }
  .fill-text {
    width: 189px;
  }
  .ascription {
    margin-right: 2px;
  }
}
</style>
