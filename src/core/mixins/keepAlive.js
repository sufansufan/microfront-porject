import { strFirstUpper } from '@core/utils'
import menus from '@core/router/index'
export default {
  computed: {
    keepAliveInclude() {
      /* eslint-disable */
      this.includeData = []
      if(this.$route.path !== '/home') {
        this.handleKeepAliveData(menus)
        return this.includeData
      }else {
        return []
      }
    }
  },
  methods: {
    handleKeepAliveData(list) {
      list.forEach(item => {
        if (item.cache) {
          this.includeData.push(strFirstUpper(item.id))
        }
        if (item.children && item.children.length) {
          this.handleKeepAliveData(item.children)
        }
      })
    }
  }
}
