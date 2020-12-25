<template>
  <div class="tongyong">
    <div>
      <jdy-int v-model="ruleForm.int" holder="正整数" />
    </div>
    <div>
      <amount-input v-model="ruleForm.settlementAmount" placeholder="金额" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        int: '',
        lossInt: '',
        settlementAmount: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tongyong {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  & > div {
    margin-right: 10px;
  }
}
</style>
