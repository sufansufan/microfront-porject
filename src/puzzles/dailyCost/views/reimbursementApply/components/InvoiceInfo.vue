<template>
  <div class="invoice-info">
    <el-table :data="tableData" row-key="id" border default-expand-all>
      <el-table-column type="selection" width="40" />
      <el-table-column prop="index" label="序号" width="50" align="center" />
      <el-table-column prop="loannumber" label="发票编号" width="180" align="center" />
      <el-table-column prop="borrower" align="center" label="报销科目" />
      <el-table-column prop="organization" label="报销金额" align="right" header-align="center" />
      <el-table-column prop="loanamount" label="收票日期" align="center" />
      <el-table-column prop="amountpaid" label="开票日期" align="center" />
      <el-table-column prop="unpaidamount" label="发票类型" align="center" />
      <el-table-column prop="typesofloans" label="开票税率" align="right" header-align="center" />
      <el-table-column prop="borrowers" label="发票金额" align="right" header-align="center" />
      <el-table-column prop="dateofpayment" label="发票税金" align="right" header-align="center" />
      <el-table-column prop="repaymentdate" label="发票无税金额" align="right" header-align="center" width="120" />
      <el-table-column prop="paymentmethod" label="发票代码" align="center" />
      <el-table-column prop="applicationtime" label="销方纳税人识别号" align="center" width="180" />
      <el-table-column prop="usageofloan" label="开票单位" align="center" width="180" />
      <el-table-column prop="entryname" label="备注" align="center" />
      <el-table-column prop="vestingunit" label="附件" align="center" />
      <el-table-column prop="state" label="录入人" align="center" />
      <el-table-column prop="state" label="录入时间" align="center" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        index: '1',
        loannumber: '1234567890987654321',
        borrower: '小李',
        organization: '工程部',
        loanamount: 3000,
        amountpaid: 3000,
        unpaidamount: 3000,
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

<style lang="less" scoped>
.invoice-info {
  margin-top: 20px;
}
</style>
