export default {
  data() {
    return {
      search: {}
    }
  },
  created() {
    this.search = { ...this.search, ...this.handlerSearch() }
    this.deepSearch = JSON.parse(JSON.stringify(this.search))
  },
  methods: {
    queryCopy(type) {
      if (type === 'query') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        // this.size = 10
        this.handlerChildren(this.$children)
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
    },
    handlerChildren(list) {
      const row = list.find(item => item.page)
      // 兼容单独嵌入search  (!row)
      if (!row) {
        this.page = 1
        // this.size = 10
      } else {
        if (Object.keys(row).length) {
          row.page = 1
          // row.size = 10
        } else {
          this.handlerChildren(this.$children)
        }
      }
    },
    handlerSearch() {
      const obj = {}
      this.selectList && this.selectList.forEach(item => {
        if (item.searchType === 'rangeDate' || item.searchType === 'rangeInput') {
          const [a, b] = item.value.split(',')
          obj[a] = ''
          obj[b] = ''
        } else if (item.searchType === 'select' && item.selectOption && item.selectOption.multiple || item.searchType === 'cascader' || item.searchType === 'pickerDate') {
          obj[item.value] = []
        } else {
          obj[item.value] = ''
        }
      })
      return obj
    },
    changeSearch(data) {
      const obj = JSON.parse(JSON.stringify(data))
      this.search = {
        ...this.search,
        ...obj
      }
      this.fetchData('query')
    }
  }
}
