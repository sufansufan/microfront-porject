<template>
  <div class="project-personnle">
    <search-bar
      v-if="!isDetails"
      :select-list="selectList"
      :btn-list="btnList"
      :show-select="false"
      :search="search"
      @changeSearch="changeSearch"
    />
    <comm-table
      ref="commTable"
      v-loading="loading"
      :single-selected="true"
      :columns="columns"
      :data="tableData"
      :table-options="tableOptions"
      :count="total"
    />
    <component :is="dialogOptions.com" v-if="isShowDialog" :show.sync="isShowDialog" :title="dialogOptions.title" :is-edit="isEdit" :project-info="projectInfo" @fetchData="fetchData" />
  </div>
</template>

<script>
import projectPersonnel from '../searchTableData/projectPersonnel'
import search from '@core/mixins/search'
import { getProjectmember, emptyMember, releaseNotice } from '@core/api/projectManage/projectmanager'
import { parseTime, codeChangeName } from '@core/utils'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    NumberAppoint: () => import('./NumberAppoint'),
    OutProject: () => import('./OutProject')
  },
  mixins: [projectPersonnel, search],
  data() {
    return {
      tableData: [],
      dialogOptions: {
        title: '',
        com: ''
      },
      isShowDialog: false,
      projectInfo: {},
      isEdit: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['constant']),
    isDetails() {
      return this.$route.query.type === 'details'
    }
  },
  created() {
    this.getConstant(['employeeType', 'noticeStatus', 'inOutStatus']).then(() => {
      this.fetchData()
    })
  },
  methods: {
    ...mapActions(['getConstant']),
    fetchData() {
      this.loading = true
      const { projectId } = this.$route.query
      if (!projectId) {
        this.$message.warning('请组建项目部')
        this.loading = false
        return
      }
      getProjectmember(projectId).then(({ data }) => {
        this.loading = false
        const { employeeType, noticeStatus, inOutStatus } = this.constant
        this.tableData = data.map(item => {
          item.inDate = parseTime(item.inDate, 'y-m-d')
          item.outDate = parseTime(item.outDate, 'y-m-d')
          item.userTypeName = codeChangeName(employeeType, item.userType)
          item.noticeStatusName = codeChangeName(noticeStatus, item.noticeStatus)
          item.statusName = codeChangeName(inOutStatus, item.status)
          item.otherDutyName = item.otherDuty === '01' ? '材料验收' : ''
          return item
        })
      })
    },
    handlerBtn(type) {
      const { onlyOneData, multipleSelection } = this.$refs.commTable
      if (!onlyOneData()) return
      this.projectInfo = multipleSelection[0]
      const { status, postName } = this.projectInfo
      const dialogList = [
        { type: 'appoint', com: 'NumberAppoint', title: '成员任命' },
        { type: 'outProject', com: 'OutProject', title: '退出项目' }
      ]
      this.dialogOptions = dialogList.find(item => item.type === type)
      if (type === 'appoint' && postName === '项目经理' && status === '02') {
        this.$message.warning('状态为"已进入"的项目经理，不可进行任命')
        return
      }
      if (type === 'outProject' && status !== '02') {
        this.$message.warning('只有状态为"已进入"的成员，才可以退出项目')
        return
      }
      this.isShowDialog = true
      this.isEdit = false
    },
    handlerOperate(type, row) {
      if (type === 'edit') {
        if (row.status !== '01') {
          this.$message.warning('只有状态为"未进入"的成员，才可以修改任命信息')
          return
        }
        this.dialogOptions = { type: 'appoint', com: 'NumberAppoint', title: '成员任命' }
        this.projectInfo = row
        this.isShowDialog = true
        this.isEdit = true
      } else if (type === 'clear') {
        if (row.status !== '01') {
          this.$message.warning('只有状态为"未进入"的成员，才可以清空任命信息')
          return
        } else {
          this.emptyData(row)
        }
      }
    },
    emptyData(row) {
      this.$confirm('此操作将清空选中数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        emptyMember(row.id).then(res => {
          this.$message.success('清空成功!')
          this.fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    handlerNotice() {
      releaseNotice().then(() => {
        this.$message.success('通知已发送成功')
        this.fetchData()
      })
    }
  }
}
</script>

<style lang="less">
.project-personnle {
  .el-table__body-wrapper {
    max-height: calc(100vh - 320px);
  }
}
</style>
