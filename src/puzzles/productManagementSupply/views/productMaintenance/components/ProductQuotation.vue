<template>
  <div class="product-quotation">
    <div class="form-border">
      <el-form :rules="rules" :model="ruleform" label-width="120px" class="dictionary-form">
        <el-form-item label="供应商编号" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="供应商名称" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联系人" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机号" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="id" label="序号" width="50" fixed align="center" />

        <el-table-column prop="name" label="合约价" align="center" width="100" sortable />

        <el-table-column prop="name" label="合作协议" align="center" />
        <el-table-column prop="name" label="报价时间" align="center" width="120" sortable />
        <el-table-column prop="name" label="报价有效期止" align="center" width="120" sortable />
        <el-table-column prop="name" label="下架时间" align="center" width="120" sortable />
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

  }
}
</script>

<style lang="less" scoped>
  .product-quotation {
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
    .dictionary-form {
      display: flex;
      flex-wrap: wrap;
      .full-item {
        width: 100%;
      }
      .there-points {
        width: 25%;
        .el-form-item__content {
          display: flex;
          .is-disabled {
            width: 100%;
          }

        }
      }

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
