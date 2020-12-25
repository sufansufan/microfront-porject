<!-- @date: 2020-08-18 17:52:46 -->
<template>
  <div class="m_auditHome_bottom">
    <el-table
      ref="tableRef"
      class="table"
      :data="data"
      row-key="id"
      align="center"
      :default-sort="defaultSort"
      border
      @sort-change="sortTable"
    >
      <template v-for="header in headers">
        <el-table-column
          :key="header.prop"
          :prop="header.prop"
          :sortable="header.sortable"
          :label="header.label"
          :width="header.width"
          :align="header.align"
          :show-overflow-tooltip="header.overflow"
        >
          <template slot-scope="scope">
            <template v-if="header.custom">
              <slot :name="header.prop" :info="scope.row[header.prop]" />
            </template>
            <template v-else>{{ scope.row[header.prop] }}</template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="page"
        :page-size="size"
        :total="total"
        :layout="pageLayout"
        :page-sizes="pageSizes"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import tableMixins from '@core/mixins/table'
import pagination from '@core/mixins/pagination'
export default {
  name: 'BottomTable',
  mixins: [tableMixins, pagination],
  props: {
    headers: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Array
    },
    total: {
      type: Number
    },
    defaultSort: Object,
    sort: {
      type: Object
    },
    page: Number,
    size: Number
  },
  data() {
    return {}
  },
  methods: {
    sortTable({ column, prop, order }) {
      this.sortData = {
        propertyName:
          prop === 'dictionaryTypeName' ? 'dictionaryType.id' : prop,
        ascending: order === 'ascending'
      }
      if (order === null) {
        this.sortData = {}
      }
      this.$emit('update-sort', this.sortData)
    },
    fetchData() {
      // nothing
    }
  }
}
</script>
<style lang='less' scoped>
.m_auditHome_bottom {
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 80px);
  .table {
    max-height: calc(100% -72px);
  }
}
</style>
<style lang='less'>
</style>
