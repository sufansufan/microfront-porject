<template>
  <div class="view-details">
    <div class="btn">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-form :model="ruleform" label-width="150px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="采购单号">
            <el-input v-model="ruleform.read" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购部门">
            <el-input v-model="ruleform.read" :disabled="true" placeholder="请输入" />

          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="采购时间">
            <el-date-picker v-model="ruleform.read" style="width:100%" :disabled="true" type="date" placeholder="选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购人">
            <el-input v-model="ruleform.read" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="采购说明">
            <el-input v-model="ruleform.read" :disabled="true" type="textarea" placeholder="请输入" />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="申请清单" name="first">
        <div class="tabs-content">
          <application-list />
        </div>
      </el-tab-pane>
      <el-tab-pane label="入库清单" name="second">
        <div class="tabs-content">
          <wrehousing-list />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ApplicationList from './components/applicationlist'
import WrehousingList from './components/wrehousinglist'
export default {
  components: {
    ApplicationList,
    WrehousingList
  },
  data() {
    return {
      activeName: 'first',
      ruleform: {
        read: ''
      }

    }
  }
}
</script>

<style lang="less">
.view-details{
	height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 20px;

}

</style>
