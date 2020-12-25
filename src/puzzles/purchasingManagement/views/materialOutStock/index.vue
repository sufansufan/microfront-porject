<template>
  <div class="material-out-stock">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>项目归属</span>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>出库单号</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>项目名称</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>施工队</span>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>出库日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="起始日期"
            end-placeholder="截止日期"
          />
        </div>
        <div class="fill-name">
          <span>状态</span>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div style="margin-right:0;">
          <div>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" />
        <el-table-column prop="id" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="出库单号" width="120" align="center" sortable>
          <template slot-scope="scope">
            <div class="link-a" @click="changeTab()">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="项目名称" align="center" sortable />
        <el-table-column prop="name" label="出库时间" align="center" sortable />
        <el-table-column prop="rule" label="施工队" width="100" align="center" sortable />
        <el-table-column prop="name" label="领料人" align="center" width="100" />
        <el-table-column prop="rule" label="负责人" align="right" header-align="center" />
        <el-table-column prop="name" label="状态" align="center" width="100" />
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
  name: 'MaterialOutStock',
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
      this.$router.push('/purchasingManagement/materialOutStock/outgoingSingleNumber')
    }
  }
}
</script>

<style lang="less" scoped>
  .material-out-stock {
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
