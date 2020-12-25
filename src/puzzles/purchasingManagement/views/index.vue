<template>
  <div class="procurement-main">
    <left-to-right-mould>
      <div slot="left">
        <div class="aside-menu">
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
            <el-menu-item index="/purchasingManagement/procurementApplication">
              <i class="el-icon-setting" />
              <span slot="title">采购申请</span>
            </el-menu-item>
            <el-menu-item index="/purchasingManagement/siteAcceptance">
              <i class="el-icon-setting" />
              <span slot="title">现场验收</span>
            </el-menu-item>
            <el-menu-item index="/purchasingManagement/materialOutStock">
              <i class="el-icon-setting" />
              <span slot="title">材料出库</span>
            </el-menu-item>
            <el-menu-item index="/purchasingManagement/materialConsumption">
              <i class="el-icon-setting" />
              <span slot="title">材料用款</span>
            </el-menu-item>
            <el-menu-item index="/purchasingManagement/procurementStatistics">
              <i class="el-icon-setting" />
              <span slot="title">采购统计</span>
            </el-menu-item>
            <el-menu-item index="/purchasingManagement/procurementConfiguration">
              <i class="el-icon-setting" />
              <span slot="title">采购配置</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div slot="right">
        <router-view />
      </div>
    </left-to-right-mould>
  </div>
</template>

<script>
import LeftToRightMould from '@frames/dashboard/components/LeftToRightMould'
export default {
  name: 'ProcurementStatistics',
  components: {
    LeftToRightMould
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.procurement-main {
  .aside-menu {
    .el-menu-item.is-active {
      background: @primary !important;
    }
    .el-menu-item {
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
