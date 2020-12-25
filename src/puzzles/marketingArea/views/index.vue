<template>
  <div class="marketing-area">
    <split-pane :min-percent="13" :default-percent="13" split="vertical">
      <template slot="paneL">
        <div v-loading="treeLoading" class="left">
          <el-tree :data="treeData" node-key="id" :props="defaultProps" :highlight-current="true" default-expand-all @node-click="handleNodeClick" />
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <div class="search">
            <div class="select">
              <div>
                <span>名称</span>
                <el-input v-model.trim="search.name" placeholder="请输入名称" clearable />
              </div>
              <div>
                <span>区域级别</span>
                <el-select v-model="search.type" placeholder="请选择区域级别" clearable>
                  <el-option
                    v-for="item in constant.OsAreaLevel"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </div>
              <div>
                <span>负责人</span>
                <el-input v-model.trim="search.chargePersonName" placeholder="请输入负责人" clearable />
              </div>
              <div>
                <div>
                  <el-button v-power="'marketingArea:query'" type="primary" icon="el-icon-search" @click="fetchData('query')">查询</el-button>
                </div>
              </div>
            </div>
            <div class="btn">
              <div>
                <el-button-group>
                  <el-button v-power="'marketingArea:add'" type="primary" @click="dialogStatus('add')"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
                  <el-button v-power="'marketingArea:edit'" type="primary" @click="dialogStatus('edit')"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
                  <el-button v-power="'marketingArea:delete'" type="primary" @click="deleteRow"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
                </el-button-group>
              </div>
            </div>
          </div>
          <div>
            <el-table ref="tableRef" v-loading="loading" :data="tableData" row-key="id" border @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="40" />
              <el-table-column type="index" label="序号" width="50" align="center" />
              <el-table-column prop="name" label="名称" align="center" />
              <el-table-column prop="typeName" label="区域级别" align="center" />
              <el-table-column prop="chargePersonName" label="负责人" align="center" />
              <el-table-column prop="telphone" label="联系电话" align="center" />
              <el-table-column prop="belongOrgName" label="所属部门/企业" align="center" />
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
        </div>
      </template>
    </split-pane>
    <drag-dialog ref="dialog" width="50%">
      <el-form ref="ruleForm" :key="key" :model="ruleForm" :rules="rules" class="marketing-form" label-width="117px">
        <el-form-item label="区域级别" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择" clearable @change="typeChange">
            <el-option
              v-for="item in constant.OsAreaLevel"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="ruleForm.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item
          v-if="ruleForm.type === '02'"
          label="行政区域"
          :rules="[
            { required: ruleForm.type === '02', message: '行政区域不能为空', trigger: 'change'},
          ]"
        >
          <el-cascader
            v-model="ruleForm.region"
            placeholder="请选择行政区域"
            clearable
            :disabled="disabled"
            :options="constant.nativePlace"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children', checkStrictly: true }"
            style="width: 100%"
            @change="regionChange"
          />
        </el-form-item>
        <div v-if="ruleForm.type === '02'" class="filter">
          <div style="width: 117px">
            <div>
              <el-checkbox v-model="ruleForm.isSetFilter" :disabled="settingOption > 2">设置删选条件</el-checkbox>
            </div>
          </div>
          <div>
            <el-select v-model="ruleForm.filterType" placeholder="请选择" clearable style="width: 50%; margin-right: 5px" :disabled="!ruleForm.isSetFilter">
              <el-option
                v-for="item in constant.OsRegionFilterType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
            <el-select v-model="ruleForm.filterValue" placeholder="请选择" clearable :disabled="!ruleForm.isSetFilter" multiple>
              <el-option
                v-for="item in cityFilter"
                :key="item.id"
                :label="item.zh"
                :value="item.id"
              />
            </el-select>
          </div>
        </div>
        <el-form-item :label="ruleForm.type === '02' ? '所属企业': '所属部门'">
          <el-cascader
            v-model="ruleForm.belongOrgId"
            placeholder="请选择所属部门"
            clearable
            :disabled="disabled"
            :options="departmentList"
            :props="departmentProp "
            style="width: 100%"
            @change="departChange"
          />
        </el-form-item>
        <el-form-item label="上级" prop="parentName">
          <el-input v-model="ruleForm.parentName" placeholder="请输入上级" disabled />
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-if="ruleForm.type === '02'" v-model="ruleForm.chargePersonName" placeholder="请输入公司大区负责人" disabled />
          <el-select v-else v-model="ruleForm.chargePersonId" placeholder="请选择公司大区负责人" clearable :disabled="ruleForm.type === '02'" @change="changePerson">
            <el-option
              v-for="item in personList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>

        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="ruleForm.telphone" placeholder="请输入电话" disabled />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import { getMarketList, getTableList, tableSave, tableUpdate, tableDelete } from '@core/api/operationManage/marketingArea'
