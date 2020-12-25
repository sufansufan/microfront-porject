<template>
  <div>
    <extend-book
      type="contractVersion"
      :table-data="tableData"
      :toatl="toatl"
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
      tableData: [],
      loading: false
    }
  },
  computed: {
    // 版本List需要Id 外部行Id
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
      if (type === 'return') this.$emit('changeState', 'otherMain')
    },
    clickCurrentRow({ row }) {
      this.$emit('changeState', 'otherInfo', {
        type: 'detailVersion',
        row // 传递当前行
      })
    }
  }
}
</script>

<style></style>
