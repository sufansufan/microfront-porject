export default {
  methods: {
    keyupSearch(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode === 13) {
        this.fetchData()
      }
    }
  }
}
