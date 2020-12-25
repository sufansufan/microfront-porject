<template>
  <div class="site-acceptance">
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column prop="id" label="序号" fixed width="50" align="center" />
        <el-table-column prop="name" label="验收单号" width="100" sortable align="center" fixed />
        <el-table-column prop="name" label="采购单号" width="120" align="center" fixed sortable />
        <el-table-column prop="name" label="供应商" align="center" width="100" />
        <el-table-column prop="name" label="发货日期" align="center" width="100" />
        <el-table-column prop="rule" label="供货单" align="center" header-align="center" />
        <el-table-column prop="rule" label="验货资料" align="center" header-align="center" />
        <el-table-column prop="name" label="预计到货时间" sortable align="center" width="120" />
        <el-table-column prop="name" label="验收地点" align="center" width="100" />
        <el-table-column prop="name" label="负责人" align="center" />
        <el-table-column prop="name" label="验收完成时间" width="120" align="center" sortable />
        <el-table-column prop="name" label="状态" align="center" />
        <el-table-column prop="name" label="验收结果" width="100" align="center" />
        <el-table-column prop="name" label="验收文件" width="100" align="center" />
        <el-table-column prop="name" label="上传人" align="center" />
        <el-table-column prop="name" label="上传日期" width="100" align="center" sortable />
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
  .site-acceptance {
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
