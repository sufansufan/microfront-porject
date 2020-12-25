<template>
  <div class="integrated-manage">
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
            <el-menu-item index="/financialManage/integratedManage/projectRevenueAccount">
              <i class="el-icon-setting" />
              <span slot="title">项目收支台账</span>
            </el-menu-item>
            <el-menu-item index="/financialManage/integratedManage/detailsOfReceivables">
              <i class="el-icon-setting" />
              <span slot="title">应收款明细表</span>
            </el-menu-item>
            <el-menu-item index="/financialManage/integratedManage/invoicestatistics">
              <i class="el-icon-setting" />
              <span slot="title">发票收付款统计</span>
            </el-menu-item>
            <el-menu-item index="/financialManage/integratedManage/unitsummary">
              <i class="el-icon-setting" />
              <span slot="title">归属单位收支汇总</span>
            </el-menu-item>
            <el-menu-item index="/financialManage/integratedManage/premiumstatistics">
              <i class="el-icon-setting" />
              <span slot="title">质保金统计表</span>
            </el-menu-item>
            <el-menu-item index="/financialManage/integratedManage/bidsecuritymanagement">
              <i class="el-icon-setting" />
              <span slot="title">投标保证金管理</span>
            </el-menu-item>
            <el-menu-item index="/financialManage/integratedManage/prepaidVAT">
              <i class="el-icon-setting" />
              <span slot="title">预缴增值税台账</span>
            </el-menu-item>
            <el-menu-item index="/financialManage/integratedManage/cancellationDeductionAccount">
              <i class="el-icon-setting" />
              <span slot="title">进消抵扣台账</span>
            </el-menu-item>
            <el-menu-item index="/financialManage/integratedManage/specialTicketCertification">
              <i class="el-icon-setting" />
              <span slot="title">专票认证</span>
            </el-menu-item>
            <el-menu-item index="/financialManage/integratedManage/monthlycarryover">
              <i class="el-icon-setting" />
              <span slot="title">月度结转</span>
            </el-menu-item>
            <el-menu-item index="/financialManage/integratedManage/realtimecoststatistics">
              <i class="el-icon-setting" />
              <span slot="title">实时成本统计</span>
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
  name: 'ApplicationConfig',
  components: {
    LeftToRightMould
  },
  data() {
    return {
      list: [
        { id: 1, icon: 'el-icon-menu', title: '项目收支台账' },
        { id: 2, icon: 'el-icon-setting', title: '应收款明细' },
        { id: 3, icon: 'el-icon-setting', title: '发票收付款统计' },
        { id: 4, icon: 'el-icon-setting', title: '归属单位收支汇总' },
        { id: 5, icon: 'el-icon-menu', title: '质保金统计表' },
        { id: 6, icon: 'el-icon-setting', title: '投标保证金管理' },
        { id: 7, icon: 'el-icon-setting', title: '预缴增值税台账' },
        { id: 8, icon: 'el-icon-setting', title: '进消抵扣台账' },
        { id: 9, icon: 'el-icon-menu', title: '质保金统计表' },
        { id: 10, icon: 'el-icon-setting', title: '专票认证' },
        { id: 11, icon: 'el-icon-setting', title: '月度结转' },
        { id: 12, icon: 'el-icon-setting', title: '实时成本统计' }
      ],
      isTrue: true
    }
  },
  methods: {
    goTo(path) {
      if (path === 1) {
        this.$router.push({
          name: 'projectRevenueAccount'
        })
      } else if (path === 2) {
        this.$router.push({
          name: 'detailsOfReceivables'
        })
      }
    },

    handleSelect(index, path) {
    }
  }
}
</script>

<style lang="less" >
    .aside-menu {
      .el-menu-item.is-active {
        background: @primary !important;
      }
      .el-menu-item {
        height: 40px;
        line-height: 40px;
      }
    }
</style>
