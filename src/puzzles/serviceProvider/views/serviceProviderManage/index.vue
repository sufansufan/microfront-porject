<template>
  <div class="service-provider-manage">
    <div class="search">
      <div class="select">
        <div>
          <span>企业名称</span>
          <el-input v-model.trim="search.companyName" placeholder="请输入企业名称" clearable @keyup.enter.native="keyupSearch" />
        </div>
        <div>
          <span>注册地</span>
          <el-cascader
            v-model.trim="search.registerPlace"
            placeholder="请选择注册地"
            clearable
            filterable
            :options="constant.nativePlace"
            :props="{ checkStrictly: true,expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children' }"
            style="width:100%"
            @keyup.enter.native="keyupSearch"
          />
        </div>
        <div>
          <span>联系人</span>
          <el-input v-model.trim="search.contacts" placeholder="请输入联系人" clearable @keyup.enter.native="keyupSearch" />
        </div>
        <div>
          <span>是否已注册</span>
          <el-select v-model.trim="search.registerCompany" placeholder="请选择是否已注册" clearable @keyup.enter.native="keyupSearch">
            <el-option v-for="item in isRegister" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </div>
        <div>
          <span>授权状态</span>
          <el-select v-model.trim="search.status" placeholder="请选择授权状态" clearable @keyup.enter.native="keyupSearch">
            <el-option
              v-for="item in constant.authorizeStatus"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
        <div class="query">
          <div>
            <el-button type="primary" @click="fetchData('query')"><i class="iconfont icon-search-copy" /> 查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button v-power="'serviceProvider:add'" type="primary" @click="jumpState('add')"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
            <el-button v-power="'serviceProvider:edit'" type="primary" @click="jumpState('edit')"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button v-power="'serviceProvider:delete'" type="primary" @click="deleteData"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button-group>
            <el-button v-power="'serviceProvider:power'" type="primary" @click="empower"><i class="iconfont icon-shouquan" /> 授权</el-button>
            <el-button v-power="'serviceProvider:stop'" type="primary" @click="stopEmpower"><i class="iconfont icon-tingzhishouquan" /> 停止授权</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button-group>
            <el-button v-power="'serviceProvider:import'" type="primary" @click="jumpState('import')"><i class="iconfont icon-daoru-copy" /> 导入</el-button>
            <el-button v-power="'serviceProvider:export'" type="primary" @click="exportService"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        row-key="id"
        border
        default-expand-all
        :default-sort="{prop: 'status', order: 'ascending'}"
        max-height="calc(100vh - 300px)"
        @sort-change="sortTable"
        @select="handleSelectionSingleChange"
      >
        <el-table-column type="selection" width="40" label-class-name="table-selection" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column label="企业编号" prop="companyNumber" align="center" />
        <el-table-column label="企业名称" header-align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="table-click-color" @click="jumpState('details', scope.row)">{{ scope.row.companyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="informationCode" label="统一社会信用代码" align="center" width="150" />
        <el-table-column prop="registerPlaceName" label="注册地" align="center" show-overflow-tooltip />
        <el-table-column prop="officeAddress" label="办公地址" align="center" show-overflow-tooltip />
        <el-table-column prop="legal" label="法定代表人" align="center" show-overflow-tooltip />
        <el-table-column prop="idNumber" label="法定代表人身份证" align="center" width="220" />
        <el-table-column prop="contacts" label="联系人" align="center" width="110" />
        <el-table-column prop="mobilePhone" label="手机号" align="center" width="110" />
        <el-table-column prop="companyId" label="是否已注册" align="center" sortable="custom" width="110">
          <template slot-scope="scope">
            <span>{{ scope.row.companyId === '' || scope.row.companyId === null ? '否' : '是' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="授权状态" align="center" sortable="custom" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.status == '0'?'未授权':(scope.row.status=='1'?'已授权':(scope.row.status=='2'?'停止授权':'')) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="录入人" align="center" />
        <el-table-column prop="createDate" label="录入时间" align="center" sortable="custom" width="150" />
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
        @current-change="handleCurrentChange($event, 'single')"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
import table from '@core/mixins/table'
import pagination from '@core/mixins/pagination'
import { mapGetters } from 'vuex'
import { serviceList, deleteService, changeStatus, exportService } from '@core/api/serviceProvider/serviceCompany'
import { exportExcel } from '@core/utils'
export default {
  name: 'ServiceProviderManage',
  mixins: [table, pagination],
  data() {
    return {
      search: {
        companyName: '',
        registerPlace: '',
        contacts: '',
        registerCompany: '',
        status: ''
      },
      isRegister: [
        { code: true, name: '是' },
        { code: false, name: '否' }],
      count: 0,
      tableData: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  activated() {
    this.$store.dispatch('getConstant', ['nativePlace', 'authorizeStatus']).then(() => {
      this.fetchData()
    })
  },
  methods: {
    fetchData(type) {
      this.loading = true
      if (type === 'query') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      const { page, size, sortData } = this
      const { registerCompany, registerPlace } = this.search
      this.params = {
        page: page - 1,
        size,
        ...this.search,
        propertyName: 'status',
        ascending: true,
        ...sortData,
        registerPlace: registerPlace.toString(),
        registerCompany: registerCompany ? true : null || null,
        notRegisterCompany: registerCompany === false ? true : null || null
      }
      serviceList(this.params).then(({ data: { content, total }}) => {
        this.loading = false
        this.count = total
        this.tableData = content
      })
    },
    // 删除数据
    deleteData() {
      if (this.onlyOneData()) {
        const { id, status } = this.multipleSelection[0]
        var deleteStatus = ['0']
        if (!deleteStatus.includes(status)) {
          this.$message.warning('只能删除未授权的服务商')
          return
        }
        this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteService(id).then(() => {
            this.fetchData('query')
            this.$message.success('删除成功')
          })
        })
      }
    },
    // 导出服务商
    exportService() {
      exportService(this.params).then(res => {
        exportExcel(res, `服务商.xls`)
      })
    },
    // 授权
    empower() {
      if (this.onlyOneData()) {
        const { id, status } = this.multipleSelection[0]
        var empowerStatus = ['0', '2']
        if (!empowerStatus.includes(status)) {
          this.$message.warning('只能授权未授权或停止授权的的服务商')
          return
        }
        this.$confirm('确定要授权该服务商吗？授权后该服务商能看到厂家发布的所有产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeStatus(id, 1).then(() => {
            this.fetchData('query')
            this.$message.success('授权成功')
          })
        })
      }
    },
    // 停止授权
    stopEmpower() {
      if (this.onlyOneData()) {
        const { id, status } = this.multipleSelection[0]
        var stopEmpowerStatus = ['1']
        if (!stopEmpowerStatus.includes(status)) {
          this.$message.warning('只能选择状态为已授权的服务商')
          return
        }
        this.$confirm('确定要停止授权该服务商吗？确定后该服务商看不到厂家发布的任何产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeStatus(id, 2).then(() => {
            this.fetchData('query')
            this.$message.success('停止授权成功')
          })
        })
      }
    },

    jumpState(type, row) {
      switch (type) {
        case 'add':
          this.$router.push({ name: 'serviceAdd', query: { type }})
          break
        case 'edit':
          if (this.onlyOneData()) {
            const { id, status, companyId } = this.multipleSelection[0]
            var editStatus = ['0', '2']
            if (!editStatus.includes(status)) {
              this.$message.warning('只能修改未授权或停止授权的服务商')
            } else {
              this.$router.push({ name: 'serviceEdit', query: { type, id, companyId }})
            }
          }
          break
        case 'details':
          var { id, companyName } = row
          this.$router.push({ name: 'serviceDetails', query: { type, id, companyName }})
          break
        case 'import':
          this.$router.push({ name: 'importService' })
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.service-provider-manage {
  padding: 10px;
}
</style>
<style lang="less">
.service-provider-manage {
  .el-table__body-wrapper {
    max-height: calc(100vh - 335px);
  }
}
</style>
