<template>
  <div class="orders-info">
    <el-form ref="ruleForm" v-loading="loading" :model="ruleForm" label-width="100px" class="info-form">
      <el-form-item label="收货人">
        <el-input v-model.trim="ruleForm.consigneeName" :disabled="disabled" placeholder="请输入发货人" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model.trim="ruleForm.telephone" :disabled="disabled" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="期望到货日期">
        <el-input v-model.trim="ruleForm.expectedArrivalDate" :disabled="disabled" placeholder="请选择期望到货日期" />
      </el-form-item>
      <el-form-item label="收货地区">
        <el-cascader
          v-model="ruleForm.consigneeArea"
          placeholder="请选择收货地区"
          clearable
          :disabled="disabled"
          style="width:100%"
          :options="constant.nativePlace"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children' }"
        />
      </el-form-item>
      <el-form-item label="收货地址" class="two-width">
        <el-input v-model.trim="ruleForm.consigneeAddress" placeholder="请输入收货地址" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="订单备注" class="all-width row-label">
        <el-input v-model.trim="ruleForm.remark" type="textarea" :rows="3" placeholder="请输入订单备注" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="采购人">
        <el-input v-model.trim="ruleForm.purchasePersonName" placeholder="请输入采购人" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="下单时间">
        <el-input v-model.trim="ruleForm.orderDate" placeholder="请输入下单时间" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="采购清单" class="all-width">
        <div class="add-can">
          <!-- <slot name="order" /> -->
          <div />
          <div><span>采购总数量: {{ ruleForm.purchaseTotal }} </span>金额合计(含运费): {{ ruleForm.amount ? String(ruleForm.amount).toLocaleString() : '' }}</div>
        </div>
        <div>
          <el-table
            ref="tableRef"
            :data="tableData"
            row-key="id"
            border
            max-height="calc(100vh - 445px)"
          >
            <el-table-column type="index" label="序号" width="50" align="center" />
            <el-table-column prop="deviceName" label="设备名称" align="center" show-overflow-tooltip />
            <el-table-column prop="deviceTypeName" label="设备类型" align="center" />
            <el-table-column prop="brand" label="品牌" align="center" show-overflow-tooltip />
            <el-table-column prop="specifications" label="规格型号" align="center" show-overflow-tooltip />
            <el-table-column prop="unitName" label="单位" align="center" />
            <el-table-column label="产品说明书" align="center">
              <template slot-scope="{row}">
                <span class="table-click-color" @click="productInfoClick(row)">{{ row.productInfoName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="unitPrice" label="市场价格" align="center" />
            <el-table-column prop="number" label="采购数量" align="center" />
            <el-table-column prop="totalPrice" label="金额" align="center" />
          </el-table>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { queryOrderInfo, queryorderNumberInfo, instructionsLoad } from '@core/api/platformEquipmentManage/deviceordermanager'
import { mapGetters } from 'vuex'
import { exportExcel } from '@core/utils'
export default {
  props: {
    disabled: {
      default: true,
      type: Boolean
    },
    orderNumber: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      imageUrl: '',
      ruleForm: {
        consigneeName: '',
        telephone: '',
        expectedArrivalDate: '',
        consigneeArea: '',
        consigneeAddress: '',
        remark: '',
        purchasePersonName: '',
        orderDate: ''
      },
      tableData: [],
      type: this.$route.query.type,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    orderNumber: {
      handler(val) {
        if (val) {
          this.getOrderInfo()
        }
      }
      // immediate: true
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['nativePlace'])
    this.getOrderInfo()
  },
  methods: {
    getOrderInfo() {
      const { orderId } = this.$route.query
      this.loading = true
      if (orderId) {
        queryOrderInfo(orderId).then(({ data }) => {
          this.loading = false
          this.getData(data)
        })
      } else {
        queryorderNumberInfo(this.orderNumber).then(({ data }) => {
          this.loading = false
          this.getData(data)
        })
      }
    },
    getData(data) {
      const { consigneeArea, purchaseTotal, amount } = data
      this.ruleForm = {
        ...data,
        consigneeArea: consigneeArea.split(',')
      }
      this.tableData = data.deviceOrderDetailsDTOs
      this.$store.commit('SET_ORDERTITLENAME', data.purchaseCompanyName)
      this.$store.commit('SET_PURCHASElIST', data.deviceOrderDetailsDTOs)
      this.$store.commit('SET_PURCHASEMONEY', { purchaseTotal, amount })
    },
    productInfoClick(row) {
      const { productInfoName, productInfoUrl } = row
      const last = productInfoUrl.lastIndexOf('.')
      const name = productInfoUrl.slice(last)
      instructionsLoad({ fileName: productInfoName, downloadUrl: productInfoUrl }).then((res) => {
        exportExcel(res, productInfoName + name)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.orders-info {
  .info-form {
    display: flex;
    flex-wrap: wrap;
    display: flex;
    width: 100%;
    & > div {
      width: 33.33%;
    }
    & > .el-form-item {
      width: 33.33%;
      .el-date-editor.el-input {
        width: 100%;
      }
      &.two-width{
        width: 66.66%;
      }
      &.all-width{
        width:100%;
      }
     .add-can{
       padding-bottom:10px;
       width:100%;
       display: flex;
       justify-content: space-between;
     }
    }
  }
  .tableref{
   .star{
      color:red;
    }
  }

}
</style>
<style lang="less" >
.orders-info {
  .el-table__body-wrapper {
    max-height: calc(100vh - 495px);
  }
}

</style>
