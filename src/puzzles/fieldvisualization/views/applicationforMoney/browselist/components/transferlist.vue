<template>
  <div class="transfer">
    <el-transfer
      v-model="value"
      style="text-align: left; display: inline-block"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :titles="['未选发票', '已选发票']"
      :button-texts="['移除', '选择']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      :data="data"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [1],
      value4: [1]
    }
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
