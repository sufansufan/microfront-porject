<template>
  <div class="resource-manage">
    <left-to-right-mould>
      <div slot="left" v-loading="menuLoading" class="left">
        <aside-menu :menu-data="constant.applicationList" @changeActive="changeActive" />
      </div>
      <div slot="right">
        <right-content :app-id="appId" />
      </div>
    </left-to-right-mould>
  </div>
</template>

<script>
import LeftToRightMould from '@frames/dashboard/components/LeftToRightMould'
import AsideMenu from '@frames/dashboard/components/AsideMenu'
import RightContent from './components/RightContent'
import { mapGetters } from 'vuex'
export default {
  name: 'ResourceManage',
  components: {
    LeftToRightMould,
    AsideMenu,
    RightContent
  },
  data() {
    return {
      menuLoading: true,
      appId: ''
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', 'applicationList').then(() => {
      this.menuLoading = false
      this.appId = this.constant.applicationList[0].id
    })
  },
  methods: {
    changeActive(val) {
      this.appId = val
    }
  }
}
</script>

<style lang="less" scoped>
.resource-manage {
  .left {
    height: calc(100vh - 120px);
    overflow-y: auto;
  }
}
</style>
