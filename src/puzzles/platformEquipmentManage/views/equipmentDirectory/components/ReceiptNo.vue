<template>
  <div class="receipt-no">
    <div style="margin-bottom:10px;">
      <el-button class="back-btn" @click="goBack"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="info-form">
      <el-form-item label="入库单号">
        <el-input v-model.trim="ruleForm.storageNumber" :disabled="disabled" placeholder="请输入入库单号" />
      </el-form-item>
      <el-form-item label="入库人">
        <el-input v-model.trim="ruleForm.storagePersonName" :disabled="disabled" placeholder="请输入入库人" />
      </el-form-item>
      <el-form-item label="入库时间">
        <el-input v-model.trim="ruleForm.storageDate" :disabled="disabled" placeholder="请输入入库时间" />
      </el-form-item>
      <el-form-item label="入库说明" style="width:100%" class="row-label">
        <el-input v-model.trim="ruleForm.remark" :disabled="disabled" type="textarea" :rows="3" placeholder="请输入入库说明" />
      </el-form-item>
      <el-form-item style="width:100%">
        <span style="float:right">采购总金额:{{ warehousMoney ? warehousMoney.toLocaleString() : 0 }}</span>
      </el-form-item>
      <el-form-item label="入库明细" style="width:100%">
        <div>
          <el-table ref="tableRef" :data="tableData" row-key="id" border>
            <el-table-column type="index" label="序号" width="50" align="center" />
            <el-table-column align="center">
              <template slot="header">
                <span class="star">*</span>
                <span>设备名称</span>
              </template>
              <template slot-scope="{row, $index}">
                <el-select v-model="row.deviceCatalogueId" placeholder="请选择设备名称" filterable :disabled="disabled" @change="equipmentChange($index, $event)">
                  <el-option v-for="item in equipNameList" :key="item.id" :label="item.deviceName" :value="item.id" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="设备类型" align="center">
              <template slot-scope="{row}">
                <el-select v-model="row.deviceType" placeholder="请选择设备类型" disabled>
                  <el-option v-for="item in constant.deviceType" :key="item.code" :label="item.name" :value="item.code" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="品牌" align="center">
              <template slot-scope="{row}">
                <span>{{ row.brand }}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格型号" align="center">
              <template slot-scope="{row}">
                <span>{{ row.specifications }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" align="center">
              <template slot-scope="{row}">
                <el-select v-model="row.unit" placeholder="请选择单位" disabled>
                  <el-option v-for="item in constant.deviceUnit" :key="item.code" :label="item.name" :value="item.code" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span class="star">*</span>
                <span>设备序列号</span>
              </template>
              <template slot-scope="{row}">
                <el-input v-model.trim="row.serialNumber" placeholder="多个设备序列号可用“,”间隔" :disabled="disabled" @blur="serialNumberBlur(row.serialNumber)" />
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span class="star">*</span>
                <span>采购价格</span>
              </template>
              <template slot-scope="{row}">
                <el-input v-model.trim="row.purchasePrice" placeholder="请输入采购价格" :disabled="disabled" @blur="purchasePriceBlur(row.purchasePrice)" />
              </template>
            </el-table-column>
            <el-table-column label="存放位置" align="center">
              <template slot-scope="{row}">
                <el-input v-model.trim="row.location" placeholder="请输入存放位置" :disabled="disabled" />
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center">
              <template slot-scope="{row}">
                <el-input v-model.trim="row.remark" placeholder="请输入备注" :disabled="disabled" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLibraryInfo, queryDirectoriesAll } from '@core/api/platformEquipmentManage/devicemanager'
import { mapGetters } from 'vuex'
export default {
  props: {
    disabled: {
      default: true,
      type: Boolean
    },
    numberId: {
      default: '',
      type: String
    },
    isGoBack: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      imageUrl: '',
      ruleForm: {
        storageNumber: '',
        storagePersonName: '',
        remark: '',
        storageDate: ''
      },
      tableData: [],
      equipNameList: []
    }
  },
  computed: {
    ...mapGetters(['constant']),
    warehousMoney() {
      var money = 0
      this.tableData.forEach(item => {
        if (item.serialNumber) {
          var serialNumberString = item.serialNumber.replace(/，/g, ',')
          if (serialNumberString && item.purchasePrice) money += (item.purchasePrice * 1) * (serialNumberString ? serialNumberString.split(',').length : 0)
        }
      })
      return money
    }
  },
  watch: {
    numberId: {
      handler(val) {
        if (val) {
          this.fetchLibraryInfo(val)
        }
      },
      immediate: true
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['deviceType', 'deviceUnit'])
    this.fetchDirectoriesAll()
  },
  methods: {
    fetchLibraryInfo(id) {
      getLibraryInfo(id).then(({ data }) => {
        const { storageNumber, remark, list, storagePersonName, storageDate } = data
        this.ruleForm = {
          storageNumber,
          storagePersonName,
          storageDate,
          remark
        }
        this.tableData = list
      })
    },
    fetchDirectoriesAll() {
      queryDirectoriesAll({ state: '01' }).then(({ data }) => {
        this.equipNameList = data
      })
    },
    goBack() {
      if (this.isGoBack) {
        this.$router.go(-1)
      } else {
        this.$emit('changeTabConent', 'equipment', 'addEquipment', 'details')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.receipt-no {
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
    }
  }
  .star {
    color: #F56C6C;
  }
}
</style>
