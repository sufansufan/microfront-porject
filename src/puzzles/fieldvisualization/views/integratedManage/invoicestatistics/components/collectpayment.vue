<template>
  <div class="collect-payment">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>发票编号</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>发票类型</span>
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
          <span>开票日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="fill-name">
          <span>付款金额</span>
          <el-input />至<el-input />
        </div>
        <div class="fill-name">
          <span>付款情况</span>
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
          <span>税率</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>录入日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="fill-name">
          <span>备注</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>发票归类</span>
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
          <span>开票单位</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>合同编号（子）</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>合同名称</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>项目归属</span>
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
          <span>工程名称</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>合同编号</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>工程状态</span>
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
        <div>
          <div>
            <el-button
              type="primary"
              icon="el-icon-search"
            >查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button type="primary"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
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
          label="付款情况"
          align="center"
        />

        <el-table-column
          prop="type"
          align="center"
          label="发票编号"
          width="200"
        />
        <el-table-column
          prop="category"
          label="收票日期"
          align="center"
        />
        <el-table-column
          prop="downtime"
          label="开票日期"
          align="center"
        />
        <el-table-column
          prop="rate"
          label="发票类型"
          align="center"
          width="150"
        />
        <el-table-column
          prop="task"
          label="发票金额"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="税率"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="税金"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="无税金额"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="付款余额"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="合同编号（子）"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="合同名称"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="发票归类"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="合同编号"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="工程名称"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="归属单位"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="工程状态"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="开票单位"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="备注"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="状态"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="录入时间"
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
          <el-col :span="8">
            <el-form-item
              label="发票金额合计:"
            >
              <el-input
                v-model="ruleform.number"
                placeholder="请输入"
                disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="发票税金合计:"
            >
              <el-input
                v-model="ruleform.number"
                disabled="true"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="无税金额合计:"
            >
              <el-input
                v-model="ruleform.number"
                disabled="true"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="付款金额合计:"
            >
              <el-input
                v-model="ruleform.number"
                placeholder=""
                disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="付款余额合计:"
              disabled="true"
            >
              <el-input
                v-model="ruleform.number"
                placeholder="请输入"
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
.collect-payment{
  .search{
    .select{
      .fill-name{
        width:23%;
        margin-right:10px;
        span{
          min-width:100px;
          text-align: right
        }
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
