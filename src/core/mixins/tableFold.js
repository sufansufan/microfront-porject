export default {
  methods: {
    // 全部展开
    toExpandall() {
      const els = document.getElementsByClassName('el-table__expand-icon')
      if (this.$refs.role.tableData.length !== 0 && els.length !== 0) {
        for (let i = 0; i < els.length; i++) {
          els[i].classList.add('dafult')
        }
        if (this.$el.getElementsByClassName('el-table__expand-icon--expanded')) {
          const open = this.$el.getElementsByClassName('el-table__expand-icon--expanded')
          for (let j = 0; j < open.length; j++) {
            open[j].classList.remove('dafult')
          }
          const dafult = this.$el.getElementsByClassName('dafult')
          for (let a = 0; a < dafult.length; a++) {
            dafult[a].click()
          }
        }
      }
    },
    // 全部收起
    toClose() {
      if (this.$refs.role.tableData.length !== 0) {
        const elsopen = this.$el.getElementsByClassName('el-table__expand-icon--expanded')
        if (this.$el.getElementsByClassName('el-table__expand-icon--expanded')) {
          for (let i = 0; i < elsopen.length; i++) {
            elsopen[i].click()
          }
        }
      }
    }
  }
}
