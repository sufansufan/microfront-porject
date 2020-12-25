<template>
  <div class="category-manage">
    <split-pane :min-percent="10" :default-percent="12" split="vertical">
      <template slot="paneL">
        <div v-loading="treeLoading" class="left">
          <el-tree
            :data="treeData"
            :expand-on-click-node="false"
            node-key="id"
            default-expand-all
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
            :finance-class-id="financeClassId"
          />
        </div>
      </template>
    </split-pane>
  </div>
</template>

<script>
import RightRegister from './components/RightRegister'
import { getLeftTree } from '@core/api/financialManage/financeclassmanager'
export default {
  name: 'CategoryManage',
  components: {
    RightRegister
  },
  data() {
    return {
      treeLoading: false,
      treeData: [],
      defaultProps: {
        children: 'childrens',
        label: 'name'
      },
      highLight: true,
      nodeId: '',
      processTree: {},
      applicationList: [],
      financeClassId: ''
    }
  },
  // activated() {
  // },
  created() {
    getLeftTree().then((result) => {
      this.treeData = result.data
    })
  },
  methods: {
    handleNodeClick(data) {
      if (this.nodeId === data.id) {
        this.highLight = false
        this.financeClassId = ''
        this.nodeId = ''
      } else {
        this.highLight = true
        this.financeClassId = data.id
        this.nodeId = data.id
      }
    }
  }
}
</script>
<style   lang="less" scoped>
.category-manage {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
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
