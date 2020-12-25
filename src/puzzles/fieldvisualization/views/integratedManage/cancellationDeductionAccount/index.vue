<template>
  <div class="cancellation-deduction-account">
    <div class="search">
      <div class="select">
        <div class="fill-full">
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
          <span>计税方式</span>
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
          <span>月份</span>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <div>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="primary" icon="el-icon-search"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%;">
        <el-table-column prop="ids" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="归属单位" align="center" />
        <el-table-column prop="name" label="计税方式">
          <template slot-scope="scope">
            <div class="link-a" @click="changeTab(scope.row.name)">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="amount1" label="含税销售额（发票金额）" align="right" header-align="center" />
        <el-table-column prop="amount2" label="不含税销售额(发票无税金额)" align="right" header-align="center" />
        <el-table-column prop="amount3" label="销项税金/票额" align="right" header-align="center" />
        <el-table-column prop="amount1" label="预缴增值税额" align="right" header-align="center" />
        <el-table-column prop="amount1" label="进项税金/票额" align="right" header-align="center" />
        <el-table-column prop="amount2" label="进项转出额" align="right" header-align="center" />
        <el-table-column prop="amount3" label="可抵税金/票额" align="right" header-align="center" />
        <el-table-column prop="amount1" label="可退进项税" align="right" header-align="center" />
        <el-table-column prop="amount1" label="可退附加税" align="right" header-align="center" />
        <el-table-column prop="amount2" label="月度进项留抵" align="right" header-align="center" />
        <el-table-column prop="amount3" label="已退回税金" align="right" header-align="center" />
        <el-table-column prop="amount1" label="已退回附加税" align="right" header-align="center" />
        <el-table-column prop="amount1" label="未退税金" align="right" header-align="center" />
        <el-table-column prop="amount1" label="未退附加税" align="right" header-align="center" />
        <el-table-column prop="amount2" label="进项留抵总额" align="right" header-align="center" />
        <el-table-column prop="amount3" label="可退税金总计" align="right" header-align="center" />
        <el-table-column prop="amount1" label="总计退回税金" align="right" header-align="center" />
        <el-table-column prop="amount1" label="总计未退税金" align="right" header-align="center" />
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
      tableData: [{
        ids: '1',
        id: '12987122',
        name: '一般计税',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        ids: '2',
        id: '12987123',
        name: '简易计税',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        ids: '3',
        id: '12987124',
        name: '一般计税',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        ids: '4',
        id: '12987125',
        name: '一般计税',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }]
    }
  },
  methods: {
    changeTab(val) {
      if (val === '一般计税') {
        this.$router.push('/financialManage/integratedManage/cancellationDeductionAccount/generalTaxation')
      } else {
        this.$router.push('/financialManage/integratedManage/cancellationDeductionAccount/simpleTaxation')
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scope>
  .cancellation-deduction-account {
    .search>.select{
      .fill-full {
        width: 40%;
        .fill-line {
          width: 50%;
          margin-right: 5px;
        }
      }
      .fill-name {
        width: 22%;
        margin-right: 5px;
        .fill-line {
          width: 100%;
        }
        span {
          text-align: right;
        }
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
