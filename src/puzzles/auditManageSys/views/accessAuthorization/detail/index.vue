<template>
  <div class="audit-detail">
    <div class="top">
      <div class="id">编号：{{ currentId }}</div>
    </div>
    <el-tabs v-model="activeName" type="card" class="card-tabs" @tab-click="handleClick">
      <el-tab-pane label="审计流程" name="auditFlow" class="one-card-tabs">
        <audit-flow :step-list="flowData" />
      </el-tab-pane>
      <!-- 这里vm拿的不对 拿到的是el-tab-pane 所以覆盖吧 -->
      <el-tab-pane v-if="isShowLog" label="审计记录" :lazy="true" name="auditLog" class="two-card-tabs">
        <div class="audit-log">
          <bottom-table
            v-if="isShowLog"
            :headers="tableHeader"
            :data="tableData"
            :page.sync="page"
            :size.sync="size"
            :sort="sort"
            :total="total"
            :default-sort="defaultSort"
            @hanlderFetchData="fetchData"
            @update-sort="updateSort"
          />
        </div>
      </el-tab-pane>

      <el-tab-pane name="last">
        <span slot="label">
          <i class="iconfont icon-fanhui-copy" />
          返回
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import tabMinxins from '@core/mixins/tabs.js'
import auditFlow from './flow'
import BottomTable from '../components/BottomTable'
import { AuditModel } from '@core/api/auditManageSys/auditCreateor'
export default {
  name: 'AuditDetail',
  components: {
    auditFlow,
    BottomTable
  },
  mixins: [tabMinxins],
  data() {
    return {
      activeName: 'auditFlow',
      isShowLog: true,
      flowData: [],
      page: 1,
      size: 10,
      sort: {
        propertyName: 'createDate',
        ascending: false
      },
      defaultSort: {
        prop: 'time',
        order: 'ascending'
      },
      total: 50,
      tableData: [],
      tableHeader: [
        {
          label: '序号',
          width: '50',
          prop: 'index',
          align: 'center'
        },
        {
          label: '时间',
          width: '160',
          prop: 'time',
          sortable: 'custom',
          align: 'center'
        },
        {
          label: 'IP',
          width: '160',
          prop: 'ip',
          align: 'center'
        },
        {
          label: '数据库实例',
          width: '160',
          prop: 'instance',
          align: 'center'
        },
        {
          label: '访问账户',
          width: '160',
          prop: 'user',
          align: 'center'
        },
        {
          label: '操作报文',
          prop: 'argument',
          headerAlign: 'center',
          overflow: true,
          align: 'left'
        },
        {
          label: '数据库操作',
          width: '100',
          prop: 'commandType',
          align: 'center'
        },
        {
          label: '影响行数',
          width: '100',
          prop: 'affect',
          align: 'center'
        }
      ]
    }
  },
  computed: {
    currentId() {
      return this.$route.query.id
    }
  },
  created() {
    this.auditModel = new AuditModel()
    this.initData()
    this.fetchData()
  },
  methods: {
    updateSort({ propertyName, ascending }) {
      const map = {
        time: 'createDate'
      }
      this.sort = { propertyName: map[propertyName], ascending }
      this.fetchData()
    },
    // handleClick() {},
    getParams() {
      return {
        page: this.page - 1,
        size: this.size,
        authorizationId: this.currentId,
        ...this.sort
      }
    },
    async fetchData() {
      // 请求tableData
      const params = this.getParams()
      // id: index,
      let index = 0
      const {
        data: { content, total }
      } = await this.auditModel.getLogTable(params)
      this.total = total
      this.tableData = content.map(({ createDate: time, ip: ip, instance: instance, user: user, argument: argument, commandType: commandType, affect: affect }) => {
        return {
          index: ++index,
          time,
          ip,
          instance,
          user,
          argument,
          commandType,
          affect
        }
      })
    },
    async initData() {
      const params = {
        authorizationId: this.currentId
      }
      const { data } = await this.auditModel.getAuditFlow(params)
      const length = data.length
      this.flowData = data.map(
        (
          {
            assigneeName: name,
            enterpriseName: company,
            assigneeTime: timestamp,
            description: explain,
            positionInEnterprise: post,
            status: status
          },
          index
        ) => {
          return {
            name,
            post,
            company,
            timestamp,
            explain,
            status
          }
        }
      )
    }
  }
}
</script>
<style lang="less">
.audit-detail {
  padding: 10px;
  height: 100%;
  .card-tabs,
  .one-card-tabs,
  .two-card-tabs {
    height: calc(100% - 42px);
  }
  .tab {
    height: 100%;
  }
  .top {
    position: fixed;
    top: 110px;
    left: 50%;
    width: 600px;
    margin-left: -300px;
    .id {
      margin-left: 20px;
      padding-top: 10px;
      text-align: center;
      font-size: 16px;
      font-weight: 650;
      line-height: 35px;
      box-sizing: border-box;
      display: inline-block;
      width: calc(100% - 120px);
      color: #333;
    }
  }
  .audit-log {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }
  .el-tabs__header {
    margin: 0 0 10px !important;
  }
  .el-tabs__content {
    height: 100%;
  }
}
</style>
