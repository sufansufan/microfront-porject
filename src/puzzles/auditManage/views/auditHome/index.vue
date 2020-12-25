<!-- @date: 2020-08-18 17:19:04 -->
<template>
  <div class="m_home">
    <template v-if="power">
      <top-search @update-params="updateParams" @update-authorization="fetchAuthorization " />
      <bottom-table
        :headers="tableHeader"
        :data="tableData"
        :page="page"
        :size="size"
        :sort="sort"
        :total="total"
        :default-sort="defaultSort"
        @update-sort="updateSort"
      >
        <template #id="slotProps">
          <div
            class="can_skip table-click-color"
            @click="jumpInfoId(slotProps.info)"
          >{{ slotProps.info }}</div>
        </template>
      </bottom-table>
    </template>
    <!-- 暂时不需要 -->
    <template v-else>
      <Login-verify />
    </template>
  </div>
</template>

<script>
import { AuditModel } from '@core/api/auditCreateor'
import TopSearch from './components/TopSearch'
import BottomTable from './components/BottomTable'
import LoginVerify from './components/LoginVerify'
import { mapState } from 'vuex'
export default {
  name: 'AuditHome',
  components: {
    TopSearch,
    BottomTable,
    LoginVerify
  },
  data() {
    return {
      params: {
        authorizer: '',
        id: '',
        status: [],
        jobNumber: '',
        authorizedTime: {
          after: '',
          before: ''
        }
      },
      defaultSort: {
        prop: 'time',
        order: 'ascending'
      },
      sort: {
        propertyName: 'authorizedTime',
        order: true
      },
      page: 1,
      size: 10,
      total: 0,
      tableHeader: [
        {
          label: '序号',
          width: '50',
          prop: 'index',
          align: 'center'
        },
        {
          label: '编号',
          prop: 'id',
          width: '240',
          custom: true,
          align: 'center'
        },
        {
          label: '授权人',
          width: '140',
          prop: 'man',
          align: 'center'
        },
        {
          label: '授权时间',
          width: '160',
          prop: 'time',
          sortable: 'custom',
          align: 'center'
        },
        {
          label: '完成时间',
          width: '160',
          prop: 'completeTime',
          align: 'center'
        },
        {
          label: '问题描述',
          prop: 'issue',
          align: 'left',
          overflow: true
        },
        {
          label: '当前状态',
          width: '140',
          prop: 'status',
          align: 'center'
        }
      ],
      tableData: []
    }
  },
  computed: {
    ...mapState('auditManage', {
      power: state => state.power
    })
  },
  created() {
    // this.initSocket();
    this.auditCreateor = new AuditModel()
    this.fetchData()
  },
  methods: {
    // 跳转
    jumpInfoId(id) {
      this.$router.push({
        name: 'auditDetail',
        query: {
          id
        }
      })
    },
    formatterSort({ propertyName, ascending }) {
      //  格式化sort字段 需要了自己加吧
      const map = {
        time: 'authorizedTime'
      }
      return {
        propertyName: map[propertyName],
        ascending
      }
    },
    // 更新sort字段
    updateSort(sort) {
      //  进行一层映射关系
      const sortMap = this.formatterSort(sort)
      this.sort = sortMap
      this.fetchData()
    },
    // 更新查询参数
    updateParams(params) {
      this.params = {
        ...params
      }
      this.fetchData()
    },
    // 获取整体参数
    getParams() {
      const page = this.page - 1
      const result = {
        ...this.params,
        sort: this.sort,
        size: this.size,
        page
      }
      return result
    },
    referPageation(page, size, total) {
      this.total = total
    },
    // 请求tableList
    async fetchData() {
      if (!this.power) return
      const params = this.getParams()
      // 请求数据
      const {
        data: { content, page, size, total }
      } = await this.auditCreateor.getTableList(params)
      this.referPageation(page, size, total)
      this.tableData = content.map(
        (
          {
            id,
            statusLabel: status,
            authorizedTime: time,
            authorizerName: man,
            description: issue,
            finishTime: endTime
          },
          index
        ) => {
          return {
            index: ++index,
            id,
            man,
            issue,
            endTime,
            time,
            status
          }
        }
      )
    },
    // 请求访问授权
    async fetchAuthorization(data) {
      this.page = 1
      await this.auditCreateor.visitAuthorize(data)
      this.fetchData()
    },
    updatePower(value) {
      this.power = value
    }
  }
}
</script>
<style lang='less' scoped>
.m_home {
  // background: rgba(0, 0, 0, 0.1);
  padding: 10px;
  box-sizing: border-box;
  height: calc(100% - 120px);
}
.can_skip {
  cursor: pointer;
}
.bg_qr {
  position: fixed;
  width: 416px;
  height: 448px;
  text-align: center;
  left: 50%;
  top: 50%;
  margin-left: -208px;
  margin-top: -224px;
  display: flex;
  flex-direction: column;
}
.qr_code {
  height: calc(100% - 60px);
}
.alt_title {
  color: #d7d7d7;
  height: 60px;
  line-height: 60px;
}
</style>
<style lang='less'>
</style>
