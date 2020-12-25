<template>
  <div class="sale-manage">
    <split-pane :min-percent="13" :default-percent="13" split="vertical">
      <template slot="paneL">
        <div class="left">
          <el-tree :data="treeData" node-key="id" default-expand-all :props="defaultProps" :highlight-current="true" @node-click="handleNodeClick" />
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <div class="search">
            <div class="select">
              <div>
                <span>小组名</span>
                <div>
                  <el-input v-model.trim="search.name" placeholder="请输入名称" clearable />
                </div>
              </div>
              <div>
                <span>负责人</span>
                <div>
                  <el-input v-model.trim="search.chargePersonName" placeholder="请输入负责人" clearable />
                </div>
              </div>
              <div class="query">
                <div v-power="'sale:query'">
                  <el-button type="primary" icon="el-icon-search" @click="fetchData('query')">查询</el-button>
                </div>
              </div>
            </div>
            <div class="btn">
              <div>
                <el-button-group>
                  <el-button v-power="'sale:add'" type="primary" @click="dialogStatus('add')"><i class="iconfont icon-xinzeng1-copy" />新增</el-button>
                  <el-button v-power="'sale:edit'" type="primary" @click="dialogStatus('edit')"><i class="iconfont icon-xiugai-copy" />  修改</el-button>
                  <el-button v-power="'sale:delete'" type="primary" @click="deleteRow"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
                </el-button-group>
              </div>
              <div v-power="'sale:distribute'">
                <el-button type="primary" @click="personStatus">分配人员</el-button>
              </div>
              <div v-power="'sale:divideArea'">
                <el-button type="primary" @click="areaClick">划分区域</el-button>
              </div>
            </div>
          </div>
          <div>
            <el-table ref="tableRef" v-loading="loading" :data="tableData" row-key="id" border @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="40" />
              <el-table-column type="index" label="序号" width="50" align="center" />
              <el-table-column prop="code" label="编号" header-align="center" />
              <el-table-column prop="name" label="小组名" align="center" />
              <el-table-column prop="chargePersonName" label="负责人" align="center" />
              <el-table-column prop="parentName" label="上级组" align="center" />
              <el-table-column prop="salePersonNames" label="人员" align="center" width="300" />
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
        </div>
      </template>
    </split-pane>
    <drag-dialog ref="dialog" width="40%">
      <el-form ref="ruleForm" :key="key" :model="ruleForm" :rules="rules" class="sale-form" label-width="80px">
        <el-form-item label="编号" prop="code">
          <el-input v-model="ruleForm.code" placeholder="请输入编号" />
        </el-form-item>
        <el-form-item label="团队名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入团队名称" />
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="ruleForm.chargePersonId" placeholder="请选择负责人" clearable>
            <el-option
              v-for="item in personnelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上级" prop="parentId">
          <el-cascader
            v-model="ruleForm.parentId"
            placeholder="请选择上级"
            clearable
            :options="treeData"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'child', checkStrictly: true }"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </drag-dialog>
    <drag-dialog ref="areaDialog" title="区域划分窗口" width="40%">
      <regional-division ref="regionalArea" :area-data="areaData" :tree-props="treeProps" @save="saveArea" />
    </drag-dialog>
    <drag-dialog ref="personnelDialog" title="分配人员" width="40%">
      <el-form ref="ruleFormPersonnel" :key="key" :model="ruleFormPersonnel" :rules="rules" label-width="70px">
        <el-form-item label="选择人员" prop="personnel">
          <el-select v-model="ruleFormPersonnel.personnel" filterable placeholder="请选择选择人员" clearable style="width: 100%" multiple>
            <el-option
              v-for="item in personnelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="personSubmit">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import DragDialog from '@frames/dashboard/components/Dialog'
import RegionalDivision from '@frames/dashboard/components/RegionalDivision'
import { getsalesTree, tableList, saveData, updateData, deleteData, queryDivideArea, assignPerson } from '@core/api/operationManage/salesTeam'
import { getPersonnelsByOrgId } from '@core/api/personnel'
import { codeChangeName } from '@core/utils'
import { saveBatch } from '@core/api/operationManage/salesTeamMarketingArea'

