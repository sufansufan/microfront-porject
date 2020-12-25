<template>
  <div class="build-person">
    <split-pane :min-percent="8" :default-percent="12" split="vertical">
      <template slot="paneL">
        <div v-loading="treeLoading" class="left">
          <el-tree :data="treeData" node-key="id" :props="defaultProps" :highlight-current="true" default-expand-all @node-click="handleNodeClick" />
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <build-person-list ref="buildPersonList" @buildTabCom="(val)=>{ this.$emit('changeTabCom', val)}" />
        </div>
      </template>
    </split-pane>
  </div>
</template>

<script>
import { safeBuildPersonTree } from '@core/api/projectManage/projectmanager'
export default {
  components: {
    BuildPersonList: () => import('./BuildPersonList')
  },
  data() {
    return {
      treeData: [],
      treeLoading: false,
      defaultProps: {
        children: 'child',
        label: 'name'
      }
    }
  },
  created() {
    this.getLeftTree()
  },
  methods: {
    getLeftTree() {
      this.treeLoading = true
      const { projectId } = this.$route.query
      safeBuildPersonTree(projectId).then(({ data }) => {
        this.treeData = data
        this.treeLoading = false
      })
    },
    handleNodeClick(e) {
      if (e.parentId) {
        this.$refs.buildPersonList.search.projectId = e.id
      } else {
        this.$refs.buildPersonList.search.constructionTeamPath = e.id
      }

      this.$refs.buildPersonList.fetchData()
    }
  }
}
</script>

<style lang="less" scoped>
.build-person {
  height: calc(100vh - 230px);
  .left {
    margin-right: 5px;
    height: 100%;
    overflow-y: auto;
    background: #f5f5f5;
  }
  .right {
    margin-left: 10px;
    padding-right: 10px;
    height: 100%;
  }
}
</style>
