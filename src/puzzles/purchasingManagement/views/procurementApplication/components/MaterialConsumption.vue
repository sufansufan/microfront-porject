<template>
  <div class="material-consumption">
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column prop="id" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="申请单号" width="100" sortable align="center" />
        <el-table-column prop="name" label="付款方式" width="120" align="center" />
        <el-table-column prop="name" label="付款类别" width="120" align="center" />
        <el-table-column prop="name" label="申请金额" sortable align="center" width="100" />
        <el-table-column prop="name" label="要求付款日期" align="center" width="120" />
        <el-table-column prop="rule" label="付款金额" align="right" header-align="center" />
        <el-table-column prop="rule" label="实际付款日期" width="120" align="center" header-align="center" />
        <el-table-column prop="name" label="合同编号" sortable align="center" width="100" />
        <el-table-column prop="name" label="工程名称" align="center" width="100" />
        <el-table-column prop="name" label="归属单位" width="100" sortable align="center" />
        <el-table-column prop="name" label="供应商名称" width="120" align="center" />
        <el-table-column prop="name" label="采购订单" width="100" align="center" />
        <el-table-column prop="name" label="备注" align="center" />
        <el-table-column prop="name" label="申请人" align="center" />
        <el-table-column prop="name" label="申请时间" width="100" align="center" />
        <el-table-column prop="name" label="状态" align="center" />
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
    changeTab(status) {
      this.$emit('changeTabConent', 'material', status)
    }
  }
}
</script>

<style lang="less" scoped>
  .material-consumption {
    .dictionary-form {
      display: flex;
      flex-wrap: wrap;
      .full-item {
        width: 100%;
      }
      .there-points {
        width: 33.3%;
        .el-form-item__content {
          display: flex;
          .is-disabled {
            width: 100%;
          }
          .el-select {
            width: 100%;
          }
        }
      }
      .two-points {
        width: 66.6%;
      }
      .ipt-one {
        .is-plain {
          width: 20%!important;
        }
          .el-input__inner {
            text-align: center;
          }
        }
      .one-pointes {
        span {
          display: inline-block;
          width: 40px;
          margin-left: 6px;
          color: @primary;
        }
      }
    }
    .search>.select>.fill-name {
			width: 30%;
			margin-right: 5px;

			.fill-line {
				width: 100%;
			}

			span {
				text-align: right;

			}
    }
    .search > .select > div > span {
      min-width: 80px;
    }
   .link-a {
      color:@primary;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin-right:4px;
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
