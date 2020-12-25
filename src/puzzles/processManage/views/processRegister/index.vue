<template>
  <div class="process-register">
    <split-pane :min-percent="10" :default-percent="12" split="vertical">
      <template slot="paneL">
        <div v-loading="treeLoading" class="left">
          <el-tree
            ref="treeRef"
            :data="treeData"
            :expand-on-click-node="false"
            node-key="name"
            :default-expanded-keys="defaultExpandedKeys"
            :props="defaultProps"
            :highlight-current="highLight"
            @node-click="handleNodeClick"
          >
            <span slot-scope="{ node }">
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
      </template>

      <template slot="paneR">
        <div class="right">
          <right-register
            ref="rightRegister"
            :process-tree="processTree"
            :app-id="appId"
          />
        </div>
      </template>
    </split-pane>
  </div>
</template>
<script>
import RightRegister from './components/RightRegister'
import { getTree } from '@core/api/processManage/workflowmanager'
import { mapMutations } from 'vuex'
export default {
  name: 'ProcessRegister',
  components: {
    RightRegister
  },
  data() {
    return {
      treeLoading: false,
      treeData: [],
      defaultProps: {
        children: 'businessFlowRegisters',
        label: 'name'
      },
      highLight: false,
      defaultExpandedKeys: [],
      nodeName: '',
      processTree: {},
      applicationList: [],
      appId: '',
      searchOther: {
        name: ''
      }
    }
  },
  activated() {
    this.getTreeData()
  },
  methods: {
    ...mapMutations(['setApplicationListReg']),
    initApplicationList(data) {
      const applicationList = data.map(i => i)
      this.setApplicationListReg(applicationList)
    },
    getApplicationList() {
      return this.applicationList
    },
    handleNodeClick(data) {
      this.appId = data.applicationId
      let nodeId = {}
      if (data.name === this.nodeName) {
        this.searchOther.name = ''
        this.nodeName = ''
        this.highLight = !this.highLight
        this.processTree = { list: JSON.parse(JSON.stringify(this.treeData)) }
        this.processTree.list.map(item => {
          item.id = item.applicationId
        })
        nodeId = {
          applicationId: '',
          id: ''
        }
      } else {
        this.nodeName = data.name
        this.highLight = true
        this.searchOther.name = data.name
        if (data.businessFlowRegisters) {
          this.processTree = JSON.parse(JSON.stringify(data))
          nodeId = {
            applicationId: data.applicationId,
            id: ''
          }
        } else {
          this.treeData.map(item => {
            if (item.applicationId === data.applicationId) {
              this.processTree = JSON.parse(JSON.stringify(item))
              return
            }
          })
          nodeId = {
            applicationId: data.applicationId,
            id: data.id
          }
        }
      }

      this.$store.commit('SET_NODEID', nodeId)
      this.$refs.rightRegister.getData()
    },
    // 左侧树
    getTreeData() {
      this.treeLoading = true
      getTree().then(({ data }) => {
        this.processTree = { list: JSON.parse(JSON.stringify(data)) }
        this.processTree.list.map(item => {
          item.id = item.applicationId
          return item
        })
        this.treeLoading = false
        this.treeData = data
        this.treeData.forEach(i => {
          this.defaultExpandedKeys.push(i.name)
        })
        this.initApplicationList(this.treeData)
        this.$nextTick(() => {
          this.$refs.treeRef.setCurrentKey(this.searchOther.name)
        })
      })
    }
  }
}
</script>
<style   lang="less" scoped>
.process-register {
  padding: 10px;
  height: calc(100vh - 140px);
  // overflow-y: auto;
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
    // overflow-y: auto;
  }
  .end-time-red {
    color: red;
  }

}
</style>
