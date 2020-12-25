<template>
  <div class="task-center">
    <div class="search">
      <div class="select">
        <div>
          <el-input v-model="search.name" placeholder="请输入类型或消息" clearable @keydown.enter.native="keyupSearch" />
        </div>
        <div>
          <div>
            <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <slot name="button" />
      </div>
    </div>
    <mail-box v-loading="loading" :mail-data="mailData" @changeCheck="changeCheck" @allCheck="allCheck" />
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
<script>
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import keyup from '@core/mixins/keyup'
import { getList, deleteTask, Handled } from '@core/api/emergencyWork'
import MailBox from '@frames/dashboard/components/MailBox'
export default {
  components: {
    MailBox
  },
  mixins: [pagination, keyup, table],
  props: {
    messageType: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      count: 0,
      search: {
        name: '',
        type: 1,
        userId: '1'
      },
      tableData: [],
      loading: true,
      mailData: [],
      mailIds: [],
      mailId: [],
      multipleSelection: []
    }
  },
  watch: {
    messageType() {
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    searchFetchData(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode === 13 && this.search.name) {
        this.fetchData()
      }
    },
    Handled() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        this.$confirm('此操作将已选中消息标记为已读？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            Handled(this.mailId).then(res => {
              if (res.code === 200) {
                this.fetchData()
                this.multipleSelection = []
                this.$message.success('标记为已读成功')
              }
              return
            })
          })
          .catch(() => {
            this.$message.info('已取消')
          })
      } else {
        this.$message.warning('请先选择要标记为已读的消息')
        return
      }
    },

    deleteTask() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        this.$confirm('此操作将删除选中消息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteTask(this.mailId).then(res => {
              if (res.code === 200) {
                this.fetchData()
                this.multipleSelection = []
                this.$message.success('删除成功')
              }
              return
            })
          })
          .catch(() => {
            this.$message.info('已取消删除')
          })
      } else {
        this.$message.warning('请先选择要删除的消息')
        return
      }
    },
    fetchData() {
      // this.loading = true
      this.loading = true
      if (typeof sortData === 'string') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
      }
      if (JSON.stringify(this.deepSearch) !== '{}') {
        this.search = JSON.parse(JSON.stringify(this.deepSearch))
      }

      const params = {
        size: this.size,
        page: this.page - 1,
        ...this.search,
        deal: this.messageType
      }
      getList(params).then(({ data: { total, content }}) => {
        this.loading = false
        this.tableData = content || []
        this.count = total
        this.tableData.map(item => {
          item.checkType = false
          return item
        })
        this.handlerMailData()
      })
    },
    handlerMailData() {
      this.mailData = []
      var toadyList = { title: '今天', children: [] }
      var yesterdayList = { title: '昨天', children: [] }
      var lastdayList = { title: '更早', children: [] }
      this.tableData.forEach(item => {
        if (this.fnTime(item.createDate) === '今天') {
          toadyList.children.push(item)
        } else if (this.fnTime(item.createDate) === '昨天') {
          yesterdayList.children.push(item)
        } else {
          lastdayList.children.push(item)
        }
      })

      this.mailData.push(toadyList, yesterdayList, lastdayList)
    },
    // 单条数据选中
    changeCheck(id, type) {
      this.tableData.filter(item => (item.id === id))[0].checkType = type
      this.mailId = []
      this.multipleSelection = []
      if (type) {
        this.tableData.forEach(item => {
          if (item.checkType) {
            this.mailId.push(item.id)
            this.multipleSelection.push(item)
          }
        })
      }
      this.handlerMailData()
    },
    // 选中所有
    allCheck(type) {
      this.tableData.map(item => (item.checkType = type))
      this.mailIds = []
      if (type) {
        this.tableData.forEach(item => {
          if (item.checkType) {
            this.mailIds.push(item.id)
            this.multipleSelection.push(item)
          }
        })
      }
      this.handlerMailData()
    },
    fnTime(time) {
      const ptime = new Date(time).getTime()
      const twentyFourHours = 24 * 60 * 60 * 1000
      const fortyEightHours = 24 * 60 * 60 * 1000 * 90
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const today = `${year}-${month}-${day}`
      const todayTime = new Date(today).getTime()
      const yesterdayTime = new Date(todayTime - twentyFourHours).getTime()
      const lastYesterdayTime = new Date(todayTime - fortyEightHours).getTime()

      if (ptime >= todayTime) {
        return '今天'
      } else if (ptime < todayTime && yesterdayTime <= ptime) {
        return '昨天'
      } else if (ptime < yesterdayTime && lastYesterdayTime <= ptime) {
        return '更早'
      } else {
        return time
      }
    }

  }
}
</script>

<style lang="less">
.task-center{
  .el-table--border, .el-table--group{
    border:none;
  }
  .el-table::before{
    content:none;
  }
  .el-table thead th, .el-table thead tr{
    background-color: #fff;
    border:none
  }
  .el-table--border td, .el-table--border th{
    border:none;
  }
  .el-table th, .el-table tr{
    border:none;
  }
}

</style>
