<template>
  <div class="main-content">
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="待我审批" name="first">
          <keep-alive>
            <template>
              <wait-approve ref="waitApprove" :approve-type="approveType" />
            </template>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="我已审批" name="second">
          <keep-alive>
            <template>
              <already-approve ref="alreadyApprove" :approve-type="approveType" />
            </template>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="抄送我的" name="third">
          <keep-alive>
            <template>
              <copy-my ref="copyMy" :approve-type="approveType" />
            </template>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="我发起的" name="fourth">
          <keep-alive>
            <template>
              <me-initiate ref="meInitiate" :approve-type="approveType" />
            </template>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import MeInitiate from './MeInitiate'
import AlreadyApprove from './AlreadyApprove'
import CopyMy from './CopyMy'
import WaitApprove from './WaitApprove'
import { getTree } from '@core/api/processManage/workflowmanager'
export default {
  name: 'MainContent',
  components: {
    MeInitiate,
    AlreadyApprove,
    CopyMy,
    WaitApprove
  },
  data() {
    return {
      activeName: 'first',
      approveType: []
    }
  },
  activated() {
    if (this.$route.query.type) {
      this.activeName = this.$route.query.type
    }
    this.$nextTick(() => {
      this.handleClick()
      this.getApproveType()
    })
  },
  methods: {
    handleClick() {
      if (this.activeName === 'first') {
        this.$refs.waitApprove.fetchData()
      } else if (this.activeName === 'second') {
        this.$refs.alreadyApprove.fetchData()
      } else if (this.activeName === 'third') {
        this.$refs.copyMy.fetchData()
      } else if (this.activeName === 'fourth') {
        this.$refs.meInitiate.fetchData()
      }
    },
    // 获取审批类型 getTree
    getApproveType() {
      getTree().then(({ data }) => {
        this.approveType = data
        this.approveType.map(item => {
          item.id = item.applicationId
          return
        })
      })
    }
  }
}
</script>
<style lang="less" >
.main-content{
  padding: 10px;
}
</style>
