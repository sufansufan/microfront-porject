import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// 模块
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
// vuex前端工程化之动态导入文件(获取moudules文件下所有js文件；)
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 忽略第1个js
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // 执行modulesFiles函数，返回一个对象{default: {// 文件内容}, _esModule: true}
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})
export default store
