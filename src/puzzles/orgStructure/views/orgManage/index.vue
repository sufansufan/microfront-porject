<template>
  <div class="org-manage">
    <split-pane :min-percent="10" :default-percent="12" split="vertical">
      <template slot="paneL">
        <div v-loading="treeLoading" class="left">
          <el-tree :data="treeData" :expand-on-click-node="false" node-key="id" :default-expanded-keys="defaultExpandedKeys" :props="defaultProps" :highlight-current="highLight" @node-click="handleNodeClick">
            <span slot-scope="{ node }">
              <span>{{ node.label }}</span>
              <i v-if="node.label === '分公司' || node.label === '项目部' " class="iconfont icon-wenjianjia1" />
            </span>
          </el-tree>
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <div class="search">
            <div class="select">
              <div>
                <span style="width: 84px">组织编号</span>
                <div>
                  <el-input v-model.trim="search.orgNumber" placeholder="请输入组织编号" clearable @keyup.enter.native="keyupSearch" />
                </div>
              </div>
              <div>
                <span>组织名称</span>
                <div>
                  <el-input v-model.trim="search.orgName" placeholder="请输入组织名称" clearable @keyup.enter.native="keyupSearch" />
                </div>
              </div>
              <div>
                <span>组织类别</span>
                <div>
                  <el-select v-model.trim="search.orgType" placeholder="请选择组织类别" clearable @keyup.enter.native="keyupSearch">
                    <el-option v-for="item in constant.orgType" :key="item.code" :label="item.name" :value="item.code" />
                  </el-select>
                </div>
              </div>
              <div>
                <span>上级组织</span>
                <div>
                  <el-select v-model.trim="search.parentId" placeholder="请选择上级组织" clearable @keyup.enter.native="keyupSearch">
                    <el-option v-for="item in constant.levelOrganization" :key="item.id" :label="item.orgName" :value="item.id" />
                  </el-select>
                </div>
              </div>
              <div>
                <span>是否法人单位</span>
                <div>
                  <el-select v-model.trim="search.isLegalEntity" placeholder="请选择是否法人单位" clearable @keyup.enter.native="keyupSearch">
                    <el-option v-for="item in constant.isLegalEntity" :key="item.code" :label="item.name" :value="item.code" />
                  </el-select>
                </div>
              </div>
              <div>
                <span>状态</span>
                <div>
                  <el-select v-model.trim="search.state" placeholder="请选择状态" clearable @keyup.enter.native="keyupSearch">
                    <el-option v-for="item in constant.organizationState" :key="item.code" :label="item.name" :value="item.code" />
                  </el-select>
                </div>
              </div>
              <div>
                <span>负责人</span>
                <div>
                  <el-input v-model.trim="search.chargePersonName" placeholder="请输入负责人" clearable @keyup.enter.native="keyupSearch" />
                </div>
              </div>
              <div>
                <span>成立日期</span>
                <div>
                  <el-date-picker
                    v-model.trim="search.establishmentDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    clearable
                    :picker-options="pickerOptions"
                    :default-time="defaultTime"
                    @keyup.enter.native="keyupSearch"
                  />
                </div>
              </div>
              <div class="query">
                <div>
                  <el-button icon="el-icon-search" type="primary" @click="fetchData('query')">查询</el-button>
                </div>
              </div>
            </div>
            <div class="btn">
              <div>
                <el-button-group>
                  <el-button v-power="'orgManage:add'" type="primary" @click="orgJump('add')"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
                  <el-button v-power="'orgManage:edit'" type="primary" @click="orgJump('edit')"><i class="iconfont icon-xiugai-copy" />  修改</el-button>
                  <el-button v-power="'orgManage:delete'" type="primary" @click="deleteData()"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
                </el-button-group>
              </div>
              <div>
                <el-button-group>
                  <el-button v-power="'orgManage:setLeader'" type="primary" @click="assignLeader"><i class="iconfont icon-zhidingfuzeren-copy" /> 指定负责人</el-button>
                  <el-button v-power="'orgManage:stop'" type="primary" @click="stopOrg"><i class="iconfont icon-tingyong-copy" /> 停用</el-button>
                  <el-button v-power="'orgManage:recovery'" type="primary" @click="returnOrg"><i class="iconfont icon-huifu" /> 恢复</el-button>
                </el-button-group>
              </div>
              <div>
                <el-button-group>
                  <el-button v-power="'orgManage:import'" type="primary" @click="orgJump('import')"><i class="iconfont icon-daoru-copy" /> 导入</el-button>
                  <el-button v-power="'orgManage:export'" type="primary" @click="orgExport"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
                </el-button-group>
              </div>
            </div>
          </div>
          <el-table
            ref="tableRef"
            v-loading="loading"
            :data="tableData"
            row-key="id"
            border
            max-height="calc(100vh - 300px)"
            @sort-change="sortTable"
            @select="handleSelectionSingleChange"
          >
            <el-table-column type="selection" width="40" label-class-name="table-selection" />
            <el-table-column type="index" width="48" label="序号" align="center" />
            <el-table-column label="组织名称" align="center" width="320" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span class="table-click-color one-ellipsis" @click="$router.push({name: 'organizationSee', query: {type:'see', id: scope.row.id, search: search}})">{{ scope.row.orgName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="simpleName" label="简称" align="center" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="chargePersonName" label="负责人" align="center" width="110" />
            <el-table-column prop="orgNumber" label="组织编号" sortable="custom" align="center" width="120" />
            <el-table-column prop="sortOrgType" label="组织类别" sortable="custom" align="center" width="120" />
            <el-table-column prop="parentName" label="上级组织" align="center" width="320" :show-overflow-tooltip="true" />
            <el-table-column prop="sequenceNumber" label="顺序号" align="center" width="100" />
            <el-table-column prop="registeredPlaceName" label="注册地" align="center" width="320" :show-overflow-tooltip="true" />
            <el-table-column prop="establishmentDate" label="成立日期" sortable="custom" align="center" width="120" />
            <el-table-column prop="telephone" label="联系电话" align="center" width="120" />
            <el-table-column prop="officeAddress" label="办公地址" align="center" width="320" :show-overflow-tooltip="true" />
            <el-table-column prop="sortState" label="状态" sortable="custom" align="center" width="100" />
          </el-table>
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
    <drag-dialog ref="dialog" title="指定负责人" width="45%">
      <el-form ref="ruleForm" :key="key" v-loading="personLoading" :model="ruleForm" :rules="rules" label-width="110px" class="category-form">
        <el-form-item label="负责人" prop="chargePersonName">
          <el-select v-model="ruleForm.chargePersonName" placeholder="请选择" clearable style="width: 100%">
            <el-option v-for="item in personnalList" :key="item.id" :label="item.name" :value="item.id" />
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
import { getOrgTree, getOrgList, assignOrg, delOrganization, stopOrg, returnOrg, orgExport } from '@core/api/organization'
import { getAllPersonnel } from '@core/api/personnel'
import { codeChangeName, filterListData, exportExcel, parseTime } from '@core/utils'
import { getSessionStorage } from '@core/utils/auth'
import { mapGetters } from 'vuex'
export default {
  name: 'OrgManage',
  components: {
    DragDialog
  },
  mixins: [pagination, table],
  data() {
    return {
      count: 0,
      personLoading: false,
      value: '',
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
        state: 'OK',
        chargePersonName: '',
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
      treeLoading: true,
      enterStatus: true,
      defaultExpandedKeys: [],
      highLight: false
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  activated() {
    const { mainBusiness } = JSON.parse(getSessionStorage('navInfo'))
    this.$store.dispatch('getConstant', ['organizationState', 'isLegalEntity', 'levelOrganization', 'orgType']).then(() => {
      if (mainBusiness !== 'JZZS') this.constant.orgType = filterListData(this.constant.orgType, 'ProjectDepartment')
      this.fetchData()
    })
    this.getTree()
    this.keyupEnter()
    this.search.state = 'OK'
  },
  beforeDestroy() {
    this.enterStatus = false
  },
  methods: {
    keyupEnter() {
      document.onkeyup = (e) => {
        const keyCode = window.event ? e.keyCode : e.which
        if (keyCode === 13 && this.enterStatus) {
          this.fetchData()
        }
      }
    },
    orgJump(type) {
      switch (type) {
        case 'add':
          this.$router.push({
            name: 'orgManageAdd',
            query: {
              type
            }
          })
          break
        case 'edit':
          if (this.multipleSelection.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.$router.push({
            name: 'organizationEdit',
            query: {
              type,
              id: this.multipleSelection[0]['id']
            }
          })
          break
        case 'import':
          this.$router.push({
            name: 'importOrg'
          })
          break
        default:
          break
      }
    },
    // 导出
    orgExport(sortData) {
      const {
        establishmentDate
      } = this.search
      const params = {
        ...this.search,
        establishmentDate: {
          after: establishmentDate[0],
          before: establishmentDate[1]
        }
      }
      if (!establishmentDate.length) delete params.establishmentDate
      orgExport(params).then(res => {
        exportExcel(res, '组织清单.xls')
      })
    },
    getTree() {
      getOrgTree({}).then(({ data }) => {
        this.treeData = data
        this.defaultExpandedKeys = []
        const handlerTreeData = (list) => {
          if (Array.isArray(list)) {
            list.forEach(item => {
              const orgNameList = ['SubCompany', 'ProjectDepartment', 'Department']
              if (!orgNameList.includes(item.orgType)) {
                this.defaultExpandedKeys.push(item.id)
                if (item.children.length) {
                  handlerTreeData(item.children)
                }
              }
            })
          }
        }
        handlerTreeData(data)
        this.treeLoading = false
      })
    },
    deleteData() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOrganization(this.multipleSelection[0]['id']).then(res => {
          if (res.code === 200) {
            this.fetchData()
            this.$message.success('删除成功')
            this.getTree() // 刷新左边树形结构
          }
          return
        })
      }).catch(() => {})
    },
    stopOrg() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      const { state } = this.multipleSelection[0]
      if (state !== 'OK') {
        this.$message.warning('请选择状态为正常的岗位')
        return
      }
      this.$confirm('确认要停用选中的组织，停用操作会同时停用子组织，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        stopOrg(this.multipleSelection[0]['id']).then(res => {
          if (res.code === 200) {
            this.fetchData()
            this.$message.success('停用成功')
          }
          return
        })
      }).catch(() => {})
    },
    returnOrg() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      const { state } = this.multipleSelection[0]
      if (state === 'OK') {
        this.$message.warning('只能恢复停用的组织')
        return
      }
      this.$confirm('确认要恢复选中的组织，恢复操作只会恢复您选中的组织本身，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        returnOrg(this.multipleSelection[0]['id']).then(res => {
          if (res.code === 200) {
            this.fetchData()
            this.$message.success('恢复成功')
          }
          return
        })
      }).catch(() => {})
    },
    fetchData(sortData) {
      this.loading = true
      if (typeof sortData === 'string') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        // this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      const { establishmentDate } = this.search
      const { propertyName, ascending } = sortData || {}
      const params = {
        size: this.size,
        page: this.page - 1,
        ...this.search,
        propertyName,
        ascending,
        establishmentDate: {
          after: establishmentDate[0],
          before: establishmentDate[1]
        }
      }
      this.tableData = []
      if (!establishmentDate.length) delete params.establishmentDate
      getOrgList(params).then(({ data: { total, content }}) => {
        this.loading = false
        this.tableData = content
        this.tableData.map(item => {
          item['sortOrgType'] = item.orgTypeName
          item['sortState'] = item.stateName
          item.establishmentDate = parseTime(item.establishmentDate, 'y-m-d')
          return item
        })
        this.count = total
      })
    },
    assignLeader() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      } else {
        this.personLoading = true
        this.$refs.dialog.show = true
        this.key += 1
        const { id, chargePersonName } = this.multipleSelection[0]
        getAllPersonnel(id).then(res => {
          this.personnalList = res.data
          this.personLoading = false
          this.ruleForm.chargePersonName = chargePersonName
          this.key += 1
        })
      }
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = {
            Loading: true,
            id: this.multipleSelection[0]['id'],
            chargePersonId: this.ruleForm.chargePersonName,
            chargePersonName: codeChangeName(this.personnalList, this.ruleForm.chargePersonName, 'id')
          }
          delete params.dictionaryTypeName
          assignOrg(params).then(res => {
            this.$refs.dialog.show = false
            this.$message.success('指定成功')
            this.fetchData()
            this.ruleForm = { ...this.deepRuleForm
            }
          })
        } else {
          return
        }
      })
    },
    handleNodeClick(data) {
      if (this.search.id === data.id) {
        this.highLight = !this.highLight
        this.nodeTreeData = data
        this.search.id = ''
      } else {
        this.highLight = true
        this.search.id = data.id
        this.nodeTreeData = data
        if (data.id === 'SubCompany' || data.id === 'ProjectDepartment') {
          this.search.orgType = data.id
          this.search.id = ''
        } else {
          this.search.orgType = ''
        }
        this.fetchData('query')
      }
    }

  }
}
</script>

<style lang="less" scoped>
	.org-manage {
		padding: 10px 0px 10px 10px;
		height: calc(100vh - 140px);
		.left {
			margin-right: 5px;
			height: 100%;
      overflow-y: auto;
      background: #f5f5f5;
		}
		.right {
			margin-left: 10px;
			padding-right: 10px;
			height: 100%;
			// overflow-y: auto;
		}
	}
</style>
<style lang="less">
.org-manage {
  .el-table__body-wrapper {
    max-height: calc(100vh - 360px);
  }
}
</style>
