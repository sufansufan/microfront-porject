<template>
  <div class="add-warehous">
    <div v-if="type==='details'" class="back">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="info-form">
      <el-form-item label="入库单号">
        <el-input v-model.trim="ruleForm.storageNumber" disabled />
      </el-form-item>
      <el-form-item label="入库人" style="width: 66.66%">
        <el-input v-model.trim="ruleForm.storagePersonName" disabled />
      </el-form-item>
      <el-form-item label="入库说明" class="in-remark row-label" prop="remark">
        <el-input v-model.trim="ruleForm.remark" :maxlength="255" type="textarea" :rows="3" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="入库明细" class="add-table">
        <div class="add-can">
          <el-button v-if="!disabled" type="primary" :disabled="disabled" @click="addIndex()">添加行</el-button>
          <div />
          <div>采购总金额：<span>{{ warehousMoney ? warehousMoney.toLocaleString() : 0 }}</span></div>
        </div>
        <div>
          <el-table ref="tableRef" :data="tableData" row-key="id" border max-height="calc(100vh - 350px)">
            <el-table-column type="index" label="序号" width="50" align="center" />
            <el-table-column align="center">
              <template slot="header">
                <span class="star">*</span>
                <span>设备名称</span>
              </template>
              <template slot-scope="{row, $index}">
                <el-input v-if="$route.query.type === 'details'" v-model="row.deviceName" placeholder="请选择设备名称" :disabled="disabled" />
                <el-select v-else v-model="row.deviceCatalogueId" placeholder="请选择设备名称" filterable :disabled="disabled" @change="equipmentChange($index, $event)">
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
            <el-table-column label="品牌" align="center" :show-overflow-tooltip="true" width="150">
              <template slot-scope="{row}">
                <span class="one-ellipsis">{{ row.brand }}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格型号" align="center" :show-overflow-tooltip="true" width="150">
              <template slot-scope="{row}">
                <span class="one-ellipsis">{{ row.specifications }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" align="center">
              <template slot-scope="{row}">
                <el-select v-model="row.unit" placeholder="请选择单位" disabled>
                  <el-option v-for="item in constant.deviceUnit" :key="item.code" :label="item.name" :value="item.code" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" width="400">
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
                <el-input v-model.trim="row.purchasePrice" placeholder="请输入采购价格" :maxlength="10" :disabled="disabled" @blur="purchasePriceBlur(row.purchasePrice)" />
              </template>
            </el-table-column>
            <el-table-column label="存放位置" align="center">
              <template slot-scope="{row}">
                <el-input v-model.trim="row.location" placeholder="请输入存放位置" :disabled="disabled" />
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center">
              <template slot-scope="{row}">
                <el-input v-model.trim="row.remark" :maxlength="255" placeholder="请输入备注" :disabled="disabled" />
              </template>
            </el-table-column>
            <el-table-column v-if="!disabled" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="danger" :disabled="disabled" @click="deleteIndex(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
    </el-form>
    <div v-if="type==='add'" class="base-info-footer">
      <el-button type="primary" @click="submit">确认入库</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import { queryDirectoriesAll, addLibrary, getLibraryInfo } from '@core/api/platformEquipmentManage/devicemanager'
import { validateSerial, validatePositive, validateLength } from '@core/utils/validate'
import { getNumberCode } from '@core/utils'
import { getSessionStorage } from '@core/utils/auth'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      disabled: false,
      ruleForm: {
        storageNumber: '',
        storagePersonName: '',
        remark: ''
      },
      tableData: [],
      type: this.$route.query.type,
      equipNameList: [],
      tableItem: {},
      rules: {
        remark: [validateLength(0, 255)]
      }
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
  created() {
    this.$store.dispatch('getConstant', ['deviceType', 'deviceUnit'])
    const { type, id } = this.$route.query
    if (type === 'details') {
      this.disabled = true
      this.fetchLibraryInfo(id)
    } else if (type === 'add') {
      this.ruleForm.storageNumber = getNumberCode()
    }
    this.ruleForm.storagePersonName = getSessionStorage('userName')
    this.fetchDirectoriesAll()
  },

  methods: {
    // 获取全部的设备名称
    fetchDirectoriesAll() {
      queryDirectoriesAll({ state: '01' }).then(({ data }) => {
        this.equipNameList = data
      })
    },
    deleteIndex(index) {
      if (this.tableData.length === 1) {
        this.$message.warning('至少保留一条数据')
        return
      }
      this.tableData.splice(index, 1)
    },
    addIndex() {
      const row = {
        deviceCatalogueId: '',
        deviceType: '',
        brand: '',
        specifications: '',
        unit: '',
        serialNumber: '',
        purchasePrice: '',
        location: '',
        remark: ''
      }
      this.tableItem = JSON.parse(JSON.stringify(row))
      this.tableData.push(row)
    },
    // 设备名称发生改变
    equipmentChange(index, val) {
      const { deviceType, brand, specifications, unit } = this.equipNameList.find(item => item.id === val)
      const { deviceCatalogueId } = this.tableData[index]
      const row = {
        ...this.tableItemm,
        deviceCatalogueId,
        deviceType,
        brand,
        specifications,
        unit
      }
      this.$set(this.tableData, index, row)
    },
    // 设备序列号失去焦点
    serialNumberBlur(val) {
      if (!validateSerial(val) && val) {
        this.$message.warning('请输入正确的设备序列号,用逗号中间不能为空,结尾不能有逗号')
      }
    },
    // 采购价格
    purchasePriceBlur(val) {
      if (!validatePositive(val) && val) {
        this.$message.warning('请输入任意正数,正小数(小数位不超过2位)')
      }
    },
    // 确认入库
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var tableList = []
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].deviceCatalogueId) {
              if (!this.tableData[i].serialNumber) {
                this.$message.warning(`请输入${i + 1}项设备序列号`)
                return
              }
              if (!Number(this.tableData[i].purchasePrice) && !validatePositive(this.tableData[i].purchasePrice)) {
                this.$message.warning(`请输入${i + 1}项采购价格为任意正数,正小数(小数位不超过2位)`)
                return
              }
              tableList.push(this.tableData[i])
            }
          }
          const params = {
            Loading: true,
            ...this.ruleForm,
            list: tableList
          }
          delete params.storagePersonName
          addLibrary(params).then(() => {
            this.$message.success('新增成功')
            this.$router.go(-1)
          })
        } else {
          return false
        }
      })
    },
    fetchLibraryInfo(id) {
      getLibraryInfo(id).then(({ data }) => {
        const { storageNumber, remark, list } = data
        this.ruleForm.storageNumber = storageNumber
        this.ruleForm.remark = remark
        this.tableData = list
      })
    }

  }
}
</script>

<style lang="less" scoped>
.add-warehous {
  padding:10px;
  .back{
    margin-bottom:10px;
  }
  .info-form {
    display: flex;
    flex-wrap: wrap;
    & > .el-form-item {
      width: 33.33%;
      &.in-remark{
        width:100%;
      }
      &.add-table{
        width:100%;
        .star{
          color: #F56C6C;
        }
        .add-can{
          margin-bottom: 10px;
          display:flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

  }
  .base-info-footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
<style lang="less">
.add-warehous {
  .el-table__body-wrapper {
    max-height: calc(100vh - 400px);
  }
}
</style>
