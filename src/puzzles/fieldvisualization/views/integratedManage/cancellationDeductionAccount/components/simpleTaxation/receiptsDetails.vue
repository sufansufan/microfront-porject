// 预缴明细
<template>
  <div class="receipts-details">
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
        <el-table-column prop="name" label="合同编号" align="center" sortable />
        <el-table-column prop="name" label="工程名称" align="center" sortable />
        <el-table-column prop="name" label="预缴税款日期" align="center" sortable />
        <el-table-column prop="name" label="预缴增值税" align="center" />
        <el-table-column prop="name" label="预缴税款所在区" align="center" sortable />
        <el-table-column prop="name" label="预缴税率" align="center" />
        <el-table-column prop="name" label="完税凭证号" align="center" sortable />
        <el-table-column prop="name" label="预缴附加税所在区" align="center" width="150" />
        <el-table-column prop="rule" label="附加税率" align="right" header-align="center" />
        <el-table-column prop="rule" label="预缴附加税" align="right" header-align="center" />
        <el-table-column prop="rule" label="缴款人" align="center" header-align="center" sortable />
        <el-table-column prop="rule" label="缴款方式" align="center" header-align="center" />
        <el-table-column prop="rule" label="备注" align="center" header-align="center" />
        <el-table-column prop="rule" label="状态" align="center" header-align="center" sortable>
          <template slot-scope="scope">
            <el-button type="danger" plain>{{ scope.row.states }}</el-button>
          </template>
        </el-table-column>
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
      this.$router.push('/financialManage/integratedManage/cancellationDeductionAccount')
    }

  }
}
</script>

<style lang="less" scope>
  .receipts-details {
    .search>.select>.fill-name {
			width: 22%;
			margin-right: 5px;

			.fill-line {
				width: 100%;
			}

			span {
				text-align: right;

			}
    }
    .btnadd {
      width: 100%;
      text-align: center;
    }
    .dictionary-form {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 50%;
        .el-form-item__content {
          display: flex;
          .is-disabled {
            width: 100%;
          }
          .el-select {
            width: 100%;
          }
          .el-date-editor {
            width: 100%;
          }
        }
      }
      .pay-type {
        margin-right: 50%;
      }
      .full-item {
        width: 100%;
        .btn-anther {
          margin-left: 6px;
        }
      }

    }
   .link-a {
      color:@primary;
      cursor: pointer;
    }

  }
</style>
