<template>
  <div class="project-attendance">
    <div class="search">
      <div class="select">
        <div>
          <span>项目归属</span>
          <el-select v-model="value" placeholder="请选择" style="width:100px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <span>项目名称</span>
          <el-select v-model="value" placeholder="请选择项目名称">
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
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="applicationtype" label="合同编号" align="center" />
        <el-table-column prop="type" align="center" label="项目名称（点击项目名称进入）" width="230">
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="$emit('changeTabConent', 'project', 'details')"
            >{{ scope.row.type }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="归属单位" align="center" width="150" />
        <el-table-column prop="downtime" label="建设单位" align="center" width="150" />
        <el-table-column prop="rate" label="工程地点" align="center" width="150" />
        <el-table-column prop="task" label="开工日期" align="center" />
        <el-table-column prop="task" label="竣工日期" align="center" />
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
