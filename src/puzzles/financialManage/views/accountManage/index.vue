<template>
  <div class="account-manage">
    <div class="middle_tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="银行账户" name="bank">
          <keep-alive>
            <template>
              <bank-list ref="processParam" :process-list="processList" />
            </template>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="现金账户" name="cash">
          <keep-alive>
            <template>
              <cash-list ref="processFrom" :process-list="processList" />
            </template>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import BankList from './components/BankList'
import CashList from './components/CashList'
export default {
  name: 'AccountManage',
  components: {
    BankList,
    CashList
  },
  data() {
    return {
      activeName: 'bank'
    }
  }
}
</script>

<style lang="less" scoped>
.account-manage {
  height: calc(100vh - 130px);
  overflow-y: auto;
  padding: 10px;
}
</style>
