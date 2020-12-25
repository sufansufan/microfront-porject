<template>
  <div class="real-statistics">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>项目归属</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>项目年份</span>
          <el-date-picker v-model="value2" type="month" placeholder="选择月" />
        </div>
        <div class="fill-name">
          <span>工程状态</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>建造师</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>建设单位</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>合同编号</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>工程名称</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <div>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="primary" icon="el-icon-search" @click="query">高级查询</el-button>
            <el-button type="primary" icon="el-icon-search"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>

        <el-table-column prop="index" label="序号" width="50" align="center" fixed="left" />
        <el-table-column prop="applicationtype" label="合同编号" width="120" fixed="left" sortable align="center" />

        <el-table-column prop="type" align="center" label="工程名称" fixed="left" width="150">
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="view(scope.row)"
            >{{ scope.row.type }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="category" label="项目归属" align="center" />
        <el-table-column prop="downtime" label="建设单位" sortable align="center" width="120" />
        <el-table-column prop="rate" label="工程建造师" align="center" width="150" />
        <el-table-column prop="task" label="合同金额" sortable align="center" width="120" />
        <el-table-column prop="vestingunit" label="结算金额" sortable align="center" width="150" />
        <el-table-column prop="vestingunit" label="当前成本总计" sortable align="center" width="150" />
        <el-table-column prop="vestingunit" label="材料费" sortable align="center" width="120" />
        <el-table-column prop="vestingunit" label="设备费" sortable align="center" width="120" />
        <el-table-column prop="vestingunit" label="劳务费" align="center" />
        <el-table-column prop="vestingunit" label="机械使用费" align="center" width="120" />
        <el-table-column prop="vestingunit" label="分包直接费" align="center" width="120" />
        <el-table-column prop="vestingunit" label="其他费用" align="center" />
        <el-table-column prop="vestingunit" label="营销费用" align="center" />
        <el-table-column prop="vestingunit" label="配合费用" align="center" />
        <el-table-column prop="vestingunit" label="企业管理费" align="center" />
        <el-table-column prop="vestingunit" label="税金及附和" align="center" />
        <el-table-column prop="vestingunit" label="现场管理费" align="center" />
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
      <el-form :rules="rules" :model="ruleform" label-width="130px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="合同金额合计:">
              <el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结算金额合计:">
              <el-input v-model="ruleform.number" disabled="true" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="当前成本总计合计:">
              <el-input v-model="ruleform.number" disabled="true" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="材料费合计:">
              <el-input v-model="ruleform.number" disabled="true" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="设备费合计:">
              <el-input v-model="ruleform.number" placeholder="" disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="劳务费合计:" disabled="true">
              <el-input v-model="ruleform.number" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="机械费用合计:">
              <el-input v-model="ruleform.number" placeholder="" disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分包直接费合计:" disabled="true">
              <el-input v-model="ruleform.number" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="其他费用合计:">
              <el-input v-model="ruleform.number" placeholder="" disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="营销费用合计:" disabled="true">
              <el-input v-model="ruleform.number" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="配合费用合计:">
              <el-input v-model="ruleform.number" placeholder="" disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业管理费用合计:" disabled="true">
              <el-input v-model="ruleform.number" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="税金及附加合计:">
              <el-input v-model="ruleform.number" placeholder="" disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="现场管理费合计:" disabled="true">
              <el-input v-model="ruleform.number" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <drag-dialog ref="dialog" title="高级查询" width="50%" height="60%">
      <advanced-query />
    </drag-dialog>

  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import AdvancedQuery from './components/advancedquery'
import pagination from '@core/mixins/pagination'
export default {
  components: {
    DragDialog,
    AdvancedQuery
  },
  mixins: [pagination],
  data() {
    return {
      count: 30,
      value2: '',
      tableData: [{
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
  },
  methods: {
    query() {
      this.$refs.dialog.show = true
    },
    view() {
      this.$router.push({
        name: 'projectdetails'
      })
    }
  }
}
</script>

<style lang="less">
	.real-statistics {
		.search {
			.select {
				.fill-name {
					width: 22%;
				}

				.el-range-editor,
        .el-select,
        .el-date-editor {
					width: 100%;
				}
			}
		}

		.form-top {
			margin-top: 20px;
		}
	}
</style>
