<template>
  <div class="equipment-list">
    <div class="search">
      <div class="select">
        <div>
          <span>设备序列号</span>
          <el-input v-model.trim="search.serialNumber" placeholder="请输入设备序列号" clearable />
        </div>
        <div>
          <span>状态</span>
          <el-select v-model="search.sellState" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in constant.deviceStatus"
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
            <el-button type="primary" @click="jumpState('add')"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
            <el-button type="primary" @click="jumpState('edit')"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button type="primary" @click="deleteData"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
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
        max-height="calc(100vh - 360px)"
        @select="handleSelectionSingleChange"
        @sort-change="sortTable"
      >
        <el-table-column type="selection" width="40" label-class-name="table-selection" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column label="设备序列号" sortable="custom" show-overflow-tooltip header-align="center">
          <template slot-scope="scope">
            <span class="table-click-color" @click="jumpState('details', scope.row)">{{ scope.row.serialNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="purchasePrice" label="采购价格" align="center" />
        <el-table-column prop="sellState" label="状态" sortable="custom" align="center">
          <template slot-scope="{row}">
            {{ row.sellStateName }}
          </template>
        </el-table-column>
        <el-table-column prop="storageDate" label="入库时间" sortable="custom" align="center" />
        <el-table-column prop="buyPersonName" label="采购人" align="center" />
        <el-table-column prop="sellPrice" label="售出价格" header-align="center" align="right">
          <template slot-scope="{row}">
            {{ row.sellPrice ? row.sellPrice.toLocaleString() : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="sendGoodsDate" label="发货时间" sortable="custom" align="center" />
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
import { queryEquipmentList, deleteEquipmentItem } from '@core/api/platformEquipmentManage/devicemanager'
import { mapGetters } from 'vuex'
import { codeChangeName } from '@core/utils'
export default {
  mixins: [table, pagination],
  data() {
    return {
      search: {
        serialNumber: '',
        sellState: ''
      },
      tableData: [],
      loading: false,
      count: 0
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['deviceStatus']).then(() => {
      this.fetchData()
    })
  },
  methods: {
    jumpState(type, row) {
      if (type === 'edit') {
        if (!this.onlyOneData()) return
        this.$store.commit('SET_EQUIPMENTITEM', this.multipleSelection[0])
      } else if (type === 'details') {
        this.$store.commit('SET_EQUIPMENTITEM', row)
      }
      this.$emit('changeTabConent', 'equipment', 'addEquipment', type)
    },
    fetchData(type) {
      this.loading = true
      const { id } = this.$route.query
      if (type === 'query') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      const params = {
        size: this.size,
        page: this.page - 1,
        ...this.search,
        propertyName: 'storageDate',
        ascending: false,
        ...this.sortData,
        sellState: this.search.sellState ? [this.search.sellState] : null,
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
    deleteData() {
      if (this.onlyOneData()) {
        const { id } = this.multipleSelection[0]
        this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteEquipmentItem(id).then(() => {
            this.fetchData('query')
            this.$message.success('删除成功')
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
<style lang="less">
.equipment-list {
  .el-table__body-wrapper {
    max-height: calc(100vh - 410px);
  }
}
</style>
