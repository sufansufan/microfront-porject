<template>
  <el-tabs
    ref="tabs"
    v-model="activeName"
    type="card"
    class="is-padding"
    :class="
      tabData && tabData.oneLevel
        ? tabData && tabData.class[1]
        : tabData && tabData.class[0]
    "
    @tab-click="handleClick"
  >
    <template v-if="tabData && tabData.children && tabData.children.length > 0">
      <el-tab-pane
        v-for="(item, index) in tabData.children"
        :key="index"
        :label="item.label"
        :name="item.name"
        :default-compoent="item.defaultCompoent"
        lazy
      >
        <template v-if="item.component">
          <template v-if="typeof item.component === 'string'">
            <component
              :is="item.component"
              :active-name="activeName"
              :options="options"
              :disabled="options.type === 'details' || options.type === 'detailVersion'|| !componentState"

              @changeState="changeState"
            />
          </template>
          <template v-for="com in item.component" v-else>
            <component
              :is="com.component"
              v-if="
                componentState
                  ? tabComponentState ? tabComponentState === com.name : componentState === com.name
                  : item.defaultCompoent === com.name && com.component
              "
              :key="com.name"
              :breeze-info="breezeInfo"
              :active-name="activeName"
              :options="options"
              :disabled="options.type === 'details' || options.type === 'detailVersion'|| !componentState"
              @changeState="changeState"
            />
            <template v-if="tabComponentState ? tabComponentState === com.name && com.tabList : componentState === com.name && com.tabList">
              <my-tab
                :key="com.item"
                :default-active="com.defaultActive"
                :default-options="options"
                :tab-data="com.tabList"
              />
            </template>
          </template>
        </template>
        <template v-else>
          <my-tab
            :tab-data="item.tabList"
            :default-active="item.defaultActive"
            :default-options="options"
          />
        </template>
      </el-tab-pane>
    </template>
    <el-tab-pane v-if="tabData && tabData.back" name="last" :is-back-list="tabData && tabData.isBackList">
      <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
/* engineer */
/* 内部合同公共list */
import PublicLists from '../contractManage/engineer/internalContract/incontractpubliclist'
// 内部合同-劳务分包-新增
import LaborAdd from './LaborAdd'
// 内部合同-采购合同-新增
import PurchaseAdd from './PurchaseAdd'
// 内部合同-机械合同-新增
import MechanicsAdd from './MechanicsAdd'
// 内部合同-分包合同-新增
import SubpackageAdd from './SubpackageAdd'
// 内部合同-工程保险合同-新增
import EngineeInsureAdd from './EngineeInsureAdd'
// 内部合同-其它合同-新增
import OtherAdd from './OtherAdd'
// 内部合同-版本查看
import ContractVersion from '../contractManage/engineer/internalContract/viewcontractversion'

// 内部合同-补充协议公共list
import SupplyAgreement from '../contractManage/engineer/internalContract/supplyagreement'
// 内部合同-劳务合同-补充协议-新增
import LaborSupplyAdd from '../contractManage/engineer/internalContract/laboursupplyadd'
// 内部合同-采购合同-补充协议-新增
import PurchaseSupplyAdd from '../contractManage/engineer/internalContract/purchasesupplyadd'
// 内部合同-机械合同-补充协议-新增
import MechanicsSupplyAdd from '../contractManage/engineer/internalContract/mechanicssupplyadd'
// 内部合同-分包合同-补充协议-新增
import SubSupplyAdd from '../contractManage/engineer/internalContract/subpackagesupplyadd'
// 内部合同-工程保险合同-补充协议-新增
import EngineeSupplyAdd from '../contractManage/engineer/internalContract/engineeringsupplyadd'
// 内部合同-其他合同-补充协议-新增
import OtherSupplyAdd from '../contractManage/engineer/internalContract/othersupplyadd'
// 工程合同-信息
import ContractInfo from './EngineerInfo'
// 工程合同-补充协议
import ContractExtend from '../contractManage/engineer/enginnerContract'

/* design */
import DesignInfo from './DesignInfo.vue'
import DesignContractExtend from '../contractManage/designContract/signContract'

