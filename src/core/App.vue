<template>
  <router-view class="view" />
</template>

<script>
import { getUser, getMenus } from './api'
import _import from './scripts/_import'
import { handleMenus } from './scripts/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      flag: false,
      puzzlesMenus: []
    }
  },
  computed: {
    ...mapGetters(['menuApplicationList'])
  },
  // watch: {
  //   menuApplicationList: {
  //     handler() {
  //       if (!this.menuApplicationList.length) {
  //         console.log(2222)
  //         this.init()
  //       }
  //     },
  //     deep: true,
  //     immedate: true
  //   }

  // },
  created() {
    this.flag = true
    this.init().then(() => {}).catch(err => {
      console.log(err)
    })
  },
  methods: {
    async assembleFrame(info) {
      const frame = await _import('frames', info.name, info.host, info.version)
      // 路由注册
      this.$router.addRoutes(frame.routerStatic)
      // Store 注册
      for (const name in frame.store) { this.$store.registerModule(name, frame.store[name]) }
      // 嵌套路由 / 默认两级路由
      return frame.routerStatic.filter(item => item.path === '/')
    },
    async assemblePuzzles(menus, childRouter) {
      const pages = childRouter[0].children
      // 尝试获取模块 / 异步获取
      for (const puzzle of menus) {
        _import('puzzles', puzzle.id, puzzle.host, puzzle.version)
          .then(p => {
          // 需要生成路由的菜单
            const menusRouter = []
            handleMenus(puzzle.children, menusRouter)
            // 路由
            childRouter[0].children = p
              .router(menusRouter, puzzle.id)
              .concat(p.routerStatic)
            pages.push(...childRouter[0].children)
            this.$router.addRoutes(childRouter)
            // this.$router.addRoutes([{ path: '*', redirect: '/404' }])
            // Store
            for (const name in p.store) { this.$store.registerModule(name, p.store[name]) }
          })
          .catch(err => {})
      }
      // 储存路由表
      this.$store.commit('SET_PAGES', pages)
    },
    async init() {
      document.title = PUZZLE_CONFIG.appName
      // 获取数据
      const [user, menus] = await Promise.all([getUser(), getMenus()])
      // this.$store.commit('SET_USER', user)
      // this.$store.commit('SET_MENUS', menus)
      // 组装基座并获取基座嵌套路由
      const childRouter = await this.assembleFrame(user.frame)
      // 路由与子模块匹配拦截
      // this.$store.dispatch('generateRoutes')
      // if (this.menuApplicationList.length) {
      //   await this.getMenu(this.menuApplicationList, menus, childRouter)
      // } else {
      //   await this.$store.dispatch('generateRoutes').then(list => {
      //     this.getMenu(list, menus, childRouter)
      //   })
      // }
      this.assemblePuzzles(menus, childRouter)
    }
    // async getMenu(list, menus, childRouter) {
    //   this.puzzlesMenus = []
    //   list.forEach(item => {
    //     menus.forEach(m => {
    //       if (m.name === item.name) {
    //         this.puzzlesMenus.push(m)
    //       }
    //     })
    //   })
    // }
  }
}
</script>
