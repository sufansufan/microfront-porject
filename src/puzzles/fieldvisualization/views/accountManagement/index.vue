<template>
  <div class="account-management">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="银行账户"
        name="first"
      >
        <template v-if="bankActive==='default'">
          <bank-account @changeTabBank="changeTabConent" />
        </template>
        <template v-if="bankActive==='bankAdd'">
          <add-bank-account @changeTabBank="changeTabConent" />
        </template>
        <template v-if="bankActive==='transfer'">
          <bank-transfer @changeTabBank="changeTabConent" />
        </template>
        <template v-if="bankActive==='bankDeposit'">
          <bank-of-deposit @changeTabBank="changeTabConent" />
        </template>
      </el-tab-pane>
      <el-tab-pane
        label="现金账户"
        name="second"
      >
        <template v-if="cashActive==='default'">
          <cash-account @changeTabBank="changeTabConent" />
        </template>
        <template v-if="cashActive==='cashAdd'">
          <add-cash-account @changeTabBank="changeTabConent" />
        </template>
        <template v-if="cashActive==='transfer'">
          <cash-transfer @changeTabBank="changeTabConent" />
        </template>
        <template v-if="cashActive==='cashDeposit'">
          <cash-of-deposit @changeTabBank="changeTabConent" />
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BankAccount from './components/bankAccount'
import AddBankAccount from './components/addBankAccount'
import BankTransfer from './components/bankTransfer'
import BankOfDeposit from './components/bankOfDeposit'
import CashAccount from './components/cashAccount'
import AddCashAccount from './components/addCashAccount'
import CashTransfer from './components/cashTransfer'
import CashOfDeposit from './components/cashOfDeposit'

export default {
  name: 'Index',
  components: {
    BankAccount,
    CashAccount,
    AddBankAccount,
    BankTransfer,
    BankOfDeposit,
    AddCashAccount,
    CashTransfer,
    CashOfDeposit
  },
  data() {
    return {
      activeName: 'first',
      bankActive: 'default',
      cashActive: 'default'
    }
  },
  methods: {
    changeTabConent(type, status) {
      switch (type) {
        case 'bankActive':
          this.bankActive = status
          break
        case 'cashActive':
          this.cashActive = status
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.account-management{
  padding:20px;
  height: calc(100vh - 120px);
  overflow-y: scroll;
}
</style>
