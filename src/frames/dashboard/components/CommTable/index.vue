<template>
  <div class="table-box">
    <el-table
      ref="tableRef"
      :key="key"
      v-loading="loading"
      :data="data"
      :expand-row-keys="expandList"
      :row-key="row => row.id"
      :default-sort="tableOptions && tableOptions.defaultSort"
      :max-height="tableOptions && tableOptions.maxHeight"
      :tree-props="tableOptions && tableOptions.treeProps"
      :height="tableOptions && tableOptions.height"
      :default-expand-all="tableOptions && tableOptions.defaultExpandAll"
      stripe
      border
      style="width: 100%"
      @sort-change="sortDataCustom"
      @select="handleSelectionSingleChange"
      @selection-change="handleSelectionChange"
    >
      <template
        v-for="({label, prop, className, width, fixed, type, single, align, headerAlign, sortable, showTooltip, pre, suf, show, separator = '/', _renderHeader, _child, _render, index: _i}, index) in tableRow"
      >
        <el-table-column
          v-if="!_child && !type && !pre && !suf && !Array.isArray(prop) && prop !== 'operation' && type !== 'selection' &&type !== 'index' && !_renderHeader && !_render"
          :key="index"
          :prop="prop"
          :class-name="className"
          :label="label"
          :type="_i ? 'index' : ''"
          :width="width || 'auto'"
          :fixed="fixed || false"
          :align="align || 'center'"
          :header-align="headerAlign || 'center'"
          :sortable="sortable || false"
          :show-overflow-tooltip="showTooltip || false"
        />
        <el-table-column
          v-else-if="type === 'expand'"
          :key="index"
          :prop="prop"
          :type="type"
          :label="label"
          :class-name="className"
          :width="width || 'auto'"
          :fixed="fixed || false"
          :align="align || 'center'"
          :header-align="headerAlign || 'center'"
          :sortable="sortable || false"
          :show-overflow-tooltip="showTooltip || false"
        >
          <template slot-scope="{row, $index}">
            <template v-if="_render">
              {{ createNode('_render_'+$index, _render(row, $index)) }}
              <slot :name="'_render_'+$index" />
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="type === 'selection'"
          :key="index"
          :prop="prop"
          :width="width || 40"
          :fixed="fixed || false"
          :type="type"
          :align="align || 'center'"
          :header-align="headerAlign || 'center'"
          :label-class-name="single ? 'table-selection' : ''"
          :sortable="sortable || false"
          :show-overflow-tooltip="showTooltip || false"
        />
        <template v-else>
          <el-table-column
            v-if="showColumns(show)"
            :key="index"
            :label="label"
            :prop="prop"
            :class-name="className"
            :width="width || 'auto'"
            :fixed="fixed || false"
            :align="align || 'center'"
            :header-align="headerAlign || 'center'"
            :sortable="sortable || false"
            :show-overflow-tooltip="showTooltip || false"
          >
            <template slot="header" slot-scope="{row, $index}">
              {{ _renderHeader ? createNode('_render-header_'+$index, _renderHeader(row, $index)) : label }}
              <slot :name="'_render-header_'+$index" />
            </template>
            <template slot-scope="{row, $index}">
              <template v-if="!_child">
                <template v-if="_render">
                  {{ createNode('_render_'+$index, _render(row, $index)) }}
                  <slot :name="'_render_'+$index" />
                </template>
                <template v-else-if="Array.isArray(prop)">
                  <span
                    v-for="(v, index) in prop"
                    :key="index"
                    :class="{'price-font': type === 'num'}"
                  >{{ row[v] | changNumber }}{{ index !== prop.length - 1 ? separator : '' }}</span>
                </template>
                <template v-else-if="prop === 'operation'">
                  <slot :row="row" />
                </template>
                <template v-else-if="type === 'num'">
                  <span class="price-font">{{ pre }}{{ row[prop] | changNumber }}{{ suf }}</span>
                </template>
                <template v-else>
                  <span>{{ pre }}{{ row[prop] }}{{ suf }}</span>
                </template>
              </template>
              <template v-else>
                <div v-for="(child, index) in row[childType]" :key="child.id" class="child-list">
                  <template v-if="_render">
                    {{ createNode('_render_'+index, _render(row, $index)) }}
                    <slot :name="'_render_'+index" />
                  </template>
                  <template v-else-if="prop === 'selection'">
                    <el-checkbox />
                  </template>
                  <template v-else-if="prop === 'operation'">
                    <slot :row="row" />
                  </template>
                  <span v-else-if="!child[prop]" class="is-empty">N/A</span>
                  <template v-else-if="Array.isArray(prop)">
                    <span
                      v-for="(v, index) in prop"
                      :key="index"
                      :class="{'price-font': type === 'num'}"
                    >{{ child[v] | changNumber }}{{ index !== prop.length - 1 ? separator : '' }}</span>
                  </template>
                  <template v-else-if="type">
                    <span class="price-font">{{ pre }}{{ child[prop] | changNumber }}{{ suf }}</span>
                  </template>
                  <template v-else :title="child[prop]">{{ child[prop] }}</template>
                </div>
              </template>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
    <div v-if="count" class="pagination">
      <el-pagination
        :page-sizes="pageSizes"
        :page-size="size"
        :total="count"
        :current-page="page"
        :layout="pageLayout"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
        <span class="price-font">{{ pageSlot }}</span>
      </el-pagination>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