export default {
  components: {
    DragDialog,
    RegionalDivision
  },
  mixins: [pagination, table],
  data() {
    return {
      count: 0,
      treeData: [],
      tableData: [],
      search: {
        name: '',
        chargePersonName: '',
        parentId: ''
      },
      ruleForm: {
        code: '',
        name: '',
        chargePersonId: '',
        chargePersonName: '',
        parentId: [],
        id: ''
      },
      rules: {
        code: [{ required: true, message: '请输入编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入团队名称', trigger: 'blur' }],
        parentId: [{ required: true, message: '请选择上级', trigger: 'change' }]
      },
      effectiveList: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      ruleFormPersonnel: {
        personnel: []
      },
      loading: true,
      personnelList: [],
      areaData: {},
      treeProps: {
        children: 'child',
        label: 'zh'
      }
    }
  },
  activated() {
    this.getAllData()
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      this.loading = true
      // if (type === 'query') {
      //   this.page = 1
      //   this.size = 10
      // }
      if (typeof sortData === 'string') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      const params = {
        page: this.page - 1,
        size: this.size,
        ...this.search
      }
      tableList(params).then(({ data: { content, total }}) => {
        this.tableData = content
        this.count = total
        this.loading = false
      })
    },
    handleNodeClick(e) {
      this.search.parentId = e.id
      this.fetchData('query')
    },
    dialogStatus(type) {
      this.ruleForm = JSON.parse(JSON.stringify(this.deepRuleForm))
      if (type === 'add') {
        this.$refs.dialog.oTitle = '新增销售团队'
      }
      if (type === 'edit') {
        if (!this.onlyOneData()) return
        this.$refs.dialog.oTitle = '修改销售团队'
        const { code, name, chargePersonId, chargePersonName, id, parentPath } = this.multipleSelection[0]
        this.ruleForm = {
          code, name, chargePersonId, chargePersonName, id, parentId: parentPath.split(',')
        }
      }
      this.key += 1
      this.$refs.dialog.show = true
    },
    areaClick() {
      if (this.onlyOneData()) {
        this.$refs.areaDialog.show = true
        this.$nextTick(() => {
          this.dividAreaData()
        })
      }
    },
    fetchTree() {
      getsalesTree({}).then(({ data }) => {
        this.treeData = data
        this.getPersonnel(data[0].id)
      })
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { id, parentId, chargePersonId } = this.ruleForm
          const params = {
            Loading: true,
            ...this.ruleForm,
            parentId: parentId[parentId.length - 1],
            chargePersonName: codeChangeName(this.personnelList, chargePersonId, 'id'),
            parentPath: parentId.toString()
          }
          delete params.id
          if (id) {
            updateData(params, id).then(() => {
              this.$message.success('修改成功')
              this.$refs.dialog.show = false
              this.getAllData()
            })
          } else {
            saveData(params).then(() => {
              this.$message.success('新增成功')
              this.$refs.dialog.show = false
              this.getAllData()
            })
          }
        } else {
          return false
        }
      })
    },
    personStatus() {
      if (this.onlyOneData()) {
        this.key += 1
        this.$refs.personnelDialog.show = true
      }
    },
    deleteRow() {
      if (this.onlyOneData()) {
        this.$confirm('此操作将删除选中数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteData(this.multipleSelection[0].id).then(res => {
            this.$message.success('删除成功')
            this.getAllData()
          })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    },
    dividAreaData() {
      const id = this.multipleSelection[0].id
      this.$refs.regionalArea.loading = true
      queryDivideArea(id).then(({ data }) => {
        this.areaData = data
        this.$refs.regionalArea.loading = false
      })
    },
    personSubmit() {
      const id = this.multipleSelection[0].id
      const chargePersonName = []
      this.ruleFormPersonnel.personnel.forEach(item => {
        this.personnelList.forEach(v => {
          if (item === v.id) {
            chargePersonName.push(v.name)
          }
        })
      })
      const params = {
        id,
        salePersonIds: this.ruleFormPersonnel.personnel.toString(),
        salePersonNames: chargePersonName.toString()
      }
      assignPerson(params).then(() => {
        this.$message.success('分配成功')
        this.$refs.personnelDialog.show = false
        this.fetchData('query')
      })
    },
    getPersonnel(id) {
      getPersonnelsByOrgId(id).then(({ data }) => {
        this.personnelList = data
      })
    },
    getAllData() {
      this.fetchTree()
      this.fetchData('query')
    },
    saveArea(ids) {
      const params = {
        salesTeamId: this.multipleSelection[0].id,
        marketingAreaIds: ids
      }
      saveBatch(params).then(() => {
        this.$refs.areaDialog.show = false
        this.fetchData('query')
        this.$message.success('保存成功')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sale-manage {
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
    width: calc(100% - 30px);
    height: 100%;
  }
  .el-tree {
    background: #eee;
    color: #333;
  }
   .sale-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item {
      width: calc(50% - 5px);
    }
    .el-input, .el-select {
      width: 100%;
    }
  }
}
</style>
