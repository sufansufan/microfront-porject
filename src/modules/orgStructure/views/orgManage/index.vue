<template>
  <div class="org-manage">
    <split-pane :min-percent="14" :default-percent="14" split="vertical" @resize="resize">
      <template slot="paneL">
        <div v-loading="treeLoading" class="left">
          <el-tree :data="treeData" node-key="id" :props="defaultProps" :highlight-current="true" @node-click="handleNodeClick" />
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <div class="search">
            <div class="select">
              <div>
                <span style="width: 84px">组织编号</span>
                <div>
                  <el-input v-model="search.orgNumber" placeholder="请输入组织编号" style="width: 214px" clearable />
                </div>
              </div>
              <div>
                <span>组织名称</span>
                <div>
                  <el-input v-model="search.orgName" placeholder="请输入组织名称" style="width: 214px" clearable />
                </div>
              </div>
              <div>
                <span>组织类别</span>
                <div>
                  <el-select v-model="search.orgType" placeholder="请选择组织类别" clearable>
                    <el-option
                      v-for="item in constant.orgType"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </div>
              </div>
              <div>
                <span>上级组织</span>
                <div>
                  <el-select v-model="search.parentId" placeholder="请选择上级组织" style="width: 230px" clearable>
                    <el-option
                      v-for="item in constant.levelOrganization"
                      :key="item.id"
                      :label="item.orgName"
                      :value="item.id"
                    />
                  </el-select>
                </div>
              </div>
              <div>
                <span>是否法人单位</span>
                <div>
                  <el-select v-model="search.isLegalEntity" placeholder="请选择是否法人单位" clearable>
                    <el-option
                      v-for="item in constant.isLegalEntity"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </div>
              </div>
              <div>
                <span>状态</span>
                <div>
                  <el-select v-model="search.state" placeholder="请选择状态" clearable>
                    <el-option
                      v-for="item in constant.organizationState"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </div>
              </div>
              <div>
                <span>负责人</span>
                <div>
                  <el-input v-model="value" placeholder="请输入负责人" style="width: 214px" clearable />
                </div>
              </div>
              <div>
                <span>成立日期</span>
                <div>
                  <el-date-picker
                    v-model="search.establishmentDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width: 230px"
                    clearable
                  />
                </div>
              </div>
              <div>
                <el-button icon="el-icon-search" type="primary" @click="fetchData">查询</el-button>
              </div>
            </div>
            <div class="btn">
              <div>
                <el-button-group>
                  <el-button type="primary" @click="orgJump('add')">新增</el-button>
                  <el-button type="primary" @click="orgJump('edit')">修改</el-button>
                  <el-button type="primary" @click="deleteData()">删除</el-button>
                </el-button-group>
              </div>
              <div>
                <el-button-group>
                  <el-button type="primary" @click="assignLeader">指定负责人</el-button>
                  <el-button type="primary" @click="stopOrg">停用</el-button>
                  <el-button type="primary" @click="returnOrg">恢复</el-button>
                </el-button-group>
              </div>
              <div>
                <el-button-group>
                  <el-button type="primary" @click="orgJump('import')">导入</el-button>
                  <el-button type="primary">导出</el-button>
                </el-button-group>
              </div>
            </div>
          </div>
          <el-table ref="multipleTable" v-loading="loading" :data="tableData" row-key="id" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40" />
            <el-table-column type="index" width="50" label="序号" align="center" />
            <el-table-column label="组织名称" align="center">
              <template slot-scope="scope">
                <span class="table-click-color" @click="$router.push({name: 'organizationSee', query: {type:'see', id: scope.row.id}})">{{ scope.row.orgName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="simpleName" label="简称" align="center" />
            <el-table-column prop="chargePersonName" label="负责人" align="center" />
            <el-table-column prop="orgNumber" label="组织编号" align="center" />
            <el-table-column prop="orgType" label="组织类别" align="center" />
            <el-table-column prop="parentName" label="上级组织" align="center" />
            <el-table-column prop="sequenceNumber" label="顺序号" align="center" />
            <el-table-column prop="registeredPlace" label="注册地" align="center" />
            <el-table-column prop="establishmentDate" label="成立日期" align="center" />
            <el-table-column prop="telephone" label="联系电话" align="center" width="100" />
            <el-table-column prop="officeAddress" label="办公室地址" align="center" width="200" />
            <el-table-column prop="state" label="状态" align="center" />
          </el-table>
          <div class="pagination">
            <el-pagination
              v-show="count"
              :page-sizes="pageSizes"
              :page-size="limit"
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
    <drag-dialog ref="dialog" title="指定负责人" width="45%">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="category-form">
        <el-form-item label="负责人" prop="chargePersonName">
          <el-select v-model="ruleForm.chargePersonName" placeholder="请选择" clearable style="width: 100%" @change="currentSel">
            <el-option
              v-for="item in personnalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import DragDialog from '@frames/dashboard/components/Dialog'
import { getOrgTree, getOrgList, getAllPersonnel, assignOrg, delOrganization, stopOrg, returnOrg } from '@core/api/organization'
import { mapGetters } from 'vuex'
export default {
  name: 'OrgManag',
  components: {
    DragDialog
  },
  mixins: [pagination, table],
  data() {
    return {
      count: '',
      ruleForm: {
        chargePersonName: ''
      },
      rules: {
        chargePersonName: [{ required: true, message: '请选择负责人', trigger: 'change' }]
      },
      search: {
        id: '',
        orgNumber: '',
        orgName: '',
        orgType: '',
        parentId: '',
        isLegalEntity: '',
        state: '',
        establishmentDate: []
      },
      options: [],
      treeData: [],
      personnalList: [],
      defaultProps: {
        children: 'children',
        label: 'orgName'

      },
      tableData: [],
      loading: true,
      treeLoading: true
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['organizationState', 'isLegalEntity', 'levelOrganization', 'orgType'])
    this.getTree()
    this.fetchData()
  },
  methods: {
    orgJump(type) {
      switch (type) {
        case 'add':
          this.$router.push({ name: 'orgManageAdd', query: { type }})
          break
        case 'edit':
          if (this.multipleSelection.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.$router.push({ name: 'organizationEdit', query: { type, id: this.multipleSelection[0]['id'] }})
          break
        case 'import':
          this.$router.push({ name: 'importOrg' })
          break
        default:
          break
      }
    },
    getTree() {
      getOrgTree().then(({ data }) => {
        this.treeData = data
        this.treeLoading = false
      })
    },

    deleteData() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.$confirm('此操作将删除选中组织？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOrganization(this.multipleSelection[0]['id']).then(res => {
          this.$message.success('删除成功!')
          this.fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    stopOrg() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.$confirm('此操作将停用选中组织？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        stopOrg(this.multipleSelection[0]['id']).then(res => {
          this.$message.success('停用成功!')
          this.fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消停用')
      })
    },
    returnOrg() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.$confirm('此操作将恢复选中组织？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        returnOrg(this.multipleSelection[0]['id']).then(res => {
          this.$message.success('恢复成功!')
          this.fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消恢复')
      })
    },
    fetchData() {
      this.loading = true
      const { establishmentDate } = this.search
      const params = {
        size: this.size,
        page: this.page - 1,
        ...this.search,
        establishmentDate: {
          after: establishmentDate[0],
          before: establishmentDate[1]
        }
      }
      getOrgList(params).then(({ data: { total, content }}) => {
        this.loading = false
        this.tableData = content
        this.count = total
      })
    },
    assignLeader() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      } else {
        this.$refs.dialog.show = true
        getAllPersonnel(this.multipleSelection[0]['id']).then(res => {
          this.personnalList = res.data
        })
      }
    },
    currentSel(val) {
      console.log(val, '111')
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = {
            id: this.multipleSelection[0]['id'],
            chargePersonId: this.ruleForm.chargePersonName,
            chargePersonName: this.personnalList[0].name
          }
          delete params.dictionaryTypeName
          assignOrg(params).then(res => {
            this.$refs.dialog.show = false
            this.$message.success('指定成功')
            this.fetchData()
            this.ruleForm = { ...this.deepRuleForm }
          })
        } else {
          return
        }
      })
    },
    handleNodeClick(data) {
      this.nodeTreeData = data
      this.search.id = data.id
      this.fetchData()
    }
  }
}
</script>

<style lang="less" scoped>
.org-manage {
  padding: 10px 0px 10px 10px;
  height: calc(100vh - 140px);
  .left {
    margin-right: 10px;
    height: 100%;
    overflow-y: auto;
  }
  .right {
    margin-left: 10px;
    padding-right: 10px;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
