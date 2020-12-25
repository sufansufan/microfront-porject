<template>
  <div class="equipment-directory">
    <div class="search">
      <div class="select">
        <div>
          <span>设备名称</span>
          <el-input v-model.trim="search.deviceName" placeholder="请输入设备名称" clearable />
        </div>
        <div>
          <span>设备类型</span>
          <el-select v-model.trim="search.deviceType" placeholder="请选择设备类型" clearable>
            <el-option
              v-for="item in constant.deviceType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
        <div>
          <span>规格型号</span>
          <el-input v-model.trim="search.specifications" placeholder="请输入规格型号" clearable />
        </div>
        <div>
          <span>状态</span>
          <el-select v-model.trim="search.state" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in stateList"
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
            <el-button v-power="'equipmentDirector:add'" type="primary" @click="jumpState('add')"><i class="iconfont icon-xinzeng1-copy" /> 新增名录</el-button>
            <el-button v-power="'equipmentDirector:edit'" type="primary" @click="jumpState('edit')"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button v-power="'equipmentDirector:delete'" type="primary" @click="deleteData"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button-group>
            <el-button v-power="'equipmentDirectory:down'" type="primary" @click="dataChange('stop')"><i class="iconfont icon-xiajia" /> 下架</el-button>
            <el-button v-power="'equipmentDirectory:reset'" type="primary" @click="dataChange('start')"><i class="iconfont icon-huifu" /> 恢复</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button v-power="'equipmentDirectory:addEquip'" type="primary" @click="jumpState('equipment')"><i class="iconfont icon-xinzeng1-copy" /> 新增设备</el-button>
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
        @sort-change="sortTable"
        @select="handleSelectionSingleChange"
      >
        <el-table-column type="selection" width="40" label-class-name="table-selection" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column label="设备名称" header-align="center" show-overflow-tooltip sortable="custom">
          <template slot-scope="scope">
            <span class="table-click-color" @click="jumpState('see', scope.row)">{{ scope.row.deviceName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deviceType" label="设备类型" align="center" sortable="custom">
          <template slot-scope="{row}">
            {{ row.deviceTypeName }}
          </template>
        </el-table-column>
        <el-table-column prop="brand" label="品牌" align="center" show-overflow-tooltip />
        <el-table-column prop="specifications" label="规格型号" align="center" show-overflow-tooltip />
        <el-table-column prop="deviceDescription" label="设备描述" align="center" show-overflow-tooltip />
        <el-table-column prop="unitPrice" label="市场价格" align="center" />
        <el-table-column prop="state" label="状态" align="center" sortable="custom">
          <template slot-scope="{row}">
            {{ row.stateName }}
          </template>
        </el-table-column>
        <el-table-column label="累计库存量" align="center">
          <template slot-scope="scope">
            <span class="table-click-color" @click="sumNumber('stock', scope.row.id)">{{ scope.row.deviceStatisticsDTO.allStockNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="累计销售量" align="center">
          <template slot-scope="scope">
            <span class="table-click-color" @click="sumNumber('sale', scope.row.id)">{{ scope.row.deviceStatisticsDTO.saleNum }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="nowStockNum" align="center" sortable="custom" width="150">
          <template slot="header">
            <el-tooltip effect="dark" placement="top-start">
              <div slot="content" class="tooltip-font">实际库存量：指库房中现有设备数量 </div>
              <span>实际库存量 <i class="table-click-color iconfont icon-shuoming" /></span>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <span class="table-click-color" @click="sumNumber('actual', scope.row.id)">{{ scope.row.deviceStatisticsDTO.nowStockNum + scope.row.deviceStatisticsDTO.notSendNum }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="notSendNum" label="待发货量" align="center" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.deviceStatisticsDTO.notSendNum }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="notReceiveNum" label="待收货量" align="center" sortable="custom">
          <template slot-scope="scope">
            <span class="table-click-color" @click="sumNumber('goods', scope.row.id)">{{ scope.row.deviceStatisticsDTO.notReceiveNum }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lastStorgeDate" label="最近一次入库时间" align="center" width="200" sortable="custom" />
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
import { queryDirectoriesList, deleteDirectories, stopDirectories, reciverDirectories, queryStatisticsList } from '@core/api/platformEquipmentManage/devicemanager'
import { mapGetters } from 'vuex'
import { codeChangeName } from '@core/utils'
export default {
  name: 'EquipmentDirectory',
  mixins: [table, pagination],
  data() {
    return {
      search: {
        deviceName: '',
        deviceType: '',
        specifications: '',
        state: ''
      },
      count: 0,
      tableData: [],
      loading: true,
      stateList: [
        {
          code: '01',
          name: '正常'
        },
        {
          code: '02',
          name: '已下架'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['deviceType'])
    this.fetchData()
  },
  methods: {
    jumpState(type, row) {
      switch (type) {
        case 'add':
          this.$router.push({ name: 'addDirectory', query: { type: 'add' }})
          break
        case 'edit':
          if (this.onlyOneData()) {
            const { id } = this.multipleSelection[0]
            this.$router.push({ name: 'addDirectory', query: { type: 'edit', id }})
          }
          break
        case 'see':
          var { id } = row
          this.$router.push({ name: 'seeDirectory', query: { id }})
          break
        case 'equipment':
          if (this.multipleSelection.length) {
            const { id, state } = this.multipleSelection[0]
            if (state === '01') {
              this.$router.push({ name: 'addEquipment', query: { equipType: type, id }})
            } else {
              this.$message.warning('请选择状态为正常的设备')
            }
          } else {
            this.$router.push({ name: 'addEquipment', query: { equipType: type }})
          }
          break
        default:
          break
      }
    },
    sumNumber(type, id) {
      this.$router.push({ name: 'seeDirectoryNumber', query: { id, sumType: type }})
    },
    fetchData(type) {
      this.multipleSelection = []
      this.loading = true
      if (type === 'query') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      const { page, size, sortData } = this
      const params = {
        page: page - 1,
        size,
        ...this.search,
        ...sortData
      }
      const sortList = ['nowStockNum', 'notSendNum', 'notReceiveNum']
      if (sortList.includes(params.propertyName)) {
        queryStatisticsList(params).then(({ data: { content, total }}) => {
          this.loading = false
          this.count = total
          this.tableData = content
          this.tableData.map(item => {
            item.stateName = codeChangeName(this.stateList, item.state)
            item.deviceTypeName = codeChangeName(this.constant.deviceType, item.deviceType)
            return item
          })
        })
      } else {
        queryDirectoriesList(params).then(({ data: { content, total }}) => {
          this.loading = false
          this.count = total
          this.tableData = content
          this.tableData.map(item => {
            item.stateName = codeChangeName(this.stateList, item.state)
            item.deviceTypeName = codeChangeName(this.constant.deviceType, item.deviceType)
            return item
          })
        })
      }
    },
    // 删除数据
    deleteData() {
      if (this.onlyOneData()) {
        const { id } = this.multipleSelection[0]
        this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDirectories(id).then(() => {
            this.fetchData('query')
            this.$message.success('删除成功')
          })
        })
      }
    },
    // 下架数据
    dataChange(type) {
      if (this.onlyOneData()) {
        const { state, id } = this.multipleSelection[0]
        if (type === 'stop') {
          if (state === '02') {
            this.$message.warning('该设备名录已下架')
            return
          }
          stopDirectories(id).then(() => {
            this.$message.success('下架成功')
            this.fetchData('query')
          })
        } else if (type === 'start') {
          if (state === '01') {
            this.$message.warning('该设备名录未下架')
            return
          }
          reciverDirectories(id).then(() => {
            this.$message.success('恢复成功')
            this.fetchData('query')
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.equipment-directory {
  padding: 10px;
}
</style>
<style lang="less">
.equipment-directory {
  .el-table__body-wrapper {
    max-height: calc(100vh - 330px);
  }
}
</style>
