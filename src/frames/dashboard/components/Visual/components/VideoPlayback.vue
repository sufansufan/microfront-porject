<template>
  <div class="video-playback">
    <div class="left-menu">
      <aside-menu :menu-data="menuData" />
    </div>
    <div class="content">
      <div>
        <slot name="select" />
      </div>
      <div />
    </div>
  </div>
</template>

<script>
import AsideMenu from '@frames/dashboard/components/AsideMenu'
export default {
  components: {
    AsideMenu
  },
  data() {
    return {
      menuData: [
        {
          name: '王哲_走项目管理流程',
          icon: '',
          url: '',
          id: '1',
          type: ''
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.video-playback {
  padding-top: 10px;
  display: flex;
  height: 60vh;
  .left-menu {
    width: 18%;
    height: 100%;
  }
  .content {
    display: flex;
    width: 82%;
    height: 100%;
    & > div {
      height: 100%;
      border-left: 1px solid #333;
      &:first-child {
        width: 40%;
      }
      &:last-child {
        width: 70%;
      }
    }
  }
}
</style>

<style lang='less'>
.video-playback {
  .left-menu {
    .aside-menu .el-menu-item {
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