// 分包合同主页面
import SubContractMain from '../contractManage/designContract/subContract'
// ../contractManage/designContract/subContract/info
import SubContractInfo from './SignSubInfo'
import SubContractVersion from '../contractManage/designContract/subContract/versionDetail'
import SubExtendMain from '../contractManage/designContract/subContract/extend/index'
import SubExtendInfo from '../contractManage/designContract/subContract/extend/info'
import SubExtendVersion from '../contractManage/designContract/subContract/extend/versionDetail'
// 其他合同
import OtherContractMain from '../contractManage/designContract/otherContract'
import OtherContractInfo from './SignOtherInfo'
import OtherContractVersion from '../contractManage/designContract/otherContract/versionDetail'
import OtherExtendMain from '../contractManage/designContract/otherContract/extend'
import OtherExtendInfo from '../contractManage/designContract/otherContract/extend/info'
import OtherExtendVersion from '../contractManage/designContract/otherContract/extend/versionDetail'

/* officeContract */
// 办公合同-合同信息
import ContractInformationTabOffice from '../contractManage/officeContract/contractInfor'
// 办公合同-补充协议
import SupplementaryAgreementOffice from '../contractManage/officeContract/supplementaryAgreement'

/* otherContracts */
// 其它合同-补充协议
import SupplementaryAgreementOther from '../contractManage/otherContracts/supplementaryAgreement'
// 其它合同-合同信息
import ContractInformationTabOther from '../contractManage/otherContracts/contractInfor'

import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MyTab',
  components: {
    PublicLists,
    LaborAdd,
    PurchaseAdd,
    MechanicsAdd,
    SubpackageAdd,
    EngineeInsureAdd,
    OtherAdd,
    SupplyAgreement,
    LaborSupplyAdd,
    ContractVersion,
    PurchaseSupplyAdd,
    MechanicsSupplyAdd,
    EngineeSupplyAdd,
    OtherSupplyAdd,
    SubSupplyAdd,
    ContractInfo,
    ContractExtend,
    SupplementaryAgreementOffice,
    SupplementaryAgreementOther,
    ContractInformationTabOther,
    ContractInformationTabOffice,
    DesignInfo,
    DesignContractExtend,
    SubContractMain,
    SubContractInfo,
    SubContractVersion,
    SubExtendMain,
    SubExtendInfo,
    SubExtendVersion,
    OtherContractMain,
    OtherContractInfo,
    OtherContractVersion,
    OtherExtendMain,
    OtherExtendInfo,
    OtherExtendVersion
  },
  props: {
    tabData: {
      type: String,
      default: () => {}
    },
    oneHidden: {
      type: Boolean,
      defult: false
    },
    defaultActive: {
      type: String,
      default: ''
    },
    defaultOptions: {
      type: Object,
      default: () => {
        return {
          type: 'details'
        }
      }
    }
  },
  data() {
    return {
      activeName: 'project',
      options: null,
      componentState: '',
      breezeInfo: ''
    }
  },
  computed: {
    ...mapGetters(['tabComponentState'])
  },
  created() {
    this.initActiveName()
    this.initChildrenOptions()
  },
  mounted() {
    if (this.oneHidden) {
      this.$refs.tabs.$el.children[0].style.display = 'none'
    }
  },
  methods: {
    ...mapMutations(['SET_TABCOMPONENTSTATE']),
    // 显示名称初始化
    initActiveName() {
      this.defaultActive !== '' && (this.activeName = this.defaultActive)
    },
    // 参数初始化
    initChildrenOptions() {
      this.breezeInfo = this.defaultOptions
      this.options = this.defaultOptions
    },
    handleClick(tab) {
      if (tab.name === 'last' && !tab.$attrs['is-back-list']) {
        this.$router.go(-1)
      }
      if (tab.$attrs['is-back-list']) {
        this.changeState(tab.$attrs['is-back-list'])
      }
      if (tab.$attrs['default-compoent']) {
        this.componentState = tab.$attrs['default-compoent']
        this.SET_TABCOMPONENTSTATE()
      }
      this.activeName = tab.name
    },
    changeState(type, options) {
      this.componentState = type
      if (type.includes('List')) {
        this.SET_TABCOMPONENTSTATE(type)
      } else {
        this.SET_TABCOMPONENTSTATE()
      }
      if (options) {
        this.options = options
        if (options.type) this.judeType(options)
      } else {
        this.options = { type: 'details', row: 'row' }
      }
    },
    judeType({ type }) {
      const arrayList = ['add', 'edit', 'details']
      if (typeof type !== 'string') console.error('options.type must be a String in TabRouter.vue')
      else {
        if (arrayList.includes(type)) this.$set(this.options, 'type', type)
        else {
          const versionList = ['detailVersion', 'versionView']
          if (versionList.includes(type)) this.$set(this.options, 'type', type)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
