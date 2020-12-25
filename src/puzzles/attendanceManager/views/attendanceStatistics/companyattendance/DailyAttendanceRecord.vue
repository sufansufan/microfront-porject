<template>
  <div class="daily-attendance-record">
    <div class="search">
      <div class="select">
        <div>
          <span>日期</span>
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div>
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
        <div>
          <slot name="checkbox" />
        </div>
        <div>
          <slot name="button" />
        </div>

        <div>
          <el-button type="primary">查询</el-button>
          <el-button type="primary"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="姓名" width="50" align="center" />
        <el-table-column prop="applicationtype" label="工号" align="center" />
        <el-table-column prop="category" label="日期" align="center" width="150" />
        <div>
          <slot name="table" />
        </div>
        <el-table-column prop="downtime" label="打卡时间" align="center" width="150" />
        <el-table-column prop="rate" label="打卡设备" align="center" width="150" />
        <el-table-column prop="task" label="打卡地址" align="center" />
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
.daily-attendance-record{
  .search>.select>div{
    width:18%;
    .el-range-editor--small.el-input__inner,.el-select{
    width:100%;
  }
  }

}
</style>
