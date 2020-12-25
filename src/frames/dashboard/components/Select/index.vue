<template>
  <div class="jsy-select">
    <template v-if="isCascader">
      <el-cascader
        ref="selectRef"
        v-model="selectValue"
        :disabled="disabled"
        :options="selectData"
        :props="customOptions"
        :placeholder="placeholder"
        clearable
        filterable
        @change="changeCascader"
      />
    </template>
    <template v-else>
      <el-select
        ref="selectRef"
        v-model="selectValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :value-key="valueKey"
        clearable
        :multiple="multiple"
        filterable
        @change="changeCascader"
      >
        <el-option
          v-for="item in selectData"
          :key="item[customOptions.value]"
          :label="item[customOptions.label]"
          :value="valueKey ? item : item[customOptions.value]"
        />
      </el-select>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    holder: {
      type: String,
      default: ''
    },
    selectData: {
      type: Array,
      default: () => []
    },
    selectOptions: {
      type: Array,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    isCascader: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: ''
    },
    modelName: {
      type: [Array, String],
      default: () => [] || ''
    },
    isModelName: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectValue: this.multiple || this.isCascader ? [] : ''
    }
  },
  computed: {
    placeholder() {
      return '请选择' + this.holder
    },
    customOptions() {
      return {
        ...this.selectOptions,
        value: this.selectOptions?.value || 'code',
        label: this.selectOptions?.label || 'name',
        multiple: this.multiple
      }
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.selectValue = this.value
      },
      immediate: true
    },
    selectValue(newValue) {
      this.handlerSelectName(newValue)
      this.$emit('input', newValue)
    }
  },
  methods: {
    changeCascader(val) {
      this.handlerSelectName(val)
      this.$emit('change', val)
    },
    handlerSelectName(val) {
      if (this.isModelName) {
        if (this.isCascader && this.$refs.selectRef) {
          this.$emit('update:modelName', this.$refs.selectRef.getCheckedNodes()[0]?.pathLabels)
        } else {
          if (this.selectData.length) {
            const name = this.selectData.find(item => item[this.customOptions.value] === val)[this.customOptions.label]
            this.$emit('update:modelName', name)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
