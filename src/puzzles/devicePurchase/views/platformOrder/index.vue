<template>
  <div class="platform-order">
    <div class="search">
      <div style="margin:0 0 15px 15px;">
        <el-button class="back-btn" @click="backGo()"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column prop="id" label="序号" width="50" align="center" />
        <el-table-column prop="number" label="订单号" width="180" align="center" sortable>
          <template slot-scope="scope">
            <div class="table-click-color" @click="changeTab()">
              {{ scope.row.number }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="下单时间" width="120" align="center" sortable />
        <el-table-column prop="name" label="金额" width="120" sortable align="right" header-align="center" />
        <el-table-column prop="name" label="数量" width="120" sortable align="right" header-align="center" />
        <el-table-column prop="name" label="采购人" width="180" align="left" header-align="center" />
        <el-table-column prop="rule" label="收货人" width="180" align="left" header-align="center" />
        <el-table-column prop="rule" label="联系电话" width="180" align="left" header-align="center" />
        <el-table-column prop="name" label="收货地址" width="180" align="left" header-align="center" />
        <el-table-column prop="name" label="订单备注" width="180" align="left" header-align="center" />
        <el-table-column prop="name" label="订单状态" width="180" align="left" header-align="center" sortable />
        <el-table-column prop="name" label="开票状态" width="180" align="left" sortable header-align="center" />
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
          number: '123'
        },
        {
          id: '2',
          number: '02',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用',
          number: '123'
        }
      ]
    }
  },
  methods: {
    changeTab() {
      this.$router.push('/devicePurchase/platformDetails')
    },
    backGo() {
      this.$router.push('/devicePurchase/platformProcurement')
    }
  }
}
</script>

<style lang="less" scoped>
  .platform-order {
    padding: 12px;
    height: calc(100% - 100px);
    overflow-y: scroll;
    .dictionary-form {
      display: flex;
      flex-wrap: wrap;
      .there-points {
        width: 33.3%;
        .el-form-item__content {
          display: flex;
          .el-input {
            width: 70%;
          }
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
      span {
        text-decoration: underline;
      }
    }
    .form-top{
      margin-top: 20px;
    }
  }
</style>
