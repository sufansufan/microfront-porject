<template>
  <div class="product-maintenance-right">

    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="id" label="序号" width="50" fixed align="center" />
        <el-table-column prop="id" label="产品编号" align="center" />
        <el-table-column prop="name" label="产品名称" width="180" align="center" sortable>
          <template slot-scope="scope">
            <div class="table-click-color" @click="changeTab()">
              <img src="../../../../../../static/platform/star.png" alt="">
              <span>{{ scope.row.rule }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="品牌" width="100" align="center" />
        <el-table-column prop="name" label="单位" align="center" width="100" />
        <el-table-column prop="rule" label="规格型号" width="100" align="center" />
        <el-table-column prop="name" label="产品属性" align="center" width="100" />
        <el-table-column prop="rule" label="产品分类" align="center" width="100" />
        <el-table-column prop="rule" label="市场价" width="100" align="center" />
        <el-table-column prop="name" label="合约价" align="center" width="100" />
        <el-table-column prop="rule" label="供应商编号" align="center" width="180" sortable />
        <el-table-column prop="rule" label="供应商名称" align="center" width="180" sortable />
        <el-table-column prop="name" label="合作协议" align="center" width="100" />
        <el-table-column prop="name" label="报价时间" align="center" width="100" sortable />
        <el-table-column prop="name" label="报价有效期止" align="center" width="180" sortable />
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
          available: '是否可用'
        },
        {
          id: '2',
          number: '02',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用'
        }
      ]
    }
  },
  methods: {
    changeTab() {
      this.$router.push('/productManagementSupply/productMaintenance/productName')
    }
  }
}
</script>

<style lang="less" scoped>
  .product-maintenance-right {
    padding: 10px;
   .table-click-color {
        display: flex;
        justify-content: center;
        img {
          margin-top: 3px;
          margin-right: 4px;
          width: 15px;
          height: 15px;
        }
    }
    .form-top{
      margin-top: 20px;
    }
  }
</style>
<style>
  .el-input.is-disabled .el-input__inner {
    background-color: #FFF!important;
    color: #606266!important;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #FFF!important;
    color: #606266!important;
  }

</style>
