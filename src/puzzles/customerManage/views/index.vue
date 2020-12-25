<template>
  <div class="customer-manage">
    <div class="search">
      <div class="select">
        <div>
          <span>编号</span>
          <el-input v-model.trim="search.companyNumber" placeholder="请输入编号" />
        </div>
        <div>
          <span>名称</span>
          <el-input v-model.trim="search.companyName" placeholder="请输入名称" />
        </div>
        <div>
          <span>联系人</span>
          <el-input v-model.trim="search.contactPerson" placeholder="请输入联系人" />
        </div>
        <div v-if="pageType === 'jdy'">
          <span>所属经销商</span>
          <el-select v-model="search.dealerCompanyId" placeholder="请选择所属经销商" clearable>
            <el-option
              v-for="item in distributorList"
              :key="item.id"
              :label="item.companyName"
              :value="item.id"
            />
          </el-select>
        </div>
        <div>
          <span>所在地</span>
          <el-cascader
            v-model="search.companyAddress"
            placeholder="请选择所在地"
            clearable
            :options="constant.nativePlace"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children', checkStrictly: true }"
          />
        </div>
        <div v-if="pageType === 'jxs'">
          <span>级别</span>
          <el-select v-model="search.level" placeholder="请选择级别" clearable>
            <el-option
              v-for="item in constant.CustomerLevel"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
        <div v-if="pageType === 'jxs'">
          <span>来源</span>
          <el-select v-model="search.source" placeholder="请选择来源" clearable>
            <el-option
              v-for="item in constant.CustomerSource"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
        <!-- <div v-if="pageType === 'jdy'">
          <span>所属区域</span>
          <el-select v-model="search.contactPerson" placeholder="请选择所属区域" clearable>
            <el-option
              v-for="item in effectiveList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div> -->
        <div class="query">
          <div v-power="'customer:query'">
            <el-button type="primary" icon="el-icon-search" @click="fetchData({}, 'query')">查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div v-power="'customer:edit'">
          <el-button type="primary" @click="customerUpdate">修改</el-button>
        </div>
        <div v-power="'customer:distribute'">
          <el-button type="primary" @click="distribution">分配</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-table ref="tableRef" v-loading="loading" :data="tableData" row-key="id" border @selection-change="handleSelectionChange" @sort-change="sortTable">
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column label="编号" align="center">
          <template slot-scope="scope">
            <div class="table-click-color" @click="details(scope.row.id)">
              {{ scope.row.companyNumber }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" label="名称" align="center" width="300" />
        <el-table-column prop="contactPerson" label="联系人" align="center" />
        <el-table-column prop="telephone" label="联系电话" align="center" />
        <el-table-column prop="companyAddressName" label="所在地" align="center" sortable />
        <el-table-column prop="belongMarketingAreaName" label="所属区域" align="center" width="150" />
        <el-table-column v-if="pageType === 'jxs'" prop="source" label="来源" align="center" sortable />
        <el-table-column v-if="pageType === 'jxs'" prop="ownerName" label="客户所有人" align="center" sortable />
        <el-table-column v-if="pageType === 'jdy'" prop="belongDealerCompanyName" label="所属经销商" align="center" />
        <el-table-column prop="probation" label="试用期剩余(天)" align="center" />
        <el-table-column prop="isSign" label="是否签约" align="center" />
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
    <drag-dialog ref="dialog" title="分配人员" width="40%">
      <el-form ref="ruleFormPersonnel" :key="key" :model="ruleFormPersonnel" label-width="70px">
        <el-form-item label="选择人员" prop="owner">
          <el-select v-model="ruleFormPersonnel.owner" filterable placeholder="请选择选择人员" clearable style="width: 100%">
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
import DragDialog from '@frames/dashboard/components/Dialog'
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import { getCustomerTableList, assignPersonJdy } from '@core/api/operationManage/platformCompany'
import { getPersonnelsByOrgId } from '@core/api/personnel'
import { getCustomerPage, assignPerson } from '@core/api/operationManage/market'
import { geteCompanyNotPage } from '@core/api/operationManage/company'
import { getSessionStorage } from '@core/utils/auth'
import { mapGetters } from 'vuex'
export default {
  name: 'CustomerManage',
  components: {
    DragDialog
  },
  mixins: [pagination, table],
  data() {
    return {
      count: 0,
      search: {
        companyNumber: '',
        companyName: '',
        source: '',
        companyAddress: [],
        contactPerson: '',
        dealerCompanyId: ''
      },
      tableData: [],
      effectiveList: [],
      loading: true,
      pageType: '',
      ruleFormPersonnel: {
        owner: '',
        ownerName: ''
      },
      personnelList: [],
      distributorList: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  activated() {
    const { page } = this.$route.query
    this.pageType = page
    this.$store.dispatch('getConstant', ['nativePlace', 'CustomerLevel', 'source', 'CustomerSource']).then(() => {
      this.fetchData()
    })
    this.getBelongDistributor()
  },
  methods: {
    fetchData(sortData = {}, type) {
      // this.loading = true
      // if (type === 'query') {
      //   this.page = 1
      //   this.size = 10
      // }
      this.loading = true
      if (typeof sortData === 'string') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      const { companyAddress } = this.search
      const params = {
        page: this.page - 1,
        size: this.size,
        ...this.search,
        companyAddress: companyAddress.length ? companyAddress.toString() : null,
        ...sortData
      }
      if (this.pageType === 'jdy') {
        getCustomerTableList(params).then(({ data: { content, total }}) => {
          this.loading = false
          this.count = total
          this.tableData = content
        })
      }
      if (this.pageType === 'jxs') {
        getCustomerPage(params).then(({ data: { content, total }}) => {
          this.loading = false
          this.count = total
          this.tableData = content
        })
      }
    },
    details(id) {
      this.$router.push({ name: 'customerDetails', query: { id, disabled: true, page: this.pageType }})
    },
    customerUpdate() {
      if (this.onlyOneData()) {
        const id = this.multipleSelection[0].id
        this.$router.push({ name: 'customerEdit', query: { id, page: this.pageType }})
      }
    },
    distribution() {
      if (this.onlyOneData()) {
        const { id, owner } = this.multipleSelection[0]
        this.getPersonnel(id).then(() => {
          this.ruleFormPersonnel.owner = owner
        })
        this.key += 1
        this.$refs.dialog.show = true
      }
    },
    personSubmit() {
      const id = this.multipleSelection[0].id
      this.personnelList.forEach(v => {
        if (this.ruleFormPersonnel.owner === v.id) {
          this.ruleFormPersonnel.ownerName = v.name
        }
      })
      const params = {
        id,
        ...this.ruleFormPersonnel
      }

      if (this.pageType === 'jxs') {
        assignPerson(params).then(() => {
          this.$message.success('分配成功')
          this.$refs.dialog.show = false
          this.fetchData()
        })
      }
      if (this.pageType === 'jdy') {
        assignPersonJdy(params).then(() => {
          this.$message.success('分配成功')
          this.$refs.dialog.show = false
          this.fetchData()
        })
      }
    },
    getPersonnel(id) {
      return new Promise((resolve, reject) => {
        const id = getSessionStorage('orgId')
        getPersonnelsByOrgId(id).then(({ data }) => {
          this.personnelList = data
          resolve(data)
        })
      })
    },
    getBelongDistributor() {
      geteCompanyNotPage({ companyType: 'dealer' }).then(({ data }) => {
        this.distributorList = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.customer-manage {
  width: calc(100% - 20px);
  height: calc(100vh - 140px);
  overflow-y: auto;
  padding: 10px;
}
</style>
