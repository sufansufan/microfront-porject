<template>
  <div class="contract-list">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="采购合同"
        name="first"
      >
        <procurement-contract />
      </el-tab-pane>
      <el-tab-pane
        label="劳务合同"
        name="second"
      >
        <service-contract />
      </el-tab-pane>
      <el-tab-pane
        label="机械合同"
        name="third"
      >
        <mechanical-contract />
      </el-tab-pane>
      <el-tab-pane
        label="分包合同"
        name="fourth"
      >
        <sub-contract />
      </el-tab-pane>
      <el-tab-pane
        label="其他合同"
        name="fifth"
      >
        <other-contracts />
      </el-tab-pane>
      <el-tab-pane
        label="工程合同信息"
        name="sixth"
      >
        <project-contract />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProcurementContract from './components/procurementcontract'
import ServiceContract from './components/servicecontract'
import MechanicalContract from './components/mechanicalcontract'
import SubContract from './components/subcontract'
import OtherContracts from './components/othercontracts'
import ProjectContract from './components/projectcontract'

export default {
  components: {
    ProcurementContract,
    ServiceContract,
    MechanicalContract,
    SubContract,
    OtherContracts,
    ProjectContract

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

<style lang="less">
.contract-list{
  padding:20px 0;
}
</style>
