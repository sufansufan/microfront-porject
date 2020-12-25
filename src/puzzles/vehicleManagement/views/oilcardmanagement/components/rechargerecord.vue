
<template>
  <div class="recharge-record">
    <el-table :data="tableData" row-key="id" border default-expand-all>
      <el-table-column prop="id" label="序号" width="50" align="center" />
      <el-table-column prop="name" label="加油卡号" sortable align="center" />
      <el-table-column prop="name" label="充值日期" align="center" />
      <el-table-column prop="name" label="充值金额" sortable align="center" />
      <el-table-column prop="name" label="充值人" align="center" />
      <el-table-column prop="rule" label="备注" align="center" />
      <el-table-column prop="name" label="录入人" align="center" />
      <el-table-column prop="name" label="录入时间" align="center" />
      <el-table-column prop="name" label="操作" align="center" />
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
