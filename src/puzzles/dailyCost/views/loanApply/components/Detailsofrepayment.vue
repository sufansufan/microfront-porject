// 还款明细
<template>
  <div class="details-of-repayment">
    <div class="search">
      <div class="select">
        <div>
          <span>已还金额</span>
          <el-input
            v-model="input"
            placeholder="请输入"
            :disabled="disable"
          />
        </div>
        <div>
          <span>未还金额</span>
          <el-input
            v-model="input"
            placeholder="请输入"
            :disabled="disable"
          />

        </div>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
        :disabled="disable"
      >
        <el-table-column
          prop="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="number"
          label="还款日期"
          width="100"
          align="center"
        />
        <el-table-column
          prop="number"
          label="还款方式"
          width="100"
          align="center"
        />
        <el-table-column
          prop="number"
          label="还款金额"
          width="100"
          align="center"
        />

        <el-table-column
          prop="number"
          align="center"
          label="报销单号"
          width="180"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="view(scope.row)"
            >{{ scope.row.number }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          label="支付方式"
          align="center"
        />
        <el-table-column
          prop="number"
          label="支票号"
          align="center"
        />
        <el-table-column
          prop="number"
          label="支票银行名称"
          align="center"
        />
        <el-table-column
          prop="number"
          label="收款账户类型"
          width="120"
          align="center"
        />
        <el-table-column
          prop="number"
          label="收款账户"
          align="center"
        />
        <el-table-column
          prop="number"
          label="收款人"
          align="center"
          width="200"
        />
        <el-table-column
          prop="number"
          label="备注"
          width="100"
          align="center"
        />
        <el-table-column
          prop="number"
          label="确认人"
          align="center"
          width="180"
        />
        <el-table-column
          prop="number"
          label="确认时间"
          align="center"
          width="140"
        />
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  components: { },
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [{ number: '银行账户', index: 1 }]
    }
  }
}
</script>

<style lang="less">
.details-of-repayment {
  .search > .select > div {
    margin: 0 10px 10px 10px;
    width: 48.5%;

  }
}
</style>
