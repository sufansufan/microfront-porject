<template>
  <div class="main-content">
    <div class="middle_tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="质保/保函" name="Warranty">
          <keep-alive>
            <template>
              <warranty ref="processParam" :process-list="processList" />
            </template>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="押金" name="deposit">
          <keep-alive>
            <template>
              <deposit ref="processFrom" :process-list="processList" />
            </template>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Warranty from './Warranty'
import Deposit from './Deposit'
export default {
  name: 'MainContent',
  components: {
    Warranty,
    Deposit
  },
  data() {
    return {
      activeName: 'Warranty'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
