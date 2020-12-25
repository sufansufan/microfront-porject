
<template>
  <div class="usage-record">
    <el-table :data="tableData" row-key="id" border default-expand-all>
      <el-table-column prop="id" label="序号" width="50" align="center" />
      <el-table-column prop="name" label="车牌号码" sortable align="center" />
      <el-table-column prop="name" label="所属组织" align="center" />
      <el-table-column prop="name" label="加油日期" sortable align="center" />
      <el-table-column prop="name" label="油类型" align="center" />
      <el-table-column prop="rule" label="加油量（升）" align="center" />
      <el-table-column prop="name" label="单价（元）" align="center" />
      <el-table-column prop="name" label="金额（元）" align="center" />
      <el-table-column prop="name" label="经手人" align="center" />
      <el-table-column prop="name" label="录入人" align="center" />
      <el-table-column prop="name" label="录入时间" align="center" />
    </el-table>
  </div>
</template>

<script>
export default {
  components: { },
  data() {
    return {

      tableData: [
        {
          id: '1',
          number: '01',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用',
          states: '未审核'
        }
      ]

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scope>

</style>
