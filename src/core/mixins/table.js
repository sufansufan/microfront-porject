export default {
  data() {
    return {
      multipleSelection: [],
      deepRuleForm: {},
      key: 0,
      dialogType: ''
    }
  },
  created() {
    this.deepRuleForm = JSON.parse(JSON.stringify(this.ruleForm ? this.ruleForm : {}))
  },
  mounted() {
    if (this.$refs.tableRef) this.$refs.tableRef.columns.map(item => (item.className = item.className ? item.className + ' ' + item.property : item.property))
  },
  methods: {
    sortTable({ column, prop, order }) {
      const sortData = {
        propertyName: prop === 'dictionaryTypeName' ? 'dictionaryType.id' : prop,
        ascending: order === 'ascending'
      }
      this.fetchData(sortData)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    onlyOneData() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return false
      } else {
        return true
      }
    }
  }
  // destroyed() {
  //   this.multipleSelection = []
  //   this.deepRuleForm = {}
  //   this.key = {}
  //   this.$refs.multipleTable.clearSelection()
  // }
}
