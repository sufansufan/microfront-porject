<template>
  <div class="distributor-manage">
    <div class="search">
      <div class="select">
        <div>
          <span>企业编号</span>
          <div>
            <el-input v-model="search.companyNumber" placeholder="请输入企业编号" clearable />
          </div>
        </div>
        <div>
          <span>企业名称</span>
          <div>
            <el-input v-model="search.companyName" placeholder="请输入企业名称" clearable />
          </div>
        </div>
        <div>
          <span>联系人</span>
          <div>
            <el-input v-model="search.contactPerson" placeholder="请输入联系人" clearable />
          </div>
        </div>
        <div>
          <span>手机号</span>
          <div>
            <el-input v-model="search.contactPersontelephone" placeholder="请输入联系人" clearable />
          </div>
        </div>
        <div class="query">
          <div>
            <el-button v-power="'distributor:query'" type="primary" icon="el-icon-search" @click="fetchData('query')">查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button v-power="'distributor:add'" type="primary" @click="dialogStatus('add')"><i class="iconfont icon-xinzeng1-copy" />新增</el-button>
            <el-button v-power="'distributor:edit'" type="primary" @click="dialogStatus('edit')">修改</el-button>
            <el-button v-power="'distributor:delete'" type="primary" @click="deleteRow">删除</el-button>
          </el-button-group>
        </div>
        <!-- <div>
          <el-button type="primary" @click="phoneClick">设置注册提醒手机号</el-button>
        </div> -->
        <div>
          <el-button v-power="'distributor:divideArea'" type="primary" @click="areaClick">划分区域</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-table ref="tableRef" v-loading="loading" :data="tableData" row-key="id" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="companyNumber" label="企业编号" align="center" />
        <el-table-column prop="companyName" label="企业名称" align="center" />
        <el-table-column prop="contactPerson" label="联系人" align="center" />
        <el-table-column prop="contactPersontelephone" label="手机号码" align="center" />
        <el-table-column prop="companyAddressName" label="所在地" align="center" />
        <el-table-column prop="divideArea" label="划分区域" align="center" width="400" />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-show="count"
        :page-sizes="pageSizes"
        :page-size="size"
        :total="count"
        :current-page="page"
        :layout="pageLayout"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <drag-dialog ref="dialog" title="新增渠道商" width="50%">
      <el-form ref="ruleForm" :key="key" :model="ruleForm" :rules="rules" class="distributor-form" label-width="110px">
        <el-form-item label="企业编号" prop="companyNumber">
          <el-input v-model="ruleForm.companyNumber" placeholder="请输入企业编号" clearable :disabled="disabled" />
        </el-form-item>
        <el-form-item label="企业名称" prop="companyName">
          <el-input v-model="ruleForm.companyName" placeholder="请输入企业名称" clearable :disabled="disabled" />
        </el-form-item>
        <el-form-item label="级别">
          <el-select v-model="ruleForm.level" placeholder="请选择" clearable :disabled="disabled">
            <el-option
              v-for="item in constant.company"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="统一信用代码" prop="creditCode">
          <el-input v-model="ruleForm.creditCode" placeholder="请输入统一信用代码" clearable :disabled="disabled" />
        </el-form-item>
        <el-form-item label="法定代表人" prop="legalPersonName">
          <el-input v-model="ruleForm.legalPersonName" placeholder="请输入法定代表人" clearable :disabled="disabled" />
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="ruleForm.telephone" placeholder="请输入电话" clearable :disabled="disabled" />
        </el-form-item>
        <el-form-item label="负责人" prop="contactPerson">
          <el-input v-model="ruleForm.contactPerson" placeholder="请输入联系人" clearable :disabled="disabled" />
        </el-form-item>
        <el-form-item label="电话" prop="contactPersontelephone">
          <el-input v-model="ruleForm.contactPersontelephone" placeholder="请输入联系人电话" clearable :disabled="disabled" />
        </el-form-item>
        <el-form-item label="所在地" prop="companyAddress">
          <el-cascader
            ref="cascader"
            v-model="ruleForm.companyAddress"
            placeholder="请选择所在地"
            clearable
            :disabled="disabled"
            :options="constant.nativePlace"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children', checkStrictly: true, }"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="detailedAddress">
          <el-input v-model="ruleForm.detailedAddress" placeholder="请输入详细地址" clearable :disabled="disabled" />
        </el-form-item>
        <el-form-item label="备注" class="full-width">
          <el-input v-model="ruleForm.remark" type="textarea" :rows="3" :disabled="disabled" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </drag-dialog>
    <drag-dialog ref="areaDialog" title="区域划分窗口" width="40%">
      <regional-division ref="regionalArea" :area-data="areaData" :no-parent="true" :tree-props="treeProps" @save="saveArea" />
    </drag-dialog>
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import DragDialog from '@frames/dashboard/components/Dialog'
import RegionalDivision from '@frames/dashboard/components/RegionalDivision'
import { getDistributorList, upDateDistributor, addDistributor, deleteDistributor, getDistributorArea } from '@core/api/operationManage/platformCompany'
import { validatePhone } from '@core/utils/validate'
import { mapGetters } from 'vuex'
import { saveBatch } from '@core/api/operationManage/companyMarketingArea'
export default {
  name: 'DistributorManage',
  components: {
    DragDialog,
    RegionalDivision
  },
  mixins: [pagination, table],
  data() {
    var validPhone = (rule, value, callback) => {
      if (!validatePhone(value)) {
        callback(new Error('请输入正确的电话'))
      } else {
        callback()
      }
    }
    return {
      disabled: false,
      search: {
        companyNumber: '',
        companyName: '',
        contactPerson: '',
        contactPersontelephone: ''
      },
      loading: true,
      count: 0,
      tableData: [],
      ruleFormPhone: {
        telphone: ''
      },
      areaData: {},
      ruleForm: {
        id: '',
        companyNumber: '',
        companyName: '',
        level: '',
        creditCode: '',
        legalPersonName: '',
        telephone: '',
        contactPerson: '',
        contactPersontelephone: '',
        companyAddress: '',
        companyAddressName: '',
        detailedAddress: '',
        remark: ''
      },
      rules: {
        companyNumber: [{ required: true, message: '请输入企业编号', trigger: 'blur' }],
        companyName: [{ required: true, message: '请输入企业编号', trigger: 'blur' }],
        creditCode: [{ required: true, message: '请输入统一信用代码', trigger: 'blur' }],
        legalPersonName: [{ required: true, message: '请输入法定代表人', trigger: 'blur' }],
        telephone: [{ required: true, validator: validPhone, trigger: 'blur' }],
        contactPerson: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        contactPersontelephone: [{ required: true, validator: validPhone, trigger: 'blur' }],
        companyAddress: [{ required: true, message: '请选择所在地', trigger: 'change' }],
        detailedAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
      },
      treeProps: {
        children: 'child',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    'ruleForm.companyAddress'() {
      if (this.$refs.cascader) {
        const { presentText } = this.$refs.cascader
        this.ruleForm.companyAddressName = presentText.replace(/\//g, '-')
      }
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['nativePlace', 'company'])
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      this.loading = true
      if (typeof sortData === 'string') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      // if (type === 'query') {
      //   this.size = 10
      //   this.page = 1
      // }
      const params = {
        size: this.size,
        page: this.page - 1,
        ...this.search,
        ascending: false,
        propertyName: 'createDate'
      }
      getDistributorList(params).then(({ data: { content, total }}) => {
        this.count = total
        this.loading = false
        this.tableData = content
      })
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { id, companyAddress } = this.ruleForm
          const params = {
            ...this.ruleForm,
            companyType: 'dealer',
            companyAddress: companyAddress.toString()
          }
          if (id) {
            upDateDistributor(params, id).then(() => {
              this.$message.success('修改成功')
              this.$refs.dialog.show = false
              this.fetchData('query')
            })
          } else {
            addDistributor(params).then(() => {
              this.$message.success('新增成功')
              this.$refs.dialog.show = false
              this.fetchData('query')
            })
          }
        } else {
          return false
        }
      })
    },
    dialogStatus(type) {
      if (type === 'add') {
        this.$refs.dialog.oTitle = '新增经销商'
        this.ruleForm = JSON.parse(JSON.stringify(this.deepRuleForm))
      }
      if (type === 'edit') {
        if (!this.onlyOneData()) return
        const { id, companyNumber, companyName, level, creditCode, legalPersonName, telephone, contactPerson, contactPersontelephone, companyAddress, detailedAddress, remark, companyAddressName } = this.multipleSelection[0]
        this.ruleForm = {
          id,
          companyNumber,
          companyName,
          level,
          creditCode,
          legalPersonName,
          telephone,
          contactPerson,
          contactPersontelephone,
          companyAddress: companyAddress.split(','),
          companyAddressName,
          detailedAddress,
          remark
        }
        this.$refs.dialog.oTitle = '修改经销商'
      }
      this.key += 1
      this.$refs.dialog.show = true
    },
    areaClick() {
      if (this.onlyOneData()) {
        this.$refs.areaDialog.show = true
        this.$nextTick(() => {
          this.getArea()
        })
      }
    },
    getArea() {
      const id = this.multipleSelection[0].id
      this.$refs.regionalArea.loading = true
      getDistributorArea(id).then(({ data }) => {
        this.areaData = data
        if (this.areaData.selectedAreaList !== null) {
          this.areaData.selectedAreaList.map(item => {
            item.disabledState = 1
            return item
          })
        }
        this.$refs.regionalArea.loading = false
      })
    },
    deleteRow() {
      if (this.onlyOneData()) {
        this.$confirm('此操作将删除选中数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDistributor(this.multipleSelection[0].id).then(res => {
            this.$message.success('删除成功!')
            this.fetchData('query')
          })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    },
    saveArea(ids) {
      const params = {
        companyId: this.multipleSelection[0].id,
        marketingAreaIds: ids
      }
      saveBatch(params).then(() => {
        this.$message.success('保存成功')
        this.$refs.areaDialog.show = false
        this.fetchData('query')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.distributor-manage {
  width: calc(100% - 20px);
  height: calc(100vh - 140px);
  overflow-y: auto;
  padding: 10px;
  .distributor-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item {
      width: calc(50% - 5px);
    }
    .el-input, .el-select {
      width: 100%;
    }
    .full-width {
      width: 100%;
    }
  }
}
</style>
