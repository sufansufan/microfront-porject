<template>
  <div class="aside-menu">
    <el-menu
      :default-active="menuId"
      class="el-menu-vertical-demo"
      background-color="#eeeeee"
      text-color="#333333"
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
          id: ''
        }
      ]
    },
    menuId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    defaultActive() {
      if (this.menuData.length) {
        return this.menuData
      } else {
        return [{ id: '' }]
      }
    }
  },
  created() {

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
