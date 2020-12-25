// 付款明细
<template>
  <div class="invoice-details">
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
        <el-table-column prop="name" label="开票日期" align="center" sortable />
        <el-table-column prop="name" label="合同编号" align="center" sortable />
        <el-table-column prop="name" label="项目名称" align="center" sortable />
        <el-table-column prop="name" label="发票类型" align="center" />
        <el-table-column prop="name" label="发票编号" align="center" sortable />
        <el-table-column prop="rule" label="发票税率" align="right" header-align="center" />
        <el-table-column prop="rule" label="发票金额" align="right" header-align="center" />
        <el-table-column prop="rule" label="发票无税金额" align="right" header-align="center" />
        <el-table-column prop="rule" label="发票税金" align="right" header-align="center" />
        <el-table-column prop="rule" label="备注" align="center" header-align="center" />
        <el-table-column prop="states" label="状态" align="center" header-align="center">
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

<style lang="less">
  .invoice-details {
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
    .stateActive {

    }
  }
</style>
