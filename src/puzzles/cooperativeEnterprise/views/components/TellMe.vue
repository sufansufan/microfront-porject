<template>
  <div class="tell-me">
    <div>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        default-expand-all
        :data="tableData"
        row-key="id"
        border
        @sort-change="sortTable"
      >
        <el-table-column type="index" width="48" label="序号" align="center" />
        <el-table-column prop="operationType" label="操作" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.operationType == '0'?'邀请合作':(scope.row.operationType=='1'?'更新信息':'终止合作') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="操作时间" align="center" width="160" />
        <el-table-column prop="createUserName" label="操作人" align="center" width="120" />
        <el-table-column prop="acceptUserName" label="企业联系人" align="center" width="120" />
        <el-table-column prop="acceptPhone" label="联系人电话" align="center" width="160" />
        <el-table-column prop="organizationName" label="归属单位" align="center" />
        <el-table-column prop="dealResult" label="确认结果" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.dealResult==='0'?'同意':'拒绝' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fullInformation" label="是否完善信息" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fullInformation===true?'是':'否' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="完善信息" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="$router.push({name: 'enterpeiseHistory', query: {type:'handle', id: scope.row.id}})">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="拒绝理由" align="center" />
        <el-table-column prop="confirmTime" label="合作企业确认时间" align="center" width="160" />
      </el-table>
    </div>
  </div>
</template>

<script>

import table from '@core/mixins/table'
import { hisAction } from '@core/api/cooperativeEnterprise/operateinfo'
export default {
  mixins: [table],
  props: {
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
      tableData: []
    }
  },
  created() {
    if (this.myInformationCode && this.hisorganizationId) {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      const myInformationCode = this.myInformationCode
      const organizationId = this.hisorganizationId
      this.loading = true
      hisAction(myInformationCode, organizationId).then(({ data }) => {
        console.log(data, '111')
        this.loading = false
        this.tableData = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
