<template>
  <div class="customer-details-info">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="客户基本信息" name="customerDetailsInfo">
        <customer-details-info :disabled="disabledStatus" />
      </el-tab-pane>
      <el-tab-pane label="银行信息" name="bankInfo">
        <bank-info :disabled="disabledStatus" />
      </el-tab-pane>
      <el-tab-pane label="联系人信息" name="contactsInfo">
        <contacts-info :disabled="disabledStatus" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CustomerDetailsInfo from './CustomerDetailsInfo'
import BankInfo from './BankInfo'
import ContactsInfo from './ContactsInfo'
export default {
  components: {
    CustomerDetailsInfo,
    BankInfo,
    ContactsInfo
  },
  props: {
    disabledStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName: 'customerDetailsInfo'
    }
  }
}
</script>

<style lang="less" scoped>
.customer-details-info {

}
</style>
