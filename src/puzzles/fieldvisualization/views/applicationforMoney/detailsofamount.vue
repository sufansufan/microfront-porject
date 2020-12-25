<template>
  <div class="detailsof-amount">
    <div style="margin-bottom:20px;">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          prop="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="applicationtype"
          label="单据编号"
          align="center"
        />

        <el-table-column
          prop="type"
          align="center"
          label="收款单位"
          width="200"
        />
        <el-table-column
          prop="category"
          label="财务类别"
          align="center"
        />
        <el-table-column
          prop="downtime"
          label="用款金额"
          align="center"
        />
        <el-table-column
          prop="rate"
          label="用款日期"
          align="center"
          width="150"
        />
        <el-table-column
          prop="task"
          label="用款类别"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="合同类型"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="合同编号（内）"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="合同名称"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="用款说明"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="支付方式"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="领款人"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="备注"
          align="center"
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
        />  <el-table-column
          prop="vestingunit"
          label="部门"
          align="center"
        />  <el-table-column
          prop="vestingunit"
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
export default {
  components: {},
  mixins: [pagination],
  data() {
    return {
      count: 30,
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
        }]

    }
  }
}
</script>

<style lang="less">
.detailsof-amount{
   height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 20px;

}

</style>
