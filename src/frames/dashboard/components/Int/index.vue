<template>
  <div class="int">
    <el-input v-model.number="inputNum" type="age" autocomplete="off" :maxlength="maxlength" :placeholder="placeholder" :disabled="disabled">
      <template slot="append">
        <slot name="append" />
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    isInt: {
      type: Boolean,
      default: true
    },
    oneZero: {
      type: Boolean,
      default: false
    },
    twoZero: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 4
    },
    holder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputNum: ''
    }
  },
  computed: {
    placeholder() {
      return '请输入' + this.holder
    }
  },
  watch: {
    value: {
      handler(newV) {
        this.inputNum = newV
      },
      immediate: true
    },
    inputNum(newV) {
      this.formatData(newV)
    }
  },
  methods: {
    formatData(newV) {
      var str = String(newV)
      if (newV) {
        if (this.isInt) {
          str = str.replace(/[^0-9]/g, '')
          this.inputNum = Number(str)
          this.$emit('input', Number(str))
        } else {
          str = str.replace(/[^\0-9\-]/g, '')
          if (str.indexOf('-') > -1) {
            str = '-' + str.replace(/-/g, '')
          }
          this.inputNum = str
          this.$emit('input', Number(str))
        }
      } else {
        this.inputNum = ''
        this.$emit('input', this.inputNum)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
