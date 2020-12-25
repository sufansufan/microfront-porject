<template>
  <div class="data-validation">
    <split-pane :min-percent="10" :default-percent="12" split="vertical">
      <template slot="paneL">
        <div v-loading="treeLoading" class="left">
          <el-tree ref="treeRef" :data="treeData" :expand-on-click-node="false" node-key="id" default-expand-all="true" :props="defaultProps" :highlight-current="highLight" @node-click="handleNodeClick" />
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <search-bar :btn-list="btnList" :select-list="selectList" :search="search" @changeSearch="changeSearch" />
          <comm-table ref="commTable" v-loading="loading" :single-selected="true" :table-options="tableOptions" :columns="columns" :data="tableData" :count="total" />
        </div>
      </template>
    </split-pane>

  </div>
</template>

<script>
import search from '@core/mixins/search'
import dataValidation from '../searchTableData/dataValidation'
import { mapGetters } from 'vuex'
import { getTeamoGroupTree, getPersonPage } from '@core/api/projectManage/projectmanager'
import { handlerSearchBar, codeChangeName, parseTime, filterListData } from '@core/utils'
export default {
  mixins: [search, dataValidation],
  data() {
    return {
      selectList: [{
        value: 'name',
        searchType: 'input',
        name: '姓名'
      },
      {
        value: 'workType',
        searchType: 'select',
        name: '工种',
        selectData: []
      },
      {
        value: 'verificationState',
        searchType: 'select',
        name: '状态',
        selectData: []
      }
      ],
      loading: false,
      treeLoading: false,
      highLight: false,
      total: 0,
      btnList: [{
        children: [{
          name: '验证',
          power: 'dataValidation:verification',
          on: () => {
            this.handleVerification('testing')
          },
          icon: 'icon-shouquan'
        }
        ]
      }],
      treeData: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      tableData: [],
      nodeTreeData: {},
      search: {}
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['workType', 'gender', 'memberVerificationSt', 'memberAppointment']).then(() => {
      this.constant.memberVerificationSt = filterListData(this.constant.memberVerificationSt, '01')
      const { workType, memberVerificationSt } = this.constant
      this.selectList = handlerSearchBar(this.selectList, [1, 2], [workType, memberVerificationSt])
    })
    this.getTree()
    this.fetchData()
  },

  methods: {
    // 获得单选元素
    getMultipleSelection() {
      return this.$refs['commTable'].multipleSelection[0]
    },
    handleVerification(typePage, row) {
      if (typePage === 'dataDetails') {
        this.$emit('changeTabConent', 'ValidationInfo', typePage, row)
      } else {
        if (this.getMultipleSelection()) {
          const row = this.getMultipleSelection()
          if (this.getMultipleSelection().verificationState === '02') {
            this.$emit('changeTabConent', 'ValidationInfo', typePage, row)
          } else {
            this.$message.warning('只能选择待验证状态的记录')
          }
        } else {
          this.$message.warning('请选择一条数据')
        }
      }
    },
    fetchData(type) {
      this.loading = true
      const { projectId, projectName } = this.$route.query
      this.queryCopy(type)
      const params = {
        ...this.search,
        propertyName: 'applyTime',
        ascending: false,
        projectId: projectId,
        projectName: projectName,
        ...this.sortData,
        verificationStateNotEquals: '01',
        page: this.page ? this.page - 1 : 0,
        size: this.size || 10,
        submitTimeIsNotNull: true
      }
      getPersonPage(params).then(({ data: { content, total }}) => {
        this.tableData = content.map(item => {
          item.workTypeName = codeChangeName(this.constant.workType, item.workType)
          item.genderName = codeChangeName(this.constant.gender, item.gender)
          if (item.appointment !== '00') {
            item.appointmentName = codeChangeName(this.constant.memberAppointment, item.appointment)
          } else {
            item.appointmentName = ''
          }
          item.submitTime = parseTime(item.submitTime, 'y-m-d')
          item.verificationStateName = codeChangeName(this.constant.memberVerificationSt, item.verificationState)
          if (item.certificateAllList) {
            item.certificateAllName = item.certificateAllList.map(ele => {
              return ele.name
            }).join(',')
          }
          return item
        })
        this.loading = false
        this.total = total
      })
    },

    // 获取左树 默认展开所有节点
    getTree() {
      this.treeLoading = true
      const { projectId } = this.$route.query
      getTeamoGroupTree({ isRoot: true, projectId: projectId }).then(({ data }) => {
        this.treeData = data
        this.treeLoading = false
      })
    },
    // 点击树
    handleNodeClick(data) {
      if (this.search.constructionTeamIdLike === data.id) {
        this.highLight = !this.highLight
        this.nodeTreeData = data
        this.search.constructionTeamIdLike = ''
      } else {
        this.highLight = true
        this.nodeTreeData = data
        this.search.constructionTeamIdLike = data.id
        this.fetchData()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.data-validation {
  padding: 10px 0px 10px 10px;
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
    overflow-y: auto;
  }
  .text{
    color:#999;
    font-size:12px;
  }
}
</style>
<style lang="less">
.data-validation {
  .el-table__body-wrapper {
    max-height: calc(100vh - 330px);
  }
}
</style>
