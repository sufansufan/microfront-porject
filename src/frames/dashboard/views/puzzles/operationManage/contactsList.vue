<template>
  <div class="contacts-list">
    <div class="search">
      <div v-show="selectState" class="select">
        <div>
          <span>联系人</span>
          <div>
            <el-input v-model.trim="search.personName" placeholder="请输入联系人" clearable />
          </div>
        </div>
        <div>
          <span>所属客户</span>
          <div>
            <el-input v-model.trim="search.name" placeholder="请输入所属客户" clearable />
          </div>
        </div>
        <div>
          <span>电话</span>
          <div>
            <el-input v-model="search.telphone" placeholder="请输入所属客户" clearable />
          </div>
        </div>
        <div class="query">
          <div v-power="'contacts:query'">
            <el-button type="primary" icon="el-icon-search" @click="fetchData('query')">查询</el-button>
          </div>
        </div>
      </div>
      <div v-if="!btnDisabled" class="btn">
        <div>
          <el-button-group>
            <el-button v-power="'contacts:add'" type="primary" @click="dialogStatus('add')">新增</el-button>
            <el-button v-power="'contacts:edit'" type="primary" @click="dialogStatus('edit')">修改</el-button>
            <el-button v-power="'contacts:delete'" type="primary" @click="deleteRow">删除</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table ref="tableRef" v-loading="loading" :data="tableData" row-key="id" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" label="序号" width="48" align="center" />
        <el-table-column label="联系人" align="center">
          <template slot-scope="scope">
            <div class="table-click-color" @click="dialogStatus('details', scope.row.id)">
              {{ scope.row.personName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="telphone" label="手机号" align="center" width="160" />
        <el-table-column prop="officePhone" label="办公电话" align="center" width="160" />
        <el-table-column prop="companyName" label="所属客户" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="duty" label="职务" align="center" width="150" />
        <el-table-column prop="email" label="电子邮件" align="center" width="160" />
        <el-table-column prop="belongOrgName" label="所属部门" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="birtday" label="生日" align="center" width="120" />
        <el-table-column prop="ownerName" label="所有人" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="isConstantName" label="最后一次联系时间" align="center" width="160" />
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

<script>
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import { getTableList, deleteData } from '@core/api/operationManage/contactPerson'
export default {
  mixins: [pagination, table],
  inject: ['pageType'],
  props: {
    companyId: {
      type: String,
      default: ''
    },
    selectState: {
      type: Boolean,
      default: true
    },
    btnDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      count: 0,
      search: {
        name: '',
        personName: '',
        telphone: ''
      },
      loading: true,
      tableData: []
    }
  },
  created() {
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
      //   this.page = 1
      //   this.size = 10
      // }
      const params = {
        ...this.search,
        page: this.page - 1,
        size: this.size,
        companyId: this.companyId
      }
      getTableList(params).then(({ data: { content, total }}) => {
        this.loading = false
        this.tableData = content
        this.count = total
      })
    },
    dialogStatus(type, id) {
      const pageType = this.pageType ? this.pageType : 'jxs'
      switch (type) {
        case 'add':
          if (this.companyId) {
            this.$router.push({ name: 'contactsCustomerAdd', query: { companyId: this.companyId, page: pageType }})
          } else {
            this.$router.push({ name: 'contactsAdd', query: { companyId: '', page: pageType }})
          }
          break
        case 'edit':
          if (!this.onlyOneData()) return
          if (this.companyId) {
            this.$router.push({ name: 'contactsCustomerEdit', query: { id: this.multipleSelection[0].id, companyId: this.companyId, page: pageType }})
          } else {
            this.$router.push({ name: 'contactsEdit', query: { id: this.multipleSelection[0].id, companyId: '', page: pageType }})
          }
          break
        case 'details':
          this.$router.push({ name: 'contactsEdit', query: { id, companyId: '', disabled: true, page: pageType }})
          break
        default:
          break
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
            this.fetchData('query')
          })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
