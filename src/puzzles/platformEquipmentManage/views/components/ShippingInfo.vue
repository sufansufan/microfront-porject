<template>
  <div class="shipping-info">
    <el-form ref="ruleForm" v-loading="loading" :rules="rules" :model="ruleForm" label-width="100px" class="info-form">
      <el-form-item label="发货人" prop="consignorId">
        <el-select v-model="ruleForm.consignorId" clearable filterable placeholder="请选择收货人" :disabled="disabled" style="width: 100%" @change="personnelListChange">
          <el-option
            v-for="item in personnelList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" prop="telephone">
        <el-input v-model.trim="ruleForm.telephone" clearable placeholder="请输入联系电话" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="发货地区" prop="consignorArea">
        <el-cascader
          v-model="ruleForm.consignorArea"
          placeholder="请选择发货地区"
          clearable
          :disabled="disabled"
          style="width:100%"
          :options="constant.nativePlace"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children' }"
        />
      </el-form-item>
      <el-form-item label="发货地址" class="two-width" prop="consignorAddress">
        <el-input v-model.trim="ruleForm.consignorAddress" :maxlength="50" :disabled="disabled" placeholder="请输入发货地址" />
      </el-form-item>
      <el-form-item label="备注" class="all-width row-label" prop="remark">
        <el-input v-model.trim="ruleForm.remark" type="textarea" :maxlength="255" :rows="3" :disabled="disabled" placeholder="请输入备注" />
      </el-form-item>
      <!-- <el-form-item label="操作人">
        <el-input v-model.trim="ruleForm.name" />
      </el-form-item>
      <el-form-item label="操作时间">
        <el-date-picker v-model.trim="ruleForm.name" placeholder="请选择操作时间" type="date" />
      </el-form-item> -->
      <el-form-item label="发货清单" class="all-width">
        <div class="add-can">
          <slot name="order" />
          <div />
          <div style="float:right"><span>发货总数量: {{ totalDevices }} </span>金额合计(含运费): {{ totalAmout.toLocaleString() }}</div>
        </div>
        <div>
          <el-table
            ref="tableRef"
            :data="tableData"
            row-key="id"
            border
            max-height="calc(100vh - 450px)"
          >
            <el-table-column type="index" label="序号" width="50" align="center" />
            <el-table-column prop="deviceName" label="设备名称" align="center" show-overflow-tooltip />
            <el-table-column prop="deviceTypeName" label="设备类型" align="center" />
            <el-table-column prop="brand" label="品牌" align="center" show-overflow-tooltip />
            <el-table-column prop="specifications" label="规格型号" align="center" show-overflow-tooltip />
            <el-table-column prop="unitName" label="单位" align="center" />
            <el-table-column label="设备序列号" align="center" width="300">
              <template slot-scope="{row}">
                <el-select v-model="row.sequenceNumber" disabled placeholder="请选择设备序列号" style="width: 100%">
                  <el-option v-for="item in equipmentAll" :key="item.id" :label="item.serialNumber" :value="item.id" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="装箱号" align="center">
              <template slot-scope="{row}">
                <el-input v-model.trim="row.packingNumber" placeholder="请输入装箱号" :maxlength="20" :disabled="disabled" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
    </el-form>
    <drag-dialog ref="distribution" title="配货" width="90%">
      <div>
        <el-table
          ref="tableRef"
          v-loading="matchtableLoading"
          :data="matchtableData"
          row-key="idList"
          border
          class="distribution-table"
          max-height="40vh"
        >
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="deviceName" label="设备名称" align="center" show-overflow-tooltip />
          <el-table-column prop="deviceTypeName" label="设备类型" align="center" />s
          <el-table-column prop="brand" label="品牌" align="center" show-overflow-tooltip />
          <el-table-column prop="specifications" label="规格型号" align="center" show-overflow-tooltip />
          <el-table-column prop="unitName" label="单位" align="center" width="100 " />
          <el-table-column prop="unitPrice" label="市场价格" align="center" />
          <el-table-column prop="purchaseTotal" label="采购数量" align="center" width="100 " />
          <el-table-column label="配货数量" align="center" width="100">
            <template slot-scope="{row}">
              {{ row.sequenceNumber.length }}
            </template>
          </el-table-column>
          <el-table-column prop="sequenceNumber" align="center" width="430">
            <template slot="header">
              <span class="star">*</span>
              <span>设备序列号</span>
            </template>
            <template slot-scope="{row}">
              <el-select v-model="row.sequenceNumber" multiple filterable placeholder="请选择设备序列号" style="width:400px;">
                <el-option v-for="item in row.deviceProductsDTOs" :key="item.id" :label="item.serialNumber" :value="item.id" />
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="base-info-footer">
        <el-button type="primary" @click="distributionSubmit">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>
