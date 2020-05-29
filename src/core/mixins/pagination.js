
export default {
  data() {
    return {
      page: 1,
      size: 10,
      pageSizes: [10, 30, 50, 100],
      pageLayout: 'slot, total, sizes, prev, pager, next, jumper',
      vm: null
    }
  },
  created() {
    this.vm = this.$parent.fetchData ? this.$parent : this
    if (this.size !== 10) this.pageSizes.splice(0, 1, this.size)
  },
  methods: {
    handleSizeChange(val) {
      // 公共分页每页显示条数
      this.vm.size = val
      this.vm.page = 1
      this.vm.fetchData()
    },
    handleCurrentChange(val) {
      // 公共分页页码事件
      this.vm.page = val
      console.log(val)
      this.vm.fetchData()
    }
  }
}
