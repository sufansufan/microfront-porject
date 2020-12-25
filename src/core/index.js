import Vue from 'vue'
import router from './router'
import store from './store/'
import App from './App.vue'

// jsonp工具
import './utils/jsonp'

// element-ui
import './element.js'

// 自定义组件
import './customComponent.js'

// 自定义指令
import './customInstructions'

// 主样式
import './styles/index.less'

import './permission'

if (process.env.NODE_ENV === 'development') {
  // 开启debug模式
  Vue.config.debug = true
  Vue.config.devtools = true
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
