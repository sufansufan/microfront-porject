// import { getSessionStorage } from '@core/utils/auth'
export default {
  data() {
    return {
      multipleSelection: [],
      deepRuleForm: {},
      deepSearch: {},
      key: 0,
      dialogType: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      defaultTime: ['00:00:00', '23:59:59'],
      sortData: {}
    }
  },
  created() {
    this.deepRuleForm = JSON.parse(JSON.stringify(this.ruleForm ? this.ruleForm : {}))
    if (this.search) {
      this.deepSearch = JSON.parse(JSON.stringify(this.search))
    }
  },
  mounted() {
    if (this.$refs.tableRef) this.$refs.tableRef.columns.map(item => (item.className = item.className ? item.className + ' ' + item.property : item.property))
  },
  methods: {
    sortTable({ column, prop, order }) {
      this.sortData = {
        propertyName: prop === 'dictionaryTypeName' ? 'dictionaryType.id' : prop,
        ascending: order === 'ascending'
      }
      if (order === null) {
        this.sortData = {}
      }
      // this.size = 10
      // this.page = getSessionStorage('page')
      this.fetchData(this.sortData)
    },
    handleSelectionChange(val, type) {
      this.multipleSelection = val
    },
    handleSelectionSingleChange(selection, row) {
      if (this.multipleSelection.length && this.multipleSelection[0].id === row.id) {
        this.$refs.tableRef.clearSelection()
        this.multipleSelection = []
      } else {
        this.$refs.tableRef.clearSelection()
        this.$refs.tableRef.toggleRowSelection(row, true)
        this.multipleSelection = [row]
      }
    },
    onlyOneData() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return false
      } else {
        return true
      }
    },
    keyupSearch(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode === 13) {
        this.fetchData('query')
      }
    }
  },
  activated() {
    // this.fetchData()
    // this.multipleSelection = []
  }
  // destroyed() {
  //   this.multipleSelection = []
  //   this.deepRuleForm = {}
  //   this.key = {}
  //   this.$refs.multipleTable.clearSelection()
  // }
}
