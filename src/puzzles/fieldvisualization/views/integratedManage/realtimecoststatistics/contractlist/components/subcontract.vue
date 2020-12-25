<template>
  <div class="sub-contract">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>承包公司</span>
          <el-select
            v-model="value"
            placeholder="请选择"
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
          <span>合同编号</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>合同金额</span>
          <el-input />至<el-input />
        </div>
        <div>
          <div>
            <el-button
              type="primary"
              icon="el-icon-search"
            >查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          prop="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="applicationtype"
          label="审核状态"
          align="center"
        />

        <el-table-column
          prop="type"
          align="center"
          label="审核结果"
          width="200"
        />
        <el-table-column
          prop="category"
          label="合同编号"
          align="center"
        />
        <el-table-column
          prop="downtime"
          label="合同状态"
          align="center"
        />
        <el-table-column
          prop="rate"
          label="合同名称"
          align="center"
          width="150"
        />
        <el-table-column
          prop="task"
          label="承包公司"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="签订日期"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="合同金额"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="结算金额"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="收票金额"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="付款金额"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="未付金额"
          align="center"
        />
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
    <div class="form-top">
      <el-form
        :rules="rules"
        :model="ruleform"
        label-width="110px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item
              label="合同金额合计:"
            >
              <el-input
                v-model="ruleform.number"
                placeholder="请输入"
                disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="收票金额合计:"
            >
              <el-input
                v-model="ruleform.number"
                disabled="true"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="付款金额合计:"
            >
              <el-input
                v-model="ruleform.number"
                disabled="true"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="未付金额合计:"
            >
              <el-input
                v-model="ruleform.number"
                placeholder=""
                disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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

<style lang="less">
.sub-contract{
  .search{
    .select{
      .fill-name{
        width:22%;
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
