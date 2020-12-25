<template>
  <div class="Iinform-you">
    <div>
      <el-table
        v-if="showTable"
        ref="multipleTable"
        v-loading="loading"
        default-expand-all
        :data="tableData"
        row-key="id"
        border
        :default-sort="defauleSort"
        @sort-change="sortTable"
      >
        <el-table-column type="index" width="48" label="序号" align="center" />
        <el-table-column prop="operationType" label="操作" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.operationType == '0'?'邀请合作':(scope.row.operationType=='1'?'更新信息':'终止合作') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="操作时间" sortable="custom" align="center" width="160" />
        <el-table-column prop="createUserName" label="操作人" align="center" />
        <el-table-column prop="inviteUserName" label="企业联系人" align="center" />
        <el-table-column prop="phone" label="联系人电话" align="center" width="160" />
        <el-table-column prop="organizationName" label="归属单位" align="center" />
        <el-table-column prop="dealResultName" label="确认结果" align="center" />
        <el-table-column prop="fullInformation" label="是否完善信息" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.dealResultName === '同意'">{{ scope.row.fullInformation ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="完善信息" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.dealResultName === '同意' && scope.row.fullInformation || scope.row.operationType=='1'" type="text" size="small" @click="$router.push({name: 'invitedEnterpriseView', query: { noticeId: scope.row.id,title:'历史记录',type:'view'}})">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="拒绝理由" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.dealResultName === '拒绝'">
              {{ scope.row.reason }}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="confirmTime" label="合作企业确认时间" sortable="custom" align="center" width="160" />
      </el-table>
    </div>
  </div>
</template>

<script>

import table from '@core/mixins/table'
import { myAction, hisAction } from '@core/api/cooperativeEnterprise/operateinfo'
export default {
  mixins: [table],
  props: {
    informationCode: {
      default: '',
      type: String
    },
    organizationId: {
      default: '',
      type: String
    },
    myInformationCode: {
      default: '',
      type: String
    },
    hisorganizationId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      tableData: [],
      fetchType: 'my',
      defauleSort: { prop: 'createDate', order: 'descending' },
      showTable: true
    }
  },
  watch: {
    fetchType: {
      handler() {
        this.showTable = false
        this.$nextTick(() => {
          this.showTable = true
        })
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    if (this.informationCode && this.organizationId) {
      this.fetchData()
    } else if (this.myInformationCode && this.hisorganizationId) {
      this.hisfetchData()
    }
  },
  methods: {
    fetchData(sortData) {
      this.loading = true
      if (!sortData || JSON.stringify(sortData) === '{}') {
        this.params = {
          propertyName: 'createDate',
          ascending: false
        }
      } else {
        const { propertyName, ascending } = sortData || {}
        this.params = {
          propertyName,
          ascending
        }
      }
      if (this.fetchType === 'my') {
        const informationCode = this.informationCode
        const organizationId = this.organizationId
        myAction(this.params, informationCode, organizationId).then(({ data }) => {
          this.loading = false
          this.tableData = data
          if (data) {
            this.tableData.map(item => {
              if (item.operationType === '0') {
                item['dealResultName'] = item.dealResult === '0' ? '同意' : item.dealResult === '1' ? '拒绝' : ''
              } else if (item.operationType === '1' || item.operationType === '2') {
                if (item.dealResult) {
                  item['dealResultName'] = '确认'
                } else {
                  item['dealResultName'] = ''
                }
              }
              return item
            })
          }
        })
      } else {
        const myInformationCode = this.myInformationCode
        const organizationId = this.hisorganizationId
        hisAction(this.params, myInformationCode, organizationId).then(({ data }) => {
          this.loading = false
          this.tableData = data
          this.tableData.map(item => {
            if (item.operationType === '0') {
              item['dealResultName'] = item.dealResult === '0' ? '同意' : item.dealResult === '1' ? '拒绝' : ''
            // item['fullInformation'] = item.fullInformation === true ? '是' : '否'
            } else if (item.operationType === '1' || item.operationType === '2') {
              if (item.dealResult) {
                item['dealResultName'] = '确认'
              } else {
                item['dealResultName'] = ''
              }
            } else {
              item['dealResultName'] = ''
            }
            return item
          })
        })
      }
    }

  }
}
</script>

<style lang="less" scoped>
</style>
