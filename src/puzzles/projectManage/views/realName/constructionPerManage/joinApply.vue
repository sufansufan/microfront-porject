<template>
  <div class="join-apply">
    <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch" />
    <comm-table ref="commTable" v-loading="loading" :single-selected="true" :table-options="tableOptions" :columns="columns" :data="tableData" :count="total" />
  </div>
</template>
<script>

import joinApply from '../searchTableData/joinApply'
import searchBar from '../searchTableData/searchBar'
import { mapGetters } from 'vuex'
import search from '@core/mixins/search'
import { applyPage, deleteBuildPerson } from '@core/api/projectManage/projectmanager'
import { handlerSearchBar, codeChangeName, parseTime } from '@core/utils'
export default {
  mixins: [search, joinApply, searchBar],
  data() {
    return {
      loading: false,
      tableData: [{
        approvalNo: '加入申请'
      }],
      btnList: [{
        children: [{
          name: '审批',
          power: 'joinApply:approval',
          on: () => {
            this.handleApproval('approval')
          },
          icon: 'icon-shenpi'
        },
        {
          name: '删除',
          power: 'joinApply:delete',
          on: () => {
            this.handleDeleteTeam()
          },
          icon: 'icon-icon7-copy'
        }
        ]
      }]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['workType', 'gender', 'memberVerificationSt']).then(() => {
      const { workType, memberVerificationSt } = this.constant
      this.selectList = handlerSearchBar(this.selectList, [1, 2], [workType, memberVerificationSt])
    })
    this.fetchData()
  },
  methods: {
    // 获得单选元素
    getMultipleSelection() {
      return this.$refs['commTable'].multipleSelection[0]
    },
    checkOnofTableData() {
      return this.$refs.commTable.onlyOneData()
    },
    handleApproval(typePage, row) {
      if (typePage === 'details') {
        this.$emit('changeTabConent', 'ApprovaInfo', typePage, row)
      } else {
        if (this.getMultipleSelection()) {
          const row = this.getMultipleSelection()
          if (this.getMultipleSelection().verificationState === '01') {
            this.$emit('changeTabConent', 'ApprovaInfo', typePage, row)
          } else {
            this.$message.warning('只能选择未提交状态的记录')
          }
        } else {
          this.$message.warning('请选择一条数据')
        }
      }
    },
    handleDeleteTeam() {
      if (this.getMultipleSelection()) {
        if (this.getMultipleSelection().verificationState === '01') { // 01未提交、02待验证、03已通过、04已退回
          this.$confirm('确定要删除选中的记录吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteBuildPerson({ id: this.getMultipleSelection().id }).then(res => {
              this.$message.success('删除成功!')
              this.fetchData('query')
            })
          })
        } else {
          this.$message.warning('只能选择未提交状态的记录')
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    fetchData(type) {
      const { projectId, projectName } = this.$route.query
      this.loading = true
      this.queryCopy(type)
      const params = {
        ...this.search,
        propertyName: 'applyTime',
        ascending: false,
        projectId: projectId,
        projectName: projectName,
        verificationState: '01',
        ...this.sortData,
        page: this.page ? this.page - 1 : 0,
        size: this.size || 10
      }
      applyPage(params).then(({ data: { content, total }}) => {
        this.tableData = content.map(item => {
          if (item.workTypeJson) {
            item.workTypeName = JSON.parse(item.workTypeJson).map(j => {
              return codeChangeName(this.constant.workType, j.workType)
            }).join(',')
          }
          item.genderName = codeChangeName(this.constant.gender, item.gender)
          if (item.appointment !== '00') {
            item.appointmentName = codeChangeName(this.constant.memberAppointment, item.appointment)
          } else {
            item.appointmentName = ''
          }
          if (item.certificateAllList) {
            item.certificateAllName = item.certificateAllList.map(ele => {
              return ele.name
            }).join(',')
          }
          item.verificationStateName = codeChangeName(this.constant.memberVerificationSt, item.verificationState)
          item.applyTime = parseTime(item.applyTime, 'y-m-d')
          item.submitTime = parseTime(item.submitTime, 'y-m-d')
          return item
        })
        this.loading = false
        this.total = total
      })
    }

  }
}
</script>

<style lang="less">
.join-apply {
 padding:10px 0;
  .el-table__body-wrapper {
    max-height: calc(100vh - 330px);
  }
}
</style>
