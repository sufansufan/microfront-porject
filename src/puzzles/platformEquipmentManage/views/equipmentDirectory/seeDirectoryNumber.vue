<template>
  <div class="see-directory-number">
    <div style="margin-bottom:10px;">
      <el-button class="back-btn" @click="$router.go(-1)">返回</el-button>
    </div>
    <div class="search">
      <div class="select">
        <div>
          <span>设备序列号</span>
          <el-input v-model.trim="search.serialNumber" clearable placeholder="请输入设备序列号" />
        </div>
        <div class="query">
          <div>
            <el-button type="primary" @click="fetchData('query')"><i class="iconfont icon-search-copy" /> 查询</el-button>
          </div>
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
        max-height="calc(100vh - 280px)"
      >
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column label="设备序列号" show-overflow-tooltip header-align="center">
          <template slot-scope="scope">
            <span class="table-click-color" @click="serialNumberClick(scope.row)">{{ scope.row.serialNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="purchasePrice" label="采购价格" header-align="center" align="right">
          <template slot-scope="{row}">
            {{ row.purchasePrice.toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="sellStateName" label="状态" align="center" />
        <el-table-column prop="storageDate" label="入库时间" align="center" />
        <el-table-column prop="buyPersonName" label="采购人" align="center" />
        <el-table-column prop="sellPrice" label="售出价格" header-align="center" align="right">
          <template slot-scope="{row}">
            {{ row.sellPrice ? row.sellPrice.toLocaleString() : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="sendGoodsDate" label="发货时间" align="center" />
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
import table from '@core/mixins/table'
import pagination from '@core/mixins/pagination'
import { queryEquipmentList } from '@core/api/platformEquipmentManage/devicemanager'
import { mapGetters } from 'vuex'
import { codeChangeName } from '@core/utils'
export default {
  name: 'EquipmentDirectory',
  mixins: [table, pagination],
  data() {
    return {
      search: {
        serialNumber: ''
      },
      tableData: [],
      loading: true,
      count: 0
    }
  },
  computed: {
    ...mapGetters(['constant', 'equipmentItem'])
  },
  created() {
    this.$store.dispatch('getConstant', ['deviceStatus']).then(() => {
      this.fetchData()
    })
  },
  methods: {
    fetchData(type) {
      this.loading = true
      const { id, sumType } = this.$route.query
      var sellStateList = null
      if (type === 'query') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      switch (sumType) {
        case 'stock':
          sellStateList = null
          break
        case 'sale':
          sellStateList = ['04']
          break
        case 'actual':
          sellStateList = ['01', '02']
          break
        case 'goods':
          sellStateList = ['03']
          break
        default:
          break
      }
      const params = {
        page: this.page - 1,
        size: this.size,
        ...this.search,
        sellState: sellStateList,
        deviceCatalogueId: id
      }
      queryEquipmentList(params).then(({ data: { content, total }}) => {
        this.loading = false
        this.count = total
        this.tableData = content
        this.tableData.map(item => {
          item.sellStateName = codeChangeName(this.constant.deviceStatus, item.sellState)
          return item
        })
      })
    },
    serialNumberClick(row) {
      this.$router.push({ name: 'seeStatistic', query: { statisticId: row.id }})
    }
  }
}
</script>

<style lang="less" scoped>
.see-directory-number {
  padding: 10px;
}
</style>
<style lang="less">
.see-directory-number {
  .el-table__body-wrapper {
    max-height: calc(100vh - 330px);
  }
}
</style>