/**
 * table配置组件参数介绍：
 * props: {
 *    data 数据入参
 *    columns 配置
 *    childType  存在子列表的时候使用，该字段为子列表的字段名称，默认order
 *    count 需要分页时传入
 *    singleSelected 是否开启单选，默认false
 *    pageSlot 页码slot
 *    parentComponent 兼容dialog 寻找指定父组件赋值vm
 * }
 * columns: {
 *    label 表头显示名称
 *    width 宽度
 *    prop 字段名称，单字段传String,多字段传['a', 'b']
 *    separator 多字段实现分隔符，默认'/'，只在多字段生效
 *    fixed 定位
 *    type 现只有一个'num'值可以设定 用于改变数字字体
 *    single 是否是单选
 *    pre 前缀
 *    suf 后缀
 *    index: true  索引，传入true时生效
 *    align: 对齐方式
 *    headerAlign: 头部对齐方式
 *    sortable: 排序方式
 *    showTooltip: 当内容过长被隐藏时显示 tooltip
 *    renderHeader(h, row, index) renderHeader函数
 *    render(h, row, index) render函数
 *    [
 *      {...}   子列表使用方式，内部配置同上
 *    ]
 * }
 **/
import pagination from '@core/mixins/pagination'
import { deepClone, handleMoney } from '@core/utils'
export default {
  name: 'CommTable',
  mixins: [pagination],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    childType: {
      type: String,
      default: 'order'
    },
    count: {
      type: Number,
      default: 0
    },
    singleSelected: {
      type: Boolean,
      default: false
    },
    expandList: {
      type: Array,
      default: () => []
    },
    pageSlot: {
      type: String,
      default: ''
    },
    tableOptions: {
      type: Object,
      default: () => {}
    },
    parentComponent:{
      type:String,
      default:''
    },
    loading:{
      type:Boolean,
      default:false
    }
  },
  filters: {
    changNumber(val) {
      return handleMoney(val)
    }
  },
  data() {
    return {
      key: 1,
      tableRow: [],
      sortData: {},
      multipleSelection: []
    }
  },
  computed: {
    sortDataCustom() {
      if(this.tableOptions) {
        if(typeof(this.tableOptions.sortTable === String)) {
          return this.sortTable
        }else {
          return false
        }
      }
    },
    showColumns() {
      return (status) => {
        if(status !== undefined) {
           return status
        }else {
          return true
        }
      }
    }
  },
  watch: {
    columns: {
      handler() {
        this.tableRow = deepClone(this.columns)
        this.tableRow.forEach((item, index) => {
          if (Array.isArray(item)) {
            item.forEach(item => (item._child = true))
            this.tableRow.splice(index, 1, ...item)
          }
        })
        this.tableRow.forEach((item, index) => {
          if (item.renderHeader && typeof item.renderHeader === 'function') {
            item._renderHeader = (row, index) => item.renderHeader(this.$createElement, row, index)
          }
          if (item.render && typeof item.render === 'function') {
            item._render = (row, index) => item.render(this.$createElement, row, index)
          }
        })
        this.key = this.key + 1
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (this.$refs.tableRef) this.$refs.tableRef.columns.map(item => (item.className = item.className ? item.className + ' ' + item.property : item.property))
  },
  methods: {
    // 创建节点
    createNode(key, vnode) {
      this.$slots[key] = vnode
    },
      // 执行行
      setCurrentRow(row) {
      this.$refs.tableRef.setCurrentRow(row)
    },
    // 排序
    sortTable({ column, prop, order }) {
      this.sortData = {
        propertyName: prop,
        ascending: order === 'ascending'
      }
      if (order === null) {
        this.sortData = {}
      }
      console.log(this.vm)
      this.vm.sortData = this.sortData
      this.vm.fetchData(this.sortData)
    },
    // 单选
    handleSelectionSingleChange(selection, row) {
      if(!this.tableRow[0].single) return
      if (this.multipleSelection.length && this.multipleSelection[0].id === row.id) {
        this.$refs.tableRef.clearSelection()
        this.multipleSelection = []
      } else {
        this.$refs.tableRef.clearSelection()
        this.$refs.tableRef.toggleRowSelection(row, true)
        this.multipleSelection = [row]
      }
    },
    // 多选
    handleSelectionChange(val, type) {
      if(this.tableRow[0].single) return
      this.multipleSelection = val
    },
    // 多选只选择一条数据
    onlyOneData() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return false
      } else {
        return true
      }
    },
  }
}
</script>

<style lang="less">
.table-box {
  .price-font {
    font-size: 12px;
  }
}
</style>
<style lang="less" scoped>
.table-box {
  .el-pagination {
    &:first-of-type {
      margin-top: 0;
    }
    .price-font {
      padding-right: 15px;
    }
  }
  > div {
    .child-list {
      height: 33px;
      line-height: 33px;
      position: relative;
      .is-empty {
        font-size: 12px;
      }
      > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:not(:last-child)::before {
        content: "";
        position: absolute;
        left: -10px;
        bottom: -1px;
        width: calc(100% + 20px);
        height: 1px;
        background: #eee;
      }
    }
  }
  &-title {
    &-left {
      display: flex;
      align-items: flex-start;
      .tit {
        text-align: center;
      }
    }
    &-right {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
    }
    .tit {
      margin: 0 10px 10px 0;
      padding: 0 10px;
      line-height: 33px;
      background: #eaeaea;
      border-radius: 3px;
      display: flex;
      align-items: center;
      > span:first-child {
        color: #707070;
        &:not(:only-of-type) {
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
