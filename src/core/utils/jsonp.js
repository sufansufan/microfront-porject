import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.prototype.Jsonp = function(url, data) {
  for (const item in data) {
    url += `&${item}=${data[item]}`
  }
  return this.$jsonp(url)
}
