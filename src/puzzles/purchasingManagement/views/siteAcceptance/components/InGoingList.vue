<template>
  <div class="ingoing-list">
    <div>
      <el-form :rules="rules" :model="ruleform" class="dictionary-form">
        <el-form-item label="材料款（元）" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="id" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="材料编号" align="center" />
        <el-table-column prop="rule" label="材料名称" width="100" align="center" />
        <el-table-column prop="name" label="规格型号" align="center" width="100" />
        <el-table-column prop="name" label="特殊要求" align="center" width="100" />
        <el-table-column prop="rule" label="单位" align="center" header-align="center" />
        <el-table-column prop="rule" label="品牌" align="center" header-align="center" />
        <el-table-column prop="name" label="单价" align="right" width="100" header-align="center" />
        <el-table-column prop="name" label="采购数量" align="center" header-align="center" />
        <el-table-column prop="name" label="已收货数量" width="120" align="center" />
        <el-table-column prop="name" label="本次发货数量" width="120" align="center" />
        <el-table-column prop="name" label="本次收货数量" align="center" width="160">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number" :min="1" :max="10" label="" @change="handleChange" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="本次收货金额" width="120" align="right" header-align="center" />
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

<style lang="less" scope>
  .ingoing-list {
    .dictionary-form {
      display: flex;
      flex-wrap: wrap;

      .there-points {
        width: 33.3%;
        .el-form-item__content {
          display: flex;

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
