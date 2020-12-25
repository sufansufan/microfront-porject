<template>
  <div class="add-equipment" :class="$route.query.equipType === 'equipment' ? 'add-equipment-padding' : ''">
    <div v-if="dialogType==='details' && !seeStatistic" style="margin-bottom:10px;">
      <el-button class="back-btn" @click="$emit('changeTabConent', 'equipment', 'default')"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-form ref="ruleForm" :key="ruleFormKey" v-loading="loading" :model="ruleForm" :rules="rules" label-width="100px" class="info-form">
      <el-form-item label="设备名称" prop="deviceCatalogueId">
        <el-select v-model="ruleForm.deviceCatalogueId" filterable placeholder="请选择设备名称" :disabled="disabled || dialogType==='add' || dialogType==='edit'">
          <el-option v-for="item in equipNameList" :key="item.id" :label="item.deviceName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="fromNameData.deviceType" placeholder="请选择设备类型" :disabled="disabled || equipNameDisabled">
          <el-option v-for="item in constant.deviceType" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="品牌">
        <el-input v-model.trim="fromNameData.brand" :disabled="disabled || equipNameDisabled" placeholder="请输入品牌" />
      </el-form-item>
      <el-form-item label="规格型号">
        <el-input v-model.trim="fromNameData.specifications" :disabled="disabled || equipNameDisabled" placeholder="请输入规格型号" />
      </el-form-item>
      <el-form-item label="单位">
        <el-select v-model="fromNameData.unit" placeholder="请选择单位" :disabled="disabled || equipNameDisabled">
          <el-option v-for="item in constant.deviceUnit" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="采购价格" prop="purchasePrice">
        <el-input v-model.trim="ruleForm.purchasePrice" :maxlength="10" :disabled="disabled" clearable placeholder="请输入采购价格" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="fromNameData.state" placeholder="请选择状态" :disabled="disabled || equipNameDisabled">
          <el-option v-for="item in constant.deviceStatus" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="存放位置" prop="location">
        <el-input v-model.trim="ruleForm.location" :disabled="disabled" placeholder="请输入存放位置" :maxlength="20" clearable />
      </el-form-item>
      <template v-if="dialogType==='details'">
        <el-form-item label="入库单号">
          <el-input disabled placeholder="" :maxlength="20" clearable />
          <div class="table-click-color receipt" @click="receiptNo('receiptNo', ruleForm.deviceStorageId)">{{ ruleForm.deviceStorageNumber }}</div>
        </el-form-item>
        <el-form-item label="采购订单号">
          <el-input disabled placeholder="" :maxlength="20" clearable />
          <div class="table-click-color receipt" @click="receiptNo('pOrderNo', ruleForm.orderNumber)">{{ ruleForm.orderNumber }}</div>
        </el-form-item>
      </template>
      <el-form-item label="入库人" prop="storagePersonId">
        <el-select v-model="ruleForm.storagePersonId" :disabled="disabled" filterable placeholder="请选择入库人" clearable>
          <el-option v-for="item in allPeopleList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="入库日期" prop="storageDate">
        <el-date-picker v-model="ruleForm.storageDate" :disabled="disabled" placeholder="请选择入库日期" clearable type="datetime" />
      </el-form-item>
      <el-form-item v-if="!disabled" label="设备序列号" prop="serialNumber" style="width:100%" :class=" dialogType === 'edit' ? '' : 'row-label'">
        <el-input v-model.trim="ruleForm.serialNumber" :disabled="disabled || fromNameData.state !== '01'" :type="dialogType === 'edit' ? '' : 'textarea'" :placeholder="dialogType === 'edit' ? '请输入设备序列号' :'若有多个设备则序列号可用“,”间隔，保存后会生成多个设备'" :rows="3" :maxlength="dialogType === 'edit' ? 20 : 255" />
      </el-form-item>
      <el-form-item v-else label="设备序列号" prop="serialNumber" style="width:100%">
        <el-input v-model.trim="ruleForm.serialNumber" :disabled="disabled" placeholder="若有多个设备则序列号可用“,”间隔，保存后会生成多个设备" />
      </el-form-item>
      <el-form-item label="备注" prop="remark" style="width: 100%" class="row-label">
        <el-input v-model.trim="ruleForm.remark" :disabled="disabled" type="textarea" :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>
    </el-form>
    <div v-if="dialogType!=='details'" class="base-info-footer">
      <el-button type="primary" @click="submit('save')">保存</el-button>
      <el-button v-if="equipType" type="primary" @click="submit('add')">保存并新增</el-button>
      <el-button class="cancel-btn" @click="receiptNo('default')">取消</el-button>
    </div>
  </div>
