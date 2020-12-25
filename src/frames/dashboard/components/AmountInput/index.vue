<template>
  <div>
    <el-input v-model="inputVal" :placeholder="placeholder" :maxlength="maxlength" :disabled="disabled" style="text-align:right;" clearable @blur="blurEvent" @change="inputChange" @focus="$emit('focus', null)">
      <template slot="append">{{ unitName }}</template>
      <!-- <template slot="append">
         <slot name="append" />
      </template> -->
    </el-input>
  </div>
</template>
<script>
// import Vue from 'vue'

export default {
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },
    showEmpty: {
      type: Boolean,
      required: false,
      default: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false,
      default: '请输入金额'
    },
    maxlength: {
      type: Number,
      default: 16
    },
    unitName: {
      type: String,
      default: '元'
    }
  },
  data() {
    return {
      isInit: true,
      inputVal: '',
      lastVal: ''
    }
  },
  watch: {
    value: {
      handler(num) {
        this.inputVal = num
        this.convertNum(num)
      },
      immediate: true

    },
    inputVal(num) {
      this.convertNum(num)
    }
  },
  mounted() {
    // this.$nextTick(function() {
    //   const num = this.value
    //   this.convertNum(num)
    // })
  },
  methods: {
    blurEvent() {
      this.$emit('blur', null)
    },
    inputChange(num) {
      this.$emit('change', num)
    },
    convertNum: function(num) {
      if (num && typeof (num) !== 'undefined' && (num === '-' || !isNaN((num + '').replace(/,/g, '')))) {
        num = num + ''
        if (num !== this.lastVal) {
          num = num.replace(/,/g, '')
          this.$emit('input', num)
          // this.$emit('change', num)
          var minus = ''; var int = ''; var dec = ''
          if (this.disabled) {
            dec = '.00'
          }
          if (num.indexOf('-') > -1) {
            minus = '-'
            num = num.substring(1, num.length)
          }
          if (num.indexOf('.') > -1) {
            int = num.substring(0, num.indexOf('.'))
            dec = num.substring(num.indexOf('.'), num.length)
          } else {
            int = num
          }
          var result = []; var counter = 0
          int = int.split('')
          const noZeroIndex = int.findIndex(item => item !== '0') // 找到第一个不为0的下标
          const cancelZero = int.filter((item, index) => index >= noZeroIndex) // 第一个不为0的以后数据
          for (var i = cancelZero.length - 1; i >= 0; i--) {
            counter++
            result.unshift(cancelZero[i])
            if (!(counter % 3) && i !== 0) {
              result.unshift(',')
            }
          }
          this.lastVal = minus + result.join('') + dec
          this.inputVal = this.lastVal
          if (this.isInit) {
            this.isInit = false
          } else {
            if (this.$parent != null && this.$parent !== undefined && this.$parent.validate !== null && this.$parent.validate !== undefined) {
              this.$parent.validate('change')
            }
          }
        }
      } else {
        if (this.showEmpty && this.inputVal !== '' && this.inputVal !== null) {
          if (this.disabled) {
            this.lastVal = '0.00'
            this.inputVal = '0.00'
          } else {
            this.lastVal = '0'
            this.inputVal = '0'
          }
        } else {
          if (this.inputVal === null) return
          this.inputVal = this.inputVal.replace('。', '.')
          if (!this.inputVal) {
            this.lastVal = ''
            this.inputVal = ''
          } else {
            this.inputVal = this.lastVal
          }
        }
        this.$emit('input', this.inputVal)
        // this.$emit('change', this.inputVal)

        if (this.isInit) {
          this.isInit = false
        } else {
          if (this.$parent != null && this.$parent !== undefined && this.$parent.validate !== null && this.$parent.validate !== undefined) {
            this.$parent.validate('change')
          }
        }
      }
    }
  }
}
</script>
