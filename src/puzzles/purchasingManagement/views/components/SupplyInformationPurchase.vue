<template>
  <div class="supply-information-purchase">
    <div class="form-border">
      <el-form :rules="rules" :model="ruleform" class="dictionary-form">
        <el-form-item label="材料款(元)" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="id" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="分布工程名" width="100" align="center" />
        <el-table-column prop="name" label="材料编号" width="120" align="center" />
        <el-table-column prop="rule" label="材料名称" width="100" align="center">
          <template slot-scope="scope">
            <div class="link-a" @click="changeTab('details')">{{ scope.row.number }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="规格型号" align="center" width="100" />
        <el-table-column prop="name" label="特殊要求" align="center" width="100" />
        <el-table-column prop="rule" label="单位" align="center" header-align="center" />
        <el-table-column prop="name" label="品牌" align="center" width="100" />
        <el-table-column prop="name" label="单价" align="right" header-align="center" />
        <el-table-column prop="name" label="本次采购数量" align="center" width="120" />
        <el-table-column prop="name" label="本次发货数量" width="120" align="center" />
        <el-table-column prop="name" label="本次发货金额" width="120" align="center" />
        <el-table-column prop="name" label="备注" align="center" />
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
      this.$emit('changeTabConent', 'delivery', status)
    }
  }
}
</script>

<style lang="less" scoped>
  .supply-information-purchase {
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
      color: @primary;
      cursor: pointer;
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
