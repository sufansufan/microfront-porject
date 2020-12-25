<template>
  <div class="site-acceptance">
    <div>
      <el-table :data="tableData" row-key="id" border :cell-style="cellstyle">
        <el-table-column type="selection" width="40" fixed />
        <el-table-column prop="index" label="序号" width="50" fixed align="center" />
        <el-table-column prop="type" label="验证单号" fixed align="center" sortable width="120">
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="changeTab('details')"
            >{{ scope.row.type }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="type" align="center" label="采购单号" sortable width="120" />
        <el-table-column prop="category" label="项目名称" align="center" sortable width="120" />
        <el-table-column prop="downtime" label="供应商" align="center" width="120" />
        <el-table-column prop="rate" label="发货日期" sortable align="center" width="120" />
        <el-table-column prop="vestingunit" label="供货单" align="center" width="120">
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="changeTab('supplyorder')"
            >{{ scope.row.vestingunit }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="downtime" label="验货资料" width="120" align="center">
          <template slot-scope="scope">
            <div class="table-click-color" @click="change">{{ scope.row.downtime }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="预计到货时间" sortable width="120" align="center" />
        <el-table-column prop="vestingunit" label="验收地点" width="120" align="center" />
        <el-table-column prop="vestingunit" label="负责人" width="120" align="center" />
        <el-table-column prop="vestingunit" label="验收完成时间" sortable width="150" align="center" />
        <el-table-column prop="vestingunit" label="状态" width="120" align="center">
          <template slot-scope="scope">
            <div
              class="table-click-color"
            >{{ scope.row.vestingunit }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="vestingunit" label="验收结果" width="120" align="center" />
        <el-table-column prop="vestingunit" label="验收文件" width="120" align="center" />
        <el-table-column prop="vestingunit" label="上传人" width="120" align="center" />
        <el-table-column prop="vestingunit" label="上传日期" sortable width="120" align="center" />
      </el-table>
    </div>
    <div v-if="file">
      <el-table
        class="file"
        style="width:300px;"
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column prop="rate" label="文件名称" align="center">
          <template slot-scope="scope">
            <div class="table-click-color">{{ scope.row.rate }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="文件大小" align="center" />
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
  components: {},
  mixins: [pagination],
  data() {
    return {
      file: false,
      count: 30,
      value1: '',
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
        }
      ],
      options: [
        {
          value: 1,
          label: '借款申请'
        },
        {
          value: 2,
          label: '还款申请'
        },
        {
          value: 3,
          label: '报销申请'
        },
        {
          value: 4,
          label: '扣款申请'
        }
      ]
    }
  },
  methods: {
    change() {
      this.file = !this.file
    },
    changeTab(status) {
      this.$emit('changeTabConent', 'siteacceptance', status)
    },

    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'padding-left:40px;'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.site-acceptance {
  .file {
    position: absolute;
    left: 750px;
    top: 93px;
  }
}
</style>
