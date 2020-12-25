<template>
  <div class="routine">
    <div class="duty">
      <p
        style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;text-align:center;padding:15px 0;"
      >日常工作相关应用</p>
      <ul style="padding:10px 0 0 30px;">
        <li>
          <p>印信管理 ></p>
          <el-button type="text">印信管理流程</el-button>
        </li>
        <li>
          <p>办公用品></p>
          <el-button type="text">办公用品管理流程</el-button>
        </li>
        <li>
          <p>车辆管理></p>
          <el-button type="text">车辆管理流程</el-button>
        </li>
        <li>
          <p>日志管理></p>
          <el-button type="text">公司日志提交流程</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
          <el-button type="text">项目日志提交流程（公司项目）</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
          <el-button type="text">项目日志提交流程（分公司/项目部项目）</el-button>
        </li>
        <li>
          <p>考勤管理 ></p>
          <el-button type="text">现场施工人员考勤流程</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
          <el-button type="text">员工考勤流程</el-button>&nbsp;&nbsp;&nbsp;|
          <el-button type="text">项目部成员考勤流程（公司项目）</el-button>&nbsp;&nbsp;&nbsp;|
          <el-button type="text">项目部成员考勤流程（分公司/项目部项目）</el-button>&nbsp;&nbsp;&nbsp;|
          <el-button type="text">项目部成员加班申请审批流程（分公司/项目部项目）</el-button>&nbsp;&nbsp;&nbsp;|
          <el-button type="text">项目部成员考勤申请审批流程（分公司/项目部项目）</el-button>&nbsp;&nbsp;&nbsp;|
          <el-button type="text"> 项目部成员考勤申请审批流程（公司项目） </el-button>&nbsp;&nbsp;&nbsp;|
          <el-button type="text">员工考勤申请审批流程</el-button>&nbsp;&nbsp;&nbsp;|
          <el-button type="text"> 员工加班申请审批流程</el-button>&nbsp;&nbsp;&nbsp;|
          <el-button type="text"> 项目部成员加班申请审批流程（公司项目）</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  methods: {}
};
</script>

<style lang="less">
.routine {
  .duty {
    margin: 10px 0;
  }
   .el-button--text{
    padding-left:35px;
    color:#2a7cb7;
  }
}
</style>