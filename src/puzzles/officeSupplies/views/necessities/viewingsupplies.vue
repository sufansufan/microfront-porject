<template>
  <div class="viewing-supplies">
    <div class="btn">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-form :model="ruleform" label-width="150px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="编号">
            <el-input v-model="ruleform.read" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="领用部门">
            <el-input v-model="ruleform.read" :disabled="true" placeholder="请输入" />

          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="领用时间">
            <el-date-picker v-model="ruleform.read" style="width:100%" :disabled="true" type="date" placeholder="选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="领用人">
            <el-input v-model="ruleform.read" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="领用说明">
            <el-input v-model="ruleform.read" :disabled="true" type="textarea" placeholder="请输入" />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="申领清单" name="first">
        <div class="tabs-content">
          <claim-list />
        </div>
      </el-tab-pane>
      <el-tab-pane label="发放清单" name="second">
        <div class="tabs-content">
          <Issue-list />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ClaimList from './components/claimlist'
import IssueList from './components/Issuelist'
export default {
  components: {
    ClaimList,
    IssueList
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
.viewing-supplies{
	height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 20px;

}

</style>
