<template>
  <div class="project-material-inventory">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>项目名称</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="起始日期"
            end-placeholder="截止日期"
          />
        </div>
        <div>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="primary" icon="el-icon-plus">合并统计</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" />
        <el-table-column prop="id" label="序号" width="50" fixed align="center" />
        <el-table-column prop="id" label="材料编号" width="50" fixed align="center" />
        <el-table-column prop="name" label="材料名称" align="center" />
        <el-table-column prop="name" label="规格型号" align="center" />
        <el-table-column prop="id" label="品牌" align="center" />
        <el-table-column prop="name" label="单位" align="center" />
        <el-table-column prop="servicename" label="采购总量" align="center" />
        <el-table-column prop="rule" label="入库总量" align="right" header-align="center" />
        <el-table-column prop="rule" label="已出库数量" align="right" header-align="center" />
        <el-table-column prop="rule" label="当前库存量" align="right" header-align="center" />
        <el-table-column prop="rule" label="操作" align="right" header-align="center" fixed="right">
          <template slot-scope="scope">
            <div class="link-a" @click="changeTab()">删除？</div>
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
import pagination from '@core/mixins/pagination'
export default {
  components: {

  },
  mixins: [pagination],
  data() {
    return {
      count: 30,
      tableData: [
        {
          index: '1',
          number: '借款申请',
          type: '借款审批',
          approvalType: 'reimbursementApproval',
          category: '定时',
          downtime: '提前1月',
          rate: '一次',
          task: '否',
          vestingunit: '第一分公司',
          receiver: '行政专员，办公室主任',
          available: '是',
          name: '资质（资质编号）将于有效期到期，请处理相关事宜！',
          deploy: '是',
          updatetime: '2020.01.01'
        }],
      ruleform: {
        number: ''
      }

    }
  }
}
</script>

<style lang="less" scoped>
.project-material-inventory{
  .search{
    .select{
      .fill-name{
        width:30%;
      }
      .el-range-editor,.el-select{
        width:100%;
      }
    }
  }
  .form-top{
    margin-top:20px;
  }
}
</style>