</template>

<script>
import { queryDirectoriesAll, getDirectoriesFromId, addEquipment, addStopEquipment, editEquipmentItem, getEquipmentItem } from '@core/api/platformEquipmentManage/devicemanager'
import { validatePositive, validateLength, validateSerial } from '@core/utils/validate'
import { mapGetters } from 'vuex'
import { getCustodian } from '@core/api/personnel'
import { codeChangeName } from '@core/utils'
export default {
  props: {
    disabled: {
      default: false,
      type: Boolean
    },
    // 是否是设备名录的时候新增设备
    dialogType: {
      default: '',
      type: String
    }
  },
  data() {
    var validPrice = (rule, value, callback) => {
      if (!validatePositive(value) && value) {
        callback(new Error('请输入任意正数,正小数(小数位不超过2位),'))
      } else {
        callback()
      }
    }
    var validSerial = (rule, value, callback) => {
      if (!validateSerial(value) && value) {
        callback(new Error('请输入正确的设备序列号,用逗号中间不能为空,结尾不能有逗号'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        orderNumber: '',
        deviceCatalogueId: '',
        location: '',
        purchasePrice: '',
        storagePersonId: '',
        storagePersonName: '',
        storageDate: '',
        serialNumber: '',
        remark: ''
      },
      fromNameData: {
        brand: '',
        deviceType: '',
        specifications: '',
        unit: '',
        state: '01'
      },
      deepFromNameData: {},
      deepRuleForm: {},
      ruleFormKey: 0,
      rules: {
        deviceCatalogueId: [{ required: true, message: '请选择设备名称', trigger: 'change' }],
        purchasePrice: [
          { required: true, message: '请输入采购价格', trigger: 'blur' },
          { validator: validPrice, trigger: 'blur' }
        ],
        storagePersonId: [{ required: true, message: '请选择入库人', trigger: 'change' }],
        storageDate: [{ required: true, message: '请选择入库时间', trigger: 'change' }],
        serialNumber: [
          { required: true, message: '请输入设备序列号', trigger: 'blur' },
          { validator: validSerial, trigger: 'blur' },
          validateLength(0, 255)
        ],
        location: [validateLength(0, 20)],
        remark: [validateLength(0, 255)]
      },
      equipType: this.$route.query.equipType,
      equipNameList: [],
      equipNameDisabled: true,
      allPeopleList: [],
      seeStatistic: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['constant', 'equipmentItem']),
    // serialType() {
    //   if (this.dialogType === 'details' || this.dialogType === 'edit') {
    //     return 'input'
    //   } else {
    //     return 'textarea'
    //   }
    // },
    nameDisabled() {
      const { id } = this.$route.query
      if (id) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    'ruleForm.deviceCatalogueId'(val) {
      if (val) {
        const row = this.equipNameList.find(item => item.id === val)
        const { brand, deviceType, specifications, unit } = row
        this.fromNameData = {
          ...this.fromNameData,
          brand,
          deviceType,
          specifications,
          unit
        }
      }
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['deviceType', 'deviceStatus', 'deviceUnit'])
    const { id, statisticId } = this.$route.query
    // id ? this.fetchSingleData(id) : this.fetchDirectoriesAll()
    this.fetchDirectoriesAll().then(() => {
      if (id) this.fetchSingleData(id)
    })
    this.deepFromNameData = JSON.parse(JSON.stringify(this.fromNameData))
    this.deepRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
    this.allPeople()
    if (statisticId) {
      this.seeStatistic = true
      this.fetchEquipmentItem()
    } else {
      this.equipListEdit()
    }
  },
  methods: {
    receiptNo(type, number) {
      const { statisticId } = this.$route.query
      if (statisticId) {
        if (type === 'receiptNo') {
          this.$router.push({ name: 'seeWarehouseOrder', query: { id: number }})
        } else {
          this.$router.push({ name: 'seeOrder', query: { id: number }})
        }
      } else {
        if (this.equipType) {
          this.$router.go(-1)
        } else {
          this.$emit('changeTabConent', 'equipment', type, number)
        }
      }
    },
    // 获取全部的设备名称
    fetchDirectoriesAll() {
      return new Promise((resolve, reject) => {
        var params = {
          state: '01'
        }
        if (this.dialogType === 'add' || this.dialogType === 'edit') {
          params = {}
        }
        queryDirectoriesAll(params).then(({ data }) => {
          this.equipNameList = data
          resolve()
        })
      })
    },
    // 获取单条的设备名称
    fetchSingleData(id) {
      this.loading = true
      getDirectoriesFromId(id).then(({ data }) => {
        this.loading = false
        // this.equipNameList = [data]
        this.ruleForm.deviceCatalogueId = data.id
        this.deepRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
      })
    },
    //  获取所有人
    allPeople() {
      getCustodian().then(({ data }) => {
        this.allPeopleList = data
      })
    },
    // 保存-保存并且新增
    submit(type) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { storagePersonId } = this.ruleForm
          const params = {
            Loading: true,
            ...this.ruleForm,
            storagePersonName: codeChangeName(this.allPeopleList, storagePersonId, 'id')
          }
          delete params.orderNumber
          const { id } = this.$route.query
          if (id) {
            const { state } = this.equipNameList.find(item => item.id === this.ruleForm.deviceCatalogueId)
            if (state === '01') {
              this.normalAdd(type, params)
            } else {
              this.stopAdd(params)
            }
          } else {
            this.normalAdd(type, params)
          }
        } else {
          return false
        }
      })
    },
    // 未下架新增
    normalAdd(type, params) {
      if (this.dialogType === 'edit' && type === 'save') {
        const { id } = this.equipmentItem
        editEquipmentItem({ ...params, id }).then(() => {
          this.$message.success('修改成功')
          this.$emit('changeTabConent', 'equipment', 'default')
        })
      } else {
        addEquipment(params).then(() => {
          if (type === 'save') {
            this.$message.success('新增成功')
            this.equipType ? this.$router.go(-1) : this.$emit('changeTabConent', 'equipment', 'default')
          } else if (type === 'add') {
            this.$message.success('保存并新增成功')
            this.ruleFormKey += 1
            const { id } = this.$route.query
            if (id) {
              this.fetchSingleData(id)
              this.ruleForm = { ...this.deepRuleForm }
            } else {
              this.fromNameData = { ...this.deepFromNameData }
              this.ruleForm = { ...this.deepRuleForm }
            }
          }
        })
      }
    },
    // 已下架新增
    stopAdd(params) {
      if (this.dialogType === 'edit') {
        const { id } = this.equipmentItem
        editEquipmentItem({ ...params, id }).then(() => {
          this.$message.success('修改成功')
          this.$emit('changeTabConent', 'equipment', 'default')
        })
      } else {
        addStopEquipment(params).then(() => {
          this.$message.success('新增成功')
          this.$emit('changeTabConent', 'equipment', 'default')
        })
      }
    },
    // 设备清单-修改
    equipListEdit() {
      if (!this.equipType) {
        if (this.dialogType === 'details' || this.dialogType === 'edit') {
          this.getData(this.equipmentItem)
        }
      }
    },
    fetchEquipmentItem() {
      const { statisticId } = this.$route.query
      getEquipmentItem(statisticId).then(({ data }) => {
        const { deviceCatalogueId } = data
        this.getData(data)
        this.fetchSingleData(deviceCatalogueId)
      })
    },
    getData(data) {
      const { purchasePrice, storagePersonId, storageDate, serialNumber, remark, location, deviceStorageNumber, deviceStorageId, orderNumber, sellState } = data
      this.ruleForm = {
        ...this.ruleForm,
        purchasePrice,
        storagePersonId,
        storageDate,
        serialNumber,
        remark,
        location,
        deviceStorageNumber,
        deviceStorageId,
        orderNumber
      }
      this.fromNameData.state = sellState
    }
  }
}
</script>

<style lang="less" scoped>
.add-equipment-padding {
  padding: 10px;
}
.add-equipment {
  .info-form {
    display: flex;
    flex-wrap: wrap;
    & > .el-form-item {
      width: 50%;
    }
    .el-select, .el-date-editor.el-input {
      width: 100%;
    }
    .receipt {
      margin-left: 15px;
      position: absolute;
      top: 0px;
    }
  }
  .base-info-footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
