<template>
  <div class="employee-manage">
    <split-pane :min-percent="8" :default-percent="12" split="vertical">
      <template slot="paneL">
        <div v-loading="treeLoading" class="left">
          <el-tree :data="treeData" node-key="id" :expand-on-click-node="false" :props="defaultProps" :default-expanded-keys="defaultExpandedKeys" :highlight-current="highLight" @node-click="handleNodeClick" />
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <div class="search">
            <div class="select">
              <div>
                <span>工号</span>
                <div>
                  <el-input v-model="search.jobNumber" clearable placeholder="请输入工号" @keyup.enter.native="keyupSearch" />
                </div>
              </div>
              <div>
                <span>姓名</span>
                <div>
                  <el-input v-model="search.name" clearable placeholder="请输入姓名" @keyup.enter.native="keyupSearch" />
                </div>
              </div>
              <div>
                <span>主岗</span>
                <div>
                  <el-select v-model="search.mainPostId" clearable placeholder="请选择主岗" filterable @keyup.enter.native="keyupSearch">
                    <el-option
                      v-for="item in constant.allPost"
                      :key="item.id"
                      :label="item.postName"
                      :value="item.id"
                    />
                  </el-select>
                </div>
              </div>
              <div>
                <span>手机</span>
                <div>
                  <el-input v-model="search.telephone" clearable placeholder="请输入手机号码" @keyup.enter.native="keyupSearch" />
                </div>
              </div>
              <div>
                <span>入职日期</span>
                <div>
                  <el-date-picker
                    v-model="search.joinDate"
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
              <div>
                <span>员工类型</span>
                <div>
                  <el-select v-model="search.employeeType" clearable placeholder="请选择员工类型" @keyup.enter.native="keyupSearch">
                    <el-option

                      v-for="item in constant.employeeType"
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
                  <el-select v-model="search.employeeStatus" clearable placeholder="请选择状态" @keyup.enter.native="keyupSearch">
                    <el-option
                      v-for="item in constant.employeeStatus"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </div>
              </div>
              <div>
                <span>性别</span>
                <div>
                  <el-select v-model="search.gender" clearable placeholder="请选择性别" @keyup.enter.native="keyupSearch">
                    <el-option
                      v-for="item in constant.gender"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </div>
              </div>
              <div>
                <span>出生日期</span>
                <div>
                  <el-date-picker
                    v-model="search.birthday"
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
              <div>
                <span>学历</span>
                <div>
                  <el-select v-model="search.education" clearable placeholder="请选择学历" @keyup.enter.native="keyupSearch">
                    <el-option
                      v-for="item in constant.Education"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </div>
              </div>
              <div style="width: 10%">
                <el-checkbox v-model="search.excludeLeavers" clearable style="margin-left: 10px" @keyup.enter.native="keyupSearch">包含离职人员</el-checkbox>
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
                  <el-button v-power="'employeeManage:add'" type="primary" @click="orgJump('add')"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
                  <el-button v-power="'employeeManage:edit'" type="primary" @click="orgJump('edit')"><i class="iconfont icon-xiugai-copy" />  修改</el-button>
                  <el-button v-power="'employeeManage:delete'" type="primary" @click="deleteData()"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
                </el-button-group>
              </div>
              <div>
                <el-button v-power="'employeeManage:resetPwd'" type="primary" @click="resetPwd()"><i class="iconfont icon-mimashezhi" /> 重置密码</el-button>
              </div>
              <div>
                <el-button-group>
                  <el-button v-power="'employeeManage:import'" type="primary" @click="orgJump('import')"><i class="iconfont icon-daoru-copy" /> 导入</el-button>
                  <el-button v-power="'employeeManage:export'" type="primary" @click="orgExport"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
                </el-button-group>
              </div>
            </div>
          </div>
          <el-table ref="multipleTable" v-loading="loading" :data="tableData" row-key="id" border max-height="calc(100vh - 350px)" @selection-change="handleSelectionChange" @sort-change="sortTable">
            <el-table-column type="selection" width="40" />
            <el-table-column type="index" width="48" label="序号" align="center" />
            <el-table-column prop="jobNumber" label="工号" sortable="custom" align="center" width="100" />
            <el-table-column label="姓名" align="center" width="110">
              <template slot-scope="scope">
                <span class="table-click-color" @click="$router.push({name: 'employeeInfo', query: {type: 'see', id: scope.row.id, search: search}})">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="genderName" label="性别" align="center" width="100" />
            <el-table-column prop="employeeTypeName" label="员工类型" align="center" width="100" />
            <el-table-column prop="telephone" label="手机" align="center" width="160" />
            <el-table-column prop="idNumber" label="身份证号" align="center" width="160" />
            <el-table-column prop="educationName" label="学历" align="center" width="100" />
            <el-table-column prop="mainPostName" label="主岗岗位" align="center" width="160" :show-overflow-tooltip="true" />
            <el-table-column prop="postClassifyName" label="岗位类别" align="center" />
            <el-table-column prop="orgName" label="所属组织" align="center" :show-overflow-tooltip="true" width="320" />
            <el-table-column v-if="mainBusiness === 'JZZS'" prop="personnelPost" label="项目任职" align="center" />
            <el-table-column prop="partTimeJob" label="兼职岗位" align="center" width="320" :show-overflow-tooltip="true" />
            <el-table-column prop="joinDate" label="入职日期" sortable="custom" align="center" width="120" />
            <el-table-column prop="endTime" label="合同到期天数" sortable="custom" align="center" width="120">
              <template slot-scope="scope">
                <span :class="scope.row.endTime === '已到期'? 'end-time-red':''">
                  {{ scope.row.endTime }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="employeeStatusName" label="状态" sortable="custom" align="center" width="100" />
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
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import { personnelList, deleteEmployee, updatePassword, employeeExport } from '@core/api/personnel'
import { getOrgTree } from '@core/api/organization'
import { mapGetters } from 'vuex'
import { codeChangeName, exportExcel, parseTime } from '@core/utils'
import { getSessionStorage } from '@core/utils/auth'
export default {
  name: 'EmployeeManage',
  mixins: [pagination, table],
  data() {
    return {
      count: 0,
      loading: true,
      treeLoading: true,
      search: {
        orgId: '',
        jobNumber: '',
        name: '',
        mainPostId: '',
        telephone: '',
        employeeType: '',
        employeeStatus: [],
        gender: '',
        education: '',
        ExcludeLeavers: '',
        joinDate: [],
        birthday: []
      },
      tableData: [],
      treeData: [],
      defaultExpandedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'orgName'
      },
      PaginationNum: 10,
      enterStatus: true,
      highLight: false
    }
  },
  computed: {
    ...mapGetters(['constant']),
    mainBusiness() {
      const { mainBusiness } = JSON.parse(getSessionStorage('navInfo'))
      return mainBusiness
    }
  },
  activated() {
    this.$store.dispatch('getConstant', ['gender', 'allPost', 'employeeType', 'Education', 'employeeStatus', 'postType']).then(() => {
      this.fetchData()
    })
    this.getTree()
    this.keyupEnter()
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
    handleSizeChange(val) {
      this.PaginationNum = val
      this.fetchData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    orgJump(type) {
      switch (type) {
        case 'add':
          this.$router.push({ name: 'employeeAdd', query: { type: 'add' }})
          break
        case 'edit':
          if (this.multipleSelection.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.$router.push({ name: 'employeeInfo', query: { type: 'edit', id: this.multipleSelection[0]['id'] }})
          break
        case 'import':
          this.$router.push({ name: 'importEmployee' })
          break
        default:
          break
      }
    },
    deleteData() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一位员工')
        return
      }
      this.$confirm('确定要删除该员工吗？删除后数据不可恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEmployee(this.multipleSelection[0]['id']).then(res => {
          this.$message.success('删除成功!')
          this.fetchData()
        })
      }).catch(() => {})
    },
    resetPwd() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一位员工')
        return
      }
      this.$confirm('此操作将重置选中员工密码？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updatePassword(this.multipleSelection[0]['id']).then(res => {
          this.$message.success('重置成功!')
          this.fetchData()
        })
      }).catch(() => {})
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
    handleNodeClick(data) {
      if (this.search.orgId === data.id) {
        this.highLight = !this.highLight
        this.nodeTreeData = data
        this.search.orgId = ''
      } else {
        this.highLight = true
        this.nodeTreeData = data
        this.search.orgId = data.id
        if (data.id === 'SubCompany' || data.id === 'ProjectDepartment') {
          this.search.orgType = data.id
          this.search.orgId = ''
        } else {
          this.search.orgType = ''
        }
        this.tableData = []
        this.fetchData('query')
      }
    },
    fetchData(sortData) {
      this.loading = true
      if (typeof sortData === 'string') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        // this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      const { page, search: { orgId, jobNumber, name, mainPostId, telephone, employeeType, employeeStatus, gender, education, excludeLeavers, joinDate, birthday, orgType }} = this
      const { propertyName, ascending } = sortData || {}
      const params = {
        page: page === 0 ? page : page - 1,
        size: this.PaginationNum,
        orgId,
        jobNumber,
        name,
        mainPostId,
        telephone,
        birthday: { 'after': joinDate && joinDate[0], 'before': joinDate && joinDate[1] },
        employeeType,
        gender,
        joinDate: { 'after': birthday && birthday[0], 'before': birthday && birthday[1] },
        education,
        excludeLeavers: excludeLeavers ? 'Ok' : 'NOT',
        propertyName,
        ascending,
        orgType
      }
      if (employeeStatus && employeeStatus !== '' && employeeStatus.length > 0) {
        params.employeeStatus = [employeeStatus]
      }
      this.tableData = []
      personnelList(params).then(({ data: { content, total }}) => {
        this.count = total
        this.tableData = content || []
        this.tableData.map(item => {
          item.genderName = codeChangeName(this.constant.gender, item.gender)
          item.employeeTypeName = codeChangeName(this.constant.employeeType, item.employeeType)
          item.educationName = codeChangeName(this.constant.Education, item.education)
          item.postClassifyName = codeChangeName(this.constant.postType, item.postClassify)
          item.employeeStatusName = codeChangeName(this.constant.employeeStatus, item.employeeStatus)
          item.joinDate = parseTime(item.joinDate, 'y-m-d')
          // item.endTime = this.getEndTime(item)
          return item
        })
        this.loading = false
      })
    },
    orgExport(sortData) {
      const { search: { orgId, jobNumber, name, mainPostId, telephone, employeeType, employeeStatus, gender, education, excludeLeavers, joinDate, birthday }} = this
      const params = {
        // page: page === 0 ? page : page - 1,
        // size: this.PaginationNum,
        orgId,
        jobNumber,
        name,
        mainPostId,
        telephone,
        birthday: { 'after': joinDate && joinDate[0], 'before': joinDate && joinDate[1] },
        employeeType,
        gender,
        joinDate: { 'after': birthday && birthday[0], 'before': birthday && birthday[1] },
        education,
        excludeLeavers: excludeLeavers ? 'Ok' : 'NOT'
      }
      if (employeeStatus && employeeStatus !== '' && employeeStatus.length > 0) {
        params.employeeStatus = [employeeStatus]
      }
      employeeExport(params).then(res => {
        exportExcel(res, '员工清单.xls')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.employee-manage {
  padding: 10px;
  height: calc(100vh - 140px);
  // overflow-y: auto;
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
  .end-time-red {
    color: red;
  }

}
</style>
<style lang="less">
.employee-manage {
  .el-table__body-wrapper {
    max-height: calc(100vh - 400px);
  }
}
</style>
