<template>
  <div class="contract-version">
    <extend-book
      v-loading="loading"
      type="contractVersion"
      :table-data="tableData"
      :table-options="tableOptions"
      :total="total"
      @clickRow="clickCurrentRow"
      @handlerClickBtn="handlerClickBtn"
      @fetchData="fetchData"
    />
  </div>
</template>

<script>
import ExtendBook from '../../components/extendBook'
import {
  detailVersionMainContract,
  deleteVersionContract
} from '@core/api/contractManage/contractmanager'
export default {
  name: 'ContractVersion',
  components: {
    ExtendBook
  },
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      tableOptions: {
        defaultSort: {
          prop: 'approvalNo',
          order: 'descending'
        }
      }
    }
  },
  computed: {
    currentId() {
      return this.$route.query.id
    }
  },
  methods: {
    async fetchData(params) {
      this.loading = true
      params['id'] = this.currentId
      const { data: { content, total }} = await detailVersionMainContract(params)
      this.tableData = content
      this.total = total
      this.loading = false
    },
    handlerClickBtn({ type, row }) {
      this[`handle${type.slice(0, 1).toUpperCase()}${type.slice(1)}`](row)
    },
    async handleDel(row) {
      const currentVersion = row.relationContractVer
      await deleteVersionContract(this.currentId, currentVersion)
      this.fetchData()
    },
    handleReturn() {
      this.$router.go(-1)
    },
    clickCurrentRow({ prop, value, row }) {
      this.$router.push({
        name: 'contractEdit',
        query: {
          type: 'details',
          id: row.id,
          versionId: row.revisionNumber,
          category: row.type,
          look: true
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.contract-version{
  padding:10px;
}
</style>
