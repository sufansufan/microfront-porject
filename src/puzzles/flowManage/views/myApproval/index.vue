<template>
  <div class="my-approval">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="待我审批"
        name="first"
      >
        <div class="tab-content">
          <for-myapproval />
        </div>

      </el-tab-pane>
      <el-tab-pane
        label="我已审批"
        name="second"
      >
        <div class="tab-content">
          <i-haveapproved />
        </div>

      </el-tab-pane>
      <el-tab-pane
        label="我发起的"
        name="three"
      >
        <div class="tab-content">
          <i-launched />
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ForMyapproval from './components/formyapproval'
import IHaveapproved from './components/ihaveapproved'
import ILaunched from './components/Ilaunched'

export default {
  name: 'Index',
  components: {
    ForMyapproval,
    IHaveapproved,
    ILaunched
  },
  data() {
    return {
      activeName: 'first'

    }
  },
  methods: {
    handleClick(tab, event) {

    }
  }
}
</script>
<style lang="less" scoped>
.my-approval{
  padding: 10px;
   .tab-content {
    overflow-y: auto;
    height: calc(100vh - 222px);
    padding-right: 10px;

  }
}
</style>
