<template>
  <div class="month-invoicerecording">
    <el-form label-width="90px" :rules="rules" :model="ruleform">
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目名称" prop="rolename">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同编号" prop="rolename">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="typename" align="center" label="开票日期" />
        <el-table-column prop="category" label="发票类型" align="center" />
        <el-table-column prop="downtime" label="开票税率" align="center" />
        <el-table-column prop="downtime" label="发票金额（含税销售额）" align="center" width="150" />
        <el-table-column prop="rate" label="发票无税金额（不含税销售额）" align="center" />
        <el-table-column prop="rate" label="发票税金（应缴增值税）" align="center" />

      </el-table>
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
