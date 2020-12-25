<template>
  <div class="new-supplies">
    <el-form :model="ruleform" label-width="150px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="领用单号">
            <el-input v-model="ruleform.read" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="领用部门">
            <el-input v-model="ruleform.read" placeholder="请输入" />

          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="领用时间">
            <el-date-picker v-model="ruleform.read" style="width:100%" type="date" placeholder="选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="领用人">
            <el-input v-model="ruleform.read" placeholder="请输入" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="领用说明">
            <el-input v-model="ruleform.read" type="textarea" placeholder="请输入" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="领用清单">
            <el-button type="primary" @click="additems">添加</el-button>
            <el-table :data="tableData" row-key="id" border default-expand-all>
              <el-table-column prop="index" label="序号" width="50" align="center" />
              <el-table-column prop="loannumber" label="物品编号" width="180" align="center" />
              <el-table-column prop="borrower" align="center" label="物品名称" />
              <el-table-column prop="organization" label="规格" align="center" />
              <el-table-column prop="organization" label="单位" align="center" />
              <el-table-column prop="typesofloans" label="申请数量" align="center" />
              <el-table-column prop="typesofloans" label="备注" align="center" />
              <el-table-column prop="typesofloans" label="操作" align="center" />
            </el-table>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="审批人:">
            <span>审批人</span>
            <p style="color:red">
              平台找不到您发起此流程后的相关审批人（上级领导）无法发起流程，找不到项目经理请联系工程部，找不到其他岗位或人员请联系人力资源部！</p>
          </el-form-item>

        </el-col>

      </el-row>
      <el-row class="btn">
        <el-col :span="24">
          <el-button type="primary">
            提交
          </el-button>
          <el-button type="primary">
            保存
          </el-button>
          <el-button class="cancel-btn" @click="$router.go(-1)">
            取消
          </el-button>
        </el-col>

      </el-row>
    </el-form>
    <drag-dialog ref="dialog" title="添加物品" width="70%" height="80%">
      <add-items />
    </drag-dialog>

  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import AddItems from './components/additems'
export default {
  components: {
    DragDialog,
    AddItems
  },
  data() {
    return {
      tableData: [{
        index: '1',
        loannumber: '1234567890987654321',
        borrower: '小李',
        organization: '工程部',
        typesofloans: '备用金',
        borrowers: '公司内部',
        dateofpayment: '20119-10-30',
        repaymentdate: '2019-08-30',
        paymentmethod: '现金',
        applicationtime: '2019-08-11 09:20:25',
        usageofloan: '购买电脑,及设备',
        entryname: '项目xxx',
        vestingunit: '北横装',
        state: '草稿'
      }],
      ruleform: {
        read: ''
      }

    }
  },
  methods: {
    additems() {
      this.$refs.dialog.show = true
    }
  }
}
</script>

<style lang="less">
.new-supplies{
	height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 20px;
  .btn{
    width:100%;
    text-align: center
  }

}

</style>
