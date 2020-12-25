<template>
  <div class="set-up-account">
    <div class="btn">
      <el-button-group>
        <el-button type="primary" @click="addStaff">添加人员</el-button>
        <el-button type="primary">删除</el-button>
      </el-button-group>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" align="center" fixed />
        <el-table-column prop="id" align="center" label="序号" width="60" fixed />
        <el-table-column prop="typename" align="center" label="账号" width="180" sortable />
        <el-table-column prop="typename" align="center" label="姓名" width="180" sortable />
        <el-table-column prop="typename" align="center" label="岗位" width="180" sortable />
        <el-table-column prop="typename" align="center" label="录入人" width="180" />
        <el-table-column prop="typename" align="center" label="录入时间" width="180" />
        <el-table-column prop="typename" align="center" label="状态" width="180" />
      </el-table>
    </div>
    <div class="explain">
      <div>说明：筑业软件默认密码为账 户后六位，登陆筑业软件后可以在筑业软件中修改密码</div>
      <el-button type="primary" @click="basicConfiguration">同步到筑业</el-button>
    </div>
    <drag-dialog ref="dialogTwo" append="true" title="新建单位工程" width="40%" height="70%">
      <div>
        <el-form :rules="rules" :model="ruleform" label-width="0" class="dictionary-form">
          <el-form-item label="" prop="number">
            <el-select
              v-model="value3"
              clearable
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div style="width:100%;margin-top:20px;text-align:right;">
          <el-button type="primary" icon="el-icon-set-up">确认</el-button>
        </div>
      </div></drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  components: { DragDialog },
  data() {
    return {
      value3: '',
      options: [],
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
    addStaff() {
      this.$refs.dialogTwo.show = true
    }
  }
}
</script>

<style lang="less" scoped>
  .set-up-account {
    .el-select {
      width: 100%;
    }
    .btn{
      margin-bottom: 10px;
    }
    .explain {
      display: flex;
      margin: 10px 0;
      align-items: flex-start;
      justify-content: space-between;
      div {
        font-size: 12px;
      }
    }

  }
</style>
