<template>
  <div class="layout">
    <top-nav />
    <breadcrumb />
    <transition name="fade-transform" mode="out-in">
      <template>
        <!-- <keep-alive :exclude="['LaborDetails', 'PostInfo', 'EmployeeInfo']"> -->
        <router-view :key="key" />
        <!-- </keep-alive> -->
      </template>
    </transition>
  </div>
</template>

<script>
import TopNav from './components/TopNav'
import Breadcrumb from './components/Breadcrumb'
// import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  components: {
    TopNav,
    Breadcrumb
  },
  computed: {
    // ...mapGetters(['tabs'])
    key() {
      return this.$route.path
    }
  },
  mounted() {
    // console.log(this.tabs, 7777)
  }
}
</script>

<style lang="less" scoped>
  .layout {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
