<template>
  <div class="version-detail">
    <!-- 分包合同版本查看页面 -->
    <extend-book
      type="contractVersion"
      :table-data="tableData"
      :total="total"
      :loading="loading"
      @handlerClickBtn="handlerClickBtn"
      @clickRow="clickCurrentRow"
      @fetchData="fetchData"
    />
  </div>
</template>

<script>
import ExtendBook from '../../../components/extendBook'
import { getContractVersionList } from '@core/api/contractManage/contractmanager'
export default {
  name: 'VersionDetail',
  components: {
    ExtendBook
  },
  props: {
    options: Object
  },
  data() {
    return {
      loading: false,
      tableData: [{ name: '分包合同版本查看内容' }],
      total: 0
    }
  },
  computed: {
    currentId() {
      return this.options?.row?.id
    },
    // 主合同 - 当前设计合同Id
    contractId() {
      return this.$route.query.id
    }
  },
  methods: {
    async fetchData(params) {
      this.loading = true
      params['id'] = this.currentId
      params['contractId'] = this.contractId
      const { data: { content, total }} = await getContractVersionList(params)
      this.tableData = content
      this.total = total
      this.loading = false
    },
    handlerClickBtn({ type, row }) {
      if (type === 'return') this.$emit('changeState', 'subMain')
    },
    clickCurrentRow({ type, value, row }) {
      this.$emit('changeState', 'subInfo', {
        type: 'detailVersion',
        row
      })
    }
  }
}
</script>

<style lang="less" scoped>
.version-detail {
}
</style>
