<template>
  <div class="integrated-manage">
    <left-to-right-mould>
      <div slot="left">
        <div v-for="(item,index) in list" :key="index" class="aside-menu">
          <div class="aside-menu-title">
            <span>
              {{ item.name }}
            </span>
          </div>
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#eeeeee"
            text-color="#000"
            active-text-color="#fff"
            router="true"
            @select="handleSelect"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item v-for="(item_menu,item_index) in item.menuList" :key="item_index" :index="item_menu.url">
              <span slot="title">{{ item_menu.title }}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div slot="right">
        <div class="right-router">
          <router-view />
        </div>
      </div>
    </left-to-right-mould>
  </div>
</template>

<script>
import LeftToRightMould from '@frames/dashboard/components/LeftToRightMould'
export default {
  name: 'ApplicationConfig',
  components: {
    LeftToRightMould
  },
  data() {
    return {
      list: [
        {
          name: '业务管理',
          menuList: [
            { id: 1, icon: 'el-icon-menu', title: '项目收支台账', url: '/financialManage/integratedManage/projectRevenueAccount' },
            { id: 2, icon: 'el-icon-setting', title: '投标保证金管理', url: '/financialManage/integratedManage/bidBondManage' },
            { id: 3, icon: 'el-icon-setting', title: '月度结转', url: '/financialManage/integratedManage/monthlyCarryover' }
          ]
        },
        {
          name: '报表统计',
          menuList: [
            { id: 1, icon: 'el-icon-menu', title: '实时成本统计', url: '/financialManage/integratedManage/realTimeCost' },
            { id: 2, icon: 'el-icon-setting', title: '应收款统计表', url: '/financialManage/integratedManage/receivableStatistics' },
            { id: 3, icon: 'el-icon-setting', title: '归属单位收支汇总', url: '/financialManage/integratedManage/attributionUnitIE' },
            { id: 4, icon: 'el-icon-setting', title: '质保押金统计表', url: '/financialManage/integratedManage/warrantyDepositStatistics' },
            { id: 5, icon: 'el-icon-menu', title: '发票收付款统计表', url: '/financialManage/integratedManage/invoiceReceivePayment' }
          ]
        }
      ]
    }
  },

  methods: {
    handleSelect(index, path) {
      console.log(index)
    }
  }
}
</script>
<style  lang="less" scoped>
.integrated-manage {
  .aside-menu {
    &-title {
      height: 40px;
      width: 198px;
      background: @primary;
      color: #fff;
      line-height: 40px;
      text-align: center;
    }
  }
}
</style>
<style lang="less">
.integrated-manage {
  .aside-menu {
    color: #333;
    .el-menu-item.is-active {
      background: #dbdbdb !important;
      color: #333 !important;
    }
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      background: #f5f5f5 !important;
      &:hover {
        background-color: #c8c8c8 !important;
      }
    }
  }
  // .right-router {
  //   height: calc(100vh - 50px);
  //   overflow-y: auto;
  // }
}

</style>
