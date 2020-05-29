<template>
  <div class="steps-box">
    <slot type="finish" />
  </div>
</template>

<script>
export default {
  props: {
    action: {
      default: 0,
      type: Number,
      required: true
    }
  },
  watch: {
    action: {
      handler() {
        this.$nextTick(() => {
          this.slotNum()
        })
      },
      deep: true
    }
  },
  mounted() {
    this.slotNum()
  },
  methods: {
    slotNum() {
      // const slotStep = this.$slots.default.filter(item => item.tag)
      // slotStep.forEach((item, index) => {
      //   item.elm.style.width = 100 / slotStep.length + '%'
      //   if (index < this.action) {
      //     console.log(item.elm.classList, 888)
      //     item.elm.classList.add('finish')
      //   } else if (index === this.action) {
      //     item.elm.classList.add('process')
      //   } else {
      //     item.elm.classList.add('wait')
      //   }
      // })
      if (this.action < 0) {
        return
      }
      this.$slots.default = this.$slots.default.filter(item => item.tag)
      this.$slots.default.map((item, index) => {
        if (index < this.action) {
          item.elm.classList.remove('process')
          item.elm.classList.remove('wait')
          item.elm.classList.add('finish')
          item.elm.childNodes[4].childNodes[0].innerHTML = ''
        } else if (index === this.action) {
          item.elm.classList.remove('wait')
          item.elm.classList.remove('finish')
          item.elm.classList.add('process')
          item.elm.childNodes[4].childNodes[0].innerHTML = index + 1
        } else {
          item.elm.classList.add('wait')
          item.elm.childNodes[4].childNodes[0].innerHTML = index + 1
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.steps-box {
  width: 100%;
  display: flex;
  justify-content: space-around;
  min-height: 60px;
}
</style>
