<template>
  <div class="cooper-aside-menu">
    <el-menu :default-active="selectMenu" :default-openeds="['0', '1', '2', '3']" router @select="selectMenu">
      <el-submenu v-for="item in menuDataDeep" :key="item.code" :index="item.url">
        <template slot="title">
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(v, index) in item.childs" :key="index" :index="v.url" @click="clickNav(v)">
            <span>
              {{ v.name }}
            </span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AsideMenu',
  props: {
    menuData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      menuDataDeep: []
    }
  },
  watch: {
    menuData: {
      handler() {
        this.menuDataDeep = JSON.parse(JSON.stringify(this.menuData))
        if (this.menuDataDeep.length) {
          const { path, query: { code }} = this.$route
          const pathRouter = path + '?code=' + code
          this.selectMenu = pathRouter === '/cooperativeEnterprise/cooperativeEnterprise?code=undefined' ? '' : pathRouter
          if (this.selectMenu === '') {
            this.$router.replace({ path: this.$store.state.cooperativeEnterprise.cooperMenuUrl })
          }
        }
        const { fullPath } = this.$route
        this.selectMenu = fullPath
      },
      immediate: true,
      deep: true
    }

  },
  created() {

  },
  methods: {
    selectMenu(e) {
      this.selectMenu = e
      this.$store.commit('SET_COOPERMENUURL', e)
    },
    clickNav(v) {
      this.$store.commit('SET_COOPERMENUNAME', v.name)
    }
  }
}
</script>

<style lang="less">
.cooper-aside-menu {
  .el-submenu{
    border-bottom: 1px solid #f5f5f5;
  }
  .el-menu-item {
    height: 36px;
    line-height: 36px;
    color: #333333;
    padding-left: 24px !important;
    background: #f5f5f5;
  }
  .el-submenu__title {
    height: 36px ;
    line-height: 36px ;
    color: #fff;
    padding-left: 14px !important;
  }
  .el-submenu__icon-arrow{
    font-size:16px;
    right: 8px;
  }
  .el-submenu__title:hover{
    background: #235e96;
  }
  .el-menu-item.is-active{
    background: #c8c8c8;
  }
  .el-menu-item:hover{
    background: #dbdbdb;
  }
  .el-menu-item-group__title{
    padding: 0;
  }
  .cooperative-main .left .aside-menu .el-submenu__title{
    background: none;
    border-bottom: 1px solid #ffffff;
  }
  .el-submenu{
    background: #0a4c8a;
  }
.el-submenu__title i{
  color: #ffffff;
}
}
</style>
