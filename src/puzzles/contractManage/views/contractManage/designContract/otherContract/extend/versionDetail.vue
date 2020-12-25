<template>
  <div>
    <extend-book
      :table-data="tableData"
      type="extendVersion"
      :loading="loading"
      :total="total"
      @handlerClickBtn="handlerClickBtn"
      @clickRow="clickCurrentRow"
      @fetchData="fetchData"
    />
  </div>
</template>

<script>
import ExtendBook from '../../../../components/extendBook'
import { getSupplyVersionList
} from '@core/api/contractManage/contractmanager'
export default {
  name: 'VersionDetail',
  components: {
    ExtendBook
  },
  props: {
    breezeInfo: Object,
    options: Object
  },
  data() {
    return {
      tableData: [],
      total: '',
      loading: false
    }
  },
  computed: {
    // 归属合同Id
    contractId() {
      return this.breezeInfo?.row?.id
    },
    // 当前版本Id
    currentId() {
      return this.options?.row?.id
    }
  },
  methods: {
    async fetchData(params) {
      this.loading = true
      // 归属合同Id
      params['contractId'] = this.contractId
      params['id'] = this.currentId
      const { data: { content, total }} = await getSupplyVersionList(params)
      this.tableData = content
      this.total = total
      this.loading = false
    },
    handlerClickBtn({ type, row }) {
      if (type === 'return') this.$emit('changeState', 'otherExtendMain')
    },
    clickCurrentRow({ row }) {
      this.$emit('changeState', 'otherExtendInfo', {
        type: 'detailVersion',
        row
      })
    }
  }
}
</script>

<style></style>
