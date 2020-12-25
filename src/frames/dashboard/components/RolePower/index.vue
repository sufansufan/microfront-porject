<template>
  <div class="role">
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'child', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="应用与菜单" header-align="center" width="300">
        <template slot-scope="scope">
          <el-checkbox v-if="!scope.row.isDataFilter" v-model="scope.row.checkType" :disabled="scope.row.disabled" @change="checkboxChange(scope.row.id,$event)"> {{ scope.row.name }}</el-checkbox>
          <span v-if="scope.row.isDataFilter" class="data-filter">数据过滤器</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" header-align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.isDataFilter">
            <el-checkbox v-for="item in scope.row.dataFilterChild" :key="item.id" v-model="item.checkType" :disabled="item.disabled" style="width: 180px" @change="checkboxFilterChange(item.id, scope.row.id, $event)"> {{ item.name }}</el-checkbox>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="!ischeckbox" class="mark" />
  </div>
</template>

<script>
import { getAppEmpowerTree, getAppPermissionTreeData } from '@core/api/authResourcegc'
import table from '@core/mixins/table'
import { queryParent } from '@core/utils'
export default {
  mixins: [table],
  props: {
    roleData: {
      default: () => [],
      type: Array
    },
    isAllResouces: { // 判断是否所有应用资源
      default: true,
      type: Boolean
    },
    appIds: { // 所选应用资源
      default: '',
      type: String
    },
    ischeckbox: {
      default: true,
      type: Boolean
    },
    isEmpower: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      value: false,
      loading: true,
      tableData: [],
      resourceIds: [],
      disabledEesourceIds: [], // 禁止掉的资源id
      disabledFilters: [], // 禁止的过滤器
      filters: [],
      filterFlag: true,
      allResourceIds: []
    }
  },
  watch: {
    roleData(newV) {
      if (newV.length) {
        const row = JSON.parse(JSON.stringify(newV))
        if (this.tableData.length) {
          this.assignmentTableTree(row)
        } else {
          this.fetchEmpowerTree().then(res => {
            this.assignmentTableTree(row)
          })
        }
      } else {
        this.resourceIds = []
        this.filters = []
        this.fetchEmpowerTree()
      }
    },
    appIds(newV) {
      this.fetchEmpowerTree().then(res => {
        this.assignmentTableTree(this.roleData)
      })
    }
  },
  created() {
    this.fetchEmpowerTree()
  },
  methods: {
    // 根据tableData去执行的数据的赋值 => 赋值TableTree
    assignmentTableTree(row) {
      if (row.length === 1) {
        if (this.appIds && !this.isEmpower) {
          this.handlerResourAndFilter(row[0], 2)
          return
        }
        // if (row[0].basicrole === row[0].roleId) {
        //   this.handlerResourAndFilter(row[0], 1)
        // } else if (!row[0].basicrole) {
        //   this.handlerResourAndFilter(row[0], 1)
        // } else {
        //   this.handlerResourAndFilter(row[0], 2)
        // }
        if (row[0].roleType === '03') {
          this.handlerResourAndFilter(row[0], 2)
        } else {
          this.handlerResourAndFilter(row[0], 1)
        }
      } else {
        row.forEach((item, index) => {
          if (item.roleType === '01' || item.roleType === '02') {
            this.handlerResourAndFilter(item, 1).then(res => {
              if (res === 1) {
                if (index === 0) {
                  this.addResourAndFilter(row[1])
                } else {
                  this.addResourAndFilter(row[0])
                }
              }
            })
          }
        })
      }
    },
    // 初次给this.resourceIds和this.filters进行赋值
    handlerResourAndFilter(item, times) {
      return new Promise((resolve, reject) => {
        var resourceIds = []
        var filters = []
        if (times === 1) {
          this.disabledEesourceIds = item.resourceIds && item.resourceIds.split(',') || []
          this.disabledFilters = item.filters && item.filters.split(',') || []
        } else {
          resourceIds = item.resourceIds && item.resourceIds.split(',') || []
          filters = item.filters && item.filters.split(',') || []
        }
        if (resourceIds.length) {
          this.resourceIds = resourceIds
        }
        if (filters.length) {
          this.filters = filters
        }
        this.tableData = JSON.parse(JSON.stringify(this.handlerApproleData(this.tableData, times)))
        resolve(1)
      })
    },

    // 修改的时候给给this.resourceIds和this.filters进行岗位权限的push
    addResourAndFilter(item) {
      const resourceIds = item.resourceIds && item.resourceIds.split(',') || []
      const filters = item.filters && item.filters.split(',') || []
      if (filters.length) {
        this.filters.push(...filters)
      }
      if (resourceIds.length) {
        this.resourceIds.push(...resourceIds)
      }
      this.tableData = JSON.parse(JSON.stringify(this.handlerApproleData(this.tableData, 2)))
    },
    fetchEmpowerTree() {
      this.loading = true
      this.allResourceIds = []
      return new Promise((resolve, reject) => {
        if (this.isAllResouces) {
          getAppEmpowerTree().then(({ data }) => {
            this.tableData = JSON.parse(JSON.stringify(this.handlerTableData(data)))
            resolve(1)
          })
        } else {
          if (!this.appIds) {
            this.tableData = []
            this.resourceIds = []
            this.filters = []
            resolve(1)
          } else {
            getAppPermissionTreeData({ appId: this.appIds }).then(({ data }) => {
              this.resourceIds = []
              this.filters = []
              this.tableData = JSON.parse(JSON.stringify(this.handlerTableData(data)))
              this.$nextTick(() => {
                this.allResourceIds = Array.from(new Set(this.allResourceIds))
              })
              resolve(1)
            })
          }
        }
        this.loading = false
      })
    },

    // 处理table树型数据，保证树形数据是table要求的树形数据
    handlerTableData(data) {
      if (Array.isArray(data)) {
        data.map((item, index) => {
          this.allResourceIds.push(item.id)
          item.checkType = false
          item.disabled = false
          if (item.dataFilterChild !== null && item.dataFilterChild.length) {
            if (item.child === null) {
              item.child = []
            }
            if (item.isDataFilter === 1) {
              return
            }
            item.dataFilterChild.map(o => {
              o.checkType = false
              o.disabled = false
            })
            item.child.push({ dataFilterChild: item.dataFilterChild, id: item.dataFilterChild[0].id, isDataFilter: 1, checkType: false })
          }
          if (item.child && item.child.length) {
            this.handlerTableData(item.child)
          }
        })
        return data
      }
    },

    // 根据基础角色判断角色权限（times === 1）不可以修改， 岗位权限（times === 2）可以进行修改
    handlerApproleData(data, times) {
      if (Array.isArray(data)) {
        data.map(item => {
          if (item.isDataFilter === 1) {
            item.dataFilterChild.map(v => {
              if (this.filters.includes(v.id) || this.disabledFilters.includes(v.id)) {
                v.checkType = true
                if (times === 1) {
                  v.disabled = true
                }
              }
            })
          }
          if (this.resourceIds.includes(item.id) || this.disabledEesourceIds.includes(item.id)) {
            item.checkType = true
            if (times === 1) {
              item.disabled = true
            }
          }
          if (item.child && item.child.length) {
            this.handlerApproleData(item.child, times)
          }
          // return item
        })
      }
      return data
    },
    // 勾选资源权限复选框的操作
    checkboxChange(id, e) {
      if (e) {
        const ids = queryParent(this.tableData, id, 'id', 'child')
        ids.forEach(item => {
          if (!this.resourceIds.includes(item)) {
            this.resourceIds.push(item)
          }
        })
        this.tableData = this.handlerApproleData(this.tableData, 2)
      } else {
        const index = this.resourceIds.indexOf(id)
        this.resourceIds.splice(index, 1)
      }
    },

    // 勾选过滤器权限复选框的操作
    checkboxFilterChange(id, rowId, e) {
      if (e) {
        const ids = queryParent(this.tableData, rowId, 'id', 'child')
        ids.forEach((item, index) => {
          if (index !== ids.length - 1) {
            if (!this.resourceIds.includes(item)) {
              this.resourceIds.push(item)
            }
          }
        })
        this.filters.push(id)
        this.tableData = this.handlerApproleData(this.tableData, 2)
      } else {
        const index = this.filters.indexOf(id)
        this.filters.splice(index, 1)
      }
    },
    // 处理过滤器数据
    handlerFilterData(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].checkType && list[i].dataFilterChild.length) {
          const last = list[i].child.length - 1
          const { dataFilterChild } = list[i].child[last]
          const somefilterCheck = dataFilterChild.some(item => item.checkType === true)
          if (!somefilterCheck) {
            this.$message.warning(`${list[i].name}至少要添加一条过滤器`)
            this.filterFlag = false
            return
          } else {
            this.filterFlag = true
          }
        }
        if (list[i].child && list[i].child.length) {
          this.handlerFilterData(list[i].child)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.role {
  .data-filter {
    font-size: 14px;
    color: #606266;
  }
  position: relative;
  .mark {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    opacity: 0;
  }
}
</style>
