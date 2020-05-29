<template>
  <div class="visual-preview">
    <div class="left-menu">
      <aside-menu :menu-data="menuData" />
    </div>
    <div class="content">
      <div />
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
.visual-preview {
  padding: 10px 0px;
  display: flex;
  .left-menu {
    width: 18%;
    min-height: 50vh;
  }
  .content {
    display: flex;
    width: 82%;
    & > div {
      width: 50%;
      height: 300px;
      margin-top: 50px;
      &:first-child {
        border: 2px solid #333;
        margin-right: 3px;
      }
      &:last-child {
        border: 2px solid red;
      }
    }
  }
}
</style>
<style lang='less'>
.visual-preview {
  .left-menu {
    .aside-menu .el-menu-item {
      height: 30px;
      line-height: 30px;
    }
  }
}

</style>
