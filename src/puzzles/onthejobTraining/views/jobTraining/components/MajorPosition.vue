<template>
  <div class="major-position">
    <div class="duty" >
      <p>主岗岗位工作职责</p>
      <ul style="padding-left:30px;">
        <li>主要职责：</li>
        <li>1.企业的最高负责人，享有管理公司的权利；</li>
        <li>2.主持制定企业中长期发展战略和企业发展目标；</li>
        <li>3.监督和组织企业中长期发展战略以及企业的战略发展目标；</li>
        <li>4.签署应由企业法人签署的对外重要经济合同、上报各种重要报表、文件、资料；</li>
        <li>5.律法规规定的企业法人所必须负责的各项事项；</li>
        <li>6.在董事会闭会期间代表董事会行使权力。</li>
        <li>平台权限：全局查看权限。</li>
      </ul>
    </div>
    <div class="applications">
      <p style="text-align:center;">主岗岗位相关应用</p>
      <ul style="padding-left:30px;">
        <li>
          <p>日志管理></p>
          <el-button type="text" @click="$router.push({name:'logsubmit'})">公司日志提交流程</el-button>
        </li>
         <li>
          <p>考勤管理></p>
          <el-button type="text">员工考勤流程</el-button>&nbsp;&nbsp;&nbsp;|
           <el-button type="text">员工考勤申请审批流程 </el-button>&nbsp;&nbsp;&nbsp;|
            <el-button type="text">员工加班申请审批流程</el-button>
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
          <p>印信管理 ></p>
          <el-button type="text">印信管理流程</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
      }
    };
  },
  methods: {}
};
</script>

<style lang="less">
.major-position{
  .duty{
    margin:15px 0;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    p{
      text-align:center;
      padding:20px 0;
    }
    ul{
      li{
        font-size:12px;
        color:#303133;
        padding:2px 0;
      }
      li:last-child{
        padding-top:15px;
      }
    }
  }
  .el-button--text{
    padding-left:35px;
    color:#2a7cb7;
  }
}
</style>