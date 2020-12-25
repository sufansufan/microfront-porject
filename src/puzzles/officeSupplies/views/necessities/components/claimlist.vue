<template>
  <div class="claim-list">
    <el-table :data="tableData" row-key="id" border default-expand-all>
      <el-table-column prop="index" label="序号" width="50" align="center" />
      <el-table-column prop="index" label="编号" width="50" align="center" />
      <el-table-column prop="loannumber" label="物品名称" width="180" align="center" />
      <el-table-column prop="borrower" align="center" label="规格" />
      <el-table-column prop="organization" label="单位" align="center" />
      <el-table-column prop="typesofloans" label="申领数量" align="center" />
      <el-table-column prop="typesofloans" label="备注" align="center" />
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
