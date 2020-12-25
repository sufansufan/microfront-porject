export default {
  methods: {
    handleClick(tab) {
      if (tab.name === 'last') {
        this.$router.go(-1)
      }
    }
  }
}
