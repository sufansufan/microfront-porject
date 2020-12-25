
import { findComponentUpward } from '@core/utils'
export default {
  data() {
    return {
      page: 1,
      size: 10,
      pageSizes: [10, 20, 30, 50],
      pageLayout: 'slot, total, sizes, prev, pager, next, jumper',
      vm: null
    }
  },
  created() {
    this.vm = this.$parent.fetchData ? this.$parent : this
    if (!this.vm?.fetchData && this.parentComponent) {
      this.vm = findComponentUpward(this, this.parentComponent)
    }
    this.vm.page = this.page
    this.vm.size = this.size
  },
  methods: {
    handleSizeChange(val) {
      // 公共分页每页显示条数
      this.vm.size = val
      this.size = val
      this.vm.page = 1
      this.vm.fetchData(this.sortData)
    },
    handleCurrentChange(val) {
      // 公共分页页码事件
      this.vm.page = val
      this.page = val
      this.vm.fetchData(this.sortData)
    }
  }
}
