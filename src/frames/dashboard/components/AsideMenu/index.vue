<template>
  <div class="aside-menu">
    <el-menu
      :default-active="menuData.length && menuData[0].id"
      class="el-menu-vertical-demo"
      background-color="#eeeeee"
      text-color="#000"
      active-text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      @select="selectIndex"
    >
      <el-menu-item v-for="item in menuData" :key="item.id" :index="item.id">
        <i :class="item.icon" />
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    menuData: {
      type: Array,
      default: () => [
        {
          name: '系统管理',
          icon: 'el-icon-menu',
          url: '',
          id: '1'
        },
        {
          name: '组织架构',
          icon: 'el-icon-menu',
          url: '',
          id: '2'
        },
        {
          name: '考勤管理',
          icon: 'el-icon-menu',
          url: '',
          id: '3'
        },
        {
          name: '日志管理',
          icon: 'el-icon-menu',
          url: '',
          id: '4'
        }
      ]
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    selectIndex(key, keyPath) {
      this.$emit('changeActive', key)
    }
  }
}
</script>

<style lang="less" scoped>
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
