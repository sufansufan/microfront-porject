<template>
  <div class="confirmation-details">
    <el-table :data="tableData" row-key="id" border default-expand-all>

      <el-table-column prop="index" label="序号" width="50" align="center" />
      <el-table-column prop="loannumber" label="印证名称" sortable width="180" align="center" />
      <el-table-column prop="borrower" align="center" label="使用方式" />
      <el-table-column prop="organization" label="用印次数" align="center" />
      <el-table-column prop="loanamount" label="使用说明" align="center" />
      <el-table-column prop="amountpaid" label="预计归还时间" align="center" />
      <el-table-column prop="unpaidamount" label="是否归还" align="center" />
      <el-table-column prop="typesofloans" label="实际规还时间" align="center" />
      <el-table-column prop="borrowers" label="归还接受人" align="center" width="180" />
    </el-table>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
      tableData: [{
        index: '1',
        loannumber: '1234567890987654321',
        borrower: '小李',
        organization: '工程部',

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
  }
}
</script>

<style>

</style>
