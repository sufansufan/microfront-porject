<template>
  <div class="data-survey">
    <div class="btn">
      <el-button-group>
        <el-button type="primary" @click="basicConfiguration">基础配置</el-button>
        <el-button type="primary">资料编制</el-button>
        <el-button type="primary">同步更新</el-button>
      </el-button-group>
      <span class="txt">首次进行资料编制请点击这里</span>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="typename" align="center" label="单位工程" width="150" />
        <el-table-column prop="typename" align="center" label="模板库" width="150" />
        <el-table-column prop="typename" align="center" label="类别" width="150" />
        <el-table-column prop="typename" align="center" label="生产数量" width="150" />
        <el-table-column prop="typename" align="center" label="未提交" width="150" />
        <el-table-column prop="typename" align="center" label="无需审批" width="150" />
        <el-table-column prop="typename" align="center" label="专业" width="150" />
        <el-table-column prop="typename" align="center" label="审批中" width="150" />
        <el-table-column prop="typename" align="center" label="审批完成" width="150" />
        <el-table-column prop="downtime" label="专业质检员" align="center">
          <el-table-column prop="downtime" label="审批中" align="center" width="150" />
          <el-table-column prop="rate" label="审批通过" align="center" width="150" />
        </el-table-column>
        <el-table-column prop="typename" align="center" label="专业技术负责人">
          <el-table-column prop="category" label="审批中" align="center" width="150" />
          <el-table-column prop="downtime" label="审批通过" align="center" width="150" />
        </el-table-column>
        <el-table-column prop="typename" align="center" label="项目技术负责人">
          <el-table-column prop="category" label="审批中" align="center" width="150" />
          <el-table-column prop="downtime" label="审批通过" align="center" width="150" />
        </el-table-column>
        <el-table-column prop="typename" align="center" label="项目经理">
          <el-table-column prop="category" label="审批中" align="center" width="150" />
          <el-table-column prop="downtime" label="审批通过" align="center" width="150" />
        </el-table-column>
        <el-table-column prop="typename" align="center" label="专业监理工程师">
          <el-table-column prop="category" label="审批中" align="center" width="150" />
          <el-table-column prop="downtime" label="审批通过" align="center" width="150" />
        </el-table-column>
        <el-table-column prop="typename" align="center" label="总监理工程师">
          <el-table-column prop="category" label="审批中" align="center" width="150" />
          <el-table-column prop="downtime" label="审批通过" align="center" width="150" />
        </el-table-column>
        <el-table-column prop="typename" align="center" label="建设单位">
          <el-table-column prop="category" label="审批中" align="center" width="150" />
          <el-table-column prop="downtime" label="审批通过" align="center" width="150" />
        </el-table-column>
        <el-table-column prop="task" label="归档数量" align="center" width="150" />
      </el-table>
    </div>
    <drag-dialog ref="dialog" :title="title" width="70%" height="70%">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="工程信息" name="first">
          <engineering-information />
        </el-tab-pane>
        <el-tab-pane label="设置账户" name="second">
          <set-up-account />
        </el-tab-pane>
      </el-tabs>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import EngineeringInformation from './EngineeringInformation'
import SetUpAccount from './SetUpAccount'
export default {
  name: 'DataSurvey',
  components: { DragDialog, EngineeringInformation, SetUpAccount },
  data() {
    return {
      value3: '',
      options: [],
      title: '基础配置',
      activeName: 'first',
      tableData: [{
        index: '1',
        number: '02',
        category: '定时',
        typename: '公司资质即将到期',
        downtime: '是',
        rate: '路由',
        task: '路有参数',
        vestingunit: '资质名称，资质到期时间',
        finish: '是',
        updatetime: '2020.01.01'
      }],
      ruleform: {
        number: ''
      }

    }
  },
  methods: {
    basicConfiguration() {
      this.$refs.dialog.show = true
    }
  }
}
</script>

<style lang="less" scoped>
  .data-survey {
    .btn{
      margin-bottom: 10px;
    }
    .txt{
    }
  }
</style>
