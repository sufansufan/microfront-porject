<!--采购合同详情-->
<template>
  <div class="purchase-details">
    <div class="purchase-name">
      <span>教学科研楼维修改造工程一期一有朋馆改造工程辅料采购合同</span>
    </div>
    <el-form ref="form" :model="form" label-width="150px" :rules="formRules" class="rule-form-flex four-width">
      <el-form-item label="合同编号">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="合同状态">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="合同类型">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="供应商">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="签订日期">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="合同金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="结算金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="付款金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

      <el-form-item label="未付金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="收票金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="收票未付金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="未收票已付款金额">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>

    </el-form>
    <div class="tableList">
      <el-tabs
        ref="tabs"
        v-model="activeName"
        type="card"
        class="one-card-tabs is-padding"
        @tab-click="handleClick"
      >
        <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
          <template v-if="compomentAdd">
            <component :is="componentName ? '' : item.com" @changeComName="changeComName" />
          </template>
          <template v-else>
            <component :is="compomentAddName" @changeComName="changeComName" />
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import ReceiptDetails from './ReceiptDetails'
import PaymentDetails from './PaymentDetails'
export default {
  name: 'PurchaseDetails',
  components: {
    ReceiptDetails,
    PaymentDetails
  },
  data() {
    return {
      form: {
        name: '10'
      },
      componentName: '',
      compomentAdd: true,
      compomentAddName: '',
      activeName: 'ReceiptDetails',
      tabList: [
        {
          label: '收票明细',
          name: 'ReceiptDetails',
          com: 'ReceiptDetails'
        },
        {
          label: '付款明细',
          name: 'PaymentDetails',
          com: 'PaymentDetails'
        },
        {
          label: '合同信息',
          name: 'PaymentDetails',
          com: 'PaymentDetails'
        },
        {
          label: '补充协议',
          name: 'PaymentDetails',
          com: 'PaymentDetails'
        }
      ]
    }
  },
  methods: {
    changeComName() {

    }
  }
}
</script>
<style lang="less" scoped>
.purchase-details {
  margin-bottom: 10px;
  .purchase-name {
    display: flex;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    margin: 10px 0;
  }
}
</style>
