import Vue from 'vue'
import { getSessionStorage } from '@core/utils/auth'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)

Vue.directive('power', {
  inserted(el, type) {
    const powerList = JSON.parse(JSON.stringify(getSessionStorage('button')))
    const daraPowerList = JSON.parse(JSON.stringify(getSessionStorage('dataButton')))

    if (type.value && !powerList.includes(type.value) && !daraPowerList.includes(type.value)) {
      el.remove()
    }
  }
})
