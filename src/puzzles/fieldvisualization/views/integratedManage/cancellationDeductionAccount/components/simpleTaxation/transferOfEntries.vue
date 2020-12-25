// 进项转出
<template>
  <div class="transfer-of-entries">
    <div class="search">
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="changeShow"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="id" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="合同编号" align="center" />
        <el-table-column prop="name" label="项目名称" align="center" />
        <el-table-column prop="name" label="发票代码" align="center" />
        <el-table-column prop="name" label="发票编号" align="center" />
        <el-table-column prop="rule" label="开票日期" align="center" header-align="center" />
        <el-table-column prop="rule" label="销方纳税人识别号" align="center" header-align="center" />
        <el-table-column prop="rule" label="税金合计（发票金额）" header-align="center" />
        <el-table-column prop="rule" label="金额（不含税金额）" align="right" header-align="center" />
        <el-table-column prop="rule" label="税额（发票税金）" header-align="center" />
        <el-table-column prop="rule" label="进项转出日期" align="right" header-align="center" />
        <el-table-column prop="rule" label="进项转出税率" align="center" header-align="center" />
        <el-table-column prop="states" label="转出原因" align="center" header-align="center" />>
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
export default {
  components: { },
  data() {
    return {
      count: 30,
      ruleform: {
        number: 111
      },
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
        },
        {
          id: '2',
          number: '02',
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
    changeTab() {
      this.$router.push('/financialManage/integratedManage/cancellationDeductionAccount')
    }

  }
}
</script>

<style lang="less" scope>
  .transfer-of-entries {

  }
</style>
