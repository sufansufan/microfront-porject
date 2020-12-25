<template>
  <div class="project-revenue-account">
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
        </div>
        <div class="fill-name">
          <span>年度</span>
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
          <span>工程状态</span>
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
          <span>建造师</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-line"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>建设单位</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>合同编号</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>项目名称</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div>
          <div>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="primary" icon="el-icon-search">高级搜索</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary">打印</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button type="primary"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
        </div>
      </div>

    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" />
        <el-table-column prop="id" label="序号" width="50" fixed align="center" />
        <el-table-column prop="id" label="合同编号" width="50" fixed align="center" />
        <el-table-column prop="name" label="项目名称" width="120" align="center">
          <template slot-scope="scope">
            <div class="link-a" @click="changeTab()">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="建设单位" align="center" />
        <el-table-column prop="name" label="归属单位" align="center" />
        <el-table-column prop="servicename" label="工程状态" align="center" />
        <el-table-column prop="rule" label="合同金额" width="100" align="right" header-align="center" />
        <el-table-column prop="rule" label="结算金额" align="right" header-align="center" />
        <el-table-column prop="rule" label="已开票金额" width="100" align="right" header-align="center" />
        <el-table-column prop="rule" label="发票无税金额" width="100" align="right" header-align="center" />
        <el-table-column prop="rule" label="发票税金" align="right" header-align="center" />
        <el-table-column prop="rule" label="已收款金额" width="100" align="right" header-align="center" />
        <el-table-column prop="rule" label="甲方质保金" width="100" align="right" header-align="center" />
        <el-table-column prop="rule" label="未收款额" width="100" align="right" header-align="center" />
        <el-table-column prop="rule" label="项目税金" align="right" header-align="center" />
        <el-table-column prop="rule" label="项目管理费" width="100" align="right" header-align="center" />
        <el-table-column prop="rule" label="项目印花税" width="100" align="right" header-align="center" />
        <el-table-column prop="rule" label="项目保证金" width="100" align="right" header-align="center" />
        <el-table-column prop="rule" label="应付款金额" width="100" align="right" header-align="center" />
        <el-table-column prop="rule" label="已付款金额" width="100" align="right" header-align="center" />
        <el-table-column prop="rule" label="未付款金额" width="100" align="right" header-align="center" />
        <el-table-column prop="rule" label="甲方质保/保函/押金" align="right" header-align="center" />
        <el-table-column prop="rule" label="项目质保/押金" align="right" header-align="center" />
        <el-table-column prop="rule" label="是否结清" align="right" header-align="center" />
        <el-table-column prop="rule" label="结清说明" align="right" header-align="center" />
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
  name: 'ProjectRevenueAccount',
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
      this.$router.push('/financialManage/integratedManage/projectRevenueAccount/projectName')
    }
  }
}
</script>

<style lang="less">
  .project-revenue-account {
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
