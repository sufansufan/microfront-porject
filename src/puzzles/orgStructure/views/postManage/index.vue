<template>
  <div class="post-manage">
    <split-pane :min-percent="15" :default-percent="15" split="vertical">
      <template slot="paneL">
        <div class="left">
          <el-tree
            ref="treeList"
            v-loading="treeLoading"
            :data="treeData"
            node-key="id"
            :props="defaultProps"
            :highlight-current="highLight"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          />
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <div class="search">
            <div class="select">
              <div>
                <span>岗位编号</span>
                <div>
                  <el-input v-model.trim="search.postNumber" placeholder="请输入岗位编号" clearable @keyup.enter.native="keyupSearch" />
                </div>
              </div>
              <div>
                <span>岗位名称</span>
                <div>
                  <el-input v-model.trim="search.postName" placeholder="请输入岗位名称" clearable @keyup.enter.native="keyupSearch" />
                </div>
              </div>
              <div>
                <span>岗位类型</span>
                <div>
                  <el-select v-model.trim="search.postType" placeholder="请选择岗位类型" clearable @keyup.enter.native="keyupSearch">
                    <el-option v-for="item in constant.OM_PM_PostType" :key="item.code" :label="item.name" :value="item.code" />
                  </el-select>
                </div>
              </div>
              <div>
                <span>岗位类别</span>
                <div>
                  <el-select v-model.trim="search.postClassify" placeholder="请选择岗位类别" clearable @keyup.enter.native="keyupSearch">
                    <el-option v-for="item in constant.postType" :key="item.code" :label="item.name" :value="item.code" />
                  </el-select>
                </div>
              </div>
              <div>
                <span>岗位归属</span>
                <div>
                  <el-select v-model.trim="search.jobAttribution" placeholder="请选择岗位归属" clearable @keyup.enter.native="keyupSearch">
                    <el-option v-for="item in constant.OM_PM_JobAttribution" :key="item.code" :label="item.name" :value="item.code" />
                  </el-select>
                </div>
              </div>
              <div>
                <span>岗位级别</span>
                <div>
                  <el-select v-model.trim="search.postLevel" clearable placeholder="请选择岗位级别" @keyup.enter.native="keyupSearch">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
              </div>
              <div>
                <span>上级岗位</span>
                <div>
                  <el-cascader
                    v-model="search.parentId"
                    clearable
                    :props="defaultProps"
                    :options="treeData"
                    placeholder="请选择上级岗位"
                    @keyup.enter.native="keyupSearch"
                  />
                </div>
              </div>
              <div>
                <span>状态</span>
                <div>
                  <el-select v-model.trim="search.state" placeholder="请选择状态" clearable @keyup.enter.native="keyupSearch">
                    <el-option v-for="item in constant.postState" :key="item.code" :label="item.name" :value="item.code" />
                  </el-select>
                </div>
              </div>
              <div class="query">
                <el-button type="primary" @click="fetchData('query')"><i class="iconfont icon-search-copy" /> 查询</el-button>
              </div>
            </div>
            <div class="btn">
              <div>
                <el-button-group>
                  <el-button v-power="'postManage:add'" type="primary" @click="orgJump('add', 'noPost')"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
                  <el-button v-power="'postManage:edit'" type="primary" @click="orgJump('edit', 'noPost')"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
                  <el-button v-power="'postManage:delete'" type="primary" @click="deletePost"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
                </el-button-group>
              </div>
              <div>
                <el-button-group>
                  <el-button v-power="'postManage:addPost'" type="primary" @click="orgJump('add', 'post')"><i class="iconfont icon-xinzeng1-copy" /> 新增岗位</el-button>
                  <el-button v-power="'postManage:editPost'" type="primary" @click="orgJump('edit', 'post')"><i class="iconfont icon-xiugai-copy" /> 修改岗位</el-button>
                </el-button-group>
              </div>
              <div>
                <el-button-group>
                  <el-button v-power="'postManage:stop'" type="primary" @click="stopPost"><i class="iconfont icon-tingyong-copy" /> 停用</el-button>
                  <el-button v-power="'postManage:recovery'" type="primary" @click="returnTo"><i class="iconfont icon-huifu" /> 恢复</el-button>
                  <el-button v-power="'postManage:setPermissions'" type="primary" @click="setPost"><i class="iconfont icon-weibiaoti-_huaban-copy" /> 设置权限</el-button>
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
            default-expand-all
            max-height="calc(100vh - 300px)"
            @selection-change="handleSelectionChange"
            @sort-change="sortTable"
          >
            <el-table-column type="selection" width="40" />
            <el-table-column type="index" width="48" label="序号" align="center" />
            <el-table-column prop="postNumber" label="岗位编号" align="center" sortable="custom" width="120" />
            <el-table-column label="岗位名称" align="center" prop="postName" sortable="custom" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span class="table-click-color one-ellipsis" @click="orgJump('details', 'post',scope.row.id)">{{ scope.row.postName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="orgName" label="归属单位" align="center" sortable="custom" :show-overflow-tooltip="true" />
            <el-table-column prop="postTypeName" label="岗位类型" align="center" sortable="custom" />
            <el-table-column prop="typeName" label="岗位类别" align="center" sortable="custom" width="100" />
            <el-table-column prop="jobAttributionName" label="岗位归属" align="center" sortable="custom" />
            <el-table-column prop="postLevel" label="岗位级别" align="center" sortable="custom" width="100" />
            <el-table-column prop="parentName" label="上级岗位" align="center" sortable="custom" :show-overflow-tooltip="true" />
            <el-table-column prop="stateName" label="状态" align="center" sortable="custom" width="100" />
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
              @current-change="handleCurrentChange($event, 'single')"
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
import { getList, getPostTree, deletePost, stopUsePost, resumePost, getAllPost } from '@core/api/post'
import { mapGetters } from 'vuex'
import { getSessionStorage } from '@core/utils/auth'
import { filterListData } from '@core/utils'
export default {
  name: 'PostManage',
  mixins: [pagination, table],
  data() {
    return {
      options: [{
        value: 1,
        label: 1
      }, {
        value: 2,
        label: 2
      }, {
        value: 3,
        label: 3
      }, {
        value: 4,
        label: 4
      }, {
        value: 5,
        label: 5
      }, {
        value: 6,
        label: 6
      }, {
        value: 7,
        label: 7
      }, {
        value: 8,
        label: 8
      }, {
        value: 9,
        label: 9
      }],
      value: '',
      count: 0,
      search: {
        postNumber: '',
        postName: '',
        postType: '',
        postClassify: '',
        jobAttribution: '',
        postLevel: '',
        parentId: [],
        state: 'OK',
        id: ''
      },
      loading: true,
      treeLoading: true,
      highLight: false,
      superiorPost: [],
      nodeTreeData: {},
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'postName',
        value: 'id',
        checkStrictly: true
      },
      tableData: [],
      appId: '',
      enterStatus: true
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  activated() {
    const { mainBusiness } = JSON.parse(getSessionStorage('navInfo'))
    this.$store.dispatch('getConstant', ['postType', 'postState', 'OM_PM_PostType', 'OM_PM_JobAttribution', 'applicationList']).then(() => {
      this.fetchData()
      this.fetchPostTree()
      this.findAllPost()
      if (mainBusiness === 'JZZS') {
        this.constant.OM_PM_JobAttribution = filterListData(this.constant.OM_PM_JobAttribution, 'positionOfSubCompany')
      } else {
        this.constant.OM_PM_JobAttribution = filterListData(this.constant.OM_PM_JobAttribution, ['projectPost', 'positionOfBranchCompany'])
      }
    })
    this.keyupEnter()
  },
  beforeDestroy() {
    this.enterStatus = false
  },
  methods: {
    keyupEnter() {
      document.onkeyup = (e) => {
        const keyCode = window.event ? e.keyCode : e.which
        if (keyCode === 13 && this.enterStatus) {
          this.fetchData()
        }
      }
    },
    findAllPost() {
      getAllPost().then(res => {
        this.superiorPost = res.data
      })
    },
    handleNodeClick(data) {
      if (this.search.id === data.id) {
        this.highLight = !this.highLight
        this.nodeTreeData = data
        this.search.id = ''
      } else {
        this.highLight = true
        this.nodeTreeData = data
        this.search.id = data.id
        this.fetchData('query')
      }
    },
    fetchData(sortData) {
      this.loading = true
      if (typeof sortData === 'string') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        // this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      const { page, size, search: { postNumber, postName, postType, postClassify, jobAttribution,
        postLevel, parentId, state, id }} = this
      const { propertyName, ascending } = sortData || {}
      const params = {
        page: page - 1,
        size,
        postNumber,
        postName,
        postType,
        postClassify,
        jobAttribution,
        postLevel,
        propertyName,
        ascending,
        parentId: parentId.length ? parentId[parentId.length - 1] : '',
        state,
        id
      }
      this.tableData = []
      if (this.nodeTreeData.isTreeData) {
        delete params.page
        delete params.size
        this.fetchPostTree(params)
        return
      }
      getList(params).then(({ data: { content, total }}) => {
        this.count = total
        this.tableData = content
        this.loading = false
      })
    },
    fetchPostTree() {
      getPostTree({}).then(({ data }) => {
        this.treeLoading = false
        this.treeData = data
      })
    },
    deletePost() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletePost(this.multipleSelection[0].id, 'JZZS').then(res => {
            if (res.code === 200) {
              this.fetchData()
              this.$message.success('删除成功')
              this.fetchPostTree() // 更新左边树形结构数据
            }
            return
          })
        })
        .catch(() => {})
    },
    stopPost() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        const list = this.multipleSelection
        for (let i = 0; i < list.length; i++) {
          if (list[i].state !== 'OK') {
            this.$message.warning(`请选择状态为正常的岗位`)
            return
          }
        }
        this.$confirm('此操作将停用选中岗位？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const ids = this.multipleSelection.map(v => v.id)
            stopUsePost({ ids }).then(res => {
              if (res.code === 200) {
                this.fetchData()
                this.$message.success('停用成功')
              }
              return
            })
          })
          .catch(() => {})
      } else {
        this.$message.warning('请先选择要停用的岗位')
        return
      }
    },
    returnTo() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      const list = this.multipleSelection
      for (let i = 0; i < list.length; i++) {
        if (list[i].state === 'OK') {
          this.$message.warning(`只能恢复停用的岗位`)
          return
        }
      }
      this.$confirm('此操作将恢复选中的岗位？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          resumePost(this.multipleSelection[0].id).then(res => {
            if (res.code === 200) {
              this.fetchData()
              this.$message.success('恢复成功')
            }
            return
          })
        })
        .catch(() => {})
    },
    orgJump(type, post, id) {
      if (type === 'edit') {
        if (this.multipleSelection.length !== 1) {
          this.$message.warning('请选择一条数据')
          return
        }
        this.$router.push({
          name: 'postInfo',
          query: { type, post, id: this.multipleSelection[0]['id'] }
        })
      } else if (type === 'details') {
        this.$router.push({
          name: 'postInfo',
          query: { type, post, id }
        })
      } else {
        this.$router.push({
          name: 'postInfo',
          query: { type, post }
        })
      }
    },
    setPost() {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      const { postName, postNumber, id, baseId } = this.multipleSelection[0]
      const appId = this.constant.applicationList[1].id
      this.$router.push({
        name: 'setPostAuthority',
        query: { type: 'add', postName, postNumber, id, appId, baseId }
      })
    }
  }
}
</script>

<style lang="less" scoped>
	.post-manage {
		padding: 10px;
		height: calc(100vh - 140px);
		.left {
      height: 100%;
      overflow-y: auto;
      margin-right: 10px;
      background: #f5f5f5;
		}
		.right {
			margin-left: 10px;
		}
	}
</style>
<style lang="less">
.post-manage {
  .el-table__body-wrapper {
    max-height: calc(100vh - 360px);
  }
}
</style>
