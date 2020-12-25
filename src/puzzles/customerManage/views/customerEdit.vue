<template>
  <div class="customer-edit">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="客户基本信息" name="customerDetailsInfo">
        <customer-details-info />
      </el-tab-pane>
      <el-tab-pane label="银行信息" name="bankInfo">
        <bank-info />
      </el-tab-pane>
      <el-tab-pane label="联系人信息" name="contactsInfo">
        <contacts-info />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import customerDetailsInfo from './components/CustomerDetailsInfo'
import contactsInfo from './components/ContactsInfo'
import bankInfo from './components/BankInfo'
export default {
  components: {
    customerDetailsInfo,
    contactsInfo,
    bankInfo
  },
  provide() {
    return {
      pageType: this.$route.query.page
    }
  },
  data() {
    return {
      activeName: 'customerDetailsInfo'
    }
  },
  methods: {
    handleClick() {

    }
  }
}
</script>

<style lang="less" scoped>
.customer-edit {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
}
</style>