import { mapGetters } from 'vuex'
import { getOrgTree } from '@core/api/organization'
import { getPersonnelsByOrgId } from '@core/api/personnel'
import { booleanChangeString, queryParent } from '@core/utils'
import { getCity } from '@core/api/city'
import { codeChangeName } from '@core/utils'
import { geteCompanyNotPage } from '@core/api/operationManage/company'
export default {
  components: {
    DragDialog
  },
  mixins: [table, pagination],
  data() {
    return {
      count: 0,
      disabled: false,
      search: {
        name: '',
        parentId: '',
        chargePersonName: '',
        type: ''
      },
      treeLoading: true,
      loading: true,
      treeData: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      departmentProp: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'orgName',
        children: 'children',
        checkStrictly: true
      },
      tableData: [],
      ruleForm: {
        type: '',
        name: '',
        region: '',
        belongOrgId: [],
        parentId: '',
        parentName: '',
        chargePersonName: '',
        chargePersonId: '',
        telphone: '',
        isSetFilter: false,
        filterType: '',
        filterValue: '',
        id: ''
      },
      rules: {
        type: [{ required: true, message: '请选择区域类型', trigger: 'change' }],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        parentName: [{ required: true, message: '请输入上级', trigger: 'change' }]
      },
      departmentList: [],
      cityFilter: [],
      personList: [],
      areaType: '',
      dialogStatusType: null
    }
  },
  computed: {
    ...mapGetters(['constant']),
    settingOption() {
      if (this.ruleForm.region) {
        return this.ruleForm.region.length
      } else {
        return 0
      }
    }
  },
  watch: {
    'ruleForm.belongOrgId'(newV) {
      if (newV.length) {
        const { type } = this.ruleForm
        if (type === '01') {
          getPersonnelsByOrgId(newV[newV.length - 1]).then(({ data }) => {
            this.personList = data
            if (this.dialogStatusType !== 'edit') {
              this.getDepartmentRow(this.departmentList, newV[newV.length - 1])
            }
          })
        } else {
          this.departmentList.forEach(item => {
            if (item.id === newV[0]) {
              this.ruleForm.chargePersonId = ''
              this.ruleForm.chargePersonName = item.contactPerson
              this.ruleForm.telphone = item.contactPersontelephone
              this.ruleForm.belongOrgName = item.companyName
            }
          })
        }
      } else {
        this.ruleForm.chargePersonId = ''
        this.ruleForm.chargePersonName = ''
        this.ruleForm.telphone = ''
      }
    },
    'ruleForm.type'() {
      this.getDepartment()
    },
    'ruleForm.region'() {
      this.ruleForm.isSetFilter = false
      this.ruleForm.filterType = ''
      this.ruleForm.filterValue = []
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['nativePlace', 'OsRegionFilterType', 'OsAreaLevel'])
    this.getTreeAddTable()
  },
  methods: {
    typeChange() {
      this.ruleForm.chargePersonId = ''
      this.ruleForm.chargePersonName = ''
      this.ruleForm.telphone = ''
      this.ruleForm.belongOrgId = []
      this.ruleForm.region = []
    },
    fetchData(type) {
      this.loading = true
      if (typeof sortData === 'string') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      // if (type === 'query') {
      //   this.page = 1
      //   this.size = 10
      // }
      const params = {
        page: this.page - 1,
        size: this.size,
        ...this.search
      }
      getTableList(params).then(({ data: { content, total }}) => {
        this.count = total
        this.tableData = content
        this.tableData.map(item => {
          item.typeName = codeChangeName(this.constant.OsAreaLevel, item.type)
          return item
        })
        this.loading = false
      })
    },
    handleNodeClick(e) {
      this.ruleForm.parentId = e.id
      this.ruleForm.parentName = e.name
      this.search.parentId = e.id
      this.areaType = e.type
      this.fetchData('query')
    },
    dialogStatus(type) {
      this.dialogStatusType = type
      if (type === 'add') {
        if (!this.ruleForm.parentId) {
          this.$message.warning('请选择区域')
          return
        }
        if (this.areaType === '02') {
          this.$message.warning('省级不可新增')
          return
        }
        this.$refs.dialog.oTitle = '新建区域信息'
        this.$refs.dialog.show = true
        const parentId = this.ruleForm.parentId
        const parentName = this.ruleForm.parentName
        this.ruleForm = {
          ...this.deepRuleForm,
          parentId,
          parentName
        }
      }
      if (type === 'edit') {
        if (this.onlyOneData()) {
          const { type, name, region, belongOrgId, isSetFilter, filterType, filterValue, telphone, parentId, parentName, chargePersonName, chargePersonId, id } = this.multipleSelection[0]
          this.regionChange(region.split(','))
          this.ruleForm = {
            type,
            name,
            region: region.split(','),
            belongOrgId: belongOrgId === null ? [] : belongOrgId.length === 1 ? [belongOrgId] : belongOrgId.split(','),
            parentId,
            parentName,
            chargePersonName,
            chargePersonId,
            telphone,
            isSetFilter: isSetFilter === 1,
            filterType,
            filterValue: filterValue.split(','),
            id
          }
          if (type === '01') {
            this.ruleForm.belongOrgId = queryParent(this.departmentList, belongOrgId, 'id', 'children')
          }
          this.$refs.dialog.show = true
          this.$refs.dialog.oTitle = '修改区域信息'
        }
      }
      this.key += 1
    },
    getTree() {
      this.treeLoading = true
      getMarketList({}).then(({ data }) => {
        this.treeData = data
        this.treeLoading = false
      })
    },
    getDepartment() {
      const { type } = this.ruleForm
      if (type === '01') {
        this.departmentProp = {
          ...this.departmentProp,
          label: 'orgName'
        }
        getOrgTree({}).then(({ data }) => {
          this.departmentList = data
        })
      } else if (type === '02') {
        this.departmentProp = {
          ...this.departmentProp,
          label: 'companyName'
        }
        geteCompanyNotPage({ companyType: 'dealer' }).then(({ data }) => {
          this.departmentList = data
        })
      }
    },
    departChange(e) {
      if (this.dialogStatusType === 'edit') {
        this.getDepartmentRow(this.departmentList, e[e.length - 1])
      }
    },
    getDepartmentRow(list, id) {
      if (list === undefined) return
      return list.filter(item => {
        if (item.id === id) {
          this.ruleForm.chargePersonId = item.chargePersonId
          this.ruleForm.chargePersonName = item.chargePersonName
          this.ruleForm.telphone = codeChangeName(this.personList, item.chargePersonId, 'id', 'telephone')
          this.ruleForm.belongOrgName = item.orgName
        } else {
          if (item.children !== null) {
            this.getDepartmentRow(item.children, id)
          }
        }
      })
    },
    regionChange(e) {
      if (e.length && e.length < 3) {
        const id = e[e.length - 1]
        getCity({ baseIds: id }).then(({ data }) => {
          this.cityFilter = data[0].children || []
        })
      }
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { belongOrgId, filterValue, region, id, parentId, type } = this.ruleForm
          const params = {
            Loading: true,
            ...this.ruleForm,
            belongOrgId: belongOrgId[belongOrgId.length - 1],
            filterValue: filterValue.toString(),
            region: region.toString()
          }
          delete params.id
          if (parentId === 'china') {
            if (type !== '01') {
              this.$message.warning('不可建立省级数据')
              return
            }
          } else {
            if (type !== '02') {
              this.$message.warning('不可建立大区数据')
              return
            }
          }
          if (id) {
            tableUpdate(booleanChangeString(params), id).then(() => {
              this.$message.success('修改成功')
              this.getTreeAddTable()
              this.$refs.dialog.show = false
              this.ruleForm = JSON.parse(JSON.stringify(this.deepRuleForm))
            })
          } else {
            tableSave(booleanChangeString(params)).then(() => {
              this.$message.success('新增成功')
              this.getTreeAddTable()
              this.$refs.dialog.show = false
              this.ruleForm = JSON.parse(JSON.stringify(this.deepRuleForm))
            })
          }
        } else {
          return false
        }
      })
    },
    getTreeAddTable(type) {
      this.search.parentId = ''
      this.getTree()
      this.fetchData(type)
    },
    deleteRow() {
      if (this.onlyOneData()) {
        this.$confirm('此操作将删除选中数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          tableDelete(this.multipleSelection[0].id).then(res => {
            this.$message.success('删除成功!')
            this.getTreeAddTable('query')
          })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    },
    changePerson(e) {
      const row = this.personList.filter(item => item.id === e)[0]
      this.ruleForm.telphone = row.telephone
      this.ruleForm.chargePersonName = row.name
    }
  }
}
</script>

<style lang="less" scoped>
.marketing-area {
  width: 100%;
  height: calc(100vh - 140px);
  padding: 10px;
  overflow-y: auto;
  .left {
    height: 100%;
    // width: 100%;
    background: #eee;
    margin-right: 10px;
  }
  .right {
    padding: 0px 10px;
    height: 100%;
    padding-right: 10px;
  }
  .el-tree {
    background: #eee;
    color: #333;
  }
  .marketing-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item {
      width: calc(50% - 5px);
    }
    .el-input, .el-select {
      width: 100%;
    }
    .filter {
      width: calc(50% - 5px);
      display: flex;
      & > .el-checkbox {
        width: 117px;
      }
      & > div {
        display: flex;
        width: calc(100% - 117px);
        justify-content: space-between;
      }
    }
  }
}
</style>
