<template>
  <div class="invoice-information">
    <el-table
      :data="tableData"
      row-key="id"
      border
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
      />
      <el-table-column
        label="发票编号"
        header-align="center"
        width="150"
        prop="name"
      />
      <el-table-column
        prop="name"
        label="报销科目"
        header-align="center"
      />
      <el-table-column
        prop="address"
        header-align="center"
        label="报销金额"
        width="200"
      />
      <el-table-column
        prop="name"
        label="收票日期"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="报销对象"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="开票日期"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="发票类型"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="开票税率"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="发票金额"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="发票税金"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="发票无税金额"
        header-align="center"
        width="150px"
      />
      <el-table-column
        prop="name"
        label="发票代码"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="销方纳税人识别号"
        header-align="center"
        width="150px"
      />
      <el-table-column
        prop="name"
        label="开票单位"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="备注"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="附件"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="录入人"
        header-align="center"
      />
      <el-table-column
        prop="name"
        label="录入时间"
        header-align="center"
      />
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
        id: 1,
        date: 'JDY20181210-001',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: 'JDY20181210-001',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }]
    }
  }
}
</script>

<style>

</style>
