<template>
  <div class="adjusting-button">
    <el-form label-width="130px" :rules="rules" :model="ruleform">
      <el-row>
        <el-col :span="24">
          <el-form-item label="可扣除分包额合计" prop="rolename">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    <div>
      <p>请在本月收票记录中勾选可扣除的发票记录：</p>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="typename" align="center" label="收票日期" />
        <el-table-column prop="category" label="发票编号" align="center" />
        <el-table-column prop="downtime" label="发票归类" align="center" />
        <el-table-column prop="downtime" label="开票日期" align="center" width="150" />
        <el-table-column prop="rate" label="发票类型" align="center" />
        <el-table-column prop="rate" label="发票税率" align="center" />
        <el-table-column prop="rate" label="发票金额" align="center" />
        <el-table-column prop="downtime" label="发票无税金额" align="center" />
        <el-table-column prop="downtime" label="发票税金" align="center" width="150" />
        <el-table-column prop="rate" label="合同编号" align="center" />
        <el-table-column prop="rate" label="合同名称" align="center" />
        <el-table-column prop="rate" label="是否认证" align="center" />
      </el-table>
    </div>
    <div style="margin-top:20px;">
      <el-button type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
      ruleform: {
        rolename: ''
      },
      tableData: [{
        index: '1',
        number: '02',
        category: '定时',
        typename: '公司资质即将到期',
        downtime: '是',
        rate: '路由',
        task: '路有参数',
        vestingunit: '资质名称，资质到期时间',
        finish: '是',
        updatetime: '2020.01.01'
      }]

    }
  }
}
</script>

<style>

</style>
