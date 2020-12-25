import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from './store/'

Vue.use(VueRouter)

// 创建一个路由器实例
const router = new VueRouter({
  mode: 'hash',
  base: '',
  routes: []
  // 设置滚动条位置
  // scrollBehavior: to => {
  //   if (document.getElementById('con')) {
  //     if (to.meta.scrollTop) { document.getElementById('con').scrollTop = to.meta.scrollTop } else document.getElementById('con').scrollTop = 0
  //   }
  // }
})

// 记录滚动条位置
// function markScroll(to, from, next) {
//   if (document.getElementById('con')) { from.meta.scrollTop = document.getElementById('con').scrollTop }
//   // 根据url打开标签
//   if (
//     !from.name &&
//     to.path !== '/mainIndex' &&
//     to.name &&
//     PUZZLE_CONFIG.pageHome !== to.name
//   ) {
//     store.commit('ADD_TAB', to.name)
//   }
// }

export default router
