<template>
  <div class="layout">
    <top-nav />
    <breadcrumb />
    <transition name="fade-transform" mode="out-in">
      <template>
        <keep-alive :include="keepAliveInclude">
          <router-view :key="key" />
        </keep-alive>
      </template>
    </transition>
  </div>
</template>

<script>
import TopNav from './components/TopNav'
import Breadcrumb from './components/Breadcrumb'
// import { initPuzzles } from '@core/structureModule'
// import { mapGetters } from 'vuex'
import keepAlive from '@core/mixins/keepAlive'
export default {
  name: 'Index',
  components: {
    TopNav,
    Breadcrumb
  },
  mixins: [keepAlive],

  computed: {
    // ...mapGetters(['tabs'])
    key() {
      return this.$route.path
    }
  },
  created() {
    // initPuzzles()
  },
  methods: {
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
