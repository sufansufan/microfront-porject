<template>
  <div class="real-details-view">
    <div class="btn">
      <el-button class="back-btn" type="return" @click="back"><i class="iconfont icon-fanhui-copy" />返回</el-button>
    </div>
    <div class="info">
      <information />
    </div>
    <div class="tableList">
      <el-tabs
        ref="tabs"
        v-model="activeName"
        type="card"
        class="one-card-tabs is-padding"
        @tab-click="handleClick"
      >
        <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
          <template v-if="compomentAdd">
            <component :is="componentName ? '' : item.com" @changeComName="changeComName" />
          </template>
          <template v-else>
            <component :is="compomentAddName" @changeComName="changeComName" />
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Information from './components/Information'
import PurchaseContract from './components/PurchaseContract'
import PurchaseDetails from './components/PurchaseDetails'
import LaborContract from './components/LaborContract'
import MechanicalContract from './components/MechanicalContract'
import SubContractP from './components/SubContractP'
import ProjectContract from './components/ProjectContract'
import OtherContractP from './components/OtherContractP'
import ProjectInfo from './components/ProjectInfo'
import Supplementary from './components/Supplementary'
import SupplementaryDetails from './components/SupplementaryDetails'
export default {
  name: 'RealDetailsView',
  components: {
    Information,
    PurchaseContract,
    LaborContract,
    MechanicalContract,
    SubContractP,
    ProjectContract,
    OtherContractP,
    ProjectInfo,
    Supplementary,
    SupplementaryDetails,
    PurchaseDetails
  },
  data() {
    return {
      componentName: '',
      compomentAdd: true,
      compomentAddName: '',
      activeName: 'PurchaseContract',
      tabList: [
        {
          label: '采购合同',
          name: 'PurchaseContract',
          com: 'PurchaseContract'
        },
        {
          label: '劳务合同',
          name: 'LaborContract',
          com: 'LaborContract'
        },
        {
          label: '机械合同',
          name: 'MechanicalContract',
          com: 'MechanicalContract'
        },
        {
          label: '分包合同',
          name: 'SubContractP',
          com: 'SubContractP'
        },
        {
          label: '工程保险合同',
          name: 'ProjectContract',
          com: 'ProjectContract'
        },
        {
          label: '其它合同',
          name: 'OtherContractP',
          com: 'OtherContractP'
        },
        {
          label: '工程合同信息',
          name: 'ProjectInfo',
          com: 'ProjectInfo'
        },
        {
          label: '补充协议',
          name: 'Supplementary',
          com: 'Supplementary'
        }
      ]
    }
  },
  methods: {
    handleClick() {
      this.componentName = ''
      this.compomentAdd = true
    },
    changeComName(data, type) {
      if (type === 'cancel') {
        this.compomentAdd = true
      } else {
        this.compomentAdd = false
        this.compomentAddName = data
      }
    }
  }
}
</script>
<style lang="less" scoped>
.real-details-view {
  margin-bottom: 10px;
}
</style>
