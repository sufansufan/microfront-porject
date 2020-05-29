<template>
  <div class="right-content">
    <div class="search">
      <div class="select">
        <div>
          <span>编号</span>
          <el-input v-model="search.code" placeholder="请输入编号" clearable />
        </div>
        <div>
          <span>类型</span>
          <el-select v-model="search.typeList" placeholder="请选择" clearable>
            <el-option
              v-for="item in constant.AR_RM_ResourceType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
        <div>
          <span>是否APP可见</span>
          <el-select v-model="search.isAppDisplay" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <div>
            <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="addClick('add')">新增</el-button>
            <el-button type="primary" @click="addClick('edit')">修改</el-button>
            <el-button type="primary" @click="deleteData">删除</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button type="primary" @click="$refs.exportScript.dialogOpen()">导出脚本</el-button>
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
        default-expand-all
        :tree-props="{children: 'child', hasChildren: 'hasChildren'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="名称" width="150" header-align="center" />
        <el-table-column prop="code" label="编号" align="center" />
        <el-table-column prop="type" label="类型" align="center" />
        <el-table-column prop="domainUrl" label="域名" align="center" width="200" />
        <el-table-column prop="permissions" label="权限点" align="center" />
        <el-table-column prop="sequenceNumber" label="显示顺序" align="center" />
        <el-table-column prop="isProjectPost" label="是否项目资源" align="center">
          <template slot-scope="scope">
            {{ scope.row.isProjectPost ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column prop="isAppDisplay" label="是否app可见" align="center">
          <template slot-scope="scope">
            {{ scope.row.isAppDisplay ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column prop="isFilter" label="数据过滤器" align="center">
          <template slot-scope="scope">
            {{ scope.row.isFilter ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column prop="isNeedVerificationAgain" label="是否需要二次验证" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.isNeedVerificationAgain ? '是' : '否' }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <export-script ref="exportScript" type="system" />
  </div>
</template>

<script>
import ExportScript from '@frames/dashboard/components/ExportScript'
import { getResourceData, deleteResource } from '@core/api/authResourcegc'
import table from '@core/mixins/table'
import { mapGetters } from 'vuex'
export default {
  components: {
    ExportScript
  },
  mixins: [table],
  props: {
    appId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      search: {
        code: '',
        typeList: '',
        isAppDisplay: ''
      },
      tableData: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    appId() {
      if (this.appId) {
        this.fetchData()
      }
    }
  },
  created() {
    this.$store.dispatch('getConstant', 'AR_RM_ResourceType')
  },
  methods: {
    addClick(type) {
      if (type === 'edit') {
        if (!this.onlyOneData()) return
        this.$router.push({ name: 'resourceAdd', query: { type: 'edit', id: this.multipleSelection[0].id }})
      } else {
        this.$router.push({ name: 'resourceAdd' })
      }
    },
    fetchData() {
      this.loading = true
      const { code, typeList, isAppDisplay } = this.search
      const params = {
        appId: this.appId,
        isAppDisplay,
        code,
        parentIdIsNull: false
      }
      if (typeList) params.typeList = [typeList]
      getResourceData(params).then(({ data }) => {
        this.tableData = data
        this.loading = false
      })
    },
    deleteData() {
      if (this.onlyOneData()) {
        const row = this.multipleSelection[0]
        if (row.isFilter === 1) {
          this.$message.warning('存在数据过滤器，不允许删除')
          return
        }
        if (row.child === null) {
          this.$confirm('此操作将会删除该数据', '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            deleteResource(row.id).then(() => {
              this.$message.warning('删除成功')
              this.fetchData()
            })
          }).catch(action => {
            this.$message.info('已取消')
          })
        } else {
          this.$message.warning('下级资源存在，不允许删除')
          return
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
