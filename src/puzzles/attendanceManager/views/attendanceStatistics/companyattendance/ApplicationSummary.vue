<template>
  <div class="application-summary">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>申请日期</span>
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="fill-name">
          <span>完成日期</span>
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>

        <!-- <div class="fill-name">
          <span>部门</span>
          <el-select v-model="value" placeholder="请选择部门">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div> -->
        <div>
          <slot name="button" />
        </div>
        <div class="fill-name">
          <span>员工</span>
          <el-select v-model="value" placeholder="请选择员工">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>申请类型</span>
          <el-select v-model="value" placeholder="请选择申请类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>状态</span>
          <el-select v-model="value" placeholder="请选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>结果</span>
          <el-select v-model="value" placeholder="请选择结果">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-button type="primary">查询</el-button>
          <el-button type="primary"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="applicationtype" label="状态" align="center" />
        <el-table-column prop="type" align="center" label="申请类型" width="150" />
        <el-table-column prop="category" label="摘要" align="center" width="150">
          <template slot-scope="scope">
            <div
              class="table-click-color"
            >{{ scope.row.category }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="downtime" label="时长" align="center" width="150" />
        <el-table-column prop="rate" label="其他信息" align="center" width="150" />
        <el-table-column prop="task" label="申请人" align="center" />
        <el-table-column prop="task" label="申请时间" align="center" />
        <el-table-column prop="task" label="完成日期" align="center" />
        <el-table-column prop="task" label="结果" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      value: '',
      checked: false,
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
      options: []
    }
  },
  methods() {}
}
</script>

<style lang="less" scoped>
.application-summary {
  .search > .select > .fill-name{
    width: 23%;
    .el-range-editor--small.el-input__inner,.el-select{
        width:100%;
    }
  }
}
</style>
