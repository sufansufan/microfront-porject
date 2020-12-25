<template>
  <div class="org-manage">
    <split-pane :min-percent="10" :default-percent="12" split="vertical">
      <template slot="paneL">
        <div v-loading="treeLoading" class="left">
          <el-tree ref="treeRef" :data="treeData" :expand-on-click-node="false" node-key="id" :default-expanded-keys="defaultExpandedKeys" :props="defaultProps" :highlight-current="true" @node-click="handleNodeClick" />
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <div class="search">
            <div class="select">
              <div>
                <span>类别编号</span>
                <div>
                  <el-input v-model.trim="search.classNumber" placeholder="请输入类别编号" clearable @keyup.enter.native="keyupSearch" />
                </div>
              </div>
              <div>
                <span>类别名称</span>
                <div>
                  <el-input v-model.trim="search.name" placeholder="请输入类别名称" clearable @keyup.enter.native="keyupSearch" />
                </div>
              </div>
              <div>
                <span>状态</span>
                <div>
                  <el-select v-model.trim="search.state" placeholder="请选择状态" clearable @keyup.enter.native="keyupSearch">
                    <el-option v-for="item in constant.productClassState" :key="item.code" :label="item.name" :value="item.code" />
                  </el-select>
                </div>
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
                  <el-button v-power="'productClassify:add'" type="primary" @click="orgJump('add')"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
                  <el-button v-power="'productClassify:edit'" type="primary" @click="orgJump('edit')"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
                  <el-button v-power="'productClassify:delete'" type="primary" @click="deleteData()"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
                </el-button-group>
              </div>
              <div>
                <el-button-group>
                  <el-button v-power="'productClassify:setting'" type="primary" @click="orgJump('setAttributes')"><i class="iconfont icon-zhidingfuzeren-copy" /> 设置分类属性</el-button>
                </el-button-group>
              </div>
              <div>
                <el-button-group>
                  <el-button v-power="'productClassify:stop'" type="primary" @click="stopProduct"><i class="iconfont icon-tingyong-copy" /> 停用</el-button>
                  <el-button v-power="'productClassify:reset'" type="primary" @click="restartProduct"><i class="iconfont icon-huifu" /> 恢复</el-button>
                </el-button-group>
              </div>
            </div>
          </div>
          <el-table
            ref="tableRef"
            v-loading="loading"
            :data="tableData"
            row-key="id"
            border
            max-height="calc(100vh - 300px)"
            @sort-change="sortTable"
            @select="handleSelectionSingleChange"
          >
            <el-table-column type="selection" width="40" label-class-name="table-selection" />
            <el-table-column type="index" width="48" label="序号" align="center" />
            <el-table-column prop="classNumber" label="分类编号" align="center" sortable="custom" width="320" :show-overflow-tooltip="true" />
            <el-table-column prop="name" label="分类名称" align="center" sortable="custom" width="320" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span class="table-click-color one-ellipsis" @click="details(scope.row)">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="parentId" label="上级分类" sortable="custom" align="center" width="110">
              <template slot-scope="scope">
                <span class="one-ellipsis">{{ scope.row.parentName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="说明" align="center" :show-overflow-tooltip="true" />
            <el-table-column prop="state" label="状态" sortable="custom" align="center" width="100">
              <template slot-scope="scope">
                <span class="one-ellipsis">{{ scope.row.state == '01' ? '正常':'停用' }}</span>
              </template>
            </el-table-column>
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
import { getLeftTree, getPage, deleteOne, stopProduct, restartProduct } from '@core/api/productClassification'
import { mapGetters } from 'vuex'
export default {
  name: 'OrgManage',
  components: {},
  mixins: [pagination, table],
  data() {
    return {
      count: 0,
      value: '',
      productClassId: '',
      search: {
        id: '',
        classNumber: '',
        name: '',
        state: ''
      },
      treeData: [],
      defaultProps: {
        children: 'childrens',
        label: 'name'
      },
      tableData: [],
      loading: true,
      treeLoading: true,
      defaultExpandedKeys: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  activated() {
    this.$store.dispatch('getConstant', ['productClassState']).then(() => {
      this.fetchData()
    })
    this.getTree()
  },
  methods: {
    orgJump(type) {
      switch (type) {
        case 'add':
          this.$router.push({
            name: 'productAdd'
          })
          break
        case 'edit':
          if (this.onlyOneData()) {
            this.$router.push({
              name: 'productEdit',
              query: {
                id: this.multipleSelection[0]['id']
              }
            })
          }
          break
        case 'setAttributes':
          if (this.onlyOneData()) {
            for (let i = 0; i < this.treeData.length; i++) {
              if (this.treeData[i].id === this.multipleSelection[0]['id']) {
                this.$message.warning('只能对三级分类设置属性!')
                return
              } else {
                for (let j = 0; j < this.treeData[i].childrens.length; j++) {
                  if (this.treeData[i].childrens[j].id === this.multipleSelection[0]['id']) {
                    this.$message.warning('只能对三级分类设置属性!')
                    return
                  }
                }
              }
            }
            this.$router.push({
              name: 'setAttributes',
              query: {
                id: this.multipleSelection[0]['id']
              }
            })
          }
          break
        default:
          break
      }
    },
    getTree() {
      this.treeLoading = true
      getLeftTree({}).then(({ data }) => {
        this.treeData = []
        this.treeData.push(...data)
        this.defaultExpandedKeys = []
        for (let i = 0; i < this.treeData.length; i++) {
          this.defaultExpandedKeys.push(data[i].id)
        }
        this.highLight = true
        this.$nextTick(() => {
          this.$refs.treeRef.setCurrentKey(this.productClassId)
        })
        this.treeLoading = false
      })
    },
    deleteData() {
      if (this.onlyOneData()) {
        this.$confirm('请确认是否需要删除此数据，一旦删除将无法恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOne(this.multipleSelection[0]['id']).then(res => {
            if (res.code === 200) {
              this.fetchData('query')
              this.$message.success('删除成功')
              this.getTree() // 刷新左边树形结构
            }
            return
          })
        })
      }
    },
    details(item) {
      const { id } = item
      for (let i = 0; i < this.treeData.length; i++) {
        if (this.treeData[i].id === id) {
          this.$router.push({ name: 'productDetails', query: { id: id, islastLevel: false }})
          return
        } else {
          for (let j = 0; j < this.treeData[i].childrens.length; j++) {
            if (this.treeData[i].childrens[j].id === id) {
              this.$router.push({ name: 'productDetails', query: { id: id, islastLevel: false }})
              return
            }
          }
        }
      }
      this.$router.push({ name: 'productDetails', query: { id: id, islastLevel: true }})
    },
    stopProduct() {
      if (this.onlyOneData()) {
        const { state } = this.multipleSelection[0]
        if (state !== '01') {
          this.$message.warning('请选择状态为正常的产品')
          return
        }
        stopProduct(this.multipleSelection[0]['id']).then(res => {
          if (res.code === 200) {
            this.fetchData()
            this.$message.success('停用成功')
          }
          return
        })
      }
    },
    restartProduct() {
      if (this.onlyOneData()) {
        const { state } = this.multipleSelection[0]
        if (state === '01') {
          this.$message.warning('只能恢复停用的产品')
          return
        }
        restartProduct(this.multipleSelection[0]['id']).then(res => {
          if (res.code === 200) {
            this.fetchData()
            this.$message.success('恢复成功')
          }
          return
        })
      }
    },
    fetchData(sortData) {
      this.loading = true
      if (typeof sortData === 'string') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      const params = {
        size: this.size,
        page: this.page - 1,
        productClassId: this.productClassId,
        propertyName: 'classNumber',
        ascending: false,
        ...this.search,
        ...this.sortData
      }
      getPage(params).then(({
        data: {
          total,
          content
        }
      }) => {
        this.loading = false
        this.tableData = content
        this.count = total
      })
    },

    handleNodeClick(data) {
      this.productClassId = data.id
      this.fetchData()
    }

  }
}
</script>

<style lang="less" scoped>
  .org-manage {
    padding: 10px 0 10px 10px;
    height: calc(100vh - 140px);
    .left {
      margin-right: 5px;
      height: 100%;
      overflow-y: auto;
    }
    .right {
      margin-left: 10px;
      padding-right: 10px;
      height: 100%;
      // overflow-y: auto;
    }
  }
</style>
<style lang="less">
  .org-manage {
    .el-table__body-wrapper {
      max-height: calc(100vh - 360px);
    }
  }
</style>