<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import { queryGoodsInfo, saveInvoice, saveConfigInvoice, queryorderNumberGoods, getCoordination } from '@core/api/platformEquipmentManage/deviceordermanager'
import { queryAllEquipment } from '@core/api/platformEquipmentManage/devicemanager'
import { getCustodian } from '@core/api/personnel'
import { getSessionStorage } from '@core/utils/auth'
import { mapGetters } from 'vuex'
import { validatePhone, validateLength } from '@core/utils/validate'
export default {
  components: {
    DragDialog
  },
  props: {
    disabled: {
      default: false,
      type: Boolean
    },
    orderNumber: {
      default: '',
      type: String
    }
  },
  data() {
    var validPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        if (!validatePhone(value)) {
          callback(new Error('请输入正确的电话'))
        } else {
          callback()
        }
      }
    }
    return {
      ruleForm: {
        consignorId: '',
        telephone: '',
        consignorArea: [],
        consignorAddress: '',
        remark: ''
      },
      tableData: [],
      totalDevices: 0,
      totalAmout: 0,
      personnelList: [],
      equipment: [],
      equipmentAll: [],
      loading: false,
      rules: {
        consignorId: [{ required: true, message: '请选择发货人', trigger: 'change' }],
        telephone: [{ required: true, validator: validPhone, trigger: 'blur' }],
        consignorArea: [{ required: true, message: '请选择发货地址', trigger: 'change' }],
        consignorAddress: [{ required: true, message: '请输入发货地址', trigger: 'blur' }, validateLength(0, 50)],
        remark: [validateLength(0, 255)]
      },
      purchaseList: [],
      matchtableLoading: false
    }
  },
  computed: {
    ...mapGetters(['constant', 'purchaseMoney']),
    matchtableData() {
      const list = JSON.parse(JSON.stringify(this.purchaseList))
      list.map((item, index) => {
        if (item.purchaseTotal) {
          const sequenceNumber = []
          if (item.deviceChosedProductsDTOs.length) {
            item.deviceChosedProductsDTOs.forEach(item => {
              sequenceNumber.push(item.id)
            })
          }
          if (item.deviceProductsDTOs.length < item.purchaseTotal) {
            if (item.deviceProductsDTOs.length !== sequenceNumber.length) {
              item.deviceProductsDTOs.forEach(v => {
                if (sequenceNumber.length < item.purchaseTotal && !sequenceNumber.includes(v.id)) {
                  sequenceNumber.push(v.id)
                }
              })
            }
          } else {
            if (item.deviceProductsDTOs.length !== sequenceNumber.length) {
              for (let i = 0; i < item.purchaseTotal; i++) {
                if (item.deviceProductsDTOs.length) {
                  if (sequenceNumber.length < item.purchaseTotal && !sequenceNumber.includes(item.deviceProductsDTOs[i].id)) {
                    sequenceNumber.push(item.deviceProductsDTOs[i].id)
                  }
                }
              }
            }
          }
          item.sequenceNumber = sequenceNumber
          return item
        }
      })
      return list
    }
  },
  watch: {
    orderNumber: {
      handler(val) {
        if (val) {
          this.getGoodsInfo()
        }
      }
    }
  },
  created() {
    this.fetchPersonnel()
    this.$store.dispatch('getConstant', ['nativePlace']).then(() => {
      this.getAllEquipment({})
    })
  },
  methods: {
    getAllEquipment(params) {
      queryAllEquipment(params).then(({ data }) => {
        this.getGoodsInfo()
        this.equipmentAll = data
      })
    },
    changeDialog() {
      this.$refs.distribution.show = true
      this.queryCoordination()
    },
    getGoodsInfo() {
      const { orderId } = this.$route.query
      this.loading = true
      if (orderId) {
        queryGoodsInfo(orderId).then(({ data }) => {
          this.loading = false
          this.getData(data)
        })
      } else {
        queryorderNumberGoods(this.orderNumber).then(({ data }) => {
          this.loading = false
          this.getData(data)
        })
      }
    },
    getData(data) {
      if (!data.id) {
        const { id, telephone } = JSON.parse(getSessionStorage('personnel'))
        const { registeredPlace, officeAddress } = JSON.parse(getSessionStorage('organization'))
        this.ruleForm = {
          consignorId: id,
          telephone,
          consignorAddress: officeAddress,
          consignorArea: registeredPlace ? registeredPlace.split(',') : []
        }
      } else {
        const { consignorId, telephone, consignorArea, consignorAddress, remark, deviceDeliveryDetailsDTOs, id, amount, deliveryTotal } = data
        this.ruleForm = {
          id,
          consignorId,
          telephone,
          consignorArea: consignorArea ? consignorArea.split(',') : [],
          consignorAddress,
          remark
        }
        this.totalAmout = amount
        this.totalDevices = deliveryTotal
        const list = deviceDeliveryDetailsDTOs
        list.map(item => {
          item.sequenceNumber = item.deviceId
          return item
        })
        this.tableData = JSON.parse(JSON.stringify(list))
      }
    },
    fetchPersonnel() {
      getCustodian().then(({ data }) => {
        this.personnelList = data
      })
    },
    personnelListChange(val) {
      const row = this.personnelList.find(item => item.id === val)
      this.ruleForm.telephone = row.telephone
    },
    distributionSubmit() {
      for (let i = 0; i < this.matchtableData.length; i++) {
        const { purchaseTotal, sequenceNumber } = this.matchtableData[i]
        if (purchaseTotal !== sequenceNumber.length) {
          this.$confirm(`第${i + 1}条配货数量与采购数量不一致，是否结束配货？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.handlerGoodsData()
          })
          return
        }
      }
      this.handlerGoodsData()
    },

    handlePacking(v) {
      for (let i = 0; i < this.matchtableData.length; i++) {
        const item = this.matchtableData[i]
        const row = JSON.parse(JSON.stringify(item))
        for (let j = 0; j < row.deviceChosedProductsDTOs.length; j++) {
          if (row.deviceChosedProductsDTOs[j].id === v) {
            return row.deviceChosedProductsDTOs[j].packingNumber
          }
        }
      }
    },
    mathTotalPrice() {
      var totalPrice = 0
      this.tableData.forEach(item => {
        totalPrice = totalPrice + item.unitPrice
      })
      this.totalDevices = this.tableData.length
      this.totalAmout = totalPrice
      this.$refs.distribution.show = false
    },
    handlerGoodsData() {
      this.tableData = []
      this.matchtableData.forEach(item => {
        const row = JSON.parse(JSON.stringify(item))
        delete row.sequenceNumber
        item.sequenceNumber.forEach((v, i) => {
          this.tableData.push({
            ...row,
            sequenceNumber: v,
            packingNumber: this.handlePacking(v),
            idList: item.id + String(Math.random() * 10)
          })
        })
      })
      this.mathTotalPrice()
      this.$refs.distribution.show = false
    },
    saveSubmit(type) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { consignorArea, consignorId } = this.ruleForm
          let indexNum = 0
          const table = this.tableData.map(item => {
            item.deviceId = item.sequenceNumber
            item.sortNumber = indexNum++
            delete item.idList
            return item
          })
          const params = {
            Loading: true,
            orderId: this.$route.query.orderId,
            ...this.ruleForm,
            consignorArea: consignorArea.toString(),
            amount: this.totalAmout,
            deliveryTotal: this.totalDevices,
            deviceDeliveryDetailsDTOs: table,
            consignorName: this.personnelList.find(item => item.id === consignorId).name
          }
          if (type === 'save') {
            saveInvoice(params).then(() => {
              this.$message.success('保存成功')
              this.$router.go(-1)
            })
          } else if (type === 'config') {
            params.deliveryTotal = params.deviceDeliveryDetailsDTOs.length
            saveConfigInvoice(params).then(() => {
              this.$message.success('确认发货成功')
              this.$router.go(-1)
            })
          }
        } else {
          return false
        }
      })
    },
    queryCoordination() {
      this.matchtableLoading = true
      const { orderId } = this.$route.query
      getCoordination(orderId).then(({ data: { deviceDistributionResponseDTOs }}) => {
        this.matchtableLoading = false
        this.purchaseList = deviceDistributionResponseDTOs
      })
    }

  }
}
</script>

<style lang="less" scoped>
.shipping-info{
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
      &.two-width, &.all-width{
        width:100%;
      }
    }
    .add-can{
      padding-bottom:10px;
      width:100%;
      display: flex;
      justify-content: space-between;
    }
  }
  .base-info-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  .star {
    color: #F56C6C
  }
}
</style>
<style lang="less">
.shipping-info {
  .el-table__body-wrapper {
    max-height: calc(100vh - 500px);
  }
  .distribution-table {
    .el-table__body-wrapper {
      max-height: calc(40vh - 50px);
    }
  }
}
</style>
