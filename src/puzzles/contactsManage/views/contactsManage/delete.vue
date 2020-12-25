<template>
  <div>

    <div style="display:flex;flex-direction:column;">
      <div v-for="(item,index) in shoppeList" :key="index" class="el-textarea">
        <textarea
          ref="ttl"
          v-model="item.content"
          type="textarea"
          rows="10"
          autocomplete="off"
          @focus="aaa(index)"
        />
        <button type="button" @click="insertAtCursor(item,index)">插入字段</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shoppeList: [
        {
          id: 3,
          value: 'name'
        },
        {
          id: 4,
          value: 'sex'
        }
      ]
    }
  },
  methods: {
    // 获取光标位置
    async insertAtCursor(item, index) {
      this.$set(item, 'content', '')
      const myField = this.$refs.ttl[index]
      const myValue = item.value
      console.log(myField.selectionStart)
      if (myField.selectionStart || myField.selectionStart === 0) {
        var startPos = myField.selectionStart
        var endPos = myField.selectionEnd
        item.content = myField.value.substring(0, startPos) + '{' + item.value + '}' +
        myField.value.substring(endPos, myField.value.length + 2)
        await this.$nextTick() // 这句是重点, 圈起来
        myField.focus()
        myField.setSelectionRange(endPos + item.value.length + 2, endPos + item.value.length + 2)
        console.log(myField.setSelectionRange)
      } else {
        item.content += '{' + myValue + 2 + '}'
      }
    },
    aaa(index) {
      const myField = this.$refs.ttl[index]
      console.log(myField)
      console.log(myField.selectionStart)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
