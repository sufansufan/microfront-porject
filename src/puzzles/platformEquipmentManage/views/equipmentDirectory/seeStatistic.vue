<template>
  <div class="see-statistic">
    <div style="margin-bottom:10px;">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <addEquipment dialog-type="details" :disabled="true" />
  </div>
</template>

<script>
import AddEquipment from './addEquipment'
export default {
  name: 'SeeStatistic',
  components: {
    AddEquipment
  }
}
</script>

<style lang="less" scoped>
.see-statistic {
  padding: 10px;
}
</style>
